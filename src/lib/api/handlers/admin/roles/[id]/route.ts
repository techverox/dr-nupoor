import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { updateCustomRole, deleteCustomRole } from "@/lib/services/rbacService";
import { recordAuditLog } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "roles.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();

    const result = await updateCustomRole(id, body);
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
        action: "ROLE_UPDATE",
        resourceType: "role",
        resourceId: id,
        resourceTitle: body.name || id,
        summary: `Updated role permissions & configuration for "${body.name || id}"`,
        status: "success",
        metadata: { permissionsCount: body.permissions?.length },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/roles/[id] PUT] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "roles.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const result = await deleteCustomRole(id);

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
        action: "ROLE_DELETE",
        resourceType: "role",
        resourceId: id,
        summary: `Deleted custom role "${id}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/roles/[id] DELETE] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

