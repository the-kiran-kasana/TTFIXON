import { BANNERS } from "../data/homeData";

/**
 * PromoBanner — reusable full-width promo strip.
 * Drives Wall Panels, Native Smart Locks, Home painting, RO purifier.
 *
 * @param {object} props
 * @param {string} props.id  key into BANNERS (homeData)
 */
export default function PromoBanner({ id }) {
  const b = BANNERS[id];
  if (!b) return null;

  return (
    <section
      className={`relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl px-6 py-8 sm:px-10 sm:py-10 ${b.bg} ${b.text}`}
    >
      <div className="max-w-md">
        {b.tag && (
          <span
            className={`mb-3 inline-block rounded-md px-2.5 py-1 text-[11px] font-semibold ${
              b.dark ? "bg-white/15 text-white" : "bg-black/10 text-gray-800"
            }`}
          >
            {b.tag}
          </span>
        )}
        {b.brand && (
          <p className="mb-1 text-xs font-bold tracking-[0.3em] opacity-80">
            {b.brand}
          </p>
        )}
        <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
          {b.heading}
        </h3>
        <p className="mt-1 text-sm opacity-80">{b.sub}</p>
        <button
          className={`mt-5 rounded-lg px-5 py-2.5 text-sm font-semibold ${
            b.dark ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {b.cta}
        </button>
      </div>
      <span className="hidden shrink-0 text-7xl opacity-90 sm:block">{b.emoji}</span>
    </section>
  );
}
