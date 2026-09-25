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

export const TREATMENTS_6: TreatmentCardItem[] = [
  {
    title: "Breast Conservation Surgery",
    subtitle: "Removal of cancerous tissue while preserving the breast whenever possible.",
    image: "/images/doctor/assets/service-1.png",
    href: "/breast-conservation-surgery-ahmedabad",
  },
  {
    title: "Mastectomy",
    subtitle: "Surgical removal of breast tissue when clinically appropriate.",
    image: "/images/doctor/assets/service-2.png",
    href: "/mastectomy-ahmedabad",
  },
  {
    title: "Sentinel Lymph Node Biopsy",
    subtitle: "Evaluation of selected lymph nodes for accurate cancer staging.",
    image: "/images/doctor/assets/service-3.png",
    href: "/sentinel-lymph-node-biopsy",
  },
  {
    title: "Oncoplastic Breast Surgery",
    subtitle: "Combines cancer removal with cosmetic breast reshaping techniques.",
    image: "/images/doctor/assets/service-5.png",
    href: "/oncoplastic-breast-surgery-ahmedabad",
  },
  {
    title: "Axillary Lymph Node Surgery",
    subtitle: "Management of lymph nodes when required for complete clearance.",
    image: "/images/doctor/assets/service-6.png",
    href: "/services",
  },
  {
    title: "Breast Reconstruction",
    subtitle: "Reconstructive options after mastectomy to restore natural breast shape.",
    image: "/images/doctor/assets/service-4.png",
    href: "/breast-reconstruction-surgery-ahmedabad",
  },
];

export default function BreastCancerTreatments() {
  return (
    <section className="w-full py-12 lg:py-24 bg-white border-b border-[#F5E6EA]" id="cancer-treatments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE8ED] text-[#88213B] text-[10.5px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-2 sm:mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D84C70]" />
            OUR TREATMENTS
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
            Breast Cancer Treatments &amp; Surgery in Ahmedabad
          </h2>
          <p className="text-slate-600 text-xs sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            Personalised surgical care using advanced techniques for better outcomes and quality of life.
          </p>
        </div>

        {/* MOBILE VIEW: Horizontal Card List Matching Mockup */}
        <div className="flex md:hidden flex-col space-y-3">
          {TREATMENTS_6.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#F0D5DC] shadow-2xs hover:border-[#D84C70]/50 transition-all active:scale-[0.99]"
            >
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="font-bold text-slate-900 text-[13px] leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#FFF5F7] border border-[#F5CAD5] text-[#D84C70] flex items-center justify-center shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}

          {/* View All Treatments Button */}
          <Link
            href="/services"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 mt-2 rounded-xl bg-[#D84C70] hover:bg-[#C0395D] text-white text-center font-semibold text-sm shadow-sm active:scale-98 transition-all"
          >
            <span>View All Treatments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* DESKTOP VIEW: Multi-Column Responsive Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {TREATMENTS_6.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#F0D5DC] overflow-hidden shadow-xs hover:shadow-md hover:border-[#D84C70]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-4">
                  <h3 className="font-serif text-[14.5px] font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-[#88213B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-0">
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

      </div>
    </section>
  );
}
