import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { resolveRootLayoutMetadata } from "@/lib/seo/metadata";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { AnalyticsScripts, GoogleTagManagerNoScript } from "@/components/analytics/AnalyticsScripts";
import { OfferNotificationBanner } from "@/components/public/OfferNotificationBanner";

import { GlobalStructuredData } from "@/components/seo/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  return await resolveRootLayoutMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${outfit.variable} ${plusJakarta.variable} scroll-smooth`}>
      <head>
        <GlobalStructuredData />
      </head>
      <body className="bg-[#F8FAFC] text-slate-900 antialiased font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
        <GoogleTagManagerNoScript />
        <AnalyticsScripts />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <OfferNotificationBanner />
        {children}
      </body>
    </html>
  );
}


