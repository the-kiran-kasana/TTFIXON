import { Star } from "lucide-react";

/**
 * RatingBadge — "★ 4.73" with an optional review count.
 */
export default function RatingBadge({ rating, count, className = "" }) {
  if (!rating) return null;
  return (
    <span className={`inline-flex items-center gap-1 text-sm text-gray-700 ${className}`}>
      <Star size={13} className="fill-gray-900 text-gray-900" />
      <span className="font-medium">{rating.toFixed(2)}</span>
      {count != null && <span className="text-gray-400">({count})</span>}
    </span>
  );
}
