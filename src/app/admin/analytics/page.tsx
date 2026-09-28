import React from "react";
import { getAdvancedAnalyticsReport } from "@/lib/services/analyticsService";
import { AnalyticsDashboardView } from "@/components/analytics/AnalyticsDashboardView";

export const metadata = {
  title: "Practice Telemetry & Analytics | Dr. Noopur Patel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminAnalyticsPage() {
  const initialReport = await getAdvancedAnalyticsReport({
    timeframe: "30d",
    compare: true,
  });

  return <AnalyticsDashboardView initialReport={initialReport} />;
}
