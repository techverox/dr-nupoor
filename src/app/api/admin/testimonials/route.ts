import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireAnyPermission } from "@/lib/auth/rbac";
import {
  getAllCmsTestimonialsAdmin,
  saveCmsItem,
  deleteCmsItem,
  resetCmsTestimonialsToDefaults,
} from "@/lib/services/cmsService";
import { COLLECTIONS } from "@/config/firebase";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { createContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "testimonials.view");
  if (!guard.authorized) return guard.response!;

  const items = await getAllCmsTestimonialsAdmin();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: NextRequest) {
  const guard = await requireAnyPermission(request, ["testimonials.create", "testimonials.edit"]);
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults
    if (body.action === "reset") {
      const resetResult = await resetCmsTestimonialsToDefaults();
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
          resourceType: "testimonial",
          resourceId: "all",
          summary: "Reset all client testimonials to canonical defaults",
          status: "success",
        });
      }
      return NextResponse.json({
        success: true,
        message: "All 5 client testimonials reset to live defaults successfully.",
        count: resetResult.count,
      });
    }

    const { id, ...data } = body;

    if (!data.clientName || !data.testimonial) {
      return NextResponse.json(
        { success: false, error: "Client name and testimonial quote are required." },
        { status: 400 }
      );
    }

    const isUpdate = Boolean(id);
    const result = await saveCmsItem(COLLECTIONS.TESTIMONIALS, data, id);

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
        resourceType: "testimonial",
        resourceId: docId,
        resourceTitle: `${data.clientName} (${data.companyName || "Client"})`,
        snapshot: { id: docId, ...data },
        changeSummary: isUpdate
          ? `Updated testimonial for ${data.clientName}`
          : `Created new testimonial for ${data.clientName}`,
        actor,
      });

      // Audit Log
      await recordAuditLog({
        actor,
        action: isUpdate ? "UPDATE" : "CREATE",
        resourceType: "testimonial",
        resourceId: docId,
        resourceTitle: `${data.clientName} (${data.companyName || "Client"})`,
        summary: isUpdate
          ? `Updated client testimonial "${data.clientName}"`
          : `Created client testimonial "${data.clientName}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/testimonials POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "testimonials.delete");
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

    const result = await deleteCmsItem(COLLECTIONS.TESTIMONIALS, id);

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
        resourceType: "testimonial",
        resourceId: id,
        summary: `Deleted client testimonial ${id}`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/testimonials DELETE] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

