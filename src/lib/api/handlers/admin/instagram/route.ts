import { NextRequest, NextResponse } from "next/server";
import { requirePermission, requireAnyPermission } from "@/lib/auth/rbac";
import {
  getAllInstagramPostsAdmin,
  saveInstagramPost,
  deleteInstagramPost,
  reorderInstagramPosts,
  resetInstagramPostsToDefaults,
  fetchInstagramMetadata,
} from "@/lib/services/instagramService";
import { recordAuditLog } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requireAnyPermission(request, ["instagram.view", "pages.view", "dashboard.view"]);
  if (!guard.authorized) return guard.response!;

  const items = await getAllInstagramPostsAdmin();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: NextRequest) {
  const guard = await requireAnyPermission(request, [
    "instagram.create",
    "instagram.edit",
    "pages.edit",
    "dashboard.view",
  ]);
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1. Auto-fetch OpenGraph Metadata from Instagram link
    if (body.action === "fetch") {
      const url = body.url?.trim();
      if (!url) {
        return NextResponse.json(
          { success: false, error: "Please enter an Instagram post or reel link." },
          { status: 400 }
        );
      }
      const fetchResult = await fetchInstagramMetadata(url);
      return NextResponse.json(fetchResult);
    }

    // 2. Reorder Posts (Drag & Drop or Move Up/Down)
    if (body.action === "reorder") {
      const orderedIds = body.orderedIds;
      if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
        return NextResponse.json(
          { success: false, error: "Invalid ordered list of post IDs." },
          { status: 400 }
        );
      }
      const reorderResult = await reorderInstagramPosts(orderedIds);
      return NextResponse.json(reorderResult);
    }

    // 3. 1-Click Reset to Defaults
    if (body.action === "reset") {
      const resetResult = await resetInstagramPostsToDefaults();
      if (guard.user) {
        await recordAuditLog({
          actor: {
            uid: guard.user.uid,
            email: guard.user.email,
            displayName: guard.user.displayName || guard.user.email.split("@")[0],
            role: guard.user.role,
            roleName: guard.user.roleName,
          },
          action: "UPDATE",
          resourceType: "settings",
          resourceId: "instagram_feed",
          summary: "Reset Instagram awareness showcase to default reels",
          status: "success",
        });
      }
      return NextResponse.json({
        success: true,
        message: "Instagram showcase reset to default clinical reels successfully.",
        count: resetResult.count,
      });
    }

    // 4. Toggle Active Status
    if (body.action === "toggleActive" && body.id) {
      const saveResult = await saveInstagramPost({ isActive: Boolean(body.isActive) }, body.id);
      return NextResponse.json(saveResult);
    }

    // 5. Normal Create / Update
    const { id, ...data } = body;

    if (!id && !data.url) {
      return NextResponse.json(
        { success: false, error: "Instagram link is required." },
        { status: 400 }
      );
    }

    const result = await saveInstagramPost(data, id);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    if (guard.user) {
      await recordAuditLog({
        actor: {
          uid: guard.user.uid,
          email: guard.user.email,
          displayName: guard.user.displayName || guard.user.email.split("@")[0],
          role: guard.user.role,
          roleName: guard.user.roleName,
        },
        action: id ? "UPDATE" : "CREATE",
        resourceType: "settings",
        resourceId: result.id,
        summary: `${id ? "Updated" : "Added"} Instagram reel "${data.title || "Awareness Reel"}"`,
        status: "success",
      });
    }

    return NextResponse.json({ success: true, id: result.id, item: result.item });
  } catch (error) {
    console.error("[AdminInstagramAPI] Error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error)?.message || "Failed to process request." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const guard = await requireAnyPermission(request, [
    "instagram.delete",
    "pages.delete",
    "dashboard.view",
  ]);
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Post ID is required." },
        { status: 400 }
      );
    }

    const result = await deleteInstagramPost(id);
    if (guard.user && result.success) {
      await recordAuditLog({
        actor: {
          uid: guard.user.uid,
          email: guard.user.email,
          displayName: guard.user.displayName || guard.user.email.split("@")[0],
          role: guard.user.role,
          roleName: guard.user.roleName,
        },
        action: "DELETE",
        resourceType: "settings",
        resourceId: id,
        summary: `Deleted Instagram reel ${id}`,
        status: "success",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[AdminInstagramAPI] Delete error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error)?.message || "Failed to delete post." },
      { status: 500 }
    );
  }
}
