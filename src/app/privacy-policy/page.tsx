import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | DigiVigee Platform",
  description: "DigiVigee's comprehensive privacy policy regarding data collection, protection, client confidentiality, and usage.",
};

export default function PrivacyPolicyPage() {
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
            <Shield className="w-3.5 h-3.5" />
            <span>Official Policy Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Last Updated: September 2026 • DigiVigee Marketing & Technology Platform
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-10 border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-8 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              1. Overview & Commitment
            </h2>
            <p>
              DigiVigee (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to safeguarding the privacy and confidentiality of our clients, website visitors, and partners. This Privacy Policy details how we collect, process, store, and protect your personal and commercial data across our digital marketing services, website portals, and consulting operations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact & Business Information:</strong> Name, professional email address, phone number, company name, and marketing requirements submitted through our contact forms, lead forms, or consultation bookings.</li>
              <li><strong>Marketing & Campaign Telemetry:</strong> Anonymized performance analytics, ad account metrics, and website conversion signals required to optimize paid media, SEO rankings, and client revenue.</li>
              <li><strong>Technical Data:</strong> IP address, device telemetry, browser type, and cookie identifiers utilized exclusively for security verification, audit logging, and platform performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              3. Purpose of Processing
            </h2>
            <p className="mb-2">We process gathered information strictly for legitimate commercial purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Delivering digital marketing campaigns, performance ad buying, and SEO optimization.</li>
              <li>Responding to business inquiries, delivering marketing proposals, and executing service agreements.</li>
              <li>Maintaining enterprise-grade security and preventing brute-force or unauthorized access.</li>
              <li>Delivering relevant industry playbooks, newsletters, and service updates (with 1-click unsubscribe).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              4. Data Protection & Security
            </h2>
            <p>
              We enforce strict administrative and technical safeguards. All data transfers are encrypted via TLS 1.3, and server databases use industry-standard encryption at rest. We never sell, lease, or monetize client data to third-party brokers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              5. Contact Us Regarding Your Privacy
            </h2>
            <p>
              If you have any questions, wish to request data erasure, or require an update to your records, please contact our data privacy officer at:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 text-xs space-y-1 font-mono">
              <div><strong>Email:</strong> contact@digivigee.com</div>
              <div><strong>Phone:</strong> +91 90811 45178</div>
              <div><strong>Address:</strong> Orchid Complex, Chhapi, Banaskantha, Gujarat, India - 385210</div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
