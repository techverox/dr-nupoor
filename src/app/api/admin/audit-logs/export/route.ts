import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { queryAuditLogs, formatAuditLogsAsCsv, recordAuditLog } from "@/lib/services/auditLogService";
import { AuditAction, AuditResourceType } from "@/types/rbac";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "audit_logs.export");
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") === "json" ? "json" : "csv";
    const actorEmail = searchParams.get("actorEmail") || undefined;
    const action = (searchParams.get("action") as AuditAction | "all") || undefined;
    const resourceType = (searchParams.get("resourceType") as AuditResourceType | "all") || undefined;
    const status = (searchParams.get("status") as "success" | "failure" | "all") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;

    const { logs } = await queryAuditLogs({
      actorEmail,
      action,
      resourceType,
      status,
      startDate,
      endDate,
      limit: 1000,
    });

    // Record audit event for the export operation itself
    if (guard.user) {
      await recordAuditLog({
        actor: {
          uid: guard.user.uid,
          email: guard.user.email,
          role: guard.user.role,
          roleName: guard.user.roleName,
        },
        action: "BACKUP_EXPORT",
        resourceType: "backup",
        summary: `Exported ${logs.length} audit log entries as ${format.toUpperCase()}`,
        status: "success",
        metadata: { format, recordCount: logs.length },
      });
    }

    if (format === "json") {
      return new NextResponse(JSON.stringify(logs, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="digivigee-audit-logs-${Date.now()}.json"`,
        },
      });
    }

    const csvData = formatAuditLogsAsCsv(logs);
    return new NextResponse(csvData, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="digivigee-audit-logs-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("[/api/admin/audit-logs/export GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to export audit logs." },
      { status: 500 }
    );
  }
}
