"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronUp 
} from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from "./SocialIcons";
import { SITE_CONFIG } from "@/config/site";

export default function DoctorFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#F5D6DE] text-slate-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Column 1: Doctor Identity & Mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group" aria-label="Dr. Noopur Patel — Home">
              <Image
                src="/images/doctor/assets/logo.png"
                alt="Dr. Noopur Patel — Breast Cancer Surgeon & Surgical Breast Oncologist"
                width={250}
                height={84}
                className="h-14 sm:h-16 w-auto object-contain transition-opacity hover:opacity-95"
              />
            </Link>

            <p className="text-[13.5px] text-slate-600 leading-relaxed pt-2">
              Dedicated to compassionate, evidence-based, and patient-centered breast surgical oncology. Combining oncologic clearance with aesthetic preservation for every woman.
            </p>

            <div className="pt-2 text-[12px] text-slate-500">
              <span className="font-semibold text-slate-700">Hospital Affiliation:</span>
              <p>Marengo CIMS Hospital, Sola, Ahmedabad</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-[17px] font-bold text-[#1A202C] tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/patient-guide" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Patient Guide
                </Link>
              </li>
              <li>
                <Link href="/patient-stories" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Patient Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-slate-600 hover:text-[#D84C70] transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-4">
            <h3 className="font-serif text-[17px] font-bold text-[#1A202C] tracking-tight">
              Contact Us
            </h3>
            <ul className="space-y-3 text-[13.5px]">
              <li className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-[#D84C70] transition-colors font-medium"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <Mail className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-[#D84C70] transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <MapPin className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                <span>
                  Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad, Gujarat
                </span>
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <Clock className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                <span>Mon - Sat: 10:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us & Back to Top */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-[17px] font-bold text-[#1A202C] tracking-tight mb-4">
                Follow Us
              </h3>
              <div className="flex items-center space-x-3 text-slate-600">
                <a
                  href={SITE_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#D84C70] hover:border-[#D84C70] transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#D84C70] hover:border-[#D84C70] transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#D84C70] hover:border-[#D84C70] transition-all"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#D84C70] hover:border-[#D84C70] transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-[#D84C70] text-white flex items-center justify-center shadow-md hover:bg-[#BE3A5C] transition-all ml-auto cursor-pointer active:scale-95"
                aria-label="Scroll to top"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="mt-14 pt-6 border-t border-[#F5D6DE]/70 flex flex-col md:flex-row items-center justify-between text-[12.5px] text-slate-500 gap-4">
          <p>© 2026 Dr. Noopur Patel. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#D84C70] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[#D84C70] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/medical-disclaimer" className="hover:text-[#D84C70] transition-colors">
              Medical Disclaimer
            </Link>
            <span className="text-[#D84C70] font-medium flex items-center gap-1">
              Designed with <span className="text-red-500">❤️</span> for women&apos;s health
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
