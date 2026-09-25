"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MessageCircle, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function HopeCtaBanner() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Noopur Patel, I would like to consult with you regarding breast health."
  )}`;

  return (
    <section className="w-full py-10 sm:py-14 bg-white" id="hope-cta" aria-labelledby="hope-cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Healthcare Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#D94B72] via-[#C53A62] to-[#9B2846] text-white shadow-[0_12px_36px_rgba(217,75,114,0.2)] border border-rose-300/30 p-8 sm:p-12 lg:p-14">
          
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[11.5px] font-bold tracking-widest uppercase border border-white/30">
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>COMPASSIONATE CLINICAL CARE</span>
              </div>

              <h2 id="hope-cta-heading" className="font-serif text-[28px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.15] text-white">
                Take the First Step Towards{" "}
                <span className="italic font-normal block sm:inline">
                  Better Breast Health
                </span>
              </h2>

              <p className="text-white/90 text-[15px] sm:text-[16.5px] leading-relaxed max-w-2xl font-normal">
                Whether you need a routine clinical check-up, second opinion on a lump, or specialized oncoplastic surgery — Dr. Noopur Patel is here to guide you with clarity and empathy.
              </p>

              <div className="flex items-center gap-4 text-[12.5px] text-white/80 pt-1 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-200" />
                  Marengo CIMS Hospital, Ahmedabad
                </span>
                <span>•</span>
                <span>Confidential Consultation</span>
              </div>
            </div>

            {/* Right Action CTAs (4 cols) */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
              <Link
                href="/appointments"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#8B2346] hover:bg-rose-50 text-[14.5px] font-bold py-3.5 px-7 rounded-full shadow-lg transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#D94B72]" />
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 ml-auto sm:ml-0" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-1.5 border-white/80 hover:bg-white/15 text-white text-[14.5px] font-semibold py-3.5 px-6 rounded-full transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consult on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
