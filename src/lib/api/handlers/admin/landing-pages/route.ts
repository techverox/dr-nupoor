import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getAllLandingPagesAdmin,
  createLandingPage,
  deleteLandingPage,
  resetLandingPagesToDefaults,
  resetSingleLandingPageToBlueprint,
} from "@/lib/services/landingPageService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "landing_pages.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.toLowerCase() || "";
    const status = searchParams.get("status") || "all";

    let pages = await getAllLandingPagesAdmin();

    if (query) {
      pages = pages.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.slug.toLowerCase().includes(query)
      );
    }

    if (status !== "all") {
      pages = pages.filter((p) => p.status === status);
    }

    return NextResponse.json({ success: true, landingPages: pages });
  } catch (error) {
    console.error("[/api/admin/landing-pages GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch landing pages." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1-Click Action: Reset all landing pages to canonical defaults
    if (body.action === "reset") {
      const guard = await requirePermission(request, "landing_pages.edit");
      if (!guard.authorized) return guard.response!;

      const result = await resetLandingPagesToDefaults();
      return NextResponse.json({
        success: true,
        message: "Landing pages restored to canonical default blueprints.",
        count: result.count,
      });
    }

    // 1-Click Action: Reset single landing page to blueprint
    if (body.action === "reset-single" && body.id) {
      const guard = await requirePermission(request, "landing_pages.edit");
      if (!guard.authorized) return guard.response!;

      const updatedPage = await resetSingleLandingPageToBlueprint(body.id);
      return NextResponse.json({
        success: true,
        message: "Page restored to canonical blueprint sections.",
        landingPage: updatedPage,
      });
    }

    // Standard Landing Page Creation
    const guard = await requirePermission(request, "landing_pages.create");
    if (!guard.authorized) return guard.response!;

    if (!body.title || typeof body.title !== "string" || body.title.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Landing page title must be at least 3 characters long." },
        { status: 400 }
      );
    }

    if (!body.slug || typeof body.slug !== "string") {
      return NextResponse.json(
        { success: false, error: "Landing page slug is required." },
        { status: 400 }
      );
    }

    const createdPage = await createLandingPage(body);
    return NextResponse.json({ success: true, landingPage: createdPage }, { status: 201 });
  } catch (error: unknown) {
    console.error("[/api/admin/landing-pages POST] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to process landing page request.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const guard = await requirePermission(request, "landing_pages.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Landing page ID is required for deletion." },
        { status: 400 }
      );
    }

    await deleteLandingPage(id);
    return NextResponse.json({ success: true, message: "Landing page deleted safely." });
  } catch (error: unknown) {
    console.error("[/api/admin/landing-pages DELETE] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to delete landing page.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
