"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronUp,
  ShieldCheck,
  Building2,
  Calendar
} from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from "./SocialIcons";
import { SITE_CONFIG } from "@/config/site";

export default function DoctorFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#F5D6DE] text-slate-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Doctor Identity & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group py-1" aria-label="Dr. Noopur Patel — Home">
              <Image
                src="/images/doctor/assets/logo.png"
                alt="Dr. Noopur Patel — Breast Cancer Surgeon & Surgical Breast Oncologist"
                width={250}
                height={84}
                className="h-12 sm:h-14 w-auto object-contain transition-opacity hover:opacity-95"
              />
            </Link>

            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Dedicated to compassionate, evidence-based, and patient-centered surgical breast oncology. 
              Combining complete oncologic tumor clearance with oncoplastic aesthetic preservation for every woman.
            </p>

            <div className="pt-2 text-[12.5px] text-slate-600 space-y-1 bg-[#FFF8F9] p-3 rounded-xl border border-[#F5D6DE]/60">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Building2 className="w-4 h-4 text-[#D84C70]" />
                <span>Primary Clinical Practice</span>
              </div>
              <p className="text-slate-600 pl-5 text-[12px]">
                Department of Surgical Breast Oncology, Marengo CIMS Hospital, Sola, Ahmedabad, Gujarat 380060
              </p>
            </div>
          </div>

          {/* Column 2: Clinical Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-serif text-[17px] font-bold text-[#1A202C] tracking-tight">
              Clinical Procedures
            </h3>
            <ul className="space-y-2 text-[13.5px]">
              <li>
                <Link href="/services#breast-cancer-diagnosis-and-treatment" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Breast Cancer Diagnosis &amp; Surgery
                </Link>
              </li>
              <li>
                <Link href="/services#oncoplastic-breast-surgery" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Oncoplastic Breast Surgery
                </Link>
              </li>
              <li>
                <Link href="/services#breast-conservation-surgery-bcs" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Breast Conservation Surgery (BCS)
                </Link>
              </li>
              <li>
                <Link href="/services#breast-reconstruction-surgery" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Breast Reconstruction Surgery
                </Link>
              </li>
              <li>
                <Link href="/services#benign-breast-conditions" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Benign Breast Disease Care
                </Link>
              </li>
              <li>
                <Link href="/patient-guide" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Self-Exam Guide &amp; Screening
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & OPD Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-serif text-[17px] font-bold text-[#1A202C] tracking-tight">
              Hospital Contact
            </h3>
            <ul className="space-y-3 text-[13px]">
              <li className="flex items-center gap-2.5 text-slate-600">
                <Phone className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-[#D84C70] transition-colors font-semibold text-slate-800"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-600">
                <Mail className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-[#D84C70] transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-600">
                <MapPin className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                <span>
                  Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad, Gujarat 380060
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-600">
                <Clock className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                <span>Mon – Sat: 10:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Social (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-[17px] font-bold text-[#1A202C] tracking-tight">
              Navigation
            </h3>
            <ul className="space-y-2 text-[13px]">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  About Dr. Noopur
                </Link>
              </li>
              <li>
                <Link href="/patient-stories" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Patient Stories
                </Link>
              </li>
              <li>
                <Link href="/share-story" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Share Your Story (QR)
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-slate-600 hover:text-[#D84C70] transition-colors font-semibold">
                  Book Appointment
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Connect Online
              </span>
              <div className="flex items-center space-x-2.5 text-slate-600">
                <a
                  href={SITE_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#D84C70] transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#D84C70] transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#D84C70] transition-all"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#D84C70] transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Back to top */}
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#D84C70] cursor-pointer"
                aria-label="Scroll back to top"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Clinical Medical Disclaimer Advisory Box */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F5D6DE]/70 text-[11.5px] text-slate-600 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-800">Medical Disclaimer:</strong> The clinical educational materials, surgical descriptions, and patient guides provided on this website are for general awareness regarding breast oncology and breast health. They do not substitute for formal in-person clinical examination, diagnostic imaging, biopsy, or a personalized doctor-patient consultation. For acute medical concerns or breast symptoms, please schedule an OPD consultation at Marengo CIMS Hospital or contact the hospital casualty department immediately.
            </p>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between text-[12px] text-slate-500 gap-4">
          <p>© 2026 Dr. Noopur Patel. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#D84C70] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[#D84C70] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/medical-disclaimer" className="hover:text-[#D84C70] transition-colors">
              Medical Disclaimer
            </Link>
            <span className="text-slate-500">
              Marengo CIMS Hospital, Ahmedabad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
