import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLandingPageByIdAdmin } from "@/lib/services/landingPageService";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionRenderer } from "@/components/landing/SectionRenderer";
import {
  ArrowLeft,
  Zap,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminLandingPagePreview({ params }: PreviewPageProps) {
  const resolvedParams = await params;
  const page = await getLandingPageByIdAdmin(resolvedParams.id);

  if (!page) {
    notFound();
  }

  const isPublished = page.status === "published";
  const hasSections = Array.isArray(page.sections) && page.sections.length > 0;
  const hasFormSection = hasSections && page.sections.some((s) => s.type === "form" && s.isVisible);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Sticky Admin Preview Banner */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-slate-800 px-4 sm:px-6 py-2.5 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 tracking-wide uppercase text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Preview (Admin)
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-500">
              Status:{" "}
              <strong className={isPublished ? "text-emerald-700 font-semibold" : "text-amber-700 font-semibold"}>
                {isPublished ? "PUBLISHED" : "DRAFT"}
              </strong>
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-500">
              Slug: <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">/landing/{page.slug}</code>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/landing-pages/${page.id}/builder`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors shadow-sm"
            >
              <Zap className="w-3.5 h-3.5" />
              Visual Builder
            </Link>

            <Link
              href="/admin/landing-pages"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Exit Preview
            </Link>

            {isPublished && (
              <Link
                href={`/landing/${page.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors font-medium"
              >
                <span>Live Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 1. If page has sections, render via SectionRenderer */}
      {hasSections ? (
        <div>
          {page.sections.map((section) => (
            <SectionRenderer key={section.id} section={section} isBuilder={false} />
          ))}
        </div>
      ) : (
        /* Fallback for legacy pages without sections */
        <section className="bg-white text-slate-900 py-20 px-4 border-b border-slate-200">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              {page.title}
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {page.seo?.metaDescription || "Expert Breast Care & Surgical Oncology with Dr. Noopur Patel at Marengo CIMS Hospital."}
            </p>
            <a
              href={page.cta?.primaryCtaTarget || "#lead-form"}
              className="inline-block px-6 py-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors shadow-sm"
            >
              {page.cta?.primaryCtaLabel || "Book Consultation"}
            </a>
          </div>
        </section>
      )}

      {/* 2. Fallback lead form if no in-page form was configured */}
      {!hasFormSection && (
        <section id="lead-form" className="py-20 px-4 bg-slate-50 border-t border-slate-200">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                {page.form?.formTitle || "Book OPD Consultation"}
              </h2>
              {page.form?.formSubtitle && (
                <p className="text-slate-600 text-sm">{page.form.formSubtitle}</p>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <ContactForm
                source="landing_page"
                formType={page.form?.leadSourceTag || `landing-page:${page.slug}`}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
