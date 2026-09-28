import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireAnyPermission } from "@/lib/auth/rbac";
import {
  getAllCmsPortfolioAdmin,
  saveCmsItem,
  deleteCmsItem,
  resetCmsPortfolioToDefaults,
} from "@/lib/services/cmsService";
import { COLLECTIONS } from "@/config/firebase";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { createContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "portfolio.view");
  if (!guard.authorized) return guard.response!;

  const items = await getAllCmsPortfolioAdmin();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: NextRequest) {
  const guard = await requireAnyPermission(request, ["portfolio.create", "portfolio.edit"]);
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults
    if (body.action === "reset") {
      const resetResult = await resetCmsPortfolioToDefaults();
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
          resourceType: "portfolio",
          resourceId: "all",
          summary: "Reset all case studies to canonical defaults",
          status: "success",
        });
      }
      return NextResponse.json({
        success: true,
        message: `All ${resetResult.count} patient care journeys reset to live defaults successfully.`,
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

    const result = await saveCmsItem(COLLECTIONS.PORTFOLIO, data, id);

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
        resourceType: "portfolio",
        resourceId: docId,
        resourceTitle: data.title,
        snapshot: { id: docId, ...data },
        changeSummary: isNew ? "Created case study portfolio item" : `Updated portfolio item "${data.title}"`,
        actor,
      });

      await recordAuditLog({
        actor,
        action: isNew ? "CREATE" : "UPDATE",
        resourceType: "portfolio",
        resourceId: docId,
        resourceTitle: data.title,
        summary: `${isNew ? "Created new" : "Updated"} portfolio item "${data.title}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/portfolio POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "portfolio.delete");
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

    const result = await deleteCmsItem(COLLECTIONS.PORTFOLIO, id);

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
        resourceType: "portfolio",
        resourceId: id,
        summary: `Deleted portfolio project "${id}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/portfolio DELETE] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}


