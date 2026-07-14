import Carousel from "../common/Carousel";
import { SPOTLIGHT } from "../data/homeData";

/**
 * SpotlightSection — "In the spotlight" promotional cards.
 */
export default function SpotlightSection() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        In the spotlight
      </h2>
      <Carousel step={360}>
        {SPOTLIGHT.map((card) => (
          <article
            key={card.id}
            className="relative flex h-56 w-[calc((100%-32px)/3)] min-w-[300px] shrink-0 overflow-hidden rounded-2xl"
          >
            {/* background image */}
            <img
              src={encodeURI(card.img)}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* dark overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

            {/* content */}
            <div className="relative z-10 flex max-w-[70%] flex-col justify-end p-5">
              {card.tag && (
                <span className="mb-2 inline-block w-fit rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-gray-900">
                  {card.tag}
                </span>
              )}
              <h3 className="text-lg font-bold leading-snug text-white drop-shadow">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="mt-0.5 text-xs text-gray-200">{card.subtitle}</p>
              )}
              <button className="mt-3 w-fit rounded-lg bg-white px-4 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-100">
                {card.cta}
              </button>
            </div>
          </article>
        ))}
      </Carousel>
    </section>
  );
}
