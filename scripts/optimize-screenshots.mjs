#!/usr/bin/env node
/**
 * scripts/.raw/*.png (from capture-product.mjs) -> public/screenshots/<id>-<width>.{avif,webp} plus
 * src/data/screenshots.json (sizes and capture details the site reads). Desktop shots get 800/1280/1920 px widths,
 * phone shots 390/780.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW = path.join(ROOT, 'scripts', '.raw');
const OUT = path.join(ROOT, 'public', 'screenshots');
const capture = JSON.parse(fs.readFileSync(path.join(RAW, 'capture.json'), 'utf8'));

fs.mkdirSync(OUT, { recursive: true });
const manifest = {};
for (const c of capture) {
  const src = path.join(RAW, `${c.id}.png`);
  if (!fs.existsSync(src)) continue;
  const meta = await sharp(src).metadata();
  const widths = (c.mobile ? [390, 780] : [800, 1280, 1920]).filter((w) => w <= meta.width);
  for (const w of widths) {
    const img = sharp(src).resize({ width: w });
    await img.clone().avif({ quality: 55, effort: 6 }).toFile(path.join(OUT, `${c.id}-${w}.avif`));
    await img.clone().webp({ quality: 80 }).toFile(path.join(OUT, `${c.id}-${w}.webp`));
  }
  manifest[c.id] = {
    title: c.title, route: c.route, account: c.account, mobile: c.mobile, capturedAt: c.capturedAt,
    widths, aspect: +(meta.width / meta.height).toFixed(4),
  };
  console.log(c.id, widths.join('/'));
}
fs.writeFileSync(path.join(ROOT, 'src', 'data', 'screenshots.json'), JSON.stringify(manifest, null, 2) + '\n');
