"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, Sparkles, Activity, ShieldCheck, HelpCircle } from "lucide-react";

export interface BreastConditionCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  badge: string;
}

export const BREAST_CONDITIONS: BreastConditionCard[] = [
  {
    id: "breast-lump",
    title: "Breast Lump",
    subtitle: "Over 80% are benign",
    description:
      "A new or persistent palpable lump in the breast tissue. Requires prompt Triple Assessment (clinical exam, ultrasound/mammography, and core biopsy if indicated) to rule out malignancy.",
    href: "/breast-lump-treatment-ahmedabad",
    badge: "Most Common",
  },
  {
    id: "fibroadenoma",
    title: "Fibroadenoma",
    subtitle: "Smooth & mobile benign tumor",
    description:
      "Firm, rubbery, highly mobile non-cancerous lumps common in young women aged 15-35. Can be safely monitored or removed via daycare cosmetic excision or stitchless VABB.",
    href: "/fibroadenoma-treatment-ahmedabad",
    badge: "100% Benign",
  },
  {
    id: "breast-pain",
    title: "Breast Pain (Mastalgia)",
    subtitle: "Cyclical & non-cyclical discomfort",
    description:
      "Tenderness, heaviness, or sharp pain related to monthly hormonal fluctuations, fibrocystic changes, or musculoskeletal strain. Detailed clinical evaluation provides reassuring relief.",
    href: "/breast-specialist-doctor-ahmedabad",
    badge: "Symptom Care",
  },
  {
    id: "nipple-discharge",
    title: "Nipple Discharge",
    subtitle: "Spontaneous or expressible fluid",
    description:
      "Clear, milky, green, or bloody discharge from milk ducts. Spontaneous single-duct bloody discharge warrants careful evaluation for intraductal papilloma or duct ectasia.",
    href: "/nipple-discharge-treatment-ahmedabad",
    badge: "Diagnostic Focus",
  },
  {
    id: "benign-conditions",
    title: "Benign Breast Conditions",
    subtitle: "Cysts, infections & fibrocystic changes",
    description:
      "Comprehensive management for simple fluid cysts, lactational mastitis, breast abscesses, fat necrosis, and fibrocystic glandular changes with minimal intervention.",
    href: "/breast-lump-treatment-ahmedabad",
    badge: "Non-Cancerous",
  },
  {
    id: "breast-cancer",
    title: "Breast Cancer",
    subtitle: "Early detection ensures 90%+ cure",
    description:
      "Malignant breast disease diagnosed through tissue biopsy. Managed through personalized surgical oncology: Breast Conservation Surgery (BCS), mastectomy, and tumor board coordination.",
    href: "/breast-cancer-specialist-ahmedabad",
    badge: "Surgical Oncology",
  },
];

export default function BreastConditionsGrid() {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#FAF7F8] border-b border-[#F5E6EA]" id="conditions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-3">
            <AlertCircle className="w-3.5 h-3.5" />
            SYMPTOM &amp; CONDITION EVALUATION
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
            Breast Conditions We Evaluate &amp; Treat
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            Comprehensive care for a wide range of breast conditions.
          </p>
        </div>

        {/* 6 Condition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BREAST_CONDITIONS.map((cond, idx) => (
            <div
              key={cond.id}
              className="bg-white rounded-2xl border border-[#F0D5DC] p-6 shadow-sm hover:shadow-md hover:border-[#D84C70]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF5F7] border border-[#F5CAD5] text-[#D84C70] flex items-center justify-center group-hover:bg-[#D84C70] group-hover:text-white transition-colors duration-300">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#88213B] bg-[#FAF0F3] px-2.5 py-1 rounded-md border border-[#F5D2DB]">
                    {cond.badge}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900 mb-1 group-hover:text-[#88213B] transition-colors">
                  {cond.title}
                </h3>
                <div className="text-xs font-semibold text-[#D84C70] mb-3">
                  {cond.subtitle}
                </div>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-6">
                  {cond.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={cond.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#88213B] group-hover:text-[#6E172E] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#EED7DC] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FCE8ED] text-[#9B2846] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Have a newly detected lump or breast change?</div>
              <div className="text-xs text-slate-600">Avoid anxiety and guesswork. Schedule a gentle, confidential evaluation with Dr. Noopur Patel.</div>
            </div>
          </div>
          <Link
            href="/appointments"
            className="shrink-0 px-6 py-2.5 rounded-xl bg-[#88213B] hover:bg-[#731930] text-white text-xs font-bold transition-colors shadow-sm"
          >
            Book Clinical Checkup
          </Link>
        </div>
      </div>
    </section>
  );
}
