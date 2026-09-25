"use client";

import React from "react";
import { Ribbon, Heart, Activity, Sparkles, HeartHandshake } from "lucide-react";

export default function TrustStrip() {
  const credentials = [
    { label: "MBBS", detail: "Medical Graduate" },
    { label: "MS (General Surgery)", detail: "Post-Graduate Surgeon" },
    { label: "Fellowship in Breast Surgery", detail: "Surgical Oncology Trained" },
    { label: "Surgical Breast Oncology", detail: "Associate Consultant" },
  ];

  const pillars = [
    { icon: <Ribbon className="w-4 h-4 text-[#D84C70]" />, text: "Specialised Breast Care" },
    { icon: <Sparkles className="w-4 h-4 text-[#D84C70]" />, text: "Qualified Lady Surgeon" },
    { icon: <Activity className="w-4 h-4 text-[#D84C70]" />, text: "Breast Oncology Focus" },
    { icon: <HeartHandshake className="w-4 h-4 text-[#D84C70]" />, text: "Patient-Centred Approach" },
  ];

  return (
    <div className="w-full bg-[#FFF8F9] border-y border-[#F5D6DE]">
      {/* Top Credentials Strip */}
      <div className="border-b border-[#F7E2E8] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs font-semibold text-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9B2846] hidden md:inline">
              VERIFIED CREDENTIALS:
            </span>
            {credentials.map((cred, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70]" />
                <span className="font-bold text-slate-900">{cred.label}</span>
                <span className="text-slate-500 font-normal hidden lg:inline">({cred.detail})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Pillars */}
      <div className="py-3.5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-4 text-xs sm:text-[13px] font-semibold text-slate-800">
            {pillars.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FDF2F4] flex items-center justify-center border border-[#F5D6DE] flex-shrink-0">
                  {item.icon}
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
