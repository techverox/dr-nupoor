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
import {
  Calendar,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Sparkles,
  CreditCard,
  HelpCircle,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getSeoPageData(slug);

  if (!pageData) {
    return {
      title: "Page Not Found | Dr. Noopur Patel",
    };
  }

  const canonicalUrl = `${SITE_CONFIG.url}/${pageData.slug}`;

  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: [pageData.targetKeyword, ...pageData.secondaryKeywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      url: canonicalUrl,
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
    twitter: {
      card: "summary_large_image",
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      images: [`${SITE_CONFIG.url}/images/doctor/assets/hero-doctor.png`],
    },
  };
}

export default async function SeoProcedurePage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = getSeoPageData(slug);

  // If this slug isn't an SEO landing page or is a location/blog, defer or 404
  if (!pageData || pageData.isLocationPage || slug === "home" || slug === "") {
    notFound();
  }

  const canonicalUrl = `${SITE_CONFIG.url}/${pageData.slug}`;

  // Structured Data Schema for Search Engines
  const procedureSchema = {
    "@context": "https://schema.org",
    "@type": pageData.schemaType === "MedicalProcedure" ? "MedicalProcedure" : "Physician",
    name: pageData.h1,
    description: pageData.metaDescription,
    url: canonicalUrl,
    provider: {
      "@type": "Physician",
      name: "Dr. Noopur Patel",
      jobTitle: "Associate Consultant – Surgical Breast Oncology",
      worksFor: {
        "@type": "Hospital",
        name: "Marengo CIMS Hospital",
        address: "Off Science City Road, Sola, Ahmedabad, Gujarat 380060",
      },
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageData.silo,
        item: `${SITE_CONFIG.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageData.h1,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <DoctorNavbar />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-[#FAF5F6] border-b border-[#F0DFE3] py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center text-xs text-slate-600 space-x-2">
            <Link href="/" className="hover:text-[#88213B] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-500">{pageData.silo}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#88213B] font-semibold truncate">{pageData.h1}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#FDF8F9] via-[#FAF3F5] to-white py-12 lg:py-16 border-b border-[#F5E6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Title, Subtitle, Bullet Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8ED] text-[#88213B] text-xs font-bold tracking-wider uppercase border border-[#F5CAD5]">
                  <Sparkles className="w-3.5 h-3.5" />
                  {pageData.heroBadge}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                  {pageData.h1}
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {pageData.quickOverview}
                </p>

                {/* Surgeon Credentials & Practice Strip */}
                <div className="p-4 rounded-xl bg-white border border-[#EED7DC] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FCE8ED] text-[#9B2846] flex items-center justify-center shrink-0">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Dr. Noopur Patel</div>
                      <div className="text-[11px] text-slate-600">MBBS, MS, Fellowship in Breast Surgery</div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
                    <div className="text-xs font-bold text-slate-900">Marengo CIMS Hospital</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">Sola, Ahmedabad · Cashless TPA</div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/appointments"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9B2846] to-[#88213B] text-white font-medium shadow-md shadow-[#9B2846]/20 hover:brightness-105 active:scale-[0.98] transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    {pageData.ctaText}
                  </Link>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=Hello%20Dr.%20Noopur%20Patel,%20I%20am%20inquiring%20about%20${encodeURIComponent(pageData.h1)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#EED7DC] text-[#88213B] font-medium hover:bg-[#FAF3F5] active:scale-[0.98] transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Consult on WhatsApp
                  </a>
                </div>
              </div>

              {/* Right Column: Doctor Spotlight Card */}
              <div className="lg:col-span-5">
                <div className="relative bg-white rounded-2xl border border-[#F0D0D8] p-6 shadow-xl shadow-rose-900/5 overflow-hidden">
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
                      <p className="text-xs text-slate-600">Associate Consultant – Surgical Oncology</p>
                      <p className="text-xs font-medium text-[#88213B]">Marengo CIMS Hospital, Ahmedabad</p>
                    </div>
                  </div>

                  <div className="py-4 space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Fellowship in Breast Oncology (Max Healthcare)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Dedicated Lady Doctor for Confidential Consultations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Triple Assessment with Same-Day Ultrasound & Biopsy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>100% Cashless Mediclaim & Corporate TPA Empaneled</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-4 border-t border-[#F7E5EA] bg-[#FAF3F5] -mx-6 -mb-6 p-4 text-center">
                    <p className="text-[11px] text-slate-600">
                      OPD Timings: <span className="font-semibold text-slate-900">Mon - Sat: 10:00 AM - 6:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing / Cost & Insurance Box (When applicable) */}
        {pageData.costAndInsurance && (
          <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFF8F9] to-[#FDF2F4] border border-[#F0D0D8] shadow-sm">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-3xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#9B2846] text-xs font-bold border border-[#EED7DC]">
                      <CreditCard className="w-3.5 h-3.5" />
                      Transparent Financial Guidance
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Estimated Cost & Cashless Mediclaim Information
                    </h3>
                    {pageData.costAndInsurance.indicativeRange && (
                      <div className="text-lg font-bold text-[#88213B] pt-1">
                        {pageData.costAndInsurance.indicativeRange}
                      </div>
                    )}
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {pageData.costAndInsurance.tpaNotes}
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      * {pageData.costAndInsurance.disclaimer}
                    </p>
                  </div>
                  <div className="shrink-0 w-full lg:w-auto">
                    <Link
                      href="/appointments"
                      className="block text-center px-6 py-3 rounded-xl bg-[#88213B] text-white text-xs font-bold hover:bg-[#731930] transition-colors shadow"
                    >
                      Get Accurate Insurance Estimate
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Detailed Clinical Content Sections */}
        <section className="py-12 bg-[#FAF7F8] border-t border-[#F5E6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Content Area */}
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

                {/* Frequently Asked Questions */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F0D5DC] shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <HelpCircle className="w-5 h-5 text-[#9B2846]" />
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      Frequently Asked Questions
                    </h3>
                  </div>
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

              {/* Sidebar with Navigation & Quick Actions */}
              <div className="lg:col-span-4 space-y-6">
                {/* Related Procedures & Silo Navigation */}
                <div className="bg-white p-6 rounded-2xl border border-[#EED7DC] shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Related Procedures & Care</h3>
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

                {/* Local Area Service Quick Links */}
                <div className="bg-white p-6 rounded-2xl border border-[#EED7DC] shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-3">Serving Across Ahmedabad</h3>
                  <p className="text-xs text-slate-600 mb-3">
                    Consultations easily accessible for residents across Western & Eastern Ahmedabad:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: "SG Highway", slug: "locations/sg-highway-breast-surgeon" },
                      { name: "Sola / Science City", slug: "locations/sola-science-city-breast-surgeon" },
                      { name: "Shyamal / Satellite", slug: "locations/shyamal-satellite-breast-clinic" },
                      { name: "Navrangpura", slug: "locations/navrangpura-breast-specialist" },
                      { name: "Maninagar", slug: "locations/maninagar-breast-doctor" },
                    ].map((loc, lIdx) => (
                      <Link
                        key={lIdx}
                        href={`/${loc.slug}`}
                        className="px-2.5 py-1 text-[11px] rounded-md bg-[#FAF3F5] text-[#88213B] hover:bg-[#FCE8ED] font-medium border border-[#F0D5DC] transition-colors"
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Consultation Card */}
                <div className="bg-gradient-to-br from-[#9B2846] to-[#7B1832] p-6 rounded-2xl text-white shadow-lg shadow-rose-900/10">
                  <h4 className="text-lg font-serif font-bold mb-2">Book a Priority Consultation</h4>
                  <p className="text-xs text-rose-100 mb-5 leading-relaxed">
                    Have an abnormal screening report or newly detected lump? Speak with Dr. Noopur Patel for confidential guidance.
                  </p>
                  <Link
                    href="/appointments"
                    className="block w-full py-3 text-center bg-white text-[#88213B] font-bold text-xs rounded-xl shadow-md hover:bg-rose-50 transition-colors"
                  >
                    Schedule Consultation
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
