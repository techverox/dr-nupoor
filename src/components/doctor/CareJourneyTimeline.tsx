"use client";

import React from "react";
import { Calendar, Ribbon, FileText, Activity, HeartHandshake } from "lucide-react";

export default function CareJourneyTimeline() {
  const steps = [
    {
      num: 1,
      title: "Book Appointment",
      subtitle: "Online or via WhatsApp",
      icon: <Calendar className="w-5 h-5 text-[#D84C70]" />,
    },
    {
      num: 2,
      title: "Consultation",
      subtitle: "Discuss your concerns",
      icon: <Ribbon className="w-5 h-5 text-[#D84C70]" />,
    },
    {
      num: 3,
      title: "Diagnosis & Plan",
      subtitle: "Personalised treatment plan",
      icon: <FileText className="w-5 h-5 text-[#D84C70]" />,
    },
    {
      num: 4,
      title: "Treatment & Care",
      subtitle: "Expert surgical care",
      icon: <Activity className="w-5 h-5 text-[#D84C70]" />,
    },
    {
      num: 5,
      title: "Follow-up",
      subtitle: "We're with you always",
      icon: <HeartHandshake className="w-5 h-5 text-[#D84C70]" />,
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FFF8F9]/50 border-b border-rose-100/60" id="journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
            YOUR CARE JOURNEY
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1A202C] leading-tight">
            A Simple &amp; Supportive Process
          </h2>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center relative group"
            >
              {/* Step Circle with Icon */}
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full bg-white border border-[#F5D6DE] shadow-xs flex items-center justify-center group-hover:border-[#D84C70] group-hover:shadow-md transition-all duration-300">
                  {step.icon}
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#D84C70] text-white text-[12px] font-bold flex items-center justify-center shadow-xs">
                  {step.num}
                </div>
              </div>

              {/* Step Title & Subtitle */}
              <h3 className="font-serif text-[17px] font-bold text-[#1A202C] mb-1">
                {step.title}
              </h3>
              <p className="text-[12.5px] text-slate-500 leading-normal max-w-[170px]">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
