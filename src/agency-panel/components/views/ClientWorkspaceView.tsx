"use client";

import React from "react";
import {
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Globe,
  Share2,
  FileText,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Workspace, ActivityRecord } from "../../types";

interface ClientWorkspaceViewProps {
  workspace: Workspace;
  activities: ActivityRecord[];
  onBackToAgency: () => void;
}

export default function ClientWorkspaceView({
  workspace,
  activities,
  onBackToAgency,
}: ClientWorkspaceViewProps) {
  const channelScores = [
    { name: "Website Experience", score: 88, color: "bg-emerald-500", icon: Globe },
    { name: "SEO & Organic Search", score: 76, color: "bg-blue-500", icon: Search },
    { name: "Google Business Profile", score: 91, color: "bg-amber-500", icon: ShieldCheck },
    { name: "Social Media Hub", score: 79, color: "bg-pink-500", icon: Share2 },
    { name: "Content & Copywriting", score: 74, color: "bg-purple-500", icon: FileText },
  ];

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Client Workspace Sub-Header */}
      <div className="p-4 rounded-2xl bg-indigo-900 text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-sm">
            {workspace.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                {workspace.name}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Client Workspace Active
              </span>
            </div>
            <p className="text-xs text-indigo-200">
              White-label client portal isolated view with branded reporting & health scores.
            </p>
          </div>
        </div>

        <button
          onClick={onBackToAgency}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch to Agency Master HQ</span>
        </button>
      </div>

      {/* Main Client Dashboard Content Grid matching Screen 2 in prototype */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Overall Health Score Gauge (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs flex flex-col items-center justify-center text-center transition-colors">
          <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Client Marketing Health Score
          </span>

          {/* Radial Circular Health Gauge matching prototype */}
          <div className="relative w-36 h-36 my-3 flex items-center justify-center">
            <svg className="w-36 h-36 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="2.8" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.8"
                strokeDasharray="82 100"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">82</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">/ 100</span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">Good</span>
            </div>
          </div>

          {/* Channel breakdown bars */}
          <div className="w-full space-y-2.5 mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            {channelScores.map((ch, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <ch.icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium truncate">{ch.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full ${ch.color}`} style={{ width: `${ch.score}%` }} />
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white w-6 text-right">{ch.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Key Client Metrics & Activity Stream (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 4 Client Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Active Projects", val: "6", change: "+1", color: "text-blue-600 dark:text-blue-400" },
              { label: "Open Tasks", val: "15", change: "On track", color: "text-slate-800 dark:text-slate-100" },
              { label: "Pending Approvals", val: "8", change: "Requires action", color: "text-amber-600 dark:text-amber-400" },
              { label: "Leads This Month", val: "23", change: "+42%", color: "text-emerald-600 dark:text-emerald-400" },
            ].map((stat, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs hover:-translate-y-0.5 transition-all duration-200">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{stat.label}</div>
                <div className={`text-xl font-black mt-1 ${stat.color}`}>{stat.val}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity Log matching Screen 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs transition-colors">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs sm:text-[13px] font-extrabold text-slate-900 dark:text-white">
                Recent Workspace Activity
              </h3>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">Real-time sync</span>
            </div>

            <div className="space-y-3">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-800/50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{act.text}</div>
                    <div className="text-[10.5px] text-slate-400 dark:text-slate-500">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-4 text-right">
              <button
                onClick={() => alert("All activity records loaded")}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View all activity</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
