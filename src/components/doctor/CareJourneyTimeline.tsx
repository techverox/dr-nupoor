"use client";

import React from "react";
import {
  Calendar,
  Stethoscope,
  Microscope,
  FileCheck2,
  GitBranch,
  Activity,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export interface JourneyStep {
  num: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function CareJourneyTimeline() {
  const steps: JourneyStep[] = [
    {
      num: "01",
      title: "Consultation",
      subtitle: "Detailed discussion of your concerns",
      icon: <Calendar className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "02",
      title: "Clinical Evaluation",
      subtitle: "Physical examination with female chaperone",
      icon: <Stethoscope className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "03",
      title: "Imaging / Biopsy",
      subtitle: "Mammogram, ultrasound, and biopsy if needed",
      icon: <Microscope className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "04",
      title: "Diagnosis & Staging",
      subtitle: "Accurate diagnosis and cancer staging",
      icon: <FileCheck2 className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "05",
      title: "Treatment Planning",
      subtitle: "Personalised to your condition and health priorities",
      icon: <GitBranch className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "06",
      title: "Surgery / Treatment",
      subtitle: "Advanced surgical care and expert clinical care",
      icon: <Activity className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "07",
      title: "Follow-Up",
      subtitle: "Regular follow-up and long-term care",
      icon: <HeartHandshake className="w-5 h-5 text-[#88213B]" />,
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-[#F5E6EA]" id="treatment-journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#88213B] block mb-2 bg-[#FCE8ED] px-3.5 py-1.5 rounded-full border border-[#F5CAD5] inline-block">
            STEP-BY-STEP PATIENT PATHWAY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight mt-1">
            Your Breast Cancer Care Journey
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            A clear and supportive journey, from consultation to recovery.
          </p>
        </div>

        {/* 7-Step Interactive Journey Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-5 sm:gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center relative group p-4 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DC] hover:bg-white hover:shadow-lg hover:border-[#9B2846]/40 transition-all duration-300"
            >
              {/* Step Circle with Icon */}
              <div className="relative mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#EED7DC] shadow-xs flex items-center justify-center group-hover:scale-110 group-hover:border-[#9B2846] transition-all duration-300">
                  {step.icon}
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-[#9B2846] to-[#88213B] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {step.num}
                </div>
              </div>

              {/* Step Title & Subtitle */}
              <h3 className="font-serif text-base font-bold text-slate-900 mb-1 group-hover:text-[#9B2846] transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-normal">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/appointments"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#88213B] text-white text-xs sm:text-sm font-bold hover:bg-[#731930] transition-colors shadow-sm"
          >
            <span>Begin Your Consultation at Step 01</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
