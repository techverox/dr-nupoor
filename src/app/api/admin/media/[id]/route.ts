import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getMediaItemById,
  saveMediaMetadata,
  deleteMediaAsset,
} from "@/lib/services/mediaService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "media.view");
  if (!guard.authorized) return guard.response!;

  const { id } = await params;
  const item = await getMediaItemById(id);

  if (!item) {
    return NextResponse.json({ success: false, error: "Media item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, item });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "media.upload");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();
    const result = await saveMediaMetadata(id, body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/media/[id] PUT] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "media.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    const result = await deleteMediaAsset(id, force);

    if (!result.success && result.inUseWarning) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          inUseWarning: result.inUseWarning,
        },
        { status: 409 } // Conflict: Resource in use
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/admin/media/[id] DELETE] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

