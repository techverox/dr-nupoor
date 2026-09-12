"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Phone,
  Mail,
  MapPin,
  Clock,
  Loader2,
  AlertCircle,
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
      setSubError("Please enter a valid email address.");
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

  const phone = settings?.contact?.phone || SITE_CONFIG.contact.phone;
  const email = settings?.contact?.email || SITE_CONFIG.contact.email;
  const address = settings?.contact?.address || SITE_CONFIG.contact.address;
  const businessHours = settings?.contact?.businessHours || SITE_CONFIG.contact.workingHours;

  const copyright =
    settings?.footerContent?.copyrightText ||
    `© ${new Date().getFullYear()} DIGIVIGEE, Inc. All rights reserved.`;

  const socials = {
    linkedin: settings?.socials?.linkedin || SITE_CONFIG.socials.linkedin,
    twitter: settings?.socials?.twitter || SITE_CONFIG.socials.twitter,
    instagram: settings?.socials?.instagram || SITE_CONFIG.socials.instagram,
    facebook: settings?.socials?.facebook || SITE_CONFIG.socials.facebook,
    youtube: settings?.socials?.youtube || SITE_CONFIG.socials.youtube,
  };

  return (
    <footer className="bg-white text-slate-600 text-xs border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 relative z-10">
        
        {/* ================================================================
            OFFICIAL DIGIVIGEE BRAND HEADER BAR (LIGHT-FIRST)
            ================================================================ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 mb-10 border-b border-slate-100">
          <Link href="/" className="inline-flex items-center gap-3.5 group">
            <div className="px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs group-hover:scale-105 transition-all">
              <Image
                src="/images/digivigee_logo.png"
                alt="DigiVigee Logo"
                width={126}
                height={42}
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-mono font-bold text-[#0C1628] tracking-wide uppercase">
                DIGIVIGEE OPERATING SYSTEM
              </div>
              <div className="text-[11px] text-slate-500">
                Enterprise Multi-Tenant Agency Infrastructure
              </div>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008744] animate-pulse" />
              <span>SOC2 TYPE II CERTIFIED</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 font-mono text-[11px] font-bold">
              <span>99.99% ENTERPRISE UPTIME</span>
            </span>
          </div>
        </div>

        {/* ================================================================
            6-COLUMN AGENCY OS FOOTER NAVIGATION
            ================================================================ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-100 text-left">
          
          {/* Col 1: Product */}
          <div className="space-y-2.5">
            <div className="text-[11.5px] font-bold text-[#0C1628] uppercase tracking-wider">
              Product
            </div>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/platform" className="hover:text-[#008744] transition-colors">Product Tour</Link></li>
              <li><Link href="/contact" className="hover:text-[#008744] transition-colors">Consultation Desk</Link></li>
              <li><Link href="#features" className="hover:text-[#008744] transition-colors">Digivigee AI</Link></li>
              <li><Link href="/solutions/scaling-agencies" className="hover:text-[#008744] transition-colors">Retainer Templates</Link></li>
              <li><Link href="#integrations" className="hover:text-[#008744] transition-colors">120+ Integrations</Link></li>
              <li><Link href="/platform#kanban" className="hover:text-[#008744] transition-colors">Gantt & Kanban</Link></li>
              <li><Link href="/contact" className="hover:text-[#008744] transition-colors">Enterprise Security</Link></li>
              <li><Link href="/platform#integrations" className="hover:text-[#008744] transition-colors">Direct API & MCP</Link></li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-2.5">
            <div className="text-[11.5px] font-bold text-[#0C1628] uppercase tracking-wider">
              Solutions
            </div>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/solutions/performance-agencies" className="hover:text-[#008744] transition-colors">Performance Media</Link></li>
              <li><Link href="/solutions/social-media-agencies" className="hover:text-[#008744] transition-colors">Social Media & Content</Link></li>
              <li><Link href="/solutions/local-seo-agencies" className="hover:text-[#008744] transition-colors">Local SEO & GBP</Link></li>
              <li><Link href="/solutions/scaling-agencies" className="hover:text-[#008744] transition-colors">Scaling Agencies</Link></li>
              <li><Link href="/services/seo-and-local-seo" className="hover:text-[#008744] transition-colors">SEO & Content</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#008744] transition-colors">Case Studies</Link></li>
              <li><Link href="/contact" className="hover:text-[#008744] transition-colors">Custom Retainers</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-2.5">
            <div className="text-[11.5px] font-bold text-[#0C1628] uppercase tracking-wider">
              Resources
            </div>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/blog" className="hover:text-[#008744] transition-colors">Growth Playbooks</Link></li>
              <li><Link href="/blog" className="hover:text-[#008744] transition-colors">Marketing Insights</Link></li>
              <li><Link href="#features" className="hover:text-[#008744] transition-colors">Agency Community</Link></li>
              <li><Link href="#integrations" className="hover:text-[#008744] transition-colors">White-Glove Setup</Link></li>
              <li><Link href="/contact" className="hover:text-[#008744] transition-colors">Support Packages</Link></li>
              <li><Link href="/admin" className="hover:text-[#008744] transition-colors">Admin Portal</Link></li>
              <li><Link href="/contact" className="hover:text-[#008744] transition-colors">Agency Partner Program</Link></li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-2.5">
            <div className="text-[11.5px] font-bold text-[#0C1628] uppercase tracking-wider">
              Company
            </div>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/about" className="hover:text-[#008744] transition-colors">About Digivigee</Link></li>
              <li><Link href="/#team" className="hover:text-[#008744] transition-colors">Leadership Team</Link></li>
              <li><Link href="/#portfolio" className="hover:text-[#008744] transition-colors">Our Customers</Link></li>
              <li><Link href="#integrations" className="hover:text-[#008744] transition-colors">AgencyScale 2026</Link></li>
              <li><Link href="/blog" className="hover:text-[#008744] transition-colors">Press & Articles</Link></li>
              <li><Link href="/contact" className="hover:text-[#008744] transition-colors">Contact Sales</Link></li>
            </ul>
          </div>

          {/* Col 5: Agency Guides */}
          <div className="space-y-2.5">
            <div className="text-[11.5px] font-bold text-[#0C1628] uppercase tracking-wider">
              Agency Guides
            </div>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/blog" className="hover:text-[#008744] transition-colors">Growth Playbook Guide</Link></li>
              <li><Link href="/blog" className="hover:text-[#008744] transition-colors">Client Onboarding SOP</Link></li>
              <li><Link href="/blog" className="hover:text-[#008744] transition-colors">Blended ROAS Handbook</Link></li>
              <li><Link href="/blog" className="hover:text-[#008744] transition-colors">Agency Management</Link></li>
              <li><Link href="/blog" className="hover:text-[#008744] transition-colors">White-Label Setup</Link></li>
              <li><Link href="/blog" className="hover:text-[#008744] transition-colors">Stripe Billing Playbook</Link></li>
            </ul>
          </div>

          {/* Col 6: Pre-Configured Delivery Engines */}
          <div className="space-y-2.5">
            <div className="text-[11.5px] font-bold text-[#0C1628] uppercase tracking-wider">
              Delivery Engines
            </div>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/services/performance-marketing" className="hover:text-[#008744] transition-colors">Performance Ad Ops</Link></li>
              <li><Link href="/services/seo-and-local-seo" className="hover:text-[#008744] transition-colors">Technical SEO Engine</Link></li>
              <li><Link href="/services/social-media-marketing" className="hover:text-[#008744] transition-colors">Social Media Workflows</Link></li>
              <li><Link href="/services/website-design-and-development" className="hover:text-[#008744] transition-colors">Conversion Web Engine</Link></li>
              <li><Link href="/services/lead-generation-and-automation" className="hover:text-[#008744] transition-colors">Retainer Billing & SLA</Link></li>
            </ul>
          </div>

        </div>

        {/* ================================================================
            BLOG SNIPPET + NEWSLETTER SUBSCRIBE BAR
            ================================================================ */}
        <div className="py-10 border-b border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Latest in Digivigee Blog */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-[11.5px] font-bold text-[#0C1628] uppercase tracking-wider flex items-center justify-between">
              <span>Latest in Digivigee Agency Blog</span>
              <Link href="/blog" className="text-[#008744] hover:text-[#00A855] transition-colors font-medium">
                View all articles →
              </Link>
            </div>
            <ul className="space-y-2 text-slate-600 text-xs">
              <li>
                <Link href="/blog" className="hover:text-[#008744] transition-colors flex items-center justify-between group py-0.5">
                  <span className="text-slate-600 group-hover:text-[#0C1628] transition-colors">10 Social Media Marketing Tips to Grow Your Business in 2026</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#008744] transition-colors shrink-0 ml-4" />
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#008744] transition-colors flex items-center justify-between group py-0.5">
                  <span className="text-slate-600 group-hover:text-[#0C1628] transition-colors">How Performance Marketing Surpasses Traditional Ads for Client Acquisition</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#008744] transition-colors shrink-0 ml-4" />
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#008744] transition-colors flex items-center justify-between group py-0.5">
                  <span className="text-slate-600 group-hover:text-[#0C1628] transition-colors">Complete SEO Guide for High-Growth Brands & Retainer Agencies</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#008744] transition-colors shrink-0 ml-4" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe to Updates */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-[11.5px] font-bold text-[#0C1628] uppercase tracking-wider">
              Subscribe to Digivigee agency updates
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Get weekly breakdown of agency operating models, scaling playbooks, and feature launches.
            </p>

            {!subSuccess ? (
              <form onSubmit={handleSub} className="space-y-2">
                <div className="flex gap-2 pt-1">
                  <input
                    type="email"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="Enter business email"
                    required
                    disabled={subLoading}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#008744] transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={subLoading}
                    className="px-5 py-2.5 rounded-lg bg-[#0C1628] hover:bg-[#008744] text-white font-bold text-xs transition-colors shrink-0 cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    {subLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{subLoading ? "Joining..." : "Subscribe"}</span>
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
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 shrink-0 text-[#008744]" />
                <span>{subMessage}</span>
              </div>
            )}
          </div>

        </div>

        {/* ================================================================
            CONTACT & SOCIAL BAR
            ================================================================ */}
        <div className="py-6 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          {/* Contact Details */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-[#0C1628] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#008744]" />
                <span>{phone}</span>
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-[#0C1628] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#008744]" />
                <span>{email}</span>
              </a>
            )}

            {address && (
              <div className="hidden lg:flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-xs">{address}</span>
              </div>
            )}

            {businessHours && (
              <div className="hidden xl:flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{businessHours}</span>
              </div>
            )}
          </div>

          {/* Live Social Media Links */}
          <div className="flex items-center gap-2">
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-white text-slate-600 hover:text-[#008744] flex items-center justify-center transition-all shadow-2xs"
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
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-white text-slate-600 hover:text-[#008744] flex items-center justify-center transition-all shadow-2xs"
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
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-white text-slate-600 hover:text-[#008744] flex items-center justify-center transition-all shadow-2xs"
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
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-white text-slate-600 hover:text-[#008744] flex items-center justify-center transition-all shadow-2xs"
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
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-white text-slate-600 hover:text-[#008744] flex items-center justify-center transition-all shadow-2xs"
              >
                <span className="sr-only">YouTube</span>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* ================================================================
            BOTTOM BAR: Badges, Security Pill, Live Copyright
            ================================================================ */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-slate-500">
          

          {/* Center: Security & SLA Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008744] animate-pulse" />
            <span>Enterprise Security • Uptime 99.99%</span>
          </div>

          {/* Right: Live Copyright & Privacy Links */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
            <span>{copyright}</span>
            <Link href="/privacy-policy" className="hover:text-[#0C1628] transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-[#0C1628] transition-colors">Terms of Service</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
