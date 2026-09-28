import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getRevisionById } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "revisions.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const revision = await getRevisionById(id);

    if (!revision) {
      return NextResponse.json(
        { success: false, error: "Content revision not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, revision });
  } catch (error) {
    console.error("[/api/admin/revisions/[id] GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch content revision." },
      { status: 500 }
    );
  }
}
