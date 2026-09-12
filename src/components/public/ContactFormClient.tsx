"use client";

import React, { useState } from "react";
import { getAttributionContext } from "@/lib/tracking/attribution";
import { trackEvent } from "@/lib/tracking/events";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";

export interface ContactFormClientProps {
  initialService?: string;
  initialProduct?: string;
  initialMessage?: string;
}

export default function ContactFormClient({
  initialService,
  initialProduct,
  initialMessage,
}: ContactFormClientProps = {}) {
  const defaultService =
    initialProduct === "restromitra"
      ? "restromitra-saas"
      : initialProduct === "marugujarat"
      ? "maru-gujarat-listing"
      : initialService === "meta"
      ? "performance-marketing"
      : initialService || "performance-marketing";

  const defaultBudget =
    initialProduct === "restromitra" || initialProduct === "marugujarat"
      ? "SaaS / Listing Tier"
      : "$5,000 - $15,000 / month";

  const defaultMsg =
    initialMessage ||
    (initialProduct === "restromitra"
      ? "Hi DigiVigee team, I would like to schedule a live demo of RestroMitra for my restaurant."
      : initialProduct === "marugujarat"
      ? "Hi DigiVigee team, I would like to list my business on the Maru Gujarat directory."
      : initialService === "meta"
      ? "Hi DigiVigee team, I want to audit our Meta ad accounts and explore CAPI integration."
      : "");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceRequested: defaultService,
    budget: defaultBudget,
    message: defaultMsg,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid business email.");
      return;
    }

    setLoading(true);

    try {
      const attr = typeof window !== "undefined" ? getAttributionContext() : null;

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || undefined,
          company: formData.company.trim() || undefined,
          serviceRequested: formData.serviceRequested,
          source: "contact_page",
          message: `[Budget: ${formData.budget}] ${formData.message}`.trim(),
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
        setSuccess(true);
        trackEvent("lead_form_submitted", { email: formData.email });
      } else {
        setError(data.error || "Submission failed. Please try again or reach out directly.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-slate-900 text-center space-y-4 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-[#00E05C] text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900">
          Audit Request Received
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you! Our growth directors have received your application. We will review your current ad accounts and organic footprint and respond within 4 business hours.
        </p>
        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Priority Inbound Queue Active</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {initialProduct === "restromitra" && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Priority Queue: RestroMitra Restaurant SaaS Live Demo &amp; Sandbox Setup</span>
        </div>
      )}
      {initialProduct === "marugujarat" && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Priority Queue: Maru Gujarat Verified Directory Listing Inquiry</span>
        </div>
      )}
      {initialService === "meta" && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Official Meta Business Partner Ad Strategy &amp; CAPI Telemetry Audit</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-emerald-600">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Alex Morgan"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#008744] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Work Email <span className="text-emerald-600">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="alex@company.com"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#008744] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 99999 99999"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#008744] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Company / Brand
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Company Name"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#008744] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Target Service / Solution
          </label>
          <select
            value={formData.serviceRequested}
            onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#008744] transition-colors cursor-pointer"
          >
            <option value="restromitra-saas">RestroMitra Restaurant SaaS Demo</option>
            <option value="maru-gujarat-listing">Maru Gujarat Business Directory Listing</option>
            <option value="performance-marketing">Performance Marketing &amp; Paid Ads (Meta Partner)</option>
            <option value="seo-and-local-seo">Technical SEO &amp; Local Search</option>
            <option value="social-media-marketing">Social Media Sprints &amp; Creative</option>
            <option value="website-design-and-development">High-Converting Web Design</option>
            <option value="lead-generation-and-automation">Lead Gen &amp; CRM Automation</option>
            <option value="full-retainer">Full-Service Growth Retainer</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Estimated Spend / Tier
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#008744] transition-colors cursor-pointer"
          >
            <option value="SaaS / Listing Tier">SaaS / Directory Pricing Plan</option>
            <option value="< $5,000 / month">&lt; $5,000 / month</option>
            <option value="$5,000 - $15,000 / month">$5,000 - $15,000 / month</option>
            <option value="$15,000 - $50,000 / month">$15,000 - $50,000 / month</option>
            <option value="$50,000+ / month">$50,000+ / month</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Tell Us About Your Growth Objectives
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Share your current CAC, ROAS targets, or primary bottlenecks..."
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#008744] transition-colors resize-none"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-[#008744] hover:bg-[#009E52] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Diagnostic Application...</span>
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 text-emerald-300" />
            <span>Submit Strategy Diagnostic Application</span>
          </>
        )}
      </button>

      <div className="pt-2 text-center text-[11px] text-slate-400">
        🔒 Non-Disclosure Agreement (NDA) Protected • Response within 4 business hours.
      </div>
    </form>
  );
}
