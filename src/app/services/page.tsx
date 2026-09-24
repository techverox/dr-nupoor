import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Ribbon, 
  Heart, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  MessageCircle, 
  ArrowRight,
  ChevronRight
} from "lucide-react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import BreastAnatomySection from "@/components/doctor/BreastAnatomySection";
import TreatmentOptionsGrid from "@/components/doctor/TreatmentOptionsGrid";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import TrustStrip from "@/components/doctor/TrustStrip";
import { getCmsServices } from "@/lib/services/cmsService";
import { SERVICES_DATA } from "@/data/services";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Specialised Breast Surgery & Oncology Services | Dr. Noopur Patel Ahmedabad",
  description:
    "Comprehensive surgical breast care: Breast Cancer Surgery, Oncoplastic Breast Surgery, BCS Lumpectomy, Reconstruction, and Benign Breast Diseases by Dr. Noopur Patel.",
};

export default async function ServicesPage() {
  let services = SERVICES_DATA;
  try {
    const fetched = await getCmsServices().catch(() => SERVICES_DATA);
    if (fetched && fetched.length > 0) services = fetched;
  } catch (err) {
    console.warn("[ServicesPage] Using resilient clinical seed data:", err);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative w-full bg-gradient-to-b from-[#FFF8F9] to-white pt-8 pb-16 lg:py-20 border-b border-rose-100/60 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block">
                CLINICAL EXPERTISE &amp; PROCEDURES
              </span>
              <h1 className="font-serif text-[42px] sm:text-[54px] font-bold text-[#1A202C] leading-tight">
                Comprehensive Breast Care{" "}
                <span className="italic font-serif text-[#D84C70]">
                  Under One Roof
                </span>
              </h1>
              <p className="text-slate-600 text-[16px] sm:text-[17px] leading-relaxed">
                From precision screening and benign lump management to advanced oncoplastic cancer excision and breast reconstruction. Dr. Noopur Patel provides individualized, evidence-based surgical oncology care.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/appointments"
                  className="inline-flex items-center gap-2 bg-[#D84C70] hover:bg-[#BE3A5C] text-white text-[14.5px] font-semibold px-7 py-3.5 rounded-full shadow-md transition-all active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#D84C70] text-[#D84C70] hover:bg-[#FDF2F4] text-[14.5px] font-semibold px-6 py-3.5 rounded-full transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Enquiries</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ALL 6 DETAILED SERVICES */}
        <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {services.map((service, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center p-8 sm:p-10 rounded-3xl bg-[#FFF8F9]/40 border border-[#F5D6DE] ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Photo Column */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden border border-[#F5D6DE] shadow-xs bg-slate-100">
                      <Image
                        src={service.icon || `/images/doctor/assets/service-${(index % 6) + 1}.png`}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 450px"
                      />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#F5D6DE] text-[11.5px] font-bold text-[#D84C70] uppercase">
                      Clinical Focus #{index + 1}
                    </div>

                    <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#1A202C] leading-snug">
                      {service.title}
                    </h2>

                    <p className="text-[#D84C70] font-medium text-[14px]">
                      {service.subtitle}
                    </p>

                    <p className="text-slate-600 text-[14.5px] leading-relaxed">
                      {service.detailedDescription || service.shortDescription}
                    </p>

                    {service.capabilities && service.capabilities.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[13px] font-bold text-slate-800 block mb-2">
                          Key Clinical Capabilities:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.capabilities.map((cap, cIdx) => (
                            <div key={cIdx} className="flex items-start gap-2 text-[12.5px] text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#D84C70] flex-shrink-0 mt-0.5" />
                              <span>
                                <strong className="text-slate-900">{cap.title}:</strong> {cap.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <Link
                        href="/appointments"
                        className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-bold"
                      >
                        <span>Schedule Consultation for {service.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. BREAST ANATOMY MODULE */}
        <BreastAnatomySection />

        {/* 4. TREATMENT OPTIONS MODULE */}
        <TreatmentOptionsGrid />

        {/* 5. HOPE CTA & FOOTER */}
        <HopeCtaBanner />
        <TrustStrip />
      </main>

      <DoctorFooter />
    </div>
  );
}
