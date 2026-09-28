import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { queryAuditLogs, getAuditLogStats } from "@/lib/services/auditLogService";
import { AuditAction, AuditResourceType } from "@/types/rbac";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "audit_logs.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);

    const statsOnly = searchParams.get("stats") === "true";
    if (statsOnly) {
      const stats = await getAuditLogStats();
      return NextResponse.json({ success: true, stats });
    }

    const actorEmail = searchParams.get("actorEmail") || undefined;
    const action = (searchParams.get("action") as AuditAction | "all") || undefined;
    const resourceType = (searchParams.get("resourceType") as AuditResourceType | "all") || undefined;
    const status = (searchParams.get("status") as "success" | "failure" | "all") || undefined;
    const search = searchParams.get("search") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const result = await queryAuditLogs({
      actorEmail,
      action,
      resourceType,
      status,
      search,
      startDate,
      endDate,
      limit,
      offset,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("[/api/admin/audit-logs GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch audit logs." },
      { status: 500 }
    );
  }
}
