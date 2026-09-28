import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireAnyPermission } from "@/lib/auth/rbac";
import {
  getAllCmsFaqsAdmin,
  saveCmsItem,
  deleteCmsItem,
  resetCmsFaqsToDefaults,
} from "@/lib/services/cmsService";
import { COLLECTIONS } from "@/config/firebase";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { createContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "faqs.view");
  if (!guard.authorized) return guard.response!;

  const items = await getAllCmsFaqsAdmin();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: NextRequest) {
  const guard = await requireAnyPermission(request, ["faqs.create", "faqs.edit"]);
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults
    if (body.action === "reset") {
      const resetResult = await resetCmsFaqsToDefaults();
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
          resourceType: "faq",
          resourceId: "all",
          summary: "Reset all FAQs to canonical defaults",
          status: "success",
        });
      }
      return NextResponse.json({
        success: true,
        message: "All 6 FAQs reset to live defaults successfully.",
        count: resetResult.count,
      });
    }

    const { id, ...data } = body;

    if (!data.question || !data.answer) {
      return NextResponse.json(
        { success: false, error: "Question and answer are required." },
        { status: 400 }
      );
    }

    const isUpdate = Boolean(id);
    const result = await saveCmsItem(COLLECTIONS.FAQS, data, id);

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
        resourceType: "faq",
        resourceId: docId,
        resourceTitle: data.question,
        snapshot: { id: docId, ...data },
        changeSummary: isUpdate
          ? `Updated FAQ: "${data.question.slice(0, 45)}..."`
          : `Created new FAQ: "${data.question.slice(0, 45)}..."`,
        actor,
      });

      // Audit Log
      await recordAuditLog({
        actor,
        action: isUpdate ? "UPDATE" : "CREATE",
        resourceType: "faq",
        resourceId: docId,
        resourceTitle: data.question,
        summary: isUpdate
          ? `Updated FAQ "${data.question.slice(0, 45)}..."`
          : `Created FAQ "${data.question.slice(0, 45)}..."`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/faqs POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "faqs.delete");
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

    const result = await deleteCmsItem(COLLECTIONS.FAQS, id);

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
        resourceType: "faq",
        resourceId: id,
        summary: `Deleted FAQ ${id}`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/faqs DELETE] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
