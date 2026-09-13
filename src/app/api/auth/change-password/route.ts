import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_CONFIG } from "@/lib/auth/constants";
import { verifyAdminSessionCookie } from "@/lib/auth/serverAuth";
import { updateAdminPassword } from "@/lib/services/adminAuthService";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { resolveClientIp } from "@/lib/services/rateLimiter";
import { verifyCsrfOrigin } from "@/lib/auth/csrf";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. CSRF verification
    const csrfCheck = verifyCsrfOrigin(request);
    if (!csrfCheck.valid) {
      return csrfCheck.response!;
    }

    // 2. Session verification
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;

    const session = await verifyAdminSessionCookie(sessionCookie);
    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    const clientIp = resolveClientIp(request.headers);

    let body: { currentPassword?: string; newPassword?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Both current password and new password are required." },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { success: false, error: "New password cannot be identical to your current password." },
        { status: 400 }
      );
    }

    // 3. Update password with current password verification
    const result = await updateAdminPassword({
      userIdOrEmail: session.user.email,
      newPassword,
      currentPassword,
    });

    if (!result.success) {
      await recordAuditLog({
        actor: {
          uid: session.user.uid,
          email: session.user.email,
          displayName: session.user.displayName,
          role: session.user.role,
          roleName: session.user.roleName,
          ipAddress: clientIp,
        },
        action: "PASSWORD_CHANGE",
        resourceType: "auth",
        summary: `Failed password change attempt for "${session.user.email}"`,
        status: "failure",
        errorMessage: result.error,
      });

      return NextResponse.json(
        { success: false, error: result.error || "Failed to update password." },
        { status: 400 }
      );
    }

    // 4. Record successful audit log
    await recordAuditLog({
      actor: {
        uid: session.user.uid,
        email: session.user.email,
        displayName: session.user.displayName,
        role: session.user.role,
        roleName: session.user.roleName,
        ipAddress: clientIp,
      },
      action: "PASSWORD_CHANGE",
      resourceType: "auth",
      summary: `Admin user "${session.user.displayName}" successfully updated their password`,
      status: "success",
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. Your new credentials are now active.",
    });
  } catch (error) {
    console.error("[POST /api/auth/change-password] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while changing password." },
      { status: 500 }
    );
  }
}
