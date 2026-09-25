"use client";

import React from "react";
import { GraduationCap, Award, Ribbon, Stethoscope } from "lucide-react";

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
      detail: "Specialised Training",
    },
    {
      icon: <Ribbon className="w-5 h-5 text-[#D84C70]" />,
      label: "Fellowship in Breast Surgery",
      detail: "Advanced Expertise",
    },
    {
      icon: <Stethoscope className="w-5 h-5 text-[#D84C70]" />,
      label: "Surgical Breast Oncology",
      detail: "Focused Practice",
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F8] border-b border-[#F0D5DC] py-5 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#F0D5DC] shadow-xs hover:border-[#D84C70]/50 hover:shadow-sm transition-all duration-200 flex flex-col items-center text-center justify-center min-h-[108px] sm:min-h-[120px]"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center shrink-0">
                {cred.icon}
              </div>
              <div className="mt-2 w-full">
                <div className="font-bold text-slate-900 text-[11.5px] sm:text-[13px] leading-tight break-words">
                  {cred.label}
                </div>
                <div className="text-[10px] sm:text-[11.5px] text-slate-500 mt-0.5 font-medium leading-tight break-words">
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
