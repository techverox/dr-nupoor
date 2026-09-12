"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Tag,
  Sparkles,
  Layers,
  Star,
  Quote,
  Users,
  Check,
  ArrowUpRight,
  AlertCircle,
  Activity,
  Workflow,
  Clock,
} from "lucide-react";
import { PortfolioItem } from "@/types";
import { ShimmerButton } from "@/components/motion";
import SocialProofBar from "@/components/SocialProofBar";

interface CaseStudyDetailClientViewProps {
  item: PortfolioItem;
  relatedItems: PortfolioItem[];
}

export default function CaseStudyDetailClientView({
  item,
  relatedItems,
}: CaseStudyDetailClientViewProps) {
  return (
    <div className="relative min-h-screen bg-[#FCFDFD] text-[#0C1628] selection:bg-emerald-500/20 selection:text-emerald-900 font-sans">
      
      {/* 1. Subtle Ambient Gradient Wash */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[650px] bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(0,135,68,0.06),transparent_70%)] pointer-events-none"
      />

      {/* ====================================================================
          HERO SECTION: EXECUTIVE IMPACT HEADLINE & CLIENT METADATA
          ==================================================================== */}
      <section className="pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-14 sm:pb-16 relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Primary Case Study Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0C1628] mb-6 leading-[1.15]">
            {item.title}
          </h1>

          {/* Subtitle / Context */}
          <p className="text-base sm:text-lg text-[#475569] max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            {item.shortDescription}
          </p>

          {/* Client Metadata Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-[#008744]" />
              <span>
                Client: <strong className="text-slate-900">{item.clientName}</strong>
              </span>
            </span>

            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <Tag className="w-3.5 h-3.5 text-[#008744]" />
              <span>
                Industry: <strong className="text-slate-900">{item.industry}</strong>
              </span>
            </span>

            {item.authorName && (
              <span className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                {item.authorAvatar && (
                  <span className="relative w-5 h-5 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <Image
                      src={item.authorAvatar}
                      alt={item.authorName}
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </span>
                )}
                <span>
                  Leader: <strong className="text-slate-900">{item.authorName}</strong> ({item.authorRole || "Partner"})
                </span>
              </span>
            )}
          </div>

        </div>
      </section>

      {/* ====================================================================
          2. KEY METRICS RIBBON WITH DESCRIPTIONS
          ==================================================================== */}
      {item.metrics && item.metrics.length > 0 && (
        <section className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {item.metrics.map((m, idx) => (
              <div key={idx} className="space-y-1.5 flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl font-black text-[#008744] tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs font-bold text-[#0C1628] uppercase tracking-wider">
                  {m.label}
                </div>
                {m.description && (
                  <div className="text-[11px] text-slate-500 font-medium leading-snug">
                    {m.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================================
          3. MAIN CONTENT CONTAINER
          ==================================================================== */}
      <section className="pb-20 sm:pb-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Visual Hero Media Banner */}
        {item.heroImage && item.heroImage.trim().length > 0 && (
          <div className="relative w-full h-[320px] sm:h-[460px] rounded-3xl overflow-hidden shadow-md border border-slate-200/80 bg-slate-100 isolate">
            <Image
              src={item.heroImage.trim()}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-xs font-bold border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Commercial Audit</span>
              </span>
              <span className="text-xs font-semibold text-white/90 drop-shadow-xs hidden sm:inline-block">
                {item.clientName} • Case Study #{item.order || 1}
              </span>
            </div>
          </div>
        )}

        {/* Executive Summary Brief Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 mb-4 text-[#008744] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Executive At-A-Glance Brief</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-left">
            <div className="space-y-1.5 border-l-2 border-rose-400 pl-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Constraint</div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {item.challenge}
              </p>
            </div>
            <div className="space-y-1.5 border-l-2 border-blue-400 pl-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Engine Solution</div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {item.strategy}
              </p>
            </div>
            <div className="space-y-1.5 border-l-2 border-emerald-400 pl-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Measured Outcome</div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {item.results}
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================================
            4. THE 4-PHASE DEEP DIVE NARRATIVE
            ==================================================================== */}
        <div className="space-y-8 text-slate-800">
          
          {/* Phase 01: The Bottleneck */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-2xs space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider border border-rose-200/70">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Phase 01: The Operational Bottleneck</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Pre-DigiVigee Legacy State</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1628] tracking-tight">
              Operational Friction & Scalability Ceilings
            </h2>

            <div className="text-base text-[#475569] leading-relaxed whitespace-pre-line">
              {item.challenge}
            </div>

            {/* Before Pain Points List */}
            {item.beforePoints && item.beforePoints.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Critical Vulnerabilities Identified:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.beforePoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-rose-50/40 p-3 rounded-xl border border-rose-100">
                      <span className="text-rose-600 font-bold shrink-0 mt-0.5">✕</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phase 02: Strategic Architecture & Modules */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-2xs space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200/70">
                <Workflow className="w-3.5 h-3.5" />
                <span>Phase 02: System Blueprint & Strategy</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Architecture Mapping</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1628] tracking-tight">
              DigiVigee Engine Architecture Deployed
            </h2>

            <div className="text-base text-[#475569] leading-relaxed whitespace-pre-line">
              {item.strategy}
            </div>

            {/* Platform Modules Deployed */}
            {item.servicesDelivered && item.servicesDelivered.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Platform Delivery Engines Installed:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {item.servicesDelivered.map((svc, sIdx) => (
                    <Link
                      key={sIdx}
                      href="/services"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80 hover:border-slate-300 transition-colors group/pill"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#008744]" />
                      <span>{svc}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover/pill:text-slate-900 group-hover/pill:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phase 03: Fast-Track Execution */}
          {item.execution && (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-2xs space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200/70">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Phase 03: Rapid Onboarding & Integration</span>
                </div>
                <span className="text-xs font-mono text-slate-400">48-Hour SLA Execution</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1628] tracking-tight">
                Execution Protocol & Workflow Calibration
              </h2>

              <div className="text-base text-[#475569] leading-relaxed whitespace-pre-line">
                {item.execution}
              </div>

              {/* Execution Milestones */}
              {item.executionMilestones && item.executionMilestones.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Integration Milestones Achieved:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.executionMilestones.map((milestone, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-amber-50/30 p-3 rounded-xl border border-amber-100">
                        <Check className="w-3.5 h-3.5 text-amber-600 font-bold shrink-0 mt-0.5" />
                        <span>{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Phase 04: Verified Compounding Results */}
          <div className="bg-gradient-to-b from-white to-emerald-50/40 p-8 sm:p-10 rounded-3xl border border-emerald-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008744] text-white text-xs font-bold uppercase tracking-wider shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Phase 04: Audited Retainer Telemetry</span>
              </div>
              <span className="text-xs font-mono text-[#008744] font-semibold">100% Commercial Telemetry Verified</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1628] tracking-tight">
              Compounding Retention & Revenue Expansion
            </h2>

            <div className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {item.results}
            </div>

            {/* After Superpowers List */}
            {item.afterPoints && item.afterPoints.length > 0 && (
              <div className="pt-4 border-t border-emerald-200/70 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Operational Superpowers Unlocked:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.afterPoints.map((point, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-white/90 p-3 rounded-xl border border-emerald-200 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-[#008744] shrink-0 mt-0.5" />
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ====================================================================
            5. VERIFIED CLIENT TESTIMONIAL QUOTE
            ==================================================================== */}
        {item.testimonialQuote && (
          <div className="relative bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm text-left overflow-hidden">
            <Quote className="w-12 h-12 text-emerald-500/20 absolute top-6 right-6 pointer-events-none" />
            
            <div className="flex items-center gap-1.5 mb-4 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-slate-400 ml-2">5.0 / 5.0 Verified Retainer Rating</span>
            </div>

            <blockquote className="text-lg sm:text-xl font-semibold text-[#0C1628] leading-relaxed mb-6">
              &ldquo;{item.testimonialQuote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
              {item.authorAvatar ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <Image
                    src={item.authorAvatar}
                    alt={item.authorName || "Client Leader"}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0">
                  {item.authorName ? item.authorName.charAt(0) : "C"}
                </div>
              )}
              <div>
                <div className="text-sm font-bold text-[#0C1628] flex items-center gap-1.5">
                  <span>{item.authorName}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#008744]" />
                </div>
                <div className="text-xs text-slate-500">
                  {item.authorRole} • <strong className="text-slate-700 font-semibold">{item.clientName}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            6. HIGH-CONVERTING LIGHT-FIRST CTA CARD
            ==================================================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white to-emerald-50/50 border border-emerald-200/90 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-[#008744] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Similar Retainer Compounding?</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0C1628] tracking-tight">
            Schedule a 30-Minute Agency Growth Diagnostic
          </h3>

          <p className="text-sm sm:text-base text-[#475569] max-w-xl mx-auto">
            Our enterprise solutions team will review your agency ad ops, client reporting, and retainer billing structure to identify immediate margin expansion.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact">
              <ShimmerButton
                shimmerColor="rgba(255, 255, 255, 0.45)"
                className="px-8 py-3.5 rounded-xl bg-[#008744] hover:bg-[#009b4e] text-white font-bold text-sm shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <span>Request Growth Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </ShimmerButton>
            </Link>

            <Link
              href="/portfolio"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0C1628] font-bold text-sm border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors"
            >
              Browse All Case Studies
            </Link>
          </div>
        </div>

      </section>

      {/* ====================================================================
          7. MORE VERIFIED AGENCY STORIES
          ==================================================================== */}
      {relatedItems.length > 0 && (
        <section className="py-16 bg-[#F8FAFC] border-t border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#008744] uppercase tracking-wider">
                  Verified Customer Evidence
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0C1628] mt-1">
                  More Verified Agency Transformations
                </h3>
              </div>
              <Link
                href="/portfolio"
                className="text-xs font-bold text-[#008744] hover:underline inline-flex items-center gap-1"
              >
                <span>View All Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedItems.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/portfolio/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-[#008744] uppercase tracking-wider">
                        {rel.clientName}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {rel.industry}
                      </span>
                    </div>
                    <div className="text-base font-bold text-[#0C1628] group-hover:text-[#008744] transition-colors mb-2 line-clamp-2">
                      {rel.title}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {rel.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold mt-4">
                    <span className="text-[#008744]">
                      {rel.metrics?.[0]?.value ? `${rel.metrics[0].value} ${rel.metrics[0].label}` : "Audited Case Study"}
                    </span>
                    <span className="text-slate-400 group-hover:text-[#008744] group-hover:translate-x-1 transition-all inline-flex items-center gap-1">
                      Read Story →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Partner Trust Strip */}
      <SocialProofBar />

    </div>
  );
}
