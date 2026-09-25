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
      subtitle: "Detailed discussion about your concerns and medical history.",
      icon: <Calendar className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "02",
      title: "Clinical Evaluation",
      subtitle: "Physical examination and initial diagnostic evaluation.",
      icon: <Stethoscope className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "03",
      title: "Imaging / Biopsy",
      subtitle: "Mammogram, ultrasound and image-guided biopsy as required.",
      icon: <Microscope className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "04",
      title: "Diagnosis & Staging",
      subtitle: "Accurate diagnosis and cancer staging to plan treatment.",
      icon: <FileCheck2 className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "05",
      title: "Treatment Planning",
      subtitle: "Personalised surgical treatment options discussed with you.",
      icon: <GitBranch className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "06",
      title: "Surgery / Treatment",
      subtitle: "Advanced surgical care and multidisciplinary clinical support.",
      icon: <Activity className="w-5 h-5 text-[#88213B]" />,
    },
    {
      num: "07",
      title: "Follow-Up",
      subtitle: "Regular post-operative follow-up for long-term health and well-being.",
      icon: <HeartHandshake className="w-5 h-5 text-[#88213B]" />,
    },
  ];

  return (
    <section className="w-full py-12 lg:py-24 bg-white border-b border-[#F5E6EA]" id="treatment-journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <span className="text-[10.5px] sm:text-xs font-bold tracking-widest uppercase text-[#88213B] mb-2 bg-[#FCE8ED] px-3.5 py-1 rounded-full border border-[#F5CAD5] inline-block">
            STEP-BY-STEP APPROACH
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight mt-1">
            Your Breast Cancer Care Journey
          </h2>
          <p className="text-slate-600 text-xs sm:text-base mt-2 leading-relaxed">
            A clear and supportive journey from diagnosis to recovery.
          </p>
        </div>

        {/* MOBILE VIEW: Continuous Connected Vertical Timeline */}
        <div className="block lg:hidden relative pl-4 pr-1 max-w-md mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[29px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-[#D84C70] via-[#F5CAD5] to-[#EED7DC]" />

          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-3.5 group">
                {/* Number Badge */}
                <div className="relative z-10 w-8 h-8 rounded-full bg-[#D84C70] text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-sm ring-4 ring-white">
                  {step.num}
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-[#FAF7F8] p-3.5 rounded-2xl border border-[#F0D5DC] shadow-2xs">
                  <h3 className="font-bold text-slate-900 text-[13.5px] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP VIEW: 7-Step Horizontal Progression Grid */}
        <div className="hidden lg:grid lg:grid-cols-7 gap-4 relative">
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
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/appointments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#88213B] text-white text-xs sm:text-sm font-bold hover:bg-[#731930] transition-colors shadow-sm"
          >
            <span>Begin Your Consultation at Step 01</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
