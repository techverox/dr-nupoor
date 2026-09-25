"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquarePlus, CalendarDays, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isHomeActive = pathname === "/";
  const isAppointmentActive = pathname?.startsWith("/appointments");
  const isContactActive = pathname?.startsWith("/contact");
  const isFeedbackActive = pathname?.startsWith("/patient-stories");

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Noopur Patel, I would like to consult regarding breast health."
  )}`;

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#F5D6DE] shadow-[0_-4px_20px_rgba(216,76,112,0.08)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-2 relative">
        {/* 1. HOME */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors duration-200 select-none ${
            isHomeActive
              ? "text-[#D84C70] font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Home
            className={`w-5 h-5 transition-transform duration-200 ${
              isHomeActive ? "scale-110 text-[#D84C70]" : ""
            }`}
            strokeWidth={isHomeActive ? 2.5 : 2}
          />
          <span className="text-[10px] mt-1 tracking-tight leading-none">Home</span>
          {isHomeActive && (
            <span className="w-1 h-1 rounded-full bg-[#D84C70] mt-1" />
          )}
        </Link>

        {/* 2. WHATSAPP */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-emerald-600 transition-colors duration-200 select-none group"
        >
          <svg
            className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform duration-200"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.813h.005c3.18 0 5.767-2.586 5.768-5.766 0-1.54-.599-2.989-1.688-4.079-1.09-1.089-2.538-1.72-4.085-1.72zm6.985 9.854c-.287.808-1.42 1.481-1.955 1.575-.535.093-1.04.14-2.825-.601-2.28-.946-3.738-3.267-3.852-3.418-.113-.152-.924-1.231-.924-2.348 0-1.118.583-1.668.79-1.895.207-.227.452-.284.603-.284.15 0 .302.001.433.007.14.007.327-.053.511.391.19.458.647 1.578.704 1.692.057.114.095.247.019.398-.076.151-.114.246-.227.378-.113.133-.238.297-.34.399-.113.113-.231.236-.1.462.132.226.587.967 1.26 1.567.866.772 1.597 1.011 1.823 1.124.226.113.358.094.49-.057.133-.151.566-.66.717-.887.151-.226.302-.189.509-.113.207.075 1.319.622 1.545.735.226.113.377.17.433.264.057.094.057.546-.23 1.354z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.393A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.167 8.167 0 01-4.218-1.171l-.302-.18-2.964.777.791-2.889-.197-.314A8.164 8.164 0 013.8 12c0-4.521 3.679-8.2 8.2-8.2 4.521 0 8.2 3.679 8.2 8.2 0 4.521-3.679 8.2-8.2 8.2z"
            />
          </svg>
          <span className="text-[10px] mt-1 tracking-tight leading-none">WhatsApp</span>
        </a>

        {/* 3. FEEDBACK (Center Elevated Prominent Button) */}
        <div className="flex flex-col items-center justify-center relative -top-3">
          <Link
            href="/patient-stories#feedback"
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9B2846] via-[#D84C70] to-[#E25C82] text-white flex items-center justify-center shadow-lg shadow-[#D84C70]/40 ring-4 ring-white active:scale-95 transition-transform duration-200 select-none"
            aria-label="Submit Patient Feedback"
          >
            <MessageSquarePlus className="w-6 h-6 text-white" />
          </Link>
          <span
            className={`text-[10px] mt-1 tracking-tight leading-none font-semibold ${
              isFeedbackActive ? "text-[#D84C70]" : "text-slate-700"
            }`}
          >
            Feedback
          </span>
        </div>

        {/* 4. BOOK APPOINTMENT */}
        <Link
          href="/appointments"
          className={`flex flex-col items-center justify-center py-1 transition-colors duration-200 select-none ${
            isAppointmentActive
              ? "text-[#D84C70] font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <CalendarDays
            className={`w-5 h-5 transition-transform duration-200 ${
              isAppointmentActive ? "scale-110 text-[#D84C70]" : ""
            }`}
            strokeWidth={isAppointmentActive ? 2.5 : 2}
          />
          <span className="text-[10px] mt-1 tracking-tight leading-none text-center">
            Appointment
          </span>
          {isAppointmentActive && (
            <span className="w-1 h-1 rounded-full bg-[#D84C70] mt-1" />
          )}
        </Link>

        {/* 5. CONTACT */}
        <Link
          href="/contact"
          className={`flex flex-col items-center justify-center py-1 transition-colors duration-200 select-none ${
            isContactActive
              ? "text-[#D84C70] font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <PhoneCall
            className={`w-5 h-5 transition-transform duration-200 ${
              isContactActive ? "scale-110 text-[#D84C70]" : ""
            }`}
            strokeWidth={isContactActive ? 2.5 : 2}
          />
          <span className="text-[10px] mt-1 tracking-tight leading-none">Contact</span>
          {isContactActive && (
            <span className="w-1 h-1 rounded-full bg-[#D84C70] mt-1" />
          )}
        </Link>
      </div>
    </nav>
  );
}
