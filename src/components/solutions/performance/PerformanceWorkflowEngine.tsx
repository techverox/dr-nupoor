"use client";

import React, { useState } from "react";
import Link from "next/link";
import InteractiveCard from "@/components/InteractiveCard";
import {
  Sparkles,
  ClipboardList,
  Layers,
  BarChart3,
  Video,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Users,
  Play,
  TrendingUp,
  Clock,
  MessageSquare,
  Eye,
  Sliders,
  AlertCircle
} from "lucide-react";

export default function PerformanceWorkflowEngine() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    { id: 0, title: "1. Intake", subtitle: "Client & Ad Connectors", icon: ClipboardList },
    { id: 1, title: "2. Resourcing", subtitle: "Media Buyer Capacity", icon: Users },
    { id: 2, title: "3. Creative Lab", subtitle: "Hook Rates & Fatigue", icon: Video },
    { id: 3, title: "4. Execution", subtitle: "Frame Proofing & Launch", icon: Play },
    { id: 4, title: "5. Reporting", subtitle: "Blended ROAS Telemetry", icon: BarChart3 },
    { id: 5, title: "6. Retainers", subtitle: "Client Health & Margins", icon: DollarSign },
  ];

  const stageData = [
    {
      eyebrow: "STAGE 1: STANDARDIZED INTAKE",
      title: "Kick off client ad accounts in 180 seconds flat",
      desc: "Eliminate 30-message email onboarding loops. Dynamic intake forms securely collect client Business Manager access, Meta pixels, Google Ads IDs, and creative brand assets with zero manual friction.",
      pills: ["One-Click OAuth Connectors", "Pixel Health Verification", "Custom Intake Portals", "Asset Auto-Categorization"],
      mockup: (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Brand Onboarding Blueprint</h5>
                <p className="text-[11px] text-slate-500">Client: Lumina Skincare Inc. • DTC E-commerce</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Auto-Verified
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
              <span className="font-medium text-slate-700">Meta Business Portfolio Connected</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 3 Ad Accounts
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
              <span className="font-medium text-slate-700">Google Ads & GA4 Property Match</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified (100% CAPI)
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
              <span className="font-medium text-slate-700">Monthly Ad Spend Cap & Pacing Budget</span>
              <span className="font-mono font-bold text-slate-900">$75,000 / mo</span>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100 flex items-center justify-between text-xs">
            <span className="text-emerald-900 font-medium">Auto-generated media plan ready</span>
            <button className="px-3 py-1 bg-emerald-600 text-white font-bold rounded text-[11px] hover:bg-emerald-700 transition">
              Deploy Campaign Staging →
            </button>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "STAGE 2: MEDIA BUYER RESOURCING",
      title: "Balance buyer account loads and eradicate burnout",
      desc: "See exact capacity across your media buyers, copywriters, and video editors in real time. Know instantly who can take on the next $50k/mo retainer without dropping performance standards.",
      pills: ["Live Account Capacity Heatmap", "Billable Media Hours", "Burnout Alerts", "Role-Based Skill Routing"],
      mockup: (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h5 className="text-xs font-bold text-slate-900">Media Buyer Workload & Spend Distribution</h5>
            <span className="text-xs text-slate-500 font-mono">Team Capacity: 78%</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-900">Sarah Jenkins • Senior Media Buyer</span>
                <span className="text-emerald-600 font-bold">72% (Healthy)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-1">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "72%" }} />
              </div>
              <p className="text-[11px] text-slate-500">6 Accounts • $380,000/mo spend • Avg ROAS: 4.62x</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-900">Marcus Chen • Performance Creative Lead</span>
                <span className="text-cyan-600 font-bold">81% (Balanced)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-1">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: "81%" }} />
              </div>
              <p className="text-[11px] text-slate-500">14 UGC Scripts in Pipeline • 28 Video Cuts This Week</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "STAGE 3: CREATIVE LAB & FATIGUE DETECTION",
      title: "Predict creative winners and detect ad fatigue before ROAS dips",
      desc: "Stop flying blind on ad creative performance. Digivigee tracks 3-second hook rates, hold rates, and outbound click CTRs to alert media buyers 72 hours before an ad set burns out.",
      pills: ["3-Second Hook Analytics", "Creative Fatigue Scoring", "UGC Iteration Matrix", "AI Script Generation"],
      mockup: (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h5 className="text-xs font-bold text-slate-900">Creative Winner & Fatigue Leaderboard</h5>
            </div>
            <span className="text-xs text-slate-500">Active Test: 18 Ads</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-emerald-950">Hook 01: &quot;3 Mistakes&quot;</span>
                <span className="text-emerald-700 font-bold bg-emerald-100 text-[10px] px-1.5 rounded">Winner</span>
              </div>
              <div className="text-lg font-black text-slate-900">38.4% Hook Rate</div>
              <p className="text-[11px] text-emerald-800 mt-1">4.82x ROAS • Scale Budget +40%</p>
            </div>

            <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-950">Hook 04: &quot;Derm Approved&quot;</span>
                <span className="text-amber-700 font-bold bg-amber-100 text-[10px] px-1.5 rounded">Fatiguing</span>
              </div>
              <div className="text-lg font-black text-slate-900">14.1% Hook Rate</div>
              <p className="text-[11px] text-amber-800 mt-1">CPA rising • Swap winner hook</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "STAGE 4: EXECUTION & 1-CLICK CLIENT PROOFING",
      title: "Pinpoint video review and client sign-offs in seconds",
      desc: "Clients love transparency, but hate clunky tools. Digivigee allows clients to preview live ad mockups, leave timestamped feedback on video reels, and give 1-click approvals on your branded domain.",
      pills: ["Frame-Accurate Video Proofing", "Branded Client Domain", "1-Click Approvals", "Audit Trail Logging"],
      mockup: (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h5 className="text-xs font-bold text-slate-900">Video Asset Sign-Off • Frame 00:04.12</h5>
            <span className="text-xs text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded border border-emerald-200">
              Approved by Client CMO
            </span>
          </div>

          <div className="relative bg-slate-900 rounded-lg h-36 flex items-center justify-center text-white overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <div className="z-10 flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-lg">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">UGC_Variant_03_Final.mp4</span>
            </div>
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 z-10">
              <span>00:04 / 00:30</span>
              <span className="bg-emerald-500/80 text-white font-mono px-1.5 py-0.5 rounded text-[10px]">
                Pin #1: Client Comment
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[10px]">
              E
            </div>
            <span className="text-slate-600">
              <strong>Emily (Client):</strong> &quot;Love the hook pace! Approved for Meta scaling.&quot;
            </span>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "STAGE 5: REAL-TIME ROAS REPORTING",
      title: "Zero-touch automated client reporting that preserves retainers",
      desc: "Never build another manual Looker Studio slide. Digivigee syncs multi-channel ad spend, blended ROAS, MER, and new customer acquisition cost directly into a live client portal.",
      pills: ["Real-Time Blended ROAS", "CAPI Matching Engine", "Scheduled AI Executive Briefs", "Zero Manual Slides"],
      mockup: (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h5 className="text-xs font-bold text-slate-900">Client Executive ROAS Telemetry</h5>
            <span className="text-[11px] font-mono text-slate-500">Live 24/7 Portal</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Spend</span>
              <div className="text-base font-black text-slate-900 mt-0.5">$84,500</div>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] text-emerald-700 uppercase font-semibold">Blended ROAS</span>
              <div className="text-base font-black text-emerald-800 mt-0.5">4.82x</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Blended CPA</span>
              <div className="text-base font-black text-slate-900 mt-0.5">$31.20</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 text-white text-xs flex items-center justify-between">
            <span className="text-slate-300">Auto-sent Weekly Client Briefing</span>
            <span className="text-emerald-400 font-semibold text-[11px]">Delivered Today 9:00 AM ✓</span>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "STAGE 6: RETAINER HEALTH & FINANCE",
      title: "Track agency profit margins and stop client churn early",
      desc: "Know your true client profitability after media buyer hours, creative production, and software costs. AI monitors client portal activity and performance satisfaction to alert you 30 days before contract expiry.",
      pills: ["Retainer Health Index", "Gross Margin per Client", "Predictive Churn Guard", "Stripe Retainer Auto-Billing"],
      mockup: (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h5 className="text-xs font-bold text-slate-900">Agency Retainer Economics & Health</h5>
            <span className="text-xs text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded border border-emerald-200">
              Safe (99% Score)
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-slate-50">
              <span className="text-slate-600">Monthly Retainer Revenue</span>
              <span className="font-bold text-slate-900 font-mono">$12,500 / mo</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50">
              <span className="text-slate-600">Internal Cost of Delivery (Labor + Tech)</span>
              <span className="font-bold text-slate-900 font-mono">$3,480 / mo</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
              <span className="text-emerald-950 font-bold">Net Agency Retainer Margin</span>
              <span className="text-emerald-700 font-black text-sm">72.1% Profit</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const current = stageData[activeStage];

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 mb-4">
            <span>THE 6-STAGE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Everything your performance agency does,{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              orchestrated in one place
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            From client onboarding and creative testing to daily pacing rules and automated weekly briefings.
          </p>
        </div>

        {/* 6 Stage Tabs (Wrike Pattern) */}
        <div className="flex items-center justify-start lg:justify-center gap-2 pb-4 overflow-x-auto scrollbar-none mb-12 border-b border-slate-200">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left transition-all shrink-0 cursor-pointer border ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? "bg-emerald-500 text-slate-950" : "bg-white text-slate-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">{stage.title}</div>
                  <div className={`text-[10px] leading-tight ${isActive ? "text-slate-400" : "text-slate-500"}`}>
                    {stage.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Stage Content Showcase (Split Layout) */}
        <div className="bg-slate-50/70 rounded-3xl border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
                {current.eyebrow}
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {current.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {current.desc}
              </p>

              {/* 4 Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {current.pills.map((pill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="#trial"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:gap-3 transition-all"
                >
                  <span>Explore this workflow capability</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Mockup Stage */}
            <div className="lg:col-span-6">
              <InteractiveCard glowEffect={true} className="rounded-2xl">
                {current.mockup}
              </InteractiveCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
