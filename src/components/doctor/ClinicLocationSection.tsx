"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Calendar,
  Clock,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Car,
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
            Consult Dr. Noopur Patel in Ahmedabad
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Consultations, digital mammography, ultrasound-guided biopsies, and advanced surgical admissions at Marengo CIMS Hospital, Sola.
          </p>
        </div>

        {/* 2-Column Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Hospital Details & Contact Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="bg-[#FAF7F8] p-6 sm:p-8 rounded-3xl border border-[#F0D5DC] shadow-sm space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#9B2846] block mb-1">
                  PRIMARY HOSPITAL AFFILIATION
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Marengo CIMS Hospital
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Off Science City Road, Sola, Ahmedabad, Gujarat 380060
                </p>
              </div>

              {/* OPD Timings & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#EED7DC] shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <Clock className="w-4 h-4 text-[#9B2846]" />
                    <span>OPD Hours</span>
                  </div>
                  <p className="text-xs text-slate-600">Mon - Sat: 10:00 AM – 6:00 PM</p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Prior appointment advised</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EED7DC] shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <Phone className="w-4 h-4 text-[#9B2846]" />
                    <span>Direct Helpline</span>
                  </div>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                    className="text-xs font-bold text-[#88213B] hover:underline"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Dedicated OPD desk</p>
                </div>
              </div>

              {/* Amenities & Accessibility */}
              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Ample on-site parking with valet &amp; wheelchair assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Integrated 3D digital mammography &amp; ultrasound biopsy suites</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Cashless Mediclaim &amp; corporate TPA facilitation</span>
                </div>
              </div>

              {/* Hyperlocal Links */}
              <div className="pt-3 border-t border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Accessible Across Ahmedabad Neighborhoods:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: "SG Highway", href: "/locations/sg-highway-breast-surgeon" },
                    { name: "Sola & Science City", href: "/locations/sola-science-city-breast-surgeon" },
                    { name: "Shyamal & Satellite", href: "/locations/shyamal-satellite-breast-clinic" },
                    { name: "Navrangpura", href: "/locations/navrangpura-breast-specialist" },
                    { name: "Maninagar", href: "/locations/maninagar-breast-doctor" },
                  ].map((loc, idx) => (
                    <Link
                      key={idx}
                      href={loc.href}
                      className="px-2.5 py-1 text-[11px] rounded-md bg-white border border-[#F0D5DC] text-[#88213B] hover:bg-[#FCE8ED] font-medium transition-colors"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Marengo+CIMS+Hospital+Sola+Ahmedabad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#EED7DC] text-[#88213B] font-bold text-xs hover:bg-[#FAF3F5] transition-all shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#88213B]" />
                <span>Get Directions (Google Maps)</span>
              </a>

              <Link
                href="/appointments"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9B2846] to-[#88213B] text-white font-bold text-xs shadow-md shadow-[#9B2846]/20 hover:brightness-105 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full h-[400px] lg:h-full min-h-[380px] rounded-3xl overflow-hidden border border-[#F0D5DC] shadow-md bg-slate-100">
              <iframe
                title="Marengo CIMS Hospital Sola Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.366432657492!2d72.5085!3d23.0768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9caa4d081f9d%3A0xe5452f48ef53cfd7!2sMarengo%20CIMS%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[0.1] contrast-[1.05]"
              />

              {/* Float Map Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#F0D5DC] shadow-lg text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#9B2846]" />
                  <span>Marengo CIMS Hospital, Sola</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Near Science City Flyover, Off SG Highway
                </div>
                <a
                  href="https://maps.google.com/?q=Marengo+CIMS+Hospital+Sola+Ahmedabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#88213B] mt-2 hover:underline"
                >
                  Open in Maps App <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
