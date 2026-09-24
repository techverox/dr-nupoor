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
  Search, 
  Menu, 
  X, 
  MessageCircle
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

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Patient Guide", href: "/patient-guide" },
    { label: "Patient Stories", href: "/patient-stories" },
    { label: "Resources", href: "/patient-resources" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* 1. TOP UTILITY BAR (Exact Match with Reference) */}
      <div className="bg-[#FFF8F9] border-b border-[#F5D6DE]/60 text-[11.5px] sm:text-[12px] text-slate-600 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D84C70]" />
              Ahmedabad, Gujarat
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
            <span className="text-slate-500 font-medium">Follow Us:</span>
            <div className="flex items-center space-x-3 text-slate-600">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D84C70] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D84C70] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D84C70] transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D84C70] transition-colors"
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
        className={`w-full bg-white transition-all duration-300 ${
          isScrolled
            ? "sticky top-0 shadow-[0_4px_20px_rgba(216,76,112,0.08)] py-1.5 sm:py-2"
            : "py-2 sm:py-2.5 border-b border-slate-100"
        }`}
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
          <div className="hidden md:flex items-center space-x-3.5">
            <button
              type="button"
              className="p-1.5 text-slate-500 hover:text-[#D84C70] hover:bg-[#FDF2F4] rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 bg-[#D84C70] hover:bg-[#BE3A5C] text-white text-[13px] font-semibold px-4.5 py-2 rounded-full shadow-[0_4px_12px_rgba(216,76,112,0.22)] hover:shadow-[0_6px_16px_rgba(216,76,112,0.32)] transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/appointments"
              className="inline-flex items-center gap-1.5 bg-[#D84C70] text-white text-[12px] font-semibold px-3.5 py-2 rounded-full"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#D84C70] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE SLIDE-OVER DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-[82%] max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center">
                  <Image
                    src="/images/doctor/assets/logo.png"
                    alt="Dr. Noopur Patel Logo"
                    width={180}
                    height={60}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-3 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-[15px] font-medium px-3 py-2 rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "bg-[#FDF2F4] text-[#D84C70] font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#D84C70]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <Link
                href="/appointments"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#D84C70] text-white py-3 rounded-full font-semibold text-sm shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </Link>

              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] py-2.5 rounded-full font-medium text-sm hover:bg-[#25D366]/5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consult on WhatsApp</span>
              </a>

              <div className="text-xs text-slate-500 text-center space-y-1 pt-2">
                <p>Marengo CIMS Hospital, Ahmedabad</p>
                <p>{SITE_CONFIG.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
