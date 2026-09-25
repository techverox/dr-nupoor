"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Play, 
  Quote, 
  Ribbon,
  QrCode,
  ArrowRight,
  X,
  ExternalLink,
  MessageCircleHeart,
  RefreshCw,
} from "lucide-react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import TrustStrip from "@/components/doctor/TrustStrip";
import PatientStoryQRCode from "@/components/doctor/PatientStoryQRCode";
import { TestimonialItem } from "@/types";
import { subscribeLiveSync } from "@/lib/sync/clientSync";

const DEFAULT_STORIES: Array<{
  id: string;
  category: string;
  avatar: string;
  quote: string;
  patient: string;
  tag: string;
  rating: number;
  city?: string;
}> = [
  {
    id: "story-1",
    category: "Early Detection",
    avatar: "/images/doctor/assets/patient-avatar-1.png",
    quote:
      "I was diagnosed with breast cancer at an early stage. Dr. Noopur Patel explained everything so clearly and supported me at every step. Today I am healthy and back to my normal life.",
    patient: "Patient from Ahmedabad",
    tag: "Early Detection",
    rating: 5,
    city: "Ahmedabad",
  },
  {
    id: "story-2",
    category: "Benign Conditions",
    avatar: "/images/doctor/assets/patient-avatar-2.png",
    quote:
      "I had a breast lump and was very worried. Dr. Noopur Patel guided me with the right tests and the treatment was simple. I am grateful for her calm and kind approach.",
    patient: "Patient from Gandhinagar",
    tag: "Benign Breast Condition",
    rating: 5,
    city: "Gandhinagar",
  },
  {
    id: "story-3",
    category: "Oncoplastic Surgery",
    avatar: "/images/doctor/assets/patient-avatar-3.png",
    quote:
      "After my surgery, I was concerned about how I would look. Dr. Noopur Patel explained the oncoplastic options and the results have been truly life-changing.",
    patient: "Patient from Palanpur",
    tag: "Oncoplastic Surgery",
    rating: 5,
    city: "Palanpur",
  },
  {
    id: "story-4",
    category: "Breast Reconstruction",
    avatar: "/images/doctor/assets/patient-avatar-1.png",
    quote:
      "From the first consultation to the final reconstructive follow-up, the surgical precision and empathy shown by Dr. Patel gave my family immense peace of mind.",
    patient: "Patient from Rajkot",
    tag: "Breast Reconstruction",
    rating: 5,
    city: "Rajkot",
  },
  {
    id: "story-5",
    category: "Breast Cancer",
    avatar: "/images/doctor/assets/patient-avatar-2.png",
    quote:
      "The multidisciplinary care at Marengo CIMS Hospital under Dr. Noopur Patel was exceptional. Every question was answered with scientific clarity and patience.",
    patient: "Patient from Surat",
    tag: "Breast Cancer Surgery",
    rating: 5,
    city: "Surat",
  },
];

const DEFAULT_VIDEOS = [
  {
    title: "My Breast Cancer Journey and Recovery",
    duration: "02:45",
    patient: "Patient from Ahmedabad",
    image: "/images/doctor/assets/patient-avatar-1.png",
    videoUrl: "https://www.youtube.com",
  },
  {
    title: "How Early Detection Saved My Life",
    duration: "04:12",
    patient: "Patient from Mehsana",
    image: "/images/doctor/assets/patient-avatar-2.png",
    videoUrl: "https://www.youtube.com",
  },
  {
    title: "Life After Oncoplastic Surgery",
    duration: "05:08",
    patient: "Patient from Palanpur",
    image: "/images/doctor/assets/patient-avatar-3.png",
    videoUrl: "https://www.youtube.com",
  },
];

export default function PatientStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [stories, setStories] = useState<typeof DEFAULT_STORIES>(DEFAULT_STORIES);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const categories = [
    "All Stories",
    "Breast Cancer",
    "Oncoplastic Surgery",
    "Breast Reconstruction",
    "Benign Conditions",
    "Early Detection",
  ];

  // Fetch approved patient stories
  const loadApprovedStories = useCallback(async () => {
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      if (data.success && Array.isArray(data.stories) && data.stories.length > 0) {
        const mapped = data.stories.map((s: TestimonialItem, idx: number) => ({
          id: s.id || `story-${idx}`,
          category: s.category || s.clientRole || "Breast Cancer",
          avatar: s.clientAvatar || `/images/doctor/assets/patient-avatar-${(idx % 3) + 1}.png`,
          quote: s.testimonial,
          patient: s.clientName || "Patient from Ahmedabad",
          tag: s.clientRole || s.category || "Verified Patient",
          rating: s.rating || 5,
          city: s.city || "",
        }));
        setStories(mapped);
      }
    } catch (err) {
      console.error("[PatientStoriesPage] Load error:", err);
    }
  }, []);

  useEffect(() => {
    loadApprovedStories();

    // Subscribe to live sync for real-time review approval
    const unsubscribe = subscribeLiveSync((event) => {
      if (event.collection === "testimonials" || event.type === "CMS_MUTATION") {
        loadApprovedStories();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [loadApprovedStories]);

  const filteredStories =
    selectedCategory === "All Stories"
      ? stories
      : stories.filter(
          (s) =>
            s.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            s.tag.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1">
        {/* 1. BREADCRUMBS & HERO SECTION */}
        <section className="relative w-full bg-gradient-to-b from-[#FFF8F9] to-white pt-6 pb-16 lg:py-20 border-b border-rose-100/60 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-6">
              <Link href="/" className="hover:text-[#D84C70]">Home</Link>
              <span>&gt;</span>
              <span className="text-[#D84C70] font-medium">Patient Stories</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F5D6DE] text-[11px] font-bold text-[#D84C70] uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 fill-[#D84C70]" />
                  <span>Real Patient Journeys</span>
                </div>
                <h1 className="font-serif text-[40px] sm:text-[52px] font-bold text-[#1A202C] leading-[1.15]">
                  Real Stories.{" "}
                  <span className="italic font-serif text-[#D84C70] block sm:inline">
                    Real Strength.
                  </span>
                </h1>
                <p className="text-slate-600 text-[16px] sm:text-[17px] leading-relaxed max-w-2xl">
                  Every woman&apos;s journey is unique. Here are genuine reflections from patients who trusted 
                  Dr. Noopur Patel with their breast cancer surgery, reconstruction, and care.
                </p>

                {/* 4 Feature Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700 shadow-xs">
                    <Heart className="w-4 h-4 text-[#D84C70]" />
                    <span>Compassionate Care</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700 shadow-xs">
                    <Users className="w-4 h-4 text-[#D84C70]" />
                    <span>Verified Consent</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-[#D84C70]" />
                    <span>Positive Outcomes</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700 shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#D84C70]" />
                    <span>Hope for Tomorrow</span>
                  </div>
                </div>

                {/* Action CTAs: Share Story & Scan QR */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    href="/share-story"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] hover:opacity-95 shadow-md hover:shadow-lg transition-all"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Share Your Story</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsQrModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-semibold text-[#8B2346] bg-white border border-[#F5D6DE] hover:bg-[#FFF0F3] shadow-xs transition-colors cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 text-[#D84C70]" />
                    <span>Scan QR Code to Review</span>
                  </button>
                </div>
              </div>

              {/* Doctor Visual with Quote */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[32px] overflow-hidden bg-[#FDF2F4] border border-[#F5D6DE] shadow-xl p-2.5">
                  <div className="relative w-full h-full rounded-[26px] overflow-hidden">
                    <Image
                      src="/images/doctor/assets/dr-noopur-hd.jpg"
                      alt="Dr. Noopur Patel, Breast Cancer Surgeon"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="380px"
                    />
                  </div>
                </div>

                <div className="absolute top-4 left-2 sm:left-4 max-w-[200px] bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/70 shadow-sm">
                  <p className="font-serif italic text-[12.5px] text-[#9B2846] font-semibold leading-tight">
                    &ldquo;Your Courage Inspires Us.&rdquo;
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">
                    — Dr. Noopur Patel
                  </p>
                </div>

                <div className="absolute -bottom-4 right-2 sm:right-6 bg-white/95 backdrop-blur-md border border-[#F5D6DE] rounded-2xl p-2.5 shadow-lg flex items-center gap-3 max-w-[210px]">
                  <div className="relative w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden shadow-xs">
                    <Image
                      src="/images/doctor/assets/favicon.png"
                      alt="Stronger Women"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-[11px] leading-tight font-bold text-slate-800">
                    Stronger Women
                    <span className="text-[#D84C70] font-semibold block text-[10px]">
                      Brighter Tomorrows
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. SCAN & SHARE HIGHLIGHT BANNER */}
        <section className="w-full bg-[#FFF0F3]/60 py-6 border-b border-[#F5D6DE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#F5D6DE] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFF0F3] border border-[#F5D6DE] flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-6 h-6 text-[#D84C70]" />
                </div>
                <div>
                  <h3 className="font-serif text-[17px] font-bold text-slate-900 leading-tight">
                    Have you been treated by Dr. Noopur Patel?
                  </h3>
                  <p className="text-[13px] text-slate-600">
                    Scan our QR code on your mobile or click to submit your healing journey directly.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(true)}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold text-[#8B2346] bg-[#FFF0F3] hover:bg-rose-100 border border-[#F5D6DE] transition-colors cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-[#D84C70]" />
                  <span>Show QR Code</span>
                </button>
                <Link
                  href="/share-story"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] hover:opacity-95 shadow-xs transition-all"
                >
                  <span>Share Story Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. JOURNEYS OF HOPE — STORIES THAT INSPIRE */}
        <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60" id="stories">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div className="max-w-2xl">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                  JOURNEYS OF HOPE
                </span>
                <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1A202C] leading-tight mb-3">
                  Stories That Inspire
                </h2>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  From early detection to successful treatment and beyond — our patients share how timely care made a difference in their lives.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(true)}
                  className="inline-flex items-center gap-2 text-slate-700 hover:text-[#D84C70] text-[13px] font-semibold px-4 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-[#D84C70]" />
                  <span>Scan to Review</span>
                </button>

                <Link
                  href="/share-story"
                  className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-[#FFF8F9] hover:bg-[#FDF2F4] transition-all shadow-xs"
                >
                  <Heart className="w-4 h-4 text-[#D84C70]" />
                  <span>Share Your Story</span>
                </Link>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[13px] font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#D84C70] text-white shadow-xs"
                      : "bg-[#FFF8F9] text-slate-700 border border-[#F5D6DE] hover:bg-[#FDF2F4]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-[#FFF8F9]/40 rounded-2xl p-6 sm:p-7 border border-[#F5D6DE] hover:border-[#D84C70] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Avatar, Consent & Stars */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-[#F5D6DE] bg-white flex-shrink-0 shadow-xs">
                          <Image
                            src={story.avatar}
                            alt={story.patient}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <div className="mb-0.5">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D84C70] bg-[#FFF0F3] px-2 py-0.5 rounded-full border border-[#F5D6DE]">
                              Verified Consent
                            </span>
                          </div>
                          <span className="text-[13px] font-bold text-slate-900 block leading-tight">
                            {story.patient}
                          </span>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= (story.rating || 5)
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-200 fill-slate-100"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="text-[13.5px] text-slate-700 leading-relaxed italic mb-6">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F5D6DE]/60 flex items-center justify-between">
                    <span className="inline-block px-3 py-1 rounded-full bg-white border border-[#F5D6DE] text-[11px] font-semibold text-[#D84C70]">
                      {story.tag}
                    </span>
                    {story.city && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        {story.city}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 4. BEYOND TREATMENT — A NEW CHAPTER OF CONFIDENCE */}
        <section className="w-full py-16 bg-[#FFF8F9]/50 border-b border-rose-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-[#F5D6DE] p-8 sm:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Photo: Woman with Scarf */}
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative w-full max-w-[340px] aspect-[4/3] rounded-2xl overflow-hidden border border-[#F5D6DE] shadow-xs">
                    <Image
                      src="/images/doctor/assets/banner-new-chapter.png"
                      alt="A New Chapter of Confidence"
                      fill
                      className="object-cover"
                      sizes="340px"
                    />
                  </div>
                </div>

                {/* Center Copy */}
                <div className="lg:col-span-4 space-y-3">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#D84C70] block">
                    BEYOND TREATMENT
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[30px] font-bold text-slate-900 leading-tight">
                    A New Chapter of Confidence
                  </h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    Our goal is not just to treat a disease, but to help every woman regain her confidence, live fully and look forward to a healthier tomorrow.
                  </p>
                </div>

                {/* Right Checklist */}
                <div className="lg:col-span-4 space-y-2.5">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FFF8F9] border border-[#F5D6DE]">
                    <ShieldCheck className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                    <span className="text-[12.5px] font-semibold text-slate-800">Personalised Treatment Plans</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FFF8F9] border border-[#F5D6DE]">
                    <Sparkles className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                    <span className="text-[12.5px] font-semibold text-slate-800">Focus on Aesthetic Outcomes</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FFF8F9] border border-[#F5D6DE]">
                    <Heart className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                    <span className="text-[12.5px] font-semibold text-slate-800">Emotional &amp; Psychological Support</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FFF8F9] border border-[#F5D6DE]">
                    <Ribbon className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                    <span className="text-[12.5px] font-semibold text-slate-800">Long-term Follow-up Care</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 5. VIDEO STORIES — HEAR FROM OUR PATIENTS */}
        <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60" id="video-stories">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                  VIDEO STORIES
                </span>
                <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1A202C] leading-tight mb-3">
                  Hear From Our Patients
                </h2>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Real experiences in their own words.
                </p>
              </div>

              <div>
                <a
                  href="https://youtube.com/@drnoopurpatel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-[#FFF8F9] hover:bg-[#FDF2F4] transition-all shadow-xs"
                >
                  <Play className="w-4 h-4 text-[#D84C70] fill-current" />
                  <span>View More Videos</span>
                </a>
              </div>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DEFAULT_VIDEOS.map((v, idx) => (
                <div
                  key={idx}
                  className="group bg-[#FFF8F9] border border-[#F5D6DE] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Video Thumbnail with Play Button */}
                  <div className="relative w-full aspect-[16/10] bg-slate-200 overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      sizes="380px"
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#D84C70] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                      {v.duration}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-[16px] font-bold text-slate-900 mb-1 group-hover:text-[#D84C70] transition-colors leading-snug">
                      {v.title}
                    </h3>
                    <p className="text-[12.5px] text-slate-500 font-medium">
                      {v.patient}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. BOTTOM INSPIRATION CTA BANNER WITH DIRECT QR BUTTON */}
        <section className="w-full bg-gradient-to-r from-[#D84C70] via-[#C83E62] to-[#B83054] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <h2 className="font-serif text-[28px] sm:text-[38px] font-bold">
              Your Story Can Inspire Hope in Another Woman
            </h2>
            <p className="text-white/90 text-[15px] sm:text-[16px] max-w-xl mx-auto leading-relaxed">
              If you have been treated by Dr. Noopur Patel, share your experience to help and comfort other patients embarking on their breast health journey.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/share-story"
                className="inline-flex items-center gap-2 bg-white text-[#D84C70] hover:bg-slate-50 font-bold text-[14px] px-8 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
              >
                <Heart className="w-4 h-4 fill-[#D84C70]" />
                <span>Share Your Story Online</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-[14px] px-6 py-3.5 rounded-full border border-white/40 shadow-sm transition-all cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Scan QR Code with Phone</span>
              </button>
            </div>
          </div>
        </section>

        {/* 7. TRUST STRIP & FOOTER */}
        <TrustStrip />
      </main>

      <DoctorFooter />

      {/* POPUP QR CODE SCAN MODAL */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100">
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <PatientStoryQRCode
              size={220}
              showCardWrapper={false}
              className="flex flex-col items-center"
            />

            <div className="text-center mt-4">
              <h3 className="font-serif text-[20px] font-bold text-slate-900 mb-1">
                Scan to Share Your Journey
              </h3>
              <p className="text-[13px] text-slate-600 mb-5 leading-relaxed">
                Aim your phone camera at this QR code to open the private patient review portal.
              </p>

              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/share-story"
                  onClick={() => setIsQrModalOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#D84C70] to-[#BE3A5C] hover:opacity-95 shadow-sm transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Form in Browser</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
