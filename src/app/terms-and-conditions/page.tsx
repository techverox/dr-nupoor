import React from "react";
import type { Metadata } from "next";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import { FileText, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Dr. Noopur Patel Breast Care Clinic",
  description:
    "Website terms and conditions governing the informational and appointment routing services for Dr. Noopur Patel.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#FFF8F9] border border-[#F5D6DE] rounded-3xl p-8 sm:p-12 space-y-8 shadow-xs">
            
            <div className="flex items-center gap-3 text-[#D84C70]">
              <FileText className="w-8 h-8 flex-shrink-0" />
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase block text-[#D84C70]">
                  LEGAL FRAMEWORK
                </span>
                <h1 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#1A202C]">
                  Terms &amp; Conditions
                </h1>
              </div>
            </div>

            <p className="text-[15px] text-slate-600 leading-relaxed">
              Welcome to the official professional website of Dr. Noopur Patel (Associate Consultant in Surgical Breast Oncology, Marengo CIMS Hospital, Ahmedabad). By accessing or using this website, you agree to these Terms and Conditions.
            </p>

            <div className="space-y-6 text-slate-700 text-[15px] leading-relaxed">
              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  1. Website Use &amp; Educational Purpose
                </h2>
                <p>
                  This website is provided for informational and educational guidance regarding breast health, surgical oncology, and consultation scheduling. Information presented on this website does not constitute direct medical advice or formal medical diagnosis.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  2. Consultation Requests &amp; Confirmations
                </h2>
                <p>
                  Submitting an appointment request through our online form or WhatsApp channel indicates a preferred time slot, which is subject to confirmation by our hospital clinical coordination team. While we strive to accommodate your chosen timing, hospital schedules and surgical procedures may require slot adjustments.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  3. Intellectual Property
                </h2>
                <p>
                  All content, text, photographic assets, custom graphics, and anatomical illustrations displayed on this website are protected by applicable intellectual property and copyright laws. Reproduction without prior written consent is strictly prohibited.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  4. Governing Law &amp; Jurisdiction
                </h2>
                <p>
                  Any disputes arising out of or related to the use of this website shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Ahmedabad, Gujarat.
                </p>
              </section>
            </div>

          </div>

        </div>
      </main>

      <DoctorFooter />
    </div>
  );
}
