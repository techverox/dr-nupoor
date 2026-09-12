"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  BarChart3,
  Calendar,
  Building2,
  ExternalLink,
} from "lucide-react";
import { PortfolioItem } from "@/types";
import { Counter, ShimmerButton, FadeIn } from "@/components/motion";
import SocialProofBar from "@/components/SocialProofBar";

interface PortfolioClientViewProps {
  initialItems: PortfolioItem[];
}

interface FilterTab {
  id: string;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { id: "all", label: "All Case Studies" },
  { id: "performance", label: "Performance & Paid Media" },
  { id: "social", label: "Social Media & Creative" },
  { id: "localseo", label: "Local SEO & GBP" },
  { id: "fullservice", label: "Full-Service Retainers" },
];

export default function PortfolioClientView({ initialItems }: PortfolioClientViewProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems = initialItems.filter((item) => {
    if (activeTab === "all") return true;
    return item.categoryKey === activeTab;
  });

  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-[#0C1628] selection:bg-emerald-500/20 selection:text-emerald-900">
      
      {/* Background Subtle Mesh */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[650px] bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(0,135,68,0.06),transparent_70%)] pointer-events-none"
      />

      {/* Hero Section */}
      <section className="relative pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-16 sm:pb-20 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Staggered Heading Reveal */}
          <FadeIn direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0C1628] max-w-4xl mx-auto leading-[1.12] mb-6">
              Real Agency Retainers.{" "}
              <span className="text-[#008744] bg-gradient-to-r from-[#008744] to-[#00B84D] bg-clip-text text-transparent">
                Audited Revenue Impact.
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto font-normal leading-relaxed mb-12">
              Discover how leading performance, social, and local search agencies scaled retainer margins from $15k to $180k/mo with automated pacing, 1-click approvals, and zero overspend.
            </p>
          </FadeIn>

          {/* Live Metric Ribbon (Dynamic Count-Up Engine) */}
          <FadeIn direction="up" delay={0.4}>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0C1628] tracking-tight">
                  <Counter to={84.2} prefix="$" suffix="M+" decimals={1} duration={1.3} />
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Audited Ad Spend
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#008744] tracking-tight">
                  <Counter to={4.8} suffix="x" decimals={1} duration={1.2} />
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Avg Blended ROAS
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0C1628] tracking-tight">
                  <Counter to={99.4} suffix="%" decimals={1} duration={1.4} />
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Client Retention
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#008744] tracking-tight">
                  <Counter to={420} suffix="+" duration={1.5} />
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Verified Agency Pods
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Filter Tabs Section */}
      <section className="sticky top-20 z-20 py-4 bg-[#FCFDFD]/90 backdrop-blur-md border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center p-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-2xs gap-1 overflow-x-auto max-w-full">
              {FILTER_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const tabCount =
                  tab.id === "all"
                    ? initialItems.length
                    : initialItems.filter((i) => i.categoryKey === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer flex items-center gap-1.5 z-10 ${
                      isActive
                        ? "text-[#0C1628]"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePortfolioTabPill"
                        className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/90 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? "bg-emerald-50 text-[#008744] font-bold"
                          : "bg-slate-200/60 text-slate-500"
                      }`}
                    >
                      {tabCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Curated Bento Grid Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredItems.map((item, idx) => {
              const topMetric = item.metrics?.[0] || {
                label: "Growth Velocity",
                value: "+340%",
              };

                const heroImgSrc =
                  item.heroImage && typeof item.heroImage === "string" && item.heroImage.trim().length > 0
                    ? item.heroImage.trim()
                    : "/images/showcase/pillar_roas_command.jpg";

                return (
                  <motion.article
                    key={`portfolio-card-${item.slug || item.id || idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
                  >
                    <div>
                      {/* Visual Media Header */}
                      <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-200/70">
                        <Image
                          src={heroImgSrc}
                          alt={item.title || "Case Study"}
                          fill
                          priority={idx < 2}
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

                        {/* Primary Metric Floating Badge */}
                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-md flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[#008744]" />
                          <div>
                            <span className="text-sm font-extrabold text-slate-900 leading-none">
                              {topMetric.value}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium ml-1.5">
                              {topMetric.label}
                            </span>
                          </div>
                        </div>

                        {/* Industry Pill */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-800 uppercase tracking-wider border border-slate-200/60 shadow-2xs">
                          {item.category || "Agency OS"}
                        </div>
                      </div>

                      {/* Executive Leader Attribution */}
                      {item.authorName && (
                        <div className="flex items-center gap-2.5 mb-4">
                          {item.authorAvatar && typeof item.authorAvatar === "string" && item.authorAvatar.trim().length > 0 && (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                              <Image
                                src={item.authorAvatar.trim()}
                                alt={item.authorName || "Leader Avatar"}
                                fill
                                sizes="32px"
                                className="object-cover"
                              />
                            </div>
                          )}
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#0C1628] truncate flex items-center gap-1">
                            <span>{item.authorName}</span>
                            <CheckCircle2 className="w-3 h-3 text-[#008744] shrink-0" />
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {item.authorRole} • <strong className="text-slate-700">{item.clientName}</strong>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Case Study Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#0C1628] tracking-tight group-hover:text-[#008744] transition-colors line-clamp-2 mb-3 leading-snug">
                      {item.title}
                    </h3>

                    {/* Concise Summary */}
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-2 mb-5">
                      {item.shortDescription}
                    </p>

                    {/* 2x2 Audited Metrics Pills */}
                    {item.metrics && item.metrics.length > 1 && (
                      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100">
                        {item.metrics.slice(1, 4).map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/60"
                          >
                            <div className="text-sm font-extrabold text-[#0C1628] tracking-tight">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#008744] hover:text-[#00B84D] transition-colors group/link"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Audited</span>
                    </span>
                  </div>

                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Infinite Trust Partner Bar */}
      <SocialProofBar />

      {/* High-Conversion CTA Banner */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-white to-emerald-50/40 p-8 sm:p-14 border border-emerald-200/90 shadow-sm text-center overflow-hidden">
          
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 text-[#008744] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scale Your Agency Retainers</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1628] tracking-tight leading-tight">
              Ready to Scale Your Agency Retainers with Audited Certainty?
            </h2>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Join 2,350+ agency founders scaling client retainers with automated ad pacing, 1-click approvals, and zero client churn.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/contact">
                <ShimmerButton
                  shimmerColor="rgba(255, 255, 255, 0.45)"
                  className="px-7 py-3.5 rounded-xl bg-[#008744] hover:bg-[#009b4e] text-white font-bold text-sm shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <span>Request Growth Diagnostic</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>
              <Link
                href="/services"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0C1628] font-bold text-sm border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
              >
                Explore Delivery Engines
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 pt-3">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>24h Deployment Ready</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Headcount Overhead</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% White-Labeled</span>
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
