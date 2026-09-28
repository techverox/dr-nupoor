import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireAnyPermission } from "@/lib/auth/rbac";
import {
  getAllCmsBlogPostsAdmin,
  saveCmsBlogPost,
  resetCmsBlogPostsToDefaults,
  deleteCmsBlogPost,
} from "@/lib/services/cmsService";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { createContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "blogs.view");
  if (!guard.authorized) return guard.response!;

  const posts = await getAllCmsBlogPostsAdmin();
  return NextResponse.json({ success: true, posts });
}

export async function POST(request: NextRequest) {
  const guard = await requireAnyPermission(request, ["blogs.create", "blogs.edit"]);
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    if (body.action === "reset") {
      const resetRes = await resetCmsBlogPostsToDefaults();
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
          resourceType: "blog",
          resourceId: "canonical-reset",
          resourceTitle: "All Canonical Articles",
          summary: "Restored all 6 canonical blog articles and playbooks to factory defaults",
          status: "success",
        });
      }
      return NextResponse.json(resetRes);
    }

    const { id, ...data } = body;

    if (!data.title || !data.slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required." },
        { status: 400 }
      );
    }

    const result = await saveCmsBlogPost(data, id);

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

      // 1. Create content revision
      await createContentRevision({
        resourceType: "blog",
        resourceId: docId,
        resourceTitle: data.title,
        snapshot: { id: docId, ...data },
        changeSummary: isNew ? "Initial blog post creation" : `Updated blog post "${data.title}"`,
        actor,
      });

      // 2. Record audit log
      await recordAuditLog({
        actor,
        action: isNew ? "CREATE" : "UPDATE",
        resourceType: "blog",
        resourceId: docId,
        resourceTitle: data.title,
        summary: `${isNew ? "Created new" : "Updated"} blog post "${data.title}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/blog POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "blogs.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing article ID." }, { status: 400 });
    }

    const result = await deleteCmsBlogPost(id);
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
        resourceType: "blog",
        resourceId: id,
        resourceTitle: id,
        summary: `Deleted blog article ${id}`,
        status: "success",
      });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/blog DELETE] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}



