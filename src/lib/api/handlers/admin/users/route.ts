import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getAllAdminUsers, createAdminUser, resetRbacToDefaultsAdmin } from "@/lib/services/rbacService";
import { recordAuditLog } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "users.view");
  if (!guard.authorized) return guard.response!;

  try {
    const users = await getAllAdminUsers();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("[/api/admin/users GET] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch admin users." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "users.create");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults
    if (body.action === "reset") {
      const resetResult = await resetRbacToDefaultsAdmin();

      if (guard.user) {
        const actor = {
          uid: guard.user.uid,
          email: guard.user.email,
          displayName: guard.user.displayName || guard.user.email.split("@")[0],
          role: guard.user.role,
          roleName: guard.user.roleName,
        };

        await recordAuditLog({
          actor,
          action: "RESTORE",
          resourceType: "user",
          resourceId: "canonical-team",
          resourceTitle: "DigiVigee Leadership Team",
          summary: "Reset admin users and RBAC roles to canonical DigiVigee defaults",
          status: "success",
        });
      }

      return NextResponse.json(resetResult);
    }

    const { email, displayName, roleId, password } = body;

    if (!email || !displayName || !roleId) {
      return NextResponse.json(
        { success: false, error: "Email, Display Name, and Role are required." },
        { status: 400 }
      );
    }

    const result = await createAdminUser({ email, displayName, roleId, password });
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    if (guard.user) {
      const actor = {
        uid: guard.user.uid,
        email: guard.user.email,
        displayName: guard.user.displayName || guard.user.email.split("@")[0],
        role: guard.user.role,
        roleName: guard.user.roleName,
      };

      await recordAuditLog({
        actor,
        action: "USER_INVITE",
        resourceType: "user",
        resourceId: result.user?.id || email,
        resourceTitle: displayName,
        summary: `Created/Invited new admin user "${displayName}" (${email}) with role "${roleId}"`,
        status: "success",
        metadata: { roleId, targetEmail: email },
      });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[/api/admin/users POST] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

