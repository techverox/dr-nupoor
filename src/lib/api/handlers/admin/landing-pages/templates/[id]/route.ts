import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import {
  getLandingTemplateByIdAdmin,
  deleteLandingTemplate,
} from "@/lib/services/landingTemplateService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const template = await getLandingTemplateByIdAdmin(id);

    if (!template) {
      return NextResponse.json(
        { success: false, error: "Template not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, template });
  } catch (error) {
    console.error("[/api/admin/landing-pages/templates/[id] GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch template." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.delete");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    await deleteLandingTemplate(id);

    return NextResponse.json({
      success: true,
      message: "Template master deleted successfully.",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete template.";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

