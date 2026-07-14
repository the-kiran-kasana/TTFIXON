import { NextResponse } from "next/server";

/**
 * Server-side gate for the admin panel.
 * - Unauthenticated requests to /admin/* are redirected to /admin/login.
 * - Authenticated requests to /admin/login are redirected to the dashboard.
 * Presence of the `admin_token` cookie is used as the auth signal; the API
 * still validates the JWT on every protected request.
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;
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

export const config = {
  matcher: "/admin/:path*",
};
