import {
  HomePageContent,
  AboutPageContent,
  ContactPageContent,
  SiteSettings,
} from "@/types";
import { SITE_CONFIG } from "@/config/site";

export const DEFAULT_HOME_PAGE_CONTENT: HomePageContent = {
  id: "home",
  heroBadge: "SURGICAL BREAST ONCOLOGY · BREAST CANCER SPECIALIST",
  heroHeadline: "Surgical Breast Oncology",
  heroHeadlineHighlight: "& Cancer Surgery in Ahmedabad",
  heroSubheadline:
    "Dr. Nupur Patel provides specialised surgical breast oncology, oncoplastic breast surgery, and compassionate care for breast cancer and benign breast conditions at Marengo CIMS Hospital, Ahmedabad.",
  primaryCtaText: "Book a Consultation",
  primaryCtaLink: "/appointments",
  secondaryCtaText: "Consult on WhatsApp",
  secondaryCtaLink: "https://wa.me/919876543210",
  stat1Value: "1 in 8",
  stat1Label: "Women may develop breast cancer",
  stat2Value: "90%+",
  stat2Label: "Survival rate with early detection",
  stat3Value: "Regular",
  stat3Label: "Screening saves lives",
  stat4Value: "You are not alone",
  stat4Label: "We are here to support",
  whyUsTitle: "A Personalised Approach to Breast Cancer Care",
  whyUsSubtitle:
    "We believe that true healing combines surgical excellence with human kindness. Here is why patients and families across Gujarat place their trust in Dr. Noopur Patel.",
  ctaSectionHeadline: "Have a Breast Health Concern?",
  ctaSectionSubtitle:
    "If you noticed a breast lump, abnormal nipple discharge, or a recent diagnosis, or want a second opinion from a breast surgeon, schedule a consultation to discuss your condition.",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

export const DEFAULT_ABOUT_PAGE_CONTENT: AboutPageContent = {
  id: "about",
  heroBadge: "ABOUT US",
  heroHeadline: "Dedicated to Women's Health.",
  heroHeadlineHighlight: "Today and Always.",
  heroSubheadline:
    "At Dr. Noopur Patel's clinic, we believe every woman deserves accurate diagnosis, advanced treatment and compassionate care for all breast health concerns — in a safe, supportive and empowering environment.",
  storyTitle: "Meet Dr. Noopur Patel",
  storyParagraph1:
    "Dr. Noopur Patel is a Breast Surgeon and Oncoplastic Surgeon based in Ahmedabad, dedicated to providing comprehensive, compassionate and personalised care for women at every stage of their breast health journey.",
  storyParagraph2:
    "With specialized surgical oncology fellowship training at Max Healthcare and clinical practice at Marengo CIMS Hospital, she combines rigorous oncologic principles with delicate aesthetic preservation.",
  missionTitle: "Our Mission",
  missionDescription:
    "To provide comprehensive, evidence-based and compassionate breast care to every woman, empowering them to make informed decisions about their health.",
  visionTitle: "Our Vision",
  visionDescription:
    "To be a trusted centre for breast health, known for clinical excellence, advanced surgical techniques and a patient-centred approach.",
  stat1Value: "10+",
  stat1Label: "Years of Experience",
  stat2Value: "1000+",
  stat2Label: "Patients Treated",
  stat3Value: "100%",
  stat3Label: "Compassionate Care",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

export const DEFAULT_CONTACT_PAGE_CONTENT: ContactPageContent = {
  id: "contact",
  heroBadge: "YOUR HEALTH, OUR PRIORITY",
  heroHeadline: "Book an",
  heroHeadlineHighlight: "Appointment",
  heroSubheadline:
    "Take the first step towards better breast health. Book your consultation with Dr. Noopur Patel easily and at your convenience.",
  formTitle: "Book Your Consultation",
  formSubtitle:
    "Fill in your details and our team will confirm your appointment.",
  infoTitle: "Other Ways to Book",
  phone: SITE_CONFIG.contact.phoneFormatted,
  email: SITE_CONFIG.contact.email,
  whatsapp: SITE_CONFIG.contact.whatsappDisplay,
  address: "Marengo CIMS Hospital, Off Science City Road, Sola, Ahmedabad, Gujarat 380060",
  workingHours: "Monday - Saturday: 10:00 AM - 6:00 PM (Sunday: Closed)",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: "global",
  siteName: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  logoUrl: "/images/doctor/assets/logo.png",
  faviconUrl: "/favicon.ico",
  contact: {
    phone: SITE_CONFIG.contact.phoneFormatted,
    whatsapp: SITE_CONFIG.contact.whatsappDisplay,
    email: SITE_CONFIG.contact.email,
    address: SITE_CONFIG.contact.address,
    businessHours: SITE_CONFIG.contact.workingHours,
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Marengo%20CIMS%20Hospital%20Ahmedabad&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  socials: {
    facebook: SITE_CONFIG.socials.facebook,
    instagram: SITE_CONFIG.socials.instagram,
    linkedin: SITE_CONFIG.socials.linkedin,
    twitter: SITE_CONFIG.socials.twitter,
    youtube: SITE_CONFIG.socials.youtube,
  },
  defaultSEO: {
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    slug: "",
    canonicalUrl: SITE_CONFIG.url,
  },
  headerContent: {
    announcementBarText: "Expert Breast Care & Consultations — Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad",
    showAnnouncementBar: false,
    announcementLink: "/appointments",
  },
  footerContent: {
    aboutText:
      "Dedicated to compassionate, evidence-based, and patient-centered breast surgical oncology. Combining oncologic clearance with aesthetic preservation for every woman.",
    copyrightText: `© ${new Date().getFullYear()} Dr. Noopur Patel. All rights reserved.`,
    badgeText: "Surgical Breast Oncology & Oncoplastic Surgery",
  },
  customScripts: {
    isEnabled: true,
    headerCode: "",
    bodyCode: "",
    footerCode: "",
  },
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};
