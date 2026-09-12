"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAttributionContext } from "@/lib/tracking/attribution";
import { trackEvent } from "@/lib/tracking/events";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  UtensilsCrossed,
  Smartphone,
  Share2,
  Search,
  Code2,
  Rocket,
} from "lucide-react";
import { ShimmerButton } from "@/components/motion";

export interface ContactInteractiveTerminalProps {
  initialService?: string;
  initialProduct?: string;
  initialMessage?: string;
}

interface ServiceOption {
  id: string;
  name: string;
  shortLabel: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "restromitra-saas",
    name: "RestroMitra Restaurant SaaS Demo",
    shortLabel: "RestroMitra SaaS",
    icon: UtensilsCrossed,
    color: "emerald",
    description: "Cloud billing, WhatsApp receipts, KDS, & multi-branch",
  },
  {
    id: "maru-gujarat-listing",
    name: "Maru Gujarat Business Directory",
    shortLabel: "Maru Gujarat",
    icon: Smartphone,
    color: "blue",
    description: "Hyperlocal verified listing & merchant network",
  },
  {
    id: "performance-marketing",
    name: "Meta Partner & Paid Social (CAPI)",
    shortLabel: "Meta Partner Ads",
    icon: Share2,
    color: "blue",
    description: "Certified ad account audit, creative sprints & CAPI",
  },
  {
    id: "seo-and-local-seo",
    name: "Technical SEO & Local Search",
    shortLabel: "Technical SEO",
    icon: Search,
    color: "emerald",
    description: "Organic rankings, Google Maps & local citations",
  },
  {
    id: "website-design-and-development",
    name: "High-Converting Web & App Dev",
    shortLabel: "Web & App Dev",
    icon: Code2,
    color: "purple",
    description: "Next.js, Flutter, and high-converting architectures",
  },
  {
    id: "full-retainer",
    name: "Full-Service Growth Retainer",
    shortLabel: "Full Retainer",
    icon: Rocket,
    color: "amber",
    description: "Dedicated cross-channel strategy & performance pod",
  },
];

const BUDGET_OPTIONS = [
  { id: "SaaS / Listing Tier", label: "SaaS / Listing Tier" },
  { id: "< $5,000 / month", label: "< $5k / mo" },
  { id: "$5,000 - $15,000 / month", label: "$5k - $15k / mo" },
  { id: "$15,000 - $50,000 / month", label: "$15k - $50k / mo" },
  { id: "$50,000+ / month", label: "$50k+ / mo (Enterprise)" },
];

const QUICK_TAGS = [
  "Book 30-min Video Demo",
  "Audit Meta Ad Account",
  "WhatsApp POS Setup",
  "Gujarat Merchant Verification",
  "Server-Side CAPI Setup",
  "Reduce Inbound CAC",
];

export default function ContactInteractiveTerminal({
  initialService,
  initialProduct,
  initialMessage,
}: ContactInteractiveTerminalProps = {}) {
  // Determine default selected service
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
    return "$5,000 - $15,000 / month";
  };

  const determineInitialMessage = () => {
    if (initialMessage) return initialMessage;
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

  const handleQuickTagClick = (tag: string) => {
    setFormData((prev) => {
      const current = prev.message.trim();
      const updated = current ? `${current}\n• Objective: ${tag}` : `• Objective: ${tag}`;
      return { ...prev, message: updated };
    });
  };

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
          serviceRequested: selectedService,
          source: "contact_interactive_terminal",
          message: `[Ticket: ${generatedTicket}] [Budget: ${selectedBudget}] ${formData.message}`.trim(),
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
      setError("Network connection issue. Please retry or click our direct WhatsApp line.");
    } finally {
      setLoading(false);
    }
  };

  const currentServiceObj =
    SERVICE_OPTIONS.find((s) => s.id === selectedService) || SERVICE_OPTIONS[0];

  const resetForm = () => {
    setSuccess(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  // WhatsApp Escalation Link for Success State
  const successWhatsappUrl = `https://wa.me/919081145178?text=${encodeURIComponent(
    `Hi DigiVigee team, I just submitted an inquiry (Ticket ID: ${ticketId}) for ${currentServiceObj.name}. Can we fast-track our consultation?`
  )}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xl shadow-slate-900/5 relative overflow-hidden">
      {/* Decorative subtle top glow line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500" />

      <AnimatePresence mode="wait">
        {success ? (
          /* ========================================================================= */
          /* $10B CELEBRATORY SUCCESS STATE WITH TICKET REF & WHATSAPP PRIORITY QUEUE   */
          /* ========================================================================= */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-center py-6 sm:py-8 space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#008744] flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008744] text-xs font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PRIORITY QUEUE ACTIVE • TICKET #{ticketId}</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0C1628] tracking-tight">
                Strategy Diagnostic Ingested
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name || "there"}</strong>! Our senior strategy directors have received your application for <strong className="text-emerald-700">{currentServiceObj.name}</strong>.
              </p>
            </div>

            {/* SLA Status Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-md mx-auto text-left space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Next Milestone:</span>
                <span className="text-emerald-700">Audit Delivery &lt; 4 Hours</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                We will conduct an initial footprint and competitive benchmark before our dedicated video consultation call.
              </p>
            </div>

            {/* Actions: Direct WhatsApp Fast-Track or New Submission */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a
                href={successWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#008744] hover:bg-[#007038] text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Fast-Track on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* THE INTERACTIVE CONSULTATION TERMINAL FORM                                */
          /* ========================================================================= */
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6 text-left"
          >
            {/* Terminal Header */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-[#008744] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#008744]" />
                  <span>Interactive Consultation Terminal</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Step 1 of 2
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0C1628] tracking-tight">
                Select Your Objective &amp; Diagnostic Scope
              </h3>
            </div>

            {/* 1. Interactive Service Pills with Spring Active Indicator */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. Target Solution / Digital Ecosystem <span className="text-emerald-600">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICE_OPTIONS.map((opt) => {
                  const isSelected = selectedService === opt.id;
                  const Icon = opt.icon;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedService(opt.id)}
                      className={`relative p-3 sm:p-3.5 rounded-xl border text-left transition-all duration-200 flex items-start gap-2.5 cursor-pointer ${
                        isSelected
                          ? "bg-emerald-500/10 border-emerald-500/60 shadow-xs text-slate-950"
                          : "bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/80 text-slate-700"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-[#008744] text-white"
                            : "bg-white border border-slate-200 text-slate-500"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold truncate">
                          {opt.shortLabel}
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">
                          {opt.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Interactive Budget Segmented Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Estimated Investment / Scaling Tier
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {BUDGET_OPTIONS.map((budget) => {
                  const isSelected = selectedBudget === budget.id;
                  return (
                    <button
                      key={budget.id}
                      type="button"
                      onClick={() => setSelectedBudget(budget.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#0C1628] text-white shadow-2xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {budget.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Contact Credentials Inputs */}
            <div className="space-y-3.5 pt-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. Your Coordinates <span className="text-emerald-600">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Work Email *"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone / WhatsApp (+91 90811 45178)"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company / Restaurant / Brand Name"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 4. Quick Objective Starter Prompts & Message Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  4. Growth Goals &amp; Specific Challenges
                </label>
                <span className="text-[11px] text-slate-400">Click to append</span>
              </div>

              {/* Quick Suggestion Chips */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {QUICK_TAGS.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickTagClick(tag)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-[#008744] text-slate-600 text-[11px] font-semibold transition-colors cursor-pointer border border-transparent hover:border-emerald-200"
                  >
                    + {tag}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your current bottlenecks, target timeline, or specific questions..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#008744] focus:ring-2 focus:ring-emerald-500/15 transition-all resize-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* High-Converting Magnetic Shimmer CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#008744] hover:bg-[#007038] text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Ingesting Diagnostic Request...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-emerald-300" />
                  <span>Submit Strategy Diagnostic Application</span>
                  <ChevronRight className="w-4 h-4 text-emerald-200" />
                </>
              )}
            </button>

            {/* Security Guarantee Footer */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Mutual NDA</span>
              </span>
              <span>•</span>
              <span>Response &lt; 4 Hours</span>
              <span>•</span>
              <span>Direct Founder Review</span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
