"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Star,
  ShieldCheck,
  Sparkles,
  Camera,
  Video,
  Upload,
  CheckCircle2,
  AlertCircle,
  QrCode,
  ArrowRight,
  ChevronLeft,
  User,
  MapPin,
  Stethoscope,
  Phone,
  Mail,
  Lock,
} from "lucide-react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import PatientStoryQRCode from "@/components/doctor/PatientStoryQRCode";

const CARE_CATEGORIES = [
  "Breast Cancer",
  "Oncoplastic Surgery",
  "Breast Reconstruction",
  "Benign Conditions",
  "Early Detection",
  "General Consultation",
];

const GUJARAT_CITIES = [
  "Ahmedabad",
  "Gandhinagar",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Mehsana",
  "Palanpur",
  "Bhavnagar",
  "Jamnagar",
];

export default function ShareStoryPage() {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [city, setCity] = useState<string>("Ahmedabad");
  const [category, setCategory] = useState<string>("Early Detection");
  const [story, setStory] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verifiedConsent, setVerifiedConsent] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Photo size must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
      setPhotoUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!city.trim()) {
      setErrorMessage("Please select or enter your city.");
      return;
    }
    if (!story.trim() || story.trim().length < 15) {
      setErrorMessage("Please write at least 15 characters about your experience.");
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
          photoUrl: photoUrl || null,
          videoUrl: videoUrl.trim() || null,
          phone: phone.trim() || null,
          email: email.trim() || null,
          verifiedConsent,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrorMessage(data.error || "Failed to submit story. Please try again.");
      }
    } catch (err) {
      console.error("[ShareStory] Submit error:", err);
      setErrorMessage("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingDescriptions: Record<number, string> = {
    5: "Exceptional Compassion & Care (5/5)",
    4: "Very Good Experience (4/5)",
    3: "Satisfactory Care (3/5)",
    2: "Needs Improvement (2/5)",
    1: "Unsatisfactory (1/5)",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1 bg-gradient-to-b from-[#FFF8F9] via-white to-[#FFF8F9]/40 py-8 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-6">
            <Link href="/" className="hover:text-[#D84C70]">Home</Link>
            <span>&gt;</span>
            <Link href="/patient-stories" className="hover:text-[#D84C70]">Patient Stories</Link>
            <span>&gt;</span>
            <span className="text-[#D84C70] font-medium">Share Your Experience</span>
          </div>

          {/* SUCCESS STATE */}
          {submittedSuccess ? (
            <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl p-8 sm:p-12 border border-[#F5D6DE] shadow-xl text-center relative overflow-hidden">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>

              <span className="text-[11px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                THANK YOU FOR SHARING
              </span>
              <h1 className="font-serif text-[32px] sm:text-[38px] font-bold text-slate-900 leading-tight mb-4">
                Your Story Has Been Received with Gratitude
              </h1>

              <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed mb-6">
                Dr. Noopur Patel and her clinical team personally review every submission. 
                Your experience provides comfort, hope, and strength to women walking a similar path.
              </p>

              <div className="bg-[#FFF8F9] rounded-2xl p-4 sm:p-5 border border-[#F5D6DE] text-left mb-8 max-w-lg mx-auto">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-[#8B2346]">Submitted as:</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-medium">
                    Verified Consent Received
                  </span>
                </div>
                <p className="font-bold text-slate-800 text-[15px]">
                  {isAnonymous ? `Patient from ${city}` : name}
                </p>
                <p className="text-xs text-slate-500 mb-3">{category} • {city}</p>
                <p className="text-[13px] text-slate-700 italic border-l-2 border-[#D84C70] pl-3">
                  &ldquo;{story.slice(0, 180)}{story.length > 180 ? "..." : ""}&rdquo;
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/patient-stories"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] hover:opacity-95 shadow-md transition-all"
                >
                  <span>View All Patient Stories</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setStory("");
                    setPhotoUrl("");
                    setPhotoPreview("");
                    setVideoUrl("");
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-full text-[14px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Submit Another Story
                </button>
              </div>
            </div>
          ) : (
            /* SUBMISSION FORM GRID */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 border border-[#F5D6DE] shadow-xl">
                
                {/* Form Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F5D6DE] text-[11px] font-bold text-[#D84C70] uppercase tracking-wider mb-2">
                    <Heart className="w-3.5 h-3.5 fill-[#D84C70]" />
                    <span>Patient Reflection Portal</span>
                  </div>
                  <h1 className="font-serif text-[30px] sm:text-[38px] font-bold text-slate-900 leading-tight mb-2">
                    Share Your Journey
                  </h1>
                  <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
                    Your words inspire hope. Whether you underwent breast cancer surgery, reconstruction, 
                    or routine check-up with Dr. Noopur Patel, we welcome your feedback.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-[13px]">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* 1. Star Rating Selection */}
                  <div className="bg-[#FFF8F9] rounded-2xl p-4 sm:p-5 border border-[#F5D6DE]">
                    <label className="block text-[13px] font-bold text-slate-800 mb-1.5">
                      Your Overall Experience with Dr. Noopur Patel *
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 text-slate-300 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 ${
                              star <= (hoverRating || rating)
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-200 fill-slate-100"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-[12px] font-medium text-[#8B2346]">
                      {ratingDescriptions[hoverRating || rating]}
                    </span>
                  </div>

                  {/* 2. Patient Name & Anonymous Option */}
                  <div>
                    <label className="block text-[13px] font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#D84C70]" />
                        <span>Your Full Name *</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Shah"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D84C70] focus:ring-2 focus:ring-rose-100 text-slate-800 text-[14px]"
                    />

                    {/* Anonymous toggle */}
                    <div className="mt-2.5 flex items-start gap-2.5 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                      <input
                        type="checkbox"
                        id="anonymous-toggle"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-[#D84C70] focus:ring-[#D84C70] w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="anonymous-toggle" className="text-[12.5px] text-slate-700 cursor-pointer">
                        <span className="font-semibold text-slate-900 block">
                          Protect my privacy (Display as &ldquo;Patient from {city || "City"}&rdquo;)
                        </span>
                        <span className="text-slate-500 text-[11.5px]">
                          Highly recommended for breast oncology patients. Your real name is kept strictly private for Dr. Noopur&apos;s team.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* 3. City / Location */}
                  <div>
                    <label className="block text-[13px] font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#D84C70]" />
                      <span>City / Location *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Ahmedabad, Surat, Rajkot"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D84C70] focus:ring-2 focus:ring-rose-100 text-slate-800 text-[14px] mb-2"
                    />
                    {/* Quick City Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 mr-1">Popular:</span>
                      {GUJARAT_CITIES.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCity(c)}
                          className={`text-[11px] px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                            city === c
                              ? "bg-[#D84C70] text-white font-medium"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Care / Treatment Category */}
                  <div>
                    <label className="block text-[13px] font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-[#D84C70]" />
                      <span>Care or Treatment Received *</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CARE_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`p-2.5 rounded-xl text-[12px] font-semibold text-center border transition-all cursor-pointer ${
                            category === cat
                              ? "bg-[#FFF0F3] border-[#D84C70] text-[#D84C70] shadow-xs"
                              : "bg-white border-slate-200 hover:border-rose-200 text-slate-700"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 5. The Story / Review Content */}
                  <div>
                    <label className="block text-[13px] font-bold text-slate-800 mb-1.5">
                      Your Story / Review Narrative *
                    </label>
                    <p className="text-[12px] text-slate-500 mb-2">
                      Describe your diagnosis, surgery, recovery, or the guidance Dr. Noopur Patel provided.
                    </p>
                    <textarea
                      required
                      rows={5}
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      placeholder="e.g., When I was diagnosed with early breast cancer, I was overwhelmed. Dr. Noopur Patel calmly explained oncoplastic breast conservation options. Her surgical precision and warmth gave my family hope..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D84C70] focus:ring-2 focus:ring-rose-100 text-slate-800 text-[14px] leading-relaxed"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>Minimum 15 characters</span>
                      <span>{story.length} characters</span>
                    </div>
                  </div>

                  {/* 6. Media Options: Photo & Video Link */}
                  <div className="border-t border-slate-100 pt-5 space-y-4">
                    <span className="text-[12px] font-bold tracking-wider uppercase text-slate-500 block">
                      Optional Media (Photo or Video Story)
                    </span>

                    {/* Photo Upload */}
                    <div>
                      <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-[#D84C70]" />
                        <span>Upload Photo (Optional)</span>
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-rose-300 bg-rose-50/40 hover:bg-rose-50 text-[13px] font-medium text-[#8B2346] cursor-pointer transition-colors">
                          <Upload className="w-4 h-4 text-[#D84C70]" />
                          <span>Choose Image (Max 5MB)</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                        {photoPreview && (
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-rose-200 shadow-xs">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={photoPreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setPhotoPreview("");
                                setPhotoUrl("");
                              }}
                              className="absolute top-0 right-0 bg-red-600 text-white rounded-bl p-0.5 text-[9px]"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Video Link */}
                    <div>
                      <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-[#D84C70]" />
                        <span>Video Story Link (Optional - YouTube / Vimeo / Drive)</span>
                      </label>
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#D84C70] text-slate-800 text-[13px]"
                      />
                    </div>
                  </div>

                  {/* 7. Private Contact Details (Optional) */}
                  <div className="border-t border-slate-100 pt-5">
                    <span className="text-[12px] font-bold tracking-wider uppercase text-slate-500 block mb-2">
                      Clinic Contact Information (Strictly Confidential)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[12px] text-slate-600 mb-1 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>Phone Number (Private)</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 text-[13px] focus:outline-none focus:border-[#D84C70]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-slate-600 mb-1 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>Email Address (Private)</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 text-[13px] focus:outline-none focus:border-[#D84C70]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 8. Verified Patient Consent */}
                  <div className="bg-[#FFF8F9] p-4 rounded-2xl border border-[#F5D6DE] space-y-2">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="consent-checkbox"
                        required
                        checked={verifiedConsent}
                        onChange={(e) => setVerifiedConsent(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-[#D84C70] focus:ring-[#D84C70] w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="consent-checkbox" className="text-[12.5px] text-slate-700 cursor-pointer">
                        <span className="font-semibold text-slate-900 block">
                          Verified Patient Consent *
                        </span>
                        <span>
                          I confirm that this review represents my genuine experience under Dr. Noopur Patel.
                          I consent to have my review published on the website to guide and inspire others.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl text-[15px] font-bold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] hover:opacity-95 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Safely...</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 fill-white" />
                        <span>Submit Story for Review</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11.5px] text-slate-500 pt-1">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Protected by Clinical Governance & Patient Confidentiality</span>
                  </div>

                </form>

              </div>

              {/* Right Column: QR Code Standee & Trust Information (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Official QR Code Card */}
                <PatientStoryQRCode />

                {/* 2. Dr. Noopur Patel's Assurance Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F5D6DE] shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D84C70] shadow-sm">
                      <Image
                        src="/images/doctor/assets/dr-noopur-hd.jpg"
                        alt="Dr. Noopur Patel"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-[16px] font-bold text-slate-900 leading-tight">
                        Dr. Noopur Patel
                      </h4>
                      <p className="text-[11.5px] text-[#D84C70] font-semibold">
                        Consultant Breast Cancer & Oncoplastic Surgeon
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Marengo CIMS Hospital, Ahmedabad
                      </p>
                    </div>
                  </div>

                  <p className="text-[13px] text-slate-600 leading-relaxed italic border-l-2 border-[#D84C70] pl-3 mb-4">
                    &ldquo;When a woman shares her healing journey, she lights a path for another woman who may currently be facing uncertainty and fear.&rdquo;
                  </p>

                  <div className="space-y-2 text-[12px] text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Every submission is clinically moderated before publishing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Strict adherence to patient identity and privacy choices</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>Immediate sync with website once approved by Dr. Patel</span>
                    </div>
                  </div>
                </div>

                {/* 3. Clinic Standee Note */}
                <div className="bg-[#FFF8F9] rounded-2xl p-5 border border-[#F5D6DE] text-center">
                  <QrCode className="w-6 h-6 text-[#D84C70] mx-auto mb-2" />
                  <p className="text-[13px] font-bold text-slate-800">
                    Visiting the Clinic at Marengo CIMS Hospital?
                  </p>
                  <p className="text-[12px] text-slate-600 leading-relaxed mt-1">
                    You can also scan the physical QR standee placed at our reception desk or consultation chamber.
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>
      </main>

      <DoctorFooter />
    </div>
  );
}
