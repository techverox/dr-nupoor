import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminSessionCookie, AUTH_CONFIG } from "@/lib/auth";
import { getAdvancedAnalyticsReport } from "@/lib/services/analyticsService";
import { AnalyticsTimeframe } from "@/types/analytics";
import { AnalyticsDashboardView } from "@/components/analytics/AnalyticsDashboardView";

export const metadata = {
  title: "Advanced Analytics & Reporting | DigiVigee Admin",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{
    timeframe?: string;
    startDate?: string;
    endDate?: string;
    compare?: string;
  }>;
}

export default async function AdminAnalyticsPage({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;
  const { authenticated } = await verifyAdminSessionCookie(sessionCookie);

  if (!authenticated) {
    redirect(AUTH_CONFIG.LOGIN_ROUTE);
  }

  const resolvedParams = await searchParams;
  const timeframe = (resolvedParams.timeframe || "30d") as AnalyticsTimeframe;
  const startDate = resolvedParams.startDate || undefined;
  const endDate = resolvedParams.endDate || undefined;
  const compare = resolvedParams.compare !== "false";

  const initialReport = await getAdvancedAnalyticsReport({
    timeframe,
    startDate,
    endDate,
    compare,
  });

  return <AnalyticsDashboardView initialReport={initialReport} />;
}
