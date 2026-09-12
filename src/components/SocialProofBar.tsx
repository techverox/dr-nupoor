"use client";

import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function SocialProofBar() {
  const partners = [
    {
      name: "Meta Business Partner",
      tag: "Marketing API Verified",
      icon: (
        <svg className="w-5 h-5 text-[#0081fb] fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "Google Premier Partner",
      tag: "Ads & GA4 Certified",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
      ),
    },
    {
      name: "Stripe Verified",
      tag: "Automated Agency Billing",
      icon: (
        <svg className="w-5 h-5 text-[#635BFF] fill-current" viewBox="0 0 24 24">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.839 3.771 6.314 6.862 7.407 2.063.73 2.764 1.344 2.764 2.24 0 .984-.865 1.482-2.283 1.482-1.898 0-4.832-1.05-6.722-2.128l-.923 5.568c1.987.893 4.846 1.434 7.645 1.434 2.627 0 4.802-.686 6.326-1.954 1.637-1.354 2.453-3.238 2.453-5.543 0-5.143-3.953-6.524-7.003-7.584z"/>
        </svg>
      ),
    },
    {
      name: "TikTok For Business",
      tag: "Ad Sync & Tracking",
      icon: (
        <svg className="w-5 h-5 text-[#00f2fe] fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 003 15.66a6.34 6.34 0 0010.82 4.47 6.3 6.3 0 001.88-4.47V8.67a8.21 8.21 0 004.89 1.6V6.82a4.88 4.88 0 01-1-.13z"/>
        </svg>
      ),
    },
    {
      name: "HubSpot Certified",
      tag: "Two-Way CRM Sync",
      icon: (
        <svg className="w-5 h-5 text-[#ff7a59] fill-current" viewBox="0 0 24 24">
          <path d="M18.8 8.6V5.4c.9-.5 1.5-1.5 1.5-2.6 0-1.7-1.4-3.1-3.1-3.1s-3.1 1.4-3.1 3.1c0 1.1.6 2.1 1.5 2.6v3.2c-1.3.4-2.4 1.3-3 2.5l-6-4.7c.1-.4.2-.8.2-1.3 0-2.3-1.9-4.2-4.2-4.2S0 6.8 0 9.1c0 2.3 1.9 4.2 4.2 4.2.7 0 1.4-.2 2-.5l5.9 4.6c-.4.9-.7 1.8-.7 2.8 0 3.7 3 6.8 6.8 6.8s6.8-3 6.8-6.8c0-3.6-2.9-6.6-6.4-6.8h-.1c-.4 0-.8.1-1.2.2v-3.6c.9-.5 1.5-1.4 1.5-2.6z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn Marketing",
      tag: "B2B Lead Pipelines",
      icon: (
        <svg className="w-5 h-5 text-[#0a66c2] fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative z-20 py-10 sm:py-12 bg-[#F8FAFC] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Social Proof Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200/90 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#008744]" />
          <span className="text-[11px] sm:text-[12px] font-medium text-slate-600 tracking-wide">
            Trusted by <strong className="text-slate-900 font-bold">2,350+ fast-growing digital agencies</strong> worldwide
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#008744]"></span>
          </span>
        </div>

        {/* Verified Partner Logos Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-2">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-xs cursor-default"
            >
              <div className="flex items-center gap-2.5 z-10">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {p.icon}
                </div>
                <div className="text-left">
                  <div className="text-[12px] font-bold text-slate-900 group-hover:text-[#008744] transition-colors">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 font-mono mt-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    <span>{p.tag}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
