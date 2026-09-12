import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { duplicateLandingPage } from "@/lib/services/landingPageService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.create");
  if (!guard.authorized) return guard.response!;

  const { id } = await params;

  try {
    const duplicated = await duplicateLandingPage(id);
    return NextResponse.json(
      {
        success: true,
        landingPage: duplicated,
        message: `Landing page duplicated successfully as Draft "${duplicated.slug}".`,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[/api/admin/landing-pages/[id]/duplicate POST] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to duplicate landing page.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

