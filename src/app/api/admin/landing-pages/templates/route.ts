import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getAllLandingTemplatesAdmin,
  createLandingTemplate,
  resetLandingTemplatesAdmin,
} from "@/lib/services/landingTemplateService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "landing_pages.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "all";
    const query = searchParams.get("query")?.toLowerCase() || "";

    let templates = await getAllLandingTemplatesAdmin();

    if (category !== "all") {
      templates = templates.filter(
        (t) => t.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (query) {
      templates = templates.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          (t.tags && t.tags.some((tag) => tag.includes(query)))
      );
    }

    return NextResponse.json({ success: true, templates });
  } catch (error) {
    console.error("[/api/admin/landing-pages/templates GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch templates." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "landing_pages.create");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json();

    // 1-Click Reset to Defaults action
    if (body.action === "reset") {
      const templates = await resetLandingTemplatesAdmin();
      return NextResponse.json({
        success: true,
        templates,
        message: "Successfully reset all 6 landing page blueprints to official defaults.",
      });
    }

    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Template name is required." },
        { status: 400 }
      );
    }

    if (!body.category || typeof body.category !== "string" || !body.category.trim()) {
      return NextResponse.json(
        { success: false, error: "Template category is required." },
        { status: 400 }
      );
    }

    const template = await createLandingTemplate({
      name: body.name.trim(),
      description: body.description ? String(body.description).trim() : "",
      category: body.category.trim(),
      tags: Array.isArray(body.tags) ? body.tags : [],
      thumbnailUrl: body.thumbnailUrl || "",
      badge: body.badge || "",
      sections: Array.isArray(body.sections) ? body.sections : [],
      defaultCta: body.defaultCta,
      defaultForm: body.defaultForm,
    });

    return NextResponse.json({
      success: true,
      template,
      message: `Template "${template.name}" saved successfully.`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create template.";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

