import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireAnyPermission } from "@/lib/auth/rbac";
import {
  getAllCmsServicesAdmin,
  saveCmsItem,
  deleteCmsItem,
  resetCmsServicesToDefaults,
} from "@/lib/services/cmsService";
import { COLLECTIONS } from "@/config/firebase";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { createContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "services.view");
  if (!guard.authorized) return guard.response!;

  const items = await getAllCmsServicesAdmin();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: NextRequest) {
  const guard = await requireAnyPermission(request, ["services.create", "services.edit"]);
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults
    if (body.action === "reset") {
      const resetResult = await resetCmsServicesToDefaults();
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
          resourceType: "service",
          resourceId: "all",
          summary: "Reset all services to canonical defaults",
          status: "success",
        });
      }
      return NextResponse.json({
        success: true,
        message: `All ${resetResult.count} clinical oncology services reset to live defaults successfully.`,
        count: resetResult.count,
      });
    }

    const { id, ...data } = body;

    if (!data.title || !data.slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required." },
        { status: 400 }
      );
    }

    const result = await saveCmsItem(COLLECTIONS.SERVICES, data, id);

    if (result.success && guard.user) {
      const docId = id || result.id!;
      const isNew = !id;
      const actor = {
        uid: guard.user.uid,
        email: guard.user.email,
        displayName: guard.user.displayName || guard.user.email.split("@")[0],
        role: guard.user.role,
        roleName: guard.user.roleName,
      };

      await createContentRevision({
        resourceType: "service",
        resourceId: docId,
        resourceTitle: data.title,
        snapshot: { id: docId, ...data },
        changeSummary: isNew ? "Created service catalog item" : `Updated service "${data.title}"`,
        actor,
      });

      await recordAuditLog({
        actor,
        action: isNew ? "CREATE" : "UPDATE",
        resourceType: "service",
        resourceId: docId,
        resourceTitle: data.title,
        summary: `${isNew ? "Created new" : "Updated"} service "${data.title}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/services POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "services.delete");
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

    const result = await deleteCmsItem(COLLECTIONS.SERVICES, id);

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
        resourceType: "service",
        resourceId: id,
        summary: `Deleted service item "${id}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/services DELETE] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

