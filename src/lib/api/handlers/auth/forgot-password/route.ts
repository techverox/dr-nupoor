import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase/admin";
import { checkRateLimit, resolveClientIp, RATE_LIMIT_PROFILES } from "@/lib/services/rateLimiter";
import { verifyCsrfOrigin } from "@/lib/auth/csrf";
import { recordAuditLog } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. CSRF Verification
    const csrfCheck = verifyCsrfOrigin(request);
    if (!csrfCheck.valid) {
      return csrfCheck.response!;
    }

    // 2. Rate Limiting by IP and Email
    const clientIp = resolveClientIp(request.headers);
    const rateCheck = checkRateLimit(`forgot_pw:${clientIp}`, RATE_LIMIT_PROFILES.PASSWORD_RESET);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many password reset requests. Please retry in ${rateCheck.retryAfterSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    let body: { email?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { email } = body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 3. Email-specific rate limiting
    const emailRateCheck = checkRateLimit(`forgot_pw_email:${cleanEmail}`, RATE_LIMIT_PROFILES.PASSWORD_RESET);
    if (!emailRateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many password reset requests for this account. Please wait 15 minutes before requesting again.",
        },
        { status: 429 }
      );
    }

    const adminAuth = getAdminAuth();
    if (adminAuth) {
      try {
        await adminAuth.generatePasswordResetLink(cleanEmail);
      } catch (error) {
        // Silently log on server to prevent user account enumeration
        console.log("[DigiVigee Auth] Password reset request for:", cleanEmail, error);
      }
    }

    // Record audit log event for security monitoring
    await recordAuditLog({
      actor: {
        uid: "system",
        email: cleanEmail,
        role: "guest",
        ipAddress: clientIp,
      },
      action: "UPDATE",
      resourceType: "auth",
      summary: `Password reset link requested for "${cleanEmail}" from IP ${clientIp}`,
      status: "success",
    });

    return NextResponse.json(
      {
        success: true,
        message: "If an admin account exists for this email, password reset instructions have been dispatched.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DigiVigee /api/auth/forgot-password] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal error processing request." },
      { status: 500 }
    );
  }
}
