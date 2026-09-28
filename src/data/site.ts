/**
 * Company facts. Everything here comes from the first Bracket Systems site (bracketsystems.vercel.app, data.js) and
 * the team's published résumés - nothing invented. Update this file (not the pages) when facts change.
 */
export const site = {
  name: 'Bracket Systems',
  shortName: 'Bracket',
  tagline: 'We build systems that see, sort, and scale.',
  description:
    'Bracket Systems builds web platforms, computer-vision tools and enterprise systems, and makes HR & Payroll: ' +
    'employee records, Philippine payroll, attendance, leave and self-service in one platform.',
  /** Production origin; PUBLIC_SITE_URL overrides it at build time (astro.config.mjs). */
  url: 'https://bracketsystems.vercel.app',
  locale: 'en_PH',
  /** The team's own addresses (as on the first site); there's no shared inbox yet. */
  emails: ['christkylie.cuadra@gmail.com', 'macalinoprinceallyson@gmail.com', 'oribellojansen.fuentes@gmail.com'],
  /** Freelancing since (résumé: "freelancing since 2019"). */
  since: 2019,
  /**
   * Bracket Systems isn't a registered business yet. The legal pages say so and name the team as the people
   * responsible; replace this when the entity exists.
   */
  legalEntity: null as null | { name: string; address: string; registration: string },
  capabilities: ['Web', 'AI', 'Cloud', 'Enterprise'],
} as const;

export const nav = [
  { href: '/products/hr-payroll', label: 'Product' },
  { href: '/services', label: 'Services' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/work', label: 'Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
] as const;

export const footerNav = [
  {
    title: 'Product',
    links: [
      { href: '/products/hr-payroll', label: 'HR & Payroll' },
      { href: '/demo', label: 'Product tour' },
      { href: '/pricing', label: 'Editions & pricing' },
      { href: '/security', label: 'Security' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/services', label: 'Services' },
      { href: '/solutions', label: 'Solutions' },
      { href: '/work', label: 'Selected work' },
      { href: '/about', label: 'About & team' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/resources', label: 'FAQ & guides' },
      { href: '/resources#release-notes', label: 'Release notes' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/legal/privacy', label: 'Privacy policy' },
      { href: '/legal/cookies', label: 'Cookies & analytics' },
      { href: '/legal/terms', label: 'Terms of use' },
    ],
  },
] as const;
