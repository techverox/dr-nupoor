"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Heart, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  MapPin, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from "lucide-react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import ClinicLocationCard from "@/components/doctor/ClinicLocationCard";
import { SITE_CONFIG } from "@/config/site";
import { ContactPageContent } from "@/types";
import { DEFAULT_CONTACT_PAGE_CONTENT } from "@/data/pagesContent";

interface AppointmentClientProps {
  initialContent?: ContactPageContent;
}

export default function AppointmentClient({
  initialContent,
}: AppointmentClientProps) {
  const content = initialContent || DEFAULT_CONTACT_PAGE_CONTENT;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "10:00 AM - 01:00 PM (Morning)",
    consultationType: "In-Clinic Consultation",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.phone.trim()) {
      setError("Please provide your name and a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          service: `${formData.consultationType} on ${formData.date || "Preferred Date"} (${formData.time})`,
          message: formData.message.trim() || `Consultation request: ${formData.consultationType}`,
          source: "appointment_page",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to submit appointment request.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("[Appointment Submission Error]:", err);
      setError(
        err.message || "We could not submit your request online right now. Please call us directly or reach us instantly on WhatsApp."
      );
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  const whatsappRaw = (content.whatsapp || SITE_CONFIG.contact.whatsappNumber || "919876543210").replace(/\D/g, "");
  const phoneDisplay = content.phone || SITE_CONFIG.contact.phone;
  const phoneRaw = phoneDisplay.replace(/\s+/g, "");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. TOP HEADER BANNER */}
          <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#FFF0F3] via-[#FDF2F4] to-[#FFF5F7] border border-[#F5D6DE] p-8 sm:p-12 mb-12 overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block">
                  {content.heroBadge || "YOUR HEALTH, OUR PRIORITY"}
                </span>
                <h1 className="font-serif text-[40px] sm:text-[50px] font-bold text-[#1A202C] leading-tight">
                  {content.heroHeadline || "Book an"}{" "}
                  {content.heroHeadlineHighlight && (
                    <span className="italic font-serif text-[#D84C70]">
                      {content.heroHeadlineHighlight}
                    </span>
                  )}
                </h1>
                <p className="text-slate-600 text-[15px] sm:text-[16px] max-w-2xl leading-relaxed">
                  {content.heroSubheadline || "Take the first step towards better breast health. Book your consultation with Dr. Noopur Patel easily and at your convenience."}
                </p>

                {/* 4 Feature Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-[#D84C70]" />
                    <span>Expert Consultation</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700">
                    <Clock className="w-4 h-4 text-[#D84C70]" />
                    <span>Flexible Timings</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-[#D84C70]" />
                    <span>Confidential Care</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700">
                    <Heart className="w-4 h-4 text-[#D84C70]" />
                    <span>Personalised Support</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Doctor Visual */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative w-[240px] h-[200px] rounded-2xl overflow-hidden border border-[#F5D6DE] shadow-sm bg-white">
                  <Image
                    src="/images/doctor/optimized/dr-noopur-patel-portrait-clinical.webp"
                    alt="Dr. Noopur Patel, Breast Cancer Surgeon at Marengo CIMS Hospital"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="240px"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs p-2 rounded-xl text-center border border-white/60">
                    <p className="font-serif italic text-[11px] text-[#9B2846] font-semibold leading-tight">
                      &ldquo;Early Detection Saves Lives&rdquo;
                    </p>
                    <p className="text-[9.5px] text-slate-500 font-medium">
                      — Dr. Noopur Patel
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 2. TWO-COLUMN LAYOUT (FORM & OTHER WAYS TO BOOK) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Interactive Appointment Form (col-span-7) */}
            <div className="lg:col-span-7 bg-[#FFF8F9]/40 border border-[#F5D6DE] rounded-3xl p-6 sm:p-9 shadow-xs">
              <div className="mb-8">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#D84C70] block mb-1">
                  APPOINTMENT FORM
                </span>
                <h2 className="font-serif text-[28px] sm:text-[32px] font-bold text-[#1A202C] leading-snug">
                  {content.formTitle || "Book Your Consultation"}
                </h2>
                <p className="text-[14px] text-slate-500">
                  {content.formSubtitle || "Fill in your details and our team will confirm your appointment."}
                </p>
              </div>

              {submitted ? (
                <div className="bg-white border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-fade-in shadow-xs">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-[24px] font-bold text-slate-900">
                    Appointment Request Received
                  </h3>
                  <p className="text-[14px] text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-800">{formData.name}</strong>. Our clinical coordinator at Marengo CIMS Hospital will call you shortly at <strong className="text-slate-800">{formData.phone}</strong> to confirm your consultation slot.
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          date: "",
                          time: "10:00 AM - 01:00 PM (Morning)",
                          consultationType: "In-Clinic Consultation",
                          message: "",
                        });
                      }}
                      className="text-[13px] font-semibold text-[#D84C70] hover:underline cursor-pointer"
                    >
                      Book Another Consultation &rarr;
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700 flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Consultation Type Selector */}
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                      Consultation Type <span className="text-[#D84C70]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "In-Clinic Consultation",
                        "Second Opinion for Breast Cancer",
                        "Benign Lump Evaluation",
                        "Mammography Review",
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, consultationType: type })}
                          className={`p-3 rounded-xl border text-[13px] font-medium text-left transition-all cursor-pointer ${
                            formData.consultationType === type
                              ? "bg-white border-[#D84C70] text-[#D84C70] shadow-xs ring-1 ring-[#D84C70]"
                              : "bg-white/60 border-[#F5D6DE] text-slate-600 hover:bg-white"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="apt-name" className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Full Name <span className="text-[#D84C70]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          id="apt-name"
                          type="text"
                          required
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Priyaben Shah"
                          className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-[#F5D6DE] text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/30 focus:border-[#D84C70] transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="apt-phone" className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Phone Number <span className="text-[#D84C70]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          id="apt-phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-[#F5D6DE] text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/30 focus:border-[#D84C70] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email Address */}
                    <div>
                      <label htmlFor="apt-email" className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Email Address <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          id="apt-email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-[#F5D6DE] text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/30 focus:border-[#D84C70] transition-all"
                        />
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="apt-date" className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Preferred Date <span className="text-[#D84C70]">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          id="apt-date"
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-[#F5D6DE] text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/30 focus:border-[#D84C70] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                      Preferred Time Slot <span className="text-[#D84C70]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "10:00 AM - 01:00 PM (Morning)",
                        "02:00 PM - 06:00 PM (Evening)",
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, time: slot })}
                          className={`p-3 rounded-xl border text-[13px] font-medium text-left transition-all cursor-pointer ${
                            formData.time === slot
                              ? "bg-white border-[#D84C70] text-[#D84C70] shadow-xs ring-1 ring-[#D84C70]"
                              : "bg-white/60 border-[#F5D6DE] text-slate-600 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{slot}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="apt-message" className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                      Your Message <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="apt-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your concern, diagnosis or reason for consultation..."
                      className="w-full bg-white p-3.5 rounded-xl border border-[#F5D6DE] text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D84C70]/30 focus:border-[#D84C70] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-[#D84C70] hover:bg-[#BE3A5C] text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(216,76,112,0.25)] hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{loading ? "Submitting Request..." : "Book Appointment"}</span>
                  </button>

                  <p className="text-[12.5px] text-slate-500 text-center pt-1">
                    Our team will get back to you shortly to confirm your appointment.
                  </p>
                </form>
              )}
            </div>

            {/* Right Column: Other Ways to Book & Clinic Details (col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Other Ways to Book Card */}
              <div className="bg-white border border-[#F5D6DE] rounded-3xl p-6 sm:p-7 shadow-xs">
                <h3 className="font-serif text-[20px] font-bold text-[#1A202C] mb-4">
                  {content.infoTitle || "Other Ways to Book"}
                </h3>
                
                <div className="space-y-3">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFF8F9] hover:bg-[#FDF2F4] border border-[#F5D6DE] transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <MessageCircle className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <span className="text-[14px] font-bold text-slate-800 block">
                          Book on WhatsApp
                        </span>
                        <span className="text-[12px] text-slate-500">
                          Quick &amp; Easy
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D84C70] group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Call Direct */}
                  <a
                    href={`tel:${phoneRaw}`}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFF8F9] hover:bg-[#FDF2F4] border border-[#F5D6DE] transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D84C70] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[14px] font-bold text-slate-800 block">
                          Call Us Directly
                        </span>
                        <span className="text-[12px] text-slate-500">
                          {phoneDisplay}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D84C70] group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Visit Clinic */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFF8F9] border border-[#F5D6DE]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#9B2846] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[14px] font-bold text-slate-800 block">
                          Visit the Clinic
                        </span>
                        <span className="text-[12px] text-slate-500">
                          {content.address || "Marengo CIMS Hospital, Sola"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Interactive Clinic Location & Direction System */}
              <ClinicLocationCard />

              {/* Consultation Timings Card */}
              <div className="bg-[#FFF8F9] border border-[#F5D6DE] rounded-3xl p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#D84C70]">
                  <Clock className="w-5 h-5" />
                  <h3 className="font-serif text-[18px] font-bold text-[#1A202C]">
                    Consultation Timings
                  </h3>
                </div>

                <div className="text-[13.5px] text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">{content.workingHours || "Monday - Saturday: 10:00 AM - 6:00 PM"}</p>
                </div>

                <div className="pt-2 border-t border-[#F5D6DE]/60 text-[12.5px] text-slate-600">
                  <span className="font-semibold text-slate-800 block mb-0.5">Urgent Medical Notice:</span>
                  <p>For acute or urgent medical concerns, please contact the nearest emergency medical service or Marengo CIMS Hospital casualty department directly.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <DoctorFooter />
    </div>
  );
}
