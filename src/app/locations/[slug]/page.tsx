import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import TrustStrip from "@/components/doctor/TrustStrip";
import HospitalAffiliationBanner from "@/components/doctor/HospitalAffiliationBanner";
import { getSeoPageData } from "@/data/seoKeywordMap";
import { MapPin, Phone, Calendar, Clock, ShieldCheck, CheckCircle2, ChevronRight, Award, Compass, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getSeoPageData(`locations/${slug}`);

  if (!pageData) {
    return {
      title: "Location Not Found | Dr. Noopur Patel",
    };
  }

  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    alternates: {
      canonical: `${SITE_CONFIG.url}/locations/${slug}`,
    },
    openGraph: {
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      url: `${SITE_CONFIG.url}/locations/${slug}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}/images/doctor/assets/hero-doctor.png`,
          width: 1200,
          height: 630,
          alt: pageData.h1,
        },
      ],
      type: "website",
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const pageData = getSeoPageData(`locations/${slug}`);

  if (!pageData) {
    notFound();
  }

  const location = pageData.locationDetails;

  // JSON-LD structured data for Local Medical Practice
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Noopur Patel - Breast Cancer Surgeon",
    description: pageData.metaDescription,
    url: `${SITE_CONFIG.url}/locations/${slug}`,
    telephone: SITE_CONFIG.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: location?.hospitalAddress || "Marengo CIMS Hospital, Off Science City Road, Sola",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380060",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.0768,
      longitude: 72.5085,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: location?.areaName || "Ahmedabad",
    },
    medicalSpecialty: ["Surgical Oncology", "Breast Surgery", "Oncoplastic Surgery"],
    hospitalAffiliation: {
      "@type": "Hospital",
      name: "Marengo CIMS Hospital",
      address: "Off Science City Road, Sola, Ahmedabad, Gujarat 380060",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pageData.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <DoctorNavbar />

      <main className="flex-1">
        {/* Breadcrumb Strip */}
        <div className="bg-[#FAF5F6] border-b border-[#F0DFE3] py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center text-xs text-slate-600 space-x-2">
            <Link href="/" className="hover:text-[#88213B] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-400">Locations</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#88213B] font-semibold truncate">{location?.areaName || pageData.h1}</span>
          </div>
        </div>

        {/* Location Hero */}
        <section className="relative bg-gradient-to-b from-[#FDF8F9] via-[#FAF3F5] to-white py-12 lg:py-16 border-b border-[#F5E6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Local Headline & Information */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-xs font-bold tracking-wider uppercase border border-[#F5CAD5]">
                  <MapPin className="w-3.5 h-3.5" />
                  {pageData.heroBadge}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                  {pageData.h1}
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {pageData.quickOverview}
                </p>

                {/* Local Quick Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#EED7DC] shadow-sm">
                    <HospitalAffiliationIcon />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Marengo CIMS Hospital</h4>
                      <p className="text-[11px] text-slate-600">Off Science City Road, Sola, Ahmedabad</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#EED7DC] shadow-sm">
                    <Clock className="w-5 h-5 text-[#9B2846] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">OPD Timings</h4>
                      <p className="text-[11px] text-slate-600">Mon - Sat: 10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Primary CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/appointments"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9B2846] to-[#88213B] text-white font-medium shadow-md shadow-[#9B2846]/20 hover:brightness-105 active:scale-[0.98] transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    {pageData.ctaText}
                  </Link>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hello%20Dr.%20Noopur%20Patel,%20I%20would%20like%20to%20consult%20from%20${encodeURIComponent(location?.areaName || "Ahmedabad")}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#EED7DC] text-[#88213B] font-medium hover:bg-[#FAF3F5] active:scale-[0.98] transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp Consultation
                  </a>
                </div>
              </div>

              {/* Right Column: Doctor Profile Card */}
              <div className="lg:col-span-5">
                <div className="relative bg-white rounded-2xl border border-[#F0D0D8] p-6 shadow-xl shadow-rose-900/5 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FCE8ED] to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-center gap-4 border-b border-[#F7E5EA] pb-5">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#9B2846] shrink-0 bg-rose-50">
                      <Image
                        src="/images/doctor/assets/hero-doctor.png"
                        alt="Dr. Noopur Patel - Breast Cancer Surgeon"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9B2846]">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Verified Surgical Breast Oncologist
                      </div>
                      <h3 className="text-xl font-serif font-bold text-slate-900">Dr. Noopur Patel</h3>
                      <p className="text-xs text-slate-600">MBBS, MS (General Surgery)</p>
                      <p className="text-xs font-medium text-[#88213B]">Fellowship in Breast Surgery</p>
                    </div>
                  </div>

                  <div className="py-4 space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Associate Consultant – Surgical Breast Oncology</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Dedicated Lady Doctor for Confidential Breast Checkup</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>100% Cashless Mediclaim & Corporate TPA Empaneled</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Oncoplastic Breast Preservation & Cosmetic Cancer Resection</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-4 border-t border-[#F7E5EA] bg-[#FAF3F5] -mx-6 -mb-6 p-4 text-center">
                    <p className="text-[11px] text-slate-600">
                      Practising at <span className="font-semibold text-slate-900">Marengo CIMS Hospital, Sola, Ahmedabad</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Area Accessibility & Commute Guide */}
        {location && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-bold text-[#9B2846] uppercase tracking-wider">Local Connectivity</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
                  Reaching Dr. Noopur Patel from {location.areaName}
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  {location.travelAdvice}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl border border-slate-200 bg-[#FAFBFD]">
                  <Compass className="w-6 h-6 text-[#9B2846] mb-3" />
                  <h3 className="text-base font-bold text-slate-900">Key Landmarks Nearby</h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                    {location.landmarks.map((landmark, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9B2846]" />
                        {landmark}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-[#FAFBFD]">
                  <MapPin className="w-6 h-6 text-[#9B2846] mb-3" />
                  <h3 className="text-base font-bold text-slate-900">Hospital Address</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {location.hospitalAddress}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Marengo+CIMS+Hospital+Sola+Ahmedabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#88213B] mt-3 hover:underline"
                  >
                    Open in Google Maps <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-[#FAFBFD]">
                  <Calendar className="w-6 h-6 text-[#9B2846] mb-3" />
                  <h3 className="text-base font-bold text-slate-900">Consultation Timings</h3>
                  <p className="text-xs text-slate-600 mt-2">
                    Monday to Saturday: 10:00 AM – 6:00 PM
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                    ✓ Same-day urgent slots prioritized for acute symptoms & abnormal reports
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Detailed Clinical Sections */}
        <section className="py-12 bg-[#FAF7F8] border-t border-[#F5E6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-8">
                {pageData.keySections.map((sec, idx) => (
                  <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F0D5DC] shadow-sm">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-4">
                      {sec.heading}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      {sec.content}
                    </p>
                    {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                      <ul className="mt-4 space-y-2.5">
                        {sec.bulletPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Local Area FAQs */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F0D5DC] shadow-sm">
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">
                    Frequently Asked Questions for {location?.areaName || "Ahmedabad"} Patients
                  </h3>
                  <div className="space-y-4">
                    {pageData.faqs.map((faq, fIdx) => (
                      <div key={fIdx} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                          {faq.question}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar with Related Services & Quick Booking */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-[#EED7DC] shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Core Surgical Services</h3>
                  <div className="space-y-2">
                    {pageData.relatedSlugs.map((relSlug, rIdx) => {
                      const relData = getSeoPageData(relSlug);
                      return (
                        <Link
                          key={rIdx}
                          href={`/${relSlug}`}
                          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#FAF3F5] text-xs font-medium text-slate-800 transition-colors group"
                        >
                          <span className="truncate">{relData?.h1 || relSlug}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#9B2846] transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#9B2846] to-[#7B1832] p-6 rounded-2xl text-white shadow-lg shadow-rose-900/10">
                  <h4 className="text-lg font-serif font-bold mb-2">Need an Immediate Consultation?</h4>
                  <p className="text-xs text-rose-100 mb-5 leading-relaxed">
                    Our clinical desk coordinates fast-track appointments for new breast symptoms, lump evaluations, and urgent surgical reviews.
                  </p>
                  <Link
                    href="/appointments"
                    className="block w-full py-3 text-center bg-white text-[#88213B] font-bold text-xs rounded-xl shadow-md hover:bg-rose-50 transition-colors"
                  >
                    Book Priority Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hospital Affiliation & Trust Strip */}
        <HospitalAffiliationBanner />
        <TrustStrip />
      </main>

      <DoctorFooter />
    </div>
  );
}

function HospitalAffiliationIcon() {
  return (
    <div className="w-5 h-5 rounded-full bg-[#FCE8ED] text-[#9B2846] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
      +
    </div>
  );
}
