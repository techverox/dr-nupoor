"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Scissors, Layers, HeartPulse } from "lucide-react";

export interface TreatmentCard {
  title: string;
  shortDesc: string;
  clinicalNote: string;
  href: string;
  icon: React.ReactNode;
}

export const TREATMENTS: TreatmentCard[] = [
  {
    title: "Breast Conservation Surgery",
    shortDesc: "Organ-preserving tumor removal (lumpectomy) with a clear margin of healthy tissue.",
    clinicalNote: "Provides the same overall survival rate as mastectomy when paired with post-operative radiation.",
    href: "/breast-conservation-surgery-ahmedabad",
    icon: <Sparkles className="w-5 h-5 text-[#9B2846]" />,
  },
  {
    title: "Mastectomy",
    shortDesc: "Complete surgical removal of breast tissue when clinically necessary or preferred.",
    clinicalNote: "Includes Total, Modified Radical (MRM), Skin-Sparing, and Nipple-Sparing techniques.",
    href: "/mastectomy-ahmedabad",
    icon: <Scissors className="w-5 h-5 text-[#9B2846]" />,
  },
  {
    title: "Sentinel Lymph Node Biopsy",
    shortDesc: "Targeted evaluation of the primary 'gatekeeper' lymph nodes draining the tumor area.",
    clinicalNote: "Spares unnecessary axillary node removal, dramatically reducing chronic arm lymphedema risk.",
    href: "/sentinel-lymph-node-biopsy",
    icon: <ShieldCheck className="w-5 h-5 text-[#9B2846]" />,
  },
  {
    title: "Oncoplastic Breast Surgery",
    shortDesc: "Harmonizing radical tumor resection with plastic surgical tissue rearrangement.",
    clinicalNote: "Preserves natural breast contour, prevents surgical defects, and offers contralateral balancing.",
    href: "/oncoplastic-breast-surgery-ahmedabad",
    icon: <Layers className="w-5 h-5 text-[#9B2846]" />,
  },
  {
    title: "Axillary Lymph Node Surgery",
    shortDesc: "Careful staging and therapeutic clearance of affected underarm lymph nodes.",
    clinicalNote: "Guided by ultrasound and sentinel node biopsy to ensure complete regional disease eradication.",
    href: "/sentinel-lymph-node-biopsy",
    icon: <HeartPulse className="w-5 h-5 text-[#9B2846]" />,
  },
  {
    title: "Breast Reconstruction",
    shortDesc: "Restoring natural breast shape using cohesive silicone implants or autologous tissue flaps.",
    clinicalNote: "Offered simultaneously during cancer surgery (immediate) or post-cancer recovery (delayed).",
    href: "/breast-reconstruction-surgery-ahmedabad",
    icon: <Sparkles className="w-5 h-5 text-[#9B2846]" />,
  },
];

export default function BreastCancerTreatments() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-[#F5E6EA]" id="cancer-treatments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            EVIDENCE-BASED SURGICAL ONCOLOGY
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
            Breast Cancer Treatment &amp; Surgery in Ahmedabad
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Surgical planning is personalized for each patient based on tumor biology, cancer stage, breast anatomy, and long-term quality of life. Explore modern surgical options led by Dr. Noopur Patel.
          </p>
        </div>

        {/* 6 Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F8] rounded-2xl border border-[#F0D5DC] p-6 shadow-sm hover:shadow-md hover:border-[#9B2846]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EED7DC] flex items-center justify-center mb-4 shadow-xs group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-[#9B2846] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed mb-3">
                  {item.shortDesc}
                </p>
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/80 border border-[#F5DCE2] text-[11px] text-slate-600 mb-6">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.clinicalNote}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0D5DC]">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#88213B] group-hover:text-[#6E172E] transition-colors"
                >
                  <span>Explore Procedure</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to View All Breast Cancer Treatments */}
        <div className="mt-12 text-center">
          <Link
            href="/breast-cancer-surgery"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9B2846] to-[#88213B] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#9B2846]/20 hover:brightness-105 active:scale-95 transition-all"
          >
            <span>View All Breast Cancer Treatments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
