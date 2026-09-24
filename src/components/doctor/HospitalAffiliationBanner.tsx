import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function HospitalAffiliationBanner() {
  return (
    <section className="w-full py-12 lg:py-16 bg-[#FFF8F9] border-y border-[#F5D6DE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Container */}
        <div className="bg-white rounded-3xl border border-[#F5D6DE] shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F5D6DE] text-[#D84C70] text-[11px] font-bold tracking-widest uppercase">
                <Building2 className="w-3.5 h-3.5" />
                HOSPITAL AFFILIATION & INFRASTRUCTURE
              </div>

              <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#1A202C] leading-snug">
                Advanced Surgical Breast Oncology at{" "}
                <span className="text-[#D84C70]">Marengo CIMS Hospital</span>
              </h2>

              <p className="text-slate-600 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                Consultations, diagnostic evaluations, and surgical procedures are conducted at Marengo CIMS Hospital, Ahmedabad — equipped with state-of-the-art diagnostic mammography, frozen-section pathology, dedicated oncology operative theatres, and a multidisciplinary tumor board.
              </p>

              {/* Factual Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-[13px] text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                  <span>Multidisciplinary Tumor Board Consultation</span>
                </div>
                <div className="flex items-start gap-2.5 text-[13px] text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                  <span>Oncoplastic & Sentinel Node Evaluation</span>
                </div>
                <div className="flex items-start gap-2.5 text-[13px] text-slate-700">
                  <HeartHandshake className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                  <span>Dedicated Patient Counselling & Surveillance</span>
                </div>
                <div className="flex items-start gap-2.5 text-[13px] text-slate-700">
                  <MapPin className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                  <span>Science City Road, Sola, Ahmedabad</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/appointments"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#D84C70] hover:bg-[#BE3A5C] text-white text-[13.5px] font-semibold transition-all shadow-sm hover:shadow-md"
                >
                  Request Consultation at Hospital
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-[13.5px] font-semibold border border-slate-200 transition-all"
                >
                  View OPD Timings & Location
                </Link>
              </div>
            </div>

            {/* Right Banner Image */}
            <div className="lg:col-span-6 relative aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden border border-[#F5D6DE] shadow-xs">
              <Image
                src="/images/doctor/assets/dr-banner-elegant.png"
                alt="Dr. Noopur Patel, Breast Cancer Surgeon at Marengo CIMS Hospital Ahmedabad"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
