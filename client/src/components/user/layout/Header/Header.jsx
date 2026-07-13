"use client";

import Link from "next/link";
import { Search, MapPin, ShoppingCart, ChevronDown, User } from "lucide-react";
import { TOP_NAV, CURRENT_ADDRESS } from "../../data/homeData";

/**
 * Header — sticky top bar: logo, primary nav, location, search, cart, account.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-4 py-3">
        {/* logo */}
        <Link href="/user" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-sm font-bold text-white">
            UC
          </span>
          <span className="hidden text-sm font-bold leading-tight text-gray-900 sm:block">
            Urban
            <br />
            Company
          </span>
        </Link>

        {/* primary nav */}
        <nav className="hidden items-center gap-5 pl-2 lg:flex">
          {TOP_NAV.map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* location */}
        <button className="ml-auto hidden max-w-[220px] items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-gray-300 md:flex">
          <MapPin size={15} className="shrink-0 text-gray-500" />
          <span className="truncate">{CURRENT_ADDRESS}</span>
          <ChevronDown size={14} className="shrink-0 text-gray-400" />
        </button>

        {/* search */}
        <div className="relative ml-auto w-full max-w-xs md:ml-0">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search for 'Kitchen cleaning'"
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-gray-400"
          />
        </div>

        {/* account + cart */}
        <Link
          href="/user/login"
          className="hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:block"
          aria-label="Account"
        >
          <User size={20} />
        </Link>
        <Link
          href="/user/cart"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Cart"
        >
          <ShoppingCart size={20} />
        </Link>
      </div>
    </header>
  );
}
