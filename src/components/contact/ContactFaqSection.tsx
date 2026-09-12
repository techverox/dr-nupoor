"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
}

const CONTACT_FAQS: ContactFaqItem[] = [
  {
    id: "faq-prep",
    question: "What should I prepare before our 30-minute consultation?",
    answer:
      "Just your primary growth bottleneck or objective. If you manage active ad campaigns, having read-only access ready allows our directors to provide live diagnostic feedback during our screen-share.",
  },
  {
    id: "faq-nda",
    question: "How does NDA and data confidentiality work?",
    answer:
      "Every consultation is strictly confidential under mutual non-disclosure. We never disclose your benchmarks or proprietary data. If your team requires a custom NDA, we countersign within 2 business hours.",
  },
  {
    id: "faq-pricing",
    question: "What are your pricing tiers and commitments?",
    answer:
      "Modular SaaS licenses for RestroMitra, verified merchant tiers for Maru Gujarat, and growth retainers starting from $1,500/mo. All proposals outline exact deliverables and performance milestones with zero hidden fees.",
  },
  {
    id: "faq-onboarding",
    question: "How quickly can DigiVigee onboard us?",
    answer:
      "RestroMitra and Maru Gujarat onboarding completes within 24–48 hours. Full-scale Meta Partner retainers deploy in 3–5 business days including CAPI verification and account audits.",
  },
  {
    id: "faq-team",
    question: "Will I work with senior directors or junior reps?",
    answer:
      "100% direct senior access. Consultations, ad architecture, and deployments are managed by senior strategy directors and certified Meta media buyers. We never outsource to junior contractors.",
  },
];

export default function ContactFaqSection() {
  const [openId, setOpenId] = useState<string | null>(CONTACT_FAQS[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Google FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONTACT_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const whatsappUrl = "https://wa.me/919081145178?text=Hi%20DigiVigee%20team,%20I%20have%20a%20question%20before%20scheduling%20a%20consultation.";

  return (
    <section className="relative z-10 py-14 sm:py-20 bg-white border-t border-slate-200/80">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Section Intro & Direct Help Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-semibold uppercase tracking-wider mb-3">
                <HelpCircle className="w-3 h-3" />
                <span>Consultation Clarity</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0C1628] tracking-tight mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear, transparent answers about our consultative protocol, deliverables, NDA confidentiality, and turnaround SLAs.
              </p>
            </div>

            {/* Direct Assistance Card */}
            <div className="rounded-2xl p-6 bg-slate-50/90 border border-slate-200/90 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#008744]">
                  Need Immediate Clarity?
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0C1628]">
                Prefer talking directly to a senior strategist right now?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Skip the form and chat with our directors on WhatsApp or call our priority desk directly.
              </p>
              <div className="space-y-2 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#008744] hover:bg-[#007038] text-white text-xs font-semibold flex items-center justify-between shadow-xs transition-colors"
                >
                  <span>Chat on WhatsApp (Avg 5 mins)</span>
                  <span>&rarr;</span>
                </a>
                <a
                  href="tel:+919081145178"
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-between transition-colors"
                >
                  <span>Call +91 90811 45178</span>
                  <span className="text-slate-400 font-normal">24/7 Available</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {CONTACT_FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-slate-50/90 border-emerald-500/40 shadow-xs"
                      : "bg-white border-slate-200/90 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${
                        isOpen ? "text-[#008744]" : "text-[#0C1628]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "rotate-180 bg-[#008744] text-white"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] },
                          opacity: { duration: 0.15 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 sm:px-5 pt-0.5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
