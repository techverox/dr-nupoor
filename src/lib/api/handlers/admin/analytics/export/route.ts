import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/rbac";
import { getAdvancedAnalyticsReport } from "@/lib/services/analyticsService";
import { AnalyticsTimeframe } from "@/types/analytics";

function escapeCsvCell(val: unknown): string {
  if (val === null || val === undefined) return '""';
  let str = String(val).trim();
  // Neutralize spreadsheet formula injection (=, +, -, @, \t, \r)
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "analytics.export");
  if (!guard.authorized) return guard.response!;


  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "summary";
    const timeframe = (searchParams.get("timeframe") || "30d") as AnalyticsTimeframe;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;

    const report = await getAdvancedAnalyticsReport({
      timeframe,
      startDate,
      endDate,
      compare: true,
    });

    let csvContent = "";
    let filename = `digivigee-analytics-${type}-${new Date().toISOString().slice(0, 10)}.csv`;

    if (type === "pages") {
      const headers = ["Page Path", "Page Title", "Page Views", "Unique Visitors", "Sessions", "Leads Attributed", "Conversion Rate (%)"];
      const rows = report.topPages.map((p) => [
        escapeCsvCell(p.path),
        escapeCsvCell(p.pageTitle || ""),
        escapeCsvCell(p.views),
        escapeCsvCell(p.uniqueVisitors),
        escapeCsvCell(p.sessions),
        escapeCsvCell(p.leadsAttributed),
        escapeCsvCell(p.conversionRate),
      ]);
      csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      filename = `digivigee-page-performance-${new Date().toISOString().slice(0, 10)}.csv`;
    } else if (type === "campaigns") {
      const headers = ["Campaign Name", "UTM Source", "UTM Medium", "Clicks/Views", "Unique Visitors", "Total Conversions", "Newsletter Signups", "Conversion Rate (%)"];
      const rows = report.campaigns.map((c) => [
        escapeCsvCell(c.campaign),
        escapeCsvCell(c.source),
        escapeCsvCell(c.medium),
        escapeCsvCell(c.clicksOrViews),
        escapeCsvCell(c.visitors),
        escapeCsvCell(c.conversions),
        escapeCsvCell(c.newsletterSignups || 0),
        escapeCsvCell(c.conversionRate),
      ]);
      csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      filename = `digivigee-campaign-performance-${new Date().toISOString().slice(0, 10)}.csv`;
    } else if (type === "sources") {
      const headers = ["Traffic Source", "Event Count", "Share Percentage (%)", "Leads Generated", "Conversion Rate (%)"];
      const rows = report.trafficSources.map((s) => [
        escapeCsvCell(s.source),
        escapeCsvCell(s.count),
        escapeCsvCell(s.percentage),
        escapeCsvCell(s.leads || 0),
        escapeCsvCell(s.conversionRate || 0),
      ]);
      csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      filename = `digivigee-traffic-sources-${new Date().toISOString().slice(0, 10)}.csv`;
    } else if (type === "forms") {
      const headers = ["Form ID", "Form Name", "Submissions", "Leads Generated", "Lead Conversion Rate (%)"];
      const rows = report.formPerformance.map((f) => [
        escapeCsvCell(f.formId),
        escapeCsvCell(f.formName),
        escapeCsvCell(f.submissions),
        escapeCsvCell(f.leadsGenerated),
        escapeCsvCell(f.conversionRate),
      ]);
      csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      filename = `digivigee-form-performance-${new Date().toISOString().slice(0, 10)}.csv`;
    } else {
      // Summary / Executive KPI Overview
      const kpis = report.kpis;
      const kpiRows = [
        ["Metric", "Current Period", "Previous Period", "Difference", "Change (%)", "Trend"],
        ["Page Views", kpis.pageViews.current, kpis.pageViews.previous, kpis.pageViews.difference, kpis.pageViews.formattedChange, kpis.pageViews.trend],
        ["Unique Visitors", kpis.uniqueVisitors.current, kpis.uniqueVisitors.previous, kpis.uniqueVisitors.difference, kpis.uniqueVisitors.formattedChange, kpis.uniqueVisitors.trend],
        ["Sessions", kpis.sessions.current, kpis.sessions.previous, kpis.sessions.difference, kpis.sessions.formattedChange, kpis.sessions.trend],
        ["Verified Inquiries (Leads)", kpis.leads.current, kpis.leads.previous, kpis.leads.difference, kpis.leads.formattedChange, kpis.leads.trend],
        ["Form Submissions", kpis.formSubmissions.current, kpis.formSubmissions.previous, kpis.formSubmissions.difference, kpis.formSubmissions.formattedChange, kpis.formSubmissions.trend],
        ["Newsletter Subscribers", kpis.subscribers.current, kpis.subscribers.previous, kpis.subscribers.difference, kpis.subscribers.formattedChange, kpis.subscribers.trend],
        ["WhatsApp Clicks", kpis.whatsappClicks.current, kpis.whatsappClicks.previous, kpis.whatsappClicks.difference, kpis.whatsappClicks.formattedChange, kpis.whatsappClicks.trend],
        ["CTA Clicks", kpis.ctaClicks.current, kpis.ctaClicks.previous, kpis.ctaClicks.difference, kpis.ctaClicks.formattedChange, kpis.ctaClicks.trend],
        ["Overall Conversion Rate (%)", kpis.overallConversionRate.current, kpis.overallConversionRate.previous, kpis.overallConversionRate.difference, kpis.overallConversionRate.formattedChange, kpis.overallConversionRate.trend],
      ];

      const funnelRows = [
        [],
        ["Marketing Funnel Stage", "Volume (Count)", "Share of Total Visitors (%)", "Stage-to-Stage Conversion (%)"],
        ...report.funnel.map((f) => [f.name, f.count, f.percentOfTotal, f.conversionFromPrevious]),
      ];

      csvContent = [...kpiRows, ...funnelRows]
        .map((row) => row.map((cell) => escapeCsvCell(cell)).join(","))
        .join("\n");
      filename = `digivigee-executive-summary-${new Date().toISOString().slice(0, 10)}.csv`;
    }

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    console.error("[api/admin/analytics/export] Export error:", err);
    return NextResponse.json({ success: false, error: "Failed to export report CSV" }, { status: 500 });
  }
}
