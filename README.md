# Bracket Systems website

The company website of Bracket Systems (Kylie Cuadra, Prince Macalino and Jansen Oribello): who we are, our services and
work, and our flagship product, **HR & Payroll**, shown with real screenshots of the running application and a
fictional demo company.

This is a standalone project. It doesn't need the HR & Payroll repository to install, build or run. That repository is
only used, optionally, to re-capture product screenshots.

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # production build (dist/ and .vercel/output/)
npm test             # Playwright: every page, accessibility, CSP, links, forms, API (build first)
npm run check        # TypeScript / Astro diagnostics
```

Requires Node.js 22.12 or later.

## Technology

| Area | Choice |
|---|---|
| Framework | [Astro 7](https://astro.build): static pages, with React 19 islands only where there is interaction (product tour, contact form) |
| Styling | Tailwind CSS 4, design tokens in `src/styles/global.css` |
| Fonts | Geist and JetBrains Mono, self-hosted through Fontsource (no Google Fonts requests) |
| Hosting | Vercel (`@astrojs/vercel`): static files plus one function, `/api/contact` |
| Analytics | Vercel Web Analytics: cookieless, opt-in by environment variable, visitor opt-out on `/legal/cookies` |
| Tests | Playwright + axe-core |

## Project structure

```text
src/
├── pages/            one file per route; /api/contact is the only server route
├── layouts/          BaseLayout (SEO, JSON-LD, header/footer, reveal + analytics script), LegalLayout
├── sections/         page sections: Hero, PageHero, ServicesGrid, WorkGrid, TeamGrid, SecurityBand, CTA
├── components/       Button, Icon, Logo, Screenshot, ProductFrame, StatusBadge, ProductShowcase (React), ContactForm (React)
├── data/             ALL content: site.ts, team.ts, work.ts, services.ts, resources.ts, security.ts, legal.ts,
│   │                 products/ (one file per product), screenshots.json (generated)
├── lib/              shots.ts (screenshot srcsets), analytics.ts
└── styles/global.css design tokens and base styles
public/
├── screenshots/      product screenshots, AVIF + WebP at several widths (generated)
├── og/               social cards (generated)
├── resumes/          the team's published résumés
└── favicon.*, icon-*.png, apple-touch-icon.png (generated)
scripts/
├── capture-product.mjs      captures screenshots from a local HR & Payroll with its demo data
├── optimize-screenshots.mjs PNG → AVIF/WebP + src/data/screenshots.json
├── brand-assets.mjs         icons and social cards
└── serve-static.mjs         serves the build with vercel.json's headers (used by the tests)
tests/                site.spec.ts (built site), api.spec.ts (contact API)
```

## Content

Every word on the site comes from `src/data/`. Pages only lay it out.

- **Company, navigation, emails:** `site.ts`. `legalEntity` is `null` until Bracket Systems is registered; the legal
  pages then need updating too (`legal.ts`, `src/pages/legal/`).
- **Team:** `team.ts` (roles, bios and skills as published by each person).
- **Work:** `work.ts`. Each project gets a page at `/work/<slug>` automatically.
- **Services, solutions, FAQ, guides, release notes:** `services.ts`, `resources.ts`.
- **Security claims:** `security.ts`. Keep it in step with the product's own security documentation.

**Accuracy rule.** Only publish what is verified: in the product's code or docs, the team's own published material, or
confirmed by the team. No invented clients, numbers, testimonials or certifications. Features that aren't finished use
the `status` field (`available`, `api`, `planned`), and a badge makes that visible.

### Adding a product

1. Add `src/data/products/<slug>.ts` exporting a `Product` (see `src/data/types.ts`), and register it in
   `src/data/products/index.ts`. `/products` lists it automatically.
2. Copy `src/pages/products/hr-payroll.astro` to `<slug>.astro` and point it at the new data (the sections are shared).
3. Add its screenshots (below) and, if you like, a tour (`tour` steps) and a social card.

## Product screenshots

The screenshots are real. They are captured from a **local** HR & Payroll installation, signed in as the fictional
accounts of its development seed ("Pioneer Test Co."). Never point the capture at a real installation.

```bash
# With HR & Payroll running locally (web app on :5173, gateway on :8080) and its full demo seed loaded:
npm run screenshots:capture            # all shots, or: node scripts/capture-product.mjs dashboard payroll-run
npm run screenshots:optimize           # → public/screenshots/*.avif|webp and src/data/screenshots.json
npm run brand:assets                   # refresh social cards (they use two of the screenshots)
```

The capture script:

- Sets the product's display name ("HR & Payroll") and brand colour (the site's teal) through the product's own
  settings API, then clears them again.
- Replaces any file name that isn't demo data before a shot is taken.

Review every image before committing. Raw PNGs stay in `scripts/.raw/`, which is git-ignored.

## Environment variables

See `.env.example`. Nothing is required for development.

| Variable | Purpose |
|---|---|
| `PUBLIC_SITE_URL` | Production origin, used for canonical URLs, the sitemap and social cards (default `https://bracketsystems.vercel.app`) |
| `PUBLIC_ANALYTICS` | `vercel` turns on Vercel Web Analytics. Also enable Web Analytics in the Vercel project |
| `RESEND_API_KEY`, `CONTACT_FROM` | Contact form delivery through [Resend](https://resend.com). `CONTACT_FROM` must be on a domain verified with Resend |
| `CONTACT_TO` | Comma-separated recipients (default: the three team addresses) |

Without Resend settings, the form tells the visitor it can't send and offers the same message as an email instead.
Nothing is lost.

## Deployment (Vercel)

1. Import the repository in Vercel. The framework preset is detected (Astro) and the build command is `npm run build`.
2. Set the environment variables above for Production.
3. Enable **Web Analytics** in the project if `PUBLIC_ANALYTICS=vercel`.
4. Add the custom domain, then set `PUBLIC_SITE_URL` to it and redeploy.

`vercel.json` adds the security headers: HSTS, `frame-ancestors 'none'`, nosniff, referrer policy, permissions policy
and COOP.

## Security

- **Content Security Policy:** Astro's CSP puts a `<meta>` policy with SHA-256 hashes of its own inline scripts and
  styles on every page. Scripts, styles, fonts, images and connections are limited to this origin. There are no inline
  style attributes and no third-party scripts; the analytics script is served from the same origin by Vercel.
- **Contact API:**
  - JSON only, with an 8 KB body cap, and Astro's origin check against cross-site posts.
  - Validation, control-character stripping, a honeypot field, and 5 messages per 10 minutes per address. That limit is
    per instance, so add a Vercel WAF rule for stronger protection.
  - HTML-escaped email content. Messages are not stored.
- **Secrets:** none are in the repository; `.env*` is git-ignored except `.env.example`.
- **Dependencies:** `npm audit` is clean. `path-to-regexp` is pinned to a patched 6.x through `overrides`, because the
  Vercel adapter's routing tool still asks for a vulnerable range.

## SEO and accessibility

- **SEO:**
  - Each page has a unique title, a description, a canonical URL, Open Graph and Twitter cards.
  - JSON-LD: Organization and WebSite on every page, SoftwareApplication on the product page, FAQPage on resources,
    CreativeWork on projects.
  - `sitemap-index.xml` and `robots.txt` are generated.
- **Accessibility (targeting WCAG 2.2 AA):**
  - Semantic landmarks, a skip link, one `h1` per page, visible focus rings, labelled form fields with errors linked
    through `aria-describedby`, and WAI-ARIA tabs with arrow-key support.
  - Reduced motion turns off the scroll reveal and the animations.
  - The tests run axe on every page.
- **Performance:**
  - Static HTML, with JavaScript only for the two islands.
  - AVIF/WebP screenshots in responsive `srcset`s, with explicit sizes so nothing shifts.
  - Lazy loading below the fold, self-hosted fonts, long cache on screenshots.

## Tests

`npm test` builds nothing itself. Run `npm run build` first. It checks:

- **Every page:**
  - Loads with status 200, one `h1`, a title, description, canonical and CSP meta tag.
  - No console errors (so no CSP violations) and no broken images.
  - No serious or critical axe violations.
- **Layout and links:** no horizontal overflow at 1440, 1280, 1024, 768, 390 and 375 px; every internal link resolves.
- **Behaviour:**
  - Security headers, robots.txt, the sitemap and the 404 page.
  - Product tour keyboard use, the mobile menu, and the contact form (validation, success, email fallback).
  - The analytics opt-out.
- **Contact API:** content type, validation, size limit, honeypot, unconfigured delivery, rate limit and methods.
