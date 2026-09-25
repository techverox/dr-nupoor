"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function HopeCtaBanner() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Noopur Patel, I would like to consult with you regarding breast health."
  )}`;

  return (
    <section className="w-full py-8 sm:py-12 bg-white" id="hope-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop & Tablet: Exact Mockup Banner with Interactive Overlays */}
        <div className="hidden sm:block relative w-full aspect-[1024/151] rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(216,76,112,0.15)] border border-[#F5D6DE]/60 group">
          <Image
            src="/images/doctor/assets/cta-banner@2x.png"
            alt="Take the First Step Towards Better Breast Health - Dr. Noopur Patel"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />

          {/* Interactive Hit Area 1: Book an Appointment */}
          <Link
            href="/appointments"
            aria-label="Book an Appointment"
            className="absolute rounded-full transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-white/80 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-400"
            style={{
              left: "64.6%",
              top: "52%",
              width: "16.4%",
              height: "26%",
            }}
          >
            <span className="sr-only">Book an Appointment</span>
          </Link>

          {/* Interactive Hit Area 2: Chat on WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="absolute rounded-full transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-white/80 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-400"
            style={{
              left: "82.4%",
              top: "52%",
              width: "15.4%",
              height: "26%",
            }}
          >
            <span className="sr-only">Chat on WhatsApp</span>
          </a>
        </div>

        {/* Mobile View: High-Legibility Responsive Card */}
        <div className="sm:hidden relative rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(216,76,112,0.18)] bg-gradient-to-br from-[#E25C7E] via-[#C93B62] to-[#B02951] text-white p-6 border border-rose-200/40">
          {/* Subtle Background Glow */}
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-white/80 block mb-1">
                TAKE THE FIRST STEP
              </span>
              <h2 className="font-serif text-[24px] font-bold leading-tight">
                Take the First Step Towards <span className="italic font-normal">Better Breast Health</span>
              </h2>
              <p className="text-white/90 text-[13.5px] mt-2 leading-relaxed">
                We are here to listen, guide and support you.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Link
                href="/appointments"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#D84C70] hover:bg-rose-50 text-[14px] font-bold py-3 px-5 rounded-full shadow-md transition-all active:scale-98"
              >
                <Calendar className="w-4 h-4 text-[#D84C70]" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#D84C70] ml-auto" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 border border-white/80 hover:bg-white/10 text-white text-[14px] font-medium py-3 px-5 rounded-full transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-white ml-auto" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
