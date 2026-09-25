import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { resolveRootLayoutMetadata } from "@/lib/seo/metadata";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { AnalyticsScripts, GoogleTagManagerNoScript } from "@/components/analytics/AnalyticsScripts";
import { GlobalStructuredData } from "@/components/seo/StructuredData";
import { getCmsSiteSettings } from "@/lib/services/cmsService";
import { CustomCodeInjector } from "@/components/analytics/CustomCodeInjector";
import { LiveSyncListener } from "@/components/sync/LiveSyncListener";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  return await resolveRootLayoutMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialScripts = undefined;
  try {
    const siteSettings = await getCmsSiteSettings();
    initialScripts = siteSettings?.customScripts;
  } catch {
    // Graceful fallback if settings fetch fails
  }

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${plusJakarta.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <GlobalStructuredData />
      </head>
      <body className="bg-white text-slate-900 antialiased font-sans selection:bg-[#D84C70]/20 selection:text-[#9B2846]">
        <LiveSyncListener />
        <CustomCodeInjector initialScripts={initialScripts} />
        <GoogleTagManagerNoScript />
        <AnalyticsScripts />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}


