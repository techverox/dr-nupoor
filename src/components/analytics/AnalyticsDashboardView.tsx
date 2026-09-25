"use client";

import React, { useState } from "react";
import {
  AdvancedAnalyticsReport,
  PagePerformanceRow,
  CampaignPerformanceRow,
  AnalyticsTimeframe,
} from "@/types/analytics";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  RotateCcw,
  RefreshCw,
  Download,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Clock,
  FileText,
  UserCheck,
  Target,
  MessageSquare,
  Mail,
  ExternalLink,
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
} from "lucide-react";
import { AnalyticsTrendChart } from "./AnalyticsTrendChart";
import { AnalyticsFunnelChart } from "./AnalyticsFunnelChart";

interface AnalyticsDashboardViewProps {
  initialReport: AdvancedAnalyticsReport;
}

type TabType = "overview" | "pages" | "campaigns" | "forms";

interface DateFilterState {
  timeframe: AnalyticsTimeframe;
  startDate?: string;
  endDate?: string;
  compare: boolean;
}

const TIMEFRAME_PRESETS: Array<{ id: AnalyticsTimeframe; label: string; icon: string }> = [
  { id: "today", label: "Today", icon: "⚡" },
  { id: "yesterday", label: "Yesterday", icon: "⏪" },
  { id: "7d", label: "7 Days", icon: "📊" },
  { id: "30d", label: "30 Days", icon: "📈" },
  { id: "90d", label: "90 Days", icon: "🗓️" },
  { id: "this_month", label: "This Month", icon: "📅" },
  { id: "previous_month", label: "Last Month", icon: "📆" },
  { id: "custom", label: "Custom", icon: "⚙️" },
];

export function AnalyticsDashboardView({ initialReport }: AnalyticsDashboardViewProps) {
  const [report, setReport] = useState<AdvancedAnalyticsReport>(initialReport);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Table filters & sorting
  const [pageSearch, setPageSearch] = useState("");
  const [pageSortKey, setPageSortKey] = useState<keyof PagePerformanceRow>("views");
  const [pageSortAsc, setPageSortAsc] = useState(false);

  const [campSearch, setCampSearch] = useState("");
  const [campSortKey, setCampSortKey] = useState<keyof CampaignPerformanceRow>("clicksOrViews");
  const [campSortAsc, setCampSortAsc] = useState(false);

  // Custom date picker modal
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customStart, setCustomStart] = useState(initialReport.filter.startDate || "");
  const [customEnd, setCustomEnd] = useState(initialReport.filter.endDate || "");
  const [customError, setCustomError] = useState("");

  const [filterState, setFilterState] = useState<DateFilterState>({
    timeframe: initialReport.filter.timeframe,
    startDate: initialReport.filter.startDate,
    endDate: initialReport.filter.endDate,
    compare: initialReport.filter.hasComparison,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch report data based on filter
  const fetchReport = async (filter: DateFilterState) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const params = new URLSearchParams();
      params.set("timeframe", filter.timeframe);
      if (filter.startDate) params.set("startDate", filter.startDate);
      if (filter.endDate) params.set("endDate", filter.endDate);
      params.set("compare", String(filter.compare));

      if (typeof window !== "undefined") {
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", newUrl);
      }

      const res = await fetch(`/api/admin/analytics?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to update analytics report.");
      }

      setReport(json.report);
      setFilterState(filter);
    } catch (err) {
      console.error("[AnalyticsDashboardView] Error fetching report:", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to load analytics data.");
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click Reset to Defaults
  const handleResetToDefaults = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/admin/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to reset analytics data.");
      }

      setReport(data.report);
      setFilterState({
        timeframe: data.report.filter.timeframe,
        startDate: data.report.filter.startDate,
        endDate: data.report.filter.endDate,
        compare: data.report.filter.hasComparison,
      });
      setShowResetModal(false);
      showToast("✅ Real-Time Analytics Telemetry Successfully Reset to Verified Defaults!");
    } catch (err) {
      console.error("[AnalyticsDashboardView] Reset error:", err);
      alert(err instanceof Error ? err.message : "Failed to reset analytics.");
    } finally {
      setIsResetting(false);
    }
  };

  const handleTimeframeSelect = (tf: AnalyticsTimeframe) => {
    if (tf === "custom") {
      setShowCustomModal(true);
      return;
    }
    const newFilter = { ...filterState, timeframe: tf };
    fetchReport(newFilter);
  };

  const handleApplyCustomDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStart || !customEnd) {
      setCustomError("Please select both start and end dates.");
      return;
    }
    if (new Date(customStart) > new Date(customEnd)) {
      setCustomError("Start date cannot be after end date.");
      return;
    }
    setCustomError("");
    setShowCustomModal(false);
    fetchReport({
      timeframe: "custom",
      startDate: customStart,
      endDate: customEnd,
      compare: filterState.compare,
    });
  };

  const handleToggleCompare = () => {
    const newFilter = { ...filterState, compare: !filterState.compare };
    fetchReport(newFilter);
  };

  const kpis = report.kpis;
  const compLabel = report.filter.comparisonLabel;
  const hasComp = report.filter.hasComparison;

  // Filtered & Sorted Pages
  const filteredPages = report.topPages
    .filter(
      (p) =>
        p.path.toLowerCase().includes(pageSearch.toLowerCase()) ||
        (p.pageTitle && p.pageTitle.toLowerCase().includes(pageSearch.toLowerCase()))
    )
    .sort((a, b) => {
      const valA = a[pageSortKey] ?? 0;
      const valB = b[pageSortKey] ?? 0;
      if (typeof valA === "number" && typeof valB === "number") {
        return pageSortAsc ? valA - valB : valB - valA;
      }
      return pageSortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  // Filtered & Sorted Campaigns
  const filteredCampaigns = report.campaigns
    .filter(
      (c) =>
        c.campaign.toLowerCase().includes(campSearch.toLowerCase()) ||
        c.source.toLowerCase().includes(campSearch.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[campSortKey] ?? 0;
      const valB = b[campSortKey] ?? 0;
      if (typeof valA === "number" && typeof valB === "number") {
        return campSortAsc ? valA - valB : valB - valA;
      }
      return campSortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  const getExportUrl = (type: string) => {
    const p = new URLSearchParams();
    p.set("type", type);
    p.set("timeframe", filterState.timeframe);
    if (filterState.startDate) p.set("startDate", filterState.startDate);
    if (filterState.endDate) p.set("endDate", filterState.endDate);
    return `/api/admin/analytics/export?${p.toString()}`;
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[350] max-w-md bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 font-bold text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="leading-snug">{toastMessage}</p>
        </div>
      )}

      {/* Main Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[11px] tracking-wider uppercase">
                Clinical Telemetry & Inquiries
              </span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Data Connection: Active</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Practice Telemetry & Analytics
            </h1>

            <p className="text-sm text-slate-500 max-w-2xl">
              Real-time patient traffic telemetry, consultation inquiries, referral attribution, and patient care funnel insights for Dr. Noopur Patel's clinical practice.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Refresh Button */}
            <button
              onClick={() => {
                fetchReport(filterState);
                showToast("🔄 Data Refreshed with latest live website events!");
              }}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-rose-600" : ""}`} />
              <span>Refresh</span>
            </button>

            {/* 1-Click Reset to Defaults Button */}
            <button
              onClick={() => setShowResetModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 font-bold text-xs hover:bg-amber-100 shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>Reset to Defaults</span>
            </button>

            {/* Export Summary CSV */}
            <a
              href={getExportUrl("summary")}
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </a>
          </div>
        </div>

        {/* Date Range Selector Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-2">
              TIMEFRAME:
            </span>
            {TIMEFRAME_PRESETS.map((preset) => {
              const isActive = filterState.timeframe === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleTimeframeSelect(preset.id)}
                  disabled={isLoading}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={filterState.compare}
                onChange={handleToggleCompare}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300 cursor-pointer"
              />
              <span>Compare with Previous Period</span>
            </label>
          </div>
        </div>

        {/* Selected Period Info */}
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Active Window: <strong className="text-slate-800">{report.filter.label}</strong></span>
          {hasComp && (
            <span className="text-slate-400">
              vs <strong className="text-slate-700">{report.filter.comparisonLabel}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Loading & Error Indicators */}
      {isLoading && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3 text-blue-800 font-bold text-xs animate-pulse">
          <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
          <span>Updating telemetry across clinic channels &amp; patient pages...</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Primary 8-Card Bento Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Page Views */}
        <BentoKpiCard
          title="Page Views"
          current={kpis.pageViews.current}
          previous={kpis.pageViews.previous}
          formattedChange={kpis.pageViews.formattedChange}
          trend={kpis.pageViews.trend}
          isPositive={kpis.pageViews.isPositive}
          comparisonLabel={compLabel}
          hasComparison={hasComp}
          helperText="Total clinical pages viewed by patients"
          icon={<Eye className="w-5 h-5 text-blue-500" />}
          accentColor="text-blue-600"
        />

        {/* Metric 2: Unique Visitors */}
        <BentoKpiCard
          title="Unique Visitors"
          current={kpis.uniqueVisitors.current}
          previous={kpis.uniqueVisitors.previous}
          formattedChange={kpis.uniqueVisitors.formattedChange}
          trend={kpis.uniqueVisitors.trend}
          isPositive={kpis.uniqueVisitors.isPositive}
          comparisonLabel={compLabel}
          hasComparison={hasComp}
          helperText="Distinct patients & families visiting portal"
          icon={<Users className="w-5 h-5 text-indigo-500" />}
          accentColor="text-indigo-600"
        />

        {/* Metric 3: Browsing Sessions */}
        <BentoKpiCard
          title="Browsing Sessions"
          current={kpis.sessions.current}
          previous={kpis.sessions.previous}
          formattedChange={kpis.sessions.formattedChange}
          trend={kpis.sessions.trend}
          isPositive={kpis.sessions.isPositive}
          comparisonLabel={compLabel}
          hasComparison={hasComp}
          helperText="Total website browsing sessions"
          icon={<Clock className="w-5 h-5 text-amber-500" />}
          accentColor="text-slate-900"
        />

        {/* Metric 4: Verified Leads */}
        <BentoKpiCard
          title="Consultation Inquiries"
          current={kpis.leads.current}
          previous={kpis.leads.previous}
          formattedChange={kpis.leads.formattedChange}
          trend={kpis.leads.trend}
          isPositive={kpis.leads.isPositive}
          comparisonLabel={compLabel}
          hasComparison={hasComp}
          helperText="Qualified patient consultation requests"
          icon={<UserCheck className="w-5 h-5 text-emerald-500" />}
          accentColor="text-emerald-600"
        />

        {/* Metric 5: Form Submissions */}
        <BentoKpiCard
          title="Form Submissions"
          current={kpis.formSubmissions.current}
          previous={kpis.formSubmissions.previous}
          formattedChange={kpis.formSubmissions.formattedChange}
          trend={kpis.formSubmissions.trend}
          isPositive={kpis.formSubmissions.isPositive}
          comparisonLabel={compLabel}
          hasComparison={hasComp}
          helperText="Completed appointment booking forms"
          icon={<FileText className="w-5 h-5 text-purple-500" />}
          accentColor="text-purple-600"
        />

        {/* Metric 6: Conversion Rate */}
        <BentoKpiCard
          title="Inquiry Conversion Rate"
          current={`${kpis.overallConversionRate.current}%`}
          previous={`${kpis.overallConversionRate.previous}%`}
          formattedChange={kpis.overallConversionRate.formattedChange}
          trend={kpis.overallConversionRate.trend}
          isPositive={kpis.overallConversionRate.isPositive}
          comparisonLabel={compLabel}
          hasComparison={hasComp}
          helperText="Visitors converted to direct inquiries"
          icon={<Target className="w-5 h-5 text-emerald-500" />}
          accentColor="text-emerald-600"
        />

        {/* Metric 7: WhatsApp Inquiries */}
        <BentoKpiCard
          title="WhatsApp Consultations"
          current={kpis.whatsappClicks.current}
          previous={kpis.whatsappClicks.previous}
          formattedChange={kpis.whatsappClicks.formattedChange}
          trend={kpis.whatsappClicks.trend}
          isPositive={kpis.whatsappClicks.isPositive}
          comparisonLabel={compLabel}
          hasComparison={hasComp}
          helperText="1-click direct patient WhatsApp chats"
          icon={<MessageSquare className="w-5 h-5 text-[#25D366]" />}
          accentColor="text-[#25D366]"
        />

        {/* Metric 8: Active Subscribers */}
        <BentoKpiCard
          title="Health Newsletter"
          current={kpis.subscribers.current}
          previous={kpis.subscribers.previous}
          formattedChange={kpis.subscribers.formattedChange}
          trend={kpis.subscribers.trend}
          isPositive={kpis.subscribers.isPositive}
          comparisonLabel={compLabel}
          hasComparison={hasComp}
          helperText="Breast health updates & awareness subscribers"
          icon={<Mail className="w-5 h-5 text-blue-500" />}
          accentColor="text-blue-600"
        />
      </div>

      {/* Tab Navigation Strip */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === "overview"
              ? "border-rose-600 text-rose-600 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Practice Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("pages")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === "pages"
              ? "border-rose-600 text-rose-600 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Top Pages &amp; Performance ({report.topPages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("campaigns")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === "campaigns"
              ? "border-rose-600 text-rose-600 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Campaigns &amp; Channels ({report.campaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("forms")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === "forms"
              ? "border-rose-600 text-rose-600 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Forms &amp; Consultation Pipeline ({report.formPerformance.length})</span>
        </button>
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Practice Insights Banner */}
          {report.insights && report.insights.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-black text-slate-900">
                  Key Practice Insights &amp; Inquiries Telemetry
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                  Verified Data
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {report.insights.map((insight) => {
                  let badgeBg = "bg-blue-50 text-blue-700 border-blue-200";
                  let tag = "INSIGHT";
                  if (insight.sentiment === "positive") {
                    badgeBg = "bg-emerald-50 text-emerald-800 border-emerald-200";
                    tag = "GROWTH";
                  } else if (insight.sentiment === "negative") {
                    badgeBg = "bg-rose-50 text-rose-800 border-rose-200";
                    tag = "ATTENTION";
                  }

                  return (
                    <div
                      key={insight.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                    >
                      <span className={`px-2 py-0.5 rounded-md font-black text-[10px] uppercase border shrink-0 mt-0.5 ${badgeBg}`}>
                        {tag}
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {insight.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2-Column: Interactive Trend Chart & Conversion Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <AnalyticsTrendChart
              timeline={report.timeline}
              title="Daily Patient Traffic & Inquiries"
              subtitle="Daily volume of total pageviews and unique visitors over the selected period"
            />
            <AnalyticsFunnelChart
              funnel={report.funnel}
              title="Clinical Consultation Funnel"
              subtitle="Patient progression from initial inquiry to confirmed OPD consultation"
            />
          </div>
        </div>
      )}

      {/* TAB 2: TOP PAGES & PERFORMANCE */}
      {activeTab === "pages" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Page Performance &amp; Attribution Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Patient traffic volume, distinct visitors, and verified consultation inquiries attributed to each URL path on Dr. Noopur Patel's portal.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter pages..."
                  value={pageSearch}
                  onChange={(e) => setPageSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 w-48 sm:w-64"
                />
              </div>

              <a
                href={getExportUrl("pages")}
                download
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </a>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 pr-4">Page Route &amp; Title</th>
                  <th
                    onClick={() => {
                      if (pageSortKey === "views") setPageSortAsc(!pageSortAsc);
                      else { setPageSortKey("views"); setPageSortAsc(false); }
                    }}
                    className="pb-3 px-3 text-right cursor-pointer hover:text-slate-700 select-none"
                  >
                    Views {pageSortKey === "views" ? (pageSortAsc ? "▲" : "▼") : ""}
                  </th>
                  <th
                    onClick={() => {
                      if (pageSortKey === "uniqueVisitors") setPageSortAsc(!pageSortAsc);
                      else { setPageSortKey("uniqueVisitors"); setPageSortAsc(false); }
                    }}
                    className="pb-3 px-3 text-right cursor-pointer hover:text-slate-700 select-none"
                  >
                    Visitors {pageSortKey === "uniqueVisitors" ? (pageSortAsc ? "▲" : "▼") : ""}
                  </th>
                  <th
                    onClick={() => {
                      if (pageSortKey === "leadsAttributed") setPageSortAsc(!pageSortAsc);
                      else { setPageSortKey("leadsAttributed"); setPageSortAsc(false); }
                    }}
                    className="pb-3 px-3 text-right cursor-pointer hover:text-slate-700 select-none"
                  >
                    Inquiries {pageSortKey === "leadsAttributed" ? (pageSortAsc ? "▲" : "▼") : ""}
                  </th>
                  <th
                    onClick={() => {
                      if (pageSortKey === "conversionRate") setPageSortAsc(!pageSortAsc);
                      else { setPageSortKey("conversionRate"); setPageSortAsc(false); }
                    }}
                    className="pb-3 pl-3 text-right cursor-pointer hover:text-slate-700 select-none"
                  >
                    CVR % {pageSortKey === "conversionRate" ? (pageSortAsc ? "▲" : "▼") : ""}
                  </th>
                  <th className="pb-3 pl-4 text-center">Live Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPages.map((page) => (
                  <tr key={page.path} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                          {page.path}
                        </span>
                        {page.isHighTrafficLowConversion && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200">
                            Low CVR
                          </span>
                        )}
                      </div>
                      {page.pageTitle && (
                        <div className="text-[11px] text-slate-500 mt-1 font-medium truncate max-w-sm">
                          {page.pageTitle}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right font-black text-slate-900">
                      {page.views.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-right font-medium text-slate-600">
                      {page.uniqueVisitors.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-right font-black">
                      <span className={page.leadsAttributed > 0 ? "text-emerald-700 font-bold" : "text-slate-400"}>
                        {page.leadsAttributed}
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 text-right font-bold text-slate-800">
                      {page.conversionRate}%
                    </td>
                    <td className="py-3.5 pl-4 text-center">
                      <a
                        href={page.path}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:underline"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CAMPAIGNS & CHANNELS */}
      {activeTab === "campaigns" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Traffic Sources Breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Traffic Acquisition Channels
              </h2>
              <p className="text-xs text-slate-500">
                Breakdown of traffic volume, percentage share, and consultation inquiries by channel.
              </p>
            </div>

            <div className="space-y-3.5">
              {report.trafficSources.map((source) => (
                <div key={source.source} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      {source.source}
                    </span>
                    <span className="text-slate-500 font-medium">
                      <strong className="text-slate-900">{source.count}</strong> events ({source.percentage}%) • <strong className="text-emerald-700">{source.leads || 0}</strong> inquiries
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-rose-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(4, source.percentage))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral & Campaigns Matrix */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Referral &amp; Outreach Matrix
                </h2>
                <p className="text-xs text-slate-500">
                  Tracking multi-channel health outreach &amp; awareness campaigns.
                </p>
              </div>

              <a
                href={getExportUrl("campaigns")}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-3">Campaign / Source</th>
                    <th className="pb-3 px-2">Channel</th>
                    <th className="pb-3 px-2 text-right">Clicks</th>
                    <th className="pb-3 px-2 text-right">Inquiries</th>
                    <th className="pb-3 pl-2 text-right">CVR %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCampaigns.map((camp) => (
                    <tr key={camp.campaign} className="hover:bg-slate-50">
                      <td className="py-3 pr-3 font-bold text-slate-900">
                        {camp.campaign}
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {camp.source} / {camp.medium}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right font-black text-slate-900">
                        {camp.clicksOrViews}
                      </td>
                      <td className="py-3 px-2 text-right font-black text-emerald-700">
                        {camp.conversions}
                      </td>
                      <td className="py-3 pl-2 text-right font-bold text-slate-800">
                        {camp.conversionRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FORMS & CONSULTATION PIPELINE */}
      {activeTab === "forms" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Form Leaderboard */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Form Funnels &amp; Submission Rate
                </h2>
                <p className="text-xs text-slate-500">
                  Direct submissions and inquiry conversion for all clinical forms.
                </p>
              </div>

              <a
                href={getExportUrl("forms")}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-3">Form Name</th>
                    <th className="pb-3 px-3 text-right">Submissions</th>
                    <th className="pb-3 px-3 text-right">Inquiries</th>
                    <th className="pb-3 pl-3 text-right">CVR %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.formPerformance.map((f) => (
                    <tr key={f.formId} className="hover:bg-slate-50">
                      <td className="py-3.5 pr-3">
                        <div className="font-bold text-slate-900">
                          {f.formName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {f.formId}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-right font-black text-slate-900">
                        {f.submissions}
                      </td>
                      <td className="py-3.5 px-3 text-right font-black text-emerald-700">
                        {f.leadsGenerated}
                      </td>
                      <td className="py-3.5 pl-3 text-right font-bold text-slate-800">
                        {f.conversionRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Patient Consultation Lifecycle Pipeline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Patient Consultation Lifecycle
              </h2>
              <p className="text-xs text-slate-500">
                Progression of all incoming patient inquiries across clinical workflow stages.
              </p>
            </div>

            <div className="space-y-3.5">
              {[
                { key: "new", label: "New Patient Inquiries (Fresh)", color: "bg-blue-500" },
                { key: "contacted", label: "Patient Outreach Completed", color: "bg-sky-500" },
                { key: "qualified", label: "Clinical Symptoms & Scope Triaged", color: "bg-amber-500" },
                { key: "proposal_sent", label: "OPD Appointment Slot Offered", color: "bg-purple-500" },
                { key: "converted", label: "Confirmed Consultation / Scheduled", color: "bg-emerald-500" },
                { key: "closed_lost", label: "Archived / Non-Clinical Queries", color: "bg-slate-400" },
              ].map((stage) => {
                const count = report.leadDistribution[stage.key] || 0;
                const totalLeads = kpis.leads.current;
                const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;

                return (
                  <div key={stage.key} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">
                        {stage.label}
                      </span>
                      <span className="font-black text-slate-800">
                        {count} <span className="text-slate-400 font-normal">({pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${stage.color}`}
                        style={{ width: `${Math.min(100, Math.max(count > 0 ? 6 : 0, pct))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 1-Click Reset to Defaults Confirm Dialog */}
      <ConfirmDialog
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleResetToDefaults}
        title="Restore Canonical Clinical Analytics?"
        message={`This will reset analytics telemetry to Dr. Noopur Patel's verified canonical baseline across all clinical pages, consultation channels, forms, and funnel stages.\n\nAll historical graphs, channels, and conversion metrics will be immediately synchronized.`}
        confirmLabel="Reset Analytics Data"
        isLoading={isResetting}
      />

      {/* Custom Date Range Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              Select Custom Date Window
            </h3>
            <form onSubmit={handleApplyCustomDate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              {customError && (
                <p className="text-xs text-rose-600 font-bold">{customError}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm cursor-pointer"
                >
                  Apply Filter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Bento KPI Card with comparison pill & clear caption
interface BentoKpiCardProps {
  title: string;
  current: number | string;
  previous: number | string;
  formattedChange: string;
  trend: "up" | "down" | "neutral";
  isPositive: boolean;
  comparisonLabel: string;
  hasComparison: boolean;
  helperText: string;
  icon: React.ReactNode;
  accentColor: string;
}

function BentoKpiCard({
  title,
  current,
  previous,
  formattedChange,
  trend,
  isPositive,
  comparisonLabel,
  hasComparison,
  helperText,
  icon,
  accentColor,
}: BentoKpiCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between gap-3 hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100">
          {icon}
        </div>
      </div>

      <div>
        <div className={`text-3xl font-black tracking-tight ${accentColor}`}>
          {typeof current === "number" ? current.toLocaleString() : current}
        </div>

        {hasComparison && (
          <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[11px]">
            <span
              className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-black ${
                trend === "neutral"
                  ? "bg-slate-100 text-slate-600"
                  : isPositive
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {trend === "up" && <TrendingUp className="w-3 h-3" />}
              {trend === "down" && <TrendingDown className="w-3 h-3" />}
              <span>{formattedChange}</span>
            </span>
            <span className="text-slate-400 font-medium">
              vs {typeof previous === "number" ? previous.toLocaleString() : previous}
            </span>
          </div>
        )}

        <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">
          {helperText}
        </p>
      </div>
    </div>
  );
}
