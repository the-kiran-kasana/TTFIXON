/**
 * PriceTag — "₹299" with an optional struck-through MRP.
 */
export default function PriceTag({ price, mrp, className = "" }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span className="text-sm font-semibold text-gray-900">₹{price}</span>
      {mrp && mrp > price && (
        <span className="text-xs text-gray-400 line-through">₹{mrp}</span>
      )}
    </span>
  );
}
