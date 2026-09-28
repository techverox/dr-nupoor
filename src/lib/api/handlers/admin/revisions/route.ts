import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getRevisionHistory } from "@/lib/services/revisionService";
import { AuditResourceType } from "@/types/rbac";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "revisions.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);
    const resourceType = searchParams.get("resourceType") as AuditResourceType;
    const resourceId = searchParams.get("resourceId");

    if (!resourceType || !resourceId) {
      return NextResponse.json(
        { success: false, error: "resourceType and resourceId query parameters are required." },
        { status: 400 }
      );
    }

    const revisions = await getRevisionHistory(resourceType, resourceId);

    return NextResponse.json({
      success: true,
      resourceType,
      resourceId,
      totalRevisions: revisions.length,
      revisions,
    });
  } catch (error) {
    console.error("[/api/admin/revisions GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch content revision history." },
      { status: 500 }
    );
  }
}
