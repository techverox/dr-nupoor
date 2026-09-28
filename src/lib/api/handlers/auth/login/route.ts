import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_CONFIG } from "@/lib/auth/constants";
import { createAdminSessionCookie } from "@/lib/auth/serverAuth";
import { verifyAdminCredentials } from "@/lib/services/adminAuthService";
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

    let body: { email?: string; password?: string; rememberMe?: boolean };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { email, password, rememberMe } = body;

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Both email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 3. Dual-Layer Admin Verification
    const authResult = await verifyAdminCredentials(cleanEmail, password);

    if (!authResult.success || !authResult.user) {
      await recordAuditLog({
        actor: {
          uid: "unauthenticated",
          email: cleanEmail,
          role: "anonymous",
          ipAddress: clientIp,
        },
        action: "LOGIN",
        resourceType: "auth",
        summary: `Failed administrative login attempt for "${cleanEmail}" from IP ${clientIp}`,
        status: "failure",
        errorMessage: authResult.error || "Invalid credentials",
      });

      return NextResponse.json(
        { success: false, error: authResult.error || "Invalid email or password." },
        { status: 401 }
      );
    }

    // Reset rate limiter on successful authentication
    resetRateLimit(`login:${clientIp}`);

    const user = authResult.user;

    // 4. Session Cookie Generation
    let sessionCookieValue: string;
    const maxAgeSeconds = rememberMe ? 14 * 24 * 60 * 60 : 24 * 60 * 60; // 14 days vs 24 hours

    if (authResult.idToken) {
      const sessionResult = await createAdminSessionCookie(authResult.idToken, user.email);
      if (sessionResult.success && sessionResult.sessionCookie) {
        sessionCookieValue = sessionResult.sessionCookie;
      } else {
        // Safe fallback token
        const payload = {
          uid: user.id,
          email: user.email,
          displayName: user.displayName,
          role: user.roleId,
          roleName: user.roleName,
          exp: Date.now() + maxAgeSeconds * 1000,
          created: Date.now(),
        };
        sessionCookieValue = `digivigee-session-${Buffer.from(JSON.stringify(payload)).toString("base64url")}`;
      }
    } else {
      const payload = {
        uid: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.roleId,
        roleName: user.roleName,
        exp: Date.now() + maxAgeSeconds * 1000,
        created: Date.now(),
      };
      sessionCookieValue = `digivigee-session-${Buffer.from(JSON.stringify(payload)).toString("base64url")}`;
    }

    // 5. Set Secure HTTP-Only Cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_CONFIG.SESSION_COOKIE_NAME, sessionCookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAgeSeconds,
    });

    // 6. Record Audit Log
    await recordAuditLog({
      actor: {
        uid: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.roleId,
        roleName: user.roleName,
        ipAddress: clientIp,
      },
      action: "LOGIN",
      resourceType: "auth",
      summary: `Admin user "${user.displayName}" (${user.email}) logged in successfully (${authResult.method})`,
      status: "success",
      metadata: { method: authResult.method, rememberMe: !!rememberMe },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        roleId: user.roleId,
        roleName: user.roleName,
      },
    });
  } catch (error) {
    console.error("[POST /api/auth/login] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
