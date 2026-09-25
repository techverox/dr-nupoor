import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation | Dr. Noopur Patel Breast Cancer Surgeon Ahmedabad",
  description:
    "Schedule a confidential clinical consultation or second opinion with Dr. Noopur Patel, Breast & Oncoplastic Surgeon at Marengo CIMS Hospital, Ahmedabad.",
  alternates: {
    canonical: "/appointments",
  },
  openGraph: {
    title: "Book a Consultation | Dr. Noopur Patel Breast Surgeon Ahmedabad",
    description:
      "Schedule a consultation with Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad. Expert surgical breast oncology and oncoplastic breast care.",
    url: "/appointments",
  },
};

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
