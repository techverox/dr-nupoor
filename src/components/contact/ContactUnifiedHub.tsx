"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getAttributionContext } from "@/lib/tracking/attribution";
import { trackEvent } from "@/lib/tracking/events";
import { SITE_CONFIG } from "@/config/site";
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
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Activity,
  HeartPulse,
  Stethoscope,
  FileCheck2,
  CalendarCheck2,
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

const CLINICAL_SERVICES: ServiceOption[] = [
  { id: "oncoplastic-surgery", name: "Oncoplastic Breast Surgery", shortLabel: "Oncoplastic Surgery", icon: HeartPulse },
  { id: "breast-conservation", name: "Breast Conservation Surgery", shortLabel: "Conservation Surgery", icon: Activity },
  { id: "sentinel-node", name: "Sentinel Lymph Node Biopsy", shortLabel: "Sentinel Node", icon: Stethoscope },
  { id: "benign-breast", name: "Benign Breast Disease Care", shortLabel: "Benign Conditions", icon: FileCheck2 },
  { id: "screening-genetics", name: "High-Risk Screening & Genetics", shortLabel: "Risk Screening", icon: CalendarCheck2 },
  { id: "second-opinion", name: "Second Opinion & Board Review", shortLabel: "Second Opinion", icon: ShieldCheck },
];

const CONSULTATION_TYPES = [
  "In-Person Clinic Visit (Marengo CIMS Hospital)",
  "Urgent Symptom Evaluation (Lump / Pain)",
  "Comprehensive Second Surgical Opinion",
  "Post-Operative Follow-Up",
  "Tele-Consultation / Reports Review",
];

export default function ContactUnifiedHub({
  initialService: propService,
  phone = SITE_CONFIG.contact.phoneFormatted,
  email = SITE_CONFIG.contact.email,
  address = SITE_CONFIG.contact.address,
  workingHours = SITE_CONFIG.contact.workingHours,
}: ContactUnifiedHubProps) {
  const searchParams = useSearchParams();
  const initialService = propService || searchParams.get("service") || undefined;

  const determineInitialService = () => {
    if (initialService) return initialService;
    return "oncoplastic-surgery";
  };

  const [selectedService, setSelectedService] = useState<string>(determineInitialService());
  const [selectedConsultType, setSelectedConsultType] = useState<string>(CONSULTATION_TYPES[0]);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Ahmedabad",
    message: "",
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
  const whatsappNumber = SITE_CONFIG.contact.whatsappNumber || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Noopur Patel's clinic desk, I would like to schedule a breast consultation at Marengo CIMS Hospital."
  )}`;
  const mapQuery = encodeURIComponent(
    "Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad, Gujarat 380060"
  );
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter the patient's full name.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter a valid mobile number for consultation coordination.");
      return;
    }

    setLoading(true);
    try {
      const attr = typeof window !== "undefined" ? getAttributionContext() : null;
      const generatedTicket = `DRN-${Math.floor(100000 + Math.random() * 900000)}`;

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase() || "patient@care.drnoopurpatel.com",
          phone: formData.phone.trim(),
          company: formData.city.trim() || "Ahmedabad",
          service: selectedService,
          source: "consultation_hub",
          sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
          formType: "appointment",
          message: `[Token: ${generatedTicket}] [Type: ${selectedConsultType}] [Location: ${formData.city.trim()}] ${formData.message}`.trim(),
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
          service: selectedService,
          ticketId: generatedTicket,
        });
      } else {
        setError(data.error || "Submission encountered an issue. Please call or message on WhatsApp directly.");
      }
    } catch {
      setError("Network connection issue. Please contact the clinic desk directly via phone or WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const successWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Dr. Noopur Patel's clinic desk, I have requested a consultation (Request Ref: ${ticketId}). Please confirm my appointment slot.`
  )}`;

  return (
    <section className="relative z-10 pt-4 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ================================================================ */}
        {/* LEFT: Direct Contact Channels + Hospital Location (5 cols)       */}
        {/* ================================================================ */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-xl shadow-slate-900/5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0B4F6C]">
                  Consultation Coordination Desk
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0C1628] tracking-tight">
                Get in Touch
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mt-1 font-normal">
                Direct access to Dr. Noopur Patel&apos;s surgical oncology appointment coordinators at Marengo CIMS Hospital.
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
                  <div className="font-semibold text-sm leading-tight">WhatsApp Consultation Desk</div>
                  <div className="text-[10px] text-emerald-100 font-normal">Direct scheduling & reports review</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Phone */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#0B4F6C] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Hospital Desk Phone</div>
                  <a href={`tel:${cleanPhone}`} className="text-xs sm:text-sm font-semibold text-[#0C1628] hover:text-[#0B4F6C] transition-colors">
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
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#0B4F6C] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Clinical Enquiries</div>
                  <a href={`mailto:${email}`} className="text-xs sm:text-sm font-semibold text-[#0C1628] hover:text-[#0B4F6C] transition-colors block truncate">
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
                  <MapPin className="w-3.5 h-3.5 text-[#0B4F6C] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Hospital Location</div>
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
                  <Clock className="w-2.5 h-2.5 text-[#0B4F6C]" />
                  <span>{workingHours}</span>
                </span>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0B4F6C] hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Get Directions</span>
                  <Navigation className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-xl overflow-hidden border border-slate-200/90 shadow-xs relative h-[190px]">
              <iframe
                title="Marengo CIMS Hospital Location — Dr. Noopur Patel"
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
                <span>Marengo CIMS Hospital • Ahmedabad</span>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#0C1628] hover:text-[#0B4F6C] border border-slate-200 text-[10px] font-bold shadow-xs flex items-center gap-1 transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Trust Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] sm:text-[11px] text-slate-500 font-semibold border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Confidential Medical Records</span>
              </span>
              <span className="text-slate-400">NABH Accredited Hospital Facility</span>
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
                /* Success Confirmation */
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
                      REQUEST #{ticketId}
                    </span>
                    <h3 className="text-xl font-black text-[#0C1628] tracking-tight">
                      Consultation Request Received
                    </h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
                      Our clinical team will contact you to coordinate an appointment slot.
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
                      <span>Confirm via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* The Form */
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#0B4F6C] mb-1">
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>Clinical Consultation Request</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0C1628] tracking-tight">
                      Schedule a Visit with Dr. Noopur Patel
                    </h3>
                  </div>

                  {/* Clinical Specialty Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                      Consultation Area <span className="text-[#0B4F6C]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {CLINICAL_SERVICES.map((opt) => {
                        const isSelected = selectedService === opt.id;
                        const Icon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedService(opt.id)}
                            className={`p-2 rounded-lg border text-left transition-all flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? "bg-[#0B4F6C]/10 border-[#0B4F6C] text-[#0C1628] font-semibold shadow-xs"
                                : "bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-600 font-normal"
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-[#0B4F6C]" : "text-slate-400"}`} />
                            <span className="text-[11px] leading-tight truncate">{opt.shortLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Consultation Type */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                      Appointment Mode
                    </label>
                    <select
                      value={selectedConsultType}
                      onChange={(e) => setSelectedConsultType(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#0B4F6C] focus:ring-2 focus:ring-[#0B4F6C]/15 transition-all"
                    >
                      {CONSULTATION_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Patient Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Patient / Relative Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#0B4F6C] focus:ring-2 focus:ring-[#0B4F6C]/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="patient@example.com"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#0B4F6C] focus:ring-2 focus:ring-[#0B4F6C]/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="contact-phone"
                        autoComplete="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#0B4F6C] focus:ring-2 focus:ring-[#0B4F6C]/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Patient City / State
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="contact-city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Ahmedabad, Surat, Rajkot"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#0B4F6C] focus:ring-2 focus:ring-[#0B4F6C]/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message / Symptoms */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Brief Symptoms or Relevant Medical History
                    </label>
                    <textarea
                      rows={3}
                      name="message"
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding symptoms, recent mammogram / ultrasound reports, or specific concerns..."
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#0B4F6C] focus:ring-2 focus:ring-[#0B4F6C]/15 transition-all resize-none"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[11px] font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#0B4F6C] hover:bg-[#083a50] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#0B4F6C]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <CalendarCheck2 className="w-4 h-4 text-emerald-300" />
                        <span>Request Consultation Appointment</span>
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
