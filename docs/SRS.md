# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
**Dr. Noopur Patel — Breast Cancer Surgeon Website**
*Version 1.0 • Technical Requirements Baseline*

---

## 1. Functional Requirements

### FR-01: Responsive Layout & Mobile Usability
- System must render cleanly across all device form factors: 320px, 375px, 390px, 414px, 768px, 1024px, 1280px, 1440px, and 1920px.
- Navigation header must feature a sticky mobile bar with accessible hamburger toggle and persistent "Book Appointment" CTA.

### FR-02: Appointment Request & Triage Engine
- Interactive form with field validation: Full Name (required), Phone Number (valid Indian/international format required), Email Address (optional/valid), Preferred Date, Preferred Time slot, Consultation Type (In-Clinic / Online / Second Opinion), and Optional Message.
- Submission captures data into Firestore collection `leads` (or `formSubmissions`) and provides immediate accessible visual confirmation.
- Direct alternative booking paths: "Book on WhatsApp" (prefilled template link) and "Call Us Directly".

### FR-03: Real-Time Admin Panel Synchronization
- The existing `/admin` dashboard must bind directly to public site data models:
  - `services` collection -> Services showcase & cards
  - `testimonials` collection -> Patient stories & reviews
  - `faqs` collection -> FAQ accordions
  - `siteSettings` -> Clinic hours, contact phone, email, hospital location
  - `leads` -> Appointment requests dashboard
- Any update published in `/admin` updates Firestore and revalidates static paths instantly.

### FR-04: Patient Health Education & Anatomy Engine
- Interactive anatomy viewer rendering key breast structures (Lobules, Ducts, Fatty Tissue, Nipple, Areola, Chest Muscle, Ribs).
- Comparison matrix of common conditions (Normal Breast, Benign Fibroadenoma, Breast Cancer, Ductal Carcinoma In Situ).
- Surgical treatment explanations (Lumpectomy, Mastectomy, Reconstruction, Oncoplastic Surgery).

### FR-05: Medical Disclaimer & Compliance Controls
- Prominent educational disclaimer on all medical and surgical pages.
- Disclaimer banner and dedicated `/medical-disclaimer` page stipulating that digital content does not constitute individualized diagnosis.

---

## 2. Non-Functional Requirements

### NFR-01: Performance & Core Web Vitals
- Largest Contentful Paint (LCP) < 2.0s on 4G networks.
- Cumulative Layout Shift (CLS) < 0.05.
- First Input Delay / Interaction to Next Paint (INP) < 100ms.
- All imagery optimized via Next.js `<Image />` or AVIF/WebP formats with explicit width/height dimensions.

### NFR-02: Accessibility (WCAG 2.2 Level AA)
- Minimum color contrast ratio 4.5:1 for normal text, 3:1 for large text and interactive components.
- Complete keyboard accessibility: tab indices, focus rings, escape keys on drawers.
- Semantic HTML tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.

### NFR-03: Security & Data Privacy
- No collection of sensitive medical history or diagnostic file uploads on public forms.
- Form rate-limiting and sanitization of text inputs against XSS and injection.
- Security headers (X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Referrer-Policy).
