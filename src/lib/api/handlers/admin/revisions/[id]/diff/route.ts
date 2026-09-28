import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getRevisionById, computeContentDiff } from "@/lib/services/revisionService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "revisions.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const targetRev = await getRevisionById(id);

    if (!targetRev) {
      return NextResponse.json(
        { success: false, error: "Target revision not found." },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const compareWithId = searchParams.get("compareWith");

    let baseSnapshot: Record<string, unknown> = {};

    if (compareWithId) {
      const baseRev = await getRevisionById(compareWithId);
      if (baseRev) {
        baseSnapshot = baseRev.snapshot;
      }
    }

    const diffs = computeContentDiff(baseSnapshot, targetRev.snapshot);

    return NextResponse.json({
      success: true,
      revisionId: id,
      version: targetRev.version,
      resourceType: targetRev.resourceType,
      resourceId: targetRev.resourceId,
      diffs,
      totalChanges: diffs.filter((d) => d.isChanged).length,
    });
  } catch (error) {
    console.error("[/api/admin/revisions/[id]/diff GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to compute revision diff." },
      { status: 500 }
    );
  }
}
