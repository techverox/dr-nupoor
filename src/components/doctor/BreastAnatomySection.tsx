"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function BreastAnatomySection() {
  const conditions = [
    {
      title: "Normal Breast",
      subtitle: "Healthy lobules & ducts",
      image: "/images/doctor/assets/condition-normal.png",
    },
    {
      title: "Benign Lump",
      subtitle: "(Fibroadenoma)",
      image: "/images/doctor/assets/condition-benign.png",
    },
    {
      title: "Breast Cancer",
      subtitle: "Invasive lesion",
      image: "/images/doctor/assets/condition-cancer.png",
    },
    {
      title: "Ductal Carcinoma",
      subtitle: "(In situ)",
      image: "/images/doctor/assets/condition-ductal.png",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60" id="anatomy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Educational Overview */}
          <div className="lg:col-span-4 space-y-5">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block">
              KNOW YOUR BREASTS
            </span>
            <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#1A202C] leading-tight">
              Understanding Breast Anatomy
            </h2>
            <p className="text-slate-600 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Knowing how the breast is made up helps you understand diseases, treatment options and why early detection is important.
            </p>
            <div className="pt-2">
              <Link
                href="/patient-guide"
                className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-[#FFF8F9] hover:bg-[#FDF2F4] transition-all shadow-xs"
              >
                <span>Read Complete Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Center Column: Anatomical Medical Illustration */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-[#FFF8F9] border border-[#F5D6DE] p-3 shadow-xs flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/doctor/assets/anatomy-diagram.png"
                  alt="Understanding Breast Anatomy Illustration"
                  fill
                  className="object-contain object-center"
                  sizes="340px"
                />
              </div>
            </div>
          </div>

          {/* Right Column: 4 Common Conditions in 2x2 Matrix */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-[18px] font-bold text-[#1A202C] tracking-tight mb-3">
              Common Breast Conditions
            </h3>
            <div className="grid grid-cols-2 gap-3.5">
              {conditions.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFF8F9] hover:bg-[#FDF2F4] border border-[#F5D6DE] rounded-xl p-3 text-center transition-all hover:shadow-xs group"
                >
                  <div className="relative w-full aspect-[2.05/1] rounded-lg overflow-hidden mb-2.5 bg-white border border-[#F5D6DE]/60 shadow-[0_2px_8px_rgba(216,76,112,0.05)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 320px"
                      quality={95}
                    />
                  </div>
                  <span className="text-[12.5px] font-bold text-slate-800 block leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#D84C70] font-medium block mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
