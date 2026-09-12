import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getLandingPageByIdAdmin,
  updateLandingPage,
  deleteLandingPage,
} from "@/lib/services/landingPageService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.view");
  if (!guard.authorized) return guard.response!;

  const { id } = await params;

  try {
    const page = await getLandingPageByIdAdmin(id);
    if (!page) {
      return NextResponse.json(
        { success: false, error: `Landing page with ID "${id}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, page, landingPage: page });
  } catch (error) {
    console.error("[/api/admin/landing-pages/[id] GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch landing page." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.edit");
  if (!guard.authorized) return guard.response!;

  const { id } = await params;

  try {
    const body = await request.json();
    const updated = await updateLandingPage(id, body);
    return NextResponse.json({ success: true, page: updated, landingPage: updated });
  } catch (error: unknown) {
    console.error("[/api/admin/landing-pages/[id] PUT] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to update landing page.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.delete");
  if (!guard.authorized) return guard.response!;

  const { id } = await params;

  try {
    await deleteLandingPage(id);
    return NextResponse.json({ success: true, message: "Landing page deleted safely." });
  } catch (error: unknown) {
    console.error("[/api/admin/landing-pages/[id] DELETE] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to delete landing page.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

