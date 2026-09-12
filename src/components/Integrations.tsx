"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Zap } from "lucide-react";

// Official Full-Color Vector SVG Brand Logos (100% Authentic Enterprise Grade)
function BrandLogo({ id }: { id: string }) {
  switch (id) {
    case "slack":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
          <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
          <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" />
          <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
        </svg>
      );
    case "microsoft":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#F25022" d="M1 1h10v10H1z" />
          <path fill="#7FBA00" d="M13 1h10v10H13z" />
          <path fill="#00A4EF" d="M1 13h10v10H1z" />
          <path fill="#FFB900" d="M13 13h10v10H13z" />
        </svg>
      );
    case "google":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
      );
    case "adobe":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#FF0000" />
          <path fill="#FFFFFF" d="M14.5 5.5l5.2 13h-3.4l-1.9-5h-4.8l3.4-8zm-5 0L4.3 18.5h3.4l2.8-7.2 2-5.8h-3z" />
        </svg>
      );
    case "salesforce":
      return (
        <svg className="w-4.5 h-3.5 shrink-0" viewBox="0 0 24 16" fill="#00A1E0">
          <path d="M10.1 2.2c1.2-1.3 2.9-2.1 4.7-2.1 3.2 0 5.8 2.3 6.3 5.4 1.7.7 2.9 2.4 2.9 4.3 0 2.6-2.1 4.7-4.7 4.7H5.3C2.4 14.5 0 12.1 0 9.2c0-2.7 2-5 4.7-5.2 1-2.2 3.2-3.8 5.4-1.8z" />
        </svg>
      );
    case "zoom":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#2D8CFF" />
          <path fill="#FFFFFF" d="M5 8.5C5 7.67 5.67 7 6.5 7h8c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-8C5.67 17 5 16.33 5 15.5v-7zm12 2.2l3-2.1c.4-.28.9.01.9.5v5.8c0 .49-.5.78-.9.5l-3-2.1v-2.6z" />
        </svg>
      );
    case "tableau":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#E97627" d="M11.4 0v4.6h1.2V0h-1.2zm0 19.4v4.6h1.2v-4.6h-1.2z" />
          <path fill="#00A1E0" d="M0 11.4v1.2h4.6v-1.2H0zm19.4 0v1.2H24v-1.2h-4.6z" />
          <path fill="#5B6770" d="M6.1 4.7l-.8.8 3.3 3.3.8-.8-3.3-3.3zm12.6 12.6l-.8.8 3.3 3.3.8-.8-3.3-3.3z" />
          <path fill="#D83B01" d="M10.8 7.3v9.4h2.4V7.3h-2.4z" />
          <path fill="#2B579A" d="M7.3 10.8v2.4h9.4v-2.4H7.3z" />
        </svg>
      );
    case "teams":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4.5" fill="#5059C9" />
          <path fill="#FFFFFF" d="M17.5 7h-11c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zm-6 2.5h3.5v1.2h-1.1v4.8h-1.3v-4.8H11.5V9.5z" />
        </svg>
      );
    case "klaxoon":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#FF1D58" />
          <circle cx="12" cy="12" r="5" fill="#FFFFFF" />
          <circle cx="12" cy="12" r="2.5" fill="#FF1D58" />
        </svg>
      );
    case "onedrive":
      return (
        <svg className="w-4.5 h-3 shrink-0" viewBox="0 0 24 16">
          <path fill="#0078D4" d="M16.5 4.5A5.5 5.5 0 0 0 6.2 6.8 4.2 4.2 0 0 0 1.5 11a4.2 4.2 0 0 0 4.2 4.2h12.5a4.8 4.8 0 0 0 4.8-4.8 4.8 4.8 0 0 0-6.5-4.5z" />
          <path fill="#28A8EA" d="M16.5 4.5c.3 0 .6.04.9.1a4.5 4.5 0 0 1 4.1 4.4 4.8 4.8 0 0 1-4.8 4.8h-5.2a5.5 5.5 0 0 0 5-9.3z" />
        </svg>
      );
    case "tenovos":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#1C1E24" />
          <polygon points="12,4 20,18 4,18" fill="#00D2A0" />
        </svg>
      );
    case "github":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#181717">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "gmail":
      return (
        <svg className="w-4 h-3.5 shrink-0" viewBox="0 0 24 18">
          <path fill="#4285F4" d="M1.5 18h4.5V9.5L0 5v11.5c0 .83.67 1.5 1.5 1.5z" />
          <path fill="#34A853" d="M18 18h4.5c.83 0 1.5-.67 1.5-1.5V5l-6 4.5V18z" />
          <path fill="#EA4335" d="M18 5l-6 4.5L6 5V2.25L12 6.75 18 2.25V5z" />
          <path fill="#FBBC05" d="M6 5L0 0.5V5l6 4.5V5zm12 0l6-4.5V0.5L18 5v4.5z" />
        </svg>
      );
    case "gcalendar":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#FFFFFF" stroke="#4285F4" strokeWidth="1.5" />
          <rect width="24" height="6" rx="2" fill="#4285F4" />
          <text x="12" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4285F4" fontFamily="sans-serif">31</text>
        </svg>
      );
    case "outlook":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4.5" fill="#0078D4" />
          <path fill="#FFFFFF" d="M7.5 12a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zm1.8 0a1.7 1.7 0 1 1 3.4 0 1.7 1.7 0 0 1-3.4 0z" />
          <path fill="#50E6FF" opacity="0.85" d="M15 8h4v8h-4z" />
        </svg>
      );
    case "excel":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4.5" fill="#107C41" />
          <path fill="#FFFFFF" d="M6 7l3.5 5L6 17h2.2l2.3-3.7 2.3 3.7H15l-3.5-5 3.5-5h-2.2L10.5 10.7 8.2 7H6z" />
        </svg>
      );
    case "dropbox":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#0061FF">
          <path d="M6 2l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zM0 14l6 4 6-4-6-4-6 4zm24 0l-6-4-6 4 6 4 6-4zM6 19.5l6-3.8 6 3.8-6 3.8-6-3.8z" />
        </svg>
      );
    case "hubspot":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#FF7A59">
          <path d="M18.8 8.4V5.7c.6-.3 1.1-.9 1.1-1.7 0-1-.8-1.9-1.9-1.9s-1.9.8-1.9 1.9c0 .7.4 1.4 1.1 1.7v2.7c-1.3.4-2.3 1.4-2.8 2.7l-4.7-3.6c.1-.3.1-.7.1-1 0-1.8-1.5-3.3-3.3-3.3S3.1 4.7 3.1 6.5s1.5 3.3 3.3 3.3c.6 0 1.2-.2 1.7-.5l4.6 3.5c-.3.7-.4 1.5-.4 2.3 0 1.4.5 2.7 1.4 3.7l-1.8 1.8c-.3-.1-.6-.2-.9-.2-1 0-1.9.8-1.9 1.9s.8 1.9 1.9 1.9 1.9-.8 1.9-1.9c0-.3-.1-.6-.2-.9l1.8-1.8c1.1.7 2.4 1.1 3.8 1.1 3.8 0 6.8-3.1 6.8-6.8 0-3.1-2.1-5.7-5-6.5zm-1.8 9.4c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2z" />
        </svg>
      );
    case "jira":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#0052CC">
          <path d="M11.53 2c0 2.4 1.97 4.35 4.39 4.35h2.19V8.5c0 2.4 1.97 4.35 4.39 4.35V2h-10.97zm-4.39 4.35c0 2.4 1.97 4.35 4.39 4.35h2.19v2.15c0 2.4 1.97 4.35 4.39 4.35V6.35H7.14zM2.75 10.7c0 2.4 1.97 4.35 4.39 4.35h2.19v2.15c0 2.4 1.97 4.35 4.39 4.35V10.7H2.75z" />
        </svg>
      );
    case "netsuite":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#1F497D">
          <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
        </svg>
      );
    case "copilot":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="url(#copilot-g1)" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5c-.8.8-2 .8-2.8 0L7.5 13c-.8-.8-.8-2 0-2.8l2.7-2.7c.8-.8 2-.8 2.8 0l2.7 2.7c.8.8.8 2 0 2.8L13 16.5z" />
          <defs>
            <linearGradient id="copilot-g1" x1="2" y1="2" x2="22" y2="22">
              <stop stopColor="#0078D4" />
              <stop offset="0.5" stopColor="#8764B8" />
              <stop offset="1" stopColor="#E05282" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "gemini":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="url(#gemini-g1)" d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
          <defs>
            <linearGradient id="gemini-g1" x1="0" y1="0" x2="24" y2="24">
              <stop stopColor="#4285F4" />
              <stop offset="0.5" stopColor="#9B72CB" />
              <stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "claude":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#D97706">
          <path d="M12 2l2.4 5.8L20 9.2l-4.5 4.1 1.4 6.2L12 16.2 7.1 19.5l1.4-6.2L4 9.2l5.6-1.4L12 2z" />
        </svg>
      );
    case "claudecode":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#C2410C">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
        </svg>
      );
    case "mcp":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#00E05C" />
          <path fill="#0F172A" d="M7 12l3.5 3.5 6.5-7" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "meta":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#0081FB">
          <path d="M12 7.2c-2.4 0-4.4 1.4-5.6 3.4C5.1 8.6 3.1 7.2.7 7.2 0 7.2 0 7.3 0 7.3v3.7c.6 0 1.2.2 1.6.5 1 1 1.7 2.7 2.7 4.5.8 1.4 1.8 3.1 3.2 3.1 1.9 0 3.3-1.6 4.5-3.3 1.2 1.7 2.6 3.3 4.5 3.3 1.4 0 2.4-1.7 3.2-3.1 1-1.8 1.7-3.5 2.7-4.5.4-.3 1-.5 1.6-.5V7.3s0-.1-.7-.1c-2.4 0-4.4 1.4-5.6 3.4-1.3-2-3.3-3.4-5.7-3.4zm0 2.8c1.5 0 2.8 1.1 3.7 2.8-.7 1.3-1.6 2.7-2.6 3.9-.4.4-.7.7-1.1.7-.4 0-.7-.3-1.1-.7-1-1.2-1.9-2.6-2.6-3.9.9-1.7 2.2-2.8 3.7-2.8zm-7.6 1.4c.5.8 1.1 1.7 1.7 2.6-.5.7-1 1.3-1.6 1.7-.4.3-.8.4-1.2.4-.7 0-1.4-.4-1.9-1.2-.5-.8-.7-1.8-.7-2.8 0-.3.1-.5.3-.6.6-.1 1.3-.1 1.8-.1.7 0 1.2 0 1.6 0zm15.2 0c.4 0 .9 0 1.6 0 .5 0 1.2 0 1.8.1.2.1.3.3.3.6 0 1-.2 2-.7 2.8-.5.8-1.2 1.2-1.9 1.2-.4 0-.8-.1-1.2-.4-.6-.4-1.1-1-1.6-1.7.6-.9 1.2-1.8 1.7-2.6z" />
        </svg>
      );
    case "shopify":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#95BF47">
          <path d="M19.38 6.54c-.11-.27-.37-.44-.66-.44h-2.12c-.22-2.1-1.63-3.69-3.52-3.69s-3.3 1.59-3.52 3.69H7.44c-.29 0-.55.17-.66.44l-3.6 8.84c-.11.27-.08.57.08.81.16.24.43.38.72.38h16.04c.29 0 .56-.14.72-.38.16-.24.19-.54.08-.81l-3.6-8.84zM13.08 4.21c1.02 0 1.83.94 1.98 2.33h-3.96c.15-1.39.96-2.33 1.98-2.33zm1.62 10.29c-.58 0-1.07-.37-1.28-.9l-.36-.93h-.76l-.28.7c-.12.3-.39.51-.71.53-.04 0-.08 0-.12 0-.32 0-.61-.17-.76-.45-.15-.28-.13-.62.06-.88l1.7-2.33c.18-.25.48-.39.79-.39s.61.14.79.39l1.7 2.33c.27.37.2 1.01-.2 1.34-.17.13-.37.2-.57.2z" />
        </svg>
      );
    case "stripe":
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#635BFF">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.836.5 6.475.5 2.5 3.86 2.5 9.475c0 6.012 5.093 7.558 8.878 9.07 2.457.975 3.322 1.706 3.322 2.659 0 .975-.89 1.543-2.324 1.543-2.585 0-5.467-1.121-7.252-2.186l-.916 5.61C5.897 27.05 8.94 27.5 12.18 27.5c6.643 0 10.82-3.21 10.82-9.173 0-5.83-4.787-7.447-9.024-9.177z" />
        </svg>
      );
    case "figma":
      return (
        <svg className="w-3.5 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#F24E1E" d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z" />
          <path fill="#FF7262" d="M12 4a4 4 0 1 1 4 4h-4V4z" />
          <path fill="#F24E1E" d="M8 8a4 4 0 0 1 4-4v8H8a4 4 0 0 1 0-8z" />
          <path fill="#0ACF83" d="M8 16a4 4 0 0 1 4-4v4a4 4 0 0 1-4 4 4 4 0 0 1 0-4z" />
          <path fill="#1ABCFE" d="M12 12h4a4 4 0 0 1 0 8 4 4 0 0 1-4-4v-4z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Integrations() {
  // Exact 1:1 Tool List matching Wrike Section 4 (with Agency Context additions)
  const row1 = [
    { id: "slack", name: "Slack" },
    { id: "microsoft", name: "Microsoft" },
    { id: "google", name: "Google" },
    { id: "adobe", name: "Adobe" },
    { id: "salesforce", name: "Salesforce" },
    { id: "zoom", name: "Zoom" },
    { id: "tableau", name: "Tableau" },
    { id: "teams", name: "MS Teams" },
    { id: "klaxoon", name: "Klaxoon" },
    { id: "meta", name: "Meta Ads" },
  ];

  const row2 = [
    { id: "onedrive", name: "OneDrive" },
    { id: "tenovos", name: "Tenovos" },
    { id: "github", name: "GitHub" },
    { id: "gmail", name: "Gmail" },
    { id: "gcalendar", name: "Google Calendar" },
    { id: "outlook", name: "Outlook" },
    { id: "excel", name: "MS Excel" },
    { id: "dropbox", name: "Dropbox" },
    { id: "figma", name: "Figma" },
    { id: "stripe", name: "Stripe" },
  ];

  const row3 = [
    { id: "hubspot", name: "HubSpot" },
    { id: "jira", name: "Jira" },
    { id: "netsuite", name: "NetSuite" },
    { id: "copilot", name: "Microsoft Copilot" },
    { id: "gemini", name: "Google Gemini" },
    { id: "claude", name: "Claude" },
    { id: "claudecode", name: "Claude Code" },
    { id: "mcp", name: "Digivigee MCP" },
    { id: "shopify", name: "Shopify Plus" },
  ];

  return (
    <section id="integrations" className="relative py-16 sm:py-20 bg-white text-slate-900 overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================
            ANNUAL SUMMIT HIGHLIGHT BANNER: 100% LIGHT-FIRST ENTERPRISE CARD
            ================================================================ */}
        <div className="rounded-[28px] bg-gradient-to-br from-[#F8FAFC] via-white to-emerald-50/40 text-slate-900 p-6 sm:p-10 lg:p-12 mb-12 sm:mb-16 shadow-[0_4px_24px_rgba(15,23,42,0.05)] relative overflow-hidden group border border-slate-200/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-[0.08em] mb-1">
                <Calendar className="w-3 h-3 text-[#008744]" />
                <span>Annual Agency Summit</span>
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-[38px] font-extrabold tracking-[-0.03em] text-[#0C1628] leading-[1.14]">
                Register now for <span className="text-[#008744]">AgencyScale 2026!</span>
              </h3>
              
              <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed max-w-xl font-normal">
                The ultimate work delivery summit for marketing agencies is coming to your computer screen October 7–8. Register now and join us to discover how top agencies scale past $10M ARR without operational chaos.
              </p>

              <div className="pt-2">
                <Link
                  href="#contact"
                  className="btn-magnetic inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#0C1628] hover:bg-[#008744] text-white font-bold text-sm sm:text-base transition-spring shadow-sm cursor-pointer"
                >
                  <span>Register for Free Pass</span>
                </Link>
              </div>
            </div>

            {/* Right Visual: Pristine Light-Mode Virtual Summit Pass */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              <div className="relative w-full h-60 sm:h-72 lg:h-[270px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs bg-white p-5 flex flex-col justify-between text-left group-hover:border-emerald-500/40 transition-all">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#008744] animate-pulse" />
                    <span className="text-xs font-mono font-bold text-[#0C1628] tracking-wider">
                      AGENCYSCALE 2026
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                    Official Virtual Pass
                  </span>
                </div>

                {/* Summit Countdown (Crisp Light Tiles) */}
                <div className="space-y-2.5 my-auto">
                  <div className="text-[10.5px] font-mono text-slate-500">GLOBAL LIVE BROADCAST COUNTDOWN</div>
                  <div className="grid grid-cols-4 gap-2 text-center font-mono">
                    <div className="p-2 rounded-xl bg-[#F8FAFC] border border-slate-200/80 shadow-2xs">
                      <div className="text-lg sm:text-xl font-black text-[#0C1628]">28</div>
                      <div className="text-[9px] text-slate-500 font-medium">DAYS</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F8FAFC] border border-slate-200/80 shadow-2xs">
                      <div className="text-lg sm:text-xl font-black text-[#0C1628]">14</div>
                      <div className="text-[9px] text-slate-500 font-medium">HOURS</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F8FAFC] border border-slate-200/80 shadow-2xs">
                      <div className="text-lg sm:text-xl font-black text-[#0C1628]">32</div>
                      <div className="text-[9px] text-slate-500 font-medium">MINS</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F8FAFC] border border-slate-200/80 shadow-2xs">
                      <div className="text-lg sm:text-xl font-black text-[#008744]">18</div>
                      <div className="text-[9px] text-emerald-700 font-bold">SECS</div>
                    </div>
                  </div>
                </div>

                {/* Pass Verification Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px]">
                  <span className="text-slate-500 font-mono">Registered Delegates:</span>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    4,850+ Agency Leaders
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            WRIKE-STYLE INTEGRATION DIRECTORY HEADER: Eyebrow Anchor + Balanced Scale
            ================================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#008744] text-[11px] font-bold uppercase tracking-[0.08em] mb-4">
            <Zap className="w-3 h-3 text-[#009669]" />
            <span>Ecosystem & APIs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-[-0.03em] text-[#0C1628] leading-[1.15] mb-4">
            Connect the tools you love with 120+ integrations
          </h2>
          <p className="text-base sm:text-lg text-[#3E4D64] font-normal leading-relaxed max-w-2xl mx-auto">
            Digivigee easily syncs with almost any ad network, CRM, and tool your agency uses, automating processes both inside and outside our platform.
          </p>
        </div>

        {/* ================================================================
            LIVE INFINITE SLIDING MARQUEE PILLS (WRIKE EXACT PILL STYLING)
            AUTHENTIC OFFICIAL FULL-COLOR SVG LOGOS + CLEAN BRAND NAMES ONLY!
            ================================================================ */}
        <div 
          className="space-y-4 overflow-hidden py-4 -mx-4 sm:-mx-6 lg:-mx-8 select-none"
          style={{ contentVisibility: "auto", containIntrinsicSize: "1000px 320px" }}
        >
          
          {/* Row 1: Sliding Left */}
          <div className="animate-marquee-left flex gap-3.5 hover:[animation-play-state:paused]">
            {[...row1, ...row1].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-white hover:bg-[#F2F5FA] border border-slate-200/80 shadow-[0_1px_3px_rgba(22,33,54,0.05)] hover:shadow-md hover:border-slate-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-spring text-xs sm:text-[13px] font-semibold text-[#0C1628] shrink-0 cursor-pointer"
              >
                <BrandLogo id={item.id} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          {/* Row 2: Sliding Right */}
          <div className="animate-marquee-right flex gap-3.5 hover:[animation-play-state:paused]">
            {[...row2, ...row2].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-white hover:bg-[#F2F5FA] border border-slate-200/80 shadow-[0_1px_3px_rgba(22,33,54,0.05)] hover:shadow-md hover:border-slate-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-spring text-xs sm:text-[13px] font-semibold text-[#0C1628] shrink-0 cursor-pointer"
              >
                <BrandLogo id={item.id} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          {/* Row 3: Sliding Left */}
          <div className="animate-marquee-left flex gap-3.5 hover:[animation-play-state:paused]">
            {[...row3, ...row3].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-white hover:bg-[#F2F5FA] border border-slate-200/80 shadow-[0_1px_3px_rgba(22,33,54,0.05)] hover:shadow-md hover:border-slate-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-spring text-xs sm:text-[13px] font-semibold text-[#0C1628] shrink-0 cursor-pointer"
              >
                <BrandLogo id={item.id} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
      {/* Bottom Radiant Fading Divider */}
      <div className="divider-gradient-subtle absolute bottom-0 left-0" />
    </section>
  );
}

