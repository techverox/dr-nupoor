import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getCmsBlogPostByIdAdmin,
  togglePublishCmsBlogPost,
} from "@/lib/services/cmsService";
import { recordAuditLog } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "blogs.publish");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const post = await getCmsBlogPostByIdAdmin(id);

    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    const result = await togglePublishCmsBlogPost(id, post.status);

    if (result.success && guard.user) {
      const willBePublished = post.status !== "published";
      const actor = {
        uid: guard.user.uid,
        email: guard.user.email,
        displayName: guard.user.displayName || guard.user.email.split("@")[0],
        role: guard.user.role,
        roleName: guard.user.roleName,
      };

      await recordAuditLog({
        actor,
        action: willBePublished ? "PUBLISH" : "UNPUBLISH",
        resourceType: "blog",
        resourceId: id,
        resourceTitle: post.title,
        summary: `${willBePublished ? "Published" : "Unpublished"} blog post "${post.title}"`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/blog/[id]/publish POST] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}


