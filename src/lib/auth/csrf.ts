import { NextRequest, NextResponse } from "next/server";

/**
 * Dr. Noopur Patel Platform — CSRF & Cross-Origin Mutation Verification Guard
 *
 * Verifies that state-changing requests (POST, PUT, PATCH, DELETE) originate
 * from legitimate application origins, preventing Cross-Site Request Forgery.
 */

export function verifyCsrfOrigin(request: NextRequest): {
  valid: boolean;
  response?: NextResponse;
} {
  const method = request.method.toUpperCase();
  // Safe read-only methods do not require origin check
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return { valid: true };
  }

  const originHeader = request.headers.get("origin");
  const refererHeader = request.headers.get("referer");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = request.headers.get("host");

  // Determine application's expected origin hosts
  const requestUrl = request.nextUrl;
  const validHosts = new Set(
    [forwardedHost, hostHeader, requestUrl.host, requestUrl.hostname]
      .filter(Boolean)
      .map((h) => h!.toLowerCase().split(":")[0])
  );

  if (originHeader) {
    try {
      const parsedOrigin = new URL(originHeader);
      const originHost = parsedOrigin.hostname.toLowerCase();
      if (
        validHosts.has(originHost) ||
        originHost.endsWith(".vercel.app") ||
        originHost === "localhost" ||
        originHost === "127.0.0.1"
      ) {
        return { valid: true };
      }
    } catch {
      // Invalid origin URL format
    }
  } else if (refererHeader) {
    try {
      const parsedReferer = new URL(refererHeader);
      const refererHost = parsedReferer.hostname.toLowerCase();
      if (
        validHosts.has(refererHost) ||
        refererHost.endsWith(".vercel.app") ||
        refererHost === "localhost" ||
        refererHost === "127.0.0.1"
      ) {
        return { valid: true };
      }
    } catch {
      // Invalid referer format
    }
  } else {
    // If neither Origin nor Referer is present, allow in development or server-to-server calls
    if (process.env.NODE_ENV === "development" || (!originHeader && !refererHeader)) {
      return { valid: true };
    }
  }

  // Cross-origin mutation attempt detected
  return {
    valid: false,
    response: NextResponse.json(
      {
        success: false,
        error: "Cross-Origin Request Blocked: CSRF validation failed.",
      },
      { status: 403 }
    ),
  };
}
