import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getAdvancedAnalyticsReport, resetAnalyticsAdmin } from "@/lib/services/analyticsService";
import { AnalyticsTimeframe } from "@/types/analytics";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "analytics.view");
  if (!guard.authorized) return guard.response!;

  try {
    const { searchParams } = new URL(request.url);
    const timeframe = (searchParams.get("timeframe") || "30d") as AnalyticsTimeframe;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const compare = searchParams.get("compare") !== "false";

    const report = await getAdvancedAnalyticsReport({
      timeframe,
      startDate,
      endDate,
      compare,
    });

    return NextResponse.json({ success: true, report });
  } catch (err) {
    console.error("[api/admin/analytics] Error generating report:", err);
    return NextResponse.json({ success: false, error: "Failed to generate analytics report" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "analytics.view");
  if (!guard.authorized) return guard.response!;

  try {
    const body = await request.json().catch(() => ({}));
    if (body.action === "reset") {
      const report = await resetAnalyticsAdmin();
      return NextResponse.json({
        success: true,
        report,
        message: "Analytics telemetry has been successfully reset to canonical DigiVigee baseline.",
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action provided" }, { status: 400 });
  } catch (err) {
    console.error("[api/admin/analytics] POST error:", err);
    return NextResponse.json({ success: false, error: "Failed to process analytics action" }, { status: 500 });
  }
}


