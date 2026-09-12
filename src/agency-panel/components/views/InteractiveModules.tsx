"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowRight,
  Check,
} from "lucide-react";
import { LeadKanbanCard, GbpIssue, ClientApprovalItem } from "../../types";

interface InteractiveModulesProps {
  leads: LeadKanbanCard[];
  gbpIssues: GbpIssue[];
  approvals: ClientApprovalItem[];
  onApprove: (id: string) => void;
  onRequestChanges: (id: string) => void;
  onAddComment: (id: string, comment: string) => void;
  onFixGbpIssue: (id: string) => void;
}

export default function InteractiveModules({
  leads,
  gbpIssues,
  approvals,
  onApprove,
  onRequestChanges,
  onAddComment,
  onFixGbpIssue,
}: InteractiveModulesProps) {
  // Module 3: Social Media active tab
  const [socialTab, setSocialTab] = useState("calendar");
  const [commentText, setCommentText] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const activeApproval = approvals[0];

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Live Connected Agency Modules</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              All-In-One OS
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Real-time execution across Social Media, Google Business, Sales CRM & Client Approvals.
          </p>
        </div>
      </div>

      {/* Grid of 4 Modules matching Prototype (Screens 3, 4, 5, 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* =======================================================
            MODULE 3: SOCIAL MEDIA CALENDAR & HUB
            ======================================================= */}
        <div className="lg:col-span-2 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs flex flex-col justify-between transition-colors">
          <div>
            {/* Header & Sub-Tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold text-[11px]">
                  3
                </span>
                <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 dark:text-white">
                  Social Media Hub & Calendar
                </span>
              </div>

              {/* Social Channels Icons */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-500 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">IG</span>
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">fb</span>
                <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">in</span>
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">TT</span>
              </div>
            </div>

            {/* Sub-nav row */}
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-2">
                {["Calendar", "Posts", "Accounts", "Analytics"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSocialTab(tab.toLowerCase())}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                      socialTab === tab.toLowerCase()
                        ? "bg-slate-900 dark:bg-emerald-500 text-white font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">May 2024</span>
            </div>

            {/* Mini Calendar Grid matching prototype */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100/80 dark:bg-slate-800/60 py-1 border-b border-slate-200 dark:border-slate-800">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800 text-xs">
                {[
                  { day: 26, isPast: true },
                  { day: 27, isPast: true },
                  { day: 28, isPast: true },
                  { day: 1, posts: ["10:00 AM IG", "+2 more"] },
                  { day: 2, posts: ["02:00 PM FB"] },
                  { day: 3, posts: ["10:00 AM TT"] },
                  { day: 4 },
                  { day: 5 },
                  { day: 6, posts: ["11:00 AM LI", "+3 more"] },
                  { day: 7, posts: ["02:00 PM IG"] },
                  { day: 8, posts: ["10:00 AM FB"] },
                  { day: 9, posts: ["04:00 PM LI"] },
                  { day: 10, posts: ["06:00 PM IG"] },
                  { day: 11 },
                ].map((slot, idx) => (
                  <div
                    key={idx}
                    className={`min-h-[58px] p-1 bg-white dark:bg-[#0F172A] flex flex-col justify-between ${
                      slot.isPast ? "text-slate-300 dark:text-slate-600" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="text-[10px] font-bold pl-0.5">{slot.day}</span>
                    {slot.posts && (
                      <div className="space-y-0.5 mt-0.5">
                        {slot.posts.map((p, pIdx) => (
                          <div
                            key={pIdx}
                            className="px-1 py-0.5 text-[8.5px] font-bold rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 truncate"
                          >
                            {p}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 mt-3">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">156 posts scheduled this month</span>
            <button
              onClick={() => alert("Schedule new social media post")}
              className="h-7 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shadow-2xs"
            >
              <Plus className="w-3 h-3" />
              <span>Create Post</span>
            </button>
          </div>
        </div>

        {/* =======================================================
            MODULE 4: GOOGLE BUSINESS PROFILE (GBP) AUDIT
            ======================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs flex flex-col justify-between transition-colors">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-[11px]">
                  4
                </span>
                <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 dark:text-white">
                  Google Business Profile (GBP) Audit
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">ABC Clinic • Surat</span>
            </div>

            {/* Score & Issues Overview */}
            <div className="grid grid-cols-12 gap-3 mb-3 items-center">
              {/* Profile Strength Gauge */}
              <div className="col-span-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-center flex flex-col items-center justify-center">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeDasharray="88 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[17px] font-extrabold text-slate-900 dark:text-white leading-none">91</span>
                    <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">/ 100</span>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">Excellent</div>
                <div className="text-[9.5px] text-slate-400 dark:text-slate-500">Profile Strength</div>
              </div>

              {/* Issues Count Breakdown */}
              <div className="col-span-7 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between">
                  <span>Issues Found</span>
                  <span className="text-rose-600 dark:text-rose-400 font-black">7 Total</span>
                </div>
                <div className="text-[10px] space-y-1">
                  <div className="flex items-center justify-between text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded">
                    <span>Critical Issues</span>
                    <span className="font-bold">2</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                    <span>Warnings</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                    <span>Suggestions</span>
                    <span className="font-bold">2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Issues List with Action Buttons */}
            <div className="space-y-1.5">
              {gbpIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between p-2 rounded-xl border border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-[11.5px] flex items-center gap-1.5">
                      <span>{issue.title}</span>
                      <span
                        className={`text-[9px] font-extrabold px-1.5 rounded ${
                          issue.severity === "critical"
                            ? "bg-rose-100 text-rose-700"
                            : issue.severity === "warning"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {issue.severity}
                      </span>
                      {issue.fixed && (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 rounded">
                          Fixed ✓
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">{issue.description}</div>
                  </div>
                  <button
                    onClick={() => onFixGbpIssue(issue.id)}
                    disabled={issue.fixed}
                    className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded border transition cursor-pointer ${
                      issue.fixed
                        ? "text-slate-400 bg-slate-100 border-slate-200 cursor-default"
                        : "text-emerald-600 hover:text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {issue.fixed ? "Completed" : "Fix Now"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action link */}
          <div className="pt-3 border-t border-slate-100 mt-3 text-right">
            <button
              onClick={() => alert("Full GBP Audit Report Opened")}
              className="text-xs font-bold text-slate-900 hover:text-emerald-600 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Full GBP Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* =======================================================
            MODULE 5: CRM SALES PIPELINE (KANBAN)
            ======================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800/80 ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] shadow-xs flex flex-col justify-between transition-colors">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[11px]">
                  5
                </span>
                <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 dark:text-white">
                  CRM & Sales Pipeline
                </span>
              </div>
              <button
                onClick={() => alert("Add New Lead")}
                className="h-6 px-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>New Lead</span>
              </button>
            </div>

            {/* Kanban Columns (4 Columns matching prototype) */}
            <div className="grid grid-cols-4 gap-2 text-left">
              {/* Column 1: New Lead */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 p-2 border border-slate-200/70 dark:border-slate-800">
                <div className="flex items-center justify-between text-[10.5px] font-extrabold text-slate-700 dark:text-slate-300 mb-2">
                  <span>New Lead</span>
                  <span className="px-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {leads.filter((l) => l.stage === "new").length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {leads.filter((l) => l.stage === "new").map((lead) => (
                    <div key={lead.id} className="p-1.5 rounded-lg bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200 truncate">{lead.title}</div>
                      <div className="text-[9.5px] text-slate-400 dark:text-slate-500">{lead.location} • Inbound</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Contacted */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 p-2 border border-slate-200/70 dark:border-slate-800">
                <div className="flex items-center justify-between text-[10.5px] font-extrabold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Contacted</span>
                  <span className="px-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {leads.filter((l) => l.stage === "contacted").length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {leads.filter((l) => l.stage === "contacted").map((lead) => (
                    <div key={lead.id} className="p-1.5 rounded-lg bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200 truncate">{lead.title}</div>
                      <div className="text-[9.5px] text-slate-400 dark:text-slate-500">{lead.location} • Meeting</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Proposal Sent */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 p-2 border border-slate-200/70 dark:border-slate-800">
                <div className="flex items-center justify-between text-[10.5px] font-extrabold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Proposal</span>
                  <span className="px-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {leads.filter((l) => l.stage === "proposal").length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {leads.filter((l) => l.stage === "proposal").map((lead) => (
                    <div key={lead.id} className="p-1.5 rounded-lg bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200 truncate">{lead.title}</div>
                      <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-bold">{lead.value || "₹1.2L"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 4: Won */}
              <div className="rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 p-2 border border-emerald-200/70 dark:border-emerald-800/60">
                <div className="flex items-center justify-between text-[10.5px] font-extrabold text-emerald-800 dark:text-emerald-300 mb-2">
                  <span>Won ($)</span>
                  <span className="px-1 rounded bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                    {leads.filter((l) => l.stage === "won").length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {leads.filter((l) => l.stage === "won").map((lead) => (
                    <div key={lead.id} className="p-1.5 rounded-lg bg-white dark:bg-[#0B1120] border border-emerald-200 dark:border-emerald-800 shadow-2xs">
                      <div className="font-bold text-[11px] text-slate-900 dark:text-slate-100 truncate">{lead.title}</div>
                      <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-extrabold">{lead.value || "Active"}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-3 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Pipeline Value: ₹14,80,000</span>
            <button
              onClick={() => alert("Open Full CRM Board")}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Manage CRM Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
