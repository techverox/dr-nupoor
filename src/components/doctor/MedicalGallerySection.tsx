"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, X, ZoomIn, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

export type GalleryCategory = "all" | "doctor" | "hospital" | "education" | "events";

export interface GalleryItem {
  id: string;
  category: "doctor" | "hospital" | "education" | "events";
  categoryLabel: string;
  title: string;
  description: string;
  image: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    category: "doctor",
    categoryLabel: "Doctor & Professional",
    title: "Dr. Noopur Patel – Surgical Consultation",
    description: "Dedicated patient consultation and evidence-based breast oncology planning at Marengo CIMS Hospital.",
    image: "/images/doctor/assets/dr-noopur-hd.jpg",
  },
  {
    id: "gal-2",
    category: "hospital",
    categoryLabel: "Hospital & Facilities",
    title: "OPD Breast Care Consultation Suite",
    description: "Private consultation environment with dedicated female nursing staff and calming amenities.",
    image: "/images/doctor/assets/clinic-consultation.jpg",
  },
  {
    id: "gal-3",
    category: "hospital",
    categoryLabel: "Hospital & Facilities",
    title: "Marengo CIMS Hospital Reception & Lounge",
    description: "Modern hospital reception, fast-track registration, and dedicated patient assistance desk.",
    image: "/images/doctor/assets/clinic-reception.jpg",
  },
  {
    id: "gal-4",
    category: "hospital",
    categoryLabel: "Hospital & Facilities",
    title: "Advanced Digital 3D Mammography Suite",
    description: "State-of-the-art low-dose digital mammography and stereotactic core biopsy equipment.",
    image: "/images/doctor/assets/clinic-mammography.jpg",
  },
  {
    id: "gal-5",
    category: "education",
    categoryLabel: "Medical Education",
    title: "Understanding Breast Anatomy & Warning Signs",
    description: "Visual patient education guiding early symptom recognition and benign vs malignant tissue understanding.",
    image: "/images/doctor/assets/anatomy-diagram.png",
  },
  {
    id: "gal-6",
    category: "events",
    categoryLabel: "Events & Awareness",
    title: "Pink Ribbon Screening & Health Camps",
    description: "Active community outreach, educating women on monthly self-examination and timely mammograms.",
    image: "/images/doctor/assets/early-detection-woman.png",
  },
  {
    id: "gal-7",
    category: "hospital",
    categoryLabel: "Hospital & Facilities",
    title: "Patient Recovery & Care Lounge",
    description: "Serene post-consultation lounge designed for patient comfort, privacy, and counseling.",
    image: "/images/doctor/assets/clinic-lounge.jpg",
  },
  {
    id: "gal-8",
    category: "doctor",
    categoryLabel: "Doctor & Professional",
    title: "Multidisciplinary Tumor Board Review",
    description: "Collaborative staging alongside medical oncologists and radiation specialists for personalized care.",
    image: "/images/doctor/assets/doctor-consultation-about.png",
  },
];

export default function MedicalGallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

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
    <section className="w-full py-16 lg:py-24 bg-[#FAF7F8] border-b border-[#F5E6EA]" id="medical-gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-3">
            <Camera className="w-3.5 h-3.5" />
            CLINICAL &amp; PROFESSIONAL ENVIRONMENT
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
            Medical Gallery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            A glimpse into our clinical environment, professional activities and awareness programs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All" },
            { id: "hospital", label: "Clinic" },
            { id: "events", label: "Events" },
            { id: "education", label: "Awareness" },
            { id: "doctor", label: "OT / In-Action" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as GalleryCategory)}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-[#88213B] text-white shadow-sm"
                  : "bg-white text-slate-700 border border-[#EED7DC] hover:bg-[#FAF0F3] hover:text-[#88213B]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento Grid / Masonry Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-white rounded-2xl border border-[#F0D5DC] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D84C70] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full bg-[#FFF8F9] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-[#88213B]" />
                </div>
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                  {item.categoryLabel}
                </span>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-serif text-xs sm:text-sm font-bold truncate drop-shadow">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Medical Privacy Notice */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Patient privacy is strictly preserved. All visuals reflect clinical education, public events, and facilities.</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

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
                {filteredItems[activeLightboxIndex].categoryLabel}
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">
                {filteredItems[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {filteredItems[activeLightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
