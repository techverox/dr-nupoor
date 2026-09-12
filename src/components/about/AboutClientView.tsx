"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Users,
  ShieldCheck,
  TrendingUp,
  Mail,
  ArrowRight,
  Target,
  Zap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Globe,
  Layers,
  Cpu,
  Milestone,
  Check,
  MessageSquare,
  Share2,
  BarChart3,
  Receipt,
  CreditCard,
  Bot,
  Database,
  Code2,
  MapPin,
  UtensilsCrossed,
  Smartphone,
  Compass,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  Counter,
  ShimmerButton,
} from "@/components/motion";
import {
  ABOUT_STATS,
  JOURNEY_MILESTONES,
  DIGITAL_PRODUCTS,
  DIGITAL_TOOL_CATEGORIES,
  WHAT_WE_DO,
  OUR_APPROACH_STEPS,
  WHY_DIGIVIGEE,
} from "@/data/about";
import { TeamMember, AboutPageContent } from "@/types";

interface AboutClientViewProps {
  teamMembers: TeamMember[];
  content?: AboutPageContent;
}

export default function AboutClientView({ teamMembers, content }: AboutClientViewProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>("all");

  const activePhase = JOURNEY_MILESTONES[activePhaseIndex];
  const activeStep = OUR_APPROACH_STEPS[activeStepIndex];

  // Headline staggered text reveal variants (Apple/Stripe GPU physics)
  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  // Icon selector helper
  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case "Target":
        return <Target className={className} />;
      case "MessageSquare":
        return <MessageSquare className={className} />;
      case "Users":
        return <Users className={className} />;
      case "Cpu":
        return <Cpu className={className} />;
      case "Share2":
        return <Share2 className={className} />;
      case "BarChart3":
        return <BarChart3 className={className} />;
      case "Receipt":
        return <Receipt className={className} />;
      case "CreditCard":
        return <CreditCard className={className} />;
      case "Globe":
        return <Globe className={className} />;
      case "Zap":
        return <Zap className={className} />;
      case "Layers":
        return <Layers className={className} />;
      case "Bot":
        return <Bot className={className} />;
      case "Database":
        return <Database className={className} />;
      case "Code2":
        return <Code2 className={className} />;
      case "TrendingUp":
        return <TrendingUp className={className} />;
      case "MapPin":
        return <MapPin className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#FCFDFD] text-[#0C1628]">
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(0,135,68,0.08),transparent)]"
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Official Master Copy                                    */}
      {/* ========================================================================= */}
      <section className="relative pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-14 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Master Headline */}
          <motion.div
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1 mb-6"
          >
            <motion.h1
              variants={lineVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0C1628] leading-[1.1]"
            >
              {content?.heroHeadline || "Your Digital Partner for"}
            </motion.h1>
            <motion.h1
              variants={lineVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-[#0C1628] via-[#008744] to-[#0C1628]"
            >
              {content?.heroHeadlineHighlight || "Technology, Tools & Business Growth."}
            </motion.h1>
          </motion.div>

          {/* Master Subtitle */}
          <FadeIn delay={0.15} duration={0.5}>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
              {content?.heroSubheadline || "Digivigee is a digital technology and business solutions company helping businesses build, automate, market and grow with the right digital tools, technology and expertise."}
            </p>
          </FadeIn>

          {/* Action Buttons */}
          <FadeIn delay={0.25} duration={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <a href="#products">
                <ShimmerButton
                  className="px-7 py-3.5 rounded-xl bg-[#008744] hover:bg-[#007038] text-white font-bold text-sm shadow-md shadow-emerald-500/20 cursor-pointer"
                  shimmerColor="rgba(255, 255, 255, 0.4)"
                >
                  <span>Explore Our Products &amp; Partner Status</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </a>
              <a
                href="#solutions"
                className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>What We Do</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-sm transition-all"
              >
                Talk to Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Performance Metrics Ribbon (Est. 2016) */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FadeIn direction="up" distance={16} duration={0.5}>
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-lg shadow-slate-900/5 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {ABOUT_STATS.map((stat, idx) => (
              <div
                key={idx}
                className={`text-center flex flex-col justify-center ${
                  idx > 1 ? "pt-4 lg:pt-0" : ""
                }`}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0C1628] tracking-tight mb-0.5">
                  <Counter
                    from={stat.value > 1000 ? 2000 : 0}
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    duration={1.5}
                    useGrouping={stat.useGrouping}
                    className="text-[#008744]"
                  />
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#0C1628]">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {stat.caption}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ========================================================================= */}
      {/* 2. PROPRIETARY PRODUCTS & OFFICIAL META PARTNER (MOVED UP TO POSITION #2) */}
      {/* This delivers instant proof, authority, and attraction right away!        */}
      {/* ========================================================================= */}
      <section id="products" className="py-16 sm:py-20 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <FadeIn distance={14}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.1em] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tangible Proof &amp; Verified Credibility</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C1628] tracking-tight mb-3">
                Proprietary Products &amp; Official Meta Partner
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                We don&apos;t just consult—we build and run market-tested software platforms alongside certified Meta advertising leadership.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product 1: RestroMitra */}
            <FadeIn delay={0.05} distance={16}>
              <div className="h-full rounded-2xl bg-white p-7 border border-slate-200/90 hover:border-emerald-500/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#008744] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      SAAS PRODUCT
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Cloud Platform
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-[#008744] flex items-center justify-center shrink-0">
                      <UtensilsCrossed className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#0C1628] group-hover:text-[#008744] transition-colors">
                        RestroMitra
                      </h3>
                      <div className="text-[11px] font-bold text-slate-500 uppercase">
                        Restaurant Management SaaS
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 mb-4 text-xs font-bold text-slate-900">
                    &ldquo;Make restaurant management smarter and simpler.&rdquo;
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Restaurant-focused SaaS designed to simplify management, improve operational efficiency and adopt modern digital tech.
                  </p>

                  <div className="space-y-1.5 mb-6 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-[#008744] stroke-[3]" />
                      <span>Smart Billing &amp; Cloud POS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-[#008744] stroke-[3]" />
                      <span>WhatsApp Bill Delivery &amp; KDS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-[#008744] stroke-[3]" />
                      <span>Real-time Table &amp; Stock Sync</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live &amp; Scaling
                  </span>
                  <Link
                    href="/products/restromitra"
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#008744] hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Product 2: Maru Gujarat */}
            <FadeIn delay={0.1} distance={16}>
              <div className="h-full rounded-2xl bg-white p-7 border border-slate-200/90 hover:border-blue-500/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      ANDROID ECOSYSTEM
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Mobile Application
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#0C1628] group-hover:text-blue-600 transition-colors">
                        Maru Gujarat
                      </h3>
                      <div className="text-[11px] font-bold text-slate-500 uppercase">
                        Business Listing &amp; Directory
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 mb-4 text-xs font-bold text-slate-900">
                    &ldquo;Local businesses. Local discovery. Digital visibility.&rdquo;
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Android application connecting Gujarat businesses and customers through a verified directory platform.
                  </p>

                  <div className="space-y-1.5 mb-6 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                      <span>Gujarat-wide Business Directory</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                      <span>Direct Click-to-WhatsApp Leads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                      <span>Hyperlocal Merchant Discovery</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Live on Play Store
                  </span>
                  <Link
                    href="/products/maru-gujarat"
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Official Meta Partner Card */}
            <FadeIn delay={0.15} distance={16}>
              <div className="h-full rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/40 p-7 border border-blue-200/80 hover:border-blue-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      OFFICIAL PARTNER
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Facebook &amp; Instagram
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#0C1628]">
                        Meta Business Partner
                      </h3>
                      <div className="text-[11px] font-bold text-blue-600 uppercase">
                        Official Certified Status
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white/90 border border-slate-200/70 mb-4 text-xs font-bold text-slate-900">
                    &ldquo;Beyond advertisements: strategy, audience, creative, CAPI &amp; ROI.&rdquo;
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Digivigee is an official Meta Partner helping businesses unlock Facebook and Instagram with full-funnel execution.
                  </p>

                  <div className="space-y-1.5 mb-6 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                      <span>Custom Audience Segmentation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                      <span>Server-Side CAPI Telemetry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-600 stroke-[3]" />
                      <span>Creative Ad Fatigue Management</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Meta Certified
                  </span>
                  <Link
                    href="/services/meta-partner"
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>Scale Retainers</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. UNIFIED SOLUTIONS & 10 DIGITAL TOOLS ECOSYSTEM (COMBINED HUB)          */}
      {/* Merged "What We Do" (6 areas) and "Digital Tools" (10 items) into 1 block  */}
      {/* ========================================================================= */}
      <section id="solutions" className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <FadeIn distance={14}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.1em] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Everything Under One Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0C1628] tracking-tight mb-3">
              What We Do &amp; The Digital Tools Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Businesses should not have to deal with 10 different vendors. We bring tools, software, automation, and marketing together.
            </p>
          </FadeIn>
        </div>

        {/* 6 Core Solutions Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {WHAT_WE_DO.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-6 border border-slate-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#008744] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {renderIcon(item.icon, "w-5 h-5")}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  {item.category}
                </div>
                <h3 className="text-lg font-extrabold text-[#0C1628] group-hover:text-[#008744] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 10 Digital Tool Categories - Compact Interactive Strip */}
        <div className="rounded-2xl bg-slate-50/80 p-6 sm:p-7 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-200/60">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#008744]">
                10 Dedicated Categories
              </div>
              <h4 className="text-lg font-extrabold text-[#0C1628]">
                Explore Digital Tools &amp; Business Technology
              </h4>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Click to preview capability
            </span>
          </div>

          {/* Quick-filter pill buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedToolCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedToolCategory === "all"
                  ? "bg-[#0C1628] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              All 10 Categories
            </button>
            {DIGITAL_TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedToolCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedToolCategory === cat.id
                    ? "bg-[#008744] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {renderIcon(cat.icon, "w-3.5 h-3.5")}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Compact Mini Grid for Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {DIGITAL_TOOL_CATEGORIES.filter(
              (c) => selectedToolCategory === "all" || selectedToolCategory === c.id
            ).map((cat, idx) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#008744] flex items-center justify-center">
                      {renderIcon(cat.icon, "w-4 h-4")}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-[#0C1628] mb-1">
                    {cat.name}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-bold text-[#008744]">
                  {cat.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY DIGIVIGEE & 6-STEP APPROACH (COMPACT HIGH-DENSITY SECTION)         */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Why Digivigee & Philosophy */}
            <div className="lg:col-span-6 space-y-5">
              <FadeIn distance={14}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.1em]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>The Digivigee Standard</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0C1628] tracking-tight">
                  Technology Should Make Business Easier
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Businesses today need more than just a website. They need tools to manage customers, generate leads, automate communication, manage operations, promote their brand, and improve productivity.
                </p>

                {/* Why Digivigee Bullet Points */}
                <div className="space-y-2 pt-2">
                  {[
                    "Multiple digital solutions under one unified ecosystem",
                    "Technology combined with business-focused thinking",
                    "Practical tools for automation, marketing and productivity",
                    "Custom website and application development capabilities",
                    "SaaS products developed for specific business needs",
                    "Official Meta Partner for high-impact social advertising",
                    "Solutions designed around the actual requirements of each business",
                  ].map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#008744] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Mission & Vision Mini Bento */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#008744] mb-1">
                      Our Mission
                    </div>
                    <p className="text-[11px] font-medium text-slate-700 leading-snug">
                      To make powerful digital technology accessible, practical and useful for businesses of every size.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">
                      Our Vision
                    </div>
                    <p className="text-[11px] font-medium text-slate-700 leading-snug">
                      To build a complete digital ecosystem where businesses find the technology, tools and expertise to operate smarter.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: 6-Step Interactive Approach */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
              <FadeIn distance={14} delay={0.1}>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Our 6-Step Methodology
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0C1628]">
                      Understand → Strategize → Build → Implement → Optimize → Grow
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#008744] bg-emerald-50 px-2 py-1 rounded-md">
                    Linear Flow
                  </span>
                </div>

                {/* 6 Step Interactive Tabs */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {OUR_APPROACH_STEPS.map((st, idx) => {
                    const isSelected = activeStepIndex === idx;
                    return (
                      <button
                        key={st.step}
                        onClick={() => setActiveStepIndex(idx)}
                        className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#008744] text-white shadow-xs"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70"
                        }`}
                      >
                        <div className="text-[10px] font-bold opacity-80">
                          0{st.step}
                        </div>
                        <div className="text-[11px] font-extrabold truncate">
                          {st.title}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Step Box */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#008744]">
                      Phase 0{activeStep.step}: {activeStep.title}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {activeStep.tagline}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {activeStep.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100/80 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    The objective is not to add technology for the sake of technology, but to use it where it creates real value.
                  </p>
                  <Link
                    href="/contact"
                    className="shrink-0 px-4 py-2 rounded-lg bg-[#008744] hover:bg-[#007038] text-white text-xs font-bold transition-all"
                  >
                    Start Step 01
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. A DECADE OF GROWTH (2016–2026) & LEADERSHIP TEAM (COMPACT TRUST)       */}
      {/* ========================================================================= */}
      <section id="team" className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <FadeIn distance={14}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.1em] mb-3">
              <Milestone className="w-3.5 h-3.5" />
              <span>Proven Track Record &amp; Direct Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0C1628] tracking-tight mb-3">
              10 Years of Innovation Driven by Builders
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Founded in 2016. Senior practitioners who directly oversee your software codebases, Meta ad budgets, and automation workflows.
            </p>
          </FadeIn>
        </div>

        {/* Compact 4-Phase Timeline Bar */}
        <div className="p-2 bg-slate-100/80 rounded-xl max-w-3xl mx-auto border border-slate-200/80 flex flex-wrap justify-center gap-2 mb-6">
          {JOURNEY_MILESTONES.map((item, idx) => {
            const isSelected = activePhaseIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActivePhaseIndex(idx)}
                className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "text-[#0C1628] shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeJourneyTabCompact"
                    className="absolute inset-0 bg-white rounded-lg border border-slate-200/80 shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 text-[11px] font-black uppercase text-emerald-700">
                  {item.year}
                </span>
                <span className="relative z-10 hidden sm:inline-block">
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Phase Card (Compact) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm max-w-4xl mx-auto mb-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#008744] font-bold text-xs uppercase">
                {activePhase.phase} • {activePhase.year}
              </span>
              <h3 className="text-xl font-extrabold text-[#0C1628] mt-2">
                {activePhase.title}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-[#008744]">
                {activePhase.keyMetric.value}
              </div>
              <div className="text-[11px] font-semibold text-slate-400">
                {activePhase.keyMetric.label}
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            {activePhase.narrative}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
            {activePhase.milestones.map((m, mIdx) => (
              <div key={mIdx} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#008744] shrink-0 stroke-[3]" />
                <span className="truncate">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team Grid (3x2 Balanced) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {teamMembers.map((member, idx) => (
            <div
              key={member.id || idx}
              className="rounded-2xl bg-white p-5 border border-slate-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200/70">
                  <Image
                    src={member.avatar || "/images/team/vipul-gajjar.jpg"}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#0C1628]">
                    LEAD
                  </div>
                </div>

                <h4 className="text-base font-extrabold text-[#0C1628] group-hover:text-[#008744] transition-colors">
                  {member.name}
                </h4>
                <div className="text-[11px] font-bold text-[#008744] uppercase mb-2">
                  {member.role}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-md bg-slate-50 hover:bg-emerald-50 hover:text-[#008744] text-slate-500 flex items-center justify-center transition-colors text-xs font-bold"
                      title="LinkedIn"
                    >
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                  )}
                  {member.socials?.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="w-7 h-7 rounded-md bg-slate-50 hover:bg-emerald-50 hover:text-[#008744] text-slate-500 flex items-center justify-center transition-colors text-xs"
                      title="Direct Email"
                    >
                      <Mail className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
            </div>
          ))}

          {/* On-Demand Practice Pods Card */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#0C1628] to-slate-900 text-white p-5 border border-slate-800 shadow-lg flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#00E05C] border border-emerald-500/30 text-[10px] font-bold uppercase mb-4">
                <Sparkles className="w-3 h-3" />
                <span>On-Demand Practice Pods</span>
              </div>
              <h4 className="text-base font-extrabold text-white mb-2">
                Dedicated Engineers &amp; Creatives
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Every project is backed by specialized engineering pods ready to build, automate, and deploy on demand.
              </p>
              <div className="space-y-1.5 text-[11px] text-slate-300 font-semibold mb-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#00E05C]" />
                  <span>Full-Stack Next.js &amp; Mobile</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#00E05C]" />
                  <span>Certified Meta Ad Strategists</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#00E05C]" />
                  <span>WhatsApp Cloud API Specialists</span>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
            >
              <span>Request Dedicated Pod</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5.5 TEAM SPECIALISTS & AGENCY LEADERSHIP (Live CMS from /admin/team)       */}
      {/* ========================================================================= */}
      <section id="team" className="py-16 sm:py-24 bg-white relative border-t border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={20} duration={0.6}>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.08em] mb-3">
                <Users className="w-3.5 h-3.5" />
                <span>LEADERSHIP &amp; SPECIALISTS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-[-0.03em] text-[#0C1628] leading-[1.15] mb-3">
                The Minds Behind DigiVigee
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Senior growth strategists, Meta certified media buyers, and full-stack software engineers dedicated to scaling your business with precision.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-5 shadow-2xs hover:shadow-md hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with Overlay Accent */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 border border-slate-200/60 bg-slate-100">
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 240px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 font-bold text-xl">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-base font-extrabold text-[#0C1628] tracking-tight mb-1">
                    {member.name}
                  </h3>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#008744] text-[11px] font-bold border border-emerald-200/80 mb-3">
                    {member.role}
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                    {member.bio}
                  </p>
                </div>

                {/* Social & Contact Footer */}
                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {member.socials?.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#0077b5] hover:border-[#0077b5]/40 transition-colors shadow-2xs"
                        title="LinkedIn Profile"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                        </svg>
                      </a>
                    )}
                    {member.socials?.email && (
                      <a
                        href={`mailto:${member.socials.email}`}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#008744] hover:border-emerald-300 transition-colors shadow-2xs"
                        title="Send Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <span className="text-[10.5px] font-mono text-slate-400">
                    Specialist #{member.order}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HIGH-CONVERTING CLOSING CTA: Official Master Copy Specification        */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FCFDFD] relative border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn distance={16} duration={0.5}>
            <div className="rounded-3xl bg-gradient-to-b from-white to-slate-50 p-8 sm:p-12 border border-slate-200/90 shadow-xl shadow-slate-900/5 text-center relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,135,68,0.1),transparent)]"
              />

              <div className="relative z-10 max-w-xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.1em] mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Let&apos;s Build Together</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-[#0C1628] tracking-tight mb-4 leading-tight">
                  Let&apos;s Build Something That Works.
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-5">
                  Whether you need a website, business application, SaaS solution, CRM, WhatsApp automation, AI tools, POS software, digital marketing or a complete digital growth strategy — Digivigee can help you find and implement the right digital solution.
                </p>

                {/* Master Tagline Banner */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-[#008744] text-xs sm:text-sm font-black tracking-wide uppercase mb-5">
                  Digivigee — Tools. Technology. Automation. Growth.
                </div>

                <p className="text-xs font-semibold text-slate-700 italic mb-8">
                  &ldquo;We don&apos;t just help businesses go digital. We help them use digital technology to do business better.&rdquo;
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link href="/contact">
                    <ShimmerButton
                      className="px-7 py-3.5 rounded-xl bg-[#008744] hover:bg-[#007038] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer"
                      shimmerColor="rgba(255, 255, 255, 0.4)"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </ShimmerButton>
                  </Link>
                  <Link
                    href="/contact"
                    className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-bold text-xs uppercase tracking-wider shadow-xs transition-all"
                  >
                    Talk to Us
                  </Link>
                  <a
                    href="#solutions"
                    className="px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Explore Our Solutions
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#008744]" />
                    Official Meta Partner
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#008744]" />
                    In Business Since 2016
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#008744]" />
                    Practical Tools &amp; Solutions
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
