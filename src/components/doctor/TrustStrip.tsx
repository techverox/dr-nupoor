"use client";

import React from "react";
import { Ribbon, Heart, Activity, Sparkles, HeartHandshake } from "lucide-react";

export default function TrustStrip() {
  const items = [
    { icon: <Ribbon className="w-4 h-4 text-[#D84C70]" />, text: "Expert Care" },
    { icon: <Heart className="w-4 h-4 text-[#D84C70]" />, text: "Compassionate Approach" },
    { icon: <Activity className="w-4 h-4 text-[#D84C70]" />, text: "Advanced Surgical Care" },
    { icon: <Sparkles className="w-4 h-4 text-[#D84C70]" />, text: "Personalised Treatment" },
    { icon: <HeartHandshake className="w-4 h-4 text-[#D84C70]" />, text: "Long-term Support" },
  ];

  return (
    <div className="w-full bg-[#FFF8F9] border-b border-[#F5D6DE] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-around gap-4 text-[13px] sm:text-[13.5px] font-semibold text-slate-800">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#F5D6DE] flex-shrink-0">
                {item.icon}
              </div>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
