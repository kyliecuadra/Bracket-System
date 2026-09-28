// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// The production origin: canonical URLs, the sitemap and social cards use it. Set PUBLIC_SITE_URL when the domain changes.
const SITE = process.env.PUBLIC_SITE_URL || 'https://bracketsystems.vercel.app';

export default defineConfig({
  site: SITE,
  output: 'static',
  // Static pages everywhere; only /api/contact runs on demand (a Vercel function).
  adapter: vercel(),
  trailingSlash: 'never',
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/api/') })],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
  security: {
    // Content-Security-Policy as a <meta> tag with hashes of Astro's own inline scripts and styles. Anything else
    // (inline style attributes, third-party scripts) is refused. frame-ancestors can't live in a meta tag: vercel.json
    // sends it as a header along with the other security headers.
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' data:", // Vite inlines the smallest font subsets as data: URLs
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: { resources: ["'self'"] },
      styleDirective: { resources: ["'self'"] },
    },
  },
});
