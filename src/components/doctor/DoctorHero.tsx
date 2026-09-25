"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Check } from "lucide-react";
import { WhatsAppIcon } from "./SocialIcons";
import { SITE_CONFIG } from "@/config/site";

interface DoctorHeroProps {
  badge?: string;
  headline?: string;
  headlineHighlight?: string;
  subheadline?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function DoctorHero({
  badge = "SPECIALISED BREAST CANCER CARE · AHMEDABAD",
  subheadline = "Compassionate, evidence-based surgical care for women with breast conditions and breast cancer — with a focus on personalised treatment and informed decisions.",
  primaryCtaText = "Book an Appointment",
  primaryCtaLink = "/appointments",
  secondaryCtaText = "WhatsApp",
  secondaryCtaLink = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`,
}: DoctorHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-rose-100/60 lg:min-h-[580px] xl:min-h-[640px] flex items-center">
      {/* =========================================================================
          FOREGROUND CONTENT CONTAINER
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-10 lg:py-12 my-auto">
        {/* The hero row that controls BOTH text and image alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
          
          {/* LEFT SIDE: Clean, Premium Specialist Copy */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-5 max-w-xl lg:max-w-none">
            
            {/* 1. Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF2F4] border border-[#F5D6DE] text-[#D84C70] text-[11px] sm:text-[12px] font-bold tracking-widest uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70] shrink-0" />
              <span>{badge}</span>
            </div>

            {/* 2. Main Heading with Brand Pink Accent */}
            <h1 className="font-serif text-[34px] sm:text-[42px] md:text-[46px] lg:text-[46px] xl:text-[54px] font-bold text-[#1A202C] leading-[1.15] tracking-tight">
              Specialised{" "}
              <span className="text-[#D84C70]">Breast Cancer Care</span>,
              <span className="block mt-1 sm:mt-1.5 text-[#2D3748] font-normal">
                With a Patient-First Approach
              </span>
            </h1>

            {/* 3. Supporting Description */}
            <p className="text-slate-600 text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed font-normal max-w-[540px]">
              {subheadline}
            </p>

            {/* 4. 3 Clean Feature Points */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-x-5 sm:gap-y-2 pt-1 pb-1">
              {[
                "Breast Cancer Surgery",
                "Surgical Breast Oncology",
                "Oncoplastic Breast Surgery",
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-slate-800 text-[13.5px] sm:text-[14.5px] font-medium"
                >
                  <div className="w-5 h-5 rounded-full bg-[#FDF2F4] border border-[#F5D6DE] flex items-center justify-center shrink-0 text-[#D84C70]">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* 5. CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href={primaryCtaLink}
                className="inline-flex items-center justify-center gap-2.5 bg-[#D84C70] hover:bg-[#BE3A5C] text-white text-[15px] font-semibold px-7 py-3.5 rounded-full shadow-[0_6px_20px_rgba(216,76,112,0.25)] hover:shadow-[0_8px_25px_rgba(216,76,112,0.35)] transition-all duration-200 active:scale-95 text-center cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{primaryCtaText}</span>
              </Link>

              <a
                href={secondaryCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FDF2F4] border-1.5 border-[#D84C70] text-[#D84C70] text-[15px] font-semibold px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95 text-center cursor-pointer shadow-2xs"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0 fill-[#D84C70]" />
                <span>{secondaryCtaText}</span>
              </a>
            </div>

            {/* 6. Subtle Hospital Location Text */}
            <div className="flex items-center gap-1.5 text-[12.5px] sm:text-[13px] text-slate-500 pt-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D84C70] shrink-0" />
              <span>Marengo CIMS Hospital, Ahmedabad, Gujarat</span>
            </div>

          </div>

          {/* =========================================================================
              RIGHT SIDE: IMAGE WRAPPER (Desktop & Mobile)
              Image is perfectly vertically aligned with the text via the grid's items-center.
              ========================================================================= */}
          <div className="w-full lg:col-span-5 xl:col-span-6 pt-4 lg:pt-0">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] xl:aspect-[3/4] max-h-[600px] rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl border border-[#F5D6DE] bg-gradient-to-tr from-[#FCE7EC] via-[#FDF2F4] to-[#FFF5F7]">
              <Image
                src="/images/doctor/assets/hero-image.png"
                alt="Dr. Noopur Patel, Breast Cancer Surgeon"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[78%_center] lg:object-[center_top]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
