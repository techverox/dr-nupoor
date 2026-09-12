"use client";

import React, { useState } from "react";
import {
  Search,
  Kanban,
  Filter,
  Bell,
  Calendar,
  Layers,
  ChevronDown,
  Folder,
  CircleDot,
  CheckSquare,
  X,
} from "lucide-react";

export default function HeroDashboard() {
  const [activeTab, setActiveTab] = useState("kanban");

  return (
    <div className="relative w-full max-w-6xl mx-auto">


      {/* Main Glass Dashboard Container (Huly-Style Native Product Object) */}
      <div
        id="hero-dashboard-container"
        className="relative z-10 w-full rounded-2xl bg-[#080a0f]/95 backdrop-blur-2xl border border-white/[0.09] shadow-[0_50px_140px_-20px_rgba(0,0,0,0.98),0_0_1px_rgba(255,255,255,0.06)] overflow-hidden text-left"
      >


        {/* Dashboard Interior: Left Navigation Rail + Inner Sub-Nav + Center Board + Right Drawer */}
        <div className="grid grid-cols-12 min-h-[490px] text-xs">
          
          {/* Rail 1: Slim Left Utility Icon Strip with Glowing 56% TO DO Progress Widget */}
          <div className="col-span-1 hidden lg:flex flex-col items-center py-3.5 px-2 border-r border-white/[0.06] bg-[#06070a]/90 space-y-4">
            {/* Top Logo / App Mark Glyph */}
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-1.5 shadow-sm group cursor-pointer hover:bg-white/10 transition">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#22c55e] to-[#2563eb] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            </div>

            {/* Glowing Huly-Style Circular Radial Progress Meter Widget (56% TO DO) */}
            <div className="relative w-full rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-2 flex flex-col items-center justify-center text-center shadow-[0_4px_16px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Subtle ambient backlight inside widget */}
              <div className="absolute -top-3 inset-x-0 h-8 bg-[#22c55e]/20 blur-md rounded-full pointer-events-none" />

              {/* Circular Gauge Graphic */}
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                  {/* Track ring */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="2.8"
                  />
                  {/* Glowing progress arc */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="url(#progressGrad)"
                    strokeWidth="2.8"
                    strokeDasharray="88"
                    strokeDashoffset="38"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]"
                  />
                  <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-[10px] font-bold text-white tracking-tight">
                  56<span className="text-[8px] opacity-75">%</span>
                </span>
              </div>

              <div className="mt-1 text-[8px] font-bold tracking-wider uppercase text-neutral-400">
                TO DO
              </div>
            </div>

            {/* Action Icon Rail */}
            <div className="flex flex-col items-center gap-3 pt-2 text-neutral-500">
              <button className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition" title="Notifications">
                <Bell className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition" title="Calendar">
                <Calendar className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition" title="Spaces">
                <Layers className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Rail 2: Tracker Navigation Pane */}
          <div className="col-span-12 sm:col-span-3 lg:col-span-2 border-r border-white/[0.06] p-3.5 space-y-4 bg-[#07090d]/80 hidden md:block">
            {/* Tracker Header & Search */}
            <div className="space-y-2.5">
              <div className="text-[13px] font-semibold text-white tracking-tight flex items-center justify-between">
                <span>Tracker</span>
              </div>
              <div className="relative">
                <Search className="w-3 h-3 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  readOnly
                  className="w-full pl-7 pr-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] text-neutral-300 placeholder-neutral-500 focus:outline-none cursor-default"
                />
              </div>
            </div>

            {/* Core Issues Links */}
            <div className="space-y-0.5 text-[11px]">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.04] transition cursor-pointer">
                <CheckSquare className="w-3.5 h-3.5 text-neutral-500" />
                <span>My issues</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.04] transition cursor-pointer">
                <CircleDot className="w-3.5 h-3.5 text-neutral-500" />
                <span>All issues</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.04] transition cursor-pointer">
                <Folder className="w-3.5 h-3.5 text-neutral-500" />
                <span>All projects</span>
              </div>
            </div>

            {/* Projects Tree Section */}
            <div className="pt-2 border-t border-white/[0.06] space-y-1">
              <div className="text-[9px] uppercase font-bold text-neutral-500 px-2 tracking-wider">
                YOUR PROJECTS
              </div>
              
              {/* CRM Folder Hierarchy */}
              <div className="space-y-0.5 pt-1">
                <div className="flex items-center justify-between px-2 py-1 rounded-lg text-neutral-300 hover:bg-white/[0.04] cursor-pointer text-[11px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>CRM</span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-neutral-500" />
                </div>
                {/* Active Sub-item: Issues */}
                <div className="pl-5 pr-2 py-1 rounded-lg bg-white/[0.08] text-white text-[11px] font-medium flex items-center justify-between">
                  <span className="text-emerald-400 font-semibold">Issues</span>
                  <span className="text-[9px] bg-white/10 px-1.5 py-0.2 rounded-full text-neutral-300">37</span>
                </div>
              </div>

              {/* Other Project Folders */}
              <div className="flex items-center justify-between px-2 py-1 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04] cursor-pointer text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Client Growth</span>
                </div>
                <span className="text-[9px] text-neutral-600">8</span>
              </div>
            </div>
          </div>

          {/* Column 3: Center Agile Board & Task Execution Flow */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6 p-4 bg-[#080a0e]/60 flex flex-col justify-between">
            <div>
              {/* Breadcrumbs & Board Title */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                  <span>Your projects</span>
                  <span>/</span>
                  <span className="text-neutral-400">CRM</span>
                  <span>/</span>
                  <span className="text-emerald-400 font-medium">Issues</span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white tracking-tight">Issues</h3>
                  
                  {/* Top Right of Board: User Avatar Pile (+5) and Clean Filter Button */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center -space-x-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border border-[#080a0e] flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                        JD
                      </div>
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 border border-[#080a0e] flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                        AK
                      </div>
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 border border-[#080a0e] flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                        SL
                      </div>
                      <div className="w-5 h-5 rounded-full bg-neutral-800 border border-[#080a0e] flex items-center justify-center text-[8px] font-bold text-neutral-300">
                        +5
                      </div>
                    </div>

                    <button className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] transition">
                      <Filter className="w-3 h-3 text-neutral-400" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* View Switcher Tabs (Kanban, List, Timeline) */}
              <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06] mb-3.5">
                <button
                  onClick={() => setActiveTab("kanban")}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    activeTab === "kanban"
                      ? "bg-white/[0.08] text-white shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Kanban
                </button>
                <button
                  onClick={() => setActiveTab("list")}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    activeTab === "list"
                      ? "bg-white/[0.08] text-white"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setActiveTab("timeline")}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    activeTab === "timeline"
                      ? "bg-white/[0.08] text-white"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Timeline
                </button>
              </div>

              {/* Kanban Board Columns: Backlog, To Do, In Progress */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* BACKLOG Column */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-medium text-neutral-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>BACKLOG</span>
                    </span>
                    <span className="text-[10px] text-neutral-500">10</span>
                  </div>

                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition space-y-1.5 cursor-pointer group">
                    <div className="text-[11px] text-neutral-200 font-medium group-hover:text-white leading-snug">
                      Set up cluster monitoring
                    </div>
                    <div className="flex items-center gap-1 text-[9px]">
                      <span className="px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400">Low</span>
                      <span className="px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400">DevOps</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-neutral-500 pt-0.5">
                      <span>12%</span>
                      <span className="font-mono text-neutral-400">#ops</span>
                    </div>
                  </div>
                </div>

                {/* TO DO Column */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-medium text-neutral-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      <span>TO DO</span>
                    </span>
                    <span className="text-[10px] text-neutral-500">24</span>
                  </div>

                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition space-y-1.5 cursor-pointer group">
                    <div className="text-[11px] text-neutral-200 font-medium group-hover:text-white leading-snug">
                      Sales planning & client transactions
                    </div>
                    <div className="flex items-center gap-1 text-[9px]">
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400">Sales</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400">Marketing</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-neutral-500 pt-0.5">
                      <span>20%</span>
                      <span className="font-mono text-neutral-400">#crm</span>
                    </div>
                  </div>
                </div>

                {/* IN PROGRESS Column */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-medium text-neutral-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                      <span>IN PROGRESS</span>
                    </span>
                    <span className="text-[10px] text-emerald-400">3</span>
                  </div>

                  <div className="p-2 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/30 hover:border-emerald-400/50 transition space-y-1.5 cursor-pointer group shadow-[0_0_15px_rgba(34,197,94,0.05)]">
                    <div className="text-[11px] text-neutral-100 font-medium group-hover:text-white leading-snug">
                      Moderated respondent testing
                    </div>
                    <div className="flex items-center gap-1 text-[9px]">
                      <span className="px-1.5 py-0.2 rounded bg-yellow-500/10 text-yellow-400">Medium</span>
                      <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400">QA</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-emerald-400 pt-0.5 font-medium">
                      <span>50%</span>
                      <span className="font-mono text-emerald-300">#test</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Right Live Inbox & Unified Messaging Drawer */}
          <div className="col-span-12 md:col-span-3 border-l border-white/[0.06] p-3.5 space-y-3 bg-[#07090c]/90 hidden md:block">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">Inbox</span>
                <div className="flex items-center gap-1 ml-1 text-[10px] text-neutral-400">
                  <span className="text-white font-medium">All</span>
                  <span>&middot;</span>
                  <span className="hover:text-white cursor-pointer">Tasks (2)</span>
                  <span>&middot;</span>
                  <span className="hover:text-white cursor-pointer">Chat</span>
                </div>
              </div>
              <X className="w-3.5 h-3.5 text-neutral-500 hover:text-neutral-300 cursor-pointer" />
            </div>

            {/* Notification items matching Huly reference */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] space-y-1 hover:border-emerald-500/30 transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold">
                    ER
                  </div>
                  <span className="font-semibold text-neutral-200 text-[11px]">Elizabeth Reynolds</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-auto" />
                </div>
                <p className="text-[10px] text-neutral-400 leading-snug">
                  mentioned you in a page
                </p>
                <div className="text-[9px] text-neutral-500 pt-0.5">10 min ago &middot; Marketing and PM</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1 hover:bg-white/[0.04] transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[9px] font-bold">
                    SW
                  </div>
                  <span className="font-semibold text-neutral-200 text-[11px]">Sonya Wolf</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-auto" />
                </div>
                <p className="text-[10px] text-neutral-400 leading-snug">
                  joined to <span className="text-neutral-200">Next Platform</span> project
                </p>
                <div className="text-[9px] text-neutral-500 pt-0.5">16 min ago &middot; Next Platform</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1 hover:bg-white/[0.04] transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[9px] font-bold">
                    KO
                  </div>
                  <span className="font-semibold text-neutral-200 text-[11px]">Kenny Osinski</span>
                </div>
                <p className="text-[10px] text-neutral-400 leading-snug">
                  in <span className="text-neutral-200">#General</span>: &quot;Hi there! Let&apos;s discuss the new updates&quot;
                </p>
                <div className="text-[9px] text-neutral-500 pt-0.5">1 hour ago &middot; General</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
