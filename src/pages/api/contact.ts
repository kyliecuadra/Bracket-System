import type { APIRoute } from 'astro';
import { site } from '../../data/site';

/**
 * POST /api/contact: validates a contact or demo request and emails it to the team through Resend
 * (https://resend.com). Needs RESEND_API_KEY and CONTACT_FROM (a sender on a domain verified with Resend);
 * CONTACT_TO defaults to the team's addresses. Without them it answers 503 and the form offers email instead.
 *
 * Abuse limits: JSON only, 8 KB body cap, a honeypot field, and 5 messages per 10 minutes per client address. The rate
 * limit is per server instance (best effort on serverless); put a WAF rule in front for stronger protection.
 */
export const prerender = false;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max) : '');
const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!(request.headers.get('content-type') ?? '').includes('application/json')) return json(415, { error: 'unsupported_media_type' });
  const raw = await request.text();
  if (raw.length > 8192) return json(413, { error: 'too_large' });

  let data: Record<string, unknown>;
  try { data = JSON.parse(raw); } catch { return json(400, { error: 'invalid_json' }); }

  // Honeypot filled: pretend success so bots learn nothing.
  if (clean(data.website, 200)) return json(200, { ok: true });

  const msg = {
    name: clean(data.name, 120),
    email: clean(data.email, 200),
    company: clean(data.company, 160),
    phone: clean(data.phone, 40),
    type: clean(data.type, 80) || 'General',
    message: clean(data.message, 4000),
  };
  const errors: string[] = [];
  if (!msg.name) errors.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email)) errors.push('email');
  if (msg.message.length < 10) errors.push('message');
  if (errors.length) return json(400, { error: 'validation', fields: errors });

  const key = clientAddress || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return json(429, { error: 'rate_limited' });
  recent.push(now);
  hits.set(key, recent);

  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.CONTACT_FROM;
  if (!apiKey || !from) return json(503, { error: 'not_configured' });
  const to = (import.meta.env.CONTACT_TO || site.emails.join(',')).split(',').map((s: string) => s.trim()).filter(Boolean);

  const lines: [string, string][] = [['Name', msg.name], ['Email', msg.email], ['Company', msg.company], ['Phone', msg.phone], ['Topic', msg.type]];
  const text = `${lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${msg.message}`;
  const html = `<table>${lines.filter(([, v]) => v).map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v)}</td></tr>`).join('')}</table><p style="white-space:pre-wrap">${escapeHtml(msg.message)}</p>`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, reply_to: msg.email, subject: `[Website] ${msg.type} — ${msg.name}`.replace(/[\r\n]/g, ' '), text, html }),
  }).catch(() => null);
  if (!r || !r.ok) return json(502, { error: 'send_failed' });
  return json(200, { ok: true });
};

export const ALL: APIRoute = () => json(405, { error: 'method_not_allowed' });
