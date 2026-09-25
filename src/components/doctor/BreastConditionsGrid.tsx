"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

export interface BreastConditionCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  badge: string;
  image: string;
}

export const BREAST_CONDITIONS: BreastConditionCard[] = [
  {
    id: "breast-lump",
    title: "Breast Lump",
    subtitle: "Over 80% are benign",
    description:
      "A new or persistent palpable lump in the breast tissue. Requires prompt Triple Assessment to rule out malignancy.",
    href: "/breast-lump-treatment-ahmedabad",
    badge: "Most Common",
    image: "/images/doctor/assets/service-1.png",
  },
  {
    id: "fibroadenoma",
    title: "Fibroadenoma",
    subtitle: "Smooth & mobile benign tumor",
    description:
      "Firm, rubbery, non-cancerous lumps common in young women aged 15-35. Can be safely monitored or removed via daycare excision.",
    href: "/fibroadenoma-treatment-ahmedabad",
    badge: "100% Benign",
    image: "/images/doctor/assets/service-2.png",
  },
  {
    id: "breast-pain",
    title: "Breast Pain",
    subtitle: "Cyclical & non-cyclical discomfort",
    description:
      "Tenderness or heaviness related to hormonal changes or fibrocystic tissue. Detailed evaluation provides reassuring relief.",
    href: "/breast-specialist-doctor-ahmedabad",
    badge: "Symptom Care",
    image: "/images/doctor/assets/service-3.png",
  },
  {
    id: "nipple-discharge",
    title: "Nipple Discharge",
    subtitle: "Spontaneous or expressible fluid",
    description:
      "Clear, milky or bloody discharge from milk ducts. Spontaneous single-duct discharge warrants careful ductal evaluation.",
    href: "/nipple-discharge-treatment-ahmedabad",
    badge: "Diagnostic Focus",
    image: "/images/doctor/assets/condition-ductal.png",
  },
  {
    id: "benign-conditions",
    title: "Benign Conditions",
    subtitle: "Cysts, infections & changes",
    description:
      "Care for simple fluid cysts, lactational mastitis, breast abscesses, and fibrocystic changes with minimal intervention.",
    href: "/breast-lump-treatment-ahmedabad",
    badge: "Non-Cancerous",
    image: "/images/doctor/assets/condition-benign.png",
  },
  {
    id: "breast-cancer",
    title: "Breast Cancer",
    subtitle: "Early detection ensures 90%+ cure",
    description:
      "Malignant breast disease managed through personalized surgical oncology: Breast Conservation Surgery (BCS) & mastectomy.",
    href: "/breast-cancer-specialist-ahmedabad",
    badge: "Surgical Oncology",
    image: "/images/doctor/assets/condition-cancer.png",
  },
];

export default function BreastConditionsGrid() {
  return (
    <section className="w-full py-12 lg:py-24 bg-[#FAF7F8] border-b border-[#F5E6EA]" id="conditions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE8ED] text-[#88213B] text-[10.5px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-2 sm:mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-[#D84C70]" />
            BREAST HEALTH
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
            Breast Conditions We Evaluate &amp; Treat
          </h2>
          <p className="text-slate-600 text-xs sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            From early evaluation to advanced treatment, we provide comprehensive care for a wide range of breast conditions.
          </p>
        </div>

        {/* 6 Condition Cards Grid - 2 columns on mobile, 3 columns on lg */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {BREAST_CONDITIONS.map((cond) => (
            <Link
              key={cond.id}
              href={cond.href}
              className="bg-white rounded-2xl border border-[#F0D5DC] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#D84C70]/60 transition-all duration-300 flex flex-col justify-between group active:scale-[0.98]"
            >
              <div>
                {/* Condition Image */}
                <div className="relative w-full aspect-[4/3] bg-[#FFF5F7] overflow-hidden">
                  <Image
                    src={cond.image}
                    alt={cond.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 350px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="hidden sm:inline-block absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider text-[#88213B] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#F5D2DB]">
                    {cond.badge}
                  </span>
                </div>

                <div className="p-3 sm:p-5">
                  <h3 className="font-serif text-[13.5px] sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-[#88213B] transition-colors">
                    {cond.title}
                  </h3>
                  <p className="hidden sm:block text-xs font-semibold text-[#D84C70] mt-1 mb-2">
                    {cond.subtitle}
                  </p>
                  <p className="hidden sm:block text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {cond.description}
                  </p>
                </div>
              </div>

              {/* Bottom Arrow Indicator */}
              <div className="p-3 sm:px-5 sm:pb-5 pt-0 flex items-center justify-between sm:border-t sm:border-slate-100 sm:pt-3">
                <span className="hidden sm:inline text-xs font-bold text-[#88213B] group-hover:text-[#6E172E]">
                  Learn More
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FFF5F7] group-hover:bg-[#D84C70] border border-[#F5CAD5] flex items-center justify-center text-[#D84C70] group-hover:text-white transition-colors duration-200 ml-auto">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Conditions Button */}
        <div className="mt-5 block md:hidden">
          <Link
            href="/services"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D84C70] hover:bg-[#C0395D] text-white text-center font-semibold text-sm shadow-sm active:scale-98 transition-all"
          >
            <span>View All Conditions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-6 rounded-2xl bg-white border border-[#EED7DC] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FCE8ED] text-[#9B2846] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Have a newly detected lump or breast change?</div>
              <div className="text-[11px] sm:text-xs text-slate-600">Avoid anxiety and guesswork. Schedule a gentle, confidential evaluation with Dr. Noopur Patel.</div>
            </div>
          </div>
          <Link
            href="/appointments"
            className="w-full sm:w-auto text-center shrink-0 px-6 py-2.5 rounded-xl bg-[#88213B] hover:bg-[#731930] text-white text-xs font-bold transition-colors shadow-sm"
          >
            Book Clinical Checkup
          </Link>
        </div>
      </div>
    </section>
  );
}
