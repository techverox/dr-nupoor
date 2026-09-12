import { NextRequest, NextResponse } from "next/server";

interface CachedRedirect {
  id: string;
  sourcePath: string;
  destinationPath: string;
  statusCode: number;
}

// In-memory cache for ultra-fast, sub-millisecond redirect evaluation
let cachedRedirects: Map<string, CachedRedirect> = new Map();
let lastCacheFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

/**
 * Hydrates or refreshes the in-memory redirects cache from internal API non-blockingly.
 */
async function refreshRedirectsCache(originUrl: string): Promise<void> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const res = await fetch(`${originUrl}/api/redirects/resolve?all=true`, {
      headers: { "x-internal-middleware": "1" },
      cache: "no-store",
      signal: controller.signal,
    }).catch(() => null);

    clearTimeout(timeoutId);

    if (res && res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.success && Array.isArray(data.redirects)) {
        const nextMap = new Map<string, CachedRedirect>();
        for (const item of data.redirects) {
          if (item.sourcePath && item.destinationPath) {
            const key = item.sourcePath.trim().toLowerCase();
            nextMap.set(key, item);

            // Also index with and without trailing slash for robust URL resolution
            if (key.endsWith("/") && key.length > 1) {
              nextMap.set(key.slice(0, -1), item);
            } else if (!key.endsWith("/")) {
              nextMap.set(`${key}/`, item);
            }
          }
        }
        cachedRedirects = nextMap;
      }
    }
  } catch {
    // Non-blocking error handling: keep previous cache if available
  }
}

export async function proxy(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    // 1. Never intercept internal APIs, admin console, or Next.js internals
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/_next") ||
      pathname === "/favicon.ico"
    ) {
      return NextResponse.next();
    }

    const now = Date.now();
    const origin = request.nextUrl.origin;

    // 2. Refresh redirects cache asynchronously in the background (never block page response)
    if (now - lastCacheFetchTime > CACHE_TTL_MS) {
      lastCacheFetchTime = now;
      refreshRedirectsCache(origin).catch(() => {});
    }

    // 3. Check for matching redirect
    const normalizedPath = pathname.trim().toLowerCase();
    const redirect = cachedRedirects.get(normalizedPath);

    if (redirect) {
      let targetUrl: string;

      // Handle external full URL vs internal relative path
      if (
        redirect.destinationPath.startsWith("http://") ||
        redirect.destinationPath.startsWith("https://")
      ) {
        targetUrl = redirect.destinationPath;
      } else {
        const destination = new URL(redirect.destinationPath, origin);

        // Preserve query parameters from original request
        if (request.nextUrl.search) {
          request.nextUrl.searchParams.forEach((value, key) => {
            if (!destination.searchParams.has(key)) {
              destination.searchParams.set(key, value);
            }
          });
        }
        targetUrl = destination.toString();
      }

      // Fire-and-forget hit tracking to the API
      fetch(`${origin}/api/redirects/resolve?hit=${encodeURIComponent(redirect.id)}`, {
        cache: "no-store",
      }).catch(() => {});

      // Return 301 Permanent or 302 Temporary redirect
      const statusCode = redirect.statusCode === 302 ? 302 : 301;
      return NextResponse.redirect(new URL(targetUrl), statusCode);
    }

    return NextResponse.next();
  } catch (err) {
    console.warn("[proxy] Graceful fallback to next:", err);
    return NextResponse.next();
  }
}

// Backward compatibility alias & default export
export const middleware = proxy;
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
