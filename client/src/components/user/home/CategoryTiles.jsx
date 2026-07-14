import Link from "next/link";
import { CATEGORY_TILES } from "../data/homeData";

/**
 * CategoryTiles — the grid of primary service categories inside the hero card.
 */
export default function CategoryTiles() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CATEGORY_TILES.map((cat) => (
        <Link
          key={cat.id}
          href={cat.href}
          className="flex h-24 items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3 transition hover:border-gray-200 hover:bg-gray-100"
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-2xl shadow-sm">
            {cat.img ? (
              <img
                src={cat.img}
                alt={cat.label}
                className="h-full w-full object-cover"
              />
            ) : (
              cat.emoji
            )}
          </span>
          <span className="text-base font-semibold text-gray-800">
            {cat.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
