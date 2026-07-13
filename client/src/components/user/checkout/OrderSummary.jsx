"use client";

/**
 * OrderSummary — item list + price breakup shown at checkout.
 *
 * @param {object}   props
 * @param {Array}    props.items          [{ id, name, qty, price }]
 * @param {number}   [props.itemTotal]    defaults to sum of items
 * @param {number}   [props.discount=0]
 * @param {number}   [props.taxes=0]
 * @param {number}   [props.visitationFee=0]
 * @param {string}   [props.coupon]       applied coupon code
 * @param {Function} [props.onPlaceOrder] () => void  (renders CTA when provided)
 * @param {boolean}  [props.loading=false]
 */
export default function OrderSummary({
  items = [],
  itemTotal,
  discount = 0,
  taxes = 0,
  visitationFee = 0,
  coupon,
  onPlaceOrder,
  loading = false,
}) {
  const computedItemTotal =
    itemTotal ?? items.reduce((sum, it) => sum + it.price * (it.qty ?? 1), 0);
  const total = computedItemTotal + taxes + visitationFee - discount;

  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <h3 className="mb-4 text-base font-semibold text-gray-900">Order summary</h3>

      {/* items */}
      <ul className="space-y-2.5 border-b border-dashed border-gray-200 pb-4">
        {items.map((it) => (
          <li key={it.id} className="flex items-start justify-between text-sm">
            <span className="text-gray-700">
              {it.name}
              {it.qty > 1 && <span className="text-gray-400"> × {it.qty}</span>}
            </span>
            <span className="font-medium text-gray-900">
              ₹{it.price * (it.qty ?? 1)}
            </span>
          </li>
        ))}
      </ul>

      {/* price breakup */}
      <dl className="space-y-2 py-4 text-sm">
        <Row label="Item total" value={`₹${computedItemTotal}`} />
        {discount > 0 && (
          <Row
            label={coupon ? `Discount (${coupon})` : "Discount"}
            value={`- ₹${discount}`}
            valueClass="text-green-600"
          />
        )}
        {visitationFee > 0 && <Row label="Visitation fee" value={`₹${visitationFee}`} />}
        {taxes > 0 && <Row label="Taxes & fees" value={`₹${taxes}`} />}
      </dl>

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-base font-semibold text-gray-900">Total</span>
        <span className="text-base font-semibold text-gray-900">₹{total}</span>
      </div>

      {onPlaceOrder && (
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={loading || items.length === 0}
          className="mt-5 w-full rounded-lg bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Placing order…" : `Pay ₹${total}`}
        </button>
      )}
    </div>
  );
}

function Row({ label, value, valueClass = "text-gray-900" }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-gray-500">{label}</dt>
      <dd className={`font-medium ${valueClass}`}>{value}</dd>
    </div>
  );
}
