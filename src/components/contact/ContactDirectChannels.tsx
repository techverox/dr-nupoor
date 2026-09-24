"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Lock,
  Sparkles,
  ArrowRight,
  Headphones,
} from "lucide-react";

import { SITE_CONFIG } from "@/config/site";

export interface ContactDirectChannelsProps {
  phone?: string;
  email?: string;
  address?: string;
  workingHours?: string;
}

export default function ContactDirectChannels({
  phone = SITE_CONFIG.contact.phoneFormatted,
  email = SITE_CONFIG.contact.email,
  address = SITE_CONFIG.contact.address,
  workingHours = SITE_CONFIG.contact.workingHours,
}: ContactDirectChannelsProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2500);
    }
  };

  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Noopur Patel's clinic, I would like to inquire about a consultation / appointment."
  )}`;
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE_CONFIG.contact.address
  )}`;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Header & Quick Intro Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-wider">
          <Headphones className="w-3.5 h-3.5" />
          <span>Direct Founder &amp; Strategy Line</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0C1628] tracking-tight">
          Talk Directly with Our Directors
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Whether you&apos;re looking to deploy RestroMitra SaaS, list on Maru Gujarat, or scale an active Meta ad account, our senior leadership is accessible 24/7 with zero sales reps.
        </p>
      </div>

      {/* 2. Priority 1-Click WhatsApp Escalation Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border border-emerald-500/30 hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#008744] text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                  Instant WhatsApp
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  ACTIVE NOW
                </span>
              </div>
              <div className="text-base font-extrabold text-[#0C1628]">
                +91 90811 45178
              </div>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#008744] hover:bg-[#007038] text-white text-xs font-bold shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>Chat on WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          Average response: &lt; 15 mins. Fast-track demo bookings, custom proposal estimates, or emergency campaign diagnostics.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:hidden py-3 rounded-xl bg-[#008744] hover:bg-[#007038] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Start WhatsApp Chat</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 3. Direct Phone & Executive Email Split Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Direct Phone */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#008744] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(phone, "phone")}
                aria-label="Copy phone number"
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Copy Phone"
              >
                {copiedItem === "phone" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Executive Call Line
            </div>
            <a
              href={`tel:${cleanPhone}`}
              className="text-sm font-extrabold text-[#0C1628] hover:text-[#008744] transition-colors block"
            >
              {phone}
            </a>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">24/7 Available</span>
            <a
              href={`tel:${cleanPhone}`}
              className="font-bold text-[#008744] hover:underline"
            >
              Call Directly &rarr;
            </a>
          </div>
        </div>

        {/* Corporate Email */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#008744] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(email, "email")}
                aria-label="Copy email address"
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Copy Email"
              >
                {copiedItem === "email" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Corporate Inquiries
            </div>
            <a
              href={`mailto:${email}`}
              className="text-sm font-extrabold text-[#0C1628] hover:text-[#008744] transition-colors block truncate"
            >
              {email}
            </a>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Fast Inbound SLA</span>
            <a
              href={`mailto:${email}`}
              className="font-bold text-[#008744] hover:underline"
            >
              Send Email &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* 4. Physical Headquarters Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-slate-700" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Corporate Headquarters
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {address}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(address, "address")}
            aria-label="Copy full address"
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
            title="Copy Address"
          >
            {copiedItem === "address" ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{workingHours}</span>
          </div>
          <a
            href={googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#008744] hover:underline font-bold inline-flex items-center gap-1"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 5. Enterprise SLA & Security Badge */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#008744] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#008744]" />
          <span>100% MUTUAL NDA &amp; CONFIDENTIALITY SLA</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          All client consultations, SaaS demos, and ad account audits are strictly confidential under mutual non-disclosure. We never disclose ad creatives, merchant benchmarks, or proprietary data.
        </p>
      </div>
    </div>
  );
}
