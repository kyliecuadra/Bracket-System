import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { TourStep } from '../data/types';
import { fallback, shot, size, srcset } from '../lib/shots';

/**
 * The product tour: tabs of real HR & Payroll screens (fictional demo data). Keyboard: arrow keys, Home and End move
 * between tabs (WAI-ARIA tabs pattern). Only the selected screen is loaded.
 */
export default function ProductShowcase({ steps, dark = false }: { steps: TourStep[]; dark?: boolean }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const step = steps[active];
  const s = shot(step.id);
  const { width, height } = size(s);

  const select = (i: number) => {
    const next = (i + steps.length) % steps.length;
    setActive(next);
    tabs.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: steps.length - 1 };
    if (e.key in keys) { e.preventDefault(); select(keys[e.key]); }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:gap-10">
      <div
        role="tablist"
        aria-label="Product screens"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {steps.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={[
                'group flex shrink-0 items-center gap-3 rounded-full px-4 py-2 text-left text-sm whitespace-nowrap transition-colors lg:rounded-lg lg:py-2.5',
                selected
                  ? dark ? 'bg-white/10 font-medium text-white ring-1 ring-white/20' : 'bg-panel font-medium text-ink shadow-sm ring-1 ring-line'
                  : dark ? 'text-night-text hover:bg-white/5 hover:text-white' : 'text-muted hover:bg-tray hover:text-ink',
              ].join(' ')}
            >
              <span className={['hidden font-mono text-[0.7rem] lg:inline', selected ? (dark ? 'text-signal' : 'text-accent') : (dark ? 'text-night-text' : 'text-muted')].join(' ')}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {t.label}
            </button>
          );
        })}
      </div>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} tabIndex={0} className="min-w-0 rounded-xl">
        <figure className="overflow-hidden rounded-xl bg-panel shadow-[var(--shadow-frame)] ring-1 ring-ink/10">
          <div className="flex h-9 items-center gap-2 border-b border-line bg-tray px-4" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="ml-3 hidden truncate rounded-md bg-panel px-3 py-0.5 font-mono text-[0.7rem] text-muted ring-1 ring-line sm:block">hr-payroll.example{s.route}</span>
          </div>
          <picture key={s.id} className="block animate-[rise_0.45s_ease-out_both]">
            <source type="image/avif" srcSet={srcset(s, 'avif')} sizes="(min-width: 1280px) 900px, 100vw" />
            <source type="image/webp" srcSet={srcset(s, 'webp')} sizes="(min-width: 1280px) 900px, 100vw" />
            <img src={fallback(s)} width={width} height={height} alt={`HR & Payroll — ${s.title} (fictional demo data)`} className="block h-auto w-full" loading="lazy" decoding="async" />
          </picture>
        </figure>
        <p className={['mt-4 max-w-2xl text-[0.95rem] leading-relaxed', dark ? 'text-night-text' : 'text-muted'].join(' ')} aria-live="polite">
          <span className={['font-medium', dark ? 'text-white' : 'text-ink'].join(' ')}>{step.label}. </span>
          {step.caption}
        </p>
      </div>
    </div>
  );
}
