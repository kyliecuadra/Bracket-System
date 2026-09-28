import { useState, type SyntheticEvent } from 'react';

/**
 * Contact / demo request form. Posts to /api/contact (which emails the team). If sending isn't configured or fails,
 * it offers the same message as an email to the team instead, so nothing is lost. Only what's needed is asked.
 */
const TYPES = ['HR & Payroll demo', 'HR & Payroll pricing', 'Custom web platform', 'Java / backend work', 'AI or computer vision', 'Enterprise system', 'Something else'];

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'fallback'; mailto: string; reason: string };

export default function ContactForm({ defaultType = TYPES[0], emails }: { defaultType?: string; emails: readonly string[] }) {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mailtoFor = (d: Record<string, string>) => {
    const body = [`Name: ${d.name}`, `Email: ${d.email}`, d.company && `Company: ${d.company}`, d.phone && `Phone: ${d.phone}`, `Topic: ${d.type}`, '', d.message].filter(Boolean).join('\n');
    return `mailto:${emails.join(',')}?subject=${encodeURIComponent(`[Website] ${d.type} — ${d.name}`)}&body=${encodeURIComponent(body)}`;
  };

  async function submit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!d.name?.trim()) errs.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? '')) errs.email = 'Please enter an email address we can reply to, like name@company.com.';
    if ((d.message ?? '').trim().length < 10) errs.message = 'Please tell us a little more (at least 10 characters).';
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setState({ kind: 'sending' });
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
      if (r.ok) { setState({ kind: 'sent' }); form.reset(); return; }
      const reason = r.status === 429 ? 'Too many messages from this connection — please wait a few minutes.' : 'Our form isn\'t able to send right now.';
      setState({ kind: 'fallback', mailto: mailtoFor(d), reason });
    } catch {
      setState({ kind: 'fallback', mailto: mailtoFor(d), reason: 'We couldn\'t reach the server.' });
    }
  }

  if (state.kind === 'sent') {
    return (
      <div role="status" className="rounded-[var(--radius-card)] bg-accent-soft p-8 ring-1 ring-accent/20">
        <p className="text-lg font-semibold text-ink">Thanks — your message is on its way to the team.</p>
        <p className="mt-2 text-muted">Kylie, Prince and Jansen all receive it, and one of us will reply by email.</p>
        <button type="button" onClick={() => setState({ kind: 'idle' })} className="mt-5 text-sm font-medium text-accent underline">Send another message</button>
      </div>
    );
  }

  const field = 'mt-1.5 block w-full rounded-lg bg-panel px-3.5 py-2.5 text-base text-ink ring-1 ring-line-strong placeholder:text-muted/70 hover:ring-ink-3 focus:outline-none focus:ring-2 focus:ring-accent aria-[invalid=true]:ring-red-600';
  const label = 'block text-sm font-medium text-ink';
  const err = (name: string) => errors[name] && <p id={`${name}-error`} className="mt-1.5 text-sm text-red-700">{errors[name]}</p>;
  const a11y = (name: string) => ({ 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined });

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      {/* Honeypot: people never see or fill this; bots often do. */}
      <div className="hidden" aria-hidden="true">
        <label>Leave this empty <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div>
        <label htmlFor="cf-name" className={label}>Name <span className="text-red-700" aria-hidden="true">*</span></label>
        <input id="cf-name" name="name" required autoComplete="name" maxLength={120} className={field} {...a11y('name')} />
        {err('name')}
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>Work email <span className="text-red-700" aria-hidden="true">*</span></label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" maxLength={200} className={field} {...a11y('email')} />
        {err('email')}
      </div>
      <div>
        <label htmlFor="cf-company" className={label}>Company <span className="font-normal text-muted">(optional)</span></label>
        <input id="cf-company" name="company" autoComplete="organization" maxLength={160} className={field} />
      </div>
      <div>
        <label htmlFor="cf-phone" className={label}>Phone <span className="font-normal text-muted">(optional)</span></label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-type" className={label}>What is this about?</label>
        <select id="cf-type" name="type" defaultValue={defaultType} className={field}>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={label}>Message <span className="text-red-700" aria-hidden="true">*</span></label>
        <textarea id="cf-message" name="message" required rows={5} maxLength={4000} className={field}
          placeholder="What are you trying to do, and by when? For HR & Payroll: roughly how many employees and branches." {...a11y('message')} />
        {err('message')}
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">We use your details only to reply. See the <a href="/legal/privacy" className="text-accent underline">privacy policy</a>.</p>
        <button type="submit" disabled={state.kind === 'sending'} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-medium text-white transition-colors hover:bg-ink-2 disabled:cursor-wait disabled:opacity-60">
          {state.kind === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
      {state.kind === 'fallback' && (
        <div role="alert" className="rounded-lg bg-amber/15 p-4 text-sm text-ink ring-1 ring-amber/40 sm:col-span-2">
          {state.reason} Your message is still here — <a href={state.mailto} className="font-medium text-accent underline">send it by email instead</a>, or write to {emails.join(', ')}.
        </div>
      )}
    </form>
  );
}
