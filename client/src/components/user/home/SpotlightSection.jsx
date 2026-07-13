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
            className={`flex w-[300px] shrink-0 items-center gap-4 rounded-2xl p-5 ${card.bg} sm:w-[340px]`}
          >
            <div className="flex-1">
              {card.tag && (
                <span
                  className={`mb-2 inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold ${card.tagTone}`}
                >
                  {card.tag}
                </span>
              )}
              <h3 className="text-lg font-bold leading-snug text-gray-900">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="mt-0.5 text-xs text-gray-600">{card.subtitle}</p>
              )}
              <button className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800">
                {card.cta}
              </button>
            </div>
            <span className="text-5xl">{card.emoji}</span>
          </article>
        ))}
      </Carousel>
    </section>
  );
}
