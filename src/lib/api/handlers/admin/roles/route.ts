import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getAllRoles, createCustomRole } from "@/lib/services/rbacService";
import { recordAuditLog } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "roles.view");
  if (!guard.authorized) return guard.response!;

  try {
    const roles = await getAllRoles();
    return NextResponse.json({ success: true, roles });
  } catch (error) {
    console.error("[/api/admin/roles GET] Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch platform roles." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "roles.create");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();
    const { name, description, permissions } = body;

    if (!name || !permissions || !Array.isArray(permissions)) {
      return NextResponse.json(
        { success: false, error: "Role name and permissions list are required." },
        { status: 400 }
      );
    }

    const result = await createCustomRole({ name, description, permissions });
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
        action: "ROLE_CREATE",
        resourceType: "role",
        resourceId: result.role?.id || name,
        resourceTitle: name,
        summary: `Created custom role "${name}" with ${permissions.length} assigned permissions`,
        status: "success",
        metadata: { permissionsCount: permissions.length },
      });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[/api/admin/roles POST] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}

