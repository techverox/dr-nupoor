"use client";

import React, { useState } from "react";
import InteractiveCard from "@/components/InteractiveCard";
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart3,
  Video,
  Eye,
  Layers,
  Clock,
  DollarSign,
  Lock,
  MessageSquare,
  Globe,
  Sliders,
  ArrowRight
} from "lucide-react";

export default function PerformanceFeatureCloud() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const capabilities = [
    { title: "Automated Ad Pacing Sentinel", desc: "Auto-throttles bids to prevent overspending on Meta & Google.", icon: ShieldCheck },
    { title: "Live Blended ROAS Engine", desc: "Real-time consolidated marketing efficiency ratio (MER) tracking.", icon: TrendingUp },
    { title: "Frame-Accurate Video Proofing", desc: "Pin-comment directly on video frames for instant editor revisions.", icon: Video },
    { title: "100% White-Label Portals", desc: "Host on your own agency domain with custom logo & colors.", icon: Globe },
    { title: "AI Creative Fatigue Alert", desc: "Early warning signals when 3-second hook rates begin to decay.", icon: Sparkles },
    { title: "Dynamic Intake Connectors", desc: "Collect Business Manager & Ad Account access in 3 minutes.", icon: Zap },
    { title: "Media Buyer Workload Balancer", desc: "Ensure no media buyer is overwhelmed by active client spend.", icon: Sliders },
    { title: "Server-Side CAPI Matching", desc: "Bypass iOS tracking drop-offs with unified data sync.", icon: Layers },
    { title: "Retainer Churn Predictor", desc: "Flags at-risk clients 30 days before renewal deadlines.", icon: BarChart3 },
    { title: "Billable Margin Intelligence", desc: "Track exact labor + tool costs against monthly retainer fee.", icon: DollarSign },
    { title: "Cross-Platform Ad Staging", desc: "Stage ads across Meta, Google & TikTok from one queue.", icon: Clock },
    { title: "AI Executive Client Briefings", desc: "Auto-generated weekly summaries sent straight to clients.", icon: MessageSquare },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-100/60 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
              <span>UNLIMITED CAPABILITIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Discover an extensive range of features built for{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                performance scale
              </span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              From macro portfolio ROAS command to pixel-level creative testing, Digivigee delivers the enterprise capabilities modern agencies need to outcompete.
            </p>

            <div className="pt-2">
              <a
                href="#trial"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-tight transition shadow-sm"
              >
                <span>Explore All 20+ Modules</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Right Column: 12 Interactive Badges Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {capabilities.map((cap, idx) => {
                const Icon = cap.icon;
                const isHovered = hoveredIdx === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer bg-white ${
                      isHovered
                        ? "border-emerald-500 shadow-md scale-[1.02] bg-emerald-50/20"
                        : "border-slate-200 shadow-2xs hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isHovered ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{cap.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-9 leading-relaxed">{cap.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
