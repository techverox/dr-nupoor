"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ChevronDown,
  ArrowRight,
  QrCode,
  Star
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function DoctorNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Clean, minimalist, uncluttered navigation links (5 essential items)
  const navLinks = [
    { label: "About", href: "/about" },
    { 
      label: "Treatments", 
      href: "/services",
      hasDropdown: true,
      subItems: [
        { 
          title: "Breast Cancer Surgery", 
          href: "/breast-cancer-surgery", 
          desc: "Comprehensive oncological staging & surgical care" 
        },
        { 
          title: "Breast Conservation (BCS)", 
          href: "/breast-conservation-surgery-ahmedabad", 
          desc: "Lumpectomy preserving natural breast shape" 
        },
        { 
          title: "Mastectomy Surgery", 
          href: "/mastectomy-ahmedabad", 
          desc: "Total, MRM & skin-sparing clearance" 
        },
        { 
          title: "Oncoplastic Breast Surgery", 
          href: "/oncoplastic-breast-surgery-ahmedabad", 
          desc: "Tumor excision with cosmetic breast contouring" 
        },
        { 
          title: "Sentinel Node Biopsy (SLNB)", 
          href: "/sentinel-lymph-node-biopsy", 
          desc: "Precision lymphatic mapping protecting arm health" 
        },
        { 
          title: "Breast Reconstruction", 
          href: "/breast-reconstruction-surgery-ahmedabad", 
          desc: "Immediate or delayed breast form restoration" 
        },
      ]
    },
    { label: "Conditions", href: "/#conditions" },
    { label: "Patient Stories", href: "/patient-stories" },
    { label: "Feedback (QR)", href: "/#feedback" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleMouseEnterTreatments = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsTreatmentsOpen(true);
  };

  const handleMouseLeaveTreatments = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsTreatmentsOpen(false);
    }, 150);
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Nupur Patel, I would like to schedule a consultation."
  )}`;

  return (
    <header className="w-full z-50 sticky top-0 transition-all duration-300">
      
      {/* 1. TOP UTILITY BAR (Ultra-minimalist, sleek, calm) */}
      <div
        className={`bg-[#FCF9FA] border-b border-[#F0E4E7] text-[11.5px] text-slate-600 hidden md:block transition-all duration-300 ${
          isScrolled ? "max-h-0 py-0 opacity-0 overflow-hidden" : "max-h-10 py-1.5 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D84C70]" />
              Marengo CIMS Hospital, Sola, Ahmedabad
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Mon - Sat: 10:00 AM - 6:00 PM
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/#feedback"
              className="flex items-center gap-1.5 text-[#88213B] font-semibold hover:text-[#D84C70] transition-colors"
            >
              <QrCode className="w-3.5 h-3.5 text-[#D84C70]" />
              <span>Review / Feedback (QR)</span>
            </Link>
            <span className="text-slate-300">|</span>
            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-slate-700 font-semibold hover:text-[#88213B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D84C70]" />
              <span>{SITE_CONFIG.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR (Uncluttered, Minimalist Luxury) */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? "shadow-[0_4px_20px_rgba(23,25,35,0.05)] py-2 border-b border-slate-100"
            : "py-2.5 sm:py-3 border-b border-slate-100"
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo Branding */}
          <Link 
            href="/" 
            className="flex items-center group shrink-0" 
            aria-label="Dr. Nupur Patel — Home"
          >
            <Image
              src="/images/doctor/assets/logo.png"
              alt="Dr. Nupur Patel — Breast Cancer Surgeon & Surgical Breast Oncologist"
              width={240}
              height={80}
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-[1.01]"
              priority
            />
          </Link>

          {/* Desktop Navigation Links — Streamlined & Never Wrapped */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={handleMouseEnterTreatments}
                    onMouseLeave={handleMouseLeaveTreatments}
                  >
                    <Link
                      href={link.href}
                      className={`text-[13.5px] font-medium transition-all duration-200 flex items-center gap-1 py-1.5 whitespace-nowrap ${
                        active || isTreatmentsOpen
                          ? "text-[#88213B] font-semibold"
                          : "text-slate-700 hover:text-[#88213B]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTreatmentsOpen ? "rotate-180 text-[#88213B]" : "text-slate-400"}`} />
                    </Link>

                    {/* Elegant Minimalist Dropdown Menu */}
                    {isTreatmentsOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="bg-white rounded-2xl shadow-xl border border-[#F0D5DC] p-3 space-y-1">
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setIsTreatmentsOpen(false)}
                              className="block p-2.5 rounded-xl hover:bg-[#FFF5F7] transition-colors group"
                            >
                              <div className="text-xs font-bold text-slate-800 group-hover:text-[#88213B] transition-colors">
                                {sub.title}
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {sub.desc}
                              </div>
                            </Link>
                          ))}
                          <div className="pt-2 mt-1 border-t border-slate-100 px-2.5 pb-1 flex items-center justify-between text-[11px] font-bold text-[#88213B]">
                            <Link 
                              href="/services" 
                              onClick={() => setIsTreatmentsOpen(false)}
                              className="hover:underline flex items-center gap-1"
                            >
                              <span>View All Procedures</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13.5px] font-medium transition-all duration-200 relative py-1.5 whitespace-nowrap ${
                    active
                      ? "text-[#88213B] font-semibold"
                      : "text-slate-700 hover:text-[#88213B]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#88213B] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons — Sleek, Single-Line, Zero Wrapping */}
          <div className="hidden md:flex items-center space-x-2.5 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 text-[12.5px] font-semibold px-3.5 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/appointments"
              className="inline-flex items-center gap-1.5 bg-[#88213B] hover:bg-[#731930] text-white text-[12.5px] font-semibold px-4.5 py-2 rounded-full shadow-[0_2px_8px_rgba(136,33,59,0.2)] hover:shadow-[0_4px_12px_rgba(136,33,59,0.3)] transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Quick Actions (Call, WhatsApp, Hamburger) */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
              className="w-8 h-8 rounded-full bg-[#FFF5F7] border border-[#F5CAD5] flex items-center justify-center text-[#D84C70] hover:bg-[#FCE8ED] active:scale-95 transition-all"
              aria-label="Call Clinic"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#F0FDF4] border border-emerald-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 active:scale-95 transition-all"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-[#88213B] hover:bg-[#731930] text-white flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-all"
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

      {/* 3. MOBILE SLIDE-OVER DRAWER */}
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
                  alt="Dr. Nupur Patel Logo"
                  width={200}
                  height={66}
                  className="h-10 w-auto object-contain"
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

              <nav className="flex flex-col space-y-1.5 mt-6">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[14.5px] font-medium px-4 py-2.5 rounded-xl transition-colors ${
                    pathname === "/"
                      ? "bg-[#FFF8F9] text-[#88213B] font-bold border border-[#F5D6DE]"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[14.5px] font-medium px-4 py-2.5 rounded-xl transition-colors ${
                    pathname.startsWith("/about")
                      ? "bg-[#FFF8F9] text-[#88213B] font-bold border border-[#F5D6DE]"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  About Dr. Nupur Patel
                </Link>
                <Link
                  href="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[14.5px] font-medium px-4 py-2.5 rounded-xl transition-colors ${
                    pathname.startsWith("/services") || pathname.startsWith("/breast-cancer-surgery") || pathname.startsWith("/mastectomy")
                      ? "bg-[#FFF8F9] text-[#88213B] font-bold border border-[#F5D6DE]"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Treatments &amp; Surgery
                </Link>
                <Link
                  href="/#conditions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[14.5px] font-medium px-4 py-2.5 rounded-xl text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  Breast Conditions
                </Link>
                <Link
                  href="/patient-stories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[14.5px] font-medium px-4 py-2.5 rounded-xl transition-colors ${
                    pathname.startsWith("/patient-stories")
                      ? "bg-[#FFF8F9] text-[#88213B] font-bold border border-[#F5D6DE]"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Patient Stories
                </Link>
                <Link
                  href="/#feedback"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[14.5px] font-medium px-4 py-2.5 rounded-xl text-slate-800 hover:bg-[#FFF8F9] hover:text-[#88213B] transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#D84C70]" />
                    <span>Feedback &amp; Review (QR)</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#88213B] bg-[#FFF0F3] px-2 py-0.5 rounded-full border border-[#F5D6DE]">
                    Scan QR
                  </span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[14.5px] font-medium px-4 py-2.5 rounded-xl transition-colors ${
                    pathname.startsWith("/contact")
                      ? "bg-[#FFF8F9] text-[#88213B] font-bold border border-[#F5D6DE]"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Contact Clinic
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link
                href="/appointments"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#88213B] text-white py-3 rounded-full font-semibold text-sm shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-emerald-500 text-emerald-700 bg-emerald-50/50 py-2.5 rounded-full font-semibold text-sm"
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
