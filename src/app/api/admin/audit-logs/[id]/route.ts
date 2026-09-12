import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getAuditLogById } from "@/lib/services/auditLogService";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const guard = await requirePermission(request, "audit_logs.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { id } = await params;
    const log = await getAuditLogById(id);

    if (!log) {
      return NextResponse.json(
        { success: false, error: "Audit log entry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, log });
  } catch (error) {
    console.error("[/api/admin/audit-logs/[id] GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch audit log detail." },
      { status: 500 }
    );
  }
}
