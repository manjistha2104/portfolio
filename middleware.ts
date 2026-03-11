import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("laravel_token")?.value;

  if (pathname === "/admin") {
    if (token) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const protectedRoutes = [
    "/admin/dashboard",
    "/admin/project-form",
    "/admin/project-view",
    "/admin/edit-profile",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (
    (pathname.startsWith("/admin/login") ||
      pathname.startsWith("/admin/register")) &&
    token
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/login",
    "/admin/register",
    "/admin/dashboard/:path*",
    "/admin/project-form/:path*",
    "/admin/project-view/:path*",
    "/admin/edit-profile/:path*",
  ],
};