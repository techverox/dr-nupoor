"use client";

import React from "react";
import { Clock, ShieldCheck, Award, TrendingUp } from "lucide-react";

const TELEMETRY_ITEMS = [
  {
    icon: Clock,
    value: "< 4 Hours",
    label: "Response SLA",
    caption: "Direct Director Review",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Confidentiality",
    caption: "NDA Protected",
  },
  {
    icon: Award,
    value: "10+ Years",
    label: "Track Record",
    caption: "Since 2016",
  },
  {
    icon: TrendingUp,
    value: "250+",
    label: "Businesses",
    caption: "SaaS, Retail, F&B",
  },
];

export default function ContactTelemetryStrip() {
  return (
    <section className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        {TELEMETRY_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${
                idx > 0 ? "lg:pl-5" : ""
              } ${idx > 1 ? "pt-3 lg:pt-0" : ""}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 text-[#008744] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#0C1628] tracking-tight">
                  {item.value}
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-800">{item.label}</div>
              <div className="text-[10px] text-slate-500 font-normal">{item.caption}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
