"use client";

import React from "react";
import {
  TrendingUp,
  Clock,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function ProofSection() {
  const metrics = [
    {
      value: "10+",
      label: "Disconnected Tools Consolidated",
      subtext: "Replaces HubSpot, Asana, Hootsuite, Semrush, Google Drive & Freshdesk",
      icon: Layers,
      color: "text-emerald-400",
    },
    {
      value: "14 hrs",
      label: "Saved Weekly Per Account Manager",
      subtext: "Eliminates duplicate status updates, manual PDF reports & messy email chains",
      icon: Clock,
      color: "text-cyan-400",
    },
    {
      value: "4.2x",
      label: "Faster Client Sign-Off Cycles",
      subtext: "1-Click mobile client approval portal reduces revision turnaround from days to minutes",
      icon: Zap,
      color: "text-emerald-400",
    },
    {
      value: "99.9%",
      label: "Enterprise Uptime & Security SLA",
      subtext: "End-to-end encrypted client workspaces with role-based access control",
      icon: ShieldCheck,
      color: "text-cyan-400",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#08090c] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            Agency Operating Benchmarks
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Designed to Multiply Your Agency's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Net Profit Margins
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Standardizing on a single operating system reduces operational overhead, eliminates subscription fatigue, and delivers a superior client experience.
          </p>
        </div>

        {/* Metric Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0e1118]/80 border border-white/[0.08] text-left space-y-3 hover:border-emerald-500/30 transition-all backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <Icon className={`w-5 h-5 ${m.color}`} />
                  </div>
                  <span className="text-xs font-mono text-neutral-500 font-bold">METRIC 0{idx + 1}</span>
                </div>
                <div>
                  <div className={`text-4xl font-extrabold font-mono tracking-tight ${m.color}`}>
                    {m.value}
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {m.label}
                  </div>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {m.subtext}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
