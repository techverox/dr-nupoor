import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getDashboardSummary } from "@/lib/services/dashboardService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "dashboard.view");
  if (!guard.authorized) return guard.response!;

  try {
    const summary = await getDashboardSummary();
    return NextResponse.json({ success: true, summary }, { status: 200 });
  } catch (error: unknown) {
    console.error("[GET /api/admin/dashboard] Error generating dashboard summary:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate dashboard summary." },
      { status: 500 }
    );
  }
}
