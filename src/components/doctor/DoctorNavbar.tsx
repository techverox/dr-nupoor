"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  MessageCircle,
  ExternalLink
} from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from "./SocialIcons";
import { SITE_CONFIG } from "@/config/site";

export default function DoctorNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open & listen for ESC key
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Breast Cancer", href: "/breast-cancer-surgery" },
    { label: "Treatments", href: "/services" },
    { label: "Breast Conditions", href: "/#conditions" },
    { label: "Patient Stories", href: "/patient-stories" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Noopur Patel, I would like to schedule a consultation."
  )}`;

  return (
    <header className="w-full z-50 sticky top-0 transition-all duration-300">
      {/* 1. TOP UTILITY BAR (Hides on scroll for sleek sticky experience) */}
      <div
        className={`bg-[#FFF8F9] border-b border-[#F5D6DE]/60 text-[11.5px] sm:text-[12px] text-slate-600 hidden md:block transition-all duration-300 ${
          isScrolled ? "max-h-0 py-0 opacity-0 overflow-hidden" : "max-h-12 py-1.5 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D84C70]" />
              Marengo CIMS Hospital, Ahmedabad
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-[#D84C70]" />
              Mon - Sat: 10:00 AM - 6:00 PM
            </span>
            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-slate-700 font-semibold hover:text-[#D84C70] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D84C70]" />
              {SITE_CONFIG.contact.phone}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-500 font-medium">Connect:</span>
            <div className="flex items-center space-x-3 text-slate-600">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D84C70] transition-colors p-1"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D84C70] transition-colors p-1"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D84C70] transition-colors p-1"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D84C70] transition-colors p-1"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? "shadow-[0_4px_20px_rgba(23,25,35,0.06)] py-2 sm:py-2.5 border-b border-slate-100"
            : "py-2.5 sm:py-3 border-b border-slate-100"
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center group py-0.5" aria-label="Dr. Noopur Patel — Home">
            <Image
              src="/images/doctor/assets/logo.png"
              alt="Dr. Noopur Patel — Breast Cancer Surgeon & Surgical Breast Oncologist"
              width={220}
              height={73}
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-opacity hover:opacity-95"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13.5px] sm:text-[14px] font-medium transition-all duration-200 relative py-1 ${
                    active
                      ? "text-[#D84C70] font-semibold"
                      : "text-slate-700 hover:text-[#D84C70]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D84C70] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 text-[13px] font-semibold px-3.5 py-2 rounded-full transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 bg-[#D84C70] hover:bg-[#BE3A5C] text-white text-[13px] font-semibold px-5 py-2 rounded-full shadow-[0_2px_8px_rgba(216,76,112,0.22)] hover:shadow-[0_4px_14px_rgba(216,76,112,0.32)] transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Quick Actions (Call, WhatsApp, Pink Hamburger) */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
              className="w-8 h-8 rounded-full bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center text-[#D84C70] hover:bg-[#FCE8ED] active:scale-95 transition-all"
              aria-label="Call Clinic"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#F0FDF4] border border-emerald-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-[#D84C70] hover:bg-[#C0395D] text-white flex items-center justify-center shadow-sm cursor-pointer active:scale-95 transition-all"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE ACCESSIBLE SLIDE-OVER DRAWER */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-[85%] max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <Image
                  src="/images/doctor/assets/logo.png"
                  alt="Dr. Noopur Patel Logo"
                  width={180}
                  height={60}
                  className="h-9 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-2 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-[15px] font-medium px-4 py-3 rounded-xl transition-colors min-h-[44px] flex items-center ${
                      isActive(link.href)
                        ? "bg-[#FFF8F9] text-[#D84C70] font-bold border border-[#F5D6DE]"
                        : "text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link
                href="/appointments"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#D84C70] text-white py-3.5 rounded-full font-semibold text-sm shadow-md min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-emerald-500 text-emerald-700 bg-emerald-50/50 py-3 rounded-full font-semibold text-sm min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consult on WhatsApp</span>
              </a>

              <div className="text-xs text-slate-500 text-center space-y-0.5 pt-2">
                <p className="font-semibold text-slate-700">Marengo CIMS Hospital, Ahmedabad</p>
                <p>OPD Hours: Mon - Sat: 10:00 AM - 6:00 PM</p>
                <p>{SITE_CONFIG.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
