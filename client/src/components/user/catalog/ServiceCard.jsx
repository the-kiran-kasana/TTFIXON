import Link from "next/link";
import { Zap } from "lucide-react";
import RatingBadge from "../common/RatingBadge";
import PriceTag from "../common/PriceTag";

/**
 * ServiceCard — a single service tile (image, name, rating, price).
 * Used inside "Most booked" and the category rails.
 *
 * @param {object} props
 * @param {object} props.service  { id, name, rating, price, mrp, instant, emoji }
 * @param {string} [props.href]
 */
export default function ServiceCard({ service, href = "#" }) {
  const { name, rating, price, mrp, instant, emoji } = service;
  return (
    <Link
      href={href}
      className="group flex w-[168px] shrink-0 flex-col sm:w-[190px]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
        <span className="absolute inset-0 flex items-center justify-center text-5xl transition group-hover:scale-105">
          {emoji}
        </span>
        {instant && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 shadow-sm">
            <Zap size={10} className="fill-amber-400 text-amber-400" /> Instant
          </span>
        )}
      </div>
      <div className="mt-2.5 space-y-1">
        <RatingBadge rating={rating} />
        <p className="line-clamp-2 text-sm font-medium leading-snug text-gray-800">
          {name}
        </p>
        <PriceTag price={price} mrp={mrp} />
      </div>
    </Link>
  );
}
