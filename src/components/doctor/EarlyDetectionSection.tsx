"use client";

import React from "react";
import Image from "next/image";
import { Heart, Activity, ShieldCheck, Users } from "lucide-react";

export default function EarlyDetectionSection() {
  const cards = [
    {
      icon: <Activity className="w-5 h-5 text-[#D84C70]" />,
      stat: "1 in 8",
      label: "Women may develop breast cancer",
      description: "Lifetime risk highlights the importance of routine self-examinations and awareness.",
    },
    {
      icon: <Heart className="w-5 h-5 text-[#D84C70]" />,
      stat: "90%+",
      label: "Survival rate with early detection",
      description: "When diagnosed at early stages, clinical treatment outcomes are exceptionally positive.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#D84C70]" />,
      stat: "Regular",
      label: "Screening saves lives",
      description: "Clinical mammography and expert evaluation detect changes before physical symptoms appear.",
    },
    {
      icon: <Users className="w-5 h-5 text-[#D84C70]" />,
      stat: "You are not alone",
      label: "We are here to support",
      description: "Comprehensive guidance, compassionate answers, and clinical companionship every step.",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
            WHY BREAST HEALTH MATTERS
          </span>
          <h2 className="font-serif text-[32px] sm:text-[42px] font-bold text-[#1A202C] leading-tight mb-4">
            Early Detection Can Save Lives
          </h2>
          <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
            Breast cancer is one of the most common cancers in women, but when detected early, the chances of successful treatment are much higher. Regular check-ups and awareness can make a big difference.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: 4 Stat Cards in 2x2 Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#FFF8F9] hover:bg-[#FDF2F4] border border-[#F5D6DE] rounded-2xl p-6 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs border border-[#F5D6DE]/60 mb-4">
                    {card.icon}
                  </div>
                  <div className="font-serif text-[28px] sm:text-[32px] font-bold text-[#9B2846] leading-none mb-1">
                    {card.stat}
                  </div>
                  <h3 className="text-[14px] font-semibold text-slate-800 mb-2">
                    {card.label}
                  </h3>
                </div>
                <p className="text-[12.5px] text-slate-500 leading-normal">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Editorial Photo of Woman with Ribbon */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-[#F5D6DE] shadow-[0_12px_36px_rgba(216,76,112,0.12)]">
              <Image
                src="/images/doctor/assets/early-detection-woman.png"
                alt="Woman holding breast cancer awareness ribbon"
                fill
                className="object-cover object-center hover:scale-103 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
