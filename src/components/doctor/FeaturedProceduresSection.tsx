"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export interface ProcedureHighlight {
  title: string;
  category: string;
  image: string;
  description: string;
  points: string[];
  href: string;
}

export const ADVANCED_PROCEDURES: ProcedureHighlight[] = [
  {
    title: "Breast Conservation Surgery",
    category: "Organ-Preserving Surgery",
    image: "/images/doctor/assets/service-1.png",
    description: "Selective excision of the cancerous tumor along with a safe perimeter of healthy tissue while preserving the natural breast.",
    points: ["Equivalent long-term survival to full mastectomy", "Preserves natural breast tissue & sensory nerve function", "Combined with SLNB to avoid arm lymphedema"],
    href: "/breast-conservation-surgery-ahmedabad",
  },
  {
    title: "Oncoplastic Breast Surgery",
    category: "Aesthetic Onco-Surgery",
    image: "/images/doctor/assets/service-2.png",
    description: "Combines complete oncologic tumor resection with plastic surgical techniques to reshape and contour the remaining breast tissue.",
    points: ["Avoids post-surgical tissue indentations", "Therapeutic mammoplasty for larger breasts", "Contralateral balancing for balanced symmetry"],
    href: "/oncoplastic-breast-surgery-ahmedabad",
  },
  {
    title: "Modified Radical Mastectomy",
    category: "Definitive Resection",
    image: "/images/doctor/assets/service-4.png",
    description: "Careful complete removal of breast tissue and axillary nodes when multicentric disease or personal preference dictates radical clearance.",
    points: ["Thorough clearance for complex or multicentric tumors", "Immediate or delayed flap/implant reconstruction options", "100% Cashless Mediclaim & corporate TPA empaneled"],
    href: "/mastectomy-ahmedabad",
  },
  {
    title: "Sentinel Lymph Node Biopsy (SLNB)",
    category: "Precision Axillary Staging",
    image: "/images/doctor/assets/service-3.png",
    description: "Radioactive tracer & blue dye mapping to evaluate only the primary filtering lymph nodes, protecting arm lymphatic drainage.",
    points: ["Over 90% reduction in painful chronic arm swelling", "Dual-tracer radio-probe guided accuracy", "Conducted during lumpectomy or mastectomy"],
    href: "/sentinel-lymph-node-biopsy",
  },
];

export default function FeaturedProceduresSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#FAF7F8] border-b border-[#F5E6EA]" id="advanced-procedures">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              SURGICAL INNOVATION
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
              Specialised Breast Surgery Procedures
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Combining oncologic precision with aesthetic preservation to give patients both optimal cure rates and confidence.
            </p>
          </div>

          <div>
            <Link
              href="/breast-cancer-surgery"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#88213B] hover:text-[#6E172E] px-5 py-2.5 rounded-full bg-white border border-[#EED7DC] shadow-xs hover:shadow transition-all"
            >
              <span>Explore All Procedures</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Large Visual Procedure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ADVANCED_PROCEDURES.map((proc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#F0D5DC] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D84C70]/50 transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative w-full h-56 sm:h-64 bg-[#FFF8F9] overflow-hidden">
                <Image
                  src={proc.image}
                  alt={proc.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider text-white bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {proc.category}
                </span>
                <h3 className="absolute bottom-4 left-4 right-4 font-serif text-xl sm:text-2xl font-bold text-white drop-shadow">
                  {proc.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {proc.description}
                </p>

                <div className="space-y-2 py-1">
                  {proc.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={proc.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#88213B] group-hover:text-[#6E172E] transition-colors"
                  >
                    <span>View Procedure Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/appointments"
                    className="text-[11px] font-semibold text-slate-500 hover:text-[#9B2846] transition-colors"
                  >
                    Book Consult →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
