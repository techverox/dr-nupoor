"use client";

import React, { useState } from "react";
import Link from "next/link";
import InteractiveCard from "@/components/InteractiveCard";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  BarChart3,
  Layers,
  Zap,
  Sliders,
  Eye,
  AlertTriangle,
  RefreshCw,
  Clock,
  Play
} from "lucide-react";

export default function PerformanceHero() {
  const [activeChannel, setActiveChannel] = useState<"all" | "meta" | "google" | "tiktok">("all");
  const [activeStage, setActiveStage] = useState<number>(3); // Default to "Execution & Ad Staging"
  const [emailInput, setEmailInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const stages = [
    { id: 0, label: "1. Client Intake", status: "Automated", color: "text-blue-500 bg-blue-50 border-blue-200" },
    { id: 1, label: "2. Media Resourcing", status: "Balanced", color: "text-purple-500 bg-purple-50 border-purple-200" },
    { id: 2, label: "3. Creative Lab", status: "18 Variations", color: "text-amber-500 bg-amber-50 border-amber-200" },
    { id: 3, label: "4. Execution & Pacing", status: "Active (4.38x ROAS)", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { id: 4, label: "5. Auto Reporting", status: "Live Portal", color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
    { id: 5, label: "6. Retainer Billing", status: "100% Retained", color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
  ];

  const handleStartTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="relative pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-20 lg:pb-28 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/8 to-emerald-400/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Run your performance agency.{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Rule your client ROAS.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-3xl">
            Digivigee gives digital marketing agencies an all-in-one command center to consolidate multi-channel ad spend, automate client ROAS reporting, predict creative fatigue with AI, and scale high-ticket retainers with zero burnout.
          </p>

          {/* Conversion Form & CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-5 max-w-xl">
            <form onSubmit={handleStartTrial} className="flex-1 relative flex items-center">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your work email..."
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 text-sm shadow-xs transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm tracking-tight transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
              >
                <span>{submitted ? "Access Sent!" : "Start Free Trial"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <Link
              href="#demo"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm transition-all shadow-xs shrink-0"
            >
              <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>Book Agency Audit</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              14-day free trial
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Multi-ad account sync in 3 mins
            </span>
          </div>
        </div>

        {/* Interactive Software Command Center Mockup (Billion-Dollar Quality) */}
        <div className="mt-14 relative">
          {/* Subtle Outer Frame Glowing Ring */}
          <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-b from-emerald-500/20 via-slate-200 to-transparent blur-md opacity-80 pointer-events-none" />

          <InteractiveCard
            glowEffect={true}
            className="relative bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-200/60 overflow-hidden"
          >
            {/* Top Chrome Window Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-slate-900 border-b border-slate-800 text-white">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-semibold text-slate-300 tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Digivigee Ad Ops Terminal • <span className="text-slate-400">Apex Growth Media [Enterprise Agency]</span>
                </span>
              </div>

              {/* Status Ticker */}
              <div className="flex items-center gap-4 text-xs">
                <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  <span className="text-slate-400">Total Tracked Spend:</span>
                  <span className="font-mono font-bold text-emerald-400">$1,428,500</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                  <span className="text-slate-400">Blended ROAS:</span>
                  <span className="font-mono font-bold text-cyan-400">4.38x</span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-1 rounded">↑ 18%</span>
                </div>
              </div>
            </div>

            {/* Interactive Stage Selector Tabs (Wrike Pattern) */}
            <div className="bg-slate-50/80 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1 pr-2 shrink-0">
                Workflow Stage:
              </span>
              {stages.map((stage) => {
                const isActive = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <span>{stage.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full border ${stage.color}`}>
                      {stage.status}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Cockpit Body */}
            <div className="p-6 sm:p-8 bg-[#FAFAFA]">
              {/* Top Filter & Channel Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveChannel("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeChannel === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All Channels (Blended)
                  </button>
                  <button
                    onClick={() => setActiveChannel("meta")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeChannel === "meta" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Meta Ads (FB/IG)
                  </button>
                  <button
                    onClick={() => setActiveChannel("google")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeChannel === "google" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Google Search & PMax
                  </button>
                  <button
                    onClick={() => setActiveChannel("tiktok")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeChannel === "tiktok" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    TikTok Ads
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Live Sync: <strong>32s ago</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Auto-Pacing: <strong>Guarded</strong></span>
                  </div>
                </div>
              </div>

              {/* 4 Metric Tiles (Dynamic Ad Telemetry) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                    <span>Monthly Managed Spend</span>
                    <span className="text-emerald-600 bg-emerald-50 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      On Pace (99.2%)
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {activeChannel === "all" && "$1,428,500"}
                    {activeChannel === "meta" && "$684,200"}
                    {activeChannel === "google" && "$442,100"}
                    {activeChannel === "tiktok" && "$210,200"}
                  </div>
                  <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                    <span>Target Cap: $1,440,000</span>
                    <span className="text-emerald-600 font-semibold">$11.5k buffer</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "99.2%" }} />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                    <span>Blended Client ROAS</span>
                    <span className="text-emerald-600 bg-emerald-50 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Target 3.80x
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-2">
                    <span>
                      {activeChannel === "all" && "4.38x"}
                      {activeChannel === "meta" && "4.12x"}
                      {activeChannel === "google" && "4.86x"}
                      {activeChannel === "tiktok" && "3.75x"}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">+0.58x</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                    <span>Attribution: 7-Day Click CAPI</span>
                    <span className="text-slate-600 font-mono text-[11px]">99.4% Match</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                    <span>Avg Blended CPA</span>
                    <span className="text-emerald-600 bg-emerald-50 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      ↓ 18.5%
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {activeChannel === "all" && "$34.20"}
                    {activeChannel === "meta" && "$36.10"}
                    {activeChannel === "google" && "$28.40"}
                    {activeChannel === "tiktok" && "$39.80"}
                  </div>
                  <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                    <span>Target Max: $42.00</span>
                    <span className="text-emerald-600 font-semibold font-mono">-$7.80 beat</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: "81%" }} />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                    <span>Retainer Health Index</span>
                    <span className="text-emerald-600 bg-emerald-50 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      0 Churn Risk
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    98.4<span className="text-sm font-normal text-slate-400">/100</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                    <span>42 Active Retainers</span>
                    <span className="text-emerald-600 font-semibold">+3 Renewed Today</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: "98.4%" }} />
                  </div>
                </div>
              </div>

              {/* Bottom Real-Time AI Intelligence Sentinel Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500 text-white shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                      <span>AI Creative Fatigue Watch</span>
                      <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-mono px-1 rounded">Live</span>
                    </div>
                    <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                      TikTok UGC #14 hook rate dropped to 19.4%. AI has drafted 3 winning hook variations for your video editor.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500 text-white shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-950 flex items-center gap-2">
                      <span>Ad Account Pacing Sentinel</span>
                      <span className="text-[10px] bg-blue-200/80 text-blue-900 font-mono px-1 rounded">Protected</span>
                    </div>
                    <p className="text-xs text-blue-800 mt-0.5 leading-relaxed">
                      Google PMax campaign pacing was 12% over budget at 2 PM. Automated rule paused non-converting asset groups.
                    </p>
                  </div>
                </div>

                <div className="bg-cyan-50/80 border border-cyan-200/80 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500 text-white shrink-0 mt-0.5">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-cyan-950 flex items-center gap-2">
                      <span>White-Label Client Portal</span>
                      <span className="text-[10px] bg-cyan-200/80 text-cyan-900 font-mono px-1 rounded">portal.apex.com</span>
                    </div>
                    <p className="text-xs text-cyan-800 mt-0.5 leading-relaxed">
                      Client CMO viewed Weekly ROAS breakdown 14 minutes ago and approved 6 new ad creatives with 1 click.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
}
