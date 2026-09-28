"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import {
  QrCode,
  Star,
  Heart,
  Sparkles,
  Camera,
  Copy,
  Check,
  Download,
  Printer,
  ExternalLink,
  ShieldCheck,
  MessageSquarePlus,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Users,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

const CARE_CATEGORIES = [
  "Breast Cancer Surgery",
  "Early Detection / Screening",
  "Benign Lump Removal",
  "Oncoplastic Reconstruction",
  "General Consultation",
];

const RATING_DESCRIPTIONS: Record<number, string> = {
  5: "Exceptional care, gentle guidance & full reassurance",
  4: "Very good experience & clear communication",
  3: "Good clinical consultation",
  2: "Average experience",
  1: "Needs improvement",
};

export default function PatientReviewQrSection() {
  // QR Code states
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  // Quick Review Form states
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("Ahmedabad");
  const [category, setCategory] = useState<string>("Breast Cancer Surgery");
  const [story, setStory] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [verifiedConsent, setVerifiedConsent] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "https://drnoopurpatel.com";
    const fullUrl = `${origin}/share-story`;
    setShareUrl(fullUrl);

    // Generate crisp 2x retina QR code
    QRCode.toDataURL(fullUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: "#1A202C",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    })
      .then((url) => {
        setQrDataUrl(url);
        setIsGenerating(false);
      })
      .catch((err) => {
        console.error("[PatientReviewQrSection] QR generation error:", err);
        setIsGenerating(false);
      });
  }, []);

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "Dr-Noopur-Patel-Patient-Review-QRCode.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintStandee = () => {
    window.print();
  };

  const handleSubmitQuickReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name (you can check 'Post Anonymously' if preferred).");
      return;
    }
    if (!city.trim()) {
      setErrorMessage("Please enter your city.");
      return;
    }
    if (!story.trim() || story.trim().length < 10) {
      setErrorMessage("Please write a few words (at least 10 characters) about your experience.");
      return;
    }
    if (!verifiedConsent) {
      setErrorMessage("Please check the patient consent box to proceed.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/stories/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          city: city.trim(),
          category,
          rating,
          story: story.trim(),
          isAnonymous,
          verifiedConsent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to submit your review at this time.");
      }

      setSubmittedSuccess(true);
      setStory("");
    } catch (err: any) {
      console.error("[QuickReview] Submit error:", err);
      setErrorMessage(
        err.message || "Failed to submit review. Please try again or scan the QR code on your mobile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="feedback"
      className="w-full py-16 lg:py-24 bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FA] to-white border-b border-[#F5D6DE] relative overflow-hidden"
    >
      {/* Decorative Brand Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F3] border border-[#F5D6DE] text-[11px] sm:text-xs font-bold text-[#88213B] uppercase tracking-wider mb-3 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-[#D84C70] fill-[#D84C70]" />
            <span>PATIENT VOICES &amp; CLINICAL FEEDBACK</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
            Share Your Feedback &amp; Review
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Have you consulted or been treated by Dr. Noopur Patel? Scan our official QR code with your mobile camera or submit your feedback below. Your reflection gives courage and guidance to women across Gujarat facing breast health decisions.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 pt-6 border-t border-[#F5CAD5]/60 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900">5.0 / 5.0 Rating</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Confidential &amp; Verified</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Users className="w-4 h-4 text-[#D84C70]" />
              <span>500+ Patients Comforted</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Standee on Left, Quick Review on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Official Clinic QR Standee (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div
              id="clinic-standee-printable"
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#F5D6DE] shadow-xl relative overflow-hidden flex flex-col items-center text-center group hover:border-[#D84C70] transition-all duration-300"
            >
              {/* Standee Header */}
              <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-[#F5D6DE]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#88213B] to-[#D84C70] flex items-center justify-center text-white font-serif font-bold text-xs shadow-xs">
                    NP
                  </div>
                  <div className="text-left">
                    <span className="text-[12px] font-bold text-slate-900 block leading-tight">
                      Dr. Noopur Patel
                    </span>
                    <span className="text-[10px] text-[#88213B] font-medium block">
                      Marengo CIMS Hospital, Ahmedabad
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#88213B] bg-[#FFF0F3] px-2.5 py-1 rounded-full border border-[#F5CAD5]">
                  Official QR
                </span>
              </div>

              {/* Title on Standee */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-1 leading-snug">
                Scan with Phone Camera
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mb-5">
                Point your phone camera at the QR code to open the review portal instantly.
              </p>

              {/* QR Code Container with Center Heart */}
              <div className="relative p-4 bg-white rounded-2xl border-2 border-[#F5D6DE] shadow-inner mb-4">
                {isGenerating ? (
                  <div className="w-56 h-56 flex flex-col items-center justify-center bg-rose-50/50 rounded-xl text-slate-400 text-xs gap-2">
                    <QrCode className="w-8 h-8 text-[#D84C70] animate-bounce" />
                    <span>Generating High-Res QR...</span>
                  </div>
                ) : (
                  <div className="relative w-52 h-52 sm:w-56 sm:h-56">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrDataUrl}
                      alt="Dr. Noopur Patel Review QR Code"
                      className="w-full h-full object-contain rounded-lg"
                    />
                    {/* Center Brand Ribbon Badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-[#D84C70] shadow-md flex items-center justify-center">
                        <Heart className="w-5 h-5 text-[#D84C70] fill-[#D84C70]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pulsing Camera Radar Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F3] border border-[#F5CAD5] text-xs font-bold text-[#88213B] mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D84C70] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#88213B]" />
                </span>
                <Camera className="w-3.5 h-3.5 text-[#D84C70]" />
                <span>Instant Mobile Camera Scan</span>
              </div>

              {/* Action Buttons: Copy, Download, Print */}
              <div className="grid grid-cols-2 gap-2.5 w-full">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                  title="Download High-Res QR for Printing"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Save QR (PNG)</span>
                </button>
              </div>

              {/* Reception Standee Note */}
              <div className="w-full mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Reception &amp; OPD Standee
                </span>
                <Link
                  href="/share-story"
                  className="text-[#88213B] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Open Full Form</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Quick Review Form & Guidance (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#F5D6DE] shadow-xl flex-1 flex flex-col justify-between">
              <div>
                
                {/* Form Heading & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#88213B] bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#F5CAD5]">
                    Fast Feedback • 60 Seconds
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Doctor Reads Every Reflection
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[28px] font-bold text-slate-900 leading-tight mb-2">
                  Write Your Review or Experience
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  Your feedback helps maintain clinical excellence and reassures newly diagnosed patients that they are in safe, expert hands.
                </p>

                {submittedSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-emerald-900 mb-1">
                      Thank You for Your Valuable Feedback!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto mb-4 leading-relaxed">
                      Your reflection has been submitted directly to Dr. Noopur Patel&apos;s team. Once reviewed, it will be published to inspire and comfort other patients.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSubmittedSuccess(false)}
                        className="px-4 py-2 rounded-full text-xs font-bold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        Submit Another Reflection
                      </button>
                      <Link
                        href="/patient-stories"
                        className="px-4 py-2 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs"
                      >
                        View Published Stories
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitQuickReview} className="space-y-5">
                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* 1. Star Rating Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Your Overall Experience &amp; Rating *
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 transition-colors focus:outline-hidden cursor-pointer"
                            aria-label={`Rate ${star} Stars`}
                          >
                            <Star
                              className={`w-7 h-7 sm:w-8 sm:h-8 transition-all ${
                                star <= (hoverRating || rating)
                                  ? "fill-amber-400 text-amber-400 scale-110"
                                  : "text-slate-300 hover:text-amber-200"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-[#88213B] ml-2">
                          {hoverRating || rating} / 5
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 italic">
                        {RATING_DESCRIPTIONS[hoverRating || rating]}
                      </p>
                    </div>

                    {/* 2. Care Category Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Consultation or Treatment Type *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {CARE_CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                              category === cat
                                ? "bg-[#88213B] text-white shadow-xs"
                                : "bg-slate-100 text-slate-700 hover:bg-[#FFF0F3] hover:text-[#88213B]"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Review / Feedback Story */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Your Thoughts, Guidance or Words for Dr. Patel *
                      </label>
                      <textarea
                        rows={3}
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        placeholder="Dr. Noopur Patel explained everything with utmost clarity and kindness. The surgical outcome was wonderful and my recovery was smooth..."
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#D84C70] focus:ring-2 focus:ring-[#D84C70]/20 text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all outline-hidden resize-none"
                      />
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Minimum 10 characters. Genuine reflections are published after moderation.
                      </span>
                    </div>

                    {/* 4. Name & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#D84C70] focus:ring-2 focus:ring-[#D84C70]/20 text-xs sm:text-sm text-slate-800 outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          City / Location *
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Ahmedabad, Gandhinagar"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#D84C70] focus:ring-2 focus:ring-[#D84C70]/20 text-xs sm:text-sm text-slate-800 outline-hidden"
                        />
                      </div>
                    </div>

                    {/* 5. Checkboxes: Anonymous & Consent */}
                    <div className="space-y-2 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="w-4 h-4 rounded-sm text-[#88213B] accent-[#88213B] border-slate-300 focus:ring-[#88213B]"
                        />
                        <span className="text-xs text-slate-700">
                          <strong>Publish Anonymously</strong> (Displays as &ldquo;Patient from {city || "Gujarat"}&rdquo; to protect your identity)
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={verifiedConsent}
                          onChange={(e) => setVerifiedConsent(e.target.checked)}
                          className="w-4 h-4 rounded-sm text-[#88213B] accent-[#88213B] border-slate-300 focus:ring-[#88213B]"
                        />
                        <span className="text-xs text-slate-600">
                          I consent to sharing this feedback to guide other patients seeking breast care.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button & Detailed Form Link */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#88213B] to-[#D84C70] hover:opacity-95 shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Submitting Feedback...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Feedback Now</span>
                          </>
                        )}
                      </button>

                      <Link
                        href="/share-story"
                        className="text-xs font-semibold text-[#88213B] hover:text-[#6E172E] hover:underline flex items-center gap-1 py-2"
                      >
                        <span>Need to upload photo or video? Use Full Story Form</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </form>
                )}

              </div>

              {/* Bottom Clinical Governance Banner */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Clinical Ethics &amp; Patient Privacy Compliant
                </span>
                <span className="text-slate-400">Dr. Noopur Patel Oncology Practice</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
