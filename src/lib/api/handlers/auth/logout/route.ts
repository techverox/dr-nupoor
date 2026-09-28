import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeAdminSession, AUTH_CONFIG, verifyAdminSessionCookie } from "@/lib/auth";
import { recordAuditLog } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;

    if (sessionCookie) {
      const session = await verifyAdminSessionCookie(sessionCookie);
      if (session.authenticated && session.user) {
        await recordAuditLog({
          actor: {
            uid: session.user.uid,
            email: session.user.email,
            role: session.user.role || "super_admin",
            roleName: session.user.roleName,
          },
          action: "LOGOUT",
          resourceType: "auth",
          summary: `Admin user "${session.user.email}" signed out`,
          status: "success",
        });
      }

      await revokeAdminSession(sessionCookie);
    }

    // Clear session cookie
    cookieStore.delete(AUTH_CONFIG.SESSION_COOKIE_NAME);

    return NextResponse.json(
      { success: true, message: "Logged out successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DigiVigee /api/auth/logout] Error:", error);
    return NextResponse.json(
      { success: false, error: "Logout error occurred." },
      { status: 500 }
    );
  }
}

