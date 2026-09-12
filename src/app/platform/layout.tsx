import type { Metadata } from "next";
import { resolveDynamicPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return resolveDynamicPageMetadata("/platform", {
    title: "Platform OS — The 20 Connected Core Modules for Scaling Agencies | DigiVigee",
    description:
      "Eliminate agency tool sprawl. Replace 12 disconnected software bills with DigiVigee OS: a multi-tenant platform built for monthly retainers, 1-click WhatsApp approvals, and automated Stripe billing.",
    path: "/platform",
    keywords: [
      "agency operating system",
      "marketing agency software",
      "multi-tenant agency platform",
      "white-label client portal",
      "agency CRM",
      "retainer billing software",
      "blended ROAS tracker",
      "local SEO rank grid",
    ],
  });
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
