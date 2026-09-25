"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";

export interface TreatmentCardItem {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export const TREATMENTS_5: TreatmentCardItem[] = [
  {
    title: "Breast Conservation Surgery (BCS)",
    subtitle: "Removing cancer while preserving the breast",
    image: "/images/doctor/assets/service-1.png",
    href: "/breast-conservation-surgery-ahmedabad",
  },
  {
    title: "Mastectomy",
    subtitle: "Total removal of breast tissue when clinically appropriate",
    image: "/images/doctor/assets/service-2.png",
    href: "/mastectomy-ahmedabad",
  },
  {
    title: "Sentinel Lymph Node Biopsy",
    subtitle: "Accurate staging with minimal risk of arm lymphedema",
    image: "/images/doctor/assets/service-3.png",
    href: "/sentinel-lymph-node-biopsy",
  },
  {
    title: "Oncoplastic Breast Surgery",
    subtitle: "Combining oncologic safety with plastic surgery reshaping",
    image: "/images/doctor/assets/service-5.png",
    href: "/oncoplastic-breast-surgery-ahmedabad",
  },
  {
    title: "Breast Reconstruction",
    subtitle: "Options to restore breast form using implants or tissue flaps",
    image: "/images/doctor/assets/service-4.png",
    href: "/breast-reconstruction-surgery-ahmedabad",
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
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            Evidence-based surgical care with a personalised approach
          </p>
        </div>

        {/* 5 Treatments Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {TREATMENTS_5.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#F0D5DC] overflow-hidden shadow-xs hover:shadow-md hover:border-[#D84C70]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image on Top */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-[#88213B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#88213B] group-hover:text-[#6E172E] transition-colors"
                >
                  <span>Learn More</span>
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95"
          >
            <span>View All Breast Cancer Treatments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
