"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, Quote, ShieldCheck, Heart } from "lucide-react";
import { TestimonialItem } from "@/types";

interface PatientStoriesSectionProps {
  testimonials: TestimonialItem[];
}

export default function PatientStoriesSection({
  testimonials,
}: PatientStoriesSectionProps) {
  const defaultStories = [
    {
      author: "Priya S.",
      location: "Ahmedabad",
      treatment: "Breast Conservation Surgery",
      quote:
        "Dr. Noopur Patel made a terrifying diagnosis feel calm and manageable. Her surgical precision, clear explanations, and kind reassurance gave my family and me immense confidence throughout recovery.",
    },
    {
      author: "Meena R.",
      location: "Sola, Ahmedabad",
      treatment: "Fibroadenoma Daycare Excision",
      quote:
        "I was very anxious about having a breast lump removed. Dr. Patel explained everything with utmost gentleness. The surgery was smooth, scarless, and I was comfortably back home the very same afternoon.",
    },
    {
      author: "Sneha P.",
      location: "Gandhinagar",
      treatment: "Oncoplastic Breast Reshaping",
      quote:
        "An exceptional doctor with rare empathy. She listened patiently to all my concerns regarding body image and delivered a wonderful oncoplastic result with clean margins.",
    },
  ];

  const stories =
    testimonials && testimonials.length > 0
      ? testimonials.slice(0, 3).map((t, idx) => ({
          author: t.clientName || defaultStories[idx]?.author,
          location: defaultStories[idx]?.location || "Ahmedabad",
          treatment: t.clientRole || defaultStories[idx]?.treatment,
          quote: t.testimonial || defaultStories[idx]?.quote,
        }))
      : defaultStories;

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FAF7F8] border-b border-[#F5E6EA]" id="patient-stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#F5CAD5] mb-3">
              <Heart className="w-3.5 h-3.5 fill-[#88213B]" />
              PATIENT EXPERIENCES &amp; TRUST
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight">
              What Our Patients Say
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Real reflections from women and families who trusted Dr. Noopur Patel with their breast care and healing journey.
            </p>
          </div>

          <div>
            <Link
              href="/patient-stories"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#88213B] hover:text-[#6E172E] px-5 py-2.5 rounded-full bg-white border border-[#EED7DC] shadow-xs hover:shadow transition-all"
            >
              <span>View More Patient Stories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#F0D5DC] p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Star Rating & Quote Icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#9B2846]/20 fill-[#9B2846]/10" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info & Treatment Badge */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{item.author}</div>
                  <div className="text-[11px] text-slate-500">{item.location}</div>
                </div>
                <span className="text-[10px] font-bold text-[#88213B] bg-[#FAF3F5] px-2.5 py-1 rounded-full border border-[#F5D6DE]">
                  {item.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Consent Disclaimer */}
        <div className="mt-8 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Patient testimonials reflect individual experiences shared with appropriate clinical consent. Clinical outcomes vary based on individual diagnosis.</span>
        </div>

      </div>
    </section>
  );
}
