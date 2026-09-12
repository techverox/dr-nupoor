"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed, Smartphone, Share2 } from "lucide-react";
import { ContactPageContent } from "@/types";

export interface ContactHeroProps {
  product?: string;
  service?: string;
  content?: ContactPageContent;
}

export default function ContactHero({ product, service, content }: ContactHeroProps) {
  /** Contextual headline variation based on searchParams */
  const getHeadline = () => {
    if (product === "restromitra") {
      return { pre: "Schedule Your", main: "RestroMitra Demo." };
    }
    if (product === "marugujarat") {
      return { pre: "List Your Business on", main: "Maru Gujarat." };
    }
    if (service === "meta") {
      return { pre: "Meta Ads & CAPI", main: "Architecture Audit." };
    }
    return {
      pre: content?.heroHeadline || "Let's Build Something",
      main: content?.heroHeadlineHighlight || "Exceptional Together."
    };
  };

  const headline = getHeadline();

  const getSubtitle = () => {
    if (product === "restromitra") {
      return "Direct walkthrough of cloud POS billing, WhatsApp digital receipts, and kitchen display systems with our core engineering team.";
    }
    if (product === "marugujarat") {
      return "Verified local discovery listings across Gujarat's 33 districts. Fast-track onboarding and prime merchant visibility.";
    }
    if (service === "meta") {
      return "Direct review with Meta Certified Media Buyers. Server-side CAPI telemetry, ad creative diagnosis, and scaling roadmaps.";
    }
    return content?.heroSubheadline || "Direct access to senior growth architects and software engineers. No junior middlemen, zero sales fluff, 100% transparent execution.";
  };

  return (
    <section className="relative pt-[92px] sm:pt-[98px] lg:pt-[102px] pb-4 sm:pb-6 overflow-hidden border-b border-slate-200/80">
      {/* Ambient Gradient Glow Layers to eliminate empty white void */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/5 blur-3xl rounded-full pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Minimalist Bold Headline — Shifted up cleanly */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-[#0C1628] leading-[1.12] mb-3 sm:mb-4">
          {headline.pre}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008744] via-emerald-600 to-[#0C1628]">
            {headline.main}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-5">
          {getSubtitle()}
        </p>

        {/* Enterprise Partner & Credentials Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] font-semibold text-slate-700 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008744]" />
            Meta Business Partner
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Google Cloud Partner
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            Razorpay Verified
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            250+ Growth Retainers
          </span>
        </div>

        {/* Optional Context Switcher Tabs */}
        {(product || service) && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs mt-3">
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs transition-colors"
            >
              &larr; Standard Consultation
            </Link>
            {product === "restromitra" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#008744] font-bold">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>RestroMitra Demo Context Active</span>
              </span>
            )}
            {product === "marugujarat" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 font-bold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Maru Gujarat Listing Context Active</span>
              </span>
            )}
            {service === "meta" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#008744] font-bold">
                <Share2 className="w-3.5 h-3.5" />
                <span>Meta Partner Ad Audit Context Active</span>
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
