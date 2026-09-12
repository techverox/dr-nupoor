"use client";

import React from "react";
import InteractiveCard from "@/components/InteractiveCard";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Eye,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Lock,
  Globe,
  Sliders,
  DollarSign
} from "lucide-react";

export default function PerformanceSubWorkflows() {
  return (
    <section className="py-20 lg:py-28 bg-slate-100/60 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 mb-4">
            <span>SPECIALIZED TEAM WORKFLOWS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Tailored for both media buyers and{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              client success directors
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Keep your technical media buyers in flow while giving client managers the high-level transparency needed to protect 6-figure retainers.
          </p>
        </div>

        {/* Dual Split Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Paid Media & Media Buying Teams */}
          <InteractiveCard glowEffect={true} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                FOR MEDIA BUYERS & GROWTH LEADS
              </span>

              <h3 className="text-2xl font-black text-slate-900 mt-4 mb-3">
                Autonomous Ad Pacing & Multi-Channel Command
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Never stress about weekend overspends or rogue ad sets. Set automated budget guardrails across Meta, Google, and TikTok that adjust bids based on live Shopify conversion value.
              </p>

              {/* Feature Points */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>AI Spend Guardrails:</strong> Auto-pauses non-converting ads when CPA exceeds target by 25%.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Blended ROAS Telemetry:</strong> Unifies server-side CAPI and Google Ads into single attribution.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bulk Creative Deployment:</strong> Push approved video cuts directly into campaign launch queues.</span>
                </div>
              </div>

              {/* Embedded Visual Widget */}
              <div className="bg-slate-900 text-white rounded-xl p-4 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
                  <span>Rule: Auto-Pacing Guard #08</span>
                  <span className="text-emerald-400">STATUS: ACTIVE</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Meta Advantage+ Retargeting:</span>
                  <span className="text-emerald-400 font-bold">$12,450 / $12,500 (99.6%)</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  ⚡ Action: Throttled bid to avoid overspend. 0 manual edits needed.
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <a href="#trial" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800">
                <span>See Media Buyer Features</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </InteractiveCard>

          {/* Card 2: Client Success & Retention Directors */}
          <InteractiveCard glowEffect={true} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold tracking-wider uppercase text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
                FOR CLIENT DIRECTORS & AGENCY FOUNDERS
              </span>

              <h3 className="text-2xl font-black text-slate-900 mt-4 mb-3">
                100% White-Label Portals & Churn Defense
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Impress clients from day one with your agency&apos;s custom domain. Give executives instant access to live ROAS charts, creative approvals, and weekly briefings without emailing your media team.
              </p>

              {/* Feature Points */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span><strong>Custom Branded Domain:</strong> Host client portals at <code>portal.youragency.com</code> with custom logos.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span><strong>Granular Client Permissions:</strong> Hide internal media buyer margins and team discussions with 1 click.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span><strong>Automated Monday Morning Reports:</strong> AI formats executive summaries and emails PDF reports on schedule.</span>
                </div>
              </div>

              {/* Embedded Visual Widget */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px] pb-2 border-b border-slate-200">
                  <span className="font-semibold text-slate-800">portal.growthlab.com</span>
                  <span className="text-cyan-700 font-bold bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200">100% White-Label</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Client: Horizon Apparel</span>
                  <span className="text-emerald-600 font-bold">ROAS 5.12x (Target 4.0x)</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  CMO Last Active: 8 mins ago • 3 creative assets signed off
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <a href="#trial" className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 hover:text-cyan-800">
                <span>Explore Client Portal OS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
}
