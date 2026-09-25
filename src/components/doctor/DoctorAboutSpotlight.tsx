"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Stethoscope, Play, GraduationCap, Award, X } from "lucide-react";

export default function DoctorAboutSpotlight() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const pillars = [
    "Personalised Treatment",
    "Compassionate Care",
    "Evidence-Based Approach",
    "Focus on Quality of Life",
  ];

  return (
    <section className="w-full py-12 lg:py-24 bg-white border-b border-[#F5E6EA]" id="about-doctor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: High-Authority Editorial & Clinical Pillars */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE8ED] text-[#88213B] text-[10.5px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5]">
              <Stethoscope className="w-3.5 h-3.5 text-[#D84C70]" />
              ABOUT DR. NOOPUR PATEL
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
                Meet Dr. Noopur Patel
              </h2>
              <p className="text-sm sm:text-lg font-medium text-[#D84C70] mt-1">
                Breast Cancer Surgeon in Ahmedabad
              </p>
            </div>

            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              Dr. Noopur Patel is a breast cancer surgeon who focuses on comprehensive care for breast diseases, including breast cancer, benign breast conditions, and advanced breast surgery. Her approach combines surgical precision with compassionate and patient-first care.
            </p>

            {/* 4 Pillars Checklist (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              {pillars.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[12px] sm:text-[13.5px] font-semibold text-slate-800">
                  <div className="w-4 h-4 rounded-full bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-[#D84C70]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Structured Credentials Pills (Desktop & Tablet) */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4 pt-2">
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
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#88213B]/20 transition-all active:scale-95 text-center"
              >
                <span>Know More About Dr. Noopur Patel</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Doctor Photo & Video Introduction Thumbnail */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[420px] bg-[#FAF7F8] p-3 sm:p-5 rounded-3xl border border-[#F0D5DC] shadow-sm space-y-4">
              {/* Doctor Office Photo with Video Play Overlay */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#F0D0D8] group">
                <Image
                  src="/images/doctor/assets/doctor-office-home.png"
                  alt="Dr. Noopur Patel in consultation office"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                
                {/* Video Play Button Overlay */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors cursor-pointer"
                  aria-label="Watch Introduction Video"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D84C70] text-white flex items-center justify-center shadow-lg shadow-[#D84C70]/40 group-hover:scale-110 active:scale-95 transition-transform duration-200">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
                  </div>
                </button>

                {/* Bottom Pill */}
                <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md py-2 px-3 rounded-xl border border-rose-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">Watch Introduction</span>
                  <span className="text-[#D84C70] font-bold text-[11px]">1:32 Min</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                Introduction to Dr. Noopur Patel
              </h3>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black flex items-center justify-center text-white text-sm">
              <div className="text-center p-6 space-y-2">
                <Play className="w-12 h-12 text-[#D84C70] mx-auto opacity-80" />
                <p className="font-semibold">Dr. Noopur Patel — Clinical Introduction</p>
                <p className="text-xs text-slate-400">Department of Breast Oncology, Marengo CIMS Hospital</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
