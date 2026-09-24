import React from "react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import DoctorFaqAccordion from "@/components/doctor/DoctorFaqAccordion";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import TrustStrip from "@/components/doctor/TrustStrip";
import { getCmsFaqs } from "@/lib/services/cmsService";
import { FAQS_DATA } from "@/data/faqs";

export const metadata = {
  title: "Frequently Asked Questions | Dr. Noopur Patel Ahmedabad",
  description:
    "Common patient questions regarding breast cancer screening, symptoms, surgical recovery, oncoplastic techniques, and consultations with Dr. Noopur Patel.",
};

export default async function FaqPage() {
  let faqs = FAQS_DATA;
  try {
    const fetched = await getCmsFaqs().catch(() => FAQS_DATA);
    if (fetched && fetched.length > 0) faqs = fetched;
  } catch {}

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative w-full bg-gradient-to-b from-[#FFF8F9] to-white pt-8 pb-14 border-b border-rose-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block">
                PATIENT QUESTIONS &amp; ANSWERS
              </span>
              <h1 className="font-serif text-[40px] sm:text-[50px] font-bold text-[#1A202C] leading-tight">
                Clear Answers for Your{" "}
                <span className="italic font-serif text-[#D84C70]">
                  Peace of Mind
                </span>
              </h1>
              <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
                Find answers to common questions about breast screening, diagnosis, oncoplastic surgical techniques, and recovery timelines.
              </p>
            </div>
          </div>
        </section>

        {/* FAQS ACCORDION */}
        <DoctorFaqAccordion faqs={faqs} />

        {/* HOPE CTA & TRUST STRIP */}
        <HopeCtaBanner />
        <TrustStrip />
      </main>

      <DoctorFooter />
    </div>
  );
}
