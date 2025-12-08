// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/login", "/"]; // public routes

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Protect only /dashboard
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      const role = payload.role;

      // Only admin can access dashboard
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Admin → allow
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Other routes are accessible by everyone
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // only apply to /dashboard
};
