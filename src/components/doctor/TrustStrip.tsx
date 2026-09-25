"use client";

import React from "react";
import { GraduationCap, Award, Stethoscope, Ribbon, ShieldCheck, HeartHandshake } from "lucide-react";

export default function TrustStrip() {
  const credentials = [
    {
      icon: <GraduationCap className="w-5 h-5 text-[#D84C70]" />,
      label: "MBBS",
      detail: "Medical Graduate",
    },
    {
      icon: <Award className="w-5 h-5 text-[#D84C70]" />,
      label: "MS (General Surgery)",
      detail: "Specialized Training",
    },
    {
      icon: <Ribbon className="w-5 h-5 text-[#D84C70]" />,
      label: "Fellowship in Breast Surgery",
      detail: "Advanced Speciality",
    },
    {
      icon: <Stethoscope className="w-5 h-5 text-[#D84C70]" />,
      label: "Surgical Breast Oncology",
      detail: "Associate Consultant",
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F8] border-b border-[#F0D5DC] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F0D5DC] shadow-xs hover:border-[#D84C70]/50 hover:shadow-sm transition-all duration-200 flex items-center gap-3.5 sm:gap-4"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center shrink-0">
                {cred.icon}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 text-xs sm:text-[14px] leading-tight truncate">
                  {cred.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium truncate">
                  {cred.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
