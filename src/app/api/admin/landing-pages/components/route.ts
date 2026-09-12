import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getAllReusableComponentsAdmin,
  createReusableComponent,
  resetReusableComponentsAdmin,
} from "@/lib/services/reusableComponentService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "landing_pages.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.toLowerCase() || "";
    const category = searchParams.get("category") || "all";

    let components = await getAllReusableComponentsAdmin();

    if (query) {
      components = components.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.sectionType.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query) ||
          (c.description && c.description.toLowerCase().includes(query)) ||
          (c.tags && c.tags.some((t) => t.includes(query)))
      );
    }

    if (category !== "all") {
      components = components.filter(
        (c) => c.category.toLowerCase() === category.toLowerCase()
      );
    }

    return NextResponse.json({ success: true, components });
  } catch (error) {
    console.error("[/api/admin/landing-pages/components GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reusable components." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "landing_pages.create");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults
    if (body.action === "reset") {
      const resetList = await resetReusableComponentsAdmin();
      return NextResponse.json({
        success: true,
        components: resetList,
        message: "Restored all 11 canonical DigiVigee homepage-grade master components successfully.",
      });
    }

    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Component name is required." },
        { status: 400 }
      );
    }

    if (!body.category || typeof body.category !== "string" || !body.category.trim()) {
      return NextResponse.json(
        { success: false, error: "Component category is required." },
        { status: 400 }
      );
    }

    if (!body.sectionType || typeof body.sectionType !== "string") {
      return NextResponse.json(
        { success: false, error: "Section type is required." },
        { status: 400 }
      );
    }

    const component = await createReusableComponent({
      name: body.name.trim(),
      category: body.category.trim(),
      description: body.description ? String(body.description).trim() : "",
      tags: Array.isArray(body.tags) ? body.tags : [],
      sectionType: body.sectionType,
      sectionContent: body.sectionContent || {},
      sectionStyling: body.sectionStyling,
    });

    return NextResponse.json({
      success: true,
      component,
      message: `Master component "${component.name}" saved successfully.`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create master component.";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

