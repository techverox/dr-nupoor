"use client";

import React from "react";
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  BarChart2,
  Calendar,
  MapPin,
  Kanban,
  ShieldCheck,
  Workflow,
  Maximize2,
  Check,
} from "lucide-react";
import { LayoutConfig } from "../types";

interface LayoutCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: LayoutConfig;
  onToggle: (key: keyof LayoutConfig) => void;
  onReset: () => void;
}

export default function LayoutCustomizerDrawer({
  isOpen,
  onClose,
  config,
  onToggle,
  onReset,
}: LayoutCustomizerDrawerProps) {
  if (!isOpen) return null;

  const widgets: {
    key: keyof LayoutConfig;
    title: string;
    desc: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    {
      key: "showOverviewGraph",
      title: "Agency Cross-Channel Graph",
      desc: "Interactive multi-metric pacing chart (Traffic, Leads, Revenue).",
      icon: BarChart2,
    },
    {
      key: "showSocialCalendar",
      title: "Social Media Hub & Calendar",
      desc: "14-day visual scheduled posts grid with one-click creator.",
      icon: Calendar,
    },
    {
      key: "showGbpAudit",
      title: "Google Business (GBP) Audit",
      desc: "Real-time health score gauge with action item fix triage.",
      icon: MapPin,
    },
    {
      key: "showCrmKanban",
      title: "CRM Sales Pipeline Kanban",
      desc: "Inbound deals flow from New Lead to Proposal and Won Retainers.",
      icon: Kanban,
    },
    {
      key: "showApprovals",
      title: "Client Deliverable Approvals",
      desc: "Client portal reviews with one-click approve, change request & comments.",
      icon: ShieldCheck,
      badge: "Active",
    },
    {
      key: "showUserFlow",
      title: "Standard Agency User Flow Banner",
      desc: "7-step multi-tenant enterprise orchestration roadmap banner.",
      icon: Workflow,
    },
    {
      key: "compactKpiCards",
      title: "Compact Density Mode",
      desc: "Tighter spacing on top KPI cards for maximum data density on 13-inch screens.",
      icon: Maximize2,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-over Drawer Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col h-full z-10 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Dashboard Customizer
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Personalize widget layout and module density
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Widget Toggle List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Widget Modules
            </span>
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {widgets.map((widget) => {
            const Icon = widget.icon;
            const isEnabled = config[widget.key];

            return (
              <div
                key={widget.key}
                onClick={() => onToggle(widget.key)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                  isEnabled
                    ? "bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-2xs hover:border-emerald-500/40"
                    : "bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/50 opacity-60 hover:opacity-80"
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isEnabled
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {widget.title}
                      </span>
                      {widget.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {widget.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {widget.desc}
                    </p>
                  </div>
                </div>

                {/* Toggle Pill Switch */}
                <div
                  className={`w-10 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                    isEnabled ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 flex items-center justify-center ${
                      isEnabled ? "translate-x-4" : "translate-x-0"
                    }`}
                  >
                    {isEnabled && <Check className="w-3 h-3 text-emerald-600" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Changes auto-saved to workspace
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white font-bold text-xs hover:bg-slate-800 dark:hover:bg-emerald-600 transition shadow-xs cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
