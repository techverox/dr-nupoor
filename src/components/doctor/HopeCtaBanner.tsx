"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function HopeCtaBanner() {
  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-r from-[#D84C70] via-[#C83E62] to-[#B83054] text-white py-12 sm:py-16">
      {/* Background floral watermark overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Hopeful Woman Visual & Copy */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white/60 shadow-lg flex-shrink-0 bg-white/20">
              <Image
                src="/images/doctor/assets/early-detection-woman.png"
                alt="Hope & Healing"
                fill
                className="object-cover object-top"
                sizes="96px"
              />
            </div>
            <div>
              <h2 className="font-serif text-[26px] sm:text-[34px] font-bold leading-tight mb-2">
                Take the First Step Towards Better Breast Health
              </h2>
              <p className="text-white/90 text-[15px] sm:text-[16px] max-w-xl">
                We are here to listen, guide and support you with compassionate, world-class surgical care.
              </p>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full sm:w-auto">
            <Link
              href="/appointments"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#D84C70] hover:bg-slate-50 text-[14.5px] font-bold px-7 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#D84C70]" />
              <span>Book an Appointment</span>
            </Link>

            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/80 hover:bg-white/10 text-white text-[14.5px] font-medium px-6 py-3.5 rounded-full transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
