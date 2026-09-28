import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireAnyPermission } from "@/lib/auth/rbac";
import {
  getAllCmsTeamMembersAdmin,
  saveCmsItem,
  deleteCmsItem,
  resetCmsTeamMembersToDefaults,
} from "@/lib/services/cmsService";
import { COLLECTIONS } from "@/config/firebase";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { createContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "team.view");
  if (!guard.authorized) return guard.response!;

  const items = await getAllCmsTeamMembersAdmin();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: NextRequest) {
  const guard = await requireAnyPermission(request, ["team.create", "team.edit"]);
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults
    if (body.action === "reset") {
      const resetResult = await resetCmsTeamMembersToDefaults();
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
          action: "UPDATE",
          resourceType: "team",
          resourceId: "all",
          summary: "Reset all team specialists to canonical defaults",
          status: "success",
        });
      }
      return NextResponse.json({
        success: true,
        message: "All 5 team specialists reset to live defaults successfully.",
        count: resetResult.count,
      });
    }

    const { id, ...data } = body;

    if (!data.name || !data.role) {
      return NextResponse.json(
        { success: false, error: "Name and role are required." },
        { status: 400 }
      );
    }

    const isUpdate = Boolean(id);
    const result = await saveCmsItem(COLLECTIONS.TEAM, data, id);

    if (result.success && guard.user) {
      const actor = {
        uid: guard.user.uid,
        email: guard.user.email,
        displayName: guard.user.displayName || guard.user.email.split("@")[0],
        role: guard.user.role,
        roleName: guard.user.roleName,
      };

      const docId = result.id || id || "unknown";

      // Snapshot revision for audit and rollback
      await createContentRevision({
        resourceType: "team",
        resourceId: docId,
        resourceTitle: `${data.name} (${data.role})`,
        snapshot: { id: docId, ...data },
        changeSummary: isUpdate
          ? `Updated team specialist: ${data.name}`
          : `Created new team specialist: ${data.name}`,
        actor,
      });

      // Audit Log
      await recordAuditLog({
        actor,
        action: isUpdate ? "UPDATE" : "CREATE",
        resourceType: "team",
        resourceId: docId,
        resourceTitle: `${data.name} (${data.role})`,
        summary: isUpdate
          ? `Updated team specialist "${data.name}"`
          : `Created team specialist "${data.name}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/team POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "team.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Document ID required." },
        { status: 400 }
      );
    }

    const result = await deleteCmsItem(COLLECTIONS.TEAM, id);

    if (result.success && guard.user) {
      const actor = {
        uid: guard.user.uid,
        email: guard.user.email,
        displayName: guard.user.displayName || guard.user.email.split("@")[0],
        role: guard.user.role,
        roleName: guard.user.roleName,
      };

      await recordAuditLog({
        actor,
        action: "DELETE",
        resourceType: "team",
        resourceId: id,
        summary: `Deleted team specialist ${id}`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/team DELETE] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
