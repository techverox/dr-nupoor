"use client";

import React, { useState } from "react";
import InteractiveCard from "@/components/InteractiveCard";
import {
  FileText,
  Sliders,
  Video,
  CheckCircle2,
  ArrowRight,
  Download,
  Copy,
  Sparkles,
  Layers
} from "lucide-react";

export default function PerformanceTemplates() {
  const [activeTemplate, setActiveTemplate] = useState<number>(0);

  const templates = [
    {
      id: 0,
      title: "Omnichannel Budget Pacing & Sentinel",
      desc: "Pre-configured auto-pacing rules, daily budget distribution across Meta, Google & TikTok, and overspend alerts.",
      tag: "PAID MEDIA",
      downloads: "1,420+ agencies using this",
      metrics: ["Daily pacing calculation", "Automated weekend alerts", "Live ROAS benchmark thresholds"],
    },
    {
      id: 1,
      title: "Performance Creative Sprint & Hook Testing",
      desc: "Standardized workflow pipeline for video editors, UGC creators, scriptwriters, and media buyers with 3-second hook rate tracking.",
      tag: "CREATIVE TESTING",
      downloads: "980+ agencies using this",
      metrics: ["Hook rate scorecard", "Asset version control", "1-click client sign-off staging"],
    },
    {
      id: 2,
      title: "Client Onboarding & Pixel Health Blueprint",
      desc: "Complete 14-day client intake workflow covering CAPI matching, Google Tag Manager verification, and initial media plan staging.",
      tag: "AGENCY ONBOARDING",
      downloads: "2,100+ agencies using this",
      metrics: ["Zero-friction OAuth intake", "Attribution audit checklist", "Executive welcome dashboard"],
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 mb-4">
            <span>PRE-BUILT OPERATING BLUEPRINTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Launch winning agency workflows in{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              seconds, not weeks
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Plug and play battle-tested templates refined by the world’s top 1% performance marketing agencies.
          </p>
        </div>

        {/* 3 Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl, idx) => (
            <InteractiveCard
              key={tpl.id}
              glowEffect={true}
              className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 p-6 flex flex-col justify-between transition-all group shadow-2xs hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {tpl.tag}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    IN-APP BLUEPRINT
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {tpl.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {tpl.desc}
                </p>

                <div className="space-y-2 mb-6">
                  {tpl.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-medium">
                  {tpl.downloads}
                </span>
                <a
                  href="#trial"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
}
