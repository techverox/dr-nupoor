"use client";

import React from "react";
import {
  Users,
  Search,
  Share2,
  Globe,
  BarChart3,
  Layers,
  Sparkles,
  CheckCircle,
  FileSpreadsheet,
  Megaphone,
} from "lucide-react";

export default function FeatureTicker() {
  const features = [
    { label: "CRM & Sales Pipelines", icon: Users, color: "text-emerald-400" },
    { label: "Client Workspaces", icon: Layers, color: "text-cyan-400" },
    { label: "SEO & Rank Tracking", icon: Search, color: "text-emerald-400" },
    { label: "Social Media Scheduler", icon: Share2, color: "text-cyan-400" },
    { label: "Website CMS Builder", icon: Globe, color: "text-emerald-400" },
    { label: "Multi-Channel Ad Campaigns", icon: Megaphone, color: "text-cyan-400" },
    { label: "Automated Client Reports", icon: BarChart3, color: "text-emerald-400" },
    { label: "1-Click Client Approval Portal", icon: CheckCircle, color: "text-cyan-400" },
    { label: "AI Marketing Copilot", icon: Sparkles, color: "text-emerald-400" },
  ];

  return (
    <div className="relative py-6 bg-[#08090c] border-y border-white/[0.06] overflow-hidden">
      {/* Left/Right Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#08090c] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#08090c] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex animate-marquee items-center gap-8">
        {[...features, ...features].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07] text-neutral-300 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap hover:border-emerald-500/40 hover:bg-white/[0.06] transition"
            >
              <Icon className={`w-4 h-4 ${item.color}`} />
              <span>{item.label}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 ml-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
