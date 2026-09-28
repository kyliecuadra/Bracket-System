#!/usr/bin/env node
/**
 * Generates the icons and social cards from the bracket mark and the product screenshots:
 *   public/favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png
 *   public/og/default.png, public/og/hr-payroll.png (1200x630)
 * Run after the screenshots exist (npm run screenshots:optimize).
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (...p) => path.join(ROOT, 'public', ...p);

const mark = (bg = '#0b1220') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${bg}"/>
  <path d="M26 16 L18 16 L18 48 L26 48" fill="none" stroke="#2dd4bf" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M38 16 L46 16 L46 48 L38 48" fill="none" stroke="#f5a524" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="32" cy="32" r="3.5" fill="#f7f7fa"/>
</svg>`;

fs.writeFileSync(pub('favicon.svg'), mark());
const png = (size) => sharp(Buffer.from(mark())).resize(size, size).png().toBuffer();
fs.writeFileSync(pub('apple-touch-icon.png'), await png(180));
fs.writeFileSync(pub('icon-192.png'), await png(192));
fs.writeFileSync(pub('icon-512.png'), await png(512));

// favicon.ico: one 32x32 PNG inside an ICO container (supported by every current browser).
const ico32 = await png(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(ico32.length, 14); header.writeUInt32LE(22, 18);
fs.writeFileSync(pub('favicon.ico'), Buffer.concat([header, ico32]));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
async function card(file, { eyebrow, title, subtitle, shot }) {
  const W = 1200, H = 630;
  const grid = Array.from({ length: 26 }, (_, i) => `<path d="M${i * 48} 0V${H}M0 ${i * 48}H${W}" stroke="rgba(255,255,255,0.06)"/>`).join('');
  const lines = title.split('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><radialGradient id="g" cx="0.15" cy="0" r="0.9"><stop offset="0" stop-color="#0f766e" stop-opacity="0.55"/><stop offset="1" stop-color="#070b14" stop-opacity="0"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="#070b14"/>${grid}<rect width="${W}" height="${H}" fill="url(#g)"/>
    <g transform="translate(64 60) scale(0.9)">${mark().replace(/<\/?svg[^>]*>/g, '')}</g>
    <text x="136" y="100" font-family="Consolas, 'JetBrains Mono', monospace" font-size="22" letter-spacing="5" fill="#ffffff">BRACKET SYSTEMS</text>
    <text x="64" y="190" font-family="Consolas, monospace" font-size="20" letter-spacing="3" fill="#2dd4bf">${esc(eyebrow)}</text>
    ${lines.map((l, i) => `<text x="64" y="${262 + i * 66}" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="54" fill="#ffffff">${esc(l)}</text>`).join('')}
    <text x="64" y="${262 + lines.length * 66 + 20}" font-family="'Segoe UI', Arial, sans-serif" font-size="24" fill="#c7cfdb">${esc(subtitle)}</text>
  </svg>`;
  const shotBuf = await sharp(path.join(ROOT, 'scripts', '.raw', `${shot}.png`)).resize({ width: 470 }).extract({ left: 0, top: 0, width: 470, height: 294 }).png().toBuffer();
  const framed = await sharp({ create: { width: 482, height: 306, channels: 4, background: '#ffffff' } })
    .composite([{ input: shotBuf, left: 6, top: 6 }]).png().toBuffer();
  await sharp(Buffer.from(svg)).composite([{ input: framed, left: 690, top: 296 }]).png({ compressionLevel: 9 }).toFile(pub('og', file));
}
fs.mkdirSync(pub('og'), { recursive: true });
await card('default.png', { eyebrow: '[ WEB · AI · CLOUD · ENTERPRISE ]', title: 'We build systems that\nsee, sort, and scale.', subtitle: 'Web platforms, computer vision, enterprise systems', shot: 'dashboard' });
await card('hr-payroll.png', { eyebrow: '[ HR & PAYROLL ]', title: 'People, pay and time\nin one platform.', subtitle: 'Philippine payroll · self-service · on your servers', shot: 'payroll-run' });
console.log('brand assets written');
