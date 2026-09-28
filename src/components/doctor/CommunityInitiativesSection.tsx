"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  HeartHandshake, 
  Users, 
  Calendar, 
  Sparkles, 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck,
  Stethoscope,
  GraduationCap
} from "lucide-react";

export type CommunityCategory = "all" | "support-group" | "screening-camps" | "awareness-sessions" | "tumor-board";

export interface CommunityActivityItem {
  id: string;
  category: "support-group" | "screening-camps" | "awareness-sessions" | "tumor-board";
  categoryLabel: string;
  title: string;
  description: string;
  image: string;
  badge: string;
}

export const COMMUNITY_ACTIVITIES: CommunityActivityItem[] = [
  // 1. Cancer Patient Support Group
  {
    id: "act-1",
    category: "support-group",
    categoryLabel: "Cancer Survivor Support Group",
    badge: "Cancer Warriors Circle",
    title: "Survivor Journey Sharing & Healing Circle",
    description: "Dr. Nupur Patel periodically gathers breast cancer warriors and survivors to share recovery stories, exchange emotional strength, and support newly diagnosed patients.",
    image: "/images/doctor/optimized/community/support-group-gathering.webp",
  },
  {
    id: "act-2",
    category: "support-group",
    categoryLabel: "Cancer Survivor Support Group",
    badge: "Peer Community",
    title: "Interactive Patient Support & Counseling Meeting",
    description: "Creating a warm, dignified, and safe community space where patients openly discuss survivorship, body confidence, lifestyle after surgery, and emotional wellness.",
    image: "/images/doctor/optimized/community/support-group-sharing.webp",
  },
  {
    id: "act-3",
    category: "support-group",
    categoryLabel: "Cancer Survivor Support Group",
    badge: "Recovery Milestone",
    title: "Celebrating Cancer Remission & Milestones",
    description: "Honoring the courage and resilience of our cancer survivors with milestone celebrations, inspiring others along their treatment journey.",
    image: "/images/doctor/optimized/community/support-group-celebration.webp",
  },
  {
    id: "act-4",
    category: "support-group",
    categoryLabel: "Cancer Survivor Support Group",
    badge: "Survivor Empowerment",
    title: "Cancer Warriors Community Outreach",
    description: "Patient support group participants uniting to inspire confidence in women undergoing active chemotherapy and surgical treatment.",
    image: "/images/doctor/optimized/community/cancer-warriors-activity.webp",
  },

  // 2. Mammography Screening Camps
  {
    id: "act-5",
    category: "screening-camps",
    categoryLabel: "Mammography Screening Camps",
    badge: "Early Detection Mission",
    title: "Public Clinical Breast Screening Camp",
    description: "Conducting community clinical breast evaluations, reviewing digital mammograms, and providing timely referrals to catch abnormalities at curable stages.",
    image: "/images/doctor/optimized/community/screening-camp-counseling.webp",
  },
  {
    id: "act-6",
    category: "screening-camps",
    categoryLabel: "Mammography Screening Camps",
    badge: "Clinical Checkup",
    title: "On-Site Doctor Examination & Guidance",
    description: "Personalised, confidential examinations conducted by Dr. Nupur Patel for community women, dispelling fear and offering clear clinical roadmaps.",
    image: "/images/doctor/optimized/community/screening-camp-examination.webp",
  },
  {
    id: "act-7",
    category: "screening-camps",
    categoryLabel: "Mammography Screening Camps",
    badge: "Community Health",
    title: "Preventive Mammography Consultation Drive",
    description: "Free and subsidized screening drives enabling women from diverse backgrounds to access specialized breast surgical consultation and screening advice.",
    image: "/images/doctor/optimized/community/screening-camp-community.webp",
  },
  {
    id: "act-8",
    category: "screening-camps",
    categoryLabel: "Mammography Screening Camps",
    badge: "Multidisciplinary Camp Team",
    title: "Screening Camp Clinical & Nursing Team",
    description: "Dedicated medical personnel and nurses ensuring comfortable, dignified, and expedited breast health checkups.",
    image: "/images/doctor/optimized/community/screening-camp-team.webp",
  },

  // 3. Breast Cancer Awareness Sessions & Public Lectures
  {
    id: "act-9",
    category: "awareness-sessions",
    categoryLabel: "Awareness Sessions & Lectures",
    badge: "Public Education",
    title: "Keynote Lecture on Early Breast Cancer Detection",
    description: "Dr. Nupur Patel addressing public audiences, medical students, and community forums on monthly breast self-examination and timely clinical evaluation.",
    image: "/images/doctor/optimized/community/awareness-lecture-podium.webp",
  },
  {
    id: "act-10",
    category: "awareness-sessions",
    categoryLabel: "Awareness Sessions & Lectures",
    badge: "Seminar & Symposium",
    title: "Interactive Breast Health Awareness Seminar",
    description: "Large-scale educational seminars addressing common breast health myths, distinguishing benign lumps from cancer, and explaining oncoplastic surgery options.",
    image: "/images/doctor/optimized/community/awareness-seminar-hall.webp",
  },
  {
    id: "act-11",
    category: "awareness-sessions",
    categoryLabel: "Awareness Sessions & Lectures",
    badge: "Community Talk",
    title: "Empowering Women with Evidence-Based Knowledge",
    description: "Engaging interactive Q&A sessions encouraging women to overcome hesitation, shame, or fear and seek prompt clinical evaluation.",
    image: "/images/doctor/optimized/community/awareness-session-interactive.webp",
  },
  {
    id: "act-12",
    category: "awareness-sessions",
    categoryLabel: "Awareness Sessions & Lectures",
    badge: "Specialist Speaker",
    title: "Surgical Oncology Advancements Presentation",
    description: "Presenting modern oncoplastic breast conservation techniques and surgical safety benchmarks to medical peers and civic organizations.",
    image: "/images/doctor/optimized/community/awareness-specialist-address.webp",
  },
];

export default function CommunityInitiativesSection() {
  const [activeCategory, setActiveCategory] = useState<CommunityCategory>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? COMMUNITY_ACTIVITIES
      : COMMUNITY_ACTIVITIES.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <section 
      className="w-full py-16 lg:py-24 bg-[#FAF7F8] border-b border-[#F5E6EA]" 
      id="community-support"
      aria-label="Community & Cancer Patient Support Group"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-[#D84C70]" />
            COMMUNITY &amp; SURVIVORSHIP INITIATIVES
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
            Cancer Patient Support &amp; Public Awareness
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            Beyond clinical surgery: bringing cancer survivors together, organizing early-detection mammography screening camps, and delivering public health lectures across Gujarat.
          </p>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          
          {/* Card 1: Support Group */}
          <div className="p-6 rounded-2xl bg-white border border-[#F0D5DC] shadow-xs hover:border-[#D84C70]/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F4] border border-[#F5CAD5] flex items-center justify-center text-[#D84C70] mb-3.5">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1.5">
              Cancer Warriors Support Group
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Dr. Nupur Patel periodically gathers breast cancer patients and survivors together to share their journeys, exchange emotional strength, and build community support.
            </p>
          </div>

          {/* Card 2: Screening Camps */}
          <div className="p-6 rounded-2xl bg-white border border-[#F0D5DC] shadow-xs hover:border-[#D84C70]/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F4] border border-[#F5CAD5] flex items-center justify-center text-[#D84C70] mb-3.5">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1.5">
              Mammography Screening Camps
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Conducting public screening activities and clinical breast examinations to detect asymptomatic lumps and early-stage lesions when cure rates are highest.
            </p>
          </div>

          {/* Card 3: Awareness Lectures */}
          <div className="p-6 rounded-2xl bg-white border border-[#F0D5DC] shadow-xs hover:border-[#D84C70]/60 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F4] border border-[#F5CAD5] flex items-center justify-center text-[#D84C70] mb-3.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1.5">
              Awareness Sessions &amp; Lectures
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Public education talks in colleges, institutions, and civic organizations teaching breast self-examination and clarifying common questions with medical honesty.
            </p>
          </div>

        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Activities" },
            { id: "support-group", label: "Cancer Support Group" },
            { id: "screening-camps", label: "Mammography Camps" },
            { id: "awareness-sessions", label: "Awareness Lectures" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as CommunityCategory)}
              type="button"
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-[#88213B] text-white shadow-sm scale-102"
                  : "bg-white text-slate-700 border border-[#EED7DC] hover:bg-[#FAF0F3] hover:text-[#88213B]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento Grid / Gallery with Real Activity Photographs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-white rounded-2xl border border-[#F0D5DC] overflow-hidden shadow-2xs hover:shadow-lg hover:border-[#D84C70] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full bg-[#FFF8F9] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                
                {/* Zoom Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ZoomIn className="w-4 h-4 text-[#88213B]" />
                </div>

                {/* Badge Tag */}
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                  {item.badge}
                </span>

                {/* Title Overlay */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-serif text-xs sm:text-[13.5px] font-bold truncate drop-shadow leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Body */}
              <div className="p-3.5 sm:p-4 bg-white flex-1 flex flex-col justify-between">
                <p className="text-[11.5px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#88213B]">
                  <span>{item.categoryLabel}</span>
                  <span className="text-slate-400 group-hover:text-[#D84C70] transition-colors">View Photo →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Respectful Clinical Privacy Disclaimer */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-500 text-center max-w-2xl mx-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Patient dignity and confidentiality are respected in all community activities. Visuals reflect authorized public awareness drives and patient survivor meetings.
          </span>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="max-w-3xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] max-h-[65vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <Image
                src={filteredItems[activeLightboxIndex].image}
                alt={filteredItems[activeLightboxIndex].title}
                fill
                className="object-contain"
                sizes="800px"
              />
            </div>
            
            <div className="text-center mt-4 text-white max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                {filteredItems[activeLightboxIndex].badge} · {filteredItems[activeLightboxIndex].categoryLabel}
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">
                {filteredItems[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {filteredItems[activeLightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
