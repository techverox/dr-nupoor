"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { FAQItem } from "@/types";

interface DoctorFaqAccordionProps {
  faqs: FAQItem[];
}

export default function DoctorFaqAccordion({ faqs }: DoctorFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs = [
    {
      question: "When should I get a breast cancer screening?",
      answer:
        "Annual mammography screening is generally recommended starting at age 40, or earlier if you have a family history or specific genetic risk factors. Regular clinical examinations and breast awareness are vital for women of all ages.",
    },
    {
      question: "Is a lump always cancerous?",
      answer:
        "No. In fact, more than 80% of breast lumps turn out to be benign (non-cancerous), such as fibroadenomas or fluid-filled cysts. However, any new or changing lump should be promptly evaluated by a breast specialist.",
    },
    {
      question: "What is oncoplastic breast surgery?",
      answer:
        "Oncoplastic breast surgery combines the principles of surgical cancer removal (oncology) with plastic surgery techniques to preserve or reconstruct the natural shape and symmetry of the breast while ensuring complete tumor clearance.",
    },
    {
      question: "How long is the recovery after surgery?",
      answer:
        "Recovery varies based on the specific procedure. For breast-conserving surgery (lumpectomy), most patients resume light activities within 1 to 2 weeks. Reconstructive procedures may require 3 to 6 weeks for complete healing.",
    },
    {
      question: "Do you offer genetic counselling?",
      answer:
        "Yes. We guide patients with a significant family history of breast or ovarian cancer regarding BRCA gene testing and personalized risk reduction strategies.",
    },
  ];

  const displayFaqs = faqs && faqs.length > 0 ? faqs.slice(0, 5) : defaultFaqs;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60" id="faqs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Heading & Button */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block">
              FREQUENT QUESTIONS
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1A202C] leading-tight">
              You Ask, We Answer
            </h2>
            <p className="text-slate-600 text-[14.5px] sm:text-[15.5px] leading-relaxed">
              Clear answers to common questions about breast health, procedures and recovery.
            </p>
            <div className="pt-3">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-[#FFF8F9] hover:bg-[#FDF2F4] transition-all shadow-xs"
              >
                <span>View All FAQs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion List (Exact Match from Screenshot) */}
          <div className="lg:col-span-8 space-y-3">
            {displayFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#F5D6DE] rounded-xl overflow-hidden bg-white transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#FFF8F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D84C70] transition-colors gap-4"
                  >
                    <span className="font-serif text-[16px] sm:text-[17px] font-bold text-[#1A202C]">
                      {faq.question}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] flex items-center justify-center flex-shrink-0 text-[#D84C70]">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      className="px-5 pb-5 pt-1 text-[14px] text-slate-600 leading-relaxed border-t border-[#F5D6DE]/40 bg-[#FFF8F9]/30"
                    >
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
