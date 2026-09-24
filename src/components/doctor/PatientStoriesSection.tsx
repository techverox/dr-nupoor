"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Quote } from "lucide-react";
import { TestimonialItem } from "@/types";

interface PatientStoriesSectionProps {
  testimonials: TestimonialItem[];
}

export default function PatientStoriesSection({
  testimonials,
}: PatientStoriesSectionProps) {
  const defaultStories = [
    {
      avatar: "/images/doctor/assets/patient-avatar-1.png",
      quote:
        "Dr. Noopur Patel made a difficult journey feel less overwhelming. Her clarity, kindness and confidence gave me so much strength.",
      author: "Patient from Ahmedabad",
      tag: "Early Detection",
    },
    {
      avatar: "/images/doctor/assets/patient-avatar-2.png",
      quote:
        "I felt heard, supported and well cared for throughout my treatment. Highly recommend her to anyone seeking expert breast care.",
      author: "Patient from Gandhinagar",
      tag: "Benign Breast Condition",
    },
    {
      avatar: "/images/doctor/assets/patient-avatar-3.png",
      quote:
        "Excellent doctor with a very compassionate approach. She explains everything so well and makes you feel comfortable.",
      author: "Patient from Ahmedabad",
      tag: "Oncoplastic Surgery",
    },
  ];

  const stories = testimonials && testimonials.length > 0
    ? testimonials.slice(0, 3).map((t, idx) => ({
        avatar: t.clientAvatar || defaultStories[idx]?.avatar || "/images/doctor/assets/patient-avatar-1.png",
        quote: t.testimonial,
        author: t.clientName,
        tag: t.clientRole || "Verified Patient",
      }))
    : defaultStories;

  return (
    <section className="w-full py-16 lg:py-24 bg-[#FFF8F9]/50 border-b border-rose-100/60" id="patient-stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
              PATIENT STORIES
            </span>
            <h2 className="font-serif text-[32px] sm:text-[42px] font-bold text-[#1A202C] leading-tight mb-3">
              Real Experiences. Real Strength.
            </h2>
            <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
              Stories from women who trusted us with their care.
            </p>
          </div>

          <div>
            <Link
              href="/patient-stories"
              className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-white hover:bg-[#FDF2F4] transition-all shadow-xs"
            >
              <span>View More Stories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#F5D6DE] hover:border-[#D84C70] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Clinical Governance Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF0F3] text-[#D84C70] border border-[#F5D6DE]">
                    Patient Reflection
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Verified Consent
                  </span>
                </div>

                {/* Quote */}
                <p className="text-[14px] text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#F5D6DE]/60">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#F5D6DE] bg-[#FFF8F9] flex-shrink-0">
                  <Image
                    src={story.avatar}
                    alt={story.author}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div>
                  <span className="text-[13.5px] font-bold text-[#1A202C] block">
                    {story.author}
                  </span>
                  <span className="text-[11.5px] text-[#D84C70] font-medium block">
                    {story.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consent & Ethics Advisory */}
        <div className="mt-8 text-center">
          <p className="text-[11.5px] text-slate-500 max-w-xl mx-auto leading-relaxed">
            * Patient reflections are shared for supportive and educational purposes with appropriate patient consent. Every diagnosis and surgical treatment plan is individualized; outcomes vary based on medical condition.
          </p>
        </div>

      </div>
    </section>
  );
}
