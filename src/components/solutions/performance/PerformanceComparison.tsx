"use client";

import React from "react";
import InteractiveCard from "@/components/InteractiveCard";
import {
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  ShieldCheck,
  Clock,
  Layers,
  ArrowRight
} from "lucide-react";

export default function PerformanceComparison() {
  const oldWayItems = [
    {
      title: "14 Open Tabs per Media Buyer",
      desc: "Jumping constantly between Meta Ads Manager, Google Ads, GA4, Looker Studio, and messy Google Sheets.",
    },
    {
      title: "Monday Morning Reporting Hell",
      desc: "Spending 12–18 hours every week copying screenshots and pasting conversion data into PowerPoint decks.",
    },
    {
      title: "Silent Budget Overspends",
      desc: "Waking up to panicked Slack messages because an ad set blew past its monthly cap over the weekend.",
    },
    {
      title: "Creative Feedback Chaos",
      desc: "Copywriters, editors, and clients arguing across WhatsApp, email threads, and Figma comments.",
    },
    {
      title: "Sudden Retainer Churn",
      desc: "Clients cancel unexpectedly because they don't see daily proof of work or transparent blended ROAS.",
    },
  ];

  const digivigeeItems = [
    {
      title: "Single Unified Ad Operations Cockpit",
      desc: "Consolidate Meta, Google, TikTok, Amazon, and Shopify into one lightning-fast, real-time command center.",
    },
    {
      title: "100% Zero-Touch Automated Reporting",
      desc: "Give clients a 24/7 white-label live portal with instant AI executive briefings and automated weekly PDF delivery.",
    },
    {
      title: "Autonomous AI Budget Sentinel",
      desc: "Smart pacing rules automatically throttle bids or pause failing ad sets if CPA spikes or budget cap approaches.",
    },
    {
      title: "In-Portal Creative Proofing & Sign-offs",
      desc: "Frame-accurate video commenting and 1-click client approvals directly on your agency's branded domain.",
    },
    {
      title: "Predictive Retainer Retention Sentinel",
      desc: "AI monitors client engagement and performance health to flag churn signals 30 days before contract renewal.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-100/60 border-y border-slate-200/80 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 mb-4">
            <span>THE ARCHITECTURE SHIFT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Escape the agency chaos:{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Transform your ad ops
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Stop losing 20+ hours a week on manual reporting and fragmented ad accounts. Here is why the world’s most profitable performance agencies switched to Digivigee.
          </p>
        </div>

        {/* Side by Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: The Fragmented Agency */}
          <div className="relative bg-white rounded-2xl border border-red-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                    The Old Fragile Way
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    Fragmented Tools & Spreadsheet Hell
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-5">
                {oldWayItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <XCircle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="text-red-700 bg-red-50 px-2.5 py-1 rounded-md font-semibold">
                High Media Buyer Burnout
              </span>
              <span className="text-slate-400">Avg Agency Churn: 28–34%</span>
            </div>
          </div>

          {/* RIGHT: The Digivigee Way */}
          <div className="relative bg-white rounded-2xl border-2 border-emerald-500/80 shadow-xl shadow-emerald-500/5 p-6 sm:p-8 flex flex-col justify-between">
            {/* Top Accent Ribbon */}
            <div className="absolute -top-3 right-6 bg-emerald-500 text-white text-[11px] font-bold tracking-wider uppercase px-3 py-0.5 rounded-full shadow-xs">
              Recommended Agency OS
            </div>

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-emerald-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    The Digivigee Standard
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    Unified Ad Operations Command
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-5">
                {digivigeeItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                98.4% Retainer Retention
              </span>
              <span className="text-emerald-700 font-semibold">15+ hrs/wk saved per buyer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
