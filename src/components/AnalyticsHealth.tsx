"use client";

import React from "react";
import {
  TrendingUp,
  Globe,
  Star,
  Users,
  Target,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Check,
  Sparkles,
} from "lucide-react";

export default function AnalyticsHealth() {
  const topMetrics = [
    {
      label: "TRACKED CLIENT REVENUE",
      value: "$2,480,000",
      change: "+38% YoY",
      subtext: "Direct multi-touch attribution tracked across ad networks",
    },
    {
      label: "QUALIFIED LEADS (MQL)",
      value: "14,850",
      change: "+24% this quarter",
      subtext: "Enriched form captures synced directly into client CRM",
    },
    {
      label: "BLENDED AD ROAS",
      value: "4.82x",
      change: "+1.2x vs benchmark",
      subtext: "Aggregated performance across Google, Meta & TikTok Ads",
    },
    {
      label: "SEO TOP 3 RANKINGS",
      value: "412 Keywords",
      change: "+84 new positions",
      subtext: "High-intent commercial keywords dominating search SERPs",
    },
  ];

  return (
    <section id="analytics" className="py-28 sm:py-36 bg-transparent text-white border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-neutral-300 text-xs font-semibold shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Editorial Performance Telemetry</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[0.98]">
            Marketing health.<br />
            <span className="text-neutral-400">Measurable client ROI.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed pt-1">
            Replace 20 scattered vanity metrics with definitive, high-impact business numbers that clients and agency leadership care about.
          </p>
        </div>

        {/* Large Numbers & Strong Spacing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 max-w-6xl mx-auto mb-20">
          {topMetrics.map((item, idx) => (
            <div key={idx} className="space-y-3 p-6 rounded-3xl bg-[#0b0e14]/80 backdrop-blur-xl border border-white/[0.08] text-left shadow-xl">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                {item.label}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {item.value}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{item.change}</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed pt-1 border-t border-white/10">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Client Progress Interface (Clients see work getting done) */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0b0e14]/80 backdrop-blur-xl text-white p-7 sm:p-10 border border-white/[0.08] shadow-[0_30px_90px_rgba(0,0,0,0.6)] text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-300">
                  Client Execution Ledger • Lumina Health
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                Clients see that work is actually getting done.
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                99.4% On-Time SLA
              </span>
            </div>
          </div>

          {/* Real Deliverables Timeline */}
          <div className="mt-6 space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-[#141824] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Next.js Headless Conversion Landing Page</div>
                  <div className="text-[11px] text-neutral-400">Published to Production • 0.6s LCP • Verified by Technical Lead</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-neutral-400 text-right">
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">APPROVED BY CLIENT CMO</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141824] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Q3 High-Intent Google Search Ad Scaling</div>
                  <div className="text-[11px] text-neutral-400">Budget: $28,000 • 5.2x Verified ROAS • 448 Target Inquiries</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-neutral-400 text-right">
                <span className="text-[10px] font-mono text-cyan-400 font-semibold">LIVE REPORTING ACTIVE</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141824] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                  <FileCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Automated White-Label Executive Monthly PDF</div>
                  <div className="text-[11px] text-neutral-400">Consolidated C-Level summary delivered automatically to client inbox</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-neutral-400 text-right">
                <span className="text-[10px] font-mono text-neutral-400 font-semibold">DISPATCHED 1ST OF MONTH</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
            <span>Zero client emails asking "What is your team working on this week?"</span>
            <span className="text-cyan-400 font-semibold cursor-pointer">Preview Client Portal View →</span>
          </div>
        </div>

      </div>
    </section>
  );
}
