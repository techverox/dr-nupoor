"use client";

import React from "react";
import {
  X,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ExternalLink,
  Layers,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { KpiDrilldownData } from "../types";
import { KPI_DRILLDOWN_MAP } from "../database/initial-data";

interface DrilldownDrawerProps {
  metricId: string | null;
  onClose: () => void;
  onNavigateModule?: (module: string) => void;
}

export default function DrilldownDrawer({
  metricId,
  onClose,
  onNavigateModule,
}: DrilldownDrawerProps) {
  if (!metricId) return null;

  const data: KpiDrilldownData = KPI_DRILLDOWN_MAP[metricId] || {
    metricId,
    title: "Metric Analytics",
    value: "Detailed Log",
    change: "+0%",
    description: "Detailed performance breakdown.",
    breakdown: [],
    recentLogs: [],
  };

  const isPositive = !data.change.startsWith("-");

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-over Content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col h-full z-10 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                KPI Drilldown
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">Live Pacing</span>
            </div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              {data.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-left">
          {/* Main KPI Stat Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {data.value}
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                  isPositive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                <span>{data.change}</span>
              </div>
            </div>

            {data.absoluteDelta && (
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                {data.absoluteDelta}
              </div>
            )}
            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Granular Breakdown Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Contribution Breakdown
            </h3>
            <div className="space-y-2.5">
              {data.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80"
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-800 dark:text-slate-200">{item.label}</span>
                    <span className="text-slate-900 dark:text-white">{item.value} ({item.share}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.color || "bg-emerald-500"}`}
                      style={{ width: `${item.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Recent Attributed Activity
            </h3>
            <div className="space-y-2">
              {data.recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {log.title}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[10.5px] text-slate-400">
                      <span>{log.time}</span>
                      {log.client && <span>• {log.client}</span>}
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between gap-3">
          <button
            onClick={() => alert(`Exporting CSV report for ${data.title}...`)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-slate-300 transition cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateModule?.(metricId);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white font-bold text-xs hover:bg-slate-800 dark:hover:bg-emerald-600 transition shadow-xs cursor-pointer"
          >
            <span>Open Dedicated Module</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
