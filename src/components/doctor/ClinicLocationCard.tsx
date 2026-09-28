"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  Compass,
  ExternalLink,
  Car,
  Clock,
  Layers,
  Building2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export interface ClinicLocationCardProps {
  className?: string;
}

// Coordinates for Marengo CIMS Hospital, Sola, Ahmedabad
const CIMS_COORDS = {
  lat: 23.0768,
  lng: 72.5074,
};

const CLINIC_ADDRESS =
  "Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad – 380060";

const MAP_QUERY = encodeURIComponent(
  "Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad, Gujarat 380060"
);

// High quality embedded Google Map
const EMBED_URL = `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

// Standard Google Maps directions endpoint
const DEFAULT_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

// Haversine formula for calculating distance
function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function ClinicLocationCard({
  className = "",
}: ClinicLocationCardProps) {
  const [activeTab, setActiveTab] = useState<"map" | "photo">("map");
  const [copied, setCopied] = useState(false);
  const [distanceInfo, setDistanceInfo] = useState<{
    distanceKm: number;
    estimatedMinutes: number;
    directionsUrl: string;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Copy Address Handler
  const handleCopyAddress = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(CLINIC_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error("Failed to copy address:", err);
      }
    }
  };

  // Real-time GPS Location & Distance Calculation
  const handleDetectLiveLocation = () => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const dist = calculateHaversineDistance(
          userLat,
          userLng,
          CIMS_COORDS.lat,
          CIMS_COORDS.lng
        );

        // Estimate driving minutes (assuming 25-30 km/h average city transit speed + buffer)
        const estMins = Math.max(5, Math.round((dist / 28) * 60));

        const liveDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${MAP_QUERY}`;

        setDistanceInfo({
          distanceKm: dist,
          estimatedMinutes: estMins,
          directionsUrl: liveDirectionsUrl,
        });
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location permission was denied. Tap below to navigate directly.");
        } else {
          setLocationError("Unable to retrieve location. Tap below to open Google Maps.");
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const activeDirectionsUrl = distanceInfo
    ? distanceInfo.directionsUrl
    : DEFAULT_DIRECTIONS_URL;

  return (
    <div
      className={`bg-white border border-[#F5D6DE] rounded-3xl p-5 sm:p-7 shadow-xs space-y-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#D84C70]">
            <MapPin className="w-5 h-5 flex-shrink-0" />
            <h3 className="font-serif text-[19px] sm:text-[20px] font-bold text-[#1A202C]">
              Clinic Location
            </h3>
          </div>
          <p className="text-[13.5px] font-semibold text-slate-800">
            Ahmedabad, Gujarat
          </p>
          <p className="text-[12.5px] text-slate-600 leading-relaxed">
            Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad – 380060
          </p>
        </div>

        {/* Copy Address Button */}
        <button
          type="button"
          onClick={handleCopyAddress}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#F5D6DE] bg-[#FFF8F9] text-[#D84C70] hover:bg-rose-50 text-[11px] font-bold transition-colors cursor-pointer"
          title="Copy Full Clinic Address"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* View Mode Switcher (Live Map vs Hospital Facility) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#FFF8F9] border border-[#F5D6DE] rounded-xl text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("map")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
            activeTab === "map"
              ? "bg-[#D84C70] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Live Map</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("photo")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
            activeTab === "photo"
              ? "bg-[#D84C70] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Hospital Reception</span>
        </button>
      </div>

      {/* Main Visual Display (Map or Photo) */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-[#F5D6DE] bg-slate-100 shadow-inner">
        {activeTab === "map" ? (
          <>
            {/* Live Interactive Google Maps Iframe */}
            <iframe
              title="Marengo CIMS Hospital Clinic Location - Dr. Noopur Patel"
              src={EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            {/* Floating Top Badge */}
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs border border-rose-200/80 shadow-xs flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-800">
                Marengo CIMS Hospital
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Real Hospital Reception Photo */}
            <Image
              src="/images/doctor/assets/clinic-reception.jpg"
              alt="Marengo CIMS Hospital Reception & Consultation Suite"
              fill
              className="object-cover"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white pointer-events-none">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 inline-block mb-0.5">
                Hospital OPD Wing
              </span>
              <p className="text-[12px] font-semibold drop-shadow-sm">
                Ground Floor Dedicated Consultation Suite
              </p>
            </div>
          </>
        )}
      </div>

      {/* GPS Location & Live Distance Tool */}
      <div className="p-3 rounded-2xl bg-[#FFF8F9] border border-[#F5D6DE] space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-800">
            <Car className="w-4 h-4 text-[#D84C70]" />
            <span>Transit &amp; Live Distance</span>
          </div>

          {!distanceInfo && (
            <button
              type="button"
              onClick={handleDetectLiveLocation}
              disabled={isLocating}
              className="text-[11px] font-bold text-[#D84C70] hover:underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <Compass className={`w-3 h-3 ${isLocating ? "animate-spin" : ""}`} />
              <span>{isLocating ? "Locating..." : "Find My Distance"}</span>
            </button>
          )}
        </div>

        {distanceInfo ? (
          <div className="flex items-center justify-between text-[12px] bg-white p-2 rounded-xl border border-emerald-200">
            <span className="text-emerald-800 font-medium">
              📍 Approx. <strong className="font-bold text-emerald-900">{distanceInfo.distanceKm.toFixed(1)} km</strong> away (~{distanceInfo.estimatedMinutes} mins drive)
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Live Route Ready
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70]" />
              <span>Off SG Highway corridor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70]" />
              <span>Free visitor parking</span>
            </div>
          </div>
        )}

        {locationError && (
          <p className="text-[11px] text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{locationError}</span>
          </p>
        )}
      </div>

      {/* Primary Action: Get Real-Time Directions */}
      <div className="space-y-2">
        <a
          href={activeDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-[#D84C70] hover:bg-[#C23B5E] text-white font-bold text-[13.5px] transition-all shadow-sm hover:shadow-md gap-2 active:scale-[0.99] cursor-pointer"
        >
          <Navigation className="w-4 h-4 fill-white" />
          <span>Get Real-Time Directions</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>

        {/* Secondary helper links */}
        <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
          <a
            href="https://maps.google.com/?q=Marengo+CIMS+Hospital+Ahmedabad"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D84C70] hover:underline inline-flex items-center gap-1"
          >
            <span>Open in Google Maps App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 font-medium">Landmark: Science City Rd</span>
        </div>
      </div>
    </div>
  );
}
