"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Share2,
  Globe,
  BarChart3,
  CheckCircle,
  Kanban,
  Megaphone,
  ArrowUpRight,
  TrendingUp,
  FileCheck,
  Calendar,
  Command,
  Sparkles,
  Zap,
} from "lucide-react";

export default function EverythingAgency() {
  const [activeTab, setActiveTab] = useState("all");

  const cards = [
    {
      id: "crm",
      title: "CRM & Deal Pipelines",
      category: "Growth",
      desc: "Track client leads, multi-stage proposals, contract values, and automated follow-ups in one visual pipeline.",
      icon: Users,
      badge: "$142k Pipeline",
      color: "emerald",
      preview: (
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-left">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-bold">In Negotiation</span>
            <span className="text-neutral-400 font-mono">$38,000/yr</span>
          </div>
          <p className="text-xs font-semibold text-white">Fintech Brand Retainer</p>
          <div className="w-full bg-neutral-800 rounded-full h-1.5">
            <div className="bg-emerald-400 h-1.5 rounded-full w-[85%]" />
          </div>
          <div className="text-[10px] text-neutral-400 flex items-center justify-between">
            <span>Proposal sent 2h ago</span>
            <span className="text-emerald-400 font-medium">85% Win Probability</span>
          </div>
        </div>
      ),
    },
    {
      id: "client-mgmt",
      title: "Client Management & Workspaces",
      category: "Operations",
      desc: "Give every client their own isolated workspace with branded logins, permissions, and custom SLA dashboards.",
      icon: CheckCircle,
      badge: "Zero Churn SLA",
      color: "cyan",
      preview: (
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2.5 text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-[10px] font-bold text-black">
              L
            </div>
            <div>
              <div className="text-xs font-bold text-white">Lumina Healthcare Portal</div>
              <div className="text-[10px] text-neutral-400">Custom Domain: clients.lumina.com</div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300">Active Retainer</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">100% On-Time</span>
          </div>
        </div>
      ),
    },
    {
      id: "projects",
      title: "Projects & Production Tasks",
      category: "Delivery",
      desc: "Kanban, sprints, time-tracking, and capacity planning. Eliminate missed agency deadlines permanently.",
      icon: Kanban,
      badge: "Sprint #24",
      color: "emerald",
      preview: (
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Q4 Black Friday Creative Suite</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-400/20 text-emerald-300 font-mono">
              18 / 20 Done
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Assigned to Sarah & Design Team • Due Tomorrow
          </div>
        </div>
      ),
    },
    {
      id: "seo",
      title: "SEO & Rank Tracking",
      category: "Organic",
      desc: "Daily automated keyword rank tracker, site audit crawler, backlink monitors, and client visibility index.",
      icon: Search,
      badge: "Rank #1 Focus",
      color: "cyan",
      preview: (
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">"Best Medical CRM"</span>
            <span className="text-emerald-400 font-mono font-bold">Rank #1 (+4)</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-400">
            <span>Search Vol: 18.2k/mo</span>
            <span className="text-cyan-400">Intent: High Commercial</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5">
            <div className="bg-cyan-400 h-1.5 rounded-full w-[94%]" />
          </div>
        </div>
      ),
    },
    {
      id: "social",
      title: "Social Media Publishing",
      category: "Channels",
      desc: "Unified multi-channel calendar. Schedule, preview, and auto-post across LinkedIn, Instagram, TikTok & X.",
      icon: Share2,
      badge: "Multi-Channel Auto",
      color: "emerald",
      preview: (
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-left">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-semibold">Scheduled Post</span>
            <span className="text-neutral-400">Thu, 10:30 AM</span>
          </div>
          <p className="text-xs text-neutral-200 line-clamp-2">
            "5 Marketing shifts every B2B CMO must prepare for in 2027..."
          </p>
          <div className="flex gap-1.5 text-[10px] text-neutral-400">
            <span className="px-1.5 py-0.5 rounded bg-white/5">LinkedIn</span>
            <span className="px-1.5 py-0.5 rounded bg-white/5">X.com</span>
            <span className="px-1.5 py-0.5 rounded bg-white/5">Instagram</span>
          </div>
        </div>
      ),
    },
    {
      id: "website",
      title: "Website CMS & Landing Pages",
      category: "Web Dev",
      desc: "Deploy high-converting landing pages for clients with visual drag-and-drop or Headless Next.js integrations.",
      icon: Globe,
      badge: "Sub-second Load",
      color: "cyan",
      preview: (
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Lumina Landing Page v2</span>
            <span className="text-emerald-400 font-mono font-bold">100 / 100 Lighthouse</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-400">
            <span>Status: Staging Ready</span>
            <span className="text-cyan-400">Next.js 15 App Router</span>
          </div>
        </div>
      ),
    },
    {
      id: "campaigns",
      title: "Multi-Channel Ad Campaigns",
      category: "Paid Media",
      desc: "Manage Meta, Google Ads, and TikTok campaigns side-by-side with centralized budget optimization and ROAS tracking.",
      icon: Megaphone,
      badge: "4.8x ROAS Avg",
      color: "emerald",
      preview: (
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Google Ads + Meta Retargeting</span>
            <span className="text-emerald-400 font-mono font-bold">$42,800 Spend</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-400">
            <span>Conversions: 1,840</span>
            <span className="text-emerald-400 font-bold">CPA: $23.26 (-34%)</span>
          </div>
        </div>
      ),
    },
    {
      id: "reporting",
      title: "Automated Client Reporting",
      category: "Retention",
      desc: "One-click white-label PDF & interactive web reports sent automatically on the 1st of every month.",
      icon: BarChart3,
      badge: "Zero Manual Work",
      color: "cyan",
      preview: (
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Monthly Executive Performance</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300">Auto-Delivered</span>
          </div>
          <p className="text-[11px] text-neutral-300">Delivered to 18 client CEOs with custom agency branding</p>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 bg-[#08090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            Everything Your Agency Needs
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Unmatched agency{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400">
              productivity
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Every department in your agency working in unison. No duplicate entry, no lost emails, and no disconnected SaaS subscriptions.
          </p>

          {/* Quick Pillars (as in your screenshot) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm font-semibold text-neutral-200 flex items-center gap-2 hover:border-emerald-500/40 transition">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              All-in-One Agency Workspace
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm font-semibold text-neutral-200 flex items-center gap-2 hover:border-cyan-500/40 transition">
              <Users className="w-4 h-4 text-cyan-400" />
              Powerful Team & Client Collaboration
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm font-semibold text-neutral-200 flex items-center gap-2 hover:border-emerald-500/40 transition">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Autonomous Process Automation
            </div>
          </div>
        </div>

        {/* Bento Grid: 8 Capability Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            const isEmerald = card.color === "emerald";

            return (
              <div
                key={card.id}
                className="group relative rounded-2xl p-5 bg-[#0e1118]/80 border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_25px_-5px_rgba(34,197,94,0.2)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isEmerald
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }`}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isEmerald
                          ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/30"
                          : "bg-cyan-950/40 text-cyan-300 border-cyan-500/30"
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-4 group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                {/* Real Micro-UI Preview Component */}
                {card.preview}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
