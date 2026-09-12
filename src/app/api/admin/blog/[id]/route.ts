import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getCmsBlogPostByIdAdmin,
  saveCmsBlogPost,
  deleteCmsBlogPost,
} from "@/lib/services/cmsService";
import { recordAuditLog } from "@/lib/services/auditLogService";
import { createContentRevision } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "blogs.view");
  if (!guard.authorized) return guard.response!;

  const { id } = await params;
  const post = await getCmsBlogPostByIdAdmin(id);

  if (!post) {
    return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, post });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "blogs.edit");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required." },
        { status: 400 }
      );
    }

    const result = await saveCmsBlogPost(body, id);

    if (result.success && guard.user) {
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
        resourceId: id,
        resourceTitle: body.title,
        snapshot: { id, ...body },
        changeSummary: `Updated blog post "${body.title}"`,
        actor,
      });

      // 2. Record audit log
      await recordAuditLog({
        actor,
        action: "UPDATE",
        resourceType: "blog",
        resourceId: id,
        resourceTitle: body.title,
        summary: `Updated blog post "${body.title}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/blog/[id] PUT] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "blogs.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const existing = await getCmsBlogPostByIdAdmin(id);
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
        resourceTitle: existing?.title || id,
        summary: `Deleted blog post "${existing?.title || id}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/blog/[id] DELETE] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}


