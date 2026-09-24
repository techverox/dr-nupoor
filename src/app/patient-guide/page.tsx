import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Heart, 
  HelpCircle, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from "lucide-react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import BreastAnatomySection from "@/components/doctor/BreastAnatomySection";
import TreatmentOptionsGrid from "@/components/doctor/TreatmentOptionsGrid";
import DoctorFaqAccordion from "@/components/doctor/DoctorFaqAccordion";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import TrustStrip from "@/components/doctor/TrustStrip";
import { FAQS_DATA } from "@/data/faqs";

export const metadata = {
  title: "Patient Guide & Breast Health Education | Dr. Noopur Patel Ahmedabad",
  description:
    "Comprehensive patient guide on breast self-examination, screening recommendations, consultation preparation, and treatment pathways by Dr. Noopur Patel.",
};

export default function PatientGuidePage() {
  const selfExamSteps = [
    {
      step: 1,
      title: "Visual Inspection in the Mirror",
      desc: "Look at your breasts with arms at your sides, then hands on your hips. Note any changes in size, shape, symmetry, skin puckering, or contour.",
    },
    {
      step: 2,
      title: "Raised Arms Examination",
      desc: "Raise your arms above your head and look for the same changes as breast tissue lifts. Check if both breasts move symmetrically.",
    },
    {
      step: 3,
      title: "Gentle Palpation While Standing",
      desc: "Use the pads of your three middle fingers to feel each breast in a circular or vertical strip pattern, checking light, medium, and firm pressure.",
    },
    {
      step: 4,
      title: "Nipple & Areola Check",
      desc: "Check for any spontaneous discharge, scaling, redness, or recent retraction (turning inward) of the nipple.",
    },
    {
      step: 5,
      title: "Palpation While Lying Down",
      desc: "When lying down, breast tissue spreads evenly over the chest wall, making it easier to feel deeper tissue and the axillary (armpit) area.",
    },
  ];

  const warningSigns = [
    "A new lump or thickening in the breast or underarm area",
    "Change in the size, shape, or appearance of the breast",
    "Dimpling, redness, or puckering of the skin (like orange peel)",
    "Nipple turning inward (inversion) or discharge (especially bloody or clear)",
    "Persistent, non-cyclical focal pain in one specific spot",
    "Swelling of all or part of a breast, even if no lump is felt",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full bg-gradient-to-b from-[#FFF8F9] to-white pt-8 pb-16 lg:py-20 border-b border-rose-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block">
                PATIENT RESOURCES &amp; EDUCATION
              </span>
              <h1 className="font-serif text-[42px] sm:text-[52px] font-bold text-[#1A202C] leading-tight">
                Your Complete{" "}
                <span className="italic font-serif text-[#D84C70]">
                  Breast Health Guide
                </span>
              </h1>
              <p className="text-slate-600 text-[16px] sm:text-[17px] leading-relaxed">
                Empowering women with accurate, compassionate knowledge. Learn how to perform self-examinations, recognize early signs, and prepare for your clinical consultation.
              </p>
            </div>
          </div>
        </section>

        {/* 1. BREAST SELF EXAM STEP-BY-STEP */}
        <section className="w-full py-16 lg:py-20 bg-white border-b border-rose-100/60" id="self-exam">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-1">
                AWARENESS PROTOCOL
              </span>
              <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#1A202C]">
                How to Perform a Breast Self-Exam
              </h2>
              <p className="text-slate-600 text-[15px] mt-2">
                Conducting a monthly self-exam helps you become familiar with how your breasts normally look and feel so you can notice any changes early.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {selfExamSteps.map((s) => (
                <div
                  key={s.step}
                  className="bg-[#FFF8F9] border border-[#F5D6DE] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
                >
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#D84C70] text-white text-[13px] font-bold flex items-center justify-center mb-4">
                      {s.step}
                    </div>
                    <h3 className="font-serif text-[17px] font-bold text-slate-900 mb-2">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed mt-2">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. SIGNS TO CONSULT A SURGEON */}
        <section className="w-full py-16 bg-[#FFF8F9]/40 border-b border-rose-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#D84C70] block">
                  SYMPTOM EVALUATION
                </span>
                <h2 className="font-serif text-[30px] sm:text-[36px] font-bold text-[#1A202C] leading-snug">
                  When Should You Consult a Breast Specialist?
                </h2>
                <p className="text-[14.5px] text-slate-600 leading-relaxed">
                  Remember: Most breast changes and lumps turn out to be completely benign. However, prompt evaluation by a specialist provides accurate answers and reassurance.
                </p>
                <div className="pt-3">
                  <Link
                    href="/appointments"
                    className="inline-flex items-center gap-2 bg-[#D84C70] text-white text-[14px] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#BE3A5C] transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Request Evaluation</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-3xl p-7 border border-[#F5D6DE] shadow-xs">
                <h3 className="font-serif text-[18px] font-bold text-slate-900 mb-4">
                  Signs That Merit Prompt Clinical Check-up:
                </h3>
                <div className="space-y-3">
                  {warningSigns.map((sign, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FFF8F9] border border-[#F5D6DE]/60">
                      <AlertCircle className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                      <span className="text-[13.5px] font-medium text-slate-800">
                        {sign}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. ANATOMY MODULE */}
        <BreastAnatomySection />

        {/* 4. TREATMENT OPTIONS MODULE */}
        <TreatmentOptionsGrid />

        {/* 5. FAQS ACCORDION */}
        <DoctorFaqAccordion faqs={FAQS_DATA} />

        {/* 6. HOPE CTA & TRUST STRIP */}
        <HopeCtaBanner />
        <TrustStrip />
      </main>

      <DoctorFooter />
    </div>
  );
}
