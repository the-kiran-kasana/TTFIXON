import Link from "next/link";
import { CATEGORY_TILES } from "../data/homeData";

/**
 * CategoryTiles — the grid of primary service categories inside the hero card.
 */
export default function CategoryTiles() {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {CATEGORY_TILES.map((cat) => (
        <Link
          key={cat.id}
          href={cat.href}
          className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 p-2 text-center transition hover:border-gray-200 hover:bg-gray-100"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl shadow-sm">
            {cat.emoji}
          </span>
          <span className="text-[11px] font-medium leading-tight text-gray-700">
            {cat.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
