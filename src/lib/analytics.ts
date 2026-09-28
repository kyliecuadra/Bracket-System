/**
 * Privacy-friendly analytics: Vercel Web Analytics (no cookies, no cross-site tracking; it counts page views with an
 * anonymous, daily-rotating hash). It only loads in production builds with PUBLIC_ANALYTICS=vercel, and not when the visitor opted out
 * on /legal/cookies or their browser sends Global Privacy Control or Do Not Track.
 */
export const OPT_OUT_KEY = 'bs.analytics';

export function optedOut(): boolean {
  try {
    if (localStorage.getItem(OPT_OUT_KEY) === 'off') return true;
  } catch { /* storage blocked: treat as not opted out, the signals below still apply */ }
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || nav.doNotTrack === '1';
}

export function setOptOut(off: boolean) {
  try {
    if (off) localStorage.setItem(OPT_OUT_KEY, 'off');
    else localStorage.removeItem(OPT_OUT_KEY);
  } catch { /* storage blocked: nothing to remember */ }
}

export async function startAnalytics() {
  // PUBLIC_ANALYTICS=vercel turns it on; set it together with "Web Analytics" in the Vercel project, which serves the script.
  if (!import.meta.env.PROD || import.meta.env.PUBLIC_ANALYTICS !== 'vercel' || optedOut()) return;
  const { inject } = await import('@vercel/analytics');
  inject({
    mode: 'production',
    // Drop query strings (they can carry what someone typed into a form link).
    beforeSend: (event) => (optedOut() ? null : { ...event, url: event.url.split('?')[0] }),
  });
}
