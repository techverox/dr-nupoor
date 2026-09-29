import React from "react";
import type { Metadata } from "next";
import { getCmsPageContent } from "@/lib/services/cmsService";
import { DEFAULT_CONTACT_PAGE_CONTENT } from "@/data/pagesContent";
import AppointmentClient from "@/components/doctor/AppointmentClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact & Consultation | Dr. Noopur Patel Breast Surgeon Ahmedabad",
  description:
    "Schedule a consultation with Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad. Call +91 98765 43210 or request an appointment online.",
};

export default async function ContactRoute() {
  let contactContent = DEFAULT_CONTACT_PAGE_CONTENT;
  try {
    const fetched = await getCmsPageContent("contact").catch(() => null);
    if (fetched) {
      contactContent = { ...DEFAULT_CONTACT_PAGE_CONTENT, ...fetched };
    }
  } catch (e) {
    console.warn("[ContactRoute] Using fallback contact copy:", e);
  }

  return <AppointmentClient initialContent={contactContent} />;
}
