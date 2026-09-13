"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Loader2,
  Check,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SiteSettings } from "@/types";
import { getAttributionContext } from "@/lib/tracking/attribution";
import { trackEvent } from "@/lib/tracking/events";

export default function Footer() {
  const [subEmail, setSubEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);
  const [subMessage, setSubMessage] = useState("");
  const [subError, setSubError] = useState("");
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch {
        // Fallback to SITE_CONFIG silently
      }
    };

    fetchSettings();

    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("digivigee-cms-sync");
        channel.onmessage = (e) => {
          if (e.data?.type === "CMS_UPDATED") {
            fetchSettings();
          }
        };
      }
    } catch {
      // BroadcastChannel unsupported fallback
    }

    return () => {
      if (channel) {
        channel.close();
      }
    };
  }, []);

  const handleSub = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = subEmail.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setSubError("Please enter a valid business email address.");
      return;
    }

    setSubLoading(true);
    setSubError("");

    try {
      const attr = typeof window !== "undefined" ? getAttributionContext() : null;

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          source: "website_footer",
          utmSource: attr?.utmSource,
          utmMedium: attr?.utmMedium,
          utmCampaign: attr?.utmCampaign,
          utmContent: attr?.utmContent,
          utmTerm: attr?.utmTerm,
          referrer: attr?.referrer || (typeof document !== "undefined" ? document.referrer : undefined),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubSuccess(true);
        setSubMessage(data.message || "Thank you for subscribing to DigiVigee updates!");
        setSubEmail("");
        trackEvent("newsletter_subscription", { email: cleanEmail });
      } else {
        setSubError(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setSubError("Network error. Please check your connection and try again.");
    } finally {
      setSubLoading(false);
    }
  };

  const phone = settings?.contact?.phone || SITE_CONFIG?.contact?.phone || "+91 90811 45178";
  const email = settings?.contact?.email || SITE_CONFIG?.contact?.email || "Contact@digivigee.com";
  const address = settings?.contact?.address || SITE_CONFIG?.contact?.address || "Orchid Complex, Office No. B, Door No. D-23, Approach Road / Pirojpura Road, Chhapi, Banaskantha, Gujarat - 385210";
  const copyright =
    settings?.footerContent?.copyrightText ||
    `© ${new Date().getFullYear()} DigiVigee Platform. All rights reserved.`;

  const socials = {
    linkedin: settings?.socials?.linkedin || SITE_CONFIG?.socials?.linkedin || "https://linkedin.com/company/digivigee",
    twitter: settings?.socials?.twitter || SITE_CONFIG?.socials?.twitter || "https://twitter.com/digivigee",
    instagram: settings?.socials?.instagram || SITE_CONFIG?.socials?.instagram || "https://instagram.com/digivigee",
    facebook: settings?.socials?.facebook || SITE_CONFIG?.socials?.facebook || "https://facebook.com/digivigee",
    youtube: settings?.socials?.youtube || SITE_CONFIG?.socials?.youtube || "https://youtube.com/@digivigee",
  };

  return (
    <footer className="relative z-10 w-full bg-white dark:bg-[#0B0F17] text-slate-600 dark:text-slate-400 text-xs border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* ================================================================
            MAIN 4-COLUMN MINIMALIST & PREMIUM FOOTER GRID
            ================================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-100 dark:border-slate-800/60 text-left">
          
          {/* Column 1: Brand, Tagline & Direct Coordinates (5 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs group-hover:scale-105 transition-all">
                <Image
                  src="/images/digivigee_logo.png"
                  alt="DigiVigee Logo"
                  width={120}
                  height={38}
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">
                  DIGIVIGEE
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Performance & Digital Growth
                </p>
              </div>
            </Link>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Full-funnel performance marketing, search engine optimization, and conversion-focused web systems engineered to accelerate compounding agency revenue.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Official Meta Business Partner</span>
            </div>

            {/* Direct Contact Coordinates */}
            <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{phone}</span>
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{email}</span>
                </a>
              )}

              {address && (
                <div className="flex items-start gap-2.5 text-slate-500 dark:text-slate-400 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{address}</span>
                </div>
              )}
            </div>

            {/* Verified Social Channels */}
            <div className="flex items-center gap-2 pt-2">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition-all"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              )}

              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter / X"
                  className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition-all"
                >
                  <span className="sr-only">Twitter / X</span>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}

              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition-all"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
              )}

              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition-all"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}

              {socials.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition-all"
                >
                  <span className="sr-only">YouTube</span>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Core Growth Services (100% Real URLs) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[12px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Growth Services
            </div>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/services/performance-marketing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Performance Marketing & Ads
                </Link>
              </li>
              <li>
                <Link href="/services/seo-and-local-seo" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  SEO & Local Optimization
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-marketing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/website-design-and-development" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Web Design & Development
                </Link>
              </li>
              <li>
                <Link href="/services/lead-generation-and-automation" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Lead Generation & Automation
                </Link>
              </li>
              <li>
                <Link href="/services/meta-partner" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>Meta Business Partner</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Official
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 pt-1">
                  <span>View All Services</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Real Pages */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[12px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Company
            </div>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  About DigiVigee
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Agency Solutions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Marketing Insights & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Contact & Consultation
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-slate-400 dark:text-slate-500 text-[11px]">
                  Admin Portal 🔐
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Growth Insights (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[12px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Agency Newsletter</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Get data-backed performance marketing playbooks, ROAS scaling frameworks, and SEO updates.
            </p>

            {!subSuccess ? (
              <form onSubmit={handleSub} className="space-y-2 pt-1">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={subLoading}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={subLoading}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-slate-900 font-bold text-xs transition-colors shrink-0 cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    {subLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <span>Join</span>
                    )}
                  </button>
                </div>
                {subError && (
                  <div className="flex items-center gap-1.5 text-red-600 text-[11px] pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{subError}</span>
                  </div>
                )}
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{subMessage}</span>
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <span>Need a tailored proposal?</span>
                <span className="font-semibold underline">Book Free Audit →</span>
              </Link>
            </div>
          </div>

        </div>

        {/* ================================================================
            BOTTOM BAR: Verified Compliance & Legal Links
            ================================================================ */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          
          {/* Left: Copyright */}
          <div>
            <span>{copyright}</span>
          </div>

          {/* Center: Live Platform Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems Active • Meta Verified Partner</span>
          </div>

          {/* Right: 100% Real Working Legal Links */}
          <div className="flex items-center gap-4 text-[11.5px]">
            <Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/terms-and-conditions" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Support
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
