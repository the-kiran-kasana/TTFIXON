import Image from "next/image";
import { BANNERS } from "../data/homeData";

/**
 * PromoBanner — reusable full-width promo strip with a real banner image.
 *
 * @param {object} props
 * @param {string} props.id  key into BANNERS (homeData)
 */
export default function PromoBanner({ id }) {
  const b = BANNERS[id];
  if (!b) return null;

  return (
    <section className="relative w-full overflow-hidden rounded-2xl" style={{ height: "220px" }}>
      {/* Background image */}
      <Image
        src={b.img}
        alt={b.heading}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        sizes="(max-width: 768px) 100vw, 1400px"
        priority={false}
      />

      {/* Dark overlay so text is always readable */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center px-6 sm:px-10">
        <div className="max-w-md">
          {b.tag && (
            <span className="mb-3 inline-block rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white">
              {b.tag}
            </span>
          )}
          <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            {b.heading}
          </h3>
          <p className="mt-1 text-sm text-white/85">{b.sub}</p>
          <button className="mt-5 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100">
            {b.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
