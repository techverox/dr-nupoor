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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sticky Admin Preview Banner */}
      <div className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-md text-white px-4 sm:px-6 py-2.5 border-b border-zinc-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 tracking-wide uppercase text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Preview (Admin)
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400">
              Status:{" "}
              <strong className={isPublished ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                {isPublished ? "PUBLISHED" : "DRAFT"}
              </strong>
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400">
              Slug: <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">/landing/{page.slug}</code>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/landing-pages/${page.id}/builder`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              Visual Builder
            </Link>

            <Link
              href="/admin/landing-pages"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Exit Preview
            </Link>

            {isPublished && (
              <Link
                href={`/landing/${page.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-emerald-400 transition-colors font-medium"
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
        <section className="bg-zinc-900 text-white py-20 px-4 border-b border-zinc-800">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              {page.title}
            </h1>
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              {page.seo?.metaDescription || "Partner with DigiVigee to accelerate your customer pipeline."}
            </p>
            <a
              href={page.cta?.primaryCtaTarget || "#lead-form"}
              className="inline-block px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
            >
              {page.cta?.primaryCtaLabel || "Get Started"}
            </a>
          </div>
        </section>
      )}

      {/* 2. Fallback lead form if no in-page form was configured */}
      {!hasFormSection && (
        <section id="lead-form" className="py-20 px-4 bg-zinc-100 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                {page.form?.formTitle || "Request Consultation"}
              </h2>
              {page.form?.formSubtitle && (
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{page.form.formSubtitle}</p>
              )}
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-md">
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
