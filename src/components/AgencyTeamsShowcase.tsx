"use client";

import React, { useState } from "react";
import Link from "next/link";
import InteractiveCard from "./InteractiveCard";
import {
  Check,
  ArrowRight,
  Users,
  TrendingUp,
  Sparkles,
  Layers,
  CreditCard,
  Search,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/motion";

export default function AgencyTeamsShowcase() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const departments = [
    {
      id: "media-buyers",
      name: "Media Buyers",
      fullTitle: "Performance Media Buyers",
      icon: TrendingUp,
      badge: "4.8x ROAS Target",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      description: "Centralize ad spend pacing, live conversion sync, and cross-channel ROAS without logging into 20 different ad accounts.",
      capabilities: [
        "Automated ad spend pacing to prevent budget overspends",
        "Meta & Google live conversion telemetry with automated sync",
        "Proactive creative fatigue alerts before client ROAS dips",
      ],
      windowTitle: "Campaign Manager • Apex Brands • Active Pacing",
      statusPill: "● Pacing On Track",
      stat1: { label: "Total Client Ad Spend", value: "$48,500", sub: "85% of Monthly Target" },
      stat2: { label: "Blended Return (ROAS)", value: "4.82x", sub: "+0.4x vs last month" },
      rowsHeader: "Live Channel Breakdown",
      rows: [
        { icon: "📱", title: "Meta Ads (Instagram & FB)", subtitle: "$26,000 spent • 4.9x ROAS", highlight: "$127,400", badge: "On Budget" },
        { icon: "🔍", title: "Google Ads (Search & PMax)", subtitle: "$16,500 spent • 5.1x ROAS", highlight: "$84,150", badge: "On Budget" },
        { icon: "🎵", title: "TikTok Ads (Vertical Video)", subtitle: "$6,000 spent • 3.9x ROAS", highlight: "$23,400", badge: "On Budget" },
      ],
      bottomReassurance: "Zero budget overspend across 45 client accounts",
    },
    {
      id: "creatives",
      name: "Creatives & Copy",
      fullTitle: "Creative Production & Copywriters",
      icon: Sparkles,
      badge: "8h Approval Time",
      badgeColor: "bg-pink-50 text-pink-800 border-pink-200",
      description: "Eliminate messy email chains and lost files. Organize video and static creative briefs with 1-click timestamped client proofing.",
      capabilities: [
        "1-click client review links with zero login required for clients",
        "Timestamped frame-by-frame video proofing and annotation pins",
        "Visual content calendar with automated scheduled publishing",
      ],
      windowTitle: "Creative Proofing • Summer Video Sprint • 3 Assets",
      statusPill: "● 1-Click Client Review",
      stat1: { label: "Client Sign-Off Time", value: "8 Hours", sub: "Down from 4 days (-78%)" },
      stat2: { label: "Approved Creatives", value: "128 Assets", sub: "100% on-time delivery" },
      rowsHeader: "Asset Approval Queue",
      rows: [
        { icon: "🎬", title: "Reel_04_HookB.mp4", subtitle: "0:15s Vertical Reel • Client pinned 0:02", highlight: "Approved", badge: "Ready to Post" },
        { icon: "🖼️", title: "Carousel_V2_Draft.png", subtitle: "5 Slides • Copy verified by client", highlight: "Approved", badge: "Ready to Post" },
        { icon: "📹", title: "UGC_Testimonial_Final.mp4", subtitle: "0:30s Video • Client review link active", highlight: "In Review", badge: "Pending Client" },
      ],
      bottomReassurance: "Client approved in 8 hours without a single back-and-forth email",
    },
    {
      id: "account-ops",
      name: "Account Managers",
      fullTitle: "Account Directors & Client Ops",
      icon: Layers,
      badge: "65h Saved / Mo",
      badgeColor: "bg-sky-50 text-sky-800 border-sky-200",
      description: "Give every client a branded white-label portal under your custom domain. Replace manual Friday slide decks with real-time live performance views.",
      capabilities: [
        "100% white-label client portal under your agency domain",
        "Live KPI dashboards that eliminate manual PDF slide decks",
        "Proactive client health scores & SLA tracking to stop retainer churn",
      ],
      windowTitle: "Client Portal • clients.youragency.com",
      statusPill: "● White-Label Active",
      stat1: { label: "Client Retention Rate", value: "99.4%", sub: "NPS Score: 89 / 100" },
      stat2: { label: "Weekly Slide Decks", value: "0 Hours", sub: "Saved 65h/mo per manager" },
      rowsHeader: "Client Experience Modules",
      rows: [
        { icon: "📊", title: "Real-Time KPI Dashboard", subtitle: "Client logs in 24/7 to see live ROI", highlight: "120 Clients", badge: "Active 24/7" },
        { icon: "📄", title: "Automated Weekly Summary", subtitle: "Generated & emailed automatically on Monday", highlight: "Automated", badge: "Zero Manual Work" },
        { icon: "🎯", title: "Retainer Deliverables SLA", subtitle: "All 12 monthly milestones completed on time", highlight: "100% Met", badge: "Guaranteed" },
      ],
      bottomReassurance: "Clients get instant clarity. Account managers get their Fridays back.",
    },
    {
      id: "founders-cfos",
      name: "Founders & CFOs",
      fullTitle: "Agency Founders & Leadership",
      icon: CreditCard,
      badge: "Zero Overdue Invoices",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      description: "Automate recurring retainer debits, performance fee collections, and gross margin tracking through seamless Stripe integration.",
      capabilities: [
        "Automated monthly retainer debits via Stripe Connect",
        "Real-time agency gross margins and team capacity tracking",
        "Standardized client onboarding SOPs that make scaling predictable",
      ],
      windowTitle: "Retainer Billing • Stripe Connect Autopilot",
      statusPill: "● 100% Collected",
      stat1: { label: "Monthly Retainer Revenue", value: "$180,000", sub: "32 Active Client Retainers" },
      stat2: { label: "Average Retainer Value", value: "$12,000", sub: "+310% Retainer Expansion" },
      rowsHeader: "Billing & Margin Autopilot",
      rows: [
        { icon: "💳", title: "Recurring Retainer Autopay", subtitle: "Debited automatically on the 1st of month", highlight: "$180k/mo", badge: "0 Overdue" },
        { icon: "📈", title: "Performance Bonus Invoicing", subtitle: "Auto-calculated when client ROAS exceeds target", highlight: "+$24,500", badge: "Collected" },
        { icon: "🛡️", title: "Smart Card Retry (Zero Dunning)", subtitle: "Expired cards updated automatically via Stripe", highlight: "$0 Lost", badge: "Protected" },
      ],
      bottomReassurance: "100% on-time cash flow without awkward billing conversations",
    },
    {
      id: "seo-content",
      name: "SEO & Growth",
      fullTitle: "SEO Directors & Organic Strategists",
      icon: Search,
      badge: "Top 3 Rankings",
      badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
      description: "Standardize technical site audits, automated daily keyword SERP rank tracking, and content velocity logs into clear executive reporting.",
      capabilities: [
        "Daily keyword rank tracking across Google Search and Maps",
        "Automated site audits with simple prioritized fix lists",
        "Executive SEO reports that clearly show revenue and organic traffic",
      ],
      windowTitle: "SEO Rank Monitor • 4,250 Tracked Keywords",
      statusPill: "● Daily Sync Active",
      stat1: { label: "Keywords in Top 3", value: "142 Terms", sub: "+38 new positions this month" },
      stat2: { label: "Organic Client Traffic", value: "+184%", sub: "Verified Search Volume Lift" },
      rowsHeader: "Organic Visibility Channels",
      rows: [
        { icon: "🥇", title: "Commercial Intent Keywords", subtitle: "142 high-value buyer search queries", highlight: "Top 3", badge: "High ROI" },
        { icon: "🗺️", title: "Google Maps Local 3-Pack", subtitle: "Local foot traffic and phone calls", highlight: "94% Visible", badge: "Dominating Local" },
        { icon: "⚡", title: "Technical Site Health", subtitle: "Zero broken links or indexing issues", highlight: "98 / 100", badge: "Passing Audits" },
      ],
      bottomReassurance: "Clear proof of SEO ROI that any non-technical client understands",
    },
  ];

  const current = departments[activeTab];
  const Icon = current.icon;

  return (
    <section id="solutions" className="py-16 sm:py-20 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with FadeIn */}
        <FadeIn direction="up" distance={20} duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.08em] mb-3">
              <Users className="w-3 h-3 text-[#009669]" />
              <span>Cross-Functional Agency Cockpit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-[-0.03em] text-[#0C1628] leading-[1.15] mb-3">
              Every agency department has work that Digivigee handles
            </h2>
            <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-2xl mx-auto">
              Eliminate fragmented spreadsheets and 10+ disconnected apps. Unify workflows across media buyers, creatives, account directors, and finance in one cohesive operating system.
            </p>
          </div>
        </FadeIn>

        {/* Minimalist Department Segmented Pill Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {departments.map((dept, idx) => {
            const DeptIcon = dept.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={dept.id}
                onClick={() => setActiveTab(idx)}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? "text-white shadow-sm"
                    : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDeptPill"
                    className="absolute inset-0 bg-[#0C1628] rounded-xl -z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <DeptIcon className={`w-3.5 h-3.5 relative z-10 ${isActive ? "text-[#00E05C]" : "text-slate-500"}`} />
                <span className="relative z-10">{dept.name}</span>
                <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? "bg-white/15 text-emerald-300" : "bg-slate-100 text-slate-500"
                }`}>
                  {dept.badge.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Unified Light-First Interactive Cockpit Console */}
        <InteractiveCard maxTilt={1.5} glowEffect={false} className="w-full">
          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.04)] text-left overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  
                  {/* Left Column: Department Capabilities */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#008744] flex items-center justify-center border border-emerald-200/60 shadow-2xs">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${current.badgeColor}`}>
                    {current.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0C1628] tracking-tight mb-2">
                    {current.fullTitle}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Capabilities Checklist */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  {current.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#008744] shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium">{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <Link
                    href="#platform"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#008744] hover:text-[#00B84D] transition-colors group"
                  >
                    <span>Explore {current.name} Workflow Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Pristine Light-Mode Software Preview Window */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm overflow-hidden text-left">
                  
                  {/* Browser/Window Top Bar */}
                  <div className="px-4 py-3 bg-white border-b border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 font-medium ml-2">
                        {current.windowTitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {current.statusPill}
                    </span>
                  </div>

                  {/* Window Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    
                    {/* Key Metric Highlights (2 Crisp Clean White Cards) */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                        <div className="text-xs text-slate-500 font-medium">{current.stat1.label}</div>
                        <div className="text-2xl sm:text-3xl font-black text-[#0C1628] tracking-tight mt-0.5 font-mono">
                          {current.stat1.value}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          {current.stat1.sub}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                        <div className="text-xs text-slate-500 font-medium">{current.stat2.label}</div>
                        <div className="text-2xl sm:text-3xl font-black text-[#008744] tracking-tight mt-0.5 font-mono">
                          {current.stat2.value}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {current.stat2.sub}
                        </div>
                      </div>
                    </div>

                    {/* Live Activity / Channel Rows (Simple, Obvious & Beautiful) */}
                    <div className="space-y-2 bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                      <div className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
                        {current.rowsHeader}
                      </div>
                      {current.rows.map((row, rIdx) => (
                        <div key={rIdx} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-b-0 text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className="text-base leading-none">{row.icon}</span>
                            <div>
                              <div className="font-bold text-[#0C1628]">{row.title}</div>
                              <div className="text-[11px] text-slate-500">{row.subtitle}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-[#0C1628]">{row.highlight}</div>
                            <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {row.badge}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reassurance Footer */}
                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="text-slate-500 font-medium">Outcome:</span>
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        {current.bottomReassurance}
                      </span>
                    </div>

                  </div>

                </div>
              </div>

            </div>
            </motion.div>
          </AnimatePresence>
          </div>
        </InteractiveCard>

        {/* Bottom Text Link with FadeIn */}
        <FadeIn delay={0.2} className="text-center pt-8">
          <Link
            href="#platform"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#008744] hover:text-[#00B84D] transition-colors group"
          >
            <span>See All Interactive Workspace Features</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}
