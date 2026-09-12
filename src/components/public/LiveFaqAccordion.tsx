"use client";

import React, { useState } from "react";
import { FAQItem } from "@/types";
import { HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/motion";

export interface LiveFaqAccordionProps {
  faqs: FAQItem[];
}

export default function LiveFaqAccordion({ faqs }: LiveFaqAccordionProps) {
  const publishedFaqs = faqs.filter((f) => f.isPublished !== false);
  const [openId, setOpenId] = useState<string | null>(publishedFaqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Extract unique categories
  const rawCategories = Array.from(new Set(publishedFaqs.map((f) => f.category).filter(Boolean)));
  const categories = ["ALL", ...rawCategories];

  const filteredFaqs = activeCategory === "ALL"
    ? publishedFaqs
    : publishedFaqs.filter((f) => f.category === activeCategory);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Google FAQ Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": publishedFaqs.slice(0, 10).map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with FadeIn */}
        <FadeIn direction="up" distance={20} duration={0.6}>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.08em] mb-3">
              <HelpCircle className="w-3 h-3 text-[#009669]" />
              <span>Clear Answers. Zero Guesswork.</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-[-0.03em] text-[#0C1628] leading-[1.15] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#3E4D64] font-normal leading-relaxed">
              Everything you need to know about our retainer governance, ROI telemetry, onboarding timeline, and pod allocations.
            </p>
          </div>
        </FadeIn>

        {/* Category Pills */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#0C1628] text-white shadow-2xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Accordion Container with Smooth Height Animation */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#F8FAFC] border-emerald-500/40 shadow-2xs"
                    : "bg-white border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-[15.5px] font-bold text-[#0C1628] tracking-tight leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-emerald-500/15 text-emerald-700 rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="faq-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-[13.5px] leading-relaxed border-t border-slate-200/50 mt-0.5">
                        <p className="whitespace-pre-line">{faq.answer}</p>
                        {faq.category && (
                          <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex items-center gap-1.5 text-[10.5px] font-semibold text-emerald-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Topic: {faq.category}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
