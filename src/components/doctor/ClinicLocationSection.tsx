"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Calendar,
  Clock,
  Navigation,
  Mail,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function ClinicLocationSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-[#F5E6EA]" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-3">
            <MapPin className="w-3.5 h-3.5" />
            PRACTICE LOCATION &amp; CONSULTATIONS
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
            Visit Our Clinic in Ahmedabad
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Convenient location with easy access and a comfortable consultation experience.
          </p>
        </div>

        {/* 2-Column Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Hospital Details & Contact Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {/* 4 Information Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Clinic / Hospital */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DC] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center text-[#D84C70]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Clinic / Hospital</span>
                </div>
                <p className="text-xs font-bold text-slate-900 mt-2">Marengo CIMS Hospital</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Off Science City Road, Sola, Ahmedabad</p>
              </div>

              {/* Card 2: OPD Timings */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DC] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center text-[#D84C70]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>OPD Timings</span>
                </div>
                <p className="text-xs font-bold text-slate-900 mt-2">Mon - Sat: 10:00 AM – 6:00 PM</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Prior appointment advised</p>
              </div>

              {/* Card 3: Call Us */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DC] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center text-[#D84C70]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>Call Us</span>
                </div>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                  className="text-xs font-bold text-[#88213B] hover:underline block mt-2"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
                <p className="text-[11px] text-slate-500 mt-0.5">Direct OPD reception</p>
              </div>

              {/* Card 4: Email */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DC] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center text-[#D84C70]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>Email</span>
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-xs font-bold text-slate-800 hover:text-[#88213B] block mt-2 truncate"
                >
                  {SITE_CONFIG.contact.email}
                </a>
                <p className="text-[11px] text-slate-500 mt-0.5">Online queries &amp; records</p>
              </div>
            </div>

            {/* Interactive Map Bar */}
            <div className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#F0D5DC] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#EED7DC] flex items-center justify-center text-[#88213B] shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Locate Marengo CIMS Hospital</div>
                  <div className="text-[11px] text-slate-500">Science City Road, Sola, Ahmedabad, Gujarat 380060</div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Marengo+CIMS+Hospital+Sola+Ahmedabad"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#EED7DC] text-[#88213B] text-xs font-bold hover:bg-[#FFF5F7] transition-all shadow-2xs"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                href="/appointments"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#88213B] hover:bg-[#731930] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#88213B]/20 transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Clinic Appointment</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Reception Photo Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] rounded-3xl overflow-hidden border border-[#F0D5DC] shadow-sm bg-slate-100 group">
              <Image
                src="/images/doctor/assets/clinic-reception.jpg"
                alt="Dr. Noopur Patel Clinic Reception at Marengo CIMS Hospital"
                fill
                className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Badge on Image */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white border border-white/30 mb-1.5">
                  <MapPin className="w-3 h-3 text-rose-300" />
                  <span>Marengo CIMS Hospital Campus</span>
                </div>
                <div className="font-serif text-lg sm:text-xl font-bold">
                  Dedicated Breast Care Clinic &amp; Consultation Suite
                </div>
                <div className="text-xs text-slate-200 mt-0.5">
                  Private, empathetic consultation setting with specialized lady support staff.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
