# SYSTEM ARCHITECTURE & INTEGRATION
**Dr. Noopur Patel — Breast Cancer Surgeon Website**
*Version 1.0 • Technical Blueprint*

---

## 1. High-Level Architecture Overview

```
                      +---------------------------------------+
                      |               CLIENT                  |
                      |   Desktop / Tablet / Mobile Browser   |
                      +-------------------+-------------------+
                                          |
                        HTTPS Requests / Server Components
                                          |
                      +-------------------v-------------------+
                      |         NEXT.JS APP ROUTER            |
                      |                                       |
                      |  - Public Routes:                     |
                      |    /, /about, /services,              |
                      |    /patient-stories, /appointments,   |
                      |    /contact, /patient-guide,          |
                      |    /medical-disclaimer                |
                      |                                       |
                      |  - Admin Dashboard:                   |
                      |    /admin/* (CMS, Leads, FAQs, etc.)  |
                      |                                       |
                      |  - API Endpoints:                     |
                      |    /api/leads, /api/auth, /api/sync   |
                      +-------------------+-------------------+
                                          |
                                          | Reads & Writes
                                          v
                      +---------------------------------------+
                      |         CMS & SERVICE LAYER           |
                      |       (src/lib/services/*)            |
                      |                                       |
                      |   - cmsService.ts                     |
                      |   - leadService.ts                    |
                      |   - rbacService.ts                    |
                      |   - seoService.ts                     |
                      +-------------------+-------------------+
                                          |
                      +-------------------+-------------------+
                      |                                       |
                      | [Online with Keys]                    | [Fallback / Standalone]
                      v                                       v
         +--------------------------+           +--------------------------+
         |     FIREBASE / CLOUD     |           |  IN-MEMORY TYPED STORE   |
         |        FIRESTORE         |           |    (src/data/* seeds)    |
         |                          |           |                          |
         | - services               |           | - SERVICES_DATA          |
         | - testimonials (stories) |           | - TESTIMONIALS_DATA      |
         | - faqs                   |           | - FAQS_DATA              |
         | - siteSettings           |           | - DEFAULT_HOME_CONTENT   |
         | - leads                  |           |                          |
         +--------------------------+           +--------------------------+
```

---

## 2. Dynamic CMS Data Binding
1. **Server-Side Data Hydration:**
   Public pages call `getCmsServices()`, `getCmsTestimonials()`, `getCmsFaqs()`, `getCmsPageContent()`, etc.
   If Firestore credentials are present in `.env.local`, live documents from Firestore are fetched. If not yet configured, the system uses the verified clinical seed data without failing or crashing.
2. **Real-Time Admin Mutations:**
   When an admin user logs into `/admin` and updates a service, FAQ, or patient story:
   - The mutation is written directly to Firestore (or in-memory cache).
   - `revalidatePath` is called across all relevant public routes (`/`, `/about`, `/services`, etc.).
   - The public website immediately reflects the change.
3. **Leads / Appointment Submissions:**
   When a patient fills out `/appointments` or `/contact`:
   - Data is validated on both client (Zod) and server (`/api/leads`).
   - Saved to `leads` collection in Firestore.
   - Admin receives the appointment entry under `/admin/leads`.

---

## 3. Directory Structure
```
src/
├── app/
│   ├── (public pages)
│   │   ├── page.tsx               # Homepage (100% design match)
│   │   ├── about/page.tsx         # About Dr. Patel (100% design match)
│   │   ├── services/page.tsx      # Comprehensive Services & Treatments
│   │   ├── appointments/page.tsx  # Appointment Booking Form & Location
│   │   ├── patient-stories/page.tsx # Patient Testimonials & Videos
│   │   ├── patient-guide/page.tsx # Educational Anatomy & Preparation
│   │   ├── contact/page.tsx       # Contact Card & Map
│   │   ├── medical-disclaimer/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   └── terms-and-conditions/page.tsx
│   ├── admin/                     # Full Admin CMS Suite (Intact & Bound)
│   ├── api/                       # API Route Handlers
│   └── globals.css                # Clinical Design Tokens & Utilities
├── components/
│   ├── doctor/                    # Doctor-specific specialized components
│   │   ├── DoctorNavbar.tsx
│   │   ├── DoctorFooter.tsx
│   │   ├── DoctorHero.tsx
│   │   ├── EarlyDetectionSection.tsx
│   │   ├── ComprehensiveServicesGrid.tsx
│   │   ├── BreastAnatomySection.tsx
│   │   ├── TreatmentOptionsGrid.tsx
│   │   ├── DoctorAboutSpotlight.tsx
│   │   ├── CareJourneyTimeline.tsx
│   │   ├── InstagramAwarenessFeed.tsx
│   │   ├── PatientStoriesSection.tsx
│   │   ├── DoctorFaqAccordion.tsx
│   │   ├── HopeCtaBanner.tsx
│   │   └── TrustStrip.tsx
│   └── ui/                        # Reusable atomic UI elements
├── config/
│   └── firebase.ts                # Collections registry
├── data/                          # Clinical seed datasets for Dr. Noopur Patel
└── lib/
    ├── firebase/                  # Client & Admin Firebase SDKs
    ├── services/                  # Business logic & CMS services
    └── env.ts                     # Strict environment variable validation
```
