import { NextRequest, NextResponse } from "next/server";

// Canonical static fast-path redirects
const STATIC_REDIRECTS: Record<string, { dest: string; status: number }> = {
  "/growth-services": { dest: "/services", status: 301 },
  "/case-studies": { dest: "/portfolio", status: 301 },
  "/audit": { dest: "/contact", status: 301 },
  "/whatsapp": { dest: "https://wa.me/919081145178", status: 302 },
  "/blueprint": { dest: "/landing/performance-marketing-blueprint", status: 301 },
};

export function proxy(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    // Never intercept internal APIs, admin console, or Next.js internals
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/_next") ||
      pathname === "/favicon.ico"
    ) {
      return NextResponse.next();
    }

    const normalized = pathname.trim().toLowerCase();
    const cleanPath =
      normalized.endsWith("/") && normalized.length > 1
        ? normalized.slice(0, -1)
        : normalized;

    const match = STATIC_REDIRECTS[cleanPath];
    if (match) {
      const url = match.dest.startsWith("http")
        ? match.dest
        : new URL(match.dest, request.nextUrl.origin).toString();
      return NextResponse.redirect(new URL(url), match.status);
    }

    return NextResponse.next();
  } catch {
    return NextResponse.next();
  }
}

export default proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static file extensions (svg, png, jpg, jpeg, gif, webp, ico, css, js)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
