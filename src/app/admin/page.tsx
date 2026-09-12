import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminSessionCookie, AUTH_CONFIG } from "@/lib/auth";
import { getDashboardSummary, DashboardSummary } from "@/lib/services/dashboardService";
import { StatCard } from "@/components/admin/StatCard";
import { RecentLeadsTable } from "@/components/admin/RecentLeadsTable";
import { ContentOverviewGrid } from "@/components/admin/ContentOverviewGrid";
import { QuickActionsCard } from "@/components/admin/QuickActionsCard";
import { SystemStatusCard } from "@/components/admin/SystemStatusCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Dashboard | DigiVigee Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_CONFIG.SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie || sessionCookie.trim().length === 0) {
    redirect(AUTH_CONFIG.LOGIN_ROUTE);
  }

  let authenticated = false;
  let user = null;

  try {
    const verification = await verifyAdminSessionCookie(sessionCookie);
    authenticated = verification.authenticated;
    user = verification.user || null;
  } catch (err) {
    console.error("[AdminDashboardPage] Auth verification error:", err);
    redirect(AUTH_CONFIG.LOGIN_ROUTE);
  }

  if (!authenticated || !user) {
    redirect(AUTH_CONFIG.LOGIN_ROUTE);
  }

  // Fetch real-time dashboard data safely with robust fallback
  let summary: DashboardSummary = {
    metrics: {
      totalLeads: 0,
      newLeads: 0,
      publishedBlogs: 0,
      totalServices: 0,
      portfolioProjects: 0,
      totalFaqs: 0,
      totalTestimonials: 0,
      totalTeamMembers: 0,
      totalMedia: 0,
      totalDrafts: 0,
      totalSubscribers: 0,
      activeOffers: 0,
      activeRedirects: 0,
      seoHealthScore: 100,
      totalLandingPages: 0,
      totalPageViews: 0,
      uniqueVisitors: 0,
    },
    recentLeads: [],
    systemStatus: {
      authStatus: "connected" as const,
      firestoreStatus: "local_fallback" as const,
      sessionSecurity: "active" as const,
      nodeEnv: process.env.NODE_ENV || "production",
    },
  };

  try {
    const fetched = await getDashboardSummary();
    if (fetched) {
      summary = fetched;
    }
  } catch (err) {
    console.error("[AdminDashboardPage] Error loading dashboard summary:", err);
  }

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Dashboard Top Welcome Banner */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-5 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="text-[13px] font-medium text-zinc-500 mb-1">
            {currentDate}
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight m-0">
            Dashboard Overview
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Overview of your DigiVigee agency website, real-time leads, and content operations.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-[13px] text-zinc-700 dark:text-zinc-300 font-semibold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span>Authenticated as {user.email}</span>
        </div>
      </div>

      {/* Primary KPI / Statistics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Leads"
          value={summary.metrics.totalLeads}
          subtitle="All-time verified inquiries captured"
          accentColor="var(--brand-primary)"
          href="/admin/leads"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        <StatCard
          title="New Inquiries"
          value={summary.metrics.newLeads}
          subtitle="Uncontacted client submissions"
          accentColor="#eab308"
          href="/admin/leads"
          badge={{
            text: summary.metrics.newLeads > 0 ? "ACTION NEEDED" : "CLEAR",
            type: summary.metrics.newLeads > 0 ? "success" : "neutral",
          }}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />

        <StatCard
          title="Active Services"
          value={summary.metrics.totalServices}
          subtitle="Core marketing offerings live"
          accentColor="#3b82f6"
          href="/admin/services"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          }
        />

        <StatCard
          title="Published Blogs"
          value={summary.metrics.publishedBlogs}
          subtitle="Live SEO insights & guides"
          accentColor="#8b5cf6"
          href="/admin/blog"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          }
        />

        <StatCard
          title="Page Views"
          value={summary.metrics.totalPageViews || 0}
          subtitle={`${summary.metrics.uniqueVisitors || 0} unique visitors tracked`}
          accentColor="#0284c7"
          href="/admin/analytics"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          }
        />

        <StatCard
          title="Subscribers"
          value={summary.metrics.totalSubscribers || 0}
          subtitle="Active audience mailing list"
          accentColor="#059669"
          href="/admin/subscribers"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />

      </div>

      {/* Main 2-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Leads & Content Collections */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <RecentLeadsTable leads={summary.recentLeads} />
          <ContentOverviewGrid metrics={summary.metrics} />
        </div>

        {/* Right Column: Quick Actions & System Status */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <QuickActionsCard />
          <SystemStatusCard status={summary.systemStatus} />
        </div>
      </div>
    </div>
  );
}
