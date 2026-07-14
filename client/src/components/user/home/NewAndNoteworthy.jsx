import Link from "next/link";
import Carousel from "../common/Carousel";
import { NOTEWORTHY } from "../data/homeData";

/**
 * NewAndNoteworthy — "New and noteworthy" square image cards.
 */
export default function NewAndNoteworthy() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        New and noteworthy
      </h2>
      <Carousel>
        {NOTEWORTHY.map((item) => (
          <Link
            key={item.id}
            href="#"
            className="group w-[calc((100%-64px)/5)] min-w-[190px] shrink-0"
          >
            <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-5xl">
              {item.badge && (
                <span className="absolute left-0 top-3 rounded-r-md bg-gray-900 px-2 py-1 text-[10px] font-bold uppercase text-white">
                  {item.badge}
                </span>
              )}
              <span className="transition group-hover:scale-105">{item.emoji}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-800">{item.label}</p>
          </Link>
        ))}
      </Carousel>
    </section>
  );
}
