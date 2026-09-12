"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { SolutionItem } from "@/data/solutions";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Check,
} from "lucide-react";

interface SolutionDetailViewProps {
  solution: SolutionItem;
  relatedSolutions: SolutionItem[];
}

export default function SolutionDetailView({
  solution,
  relatedSolutions,
}: SolutionDetailViewProps) {
  // GPU-accelerated variants
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 350,
        damping: 28,
        delay: custom * 0.08,
      },
    }),
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative w-full bg-[#FCFDFD] text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-900 overflow-x-hidden">
      {/* Ambient Mouse Spotlight / Background Light Wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 10%, rgba(0, 135, 68, 0.06), rgba(6, 182, 212, 0.04) 50%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 50%, transparent 95%)",
          }}
        />
      </div>

      {/* ====================================================================
          1. HERO SECTION: THE CINEMATIC FIRST IMPRESSION
          ==================================================================== */}
      <section className="relative z-10 pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-16 sm:pb-20 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Word / Line Stagger Reveal Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0C1628] mb-4 leading-[1.1]"
          >
            {solution.title}
          </motion.h1>

          {/* User Requested Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.18 }}
            className="text-lg sm:text-2xl font-semibold text-emerald-700 max-w-3xl mx-auto mb-5 tracking-tight"
          >
            {solution.subtitle}
          </motion.div>

          {/* Short Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.24 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8"
          >
            {solution.heroDescription}
          </motion.p>

          {/* High-Conversion Action Buttons with Luminous Metallic Sweep */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Link
              href={`/contact?solution=${solution.slug}`}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#008744] hover:bg-[#009A4E] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden cursor-pointer"
            >
              {/* Metallic Shimmer Sweep Wave */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span>Deploy {solution.title}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
            >
              <span>Explore Retainer Tiers</span>
            </a>
          </motion.div>

          {/* Live Metric Telemetry Ribbon (Psychological Trust) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.38 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200/70"
          >
            {solution.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs text-left">
                <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {m.value}
                </div>
                <div className="text-[11px] font-medium text-slate-500">
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ====================================================================
          2. THE TRANSFORMATION MATRIX (BEFORE VS WITH DIGIVIGEE)
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-[11px] font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008744]" />
            <span>The Agency Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1628] tracking-tight mb-3">
            From Operational Chaos to Predictable Delivery
          </h2>
          <p className="text-sm text-slate-500">
            How scaling agencies eliminate operational friction and retain high-ticket clients.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {solution.transformation.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              custom={idx}
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 text-left flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 text-xs text-rose-800 leading-relaxed">
                  <span className="font-bold block mb-1 text-rose-700 flex items-center gap-1.5">
                    <span>❌</span>
                    <span>Fragmented Old Way</span>
                  </span>
                  {item.before}
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
                  <span className="font-bold block mb-1 text-[#008744] flex items-center gap-1.5">
                    <span>✅</span>
                    <span>With DigiVigee OS</span>
                  </span>
                  {item.after}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ====================================================================
          3. CORE CAPABILITIES BENTO (CASCADE WATERFALL REVEAL)
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#008744]" />
              <span>Core Solution Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1628] tracking-tight mb-3">
              Engineered for Agency Retention & Margin
            </h2>
            <p className="text-sm text-slate-500">
              Six foundational modules designed specifically for {solution.title.toLowerCase()}.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {solution.capabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                custom={idx}
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                className="group relative p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#008744] flex items-center justify-center font-bold text-sm border border-emerald-100 mb-5 group-hover:scale-105 group-hover:bg-[#008744] group-hover:text-white transition-all duration-300">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0C1628] mb-2 group-hover:text-[#008744] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          4. 3-STEP STREAMLINED WORKFLOW ENGINE
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#008744]" />
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1628] tracking-tight mb-3">
            Deploy in Three Simple Steps
          </h2>
          <p className="text-sm text-slate-500">
            Go live with your team and client workspaces in less than 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {solution.workflowSteps.map((ws, sIdx) => (
            <div
              key={sIdx}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 text-left relative"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs">
                {ws.step}
              </div>
              <h3 className="text-lg font-bold text-[#0C1628]">{ws.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {ws.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          5. STANDARDIZED POD RETAINER TIERS (3 BALANCED CARDS)
          ==================================================================== */}
      <section
        id="packages"
        className="py-20 sm:py-28 bg-[#F8FAFC] border-t border-slate-200/80 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-[11px] font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-[#008744]" />
              <span>Standardized Retainer Tiers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1628] tracking-tight mb-3">
              Transparent Operating Packages
            </h2>
            <p className="text-sm text-slate-500">
              Predictable monthly agreements with guaranteed client quotas and sub-15 minute Slack response SLAs.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            {solution.packages.map((pkg, pIdx) => {
              const isFeatured = pkg.isPopular || pIdx === 1;
              return (
                <motion.div
                  key={pkg.id || pIdx}
                  variants={fadeIn}
                  custom={pIdx}
                  whileHover={{
                    y: -4,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    isFeatured
                      ? "bg-white border-2 border-[#008744] shadow-xl shadow-emerald-600/10"
                      : "bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300"
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#008744] text-white text-[10.5px] font-black uppercase tracking-wider shadow-xs">
                      Most Selected Pod
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed min-h-[36px] mb-6">
                      {pkg.description}
                    </p>

                    <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-100">
                      <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        / {pkg.billingPeriod || "monthly"}
                      </span>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Included Deliverables:
                      </div>
                      {pkg.features.map((f, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={
                      pkg.ctaLink ||
                      `/contact?solution=${solution.slug}&package=${pkg.id}`
                    }
                    className={`w-full text-center py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 block ${
                      isFeatured
                        ? "bg-[#008744] hover:bg-[#009A4E] text-white shadow-md shadow-emerald-500/20 active:scale-[0.98]"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900 active:scale-[0.98]"
                    }`}
                  >
                    {pkg.ctaText || "Deploy Pod Workflow"}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          6. COMPLEMENTARY SOLUTIONS NAVIGATION
          ==================================================================== */}
      {relatedSolutions.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-[#0C1628] tracking-tight">
                  Complementary Solutions
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Explore how DigiVigee powers other specialized agency models.
                </p>
              </div>
              <Link
                href="/solutions"
                className="text-xs sm:text-sm font-bold text-[#008744] hover:text-[#009A4E] transition-colors inline-flex items-center gap-1.5 group"
              >
                <span>View All Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedSolutions.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/solutions/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-base font-bold text-[#0C1628] group-hover:text-[#008744] transition-colors mb-1.5 flex items-center justify-between">
                      <span>{rel.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#008744] group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-xs font-semibold text-emerald-700 mb-2">
                      {rel.subtitle}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {rel.heroDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          7. HIGH-CONVERSION CTA SECTION (LUMINOUS METALLIC SWEEP)
          ==================================================================== */}
      <section className="py-20 bg-[#F8FAFC] border-t border-slate-200/80 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-[#008744] text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#008744]"></span>
            </span>
            <span>Zero Commitment Discovery</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0C1628] tracking-tight mb-4">
            Ready to deploy {solution.title}?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Book a 20-minute architecture discovery call with our senior operations director. We will map your agency workflow and deploy your pod in under 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?solution=${solution.slug}`}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#008744] hover:bg-[#009A4E] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              <span>Schedule Architecture Discovery</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-sm sm:text-base transition-all shadow-2xs"
            >
              <span>Explore All Solutions</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span>✓ No Long-term Lock-in</span>
            <span>✓ 24h Pod Onboarding</span>
            <span>✓ Dedicated Slack Channel</span>
          </div>
        </div>
      </section>
    </div>
  );
}
