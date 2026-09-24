import React from "react";
import Link from "next/link";
import { AlertCircle, ShieldAlert, Phone, Calendar } from "lucide-react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";

export const metadata = {
  title: "Medical Disclaimer | Dr. Noopur Patel",
  description:
    "Important clinical disclaimer regarding the educational nature of website content for Dr. Noopur Patel.",
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#FFF8F9] border border-[#F5D6DE] rounded-3xl p-8 sm:p-12 space-y-8 shadow-xs">
            
            <div className="flex items-center gap-3 text-[#D84C70]">
              <ShieldAlert className="w-8 h-8 flex-shrink-0" />
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase block text-[#D84C70]">
                  COMPLIANCE &amp; LEGAL NOTICE
                </span>
                <h1 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#1A202C]">
                  Medical Disclaimer
                </h1>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-[14.5px] leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Emergency Notice:</strong> If you are experiencing a medical emergency, severe bleeding, acute chest pain, or sudden severe symptoms, please immediately visit the nearest hospital emergency department or call local emergency services (108 / 112 in India). Do not rely on web inquiries for acute emergency care.
              </div>
            </div>

            <div className="space-y-6 text-slate-700 text-[15px] leading-relaxed">
              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  1. Educational Purpose Only
                </h2>
                <p>
                  The content provided on this website—including text, graphics, anatomical illustrations, medical procedure descriptions, FAQs, and articles—is prepared strictly for general educational and informational purposes. It is designed to assist women and families in understanding breast health, diagnostic steps, and surgical pathways.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  2. No Doctor-Patient Relationship
                </h2>
                <p>
                  Accessing, browsing, or sending a message through this website does not establish a formal doctor-patient relationship with Dr. Noopur Patel. A formal clinical relationship is established only upon in-person or official telemedicine consultation, clinical evaluation, and mutually agreed medical care documentation.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  3. Individualized Diagnosis &amp; Treatment
                </h2>
                <p>
                  Every individual patient&apos;s condition, tumor biology, medical history, and clinical stage are unique. No online information can substitute for an individualized clinical examination, digital imaging, and histopathological tissue diagnosis by a qualified medical specialist. Never disregard professional medical advice or delay seeking evaluation because of something you have read on this website.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  4. No Outcome Guarantees
                </h2>
                <p>
                  Medicine and surgical oncology involve inherent clinical complexities. Dr. Noopur Patel makes no warranties, express or implied, regarding guaranteed cure, pain-free outcomes, or specific treatment results. All surgical options and risks are discussed transparently with each patient prior to any procedure.
                </p>
              </section>
            </div>

            <div className="pt-6 border-t border-[#F5D6DE] flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 bg-[#D84C70] hover:bg-[#BE3A5C] text-white font-semibold text-[14px] px-6 py-3 rounded-full shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Consultation</span>
              </Link>

              <Link
                href="/"
                className="text-slate-600 hover:text-[#D84C70] font-medium text-[14px]"
              >
                &larr; Return to Home
              </Link>
            </div>

          </div>

        </div>
      </main>

      <DoctorFooter />
    </div>
  );
}
