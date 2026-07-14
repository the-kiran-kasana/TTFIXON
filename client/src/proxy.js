import { NextResponse } from "next/server";

// User-panel routes that require a logged-in customer.
const PROTECTED_USER_PREFIXES = [
  "/user/account",
  "/user/bookings",
  "/user/cart",
  "/user/checkout",
];

/**
 * Server-side gate for the admin panel.
 * - Unauthenticated requests to /admin/* are redirected to /admin/login.
 * - Authenticated requests to /admin/login are redirected to the dashboard.
 */
function handleAdmin(request, pathname) {
  const token = request.cookies.get("admin_token")?.value;
  const isLoginPage = pathname === "/admin/login";

  if (!token && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (token && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/**
 * Server-side gate for the customer panel.
 * - Only account/bookings/cart/checkout require login; home & catalog are public.
 * - Missing `user_token` cookie → redirect to /user/login?redirect=<original path>.
 * - Already logged in and visiting /user/login → send to the panel home.
 */
function handleUser(request, pathname) {
  const token = request.cookies.get("user_token")?.value;
  const isLoginPage = pathname === "/user/login";

  const isProtected = PROTECTED_USER_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/user/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginPage && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/user";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) return handleAdmin(request, pathname);
  if (pathname.startsWith("/user")) return handleUser(request, pathname);

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
