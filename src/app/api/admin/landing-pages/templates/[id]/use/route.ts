import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { instantiateLandingPageFromTemplate } from "@/lib/services/landingTemplateService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.create");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "Landing page title is required." },
        { status: 400 }
      );
    }

    if (!body.slug || typeof body.slug !== "string" || !body.slug.trim()) {
      return NextResponse.json(
        { success: false, error: "Landing page slug is required." },
        { status: 400 }
      );
    }

    const landingPage = await instantiateLandingPageFromTemplate(id, {
      title: body.title.trim(),
      slug: body.slug.trim(),
    });

    return NextResponse.json({
      success: true,
      landingPage,
      message: `Created landing page "${landingPage.title}" from template.`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to instantiate landing page.";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

