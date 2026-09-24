"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Ribbon, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Quote 
} from "lucide-react";

export default function DoctorAboutSpotlight() {
  const highlights = [
    {
      icon: <Ribbon className="w-4 h-4 text-[#D84C70]" />,
      text: "Specialised in Breast Surgery & Oncoplastic Techniques",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#D84C70]" />,
      text: "Patient-Centred & Evidence-Based Care",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-[#D84C70]" />,
      text: "Focus on Aesthetic and Functional Outcomes",
    },
    {
      icon: <Heart className="w-4 h-4 text-[#D84C70]" />,
      text: "Support Through Every Step of Your Journey",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60" id="about-spotlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Doctor Consultation Photo */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-3xl overflow-hidden border border-[#F5D6DE] shadow-md bg-[#FFF8F9]">
              <Image
                src="/images/doctor/assets/doctor-office-home.png"
                alt="Dr. Noopur Patel in consultation clinic"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-500"
                sizes="280px"
              />
            </div>
          </div>

          {/* Center Column: Biography & Highlights */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block">
              ABOUT DR. NOOPUR PATEL
            </span>
            <h2 className="font-serif text-[30px] sm:text-[36px] font-bold text-[#1A202C] leading-tight">
              A Passionate Breast Surgeon Dedicated to Women&apos;s Health
            </h2>
            <p className="text-slate-600 text-[14.5px] leading-relaxed">
              Dr. Noopur Patel is a Breast Surgeon and Oncoplastic Surgeon based in Ahmedabad, dedicated to providing comprehensive, compassionate and personalised care for women at every stage of their breast health journey.
            </p>

            {/* 4 Feature Items */}
            <div className="space-y-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#FDF2F4] flex items-center justify-center flex-shrink-0 border border-[#F5D6DE]/60">
                    {item.icon}
                  </div>
                  <span className="text-[13.5px] font-medium text-slate-800">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-[#FFF8F9] hover:bg-[#FDF2F4] transition-all shadow-xs"
              >
                <span>Know More About Dr. Noopur Patel</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Quote Card in Soft Pink Box (Exact Match) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[340px] bg-[#FFF8F9] border border-[#F5D6DE] rounded-3xl p-7 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D84C70] border border-[#F5D6DE] mb-4 shadow-xs">
                <Quote className="w-5 h-5 fill-[#D84C70]/10" />
              </div>

              <blockquote className="font-serif italic text-[16px] sm:text-[17px] text-[#9B2846] leading-relaxed mb-4">
                &ldquo;My goal is not just to treat a disease, but to support a woman through one of the most important phases of her life with knowledge, care and compassion.&rdquo;
              </blockquote>

              <div className="border-t border-[#F5D6DE] pt-3 flex items-center justify-between">
                <div>
                  <span className="font-serif font-bold text-[14px] text-slate-900 block">
                    Dr. Noopur Patel
                  </span>
                  <span className="text-[11px] text-[#D84C70] font-semibold block">
                    Breast Cancer Surgeon
                  </span>
                </div>
                <div className="w-9 h-9 relative flex items-center justify-center rounded-lg overflow-hidden shadow-xs">
                  <Image
                    src="/images/doctor/assets/favicon.png"
                    alt="Dr. Noopur Patel Emblem"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
