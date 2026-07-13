import Link from "next/link";
import { NATIVE_PRODUCTS } from "../data/homeData";

/**
 * NativeProducts — the "Native Smart Products" sub-grid inside the hero card.
 */
export default function NativeProducts() {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-gray-800">
        Native Smart Products
      </h3>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {NATIVE_PRODUCTS.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 p-2 text-center transition hover:border-gray-200 hover:bg-gray-100"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl shadow-sm">
              {p.emoji}
            </span>
            <span className="text-[11px] font-medium leading-tight text-gray-700">
              {p.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
