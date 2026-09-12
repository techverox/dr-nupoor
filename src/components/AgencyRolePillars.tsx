"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import InteractiveCard from "@/components/InteractiveCard";
import {
  ArrowRight,
  Bot,
  Sparkles,
  TrendingUp,
  Clock,
  CreditCard,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

export default function AgencyRolePillars() {
  return (
    <section id="features" className="py-14 sm:py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================
            SECTION HEADER: Minimalist, Bold & Clean Visual Anchor
            ================================================================ */}
        <FadeIn direction="up" distance={20} duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.08em] mb-3">
              <Sparkles className="w-3 h-3 text-[#009669]" />
              <span>Agency Workflow Automation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-[-0.03em] text-[#0C1628] leading-[1.15] mb-3">
              Scale 10x retainers. Burn out 0 teams.
            </h2>
            <p className="text-sm sm:text-base text-[#3E4D64] font-normal leading-relaxed max-w-2xl mx-auto">
              Stop wasting your best agency talent on manual reporting and fragmented spreadsheets that Digivigee AI handles in seconds.
            </p>
          </div>
        </FadeIn>

        {/* ================================================================
            ROW 1: TWO WIDE CARDS (50% / 50%) — HIGH-DENSITY BENTO
            ================================================================ */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:gap-6">
          
          {/* Card 1: Agency AI Agents */}
          <StaggerItem className="h-full">
            <InteractiveCard className="h-full rounded-2xl sm:rounded-3xl bg-[#F2F5FA] p-5 sm:p-6 lg:p-7 shadow-2xs hover:shadow-md flex flex-col justify-between overflow-hidden group border border-slate-200/70 hover:border-slate-300/80">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
              {/* Left Text */}
              <div className="sm:col-span-6 space-y-3 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  <Bot className="w-3 h-3 text-emerald-700" />
                  <span>Autonomous Ops</span>
                </div>
                <h3 className="text-lg sm:text-[20px] font-bold text-[#0C1628] tracking-tight leading-snug group-hover:text-emerald-600 transition-colors">
                  Agency AI agents
                </h3>
                <p className="text-xs sm:text-[13.5px] text-[#3E4D64] leading-relaxed font-normal">
                  Build autonomous marketing workflows with Digivigee agents and let them handle campaign pacing, weekly reporting, and client follow-ups.
                </p>

                {/* Clean Minimalist Status Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Autonomous Pacing", "Weekly Telemetry", "Client Alerts"].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 text-[10.5px] font-semibold text-[#0C1628] shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="#platform"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008744] hover:text-[#00B84D] transition-colors group/link"
                  >
                    <span>Explore AI agents</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Visual: Clean Unobstructed High-Resolution UI */}
              <div className="sm:col-span-6 relative flex items-center justify-center">
                <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden shadow-2xs border border-slate-200/70 bg-white">
                  <Image
                    src="/images/showcase/pillar_ai_agents.jpg"
                    alt="Agency AI Agents in action"
                    fill
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </InteractiveCard>
          </StaggerItem>

          {/* Card 2: Digivigee Copilot */}
          <StaggerItem className="h-full">
            <InteractiveCard className="h-full rounded-2xl sm:rounded-3xl bg-[#F2F5FA] p-5 sm:p-6 lg:p-7 shadow-2xs hover:shadow-md flex flex-col justify-between overflow-hidden group border border-slate-200/70 hover:border-slate-300/80">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
                {/* Left Text */}
                <div className="sm:col-span-6 space-y-3 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-100/80 text-[10px] font-bold text-cyan-900 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-cyan-700" />
                    <span>Executive Assistant</span>
                  </div>
                  <h3 className="text-lg sm:text-[20px] font-bold text-[#0C1628] tracking-tight leading-snug group-hover:text-emerald-600 transition-colors">
                    Digivigee Copilot
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-[#3E4D64] leading-relaxed font-normal">
                    Digivigee Copilot answers client questions, summarizes weekly ROAS, and keeps your agency team moving without back-and-forth emails.
                  </p>

                  {/* Clean Minimalist Performance Metric Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 text-[10.5px] font-semibold text-[#0C1628] shadow-2xs">
                      Target ROAS <span className="text-[#008744] font-mono font-bold ml-0.5">4.82x</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 text-[10.5px] font-semibold text-slate-700 shadow-2xs">
                      CAPI & Google Synced
                    </span>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="#platform"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008744] hover:text-[#00B84D] transition-colors group/link"
                    >
                      <span>Discover Copilot</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right Visual */}
                <div className="sm:col-span-6 relative flex items-center justify-center">
                  <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden shadow-2xs border border-slate-200/70 bg-white">
                    <Image
                      src="/images/showcase/pillar_copilot.jpg"
                      alt="Digivigee Copilot Analytics"
                      fill
                      className="object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </StaggerItem>

        </StaggerContainer>

        {/* ================================================================
            ROW 2: THREE CARDS (33% / 33% / 33%) — HIGH-DENSITY BENTO
            ================================================================ */}
        <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10 mt-5">
          
          {/* Card 3: Multi-channel ROAS command */}
          <StaggerItem className="h-full">
            <InteractiveCard className="h-full rounded-2xl sm:rounded-3xl bg-[#F2F5FA] p-5 sm:p-6 border border-slate-200/70 hover:border-slate-300/80 shadow-2xs hover:shadow-md flex flex-col justify-between text-left overflow-hidden group">
              <div className="space-y-2.5 mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  <TrendingUp className="w-3 h-3 text-emerald-700" />
                  <span>Productivity</span>
                </div>
                <h3 className="text-base sm:text-[18px] font-bold text-[#0C1628] tracking-tight leading-snug group-hover:text-emerald-600 transition-colors">
                  Multi-channel ROAS command
                </h3>
                <p className="text-xs sm:text-[13px] text-[#3E4D64] leading-relaxed font-normal">
                  Dramatically increase ad efficiency with built-in telemetry across Meta, Google, and TikTok that cuts wasted spend.
                </p>
                <div className="pt-1">
                  <Link
                    href="#platform"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008744] hover:text-[#00B84D] transition-colors group/link"
                  >
                    <span>Try ad command</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Bottom Image Container */}
              <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden shadow-2xs border border-slate-200/70 bg-white">
                <Image
                  src="/images/showcase/pillar_roas_command.jpg"
                  alt="Multi-channel ROAS command"
                  fill
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </InteractiveCard>
          </StaggerItem>

          {/* Card 4: White-label client intelligence */}
          <StaggerItem className="h-full">
            <InteractiveCard className="h-full rounded-2xl sm:rounded-3xl bg-[#F2F5FA] p-5 sm:p-6 shadow-2xs hover:shadow-md flex flex-col justify-between text-left overflow-hidden group border border-slate-200/70 hover:border-slate-300/80">
              <div className="space-y-2.5 mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/80 text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1">
                  <Clock className="w-3 h-3 text-slate-700" />
                  <span>AI Insights</span>
                </div>
                <h3 className="text-base sm:text-[18px] font-bold text-[#0C1628] tracking-tight leading-snug group-hover:text-emerald-600 transition-colors">
                  White-label client intelligence
                </h3>
                <p className="text-xs sm:text-[13px] text-[#3E4D64] leading-relaxed font-normal">
                  Save 20+ hours a week digging for client data. Digivigee turns raw ad and e-commerce data into clear, client-ready portal reports.
                </p>
                <div className="pt-1">
                  <Link
                    href="#platform"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008744] hover:text-[#00B84D] transition-colors group/link"
                  >
                    <span>Unlock client portals</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Bottom Image Container */}
              <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden shadow-2xs border border-slate-200/70 bg-white">
                <Image
                  src="/images/showcase/pillar_client_intelligence.jpg"
                  alt="White-label client intelligence"
                  fill
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </InteractiveCard>
          </StaggerItem>

          {/* Card 5: Stripe billing & retainer engine */}
          <StaggerItem className="h-full">
            <InteractiveCard className="h-full rounded-2xl sm:rounded-3xl bg-[#F2F5FA] p-5 sm:p-6 shadow-2xs hover:shadow-md flex flex-col justify-between text-left overflow-hidden group border border-slate-200/70 hover:border-slate-300/80">
              <div className="space-y-2.5 mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/80 text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1">
                  <CreditCard className="w-3 h-3 text-slate-700" />
                  <span>Billing</span>
                </div>
                <h3 className="text-base sm:text-[18px] font-bold text-[#0C1628] tracking-tight leading-snug group-hover:text-emerald-600 transition-colors">
                  Stripe billing & retainer engine
                </h3>
                <p className="text-xs sm:text-[13px] text-[#3E4D64] leading-relaxed font-normal">
                  Connect Digivigee to your agency bank and automate recurring monthly retainers and performance fees with zero manual invoices.
                </p>
                <div className="pt-1">
                  <Link
                    href="#platform"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008744] hover:text-[#00B84D] transition-colors group/link"
                  >
                    <span>Automate billing</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Bottom Image Container */}
              <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden shadow-2xs border border-slate-200/70 bg-white">
                <Image
                  src="/images/showcase/pillar_stripe_billing.jpg"
                  alt="Stripe billing engine"
                  fill
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </InteractiveCard>
          </StaggerItem>

        </StaggerContainer>

        {/* Bottom Centered Link with FadeIn */}
        <FadeIn delay={0.2} className="text-center pt-2">
          <Link
            href="#platform"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#008744] hover:text-[#00B84D] transition-colors group"
          >
            <span>See all Digivigee AI features</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}
