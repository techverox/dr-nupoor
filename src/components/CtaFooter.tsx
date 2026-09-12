"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Mail,
  Send,
} from "lucide-react";

export default function CtaFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#050608] relative overflow-hidden border-t border-white/[0.08]">
      
      {/* Final Call to Action Banner */}
      <div className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Glowing Orb Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Ready to Upgrade Your Agency Operations?
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Run Your Entire Agency From{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 glow-text-green">
              One Platform.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-400">
            Eliminate subscription sprawl, delight your clients with white-label portals, and scale your retainer revenue without adding operational chaos.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#get-started"
              className="relative group inline-flex items-center gap-2 px-9 py-4 rounded-full text-xs font-black uppercase tracking-widest text-black bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 shadow-[0_0_35px_rgba(34,197,94,0.5)] hover:shadow-[0_0_50px_rgba(34,197,94,0.75)] transition-all duration-300"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#book-demo"
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition"
            >
              Book 1-on-1 Walkthrough
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 14-Day Full Access Trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free Migration Support
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap & Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 border-t border-white/[0.06]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-[1.5px] shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                <div className="w-full h-full bg-[#090b10] rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="font-black text-xl tracking-wider text-white">
                DIGI<span className="text-emerald-400">VIGEE</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              The comprehensive operating system engineered for modern digital marketing agencies. Centralize leads, production, reporting, and client approvals in one collaborative hub.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational • 99.98% Uptime</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Platform</div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="#features" className="hover:text-emerald-400 transition">CRM & Sales</Link></li>
              <li><Link href="#features" className="hover:text-emerald-400 transition">SEO & Rank Tracking</Link></li>
              <li><Link href="#features" className="hover:text-emerald-400 transition">Social Media Publishing</Link></li>
              <li><Link href="#features" className="hover:text-emerald-400 transition">Website CMS</Link></li>
              <li><Link href="#features" className="hover:text-emerald-400 transition">Client Portals</Link></li>
              <li><Link href="#ai-copilot" className="hover:text-emerald-400 transition">AI Marketing Copilot</Link></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Solutions</div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="#workflow" className="hover:text-emerald-400 transition">For Boutique Agencies</Link></li>
              <li><Link href="#workflow" className="hover:text-emerald-400 transition">For Enterprise Agencies</Link></li>
              <li><Link href="#workflow" className="hover:text-emerald-400 transition">Performance Marketers</Link></li>
              <li><Link href="#workflow" className="hover:text-emerald-400 transition">SEO Specialists</Link></li>
              <li><Link href="#workflow" className="hover:text-emerald-400 transition">Creative Studios</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources & Newsletter */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Stay Updated</div>
            <p className="text-[11px] text-neutral-400">
              Get bi-weekly agency growth breakdowns and workflow blueprints.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agency@domain.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#0e1118] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold transition flex items-center justify-center"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-emerald-400 font-semibold">
                  ✓ You're subscribed to agency updates!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Subfooter */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} DIGIVIGEE Inc. All rights reserved. The Operating System for Modern Agencies.
          </div>
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:text-neutral-300 transition">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-neutral-300 transition">Terms of Service</Link>
            <Link href="#security" className="hover:text-neutral-300 transition">Security Overview</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
