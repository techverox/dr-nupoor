"use client";

import React, { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Navigation,
  Building2,
  Copy,
  Check,
} from "lucide-react";

export interface ContactGoogleMapProps {
  address?: string;
  className?: string;
}

export default function ContactGoogleMap({
  address = "Orchid Complex, Office No. B, Door No. D-23, Approach Road / Pirojpura Road, Chhapi, Banaskantha, Gujarat - 385210",
  className = "",
}: ContactGoogleMapProps) {
  const [copied, setCopied] = useState(false);

  // Exact Google Maps Search Query for Chhapi Orchid Complex
  const mapQuery = encodeURIComponent(
    "Orchid Complex, Approach Road, Chhapi, Banaskantha, Gujarat 385210"
  );
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  const copyAddress = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className={`py-10 sm:py-14 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden">
          {/* Map Card Header */}
          <div className="p-5 sm:p-7 bg-gradient-to-b from-slate-50/70 to-white border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Physical Corporate Headquarters</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0C1628] tracking-tight">
                Visit the DigiVigee Campus
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {address}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  24/7 Operations &amp; Strategy Pods
                </span>
                <span>•</span>
                <span>Chhapi, Banaskantha District, Gujarat</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={copyAddress}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied Address!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#008744] hover:bg-[#007038] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Interactive Embedded Google Map Container */}
          <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-100 overflow-hidden">
            <iframe
              title="DigiVigee Corporate Location"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* Floating Location Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10 pointer-events-auto">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/90 shadow-xl shadow-slate-900/10 max-w-xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#0C1628]">
                  <div className="w-5 h-5 rounded-lg bg-[#008744] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-3 h-3" />
                  </div>
                  <span>DigiVigee Gujarat HQ</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug font-medium">
                  Orchid Complex, Office B, Door D-23, Approach Road, Chhapi - 385210
                </p>
                <div className="pt-0.5 flex items-center justify-between text-[10px] font-bold text-[#008744]">
                  <span>Verified Corporate Pin</span>
                  <a
                    href={directMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-0.5"
                  >
                    <span>Full Map</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
