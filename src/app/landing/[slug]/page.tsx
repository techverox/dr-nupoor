import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedLandingPageBySlug } from "@/lib/services/landingPageService";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";
import { SectionRenderer } from "@/components/landing/SectionRenderer";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_CONFIG } from "@/config/site";
import { Phone, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import GlobalSpotlightGrid from "@/components/GlobalSpotlightGrid";

export const dynamic = "force-dynamic";

interface LandingPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Dynamic SEO & OpenGraph Metadata Resolver for Published Landing Pages.
 * Automatically synchronizes with the Visual Builder's SEO settings and Firestore.
 */
export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedLandingPageBySlug(slug);

  if (!page || page.status !== "published") {
    return {
      title: "Page Not Found | Dr. Noopur Patel",
      robots: { index: false, follow: false },
    };
  }

  const defaultTitle = page.seo?.seoTitle?.trim() || `${page.title} | Dr. Noopur Patel`;
  const defaultDescription =
    page.seo?.metaDescription?.trim() ||
    `Discover ${page.title}. Specialized breast surgery and oncoplastic care by Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad.`;

  return await resolveDynamicPageMetadata(`/landing/${page.slug}`, {
    title: defaultTitle,
    description: defaultDescription,
    path: `/landing/${page.slug}`,
    keywords: page.seo?.keywords || [],
    ogImage: page.seo?.ogImage,
    noIndex: page.seo?.noIndex || false,
  });
}

/**
 * Public Dynamic Landing Page Route.
 * Renders sections created in the Visual Builder, with live form submission and SEO schema.
 */
export default async function PublicLandingPage({ params }: LandingPageProps) {
  const { slug } = await params;
  const page = await getPublishedLandingPageBySlug(slug);

  // Strictly prevent draft or non-existent pages from being viewed publicly
  if (!page || page.status !== "published") {
    notFound();
  }

  const sortedSections = Array.isArray(page.sections)
    ? [...page.sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];

  const hasFormSection = sortedSections.some(
    (s) => s.type === "form" && s.isVisible !== false
  );

  // Construct JSON-LD Structured Data Schema for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.seo?.seoTitle || page.title,
    description: page.seo?.metaDescription || page.title,
    url: `${SITE_CONFIG.url}/landing/${page.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/doctor/assets/logo.png`,
      },
    },
  };

  const primaryCtaTarget = page.cta?.primaryCtaTarget || "#lead-form";
  const primaryCtaLabel = page.cta?.primaryCtaLabel || "Get Free Proposal";

  const pageBg = page.theme?.pageBackground || "#F8FAFC";
  const isDark = pageBg.startsWith("#0") || pageBg.startsWith("#1") || pageBg.includes("gradient");

  return (
    <div
      className={`min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900 ${
        isDark ? "text-slate-100" : "text-slate-900"
      }`}
      style={{
        background: pageBg,
      }}
    >
      {page.theme?.showAmbientGrid !== false &&
        (!page.theme?.pageBackground || page.theme.pageBackground === "#F8FAFC") && (
          <GlobalSpotlightGrid />
        )}
      {/* Inject Search Engine JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Conversion-Focused Quiet Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Dr. Noopur Patel — Home">
            <Image
              src="/images/doctor/assets/logo.png"
              alt="Dr. Noopur Patel"
              width={160}
              height={48}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {SITE_CONFIG.contact.phone && (
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </a>
            )}

            <a
              href={primaryCtaTarget}
              className="inline-flex items-center gap-2 px-4.5 py-2 text-xs sm:text-sm font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95"
            >
              <span>{primaryCtaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>
        </div>
      </header>

      {/* 2. Visual Builder Rendered Sections */}
      <main className="flex-1">
        {sortedSections.length > 0 ? (
          <div>
            {sortedSections.map((section) => (
              <SectionRenderer
                key={section.id}
                section={section}
                isBuilder={false}
              />
            ))}
          </div>
        ) : (
          /* Clean Fallback if page has no custom sections configured yet */
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-emerald-500/10 via-transparent to-transparent opacity-50" />
            <div className="max-w-3xl mx-auto relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-500/20">
                Verified Campaign Offer
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-6 leading-tight">
                {page.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                {page.seo?.metaDescription ||
                  "Consult with Dr. Noopur Patel for specialized surgical breast oncology, oncoplastic care, and dedicated survivorship support."}
              </p>
              <a
                href={primaryCtaTarget}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all active:scale-95"
              >
                <span>{primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>
        )}

        {/* 3. Automatic Bottom Lead Form (Rendered if no form section is inside the builder) */}
        {!hasFormSection && (
          <section
            id="lead-form"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-t border-slate-200/80"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                  Direct Agency Access
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-3 mb-2 tracking-tight">
                  {page.form?.formTitle || "Schedule Your Strategic Consultation"}
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {page.form?.formSubtitle ||
                    "Fill in your details below. An agency growth director will review your metrics and respond within 2 business hours."}
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl shadow-slate-200/60">
                <ContactForm
                  source="landing_page"
                  formType={page.form?.leadSourceTag || `landing-page:${page.slug}`}
                />
              </div>

              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>256-Bit Encrypted Data</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strict NDA Protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Spam Policy</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 4. High-Trust Conversion Footer */}
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white tracking-tight">DR. NOOPUR PATEL</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} Dr. Noopur Patel. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors font-semibold"
            >
              Visit DigiVigee Home →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
