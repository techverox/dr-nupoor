# SEO, LOCAL SEARCH & AI DISCOVERY STRATEGY
**Dr. Noopur Patel — Breast Cancer Surgeon & Surgical Breast Oncology**
*Location: Ahmedabad, Gujarat, India*

---

## 1. Technical SEO Architecture
- **Semantic Hierarchy:** Single `<h1>` per page, logical `<h2>` and `<h3>` tags.
- **Canonical URLs:** Self-referencing canonical link tag on every page.
- **OpenGraph & Twitter Cards:** Rich preview image, title, and description optimized for social and messaging shares (WhatsApp, LinkedIn, Twitter/X).
- **XML Sitemap:** Dynamic sitemap at `/sitemap.xml` referencing all verified public routes.
- **Robots.txt:** Optimized crawl directives permitting search engine indexing while restricting `/admin` and private APIs.

---

## 2. Schema.org Structured Data (JSON-LD)
We implement verified Schema.org entities across pages:

### 2.1 Physician / MedicalBusiness Schema (Site-wide)
```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Noopur Patel",
  "jobTitle": "Breast Cancer Surgeon & Associate Consultant in Surgical Breast Oncology",
  "medicalSpecialty": [
    "Surgical Oncology",
    "Breast Surgery",
    "Oncoplastic Breast Surgery"
  ],
  "worksFor": {
    "@type": "Hospital",
    "name": "Marengo CIMS Hospital",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Off Science City Road, Sola",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380060",
      "addressCountry": "IN"
    }
  },
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "AMC MET Medical College (MBBS)"
    },
    {
      "@type": "EducationalOrganization",
      "name": "SMIMER (MS General Surgery)"
    },
    {
      "@type": "EducationalOrganization",
      "name": "Max Healthcare (Fellowship in Breast Oncology)"
    }
  ],
  "telephone": "+919876543210",
  "url": "https://drnoopurpatel.com"
}
```

### 2.2 FAQPage Schema
On `/`, `/faq`, and `/patient-guide`, FAQ questions and answers are marked up with `FAQPage` schema for Google Rich Snippets in SERPs.

---

## 3. Local Search Discovery (Ahmedabad, Gujarat)
- Primary geo-modifiers: *Ahmedabad*, *Gujarat*, *Sola*, *Science City*.
- Focus keywords (evidence-based, no spamming):
  - "Breast Cancer Surgeon Ahmedabad"
  - "Surgical Breast Oncology Ahmedabad"
  - "Oncoplastic Breast Surgery Ahmedabad"
  - "Breast Lump Examination Ahmedabad"
  - "Breast Conservation Surgery Ahmedabad"
