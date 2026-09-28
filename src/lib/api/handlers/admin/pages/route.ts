import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getCmsPageContent, saveCmsItem } from "@/lib/services/cmsService";
import { COLLECTIONS } from "@/config/firebase";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { createContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "pages.view");
  if (!guard.authorized) return guard.response!;

  const { searchParams } = new URL(request.url);
  const pageId = (searchParams.get("pageId") || "home") as "home" | "about" | "contact";

  const content = await getCmsPageContent(pageId);
  return NextResponse.json({ success: true, content });
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "pages.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();
    const { pageId, ...data } = body;

    if (!pageId) {
      return NextResponse.json(
        { success: false, error: "Page identifier required." },
        { status: 400 }
      );
    }

    const result = await saveCmsItem(COLLECTIONS.PAGES, data, pageId);

    if (result.success && guard.user) {
      const actor = {
        uid: guard.user.uid,
        email: guard.user.email,
        displayName: guard.user.displayName || guard.user.email.split("@")[0],
        role: guard.user.role,
        roleName: guard.user.roleName,
      };

      // 1. Snapshot new revision
      await createContentRevision({
        resourceType: "page",
        resourceId: pageId,
        resourceTitle: `${pageId.charAt(0).toUpperCase() + pageId.slice(1)} Page`,
        snapshot: data,
        changeSummary: `Updated ${pageId} page content`,
        actor,
      });

      // 2. Record audit log
      await recordAuditLog({
        actor,
        action: "UPDATE",
        resourceType: "page",
        resourceId: pageId,
        resourceTitle: `${pageId.charAt(0).toUpperCase() + pageId.slice(1)} Page`,
        summary: `Updated CMS copy and sections for "${pageId}" page`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/pages POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}


