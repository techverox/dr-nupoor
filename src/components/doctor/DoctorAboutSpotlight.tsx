"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Stethoscope, Quote, GraduationCap, Award } from "lucide-react";

export default function DoctorAboutSpotlight() {
  const specialties = [
    "Solid Cancer Surgery",
    "Breast Conservation Surgery",
    "Oncoplastic Breast Surgery",
    "Mastectomy",
    "Benign Breast Conditions",
    "Holistic Cancer Approach",
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-[#F5E6EA]" id="about-doctor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: High-Authority Editorial & Clinical Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5]">
              <Stethoscope className="w-3.5 h-3.5" />
              SURGEON INTRODUCTION
            </div>

            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
                Meet Dr. Noopur Patel
              </h2>
              <p className="text-base sm:text-lg font-medium text-[#D84C70] mt-1">
                Breast Cancer Surgeon in Ahmedabad
              </p>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dr. Noopur Patel is a breast cancer surgeon who focuses on comprehensive care for breast diseases, including breast cancer, benign breast conditions, and advanced breast surgery. Her approach combines evidence-based surgical precision with compassionate and patient-first care.
            </p>

            {/* Structured Credentials Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DC]">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <GraduationCap className="w-4 h-4 text-[#D84C70]" />
                  <span>Education &amp; Training</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  MBBS, MS (General Surgery), and dedicated Fellowship in Breast Oncology from Max Healthcare Institute.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DC]">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <Award className="w-4 h-4 text-[#D84C70]" />
                  <span>Clinical Expertise</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Breast Conservation Surgery (BCS), Oncoplastic Reshaping, Sentinel Node Biopsy (SLNB), and Mastectomy.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95"
              >
                <span>Know More About Dr. Noopur Patel</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF3F5] text-[#88213B] text-xs sm:text-sm font-bold border border-[#EED7DC] transition-all"
              >
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Doctor Photo & Specialty Checklist */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[420px] bg-[#FAF7F8] p-4 sm:p-5 rounded-3xl border border-[#F0D5DC] shadow-sm space-y-5">
              {/* Doctor Office Photo */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#F0D0D8]">
                <Image
                  src="/images/doctor/assets/doctor-office-home.png"
                  alt="Dr. Noopur Patel in consultation office"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* 6 Expertise Checklist Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {specialties.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D84C70]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
