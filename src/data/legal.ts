/** Shared facts for the legal pages. Update `legalUpdated` whenever a legal page changes. */
export const legalUpdated = '28 September 2026';

/** Who answers for the site until Bracket Systems is registered (see site.legalEntity). */
export const responsible = [
  { name: 'Kylie Cuadra', email: 'christkylie.cuadra@gmail.com' },
  { name: 'Prince Macalino', email: 'macalinoprinceallyson@gmail.com' },
  { name: 'Jansen Oribello', email: 'oribellojansen.fuentes@gmail.com' },
];

/** Third parties that process data for this website. Keep in step with the code (analytics, contact API, hosting). */
export const processors = [
  { name: 'Vercel Inc.', role: 'Hosting and delivery of this website; cookieless page-view analytics (Vercel Web Analytics).', where: 'United States and global edge network' },
  { name: 'Resend, Inc.', role: 'Delivering contact-form messages to our email inboxes (only when the form is used).', where: 'United States' },
  { name: 'Google (Gmail)', role: 'Our email inboxes, where your messages and our replies are kept.', where: 'Global' },
];
