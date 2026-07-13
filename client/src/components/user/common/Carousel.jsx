"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carousel — horizontally scrollable row with left/right arrow controls.
 * Children are laid out in a flex row; each child should have a fixed width.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.step=320]  pixels to scroll per arrow click
 */
export default function Carousel({ children, step = 320, className = "" }) {
  const ref = useRef(null);

  const scrollBy = (dir) => {
    ref.current?.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className={`group relative ${className}`}>
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-md transition hover:bg-gray-50 group-hover:md:flex"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={ref}
        className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-1"
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-md transition hover:bg-gray-50 group-hover:md:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
