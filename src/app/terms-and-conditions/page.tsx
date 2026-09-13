import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | DigiVigee Platform",
  description: "Terms and conditions governing the use of DigiVigee digital marketing services and web platforms.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080C14] text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Effective Date: September 2026 • DigiVigee Platform & Services
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-10 border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-8 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the services provided by DigiVigee (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;), you acknowledge and agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, you must refrain from using our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              2. Scope of Services
            </h2>
            <p>
              DigiVigee delivers professional digital marketing, performance advertising, search engine optimization (SEO), web application design and development, social media management, and growth consultation. Specific deliverables, scope, and retainer arrangements are governed by individual Service Level Agreements (SLAs) or master service contracts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              3. Intellectual Property Rights
            </h2>
            <p>
              All proprietary brand assets, software architecture, marketing methodologies, and website content remain the exclusive property of DigiVigee. Deliverables created specifically for a client upon complete financial remuneration are transferred in accordance with the relevant project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              4. Client Responsibilities & Ad Spend
            </h2>
            <p>
              Clients retaining performance marketing services are directly responsible for third-party media billing (e.g. Meta Ads, Google Ads). DigiVigee executes campaigns according to agreed budgets but is not liable for third-party platform policy enforcements or algorithmic fluctuations beyond reasonable agency control.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, under the jurisdiction of the courts located in Gujarat, India.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              6. Contact Information
            </h2>
            <p>
              For inquiries regarding contractual terms or service provisions:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 text-xs space-y-1 font-mono">
              <div><strong>Email:</strong> contact@digivigee.com</div>
              <div><strong>Phone:</strong> +91 90811 45178</div>
              <div><strong>Office:</strong> Orchid Complex, Chhapi, Banaskantha, Gujarat, India - 385210</div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
