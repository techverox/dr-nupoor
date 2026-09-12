"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ServiceItem } from "@/types";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
} from "lucide-react";

interface ServiceDetailClientViewProps {
  service: ServiceItem;
  relatedServices: ServiceItem[];
}

export default function ServiceDetailClientView({
  service,
  relatedServices,
}: ServiceDetailClientViewProps) {
  // Animation variants (GPU-accelerated transform and opacity only)
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
          1. HERO SECTION: CINEMATIC FIRST IMPRESSION
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
            {service.title}
          </motion.h1>

          {/* User Requested Subtitle */}
          {service.subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.18 }}
              className="text-lg sm:text-2xl font-semibold text-emerald-700 max-w-3xl mx-auto mb-5 tracking-tight"
            >
              {service.subtitle}
            </motion.div>
          )}

          {/* Short Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.24 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8"
          >
            {service.shortDescription}
          </motion.p>

          {/* High-Conversion Action Buttons with Luminous Metallic Sweep */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Link
              href={`/contact?service=${service.slug}`}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#008744] hover:bg-[#009A4E] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden cursor-pointer"
            >
              {/* Metallic Shimmer Sweep Wave */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span>Deploy This Engine Pod</span>
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
            <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs text-left">
              <div className="text-lg sm:text-xl font-black text-slate-900">99.8%</div>
              <div className="text-[11px] font-medium text-slate-500">CSAT Retention Score</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs text-left">
              <div className="text-lg sm:text-xl font-black text-slate-900">&lt;15 Mins</div>
              <div className="text-[11px] font-medium text-slate-500">Direct Slack SLA</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs text-left">
              <div className="text-lg sm:text-xl font-black text-slate-900">1-Click</div>
              <div className="text-[11px] font-medium text-slate-500">Zero-Login Approvals</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs text-left">
              <div className="text-lg sm:text-xl font-black text-slate-900">100%</div>
              <div className="text-[11px] font-medium text-slate-500">Deliverable Guarantee</div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ====================================================================
          2. CORE CAPABILITIES BENTO (CASCADE WATERFALL REVEAL)
          ==================================================================== */}
      {service.capabilities && service.capabilities.length > 0 && (
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#008744]" />
              <span>Engine Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1628] tracking-tight mb-3">
              Engineered for Compounding Delivery
            </h2>
            <p className="text-sm text-slate-500">
              Six modular pillars pre-configured to scale client retainers without operational friction.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {service.capabilities.map((cap, idx) => (
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
        </section>
      )}

      {/* ====================================================================
          3. STANDARDIZED POD RETAINER TIERS (3 BALANCED CARDS)
          ==================================================================== */}
      {service.packages && service.packages.length > 0 && (
        <section
          id="packages"
          className="py-20 sm:py-28 bg-[#F8FAFC] border-y border-slate-200/80 relative"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-[11px] font-bold uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5 text-[#008744]" />
                <span>Standardized Pod Retainers</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1628] tracking-tight mb-3">
                Transparent Pod Pricing
              </h2>
              <p className="text-sm text-slate-500">
                Predictable monthly retainer agreements with guaranteed deliverable quotas and direct Slack access.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
            >
              {service.packages.map((pkg, pIdx) => {
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
                        `/contact?service=${service.slug}&package=${pkg.id}`
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
      )}

      {/* ====================================================================
          4. RETAINER SLA & ARCHITECTURE CHECKLIST (ZERO CLUTTER)
          ==================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-[11px] font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008744]" />
            <span>Retainer SLA Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1628] tracking-tight mb-3">
            Contractual SLA Standards
          </h2>
          <p className="text-sm text-slate-500">
            Every DigiVigee delivery engine pod operates under strict contractual accountability benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Standardized Deliverables */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#008744] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Guaranteed Sprint Deliverables
              </h3>
            </div>
            <div className="space-y-3.5">
              {(service.deliverables && service.deliverables.length > 0
                ? service.deliverables
                : [
                    "Standardized SOPs & Retainer Milestones",
                    "Multi-Client Visual Scheduling & Queue",
                    "1-Click Client Proofing & Feedback Portal",
                    "Weekly Executive Telemetry & Reporting",
                    "Dedicated Senior Specialist Lead",
                    "Direct Emergency Slack Channel Access",
                  ]
              ).map((del, dIdx) => (
                <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Enterprise SLA Benchmarks */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Operational SLA Commitments
                </h3>
              </div>
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-medium text-slate-700">Sub-Hour Slack Response SLA</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    &lt; 15 Mins
                  </span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-medium text-slate-700">Uptime & Delivery Availability</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    99.9%
                  </span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-medium text-slate-700">White-Label Client Security</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    SOC-2 Isolated
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">Contract Lock-In Period</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Month-to-Month
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Backed by 100% Retainer Guarantee</span>
              <span className="text-[#008744] font-bold">Zero Risk Onboarding</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. COMPLEMENTARY ENGINES NAVIGATION
          ==================================================================== */}
      {relatedServices.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#F8FAFC] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-[#0C1628] tracking-tight">
                  Complementary Delivery Engines
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Stack with {service.title} to create a compound agency delivery suite.
                </p>
              </div>
              <Link
                href="/services"
                className="text-xs sm:text-sm font-bold text-[#008744] hover:text-[#009A4E] transition-colors inline-flex items-center gap-1.5 group"
              >
                <span>View All 6 Engines</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-base font-bold text-[#0C1628] group-hover:text-[#008744] transition-colors mb-1.5 flex items-center justify-between">
                      <span>{rel.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#008744] group-hover:translate-x-1 transition-all" />
                    </div>
                    {rel.subtitle && (
                      <div className="text-xs font-semibold text-emerald-700 mb-2">
                        {rel.subtitle}
                      </div>
                    )}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {rel.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          6. HIGH-CONVERSION CTA SECTION (LUMINOUS METALLIC SWEEP)
          ==================================================================== */}
      <section className="py-20 bg-white border-t border-slate-200/80 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#008744]"></span>
            </span>
            <span>Zero Commitment Discovery</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0C1628] tracking-tight mb-4">
            Ready to deploy the {service.title}?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Book a 20-minute architecture discovery call with our senior operations director. We will map your agency workflow and deploy your pod in under 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?service=${service.slug}`}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#008744] hover:bg-[#009A4E] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              <span>Schedule Engine Pod Discovery</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base transition-all"
            >
              <span>Explore All Engines</span>
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
