"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MessageCircle, ArrowRight, ShieldCheck, Heart, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function HopeCtaBanner() {
  return (
    <section className="w-full py-12 sm:py-16 bg-white" id="hope-cta" aria-labelledby="hope-cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Healthcare Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF5F7] via-[#FDF0F3] to-[#FCE8ED] border border-[#F5CAD5] shadow-sm p-6 sm:p-10 lg:p-12">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Doctor Cutout Photo */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="relative w-44 h-56 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border border-[#F5CAD5] shadow-xs bg-white">
                <Image
                  src="/images/doctor/assets/dr-noopur-hd.jpg"
                  alt="Dr. Noopur Patel"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 180px, 200px"
                />
              </div>
            </div>

            {/* Right Column: Content & Action Buttons */}
            <div className="lg:col-span-9 space-y-4">
              <h2 id="hope-cta-heading" className="font-serif text-[26px] sm:text-[34px] lg:text-[38px] font-bold leading-tight text-slate-900">
                Have a Breast Health Concern?
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                If you noticed a breast lump, abnormal nipple discharge, or a recent diagnosis, or want a second opinion from a breast surgeon, schedule a consultation to discuss your condition.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/appointments"
                  className="inline-flex items-center gap-2 bg-[#88213B] hover:bg-[#731930] text-white text-xs sm:text-sm font-bold py-3.5 px-7 rounded-full shadow-md shadow-[#88213B]/20 transition-all active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF3F5] text-slate-800 hover:text-[#88213B] border border-[#EED7DC] text-xs sm:text-sm font-bold py-3.5 px-6 rounded-full transition-all active:scale-95 shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-[#D84C70]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
