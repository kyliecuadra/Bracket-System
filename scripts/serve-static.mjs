#!/usr/bin/env node
/**
 * Serves the built site (dist/client) like Vercel does for tests: clean URLs, the 404 page, and the headers from
 * vercel.json. Usage: node scripts/serve-static.mjs [port]
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist', 'client');
const PORT = Number(process.argv[2] ?? 4322);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };
const rules = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')).headers;

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/\/+$/, '') || '/';
  const base = path.normalize(path.join(DIST, clean));
  if (!base.startsWith(DIST)) return null;
  for (const f of [base, path.join(base, 'index.html'), base + '.html']) {
    if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}

http.createServer((req, res) => {
  for (const r of rules) {
    const re = new RegExp('^' + r.source.replace('(.*)', '.*') + '$');
    if (re.test(req.url.split('?')[0])) for (const h of r.headers) res.setHeader(h.key, h.value);
  }
  const file = resolve(req.url);
  if (!file) {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    return fs.createReadStream(path.join(DIST, '404.html')).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`serving ${DIST} on http://localhost:${PORT}`));
