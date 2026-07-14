"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NOTEWORTHY } from "../data/homeData";

/**
 * NewAndNoteworthy — "New and noteworthy" image cards with prev/next buttons
 * overlaid on the left and right edges of the row that slide it horizontally.
 */
export default function NewAndNoteworthy() {
  const trackRef = useRef(null);

  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    // Slide by roughly one card width (first child + gap).
    const card = track.firstElementChild;
    const gap = 16;
    const amount = card ? card.offsetWidth + gap : 220;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        New and noteworthy
      </h2>

      <div className="group relative">
        {/* prev — left edge */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => slide(-1)}
          className="absolute left-1 top-[38%] z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-md transition hover:bg-gray-50 active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={trackRef}
          className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-1"
        >
          {NOTEWORTHY.map((item) => (
            <Link
              key={item.id}
              href="#"
              className="group/card w-[calc((100%-64px)/5)] min-w-[190px] shrink-0"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                {item.badge && (
                  <span className="absolute left-0 top-3 z-10 rounded-r-md bg-gray-900 px-2 py-1 text-[10px] font-bold uppercase text-white">
                    {item.badge}
                  </span>
                )}
                <img
                  src={encodeURI(item.img)}
                  alt={item.label}
                  className="h-full w-full object-cover transition duration-300 group-hover/card:scale-105"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-800">{item.label}</p>
            </Link>
          ))}
        </div>

        {/* next — right edge */}
        <button
          type="button"
          aria-label="Next"
          onClick={() => slide(1)}
          className="absolute right-1 top-[38%] z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-md transition hover:bg-gray-50 active:scale-95"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
