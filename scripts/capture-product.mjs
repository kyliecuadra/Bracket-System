#!/usr/bin/env node
/**
 * Captures the HR & Payroll product screenshots from a RUNNING local copy of the product, signed in as the fictional
 * demo accounts of its development seed ("Pioneer Test Co."). Never point this at a production installation.
 *
 *   PRODUCT_APP=http://localhost:5173 PRODUCT_API=http://localhost:8080 node scripts/capture-product.mjs [id...]
 *
 * Writes raw PNGs to scripts/.raw/ (git-ignored). Run `npm run screenshots:optimize` afterwards to produce the
 * WebP/AVIF files in public/screenshots/ and src/data/screenshots.json.
 *
 * The product's display name ("HR & Payroll") and brand colour (the site's teal) are set for the capture - both are
 * deployment settings of the product - and cleared again afterwards. File names that aren't part of the demo data are replaced before each shot.
 */
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const APP = process.env.PRODUCT_APP ?? 'http://localhost:5173';
const API = process.env.PRODUCT_API ?? 'http://localhost:8080';
const PASSWORD = process.env.PRODUCT_DEMO_PASSWORD ?? 'Passw0rd!'; // the product's documented development-seed password
const ADMIN = process.env.PRODUCT_ADMIN_EMAIL ?? 'admin@pioneer.test';
const EMPLOYEE = process.env.PRODUCT_EMPLOYEE_EMAIL ?? 'employee@pioneer.test';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '.raw');
const CHROME = process.env.CHROME_PATH
  ?? [path.join(process.env.LOCALAPPDATA ?? '', 'ms-playwright/chromium-1234/chrome-win64/chrome.exe')].find((p) => fs.existsSync(p));

const tab = (name) => async (p) => { await p.locator(`role=tab[name="${name}"]`).first().click(); };
const openRow = (text, url) => async (p) => { await p.locator(`text=${text} >> visible=true`).first().click(); await p.waitForURL(url); };

/** What to capture. `as`: which demo account; `mobile`: a phone-sized viewport. */
const SHOTS = [
  { id: 'dashboard', as: 'admin', route: '/dashboard', title: 'Dashboard' },
  { id: 'employees', as: 'admin', route: '/people/employees', title: 'Employee directory' },
  { id: 'employee-record', as: 'admin', route: () => `/people/employees/${ids.employee}`, title: 'Employee record: Employment and reporting line', height: 1000,
    before: tab('Employment') },
  { id: 'payroll-runs', as: 'admin', route: '/pay/runs', title: 'Payroll runs' },
  { id: 'payroll-run', as: 'admin', route: '/pay/runs', title: 'Payroll run waiting for approval', height: 1000,
    before: openRow('1–31 Jul 2026', '**/pay/runs/*') },
  { id: 'attendance', as: 'admin', route: '/time/attendance', title: 'Attendance' },
  { id: 'leave', as: 'admin', route: '/time/leave', title: 'Leave requests' },
  { id: 'documents', as: 'admin', route: '/admin/documents', title: 'Employee documents' },
  { id: 'reports', as: 'admin', route: '/admin/reports', title: 'Reports' },
  { id: 'insights', as: 'admin', route: '/admin/insights', title: 'Insights' },
  { id: 'roles', as: 'admin', route: '/admin/roles', title: 'Roles and permissions' },
  { id: 'system-health', as: 'admin', route: '/admin/ops', title: 'Operations Center: health', height: 1000 },
  { id: 'log-extractor', as: 'admin', route: '/admin/ops', title: 'Operations Center: Log Extractor', height: 1000,
    before: async (p) => { await tab('Logs')(p); await p.getByLabel('When').selectOption({ label: 'Last 24 hours' }); await p.getByLabel('Containing').fill('System setting'); await p.locator('role=button[name="Search"]').click(); await p.waitForTimeout(4000); } },
  { id: 'my-overview', as: 'employee', route: '/my/overview', title: 'Employee self-service: overview' },
  { id: 'my-payslips', as: 'employee', route: '/my/payslips', title: 'Employee self-service: payslips',
    before: async (p) => { await p.locator('role=button[name=/^Show details/]').first().click(); } },
  { id: 'my-leave', as: 'employee', route: '/my/leave', title: 'Employee self-service: leave' },
  { id: 'my-cv', as: 'employee', route: '/my/cv', title: 'Employee self-service: CV and qualifications', height: 1000 },
  { id: 'mobile-overview', as: 'employee', route: '/my/overview', title: 'Self-service on a phone', mobile: true },
  { id: 'mobile-payslips', as: 'employee', route: '/my/payslips', title: 'Payslips on a phone', mobile: true,
    before: async (p) => { await p.locator('role=button[name=/^Show details/]').first().click(); } },
];

/** File names that aren't demo data (e.g. a CV someone uploaded while testing) never reach a screenshot. */
const REDACT = [[/(?<![\w.-])(?!demo-|sample-)[\w-]+\.(pdf|docx?)\b/g, 'sample-document.pdf']];

async function api(method, p, body, token) {
  const r = await fetch(API + p, { method, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
  if (!r.ok) throw new Error(`${method} ${p}: ${r.status}`);
  return r.status === 204 ? null : r.json().catch(() => null);
}

async function settle(page) {
  await page.waitForTimeout(700);
  await page.waitForFunction(() => {
    if (document.querySelector('.animate-pulse, [aria-busy=true]')) return false;
    const main = document.querySelector('main') ?? document.body;
    return !/Loading\b|Loading…|Loading\.\.\./.test(main.innerText);
  }, null, { timeout: 40000 });
  await page.waitForTimeout(500);
}

async function redact(page) {
  await page.evaluate((rs) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const n of nodes) for (const [src, flags, to] of rs) n.nodeValue = n.nodeValue.replace(new RegExp(src, flags), to);
  }, REDACT.map(([re, to]) => [re.source, re.flags, to]));
}

async function session(browser, email, mobile) {
  const ctx = await browser.newContext(mobile
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, timezoneId: 'Asia/Manila', locale: 'en-PH' }
    : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, timezoneId: 'Asia/Manila', locale: 'en-PH' });
  const page = await ctx.newPage();
  await page.goto(APP + '/login');
  await page.fill('#email', email);
  await page.fill('#password', PASSWORD);
  await page.click('button[type=submit]');
  await page.waitForURL(/\/(dashboard|my\/overview)/, { timeout: 60000 });
  await settle(page);
  return { ctx, page };
}

const only = process.argv.slice(2);
const list = SHOTS.filter((s) => only.length === 0 || only.includes(s.id));
fs.mkdirSync(OUT, { recursive: true });

const adminToken = (await api('POST', '/api/v1/auth/login', { email: ADMIN, password: PASSWORD })).accessToken;
// The site's accent (src/styles/global.css --accent-strong); the product's brand colour is a deployment setting.
const BRAND = { 'brand.name': 'HR & Payroll', 'brand.color.primary': '#0F766E' };
await api('PATCH', '/api/v1/config/system', { settings: BRAND }, adminToken);
const COMPANY = process.env.PRODUCT_COMPANY_ID ?? '11111111-1111-1111-1111-111111111111'; // the development seed's company
const found = await api('GET', `/api/v1/employees?companyId=${COMPANY}&q=${encodeURIComponent('Coder')}&size=5`, null, adminToken);
const ids = { employee: (found.content ?? []).find((e) => e.lastName === 'Coder')?.id };
const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
const sessions = {};
const manifest = [];
let failed = 0;
try {
  for (const s of list) {
    const key = `${s.as}${s.mobile ? '-mobile' : ''}`;
    sessions[key] ??= await session(browser, s.as === 'admin' ? ADMIN : EMPLOYEE, s.mobile);
    const { page } = sessions[key];
    try {
      if (!s.mobile) await page.setViewportSize({ width: 1440, height: s.height ?? 900 });
      await page.goto(APP + (typeof s.route === 'function' ? s.route() : s.route));
      await settle(page);
      if (s.before) { await s.before(page); await settle(page); }
      await redact(page);
      const file = path.join(OUT, `${s.id}.png`);
      await page.screenshot({ path: file });
      manifest.push({ id: s.id, title: s.title, route: typeof s.route === 'function' ? '/people/employees/:id' : s.route, account: s.as, mobile: !!s.mobile, capturedAt: new Date().toISOString() });
      console.log('ok  ', s.id);
    } catch (e) {
      failed++;
      console.log('FAIL', s.id, String(e.message ?? e).split('\n')[0]);
    }
  }
} finally {
  await browser.close();
  await api('PATCH', '/api/v1/config/system', { settings: Object.fromEntries(Object.keys(BRAND).map((k) => [k, ''])) }, adminToken).catch((e) => console.log('could not clear brand.name:', e.message));
}
const mf = path.join(OUT, 'capture.json');
const prev = fs.existsSync(mf) ? JSON.parse(fs.readFileSync(mf, 'utf8')) : [];
const merged = [...prev.filter((p) => !manifest.some((m) => m.id === p.id)), ...manifest];
fs.writeFileSync(mf, JSON.stringify(merged, null, 2));
process.exit(failed ? 1 : 0);
