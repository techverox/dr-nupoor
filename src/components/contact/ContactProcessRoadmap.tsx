"use client";

import React from "react";
import { Search, FileText, Video, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: "01",
    timing: "< 2 Hours",
    title: "Objective Ingestion & Pod Assignment",
    description:
      "Our Lead Strategy Director reviews your submission, audits your current infrastructure, and assigns the dedicated technical pod.",
    icon: Search,
    highlight: "Direct Director Review",
  },
  {
    step: "02",
    timing: "< 4 Hours",
    title: "Pre-Call Diagnosis & ROI Audit",
    description:
      "We prepare data-backed insights: CAPI tracking health, creative fatigue analysis, or SaaS deployment blueprints before we speak.",
    icon: FileText,
    highlight: "Zero Sales Fluff",
  },
  {
    step: "03",
    timing: "Day 1",
    title: "30-Min Tactical Strategy Session",
    description:
      "Direct screen-share with our core leadership. Walk through clear unit economics, exact deliverables, and actionable scaling milestones.",
    icon: Video,
    highlight: "Actionable Roadmap",
  },
];

export default function ContactProcessRoadmap() {
  return (
    <section className="relative z-10 py-14 sm:py-20 bg-slate-50/90 border-t border-slate-200/80 overflow-hidden">
      {/* Subtle Background Circuit Dots */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3 h-3" />
            <span>Execution Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0C1628] tracking-tight mb-2.5">
            What Happens After You Reach Out?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            Our transparent 3-step SLA protocol from initial contact to deployment. No junior sales reps, 100% data-driven diagnosis.
          </p>
        </div>

        {/* Steps Grid with Connected Pipeline Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step pill & SLA badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#0C1628] text-white flex items-center justify-center text-xs font-bold font-mono shadow-xs">
                        {item.step}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Phase
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#008744] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                      {item.timing}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 text-[#008744] flex items-center justify-center shrink-0 group-hover:bg-[#008744] group-hover:text-white group-hover:border-[#008744] transition-all duration-300 shadow-xs">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0C1628] leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Highlight footer */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                    <span>{item.highlight}</span>
                  </div>
                  <span className="text-slate-300 group-hover:text-[#008744] group-hover:translate-x-1 transition-all">
                    &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Protocol Trust Ribbon */}
        <div className="mt-10 p-4 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200/80 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Guaranteed &lt; 4-Hour Response Protocol Across All Tiers</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500">
            <span>• Mutual NDA Ready</span>
            <span>• Zero Obligation Diagnosis</span>
            <span>• Direct Partner Attention</span>
          </div>
        </div>
      </div>
    </section>
  );
}
