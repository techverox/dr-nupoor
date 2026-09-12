import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { toggleLandingPagePublication } from "@/lib/services/landingPageService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "landing_pages.publish");
  if (!guard.authorized) return guard.response!;

  const { id } = await params;

  try {
    const updated = await toggleLandingPagePublication(id);
    return NextResponse.json({
      success: true,
      landingPage: updated,
      message:
        updated.status === "published"
          ? "Landing page published successfully."
          : "Landing page switched back to Draft.",
    });
  } catch (error: unknown) {
    console.error("[/api/admin/landing-pages/[id]/publish POST] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to toggle publication status.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

