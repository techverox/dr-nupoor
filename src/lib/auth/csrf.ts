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
  const hostHeader = request.headers.get("host");

  // Determine application's expected origin
  const requestUrl = request.nextUrl;
  const expectedHost = hostHeader || requestUrl.host;

  if (originHeader) {
    try {
      const parsedOrigin = new URL(originHeader);
      // Origin host must match request host
      if (parsedOrigin.host.toLowerCase() === expectedHost.toLowerCase()) {
        return { valid: true };
      }
    } catch {
      // Invalid origin URL format
    }
  } else if (refererHeader) {
    try {
      const parsedReferer = new URL(refererHeader);
      // Referer host must match request host
      if (parsedReferer.host.toLowerCase() === expectedHost.toLowerCase()) {
        return { valid: true };
      }
    } catch {
      // Invalid referer format
    }
  } else {
    // If neither Origin nor Referer is present, allow in local development or server-to-server calls
    if (process.env.NODE_ENV === "development") {
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
