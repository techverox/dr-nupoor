import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { updateAdminUser, deleteAdminUser } from "@/lib/services/rbacService";
import { recordAuditLog } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "users.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();

    const result = await updateAdminUser(id, body);
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

      const isRoleChange = body.roleId !== undefined;

      await recordAuditLog({
        actor,
        action: isRoleChange ? "ROLE_CHANGE" : "USER_UPDATE",
        resourceType: "user",
        resourceId: id,
        summary: isRoleChange
          ? `Changed role for user "${id}" to "${body.roleId}"`
          : `Updated user account parameters for "${id}"`,
        status: "success",
        metadata: { updatedFields: Object.keys(body) },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/users/[id] PUT] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "users.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const result = await deleteAdminUser(id);

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
        action: "USER_DELETE",
        resourceType: "user",
        resourceId: id,
        summary: `Deleted admin user account "${id}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/users/[id] DELETE] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

