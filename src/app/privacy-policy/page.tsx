import React from "react";
import type { Metadata } from "next";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import { ShieldCheck, Lock, EyeOff, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Noopur Patel Breast Care Clinic",
  description:
    "Patient data privacy policy for Dr. Noopur Patel's clinical website. Zero commercial data selling, secure contact handling, and strict medical confidentiality.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#FFF8F9] border border-[#F5D6DE] rounded-3xl p-8 sm:p-12 space-y-8 shadow-xs">
            
            <div className="flex items-center gap-3 text-[#D84C70]">
              <Lock className="w-8 h-8 flex-shrink-0" />
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase block text-[#D84C70]">
                  CONFIDENTIALITY &amp; TRUST
                </span>
                <h1 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#1A202C]">
                  Patient Privacy Policy
                </h1>
              </div>
            </div>

            <p className="text-[15px] text-slate-600 leading-relaxed">
              Dr. Noopur Patel and her clinical care team at Marengo CIMS Hospital are deeply committed to safeguarding the privacy and confidentiality of every patient and visitor. This policy explains how information submitted through this website is handled.
            </p>

            <div className="space-y-6 text-slate-700 text-[15px] leading-relaxed">
              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  1. Information We Collect
                </h2>
                <p>
                  We collect only the minimum necessary contact information submitted voluntarily through our appointment request or inquiry forms (such as your full name, phone number, email address, preferred appointment time, and general reason for consultation). We do not collect or store full medical histories or diagnostic records through public web forms.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  2. Use of Information
                </h2>
                <p>
                  Any contact information you provide is used exclusively to contact you regarding your appointment request, answer clinical inquiries, coordinate hospital consultation slots, or provide directions to the clinic.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  3. Strict Non-Disclosure &amp; No Commercial Selling
                </h2>
                <p>
                  We never sell, lease, trade, or distribute your personal or contact information to third-party marketers, advertisers, or commercial entities under any circumstance. Your information remains strictly confidential within Dr. Noopur Patel&apos;s authorized clinical practice and hospital coordination team.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-[20px] font-bold text-[#1A202C]">
                  4. Data Security
                </h2>
                <p>
                  All web traffic and form submissions are encrypted via secure transport protocols (HTTPS/TLS). Access to consultation inquiries is restricted exclusively to authorized clinical personnel.
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
