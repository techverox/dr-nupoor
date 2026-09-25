"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Minus, HelpCircle } from "lucide-react";

export interface FaqItemData {
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: FaqItemData[] = [
  {
    question: "Is every breast lump cancerous?",
    answer:
      "No. Over 80% of all breast lumps evaluated clinically turn out to be completely benign (non-cancerous), such as simple fluid cysts or fibroadenomas. However, because early malignancies can feel similar to touch, every new or persistent lump must be evaluated through the Triple Assessment (clinical exam, ultrasound/mammography, and core biopsy).",
  },
  {
    question: "When should I see a breast surgeon in Ahmedabad?",
    answer:
      "You should schedule a consultation if you notice a newly discovered lump, localized breast firmness, skin dimpling or puckering, nipple retraction, spontaneous clear or bloody nipple discharge, or persistent unexplained breast pain. Regular screening checkups are also recommended annually for women aged 40 and older.",
  },
  {
    question: "What is breast conservation surgery (BCS)?",
    answer:
      "Breast Conservation Surgery (also known as lumpectomy or wide local excision) is an operation that removes only the cancerous tumor along with a safety rim of normal tissue, preserving the rest of the natural breast. Long-term international clinical trials prove that BCS followed by radiation provides the exact same overall survival as total mastectomy.",
  },
  {
    question: "When is a mastectomy recommended?",
    answer:
      "A mastectomy (complete breast tissue removal) may be recommended if the tumor is large relative to the breast size, if multiple tumor foci exist across different quadrants of the breast (multicentric cancer), if radiation therapy is contraindicated, or based on patient preference and genetic risk factors (e.g. BRCA mutations).",
  },
  {
    question: "What is a sentinel lymph node biopsy (SLNB)?",
    answer:
      "A Sentinel Lymph Node Biopsy is a targeted, minimally invasive procedure that identifies and samples only the first 1 to 3 'gatekeeper' lymph nodes draining the tumor area. If these sentinel nodes are free of cancer, removing all other underarm lymph nodes is completely avoided, protecting you from painful chronic arm swelling (lymphedema).",
  },
  {
    question: "Can a fibroadenoma require surgery?",
    answer:
      "Most small, asymptomatic fibroadenomas (<2-3 cm) confirmed benign by core needle biopsy do not require surgery and can be safely monitored with periodic ultrasounds. Surgery or scarless vacuum-assisted biopsy (VABB) is considered if the lump grows rapidly, causes physical pain, or causes persistent anxiety.",
  },
  {
    question: "How is a breast lump diagnosed accurately?",
    answer:
      "Specialists rely on the internationally recognized Triple Assessment: 1) Clinical breast examination by a surgical breast oncologist, 2) Bilateral diagnostic breast ultrasound and/or digital 3D mammogram, and 3) Image-guided Core Needle Biopsy for microscopic histopathological verification.",
  },
  {
    question: "How can I book a consultation with Dr. Noopur Patel?",
    answer:
      "You can book directly through the online appointment form on this website, call the Marengo CIMS Hospital OPD clinic desk at +91 98765 43210, or message via WhatsApp for assistance. Same-day appointments are prioritized for patients with acute symptoms or suspicious biopsy reports.",
  },
];

export interface DoctorFaqAccordionProps {
  faqs?: Array<{ question: string; answer: string }>;
}

export default function DoctorFaqAccordion({ faqs }: DoctorFaqAccordionProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const displayFaqs = faqs && faqs.length > 0 ? faqs : HOMEPAGE_FAQS;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const midpoint = Math.ceil(displayFaqs.length / 2);
  const leftFaqs = displayFaqs.slice(0, midpoint);
  const rightFaqs = displayFaqs.slice(midpoint);

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-[#F5E6EA]" id="faqs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 leading-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Quick answers to common questions about breast surgery and related care.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#88213B] hover:text-[#731930] px-5 py-2.5 rounded-full border border-[#F5CAD5] bg-white hover:bg-[#FFF5F7] transition-all shadow-xs"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2-Column Accordions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start">
          {/* Column 1 */}
          <div className="space-y-4">
            {leftFaqs.map((faq, idx) => {
              const actualIdx = idx;
              const isOpen = openIndex === actualIdx;
              return (
                <div
                  key={actualIdx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#FAF7F8] border-[#88213B]/40 shadow-xs"
                      : "bg-white border-[#F0D5DC] hover:border-[#D84C70]/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(actualIdx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#88213B] text-white"
                          : "bg-[#FAF3F5] text-[#88213B]"
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-[13px] text-slate-600 leading-relaxed border-t border-[#F0D5DC]/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {rightFaqs.map((faq, idx) => {
              const actualIdx = midpoint + idx;
              const isOpen = openIndex === actualIdx;
              return (
                <div
                  key={actualIdx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#FAF7F8] border-[#88213B]/40 shadow-xs"
                      : "bg-white border-[#F0D5DC] hover:border-[#D84C70]/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(actualIdx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#88213B] text-white"
                          : "bg-[#FAF3F5] text-[#88213B]"
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-[13px] text-slate-600 leading-relaxed border-t border-[#F0D5DC]/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
