import manifest from '../data/screenshots.json';

/** A captured product screen (src/data/screenshots.json, written by scripts/optimize-screenshots.mjs). */
export interface Shot {
  id: string;
  title: string;
  route: string;
  mobile: boolean;
  capturedAt: string;
  widths: number[];
  aspect: number;
}

const all = manifest as Record<string, Omit<Shot, 'id'>>;

export function shot(id: string): Shot {
  const s = all[id];
  if (!s) throw new Error(`No screenshot "${id}" - run npm run screenshots:capture && npm run screenshots:optimize`);
  return { id, ...s };
}

export const srcset = (s: Shot, format: 'avif' | 'webp') =>
  s.widths.map((w) => `/screenshots/${s.id}-${w}.${format} ${w}w`).join(', ');

export const fallback = (s: Shot) => `/screenshots/${s.id}-${s.widths[Math.min(1, s.widths.length - 1)]}.webp`;

/** Intrinsic size of the largest variant, so the browser reserves the right space (no layout shift). */
export function size(s: Shot) {
  const width = s.widths[s.widths.length - 1];
  return { width, height: Math.round(width / s.aspect) };
}
