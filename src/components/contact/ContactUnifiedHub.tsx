"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getAttributionContext } from "@/lib/tracking/attribution";
import { trackEvent } from "@/lib/tracking/events";
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
  Zap,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  UtensilsCrossed,
  Smartphone,
  Share2,
  Search,
  Code2,
  Rocket,
  Navigation,
} from "lucide-react";

export interface ContactUnifiedHubProps {
  initialService?: string;
  initialProduct?: string;
  phone?: string;
  email?: string;
  address?: string;
  workingHours?: string;
}

interface ServiceOption {
  id: string;
  name: string;
  shortLabel: string;
  icon: React.ElementType;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: "performance-marketing", name: "Meta Partner & Paid Social", shortLabel: "Meta Partner Ads", icon: Share2 },
  { id: "restromitra-saas", name: "RestroMitra Restaurant SaaS", shortLabel: "RestroMitra SaaS", icon: UtensilsCrossed },
  { id: "maru-gujarat-listing", name: "Maru Gujarat Business Directory", shortLabel: "Maru Gujarat", icon: Smartphone },
  { id: "seo-and-local-seo", name: "Technical SEO & Search", shortLabel: "Technical SEO", icon: Search },
  { id: "website-design-and-development", name: "High-Converting Web & App", shortLabel: "Web & App Dev", icon: Code2 },
  { id: "full-retainer", name: "Full-Service Growth Retainer", shortLabel: "Full Retainer", icon: Rocket },
];

const BUDGET_OPTIONS = [
  "SaaS / Listing Tier",
  "< $5,000 / mo",
  "$5,000 - $15,000 / mo",
  "$15,000 - $50,000 / mo",
  "$50,000+ / mo",
];

export default function ContactUnifiedHub({
  initialService: propService,
  initialProduct: propProduct,
  phone = "+91 90811 45178",
  email = "Contact@digivigee.com",
  address = "Orchid Complex, Office No. B, Door No. D-23, Approach Road / Pirojpura Road, Chhapi, Banaskantha, Gujarat - 385210",
  workingHours = "24/7 Priority Support & Strategy Pods",
}: ContactUnifiedHubProps) {
  const searchParams = useSearchParams();
  const initialProduct = propProduct || searchParams.get("product") || undefined;
  const initialService = propService || searchParams.get("service") || undefined;

  const determineInitialService = () => {
    if (initialProduct === "restromitra") return "restromitra-saas";
    if (initialProduct === "marugujarat") return "maru-gujarat-listing";
    if (initialService === "meta") return "performance-marketing";
    if (initialService) return initialService;
    return "performance-marketing";
  };

  const determineInitialBudget = () => {
    if (initialProduct === "restromitra" || initialProduct === "marugujarat") {
      return "SaaS / Listing Tier";
    }
    return "$5,000 - $15,000 / mo";
  };

  const determineInitialMessage = () => {
    if (initialProduct === "restromitra") {
      return "Hi DigiVigee team, I would like to schedule a live demo of RestroMitra for my restaurant.";
    }
    if (initialProduct === "marugujarat") {
      return "Hi DigiVigee team, I would like to list my business on the Maru Gujarat verified directory.";
    }
    if (initialService === "meta") {
      return "Hi DigiVigee team, I want to audit our Meta ad accounts and explore CAPI integration.";
    }
    return "";
  };

  const [selectedService, setSelectedService] = useState<string>(determineInitialService());
  const [selectedBudget, setSelectedBudget] = useState<string>(determineInitialBudget());
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: determineInitialMessage(),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState<string>("");
  const [error, setError] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2500);
    }
  };

  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const whatsappUrl = `https://wa.me/919081145178?text=${encodeURIComponent(
    "Hi DigiVigee team, I would like to schedule a strategy consultation."
  )}`;
  const mapQuery = encodeURIComponent(
    "Orchid Complex, Approach Road, Chhapi, Banaskantha, Gujarat 385210"
  );
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid business email address.");
      return;
    }

    setLoading(true);
    try {
      const attr = typeof window !== "undefined" ? getAttributionContext() : null;
      const generatedTicket = `DGV-${Math.floor(100000 + Math.random() * 900000)}`;

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || undefined,
          company: formData.company.trim() || undefined,
          service: selectedService,
          source: "contact_form",
          sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
          formType: "consultation",
          message: `[Ticket: ${generatedTicket}] [Budget: ${selectedBudget}] [Company: ${formData.company.trim() || "N/A"}] ${formData.message}`.trim(),
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
        setTicketId(generatedTicket);
        setSuccess(true);
        trackEvent("lead_form_submitted", {
          email: formData.email,
          service: selectedService,
          ticketId: generatedTicket,
        });
      } else {
        setError(data.error || "Submission failed. Please try again or reach out on WhatsApp.");
      }
    } catch {
      setError("Network error. Please check your connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  const successWhatsappUrl = `https://wa.me/919081145178?text=${encodeURIComponent(
    `Hi DigiVigee team, I just submitted an inquiry (Ticket: ${ticketId}). Can we fast-track?`
  )}`;

  return (
    <section className="relative z-10 pt-4 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ================================================================ */}
        {/* LEFT: Direct Contact Channels + Google Map (5 cols)              */}
        {/* ================================================================ */}
        <div className="lg:col-span-5 space-y-4">
          {/* Contact Channels Card */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-xl shadow-slate-900/5 space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#008744]">
                  Direct Strategy Desk • 24/7 Priority Line
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0C1628] tracking-tight">
                Connect Directly
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mt-1 font-normal">
                Direct access to senior strategy directors and product architects. Guaranteed &lt; 4-hour response SLA.
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#008744] hover:bg-[#007038] text-white text-xs font-semibold flex items-center justify-between shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm leading-tight">Chat on WhatsApp</div>
                  <div className="text-[10px] text-emerald-100 font-normal">Instant reply • Average 5 mins</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Phone */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#008744] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Phone</div>
                  <a href={`tel:${cleanPhone}`} className="text-xs sm:text-sm font-semibold text-[#0C1628] hover:text-[#008744] transition-colors">
                    {phone}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(phone, "phone")}
                className="p-1 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Copy Phone"
              >
                {copiedItem === "phone" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* Email */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#008744] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email</div>
                  <a href={`mailto:${email}`} className="text-xs sm:text-sm font-semibold text-[#0C1628] hover:text-[#008744] transition-colors block truncate">
                    {email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(email, "email")}
                className="p-1 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                title="Copy Email"
              >
                {copiedItem === "email" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* Address */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#008744] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">HQ Office</div>
                    <div className="text-xs font-normal text-slate-700 leading-relaxed mt-0.5">{address}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(address, "address")}
                  className="p-1 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                  title="Copy Address"
                >
                  {copiedItem === "address" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-200/60 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-emerald-600" />
                  <span>24/7 Available</span>
                </span>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#008744] hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Directions</span>
                  <Navigation className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-xl overflow-hidden border border-slate-200/90 shadow-xs relative h-[190px]">
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
              <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[10px] font-bold text-slate-700 shadow-xs border border-slate-200 flex items-center gap-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Chhapi Corporate HQ • Gujarat</span>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#0C1628] hover:text-[#008744] border border-slate-200 text-[10px] font-bold shadow-xs flex items-center gap-1 transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* SLA Trust Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] sm:text-[11px] text-slate-500 font-semibold border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>NDA Protected • 100% Confidential</span>
              </span>
              <span className="text-slate-400">256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* RIGHT: Consultation Form (7 cols)                                */}
        {/* ================================================================ */}
        <div className="lg:col-span-7">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {success ? (
                /* ── Success Confirmation ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-[#008744] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-[11px] font-mono font-bold mb-1.5">
                      TICKET #{ticketId}
                    </span>
                    <h3 className="text-xl font-black text-[#0C1628] tracking-tight">
                      Application Received
                    </h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
                      Our directors will respond within 4 hours.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <a
                      href={successWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#008744] hover:bg-[#007038] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Fast-Track on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      New Submission
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── The Form ── */
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Title */}
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#008744] mb-1">
                      <Zap className="w-3 h-3" />
                      <span>Strategy Consultation</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0C1628] tracking-tight">
                      Tell Us About Your Project
                    </h3>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                      Target Solution <span className="text-emerald-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {SERVICE_OPTIONS.map((opt) => {
                        const isSelected = selectedService === opt.id;
                        const Icon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedService(opt.id)}
                            className={`p-2 rounded-lg border text-left transition-all flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? "bg-emerald-500/10 border-[#008744] text-[#0C1628] font-semibold shadow-xs"
                                : "bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-600 font-normal"
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-[#008744]" : "text-slate-400"}`} />
                            <span className="text-[11px] truncate">{opt.shortLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Pills */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                      Estimated Spend
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {BUDGET_OPTIONS.map((tier) => {
                        const isSelected = selectedBudget === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setSelectedBudget(tier)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#0C1628] text-white font-semibold shadow-xs"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Full Name <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Work Email <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="contact-phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 90811 45178"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="contact-company"
                        autoComplete="organization"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your Brand Name"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Growth Goals & Requirements
                    </label>
                    <textarea
                      rows={3}
                      name="message"
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your objectives, CAC targets, or specific questions..."
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all resize-none"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[11px] font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#008744] hover:bg-[#007038] text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-emerald-300" />
                        <span>Submit Consultation Request</span>
                        <ChevronRight className="w-4 h-4 text-emerald-200" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
