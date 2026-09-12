"use client";

import React from "react";
import { ShieldCheck, Award, Lock, Server } from "lucide-react";

export default function TrustBadges() {
  const items = [
    {
      label: "SOC-2 Type II Certified",
      sub: "Enterprise Data Compliance",
      icon: ShieldCheck,
      color: "text-emerald-700",
      bg: "bg-emerald-50 border-emerald-200/80",
    },
    {
      label: "99.99% Guaranteed SLA",
      sub: "Zero P1 Outages in 2025–2026",
      icon: Server,
      color: "text-teal-700",
      bg: "bg-teal-50 border-teal-200/80",
    },
    {
      label: "G2 Best Agency OS 2026",
      sub: "Rated 4.9/5 Across 400+ Reviews",
      icon: Award,
      color: "text-amber-700",
      bg: "bg-amber-50 border-amber-200/80",
    },
    {
      label: "Cryptographic Multi-Tenancy",
      sub: "Zero Cross-Client Data Leakage",
      icon: Lock,
      color: "text-indigo-700",
      bg: "bg-indigo-50 border-indigo-200/80",
    },
  ];

  return (
    <section className="relative z-20 py-16 sm:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 flex items-start gap-4 group text-left"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} border flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#09090B] group-hover:text-emerald-700 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">
                    {item.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
