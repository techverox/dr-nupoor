"use client";

import React, { useEffect, useState } from "react";
import { DashboardSummary } from "@/lib/services/dashboardService";
import { StatCard } from "@/components/admin/StatCard";
import { RecentLeadsTable } from "@/components/admin/RecentLeadsTable";
import { ContentOverviewGrid } from "@/components/admin/ContentOverviewGrid";
import { QuickActionsCard } from "@/components/admin/QuickActionsCard";
import { SystemStatusCard } from "@/components/admin/SystemStatusCard";
import { Stethoscope } from "lucide-react";

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary>({
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
      nodeEnv: "production",
    },
  });

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data?.summary) {
          setSummary(data.summary);
        }
      })
      .catch(() => {});
  }, []);

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto font-sans pb-16">
      {/* Dashboard Top Welcome Banner */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-5 border-b border-slate-200/90">
        <div>
          <div className="text-xs font-semibold text-slate-500 mb-1">
            {currentDate}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight m-0">
            Practice Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Overview of Dr. Noopur Patel&apos;s practice portal, patient appointment inquiries, and clinical content operations.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-bold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Admin Portal Active</span>
        </div>
      </div>

      {/* Primary KPI / Statistics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Consultations"
          value={summary.metrics.totalLeads}
          subtitle="All patient inquiries received"
          accentColor="#059669"
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
          subtitle="Awaiting response"
          accentColor="#d97706"
          href="/admin/leads"
          badge={{
            text: summary.metrics.newLeads > 0 ? "ACTION NEEDED" : "CLEAR",
            type: summary.metrics.newLeads > 0 ? "info" : "neutral",
          }}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />

        <StatCard
          title="Clinical Services"
          value={summary.metrics.totalServices}
          subtitle="Surgical & breast procedures"
          accentColor="#0284c7"
          href="/admin/services"
          icon={<Stethoscope className="w-5 h-5" />}
        />

        <StatCard
          title="Health Articles"
          value={summary.metrics.publishedBlogs}
          subtitle="Patient guides & insights"
          accentColor="#7c3aed"
          href="/admin/blog"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          }
        />

        <StatCard
          title="Patient Views"
          value={summary.metrics.totalPageViews || 0}
          subtitle={`${summary.metrics.uniqueVisitors || 0} visitors tracked`}
          accentColor="#0891b2"
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
          subtitle="Patient health bulletin list"
          accentColor="#16a34a"
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
        {/* Left Column: Recent Consultations & Content Collections */}
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
