"use client";

import React from "react";
import Link from "next/link";
import { PortfolioItem } from "@/types";
import { ArrowRight, Trophy, CheckCircle2, TrendingUp, Sparkles, Layers, CreditCard } from "lucide-react";
import InteractiveCard from "@/components/InteractiveCard";
import { FadeIn, StaggerContainer, StaggerItem, Counter } from "@/components/motion";

function MetricAnimated({ value }: { value: string }) {
  if (value.startsWith("+") && value.endsWith("%")) {
    const num = parseFloat(value.replace("+", "").replace("%", ""));
    return <span>+<Counter to={num} suffix="%" /></span>;
  }
  if (value.includes("Hours")) {
    const num = parseFloat(value.replace("Hours", "").trim());
    return <span><Counter to={num} suffix=" Hours" /></span>;
  }
  if (value.includes("% Faster")) {
    const num = parseFloat(value.replace("% Faster", "").trim());
    return <span><Counter to={num} suffix="% Faster" /></span>;
  }
  if (value.startsWith("$") && value.includes("k/mo")) {
    const num = parseFloat(value.replace("$", "").replace("k/mo", "").trim());
    return <span>$<Counter to={num} suffix="k/mo" /></span>;
  }
  return <span>{value}</span>;
}

interface AgencyCaseData {
  bigMetric: string;
  metricLabel: string;
  agencyType: string;
  teamSize: string;
  highlightStory: string;
  founderQuote: string;
  founderName: string;
  founderRole: string;
  verifiedBadges: string[];
}

const CASE_DATA: Record<string, AgencyCaseData> = {
  "apex-digital-media": {
    bigMetric: "+350%",
    metricLabel: "Retainer Growth",
    agencyType: "Performance Ad Agency",
    teamSize: "45 Team Members",
    highlightStory: "Scaled from 15 to 68 active retainers without hiring extra account managers or blowing client budgets.",
    founderQuote: "“Digivigee automated our ad spend pacing and conversion tracking. 45 media buyers manage $14M+ with zero overspend errors.”",
    founderName: "Marcus Vance",
    founderRole: "Managing Partner",
    verifiedBadges: ["$14M+ Ad Spend Managed", "0 Overspend Errors", "4.82x Blended ROAS"],
  },
  "vanguard-performance-ops": {
    bigMetric: "65 Hours",
    metricLabel: "Saved per Month",
    agencyType: "Full-Funnel DTC Agency",
    teamSize: "120 Active Retainers",
    highlightStory: "Replaced 40-page manual PDF slide decks with real-time white-labeled client portals on their own custom domain.",
    founderQuote: "“Our clients love logging in 24/7 to see live ROI instead of waiting for end-of-month PDFs. Client retention jumped to 99.4%.”",
    founderName: "Elena Rostova",
    founderRole: "Managing Director",
    verifiedBadges: ["99.4% Client Retention", "0 Manual Slides", "NPS Score: 89/100"],
  },
  "catalyst-creative-labs": {
    bigMetric: "78% Faster",
    metricLabel: "Creative Approvals",
    agencyType: "Social & Content Agency",
    teamSize: "3,400+ Assets / Mo",
    highlightStory: "Cut client creative review cycles from 4.2 days down to 8 hours with 1-click timestamped video proofing.",
    founderQuote: "“Clients click one link, leave visual feedback on video frames, and approve in seconds. No more lost email threads.”",
    founderName: "Sophie Laurent",
    founderRole: "Head of Creative",
    verifiedBadges: ["8h Sign-Off Speed", "3,400+ Assets Shipped", "Zero Revision Chaos"],
  },
  "acuity-media-network": {
    bigMetric: "$180k/mo",
    metricLabel: "Retainers on Autopilot",
    agencyType: "B2B Demand Gen Agency",
    teamSize: "32 Active Retainers",
    highlightStory: "Automated recurring monthly retainer billing and performance fee collections via Stripe with zero overdue invoices.",
    founderQuote: "“Retainer billing runs like clockwork on the 1st of every month. Our average client retainer expanded from $3.5k to $12k.”",
    founderName: "David Sterling",
    founderRole: "Chief Financial Officer",
    verifiedBadges: ["0 Overdue Invoices", "+310% Retainer Expansion", "100% On-Time Cash Flow"],
  },
};

const DEFAULT_CASE_DATA: AgencyCaseData = {
  bigMetric: "+280%",
  metricLabel: "Operational Efficiency",
  agencyType: "Digital Marketing Agency",
  teamSize: "25+ Team Members",
  highlightStory: "Automated core client onboarding, reporting, and retainer pacing to scale without adding operational overhead.",
  founderQuote: "“Digivigee is the single operating system that keeps our entire agency aligned across media, content, and finance.”",
  founderName: "Agency Director",
  founderRole: "Operations Lead",
  verifiedBadges: ["Automated Workflows", "Live Client Portals", "High Client CSAT"],
};

export interface LivePortfolioShowcaseProps {
  portfolio: PortfolioItem[];
}

export default function LivePortfolioShowcase({ portfolio }: LivePortfolioShowcaseProps) {
  const displayItems = portfolio.filter((p) => p.isPublished !== false).slice(0, 4);

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with FadeIn */}
        <FadeIn direction="up" distance={20} duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.08em] mb-3">
              <Trophy className="w-3 h-3 text-[#009669]" />
              <span>AGENCY CUSTOMER STORIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-[-0.03em] text-[#0C1628] leading-[1.15] mb-3">
              How <Counter to={2350} suffix="+ Scaling Agencies" /> Grow with Digivigee
            </h2>
            <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-2xl mx-auto">
              Real retention metrics, automated delivery hours, and retainer expansion data from digital marketing agencies running on Digivigee OS.
            </p>
          </div>
        </FadeIn>

        {/* Portfolio 2x2 Bento Grid (Clean, Easy-to-Understand Light Cards with Cascading Stagger) */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {displayItems.map((item, idx) => {
            const caseInfo = CASE_DATA[item.slug] || DEFAULT_CASE_DATA;

            return (
              <StaggerItem key={item.id || item.slug || idx} className="h-full">
                <InteractiveCard maxTilt={1.5} glowEffect={false} className="h-full">
                  <div className="h-full rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
                    
                    <div className="space-y-4">
                      
                      {/* Top Bar: Agency Info & Category */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <div className="text-xs font-bold text-[#0C1628]">
                            {item.clientName || "Enterprise Agency"}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {caseInfo.agencyType} • {caseInfo.teamSize}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          Verified Story
                        </span>
                      </div>

                      {/* Big Impact Metric Banner (Clear, Simple, Obvious with Live Spring Counter) */}
                      <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <div className="text-3xl sm:text-4xl font-black text-[#008744] font-mono tracking-tight">
                            <MetricAnimated value={caseInfo.bigMetric} />
                          </div>
                          <div className="text-xs font-bold text-[#0C1628] uppercase tracking-wider mt-0.5">
                            {caseInfo.metricLabel}
                          </div>
                        </div>
                        <div className="text-right max-w-[200px] text-[11.5px] text-slate-600 leading-snug font-medium hidden sm:block">
                          {caseInfo.highlightStory}
                        </div>
                      </div>

                      {/* Mobile highlight text if hidden on small screens */}
                      <p className="text-xs text-slate-600 leading-relaxed sm:hidden font-medium">
                        {caseInfo.highlightStory}
                      </p>

                      {/* Authentic Founder Quote */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <p className="text-xs sm:text-[13px] text-[#0C1628] leading-relaxed italic font-normal">
                          {caseInfo.founderQuote}
                        </p>
                        <div className="text-[11px] font-bold text-slate-500 not-italic pt-0.5">
                          — {caseInfo.founderName}, <span className="font-normal text-slate-500">{caseInfo.founderRole}</span>
                        </div>
                      </div>

                      {/* 3 Verified Metric Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {caseInfo.verifiedBadges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-[11px] font-semibold text-[#0C1628] shadow-2xs"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#008744]" />
                            <span>{badge}</span>
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Footer Action */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/portfolio/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008744] hover:text-[#00B84D] transition-colors group/link"
                      >
                        <span>Read Growth Story</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
                      </Link>
                      <span className="text-[11px] font-medium text-slate-400">
                        Agency Retainer Audit
                      </span>
                    </div>

                  </div>
                </InteractiveCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* View All Portfolio Link with FadeIn */}
        <FadeIn delay={0.2} className="mt-10 sm:mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-300 hover:border-slate-400 text-slate-900 font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all"
          >
            <span>Explore All Agency Scaling Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#008744]" />
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}

