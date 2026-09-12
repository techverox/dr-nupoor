"use client";

import React, { useState } from "react";
import Link from "next/link";
import InteractiveCard from "./InteractiveCard";
import {
  Zap,
  ClipboardList,
  Rocket,
  BarChart3,
  CreditCard,
  CheckCircle2,
  Search,
  Plus,
  ArrowRight,
  Sparkles,
  Layers,
  FileText,
  Sliders,
  Play,
  Pause,
  Clock,
  Calendar,
  Eye,
  Check,
  RefreshCw,
  FolderClosed,
  MessageSquare,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/motion";

export default function CorePlatformSuite() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activePill, setActivePill] = useState<number>(1); // Default to Whiteboard
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const stageTabs = [
    { id: "ideate", label: "Ideate", icon: Sparkles },
    { id: "plan", label: "Plan", icon: ClipboardList },
    { id: "deliver", label: "Deliver", icon: Rocket },
    { id: "report", label: "Report", icon: BarChart3 },
    { id: "evolve", label: "Evolve", icon: RefreshCw },
  ];

  const tabContents = [
    {
      eyebrow: "IDEATE & ALIGN",
      title: "A powerful ideation hub for marketing agencies",
      description: "Digivigee enables you to envision campaigns, easily capture the creative briefs you need to kick-start client deliverables, and bring media buyers and copywriters into one unified space.",
      pills: ["Digivigee AI", "Whiteboard", "Request forms", "Workflow automation"],
      projectTitle: "Campaign launch",
    },
    {
      eyebrow: "PLAN & ORCHESTRATE",
      title: "Unified campaign roadmaps and creative sprint pacing",
      description: "Map out deliverables across video editors, copywriters, and media buyers. Never miss a client launch date or blow an ad budget with automated Gantt timelines.",
      pills: ["Gantt Milestones", "Resource Allocation", "Creative Request Forms", "Approval Chains"],
      projectTitle: "Omnichannel Retainer Pipeline",
    },
    {
      eyebrow: "DELIVER & APPROVE",
      title: "100% white-label client portal & 1-click approvals",
      description: "Replace messy email chains and Slack DM chaos. Clients log into your custom branded domain to preview ad creatives, leave timestamped feedback, and click approve.",
      pills: ["Video Proofing", "Branded Portals", "Deliverable Staging", "Client Feedback"],
      projectTitle: "Apex Media • Client Sign-off Board",
    },
    {
      eyebrow: "REPORT & ATTRIBUTE",
      title: "Real-time blended ROAS telemetry without manual slides",
      description: "Stop wasting Fridays building PowerPoint decks. Digivigee pulls real-time conversion data from Meta, Google, TikTok, and Shopify into live executive dashboards.",
      pills: ["Blended ROAS", "CAPI Matching", "Automated PDFs", "Live Client Views"],
      projectTitle: "Real-Time Agency ROAS Command",
    },
    {
      eyebrow: "EVOLVE & SCALE",
      title: "Automated Stripe retainer billing & zero dunning churn",
      description: "Collect monthly retainers, performance bonuses, and percentage-of-ad-spend fees automatically via Stripe Connect. Zero late payments, zero awkward client conversations.",
      pills: ["Stripe Connect", "Auto-Dunning", "Retainer Schedules", "Profit Margins"],
      projectTitle: "Monthly Retainer Collection Run",
    },
  ];

  const current = tabContents[activeTab];

  return (
    <section id="platform" className="py-16 sm:py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================
            WRIKE-STYLE SECTION HEADER: Eyebrow Visual Anchor + Balanced Hierarchy
            ================================================================ */}
        <FadeIn direction="up" distance={20} duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.08em] mb-4">
              <Layers className="w-3 h-3 text-[#009669]" />
              <span>Interactive Workspace Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-[-0.03em] text-[#0C1628] leading-[1.15] mb-4">
              Your work needs more than a<br className="hidden sm:inline" /> task manager
            </h2>
            <p className="text-base sm:text-lg text-[#3E4D64] font-normal leading-relaxed max-w-2xl mx-auto">
              Digivigee gives humans and agents the context, control, and collaboration needed to see work through to completion.
            </p>
          </div>
        </FadeIn>

        {/* ================================================================
            WRIKE-STYLE HORIZONTAL ICON TABS WITH ACTIVE GREEN UNDERLINE
            Ideate | Plan | Deliver | Report | Evolve
            ================================================================ */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 border-b border-slate-200/80 mb-12 sm:mb-16 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 pb-0">
          {stageTabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 pb-4 text-sm sm:text-base font-bold transition-all relative whitespace-nowrap cursor-pointer group ${
                  isActive
                    ? "text-[#0C1628]"
                    : "text-[#475569] hover:text-[#0C1628]"
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-[#00E05C]" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span>{tab.label}</span>
                {/* Active Emerald Indicator Line with Magnetic Spring Glide */}
                {isActive && (
                  <motion.div
                    layoutId="corePlatformActiveTab"
                    className="absolute inset-x-0 -bottom-[1px] h-[3px] bg-[#00E05C] rounded-full shadow-[0_0_12px_rgba(0,224,92,0.6)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ================================================================
            TWO-COLUMN WORKSPACE CANVAS: LEFT EDITORIAL + RIGHT SOFTWARE
            With Wrike-style Wrapping Green Loop Arc Accent!
            ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Category Eyebrow, Title, Description, & Pill Buttons */}
          <div className="lg:col-span-5 text-left space-y-4 sm:space-y-5">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#008744] font-bold">
              {current.eyebrow}
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#0C1628] tracking-tight leading-snug">
              {current.title}
            </h3>

            <p className="text-sm sm:text-base text-[#3E4D64] leading-relaxed font-normal">
              {current.description}
            </p>

            {/* Interactive Pill Buttons (Exact Wrike style: Clean elegant pills with Whiteboard highlighted) */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {current.pills.map((pill, pIdx) => {
                const isPillActive = activePill === pIdx;
                return (
                  <button
                    key={pIdx}
                    onClick={() => setActivePill(pIdx)}
                    className={`btn-magnetic px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-spring cursor-pointer ${
                      isPillActive
                        ? "bg-emerald-50 text-emerald-950 border border-emerald-300 shadow-2xs font-bold"
                        : "bg-white hover:bg-slate-50 text-[#334155] border border-slate-200/90 hover:border-slate-300 shadow-2xs font-medium"
                    }`}
                  >
                    {pIdx === 0 && <Sparkles className="w-3.5 h-3.5 text-[#008744]" />}
                    {pIdx === 1 && <ClipboardList className="w-3.5 h-3.5 text-[#008744]" />}
                    {pIdx === 2 && <FileText className="w-3.5 h-3.5 text-slate-500" />}
                    {pIdx === 3 && <Zap className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{pill}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Software Mockup Canvas */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            
            {/* Software Mockup Window Wrapped in Subtle Interactive 3D Card */}
            <InteractiveCard maxTilt={1.5} glowEffect={false} className="w-full">
              <div className="w-full rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(22,33,54,0.07)] overflow-hidden relative z-10 text-left">
              
              {/* Window Header */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#162136]">
                  <div className="w-4 h-4 rounded bg-[#00E05C]/20 text-[#00E05C] flex items-center justify-center">
                    <span className="text-[10px]">📁</span>
                  </div>
                  <span>{current.projectTitle}</span>
                  <span className="text-slate-400 text-xs">▾</span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Collaboration icons */}
                  <button className="text-slate-400 hover:text-slate-700 transition-colors p-1" title="Comments">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-slate-700 transition-colors p-1" title="Collaborators">
                    <Users className="w-4 h-4" />
                  </button>

                  {/* Share Button */}
                  <button className="px-3.5 py-1.5 rounded-full bg-[#0081FB] hover:bg-[#0070DE] text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer">
                    <span>Share</span>
                    <span className="text-[10px]">▾</span>
                  </button>

                  {/* User Avatar with Online Dot */}
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                      MV
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00E05C] border-2 border-white" />
                  </div>
                </div>
              </div>

              {/* Canvas Content Area */}
              <div className="p-6 relative min-h-[400px] bg-[#FAFBFD] overflow-hidden flex flex-col justify-between">
                
                {/* Subtle Whiteboard Grid Dots */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="w-full flex-1"
                  >
                {/* =======================================================
                    STAGE 0: EXACT WRIKE WHITEBOARD CANVAS (6 PASTEL POST-IT SQUARES)
                    ======================================================= */}
                {activeTab === 0 && (
                  <div className="relative z-10 py-2">
                    
                    {/* Organic Connecting Lines matching Wrike */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden sm:block" viewBox="0 0 520 280">
                      <path
                        d="M 140 50 C 180 50, 175 50, 215 50"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M 315 50 C 350 50, 350 50, 385 50"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M 265 95 C 265 125, 290 135, 320 145"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M 130 190 C 170 190, 195 160, 240 145"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M 360 170 C 390 185, 400 200, 420 205"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    </svg>

                    {/* Top Row: 3 Post-It Squares */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative z-10 items-start">
                      
                      {/* Note 1: Soft Blue Square */}
                      <div className="rounded-2xl bg-[#BFDBFE] p-4 shadow-[0_6px_18px_rgba(59,130,246,0.12)] border border-blue-200/70 min-h-[90px] flex items-center justify-center text-center hover:-translate-y-2 hover:-rotate-2 hover:shadow-xl active:scale-95 transition-spring cursor-grab">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          Develop the campaign strategy and objectives
                        </p>
                      </div>

                      {/* Note 2: Soft Yellow Square */}
                      <div className="rounded-2xl bg-[#FEF08A] p-4 shadow-[0_6px_18px_rgba(234,179,8,0.14)] border border-yellow-200/80 min-h-[90px] flex items-center justify-center text-center hover:-translate-y-2 hover:rotate-1 hover:shadow-xl active:scale-95 transition-spring cursor-grab">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          Create marketing assets for different channels
                        </p>
                      </div>

                      {/* Note 3: Soft Cyan Square */}
                      <div className="rounded-2xl bg-[#A5F3FC] p-4 shadow-[0_6px_18px_rgba(6,182,212,0.14)] border border-cyan-200/80 min-h-[90px] flex items-center justify-center text-center hover:-translate-y-2 hover:-rotate-1 hover:shadow-xl active:scale-95 transition-spring cursor-grab">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          Analyzing data and optimizing the campaign
                        </p>
                      </div>

                    </div>

                    {/* Middle Note (Offset right, exactly like Wrike!) */}
                    <div className="flex justify-end pr-8 sm:pr-16 my-4 relative z-10">
                      <div className="w-full sm:w-56 rounded-2xl bg-[#FEF08A] p-4 shadow-[0_6px_18px_rgba(234,179,8,0.14)] border border-yellow-200/80 min-h-[85px] flex items-center justify-center text-center hover:-translate-y-2 hover:rotate-2 hover:shadow-xl active:scale-95 transition-spring cursor-grab">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          Research and define the target audience
                        </p>
                      </div>
                    </div>

                    {/* Bottom Row: 2 Post-It Squares (Left and Right, exactly like Wrike!) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10 items-start">
                      
                      {/* Note 5: Soft Peach/Orange Square (Bottom Left) */}
                      <div className="rounded-2xl bg-[#FED7AA] p-4 shadow-[0_6px_18px_rgba(249,115,22,0.12)] border border-orange-200/80 min-h-[90px] flex items-center justify-center text-center hover:-translate-y-2 hover:-rotate-2 hover:shadow-xl active:scale-95 transition-spring cursor-grab">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          Coordinate with stakeholders and align messaging
                        </p>
                      </div>

                      {/* Note 6: Soft Green Square (Bottom Right) */}
                      <div className="rounded-2xl bg-[#BBF7D0] p-4 shadow-[0_6px_18px_rgba(34,197,94,0.12)] border border-emerald-200/80 min-h-[90px] flex items-center justify-center text-center hover:-translate-y-2 hover:rotate-1 hover:shadow-xl active:scale-95 transition-spring cursor-grab">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          Report campaign results and collect feedback
                        </p>
                      </div>

                    </div>

                  </div>
                )}

                {/* =======================================================
                    STAGE 1: PLAN — VISUAL GANTT ROADMAP & SPRINT PACING
                    ======================================================= */}
                {activeTab === 1 && (
                  <div className="space-y-4 py-3 relative z-10">
                    {[
                      { title: "Competitor Creative Tear-Down & Hook Audit", channel: "Meta & TikTok", progress: 100, status: "Completed", color: "from-blue-500 to-cyan-400" },
                      { title: "Design 24 Static & UGC Ad Variations", channel: "Creative Team", progress: 80, status: "In Review", color: "from-amber-400 to-amber-500" },
                      { title: "Landing Page CRO Split-Testing (Shopify)", channel: "Dev Team", progress: 95, status: "Optimized", color: "from-emerald-400 to-[#00E05C]" },
                      { title: "Attribution Pixel Validation & CAPI Stream", channel: "Media Buying", progress: 60, status: "Verifying", color: "from-purple-500 to-indigo-500" },
                      { title: "Q4 Black Friday Omnichannel Live Push", channel: "All Channels", progress: 35, status: "Scheduled", color: "from-rose-500 to-orange-400" },
                    ].map((item, iIdx) => (
                      <div key={iIdx} className="space-y-1.5 p-2 rounded-xl hover:bg-white/80 transition-colors">
                        <div className="flex items-center justify-between text-xs font-bold text-[#162136]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00E05C]" />
                            <span>{item.title}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-mono text-slate-600">
                            {item.status}
                          </span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative">
                          <div
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-700 shadow-sm`}
                            style={{
                              marginLeft: `${(iIdx * 8) % 25}%`,
                              width: `${Math.max(30, item.progress)}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* =======================================================
                    STAGE 2: DELIVER — 100% WHITE-LABEL CLIENT APPROVAL BOARD
                    ======================================================= */}
                {activeTab === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-3 relative z-10">
                    {[
                      { name: "TikTok UGC Hook #3 — 'Stop Scrolling'", tag: "Video Proofing", reviewer: "Client CMO", badge: "Approved", badgeColor: "bg-emerald-100 text-emerald-800" },
                      { name: "Google PMax Headline Variations (15 Sets)", tag: "Copy Review", reviewer: "Brand Lead", badge: "Approved", badgeColor: "bg-emerald-100 text-emerald-800" },
                      { name: "Meta Advantage+ Dynamic Carousel Set", tag: "Figma Staging", reviewer: "Art Director", badge: "In Review", badgeColor: "bg-amber-100 text-amber-800" },
                      { name: "Monthly Milestone Deliverable Package", tag: "Client Portal", reviewer: "Executive", badge: "Signed Off", badgeColor: "bg-blue-100 text-blue-800" },
                    ].map((item, dIdx) => (
                      <div key={dIdx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase font-bold text-slate-400">{item.tag}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor}`}>{item.badge}</span>
                          </div>
                          <h4 className="text-xs font-bold text-[#0C1628]">{item.name}</h4>
                        </div>
                        <div className="pt-3 flex items-center justify-between text-[11px] text-[#475569] border-t border-slate-100 mt-2">
                          <span>Reviewer: <strong className="text-slate-800">{item.reviewer}</strong></span>
                          <span className="text-[#008744] font-bold">✓ 1-Click Approved</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* =======================================================
                    STAGE 3: REPORT — REAL-TIME AGENCY ROAS COMMAND
                    ======================================================= */}
                {activeTab === 3 && (
                  <div className="grid grid-cols-2 gap-3 py-3 relative z-10">
                    {[
                      { metric: "5.14x ROAS", label: "Meta Advantage+ Live", spend: "$14,200 Spend", trend: "+24.8% vs last week" },
                      { metric: "6.80x ROAS", label: "Google Brand Defense", spend: "$8,450 Spend", trend: "+31.2% conversion rate" },
                      { metric: "$184,500", label: "Shopify GMV Live Stream", spend: "1,420 Client Orders", trend: "Blended CAPI Synced" },
                      { metric: "100% Auto", label: "Executive Digest Stream", spend: "Zero Manual Slides", trend: "Sent every Friday 5PM" },
                    ].map((card, rIdx) => (
                      <div key={rIdx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                        <div className="text-[11px] font-semibold text-[#475569]">{card.label}</div>
                        <div className="text-2xl font-extrabold text-[#0C1628] tracking-tight py-1">{card.metric}</div>
                        <div className="text-[10px] font-bold text-[#008744] flex items-center gap-1">
                          <span>↑</span>
                          <span>{card.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* =======================================================
                    STAGE 4: EVOLVE — STRIPE RETAINER BILLING ENGINE
                    ======================================================= */}
                {activeTab === 4 && (
                  <div className="space-y-3 py-3 relative z-10">
                    {[
                      { client: "Gymshark Global Retainer + 3% Ad Spend", amount: "$18,500.00", status: "Auto-Collected", date: "1st of Month" },
                      { client: "Starlight SaaS Performance Growth Retainer", amount: "$6,000.00", status: "Auto-Collected", date: "1st of Month" },
                      { client: "Supreme NYC Enterprise Omnichannel OS", amount: "$25,000.00", status: "Auto-Collected", date: "1st of Month" },
                    ].map((inv, eIdx) => (
                      <div key={eIdx} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#008744] flex items-center justify-center font-bold text-xs">
                            $
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#0C1628]">{inv.client}</div>
                            <div className="text-[10px] text-[#475569]">Settlement: {inv.date} • Stripe Connect</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono font-bold text-[#0C1628]">{inv.amount}</div>
                          <span className="text-[10px] font-bold text-[#008744]">✓ {inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                  </motion.div>
                </AnimatePresence>

                {/* Bottom Right Wrike Pause Button [ || ] */}
                <div className="pt-2 flex justify-end relative z-20">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-800 text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm text-xs font-mono font-bold"
                    title={isPaused ? "Play" : "Pause"}
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                  </button>
                </div>

              </div>

            </div>
            </InteractiveCard>

          </div>

        </div>

        {/* ================================================================
            BOTTOM WRIKE-STYLE CTA BUTTONS (Aligned to 8px grid)
            ================================================================ */}
        <FadeIn delay={0.2} className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#contact"
            className="btn-magnetic inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#00E05C] hover:bg-[#14FF74] text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/30 hover:scale-102 transition-spring cursor-pointer"
          >
            <span>Try Digivigee for free</span>
          </Link>

          <Link
            href="#features"
            className="btn-magnetic inline-flex items-center gap-1.5 text-sm font-bold text-[#008744] hover:text-[#00E05C] transition-spring group cursor-pointer"
          >
            <span>See all features</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}
