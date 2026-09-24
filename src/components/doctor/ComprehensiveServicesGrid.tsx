"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { ServiceItem } from "@/types";

interface ComprehensiveServicesGridProps {
  services: ServiceItem[];
}

export default function ComprehensiveServicesGrid({
  services,
}: ComprehensiveServicesGridProps) {
  // Ensure we display the 6 core clinical services with the proper reference images
  const defaultServices = [
    {
      title: "Breast Cancer Diagnosis & Treatment",
      image: "/images/doctor/assets/service-1.png",
      slug: "breast-cancer-diagnosis-and-treatment",
      description: "Thorough clinical staging, triple assessment, mammography correlation, and multidisciplinary surgical oncology.",
    },
    {
      title: "Oncoplastic Breast Surgery",
      image: "/images/doctor/assets/service-2.png",
      slug: "oncoplastic-breast-surgery",
      description: "Harmonizing complete oncologic tumor excision with aesthetic preservation of breast form and symmetry.",
    },
    {
      title: "Breast Conservation Surgery (BCS)",
      image: "/images/doctor/assets/service-3.png",
      slug: "breast-conservation-surgery-bcs",
      description: "Precise lumpectomy removing tumor tissue with clear margins while safeguarding the natural breast envelope.",
    },
    {
      title: "Breast Reconstruction Surgery",
      image: "/images/doctor/assets/service-4.png",
      slug: "breast-reconstruction-surgery",
      description: "Immediate or delayed reconstructive procedures utilizing modern implants or autologous tissue flaps.",
    },
    {
      title: "Benign Breast Conditions",
      image: "/images/doctor/assets/service-5.png",
      slug: "benign-breast-conditions",
      description: "Gentle assessment and treatment for fibroadenomas, cysts, cyclical breast pain, and nipple discharge.",
    },
    {
      title: "Follow-up & Long-term Care",
      image: "/images/doctor/assets/service-6.png",
      slug: "follow-up-and-long-term-care",
      description: "Continuous survivorship surveillance, lymphedema monitoring, and genetic counselling for high-risk families.",
    },
  ];

  // Merge CMS services if provided or fallback to defaults
  const displayServices = services && services.length > 0
    ? services.slice(0, 6).map((s, idx) => ({
        title: s.title,
        image: s.icon || defaultServices[idx]?.image || "/images/doctor/assets/service-1.png",
        slug: s.slug,
        description: s.shortDescription || defaultServices[idx]?.description || "",
      }))
    : defaultServices;

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FFF8F9]/50 border-b border-rose-100/60" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
              OUR SERVICES
            </span>
            <h2 className="font-serif text-[32px] sm:text-[42px] font-bold text-[#1A202C] leading-tight mb-3">
              Comprehensive Breast Care Under One Roof
            </h2>
            <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
              From prevention and diagnosis to advanced surgical treatment and long-term support.
            </p>
          </div>

          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-white hover:bg-[#FDF2F4] transition-all shadow-xs"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 6 Cards Grid (Exact 3-col layout from Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayServices.map((item, idx) => (
            <Link
              key={idx}
              href={`/services#${item.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#F5D6DE] hover:border-[#D84C70] shadow-[0_4px_16px_rgba(216,76,112,0.04)] hover:shadow-[0_12px_32px_rgba(216,76,112,0.12)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Clinical Photo */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Title & Content */}
                <div className="p-6">
                  <h3 className="font-serif text-[18px] sm:text-[19px] font-bold text-[#1A202C] group-hover:text-[#D84C70] transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer with Circular Plus Icon (Exact Match) */}
              <div className="px-6 pb-5 pt-0 flex items-center justify-end">
                <div className="w-8 h-8 rounded-full border border-[#F5D6DE] text-[#D84C70] group-hover:bg-[#D84C70] group-hover:text-white group-hover:border-[#D84C70] flex items-center justify-center transition-all duration-300 shadow-xs">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
