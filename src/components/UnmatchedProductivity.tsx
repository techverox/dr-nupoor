"use client";

import React, { useState } from "react";
import {
  Search,
  Command,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Plus,
  Layers,
  Sparkles,
  Users,
  Check,
  Activity,
  ArrowUpRight,
} from "lucide-react";

export default function UnmatchedProductivity() {
  const [activeTab, setActiveTab] = useState<"all" | "workflow" | "automation">("all");

  return (
    <section id="services" className="py-28 sm:py-36 bg-transparent text-white border-t border-white/[0.08] relative transition-colors duration-500">
      <span id="productivity" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Crisp Editorial Display Typography */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-neutral-300 text-xs font-semibold shadow-xs">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Built for Modern Agency Velocity</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[0.98]">
            Unmatched productivity.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed pt-1">
            Digivigee gives your agency one unified system for client CRM, active deliverables, real-time communication, and automated reporting.
          </p>

          {/* Quiet Sub-Pills */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "all" ? "bg-white text-neutral-950 shadow-md" : "bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.08]"}`}
            >
              All-in-One Workspace
            </button>
            <button
              onClick={() => setActiveTab("workflow")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "workflow" ? "bg-white text-neutral-950 shadow-md" : "bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.08]"}`}
            >
              Unified Client Delivery
            </button>
            <button
              onClick={() => setActiveTab("automation")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === "automation" ? "bg-white text-neutral-950 shadow-md" : "bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.08]"}`}
            >
              Process Automation
            </button>
          </div>
        </div>

        {/* Bento Grid Layout (Deliberate contrast: Dark Terminal + Clean Porcelain Cards) */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
          
          {/* Card 1: Dark Terminal Command Palette (Top Left, 7 cols) */}
          <div className="md:col-span-6 bg-[#0b0e14]/80 backdrop-blur-xl text-white rounded-3xl p-7 sm:p-9 border border-white/[0.08] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between group">
            {/* Ambient amber flare on top-left shoulder */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Terminal Search Bar */}
              <div className="p-3.5 rounded-2xl bg-[#141824] border border-white/10 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                  <Search className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-200 font-medium">Type a command or search client deliverables...</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono font-bold text-neutral-300">
                  ⌘K
                </div>
              </div>

              {/* Action Rows */}
              <div className="space-y-2 text-xs">
                <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 px-2">
                  SUGGESTED ACTIONS
                </div>

                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/5 flex items-center justify-between hover:bg-white/[0.08] transition">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                      +
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-100">Create Client Campaign Sprint</div>
                      <div className="text-[10px] text-neutral-400">Assign deliverables across paid, SEO & creative teams</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono text-neutral-300">⌥C</span>
                </div>

                <div className="p-3 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between hover:bg-white/[0.05] transition">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-200">Run Real-time SEO Keyword Audit</div>
                      <div className="text-[10px] text-neutral-400">Pull organic rankings & search volume updates</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono text-neutral-400">⌥S</span>
                </div>

                <div className="p-3 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between hover:bg-white/[0.05] transition">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                      R
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-200">Generate Client Monthly Telemetry</div>
                      <div className="text-[10px] text-neutral-400">Export white-label PDF with attribution breakdown</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono text-neutral-400">⌥R</span>
                </div>
              </div>
            </div>

            {/* Editorial Caption */}
            <div className="mt-8 pt-5 border-t border-white/10 text-xs sm:text-sm">
              <strong className="text-white font-bold">Keyboard shortcuts.</strong>{" "}
              <span className="text-neutral-400">
                Work at the speed of thought with instant access to common agency workflows and client records.
              </span>
            </div>
          </div>

          {/* Card 4: Dark Telemetry Aperture Card (Bottom Right, 7 cols) */}
          <div className="md:col-span-6 bg-[#0b0e14]/80 backdrop-blur-xl text-white rounded-3xl p-7 sm:p-9 border border-white/[0.08] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between group">
            {/* Ambient blue flare on right shoulder */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[70px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold tracking-wide uppercase text-neutral-300">Live Client Telemetry</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">REAL-TIME SYNC</span>
              </div>

              {/* Central Telemetry Ring & Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Concentric Aperture Graphic */}
                <div className="sm:col-span-5 flex items-center justify-center">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-spin-slow" />
                    <div className="absolute inset-2.5 rounded-full border border-emerald-500/25" />
                    <div className="absolute inset-6 rounded-full border border-blue-500/30" />
                    <div className="w-14 h-14 rounded-full bg-[#141824] border border-cyan-400/40 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                      <Activity className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Telemetry Metrics */}
                <div className="sm:col-span-7 space-y-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">On-Time SLA Delivery</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">99.8%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Active Sync Channels</span>
                    <span className="text-xs font-mono font-bold text-cyan-400">124 Endpoints</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Unresolved Blockers</span>
                    <span className="text-xs font-mono font-bold text-neutral-200">0 Items</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Caption */}
            <div className="mt-8 pt-5 border-t border-white/10 text-xs sm:text-sm">
              <strong className="text-white font-bold">Automated Telemetry.</strong>{" "}
              <span className="text-neutral-400">
                Never spend hours manually compiling client reports again. Live data flows straight to client dashboards.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
