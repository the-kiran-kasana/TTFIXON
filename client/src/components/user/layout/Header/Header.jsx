"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search, MapPin, ShoppingCart, ChevronDown,
  User, LayoutDashboard, CalendarDays, LogOut,
} from "lucide-react";
import { CURRENT_ADDRESS } from "../../data/homeData";
import { logout } from "@/store/slices/userAuthSlice";
import LoginModal from "../../auth/LoginModal";

export default function Header() {
  const router   = useRouter();
  const dispatch = useDispatch();
  const { user, token, hydrated } = useSelector((s) => s.userAuth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginOpen,    setLoginOpen]    = useState(false);
  const dropdownRef = useRef(null);

  // Close account dropdown on outside click
  useEffect(() => {
    function handle(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    router.push("/user");
  };

  const isLoggedIn  = hydrated && !!token;
  const displayName = user?.name || (user?.phone ? `+91 ${user.phone}` : "Account");
  const initials    = (user?.name || user?.phone || "U").charAt(0).toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/user" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-sm font-bold text-white">
              OD
            </span>
            <span className="hidden text-sm font-bold leading-tight text-gray-900 sm:block">
              On Demand
            </span>
          </Link>

          {/* Location + Search — centered */}
          <div className="flex flex-1 items-center justify-center gap-2">
            <button className="hidden max-w-[220px] items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-gray-300 md:flex">
              <MapPin size={15} className="shrink-0 text-gray-500" />
              <span className="truncate">{CURRENT_ADDRESS}</span>
              <ChevronDown size={14} className="shrink-0 text-gray-400" />
            </button>

            <div className="relative w-full max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for 'Electrician'"
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {/* Account area */}
          {!hydrated ? (
            <div className="hidden h-9 w-9 animate-pulse rounded-full bg-gray-100 sm:block" />
          ) : isLoggedIn ? (
            /* ── Logged in: avatar + dropdown ── */
            <div className="relative" ref={dropdownRef}>
              {/* Desktop */}
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="hidden items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 sm:flex"
                aria-label="Account menu"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  {initials}
                </span>
                <span className="max-w-[100px] truncate text-sm font-medium text-gray-700">
                  {displayName}
                </span>
                <ChevronDown
                  size={14}
                  className={`shrink-0 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Mobile */}
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:hidden"
              >
                <User size={20} />
              </button>

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-gray-900">{displayName}</p>
                    {user?.email && <p className="truncate text-xs text-gray-500">{user.email}</p>}
                    {user?.phone && <p className="text-xs text-gray-400">+91 {user.phone}</p>}
                  </div>

                  <div className="py-1">
                    <DropdownLink
                      href="/user/account"
                      icon={<LayoutDashboard size={15} />}
                      label="My Account"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <DropdownLink
                      href="/user/bookings"
                      icon={<CalendarDays size={15} />}
                      label="My Bookings"
                      onClick={() => setDropdownOpen(false)}
                    />
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── Not logged in: Login button → opens modal ── */
            <>
              {/* Desktop */}
              <button
                onClick={() => setLoginOpen(true)}
                className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:flex"
              >
                <User size={15} />
               </button>

              {/* Mobile */}
              <button
                onClick={() => setLoginOpen(true)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:hidden"
                aria-label="Login"
              >
                <User size={20} />
              </button>
            </>
          )}

          {/* Cart */}
          <Link href="/user/cart" className="rounded-lg p-2 text-gray-600 hover:bg-gray-100" aria-label="Cart">
            <ShoppingCart size={20} />
          </Link>
        </div>
      </header>

      {/* Login modal — rendered outside header so it overlays everything */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

function DropdownLink({ href, icon, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      <span className="text-gray-400">{icon}</span>
      {label}
    </Link>
  );
}
