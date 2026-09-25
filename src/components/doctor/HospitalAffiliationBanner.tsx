import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2, CheckCircle2, ShieldCheck, HeartHandshake, Calendar, Navigation } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function HospitalAffiliationBanner() {
  return (
    <section className="w-full py-12 lg:py-16 bg-[#FFF8F9] border-y border-[#F5D6DE]/60" id="hospital-affiliation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Container with Full-Width Panoramic Banner */}
        <div className="bg-white rounded-3xl border border-[#F5D6DE] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
          
          {/* 1. Grand Master Panoramic Banner - 100% Full Visibility Without Cropping */}
          <div 
            className="relative w-full bg-gradient-to-r from-[#FFF5F7] via-white to-[#FDF2F4] border-b border-[#F5D6DE]/60 overflow-hidden"
            style={{ aspectRatio: "2056 / 765" }}
          >
            <Image
              src="/images/doctor/assets/dr-banner-full.png"
              alt="Dr. Noopur Patel - Breast Cancer Surgeon at Marengo CIMS Hospital Ahmedabad"
              fill
              priority
              className="object-contain w-full h-full object-center"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          {/* 2. Clinical Infrastructure & Hospital Details */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Heading, Context & Bullets */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F5D6DE] text-[#D84C70] text-[11px] font-bold tracking-widest uppercase">
                  <Building2 className="w-3.5 h-3.5" />
                  HOSPITAL AFFILIATION &amp; INFRASTRUCTURE
                </div>

                <h2 className="font-serif text-[26px] sm:text-[32px] font-bold text-[#1A202C] leading-snug">
                  Advanced Surgical Breast Oncology at{" "}
                  <span className="text-[#D84C70]">Marengo CIMS Hospital</span>
                </h2>

                <p className="text-slate-600 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-3xl">
                  Consultations, diagnostic evaluations, and surgical procedures are conducted at Marengo CIMS Hospital, Ahmedabad — equipped with state-of-the-art diagnostic mammography, frozen-section pathology, dedicated oncology operative theatres, and a multidisciplinary tumor board.
                </p>

                {/* 4 Factual Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                    <span>Multidisciplinary Tumor Board Consultation</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                    <span>Oncoplastic &amp; Sentinel Node Evaluation</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-700">
                    <HeartHandshake className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                    <span>Dedicated Patient Counselling &amp; Surveillance</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-700">
                    <MapPin className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                    <span>Science City Road, Sola, Ahmedabad</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Prominent Quick Action CTA Cards */}
              <div className="lg:col-span-4 flex flex-col gap-3.5 lg:border-l lg:border-[#F5D6DE]/60 lg:pl-8">
                <Link
                  href="/appointments"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#D84C70] hover:bg-[#BE3A5C] text-white text-[14px] font-semibold transition-all shadow-[0_4px_14px_rgba(216,76,112,0.25)] hover:shadow-[0_6px_20px_rgba(216,76,112,0.35)] active:scale-98"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Consultation at Hospital</span>
                </Link>

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FFF8F9] text-slate-700 text-[14px] font-semibold border border-[#F5D6DE] transition-all hover:border-[#D84C70]"
                >
                  <Navigation className="w-4 h-4 text-[#D84C70]" />
                  <span>View OPD Timings &amp; Directions</span>
                </Link>

                <div className="text-center pt-1 text-[12px] text-slate-500">
                  <span>OPD Mon - Sat: 10:00 AM - 6:00 PM</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

