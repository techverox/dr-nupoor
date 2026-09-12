"use client";

import React from "react";
import {
  Users,
  Search,
  Globe,
  Share2,
  Megaphone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Eye,
  Check,
  Clock,
  Layers,
} from "lucide-react";

export default function FeatureShowcase() {
  const stories = [
    {
      id: "client-crm",
      number: "01",
      tag: "CLIENT CRM",
      headline: "Manage Every Client From One Place",
      desc: "Stop scattering client deliverables across disconnected spreadsheets and Slack channels. Digivigee gives your agency dedicated client workspaces with isolated permissions, active retainers, custom SLAs, and instant billing records.",
      bullets: [
        "Visual deal pipeline with weighted forecasting",
        "Individual client portals with custom subdomains",
        "Auto-synced communication histories and contracts",
        "Integrated retainer billing and milestone tracking",
      ],
      isReverse: false,
      mockup: (
        <div className="bg-[#0b0e14] text-white rounded-3xl p-6 sm:p-8 border border-white/[0.08] backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.6)] space-y-5 text-left font-sans">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">Client Retainer Hub</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/20">
              $148,500 MRR
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#131722] border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-100 font-bold">Lumina Health</span>
                <span className="text-neutral-400 font-mono">$18,000/mo</span>
              </div>
              <div className="text-xs text-neutral-400">SEO + Multi-Channel Paid Ads</div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-400 h-1.5 rounded-full w-[95%]" />
              </div>
              <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-1">
                <span>95% SLA Fulfilled</span>
                <span className="text-emerald-400 font-semibold">Healthy</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#131722] border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-100 font-bold">Apex FinTech</span>
                <span className="text-neutral-400 font-mono">$14,500/mo</span>
              </div>
              <div className="text-xs text-neutral-400">Content Engine & Conversion Dev</div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-2">
                <div className="bg-cyan-400 h-1.5 rounded-full w-full" />
              </div>
              <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-1">
                <span>100% SLA Fulfilled</span>
                <span className="text-cyan-400 font-semibold">Active Review</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs text-neutral-300">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Average Client Retention: 14.8 Months (Top 5% Agency Benchmark)
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "ad-campaigns",
      number: "02",
      tag: "AD CAMPAIGNS",
      headline: "Campaigns Without the Chaos",
      desc: "Manage high-budget advertising across Google Ads, Meta Ads, and TikTok Ads without tab fatigue. Track blended CAC, ROAS, creative performance fatigue, and live budget utilization in real time.",
      bullets: [
        "Live budget pacing tracker with overspend warning thresholds",
        "Creative asset fatigue telemetry with automated replacement alerts",
        "Blended ROAS attribution combining first-party pixels and GA4",
        "Instant campaign cloning and bulk ad set management",
      ],
      isReverse: true,
      mockup: (
        <div className="bg-[#0b0e14] text-white rounded-3xl p-6 sm:p-8 border border-white/[0.08] backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.6)] space-y-5 text-left font-sans">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-neutral-200 font-bold">
              <Megaphone className="w-4 h-4 text-emerald-400" />
              <span>Paid Media Hub • $240,000 Active Ad Spend</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">4.82x Blended ROAS</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#131722] border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-neutral-100">Google Ads • High-Intent Search</div>
                <div className="text-[10px] text-neutral-400">Spend: $18,400 • Revenue: $92,000</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                5.00x ROAS
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#131722] border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-neutral-100">Meta Ads • Dynamic Retargeting</div>
                <div className="text-[10px] text-neutral-400">Spend: $12,200 • Revenue: $56,120</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                4.60x ROAS
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs text-neutral-300">
            <span>Budget Pacing: 98.4% on target across 14 client accounts</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      ),
    },
    {
      id: "client-portal",
      number: "03",
      tag: "CLIENT PORTAL",
      headline: "Clients Approve. Teams Deliver.",
      desc: "Give your clients a polished, white-label client portal hosted on your custom domain. Clients see real-time task progress, approve ad copy and designs, inspect live metrics, and view monthly invoices with zero friction.",
      bullets: [
        "Branded client login portal on your custom agency domain",
        "Role-based visibility: hide internal chatter and draft budgets",
        "1-Click client review modal with timestamped approvals",
        "Automated monthly performance summaries with executive notes",
      ],
      isReverse: true,
      mockup: (
        <div className="bg-[#0b0e14] text-white rounded-3xl p-6 sm:p-8 border border-white/[0.08] backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.6)] space-y-5 text-left font-sans">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-neutral-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>portal.youragency.com • Lumina Health View</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
              White-Label Active
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#131722] border border-white/5 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-neutral-300 font-bold">Q3 Milestone Deliverables</span>
              <span className="text-emerald-400 font-bold">14 Completed / 2 In Review</span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-neutral-200">Landing Page Redesign & Conversion Copy</span>
                <span className="text-emerald-400 font-mono text-[10px] font-bold">APPROVED BY CMO</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-neutral-200">Google Ads Performance Max Campaign</span>
                <span className="text-cyan-400 font-mono text-[10px] font-bold">LIVE TELEMETRY</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs text-neutral-300">
            <span>Client Satisfaction Score: 9.8 / 10</span>
            <span className="text-emerald-400 font-semibold">Zero Churn in 12 Months</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-28 sm:py-36 bg-transparent text-white border-t border-white/[0.08] relative">
      <span id="portfolio" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-24 sm:mb-32">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-neutral-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>The Three Core Pillars of Agency Velocity</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.02]">
            Everything your agency needs to scale.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Replace the patchwork of 7 disconnected SaaS subscriptions with a single high-velocity platform built specifically for digital agencies.
          </p>
        </div>

        {/* Alternating Narrative Stories (01 to 06 with Generous Spacing) */}
        <div className="space-y-32 sm:space-y-40">
          {stories.map((story) => (
            <div
              key={story.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center ${
                story.isReverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text Column (5 cols) */}
              <div className={`lg:col-span-5 space-y-6 ${story.isReverse ? "lg:order-2" : "lg:order-1"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-extrabold text-neutral-500">
                    {story.number}
                  </span>
                  <span className="w-8 h-px bg-white/20" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    {story.tag}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
                  {story.headline}
                </h3>

                <p className="text-base text-neutral-400 leading-relaxed">
                  {story.desc}
                </p>

                {/* Key Capability Bullets */}
                <div className="space-y-2.5 pt-2">
                  {story.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mockup Column (7 cols) */}
              <div className={`lg:col-span-7 ${story.isReverse ? "lg:order-1" : "lg:order-2"}`}>
                <div className="relative group">
                  {story.mockup}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
