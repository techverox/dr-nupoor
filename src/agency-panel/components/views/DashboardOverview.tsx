"use client";

import React, { useState } from "react";
import {
  Users,
  Layers,
  TrendingUp,
  Clock,
  Calendar,
  CheckSquare,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { MetricStat, ClientRevenueItem, TaskDueItem, Currency, ClientApprovalItem } from "../../types";
import { DAILY_PERFORMANCE_POINTS, CURRENCY_RATES } from "../../database/initial-data";

interface DashboardOverviewProps {
  metrics: MetricStat[];
  topClients: ClientRevenueItem[];
  tasksDue: TaskDueItem[];
  onNavigateModule?: (module: string) => void;
  currency?: Currency;
  formatMoney?: (inrAmount: number) => string;
  onOpenDrilldown?: (metricId: string) => void;
  isLoadingShimmer?: boolean;
  approvals?: ClientApprovalItem[];
  onApprove?: (id: string) => void;
  onRequestChanges?: (id: string) => void;
  onAddComment?: (id: string, comment: string) => void;
}

// Mini Sparkline SVG for KPI Cards
function Sparkline({
  data,
  isPositive,
}: {
  data?: number[];
  isPositive?: boolean;
}) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 64;
  const height = 24;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const strokeColor = isPositive ? "#10B981" : "#F43F5E";
  const fillColor = isPositive ? "rgba(16, 185, 129, 0.12)" : "rgba(244, 63, 94, 0.12)";
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg
      className="overflow-visible"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polygon points={areaPoints} fill={fillColor} />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export default function DashboardOverview({
  metrics,
  topClients,
  tasksDue,
  onNavigateModule,
  currency = "INR",
  formatMoney = (val: number) => `$${val.toLocaleString()}`,
  onOpenDrilldown,
  isLoadingShimmer = false,
  approvals = [],
  onApprove,
  onRequestChanges,
  onAddComment,
}: DashboardOverviewProps) {
  const [activeMetricFilter, setActiveMetricFilter] = useState<"all" | "traffic" | "leads" | "revenue">("all");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(5);
  
  // Approval module local state
  const [commentText, setCommentText] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const activeApproval = approvals.length > 0 ? approvals[0] : null;

  // SVG coordinates calculation for 7 data points (viewBox 0 0 600 200)
  const xPoints = [20, 113.3, 206.7, 300, 393.3, 486.7, 580];
  const trafficY = [110, 88, 42, 72, 32, 8, 15];
  const leadsY = [132, 114, 78, 62, 72, 48, 55];
  const revenueY = [142, 124, 102, 86, 78, 75, 72];

  const trafficPath = "M 20 110 C 66 100, 66 88, 113.3 88 C 160 88, 160 42, 206.7 42 C 253 42, 253 72, 300 72 C 346 72, 346 32, 393.3 32 C 440 32, 440 8, 486.7 8 C 533 8, 533 15, 580 15";
  const trafficArea = `${trafficPath} L 580 155 L 20 155 Z`;

  const leadsPath = "M 20 132 C 66 124, 66 114, 113.3 114 C 160 114, 160 78, 206.7 78 C 253 78, 253 62, 300 62 C 346 62, 346 72, 393.3 72 C 440 72, 440 48, 486.7 48 C 533 48, 533 55, 580 55";
  const leadsArea = `${leadsPath} L 580 155 L 20 155 Z`;

  const revenuePath = "M 20 142 C 66 134, 66 124, 113.3 124 C 160 124, 160 102, 206.7 102 C 253 102, 253 86, 300 86 C 346 86, 346 78, 393.3 78 C 440 78, 440 75, 486.7 75 C 533 75, 533 72, 580 72";
  const revenueArea = `${revenuePath} L 580 155 L 20 155 Z`;

  const hoveredData = hoveredPointIndex !== null ? DAILY_PERFORMANCE_POINTS[hoveredPointIndex] : null;

  // Dynamic Y-Axis scale values based on Currency (Fix 5 & 24)
  const yAxisScale = (() => {
    switch (currency) {
      case "USD":
        return ["$12.0k", "$9.0k", "$6.0k", "$3.0k", "$0"];
      case "AED":
        return ["د.إ 44k", "د.إ 33k", "د.إ 22k", "د.إ 11k", "د.إ 0"];
      case "EUR":
        return ["€11.0k", "€8.2k", "€5.5k", "€2.7k", "€0"];
      case "INR":
      default:
        return ["₹10.0L", "₹7.5L", "₹5.0L", "₹2.5L", "₹0"];
    }
  })();

  // Shimmer Skeleton State (Fix 25)
  if (isLoadingShimmer) {
    return (
      <div className="space-y-6 text-left animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-200/70 dark:bg-slate-800/60 h-28" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 xl:col-span-8 p-6 rounded-2xl bg-slate-200/70 dark:bg-slate-800/60 h-80" />
          <div className="lg:col-span-5 xl:col-span-4 space-y-5">
            <div className="p-5 rounded-2xl bg-slate-200/70 dark:bg-slate-800/60 h-40" />
            <div className="p-5 rounded-2xl bg-slate-200/70 dark:bg-slate-800/60 h-36" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {/* 1. Metric Stat Cards Row (6 Cards with Modern Icon Alignment & Absolute Delta - Fix 10, 11, 12, 13) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
        {metrics.map((metric) => {
          // Dynamic formatting for monetary values
          const displayValue =
            metric.isCurrency && metric.rawNumericValue
              ? formatMoney(metric.rawNumericValue)
              : metric.value;

          return (
            <div
              key={metric.id}
              className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer flex flex-col justify-between"
              onClick={() => onOpenDrilldown ? onOpenDrilldown(metric.id) : onNavigateModule?.(metric.id)}
              title="Click to view granular KPI drilldown analysis"
            >
              <div>
                {/* Modern Icon Alignment alongside Title - No 2018 chunky pastel boxes! (Fix 11) */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11.5px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                    {metric.label}
                  </span>
                  <div className="text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {metric.iconName === "users" && <Users className="w-3.5 h-3.5" />}
                    {metric.iconName === "folder" && <Layers className="w-3.5 h-3.5" />}
                    {metric.iconName === "trending" && <TrendingUp className="w-3.5 h-3.5" />}
                    {metric.iconName === "check" && <CheckSquare className="w-3.5 h-3.5" />}
                    {metric.iconName === "calendar" && <Calendar className="w-3.5 h-3.5" />}
                    {metric.iconName === "clock" && <Clock className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Big Clean Number */}
                <div className="text-[21px] sm:text-[23px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {displayValue}
                </div>

                {/* Contextual Absolute Delta (Fix 12) */}
                {metric.absoluteDelta && (
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">
                    {metric.absoluteDelta}
                  </div>
                )}
              </div>

              {/* Sparkline + Change Rate Footer (Fix 10) */}
              <div className="flex items-end justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-1 text-[11px] font-semibold">
                  {metric.isPositive ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                      <ArrowUpRight className="w-3 h-3" /> {metric.change}
                    </span>
                  ) : (
                    <span className="text-rose-600 dark:text-rose-400 flex items-center">
                      <ArrowDownRight className="w-3 h-3" /> {metric.change}
                    </span>
                  )}
                </div>
                <div className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Sparkline data={metric.sparklineData} isPositive={metric.isPositive} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Main Analytics & Client Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column Wrapper (7 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
          {/* Interactive Overview Graph */}
          <div className="h-fit p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs flex flex-col transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-[15px] font-extrabold text-slate-900 dark:text-white">
                  Agency Cross-Channel Performance
                </h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Multi-metric pacing (May 20 – 26). Hover or tap dates for granular breakdown.
              </p>
            </div>

            {/* Interactive Graph Legend Filters with Live Values (Fix 9) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <button
                onClick={() => setActiveMetricFilter(activeMetricFilter === "traffic" ? "all" : "traffic")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition cursor-pointer shadow-2xs ${
                  activeMetricFilter === "traffic" || activeMetricFilter === "all"
                    ? "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                    : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60"
                }`}
                title="Click to isolate Website Traffic"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-xs" />
                <span>Traffic:</span>
                <span className="font-extrabold">48.2k</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">(+12%)</span>
              </button>

              <button
                onClick={() => setActiveMetricFilter(activeMetricFilter === "leads" ? "all" : "leads")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition cursor-pointer shadow-2xs ${
                  activeMetricFilter === "leads" || activeMetricFilter === "all"
                    ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                    : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60"
                }`}
                title="Click to isolate Leads"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
                <span>Leads:</span>
                <span className="font-extrabold">1,240</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">(+8%)</span>
              </button>

              <button
                onClick={() => setActiveMetricFilter(activeMetricFilter === "revenue" ? "all" : "revenue")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition cursor-pointer shadow-2xs ${
                  activeMetricFilter === "revenue" || activeMetricFilter === "all"
                    ? "bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
                    : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60"
                }`}
                title="Click to isolate Revenue"
              >
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-xs" />
                <span>Revenue:</span>
                <span className="font-extrabold">{formatMoney(845230)}</span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">(+22%)</span>
              </button>
            </div>
          </div>

          {/* Calibrated Graph Canvas with Dynamic Currency Y-Axis Scale (Fix 5 & 24) */}
          <div className="flex gap-2 w-full h-[185px] sm:h-[210px] select-none">
            {/* Left Y-Axis Scale Labels */}
            <div className="flex flex-col justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500 shrink-0 w-11 text-right">
              {yAxisScale.map((label, idx) => (
                <span key={idx}>{label}</span>
              ))}
            </div>

            {/* SVG Interactive Spline Area (Fix 7 & 8) */}
            <div
              className="relative flex-1 h-full cursor-crosshair"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const width = rect.width;
                const padding = 20 * (width / 600);
                const effectiveWidth = width - 2 * padding;
                const relativeX = Math.max(0, Math.min(effectiveWidth, mouseX - padding));
                const index = Math.round((relativeX / effectiveWidth) * (xPoints.length - 1));
                setHoveredPointIndex(index);
              }}
            >
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
                <defs>
                  {/* Traffic Area Gradient */}
                  <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Leads Area Gradient */}
                  <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Revenue Area Gradient */}
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333EA" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#9333EA" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="0" y1="5" x2="600" y2="5" stroke="currentColor" className="text-slate-200/50 dark:text-slate-800/50" strokeDasharray="3 3" />
                <line x1="0" y1="42" x2="600" y2="42" stroke="currentColor" className="text-slate-200/50 dark:text-slate-800/50" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="600" y2="80" stroke="currentColor" className="text-slate-200/50 dark:text-slate-800/50" strokeDasharray="3 3" />
                <line x1="0" y1="117" x2="600" y2="117" stroke="currentColor" className="text-slate-200/50 dark:text-slate-800/50" strokeDasharray="3 3" />
                <line x1="0" y1="155" x2="600" y2="155" stroke="currentColor" className="text-slate-200/70 dark:text-slate-700" strokeWidth="1" />

                {/* Curve 1: Website Traffic Area + Line (Blue) */}
                {(activeMetricFilter === "all" || activeMetricFilter === "traffic") && (
                  <>
                    <path d={trafficArea} fill="url(#trafficGradient)" />
                    <path
                      d={trafficPath}
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {xPoints.map((x, idx) => (
                      <circle
                        key={idx}
                        cx={x}
                        cy={trafficY[idx]}
                        r={hoveredPointIndex === idx ? "6" : "3.5"}
                        fill="#FFFFFF"
                        stroke="#2563EB"
                        strokeWidth={hoveredPointIndex === idx ? "3" : "2"}
                        className="transition-all duration-150"
                      />
                    ))}
                  </>
                )}

                {/* Curve 2: Leads Area + Line (Green) */}
                {(activeMetricFilter === "all" || activeMetricFilter === "leads") && (
                  <>
                    <path d={leadsArea} fill="url(#leadsGradient)" />
                    <path
                      d={leadsPath}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {xPoints.map((x, idx) => (
                      <circle
                        key={idx}
                        cx={x}
                        cy={leadsY[idx]}
                        r={hoveredPointIndex === idx ? "5.5" : "3"}
                        fill="#FFFFFF"
                        stroke="#10B981"
                        strokeWidth={hoveredPointIndex === idx ? "3" : "2"}
                        className="transition-all duration-150"
                      />
                    ))}
                  </>
                )}

                {/* Curve 3: Revenue Area + Line (Purple, Dashed) */}
                {(activeMetricFilter === "all" || activeMetricFilter === "revenue") && (
                  <>
                    <path d={revenueArea} fill="url(#revenueGradient)" />
                    <path
                      d={revenuePath}
                      fill="none"
                      stroke="#9333EA"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                    />
                    {xPoints.map((x, idx) => (
                      <circle
                        key={idx}
                        cx={x}
                        cy={revenueY[idx]}
                        r={hoveredPointIndex === idx ? "5.5" : "3"}
                        fill="#FFFFFF"
                        stroke="#9333EA"
                        strokeWidth={hoveredPointIndex === idx ? "3" : "2"}
                        className="transition-all duration-150"
                      />
                    ))}
                  </>
                )}

                {/* Magnetic Hover Vertical Crosshair */}
                {hoveredPointIndex !== null && (
                  <g>
                    <line
                      x1={xPoints[hoveredPointIndex]}
                      y1="2"
                      x2={xPoints[hoveredPointIndex]}
                      y2="155"
                      stroke="#3B82F6"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      className="opacity-80"
                    />
                    <circle
                      cx={xPoints[hoveredPointIndex]}
                      cy="155"
                      r="3.5"
                      fill="#3B82F6"
                    />
                  </g>
                )}
              </svg>

              {/* Floating Glassmorphic Magnetic Tooltip Card with Dynamic Currency */}
              {hoveredData && hoveredPointIndex !== null && (
                <div
                  className="absolute pointer-events-none z-20 top-2 p-3 rounded-xl bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl ring-1 ring-slate-900/[0.06] dark:ring-white/[0.08] min-w-[175px] transition-all duration-100 text-left"
                  style={{
                    left: `${(xPoints[hoveredPointIndex] / 600) * 100}%`,
                    transform:
                      hoveredPointIndex <= 1
                        ? "translateX(8px)"
                        : hoveredPointIndex >= 5
                        ? "translateX(-105%)"
                        : "translateX(-50%)",
                  }}
                >
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-extrabold text-slate-900 dark:text-white">
                      {hoveredData.dayLabel}, 2024
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                      Attributed
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Traffic
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {hoveredData.trafficFormatted}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Leads
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {hoveredData.leadsFormatted}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Revenue
                      </span>
                      <span className="font-extrabold text-purple-600 dark:text-purple-400">
                        {formatMoney(hoveredData.revenue)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Calibrated X-Axis Date Labels Aligned to Data Points */}
          <div className="flex items-center justify-between pl-13 pr-2 pt-1 text-[10.5px] font-semibold text-slate-400 dark:text-slate-500 select-none">
            {DAILY_PERFORMANCE_POINTS.map((pt, idx) => (
              <button
                key={pt.date}
                type="button"
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  hoveredPointIndex === idx
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-200/80 dark:border-blue-800/80 shadow-2xs"
                    : "hover:text-slate-700 dark:hover:text-slate-200"
                }`}
                onMouseEnter={() => setHoveredPointIndex(idx)}
                onClick={() => setHoveredPointIndex(idx)}
              >
                {pt.dayLabel}
              </button>
            ))}
          </div>
        </div>

        {/* =======================================================
            NEW MODULE 6 IN LEFT COLUMN: CLIENT APPROVAL PORTAL
            ======================================================= */}
        {activeApproval && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs flex flex-col justify-between transition-colors">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-[11px]">
                    6
                  </span>
                  <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 dark:text-white">
                    Client Approval Portal
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10.5px] font-bold">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {activeApproval.status === "approved" ? "Approved" : "Pending Action"}
                  </span>
                </div>
              </div>

              {/* Approval Preview Card matching prototype */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
                <div className="relative w-full sm:w-28 h-28 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <img
                    src={activeApproval.imageUrl}
                    alt="Creative Deliverable"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[8px] font-bold uppercase tracking-wider backdrop-blur-xs">
                    {activeApproval.platform} Post
                  </div>
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="text-[11.5px] font-bold text-slate-900 dark:text-white leading-tight">
                    {activeApproval.title}
                  </div>
                  <p className="text-[10.5px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                    {activeApproval.caption}
                  </p>
                  <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{activeApproval.scheduledTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Interactive Action State */}
            <div className="mt-3">
              {activeApproval.status === "approved" ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Approved & Auto-Queued for Publishing!</span>
                </div>
              ) : activeApproval.status === "changes_requested" ? (
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Changes Requested & Sent to Creative Team!</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onApprove?.(activeApproval.id)}
                      className="flex-1 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => onRequestChanges?.(activeApproval.id)}
                      className="flex-1 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center transition cursor-pointer"
                    >
                      Request Changes
                    </button>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Add a comment or change request..."
                      className="w-full h-8 pl-3 pr-16 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-[11px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && commentText.trim()) {
                          onAddComment?.(activeApproval.id, commentText);
                          setCommentText("");
                          setCommentSubmitted(true);
                          setTimeout(() => setCommentSubmitted(false), 2000);
                        }
                      }}
                    />
                    <button 
                      onClick={() => {
                        if (commentText.trim()) {
                          onAddComment?.(activeApproval.id, commentText);
                          setCommentText("");
                          setCommentSubmitted(true);
                          setTimeout(() => setCommentSubmitted(false), 2000);
                        }
                      }}
                      className="absolute right-1 top-1 bottom-1 px-2 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[9px] font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition cursor-pointer flex items-center justify-center"
                    >
                      {commentSubmitted ? "Sent" : "Send"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        </div>

        {/* Right Column: Top 5 Clients + Tasks Due Soon (Fix 14, 15, 16) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          {/* Top 5 Clients by Revenue with MRR Share Bars & Service Tags (Fix 14, 15) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs transition-colors">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h3 className="text-xs sm:text-[13px] font-extrabold text-slate-900 dark:text-white">
                  Top 5 Clients by Retainer MRR
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-400">Contribution to monthly agency revenue</p>
              </div>
              <button
                onClick={() => onNavigateModule?.("billing")}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center cursor-pointer"
              >
                <span>View all</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {topClients.map((client) => {
                const clientRevenue = client.rawRevenueValue
                  ? formatMoney(client.rawRevenueValue)
                  : client.revenue;

                return (
                  <div
                    key={client.id}
                    className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition border border-slate-100/60 dark:border-slate-800/40 hover:border-slate-200 dark:hover:border-slate-700/60 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10.5px] font-black flex items-center justify-center shrink-0">
                          {client.rank}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                              {client.name}
                            </span>
                            {client.isVerified && (
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {client.category && (
                              <span className="text-[9px] text-slate-400 dark:text-slate-400 truncate">
                                {client.category}
                              </span>
                            )}
                            {client.activeServices && (
                              <span className="text-[8.5px] px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold shrink-0">
                                {client.activeServices.join(" • ")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {clientRevenue}
                        </div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                          {client.growth}
                        </div>
                      </div>
                    </div>

                    {/* MRR Share Progress Bar (Fix 15) */}
                    {client.mrrSharePercent && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 dark:bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, client.mrrSharePercent * 5)}%` }}
                          />
                        </div>
                        <span className="text-[9.5px] font-semibold text-slate-400 dark:text-slate-400 shrink-0">
                          {client.mrrSharePercent}% MRR
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tasks Due Soon with Assignee Avatars & Priority Badges (Fix 16) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs transition-colors">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h3 className="text-xs sm:text-[13px] font-extrabold text-slate-900 dark:text-white">
                  High Priority Deliverables
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-400">Team assignments due within 48 hours</p>
              </div>
              <button
                onClick={() => onNavigateModule?.("tasks")}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center cursor-pointer"
              >
                <span>View all</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {tasksDue.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition border border-slate-100/60 dark:border-slate-800/40 hover:border-slate-200 dark:hover:border-slate-700/60"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      {task.priorityLevel && (
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9.5px] font-extrabold tracking-wide ${
                            task.priorityLevel === "P1"
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                              : task.priorityLevel === "P2"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                              : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          }`}
                        >
                          {task.priorityLevel}
                        </span>
                      )}
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {task.title}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 font-normal truncate">
                        {task.client}
                      </span>
                      {task.assignee && (
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[8px] font-black flex items-center justify-center">
                            {task.assignee.avatar}
                          </span>
                          <span>{task.assignee.name.split(" ")[0]}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-rose-900/40 block">
                      {task.urgency || task.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
