"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function TreatmentOptionsGrid() {
  const treatments = [
    {
      title: "Lumpectomy",
      subtitle: "(Part of breast removed)",
      description: "Conservation surgery removing only the cancerous lesion with a healthy rim.",
      image: "/images/doctor/assets/treatment-lumpectomy.png",
      slug: "breast-conservation-surgery-bcs",
    },
    {
      title: "Mastectomy",
      subtitle: "(Whole breast removed)",
      description: "Complete removal of breast tissue when indicated for extensive disease.",
      image: "/images/doctor/assets/treatment-mastectomy.png",
      slug: "breast-cancer-diagnosis-and-treatment",
    },
    {
      title: "Breast Reconstruction",
      subtitle: "(Implant / Flap)",
      description: "Restoring the breast contour using silicone implants or natural body tissue.",
      image: "/images/doctor/assets/treatment-reconstruction.png",
      slug: "breast-reconstruction-surgery",
    },
    {
      title: "Oncoplastic Surgery",
      subtitle: "(Cancer removal + better shape)",
      description: "Combining complete oncology clearance with plastic surgical tissue reshaping.",
      image: "/images/doctor/assets/treatment-oncoplastic.png",
      slug: "oncoplastic-breast-surgery",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FFF8F9]/40 border-b border-rose-100/60" id="treatments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
              TREATMENT OPTIONS
            </span>
            <h2 className="font-serif text-[32px] sm:text-[42px] font-bold text-[#1A202C] leading-tight mb-3">
              Personalised Treatment for Better Outcomes
            </h2>
            <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
              Every patient is unique, and treatment is planned based on your condition, stage and personal goals.
            </p>
          </div>

          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-white hover:bg-[#FDF2F4] transition-all shadow-xs"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Cards in 4-Col Grid (Exact Match from Screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((item, idx) => (
            <Link
              key={idx}
              href={`/services#${item.slug}`}
              className="group bg-white rounded-2xl p-5 border border-[#F5D6DE] hover:border-[#D84C70] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Illustration Box */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#FFF8F9] border border-[#F5D6DE]/50 mb-4 p-2 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 260px"
                  />
                </div>

                <h3 className="font-serif text-[18px] font-bold text-[#1A202C] group-hover:text-[#D84C70] transition-colors leading-tight mb-1 text-center">
                  {item.title}
                </h3>
                <p className="text-[12px] font-medium text-[#D84C70] text-center mb-2">
                  {item.subtitle}
                </p>
                <p className="text-[12.5px] text-slate-500 text-center leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 text-center">
                <span className="text-[12px] font-semibold text-[#D84C70] group-hover:underline inline-flex items-center gap-1">
                  Explore Details &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
