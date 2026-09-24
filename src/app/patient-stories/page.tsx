"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Ribbon,
  Calendar,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import TrustStrip from "@/components/doctor/TrustStrip";

export default function PatientStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Stories");

  const categories = [
    "All Stories",
    "Breast Cancer",
    "Oncoplastic Surgery",
    "Breast Reconstruction",
    "Benign Conditions",
    "Early Detection",
  ];

  const stories = [
    {
      id: 1,
      category: "Early Detection",
      avatar: "/images/doctor/assets/patient-avatar-1.png",
      quote:
        "I was diagnosed with breast cancer at an early stage. Dr. Noopur Patel explained everything so clearly and supported me at every step. Today I am healthy and back to my normal life.",
      patient: "Patient from Ahmedabad",
      tag: "Early Detection",
    },
    {
      id: 2,
      category: "Benign Conditions",
      avatar: "/images/doctor/assets/patient-avatar-2.png",
      quote:
        "I had a breast lump and was very worried. Dr. Noopur Patel guided me with the right tests and the treatment was simple. I am grateful for her calm and kind approach.",
      patient: "Patient from Gandhinagar",
      tag: "Benign Breast Condition",
    },
    {
      id: 3,
      category: "Oncoplastic Surgery",
      avatar: "/images/doctor/assets/patient-avatar-3.png",
      quote:
        "After my surgery, I was concerned about how I would look. Dr. Noopur Patel explained the oncoplastic options and the results have been truly life-changing.",
      patient: "Patient from Palanpur",
      tag: "Oncoplastic Surgery",
    },
    {
      id: 4,
      category: "Breast Reconstruction",
      avatar: "/images/doctor/assets/patient-avatar-1.png",
      quote:
        "From the first consultation to the final reconstructive follow-up, the surgical precision and empathy shown by Dr. Patel gave my family immense peace of mind.",
      patient: "Patient from Rajkot",
      tag: "Breast Reconstruction",
    },
    {
      id: 5,
      category: "Breast Cancer",
      avatar: "/images/doctor/assets/patient-avatar-2.png",
      quote:
        "The multidisciplinary care at Marengo CIMS Hospital under Dr. Noopur Patel was exceptional. Every question was answered with scientific clarity and patience.",
      patient: "Patient from Surat",
      tag: "Breast Cancer Surgery",
    },
  ];

  const filteredStories = selectedCategory === "All Stories"
    ? stories
    : stories.filter((s) => s.category === selectedCategory || s.tag.toLowerCase().includes(selectedCategory.toLowerCase()));

  const videoStories = [
    {
      title: "My Breast Cancer Journey and Recovery",
      duration: "02:45",
      patient: "Patient from Ahmedabad",
      image: "/images/doctor/assets/patient-avatar-1.png",
    },
    {
      title: "How Early Detection Saved My Life",
      duration: "04:12",
      patient: "Patient from Mehsana",
      image: "/images/doctor/assets/patient-avatar-2.png",
    },
    {
      title: "Life After Oncoplastic Surgery",
      duration: "05:08",
      patient: "Patient from Palanpur",
      image: "/images/doctor/assets/patient-avatar-3.png",
    },
  ];

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
                <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block">
                  PATIENT STORIES
                </span>
                <h1 className="font-serif text-[42px] sm:text-[54px] font-bold text-[#1A202C] leading-[1.15]">
                  Real Stories.{" "}
                  <span className="italic font-serif text-[#D84C70] block sm:inline">
                    Real Strength.
                  </span>
                </h1>
                <p className="text-slate-600 text-[16px] sm:text-[17px] leading-relaxed max-w-2xl">
                  Every woman&apos;s journey is unique. Here are some real stories from our patients who trusted us with their care.
                </p>

                {/* 4 Feature Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700">
                    <Heart className="w-4 h-4 text-[#D84C70]" />
                    <span>Trusted Care</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700">
                    <Users className="w-4 h-4 text-[#D84C70]" />
                    <span>Real Experiences</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-[#D84C70]" />
                    <span>Positive Outcomes</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] text-[12.5px] font-medium text-slate-700">
                    <Sparkles className="w-4 h-4 text-[#D84C70]" />
                    <span>Hope for Tomorrow</span>
                  </div>
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

                <div className="absolute -bottom-4 right-2 sm:right-6 bg-white/95 backdrop-blur-md border border-[#F5D6DE] rounded-2xl p-3 shadow-lg flex items-center gap-3 max-w-[200px]">
                  <div className="relative w-7 h-9 flex-shrink-0 flex items-center justify-center">
                    <Image
                      src="/images/doctor/assets/pink-ribbon-logo.png"
                      alt="Stronger Women"
                      width={28}
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

        {/* 2. JOURNEYS OF HOPE — STORIES THAT INSPIRE */}
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

              <div>
                <Link
                  href="/appointments"
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
                    {/* Top Row: Avatar & Stars */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#F5D6DE] bg-white flex-shrink-0 shadow-xs">
                        <Image
                          src={story.avatar}
                          alt={story.patient}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <div className="mb-1">
                          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#D84C70] bg-[#FFF0F3] px-2 py-0.5 rounded-full border border-[#F5D6DE]">
                            Verified Consent
                          </span>
                        </div>
                        <span className="text-[13px] font-bold text-slate-900 block leading-tight">
                          {story.patient}
                        </span>
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="text-[13.5px] text-slate-700 leading-relaxed italic mb-6">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F5D6DE]/60">
                    <span className="inline-block px-3 py-1 rounded-full bg-white border border-[#F5D6DE] text-[11px] font-semibold text-[#D84C70]">
                      {story.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 3. BEYOND TREATMENT — A NEW CHAPTER OF CONFIDENCE */}
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

        {/* 4. VIDEO STORIES — HEAR FROM OUR PATIENTS */}
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
              {videoStories.map((v, idx) => (
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

        {/* 5. BOTTOM INSPIRATION CTA BANNER */}
        <section className="w-full bg-gradient-to-r from-[#D84C70] via-[#C83E62] to-[#B83054] text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h2 className="font-serif text-[28px] sm:text-[36px] font-bold">
              Your Story Can Inspire Others
            </h2>
            <p className="text-white/90 text-[15px] sm:text-[16px] max-w-xl mx-auto">
              If you are comfortable, share your experience to help and support other women on their breast health journey.
            </p>
            <div className="pt-3">
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 bg-white text-[#D84C70] hover:bg-slate-50 font-bold text-[14px] px-7 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
              >
                <Heart className="w-4 h-4 text-[#D84C70]" />
                <span>Share Your Story</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 6. TRUST STRIP & FOOTER */}
        <TrustStrip />
      </main>

      <DoctorFooter />
    </div>
  );
}
