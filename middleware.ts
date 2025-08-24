import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const sessionToken =
    request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token")

  const { pathname } = request.nextUrl

  // Check if the path requires authentication
  const protectedPaths = ["/dashboard", "/profile", "/settings", "/groups", "/subscriptions", "/payments"]

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  // If it's a protected path and no session token, redirect to signin
  if (isProtectedPath && !sessionToken) {
    const signInUrl = new URL("/api/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", request.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/groups/:path*",
    "/subscriptions/:path*",
    "/payments/:path*",
  ],
}
