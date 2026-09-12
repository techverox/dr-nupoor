"use client";

import React, { useState } from "react";
import InteractiveCard from "@/components/InteractiveCard";
import {
  Quote,
  TrendingUp,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  Building2,
  ArrowRight
} from "lucide-react";

export default function PerformanceCaseStudies() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const stories = [
    {
      id: 0,
      agencyName: "Apex Growth Media",
      niche: "DTC & E-Commerce Scale",
      quote:
        "Digivigee saved our media buyers 15 hours every single week on Looker Studio and manual slide decks. We scaled from 14 to 48 client retainers with the exact same headcount, and our client churn dropped to virtually zero.",
      author: "David Sterling",
      role: "Founder & CEO, Apex Growth Media",
      stats: [
        { label: "Retainer Retention", value: "+54%", sub: "Zero churn across 48 accounts" },
        { label: "Reporting Time Saved", value: "85%", sub: "Saved 15+ hrs/week per buyer" },
        { label: "Managed Monthly Spend", value: "$3.8M", sub: "Meta, Google & TikTok ads" },
      ],
    },
    {
      id: 1,
      agencyName: "Velocity Performance Group",
      niche: "Omnichannel Paid Acquisition",
      quote:
        "The automated budget pacing sentinel alone has saved our agency from multiple catastrophic weekend overspends. When an ad set spikes or burns out, Digivigee handles it before the client even notices.",
      author: "Elena Rostova",
      role: "Head of Paid Media, Velocity Group",
      stats: [
        { label: "Accidental Overspends", value: "0", sub: "100% guarded pacing" },
        { label: "Average Client ROAS", value: "4.62x", sub: "+0.8x over industry average" },
        { label: "Client Satisfaction", value: "99.4%", sub: "Verified portal Net Promoter" },
      ],
    },
    {
      id: 2,
      agencyName: "Scale Capital Digital",
      niche: "B2B SaaS & High-Ticket Lead Gen",
      quote:
        "Giving our clients a 100% white-label portal under our own domain completely elevated our brand authority. Clients treat us like strategic partners rather than transactional vendors.",
      author: "Marcus Vance",
      role: "Managing Director, Scale Capital",
      stats: [
        { label: "Net Retainer Margin", value: "72.4%", sub: "+24% margin expansion" },
        { label: "Client Intake Time", value: "3 Mins", sub: "Down from 5 business days" },
        { label: "Average Retainer LTV", value: "14.2 Mos", sub: "Industry benchmark is 6 mos" },
      ],
    },
  ];

  const current = stories[activeTab];

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 mb-4">
            <span>PROVEN AGENCY ROI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Trusted by the fastest scaling{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              performance agencies
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Real founders. Real media buyers. Measurable profit margin expansion.
          </p>
        </div>

        {/* Agency Select Tabs */}
        <div className="flex items-center justify-center gap-2 pb-2 overflow-x-auto scrollbar-none mb-10">
          {stories.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                activeTab === s.id
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {s.agencyName}
            </button>
          ))}
        </div>

        {/* Active Testimonial Card */}
        <InteractiveCard
          glowEffect={true}
          className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Quote on Left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-1 text-emerald-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-400" />
                ))}
                <span className="text-xs font-bold text-slate-400 ml-2">Verified Agency Customer</span>
              </div>

              <blockquote className="text-lg sm:text-xl font-medium leading-relaxed text-slate-100">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="pt-2">
                <div className="text-base font-bold text-white">{current.author}</div>
                <div className="text-xs text-emerald-400 mt-0.5">{current.role}</div>
                <div className="text-xs text-slate-400 mt-0.5">{current.niche}</div>
              </div>
            </div>

            {/* 3 Hard Metric Cards on Right */}
            <div className="lg:col-span-5 space-y-4">
              {current.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                    <div className="text-[11px] text-slate-500">{stat.sub}</div>
                  </div>
                  <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </InteractiveCard>
      </div>
    </section>
  );
}
