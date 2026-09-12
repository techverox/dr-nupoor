import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminSessionCookie, AUTH_CONFIG, verifyAdminSessionCookie } from "@/lib/auth";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { checkRateLimit, resetRateLimit, resolveClientIp, RATE_LIMIT_PROFILES } from "@/lib/services/rateLimiter";
import { verifyCsrfOrigin } from "@/lib/auth/csrf";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. CSRF & Origin Validation
    const csrfCheck = verifyCsrfOrigin(request);
    if (!csrfCheck.valid) {
      return csrfCheck.response!;
    }

    // 2. Client IP & Brute-Force Rate Limiting
    const clientIp = resolveClientIp(request.headers);
    const rateCheck = checkRateLimit(`login:${clientIp}`, RATE_LIMIT_PROFILES.LOGIN_ATTEMPT);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed authentication attempts. Please retry in ${rateCheck.retryAfterSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    let body: { idToken?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { idToken } = body;

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json(
        { success: false, error: "ID token is required." },
        { status: 400 }
      );
    }

    const result = await createAdminSessionCookie(idToken);

    if (!result.success || !result.sessionCookie) {
      // Record failed login audit attempt
      await recordAuditLog({
        actor: {
          uid: "unauthenticated",
          email: "unknown",
          role: "anonymous",
          ipAddress: clientIp,
        },
        action: "LOGIN",
        resourceType: "auth",
        summary: `Failed administrative login attempt from IP ${clientIp}`,
        status: "failure",
        errorMessage: result.error || "Invalid ID token credential",
      });

      return NextResponse.json(
        { success: false, error: result.error || "Failed to establish admin session." },
        { status: 401 }
      );
    }

    // Reset rate limiter bucket on successful authentication
    resetRateLimit(`login:${clientIp}`);

    // Set secure HTTP-only session cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_CONFIG.SESSION_COOKIE_NAME, result.sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: AUTH_CONFIG.SESSION_MAX_AGE_SECONDS,
    });

    // Record login audit event
    const session = await verifyAdminSessionCookie(result.sessionCookie);
    if (session.authenticated && session.user) {
      await recordAuditLog({
        actor: {
          uid: session.user.uid,
          email: session.user.email,
          role: session.user.role || "super_admin",
          roleName: session.user.roleName,
          ipAddress: clientIp,
        },
        action: "LOGIN",
        resourceType: "auth",
        summary: `Admin user "${session.user.email}" signed in successfully`,
        status: "success",
      });
    }

    return NextResponse.json(
      { success: true, message: "Admin session successfully created." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DigiVigee /api/auth/session] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal authentication error." },
      { status: 500 }
    );
  }
}
