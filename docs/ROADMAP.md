# DEVELOPMENT & EXECUTION ROADMAP
**Dr. Noopur Patel — Grand Master Build Execution**
*Version 1.0 • 5-Phase Plan*

---

## Phase 1: Foundation, Tokens & Global Layout Shell
- [x] Comprehensive repository audit (`/docs/PROJECT-AUDIT.md`)
- [x] Master PRD & SRS specification (`/docs/PRD.md`, `/docs/SRS.md`)
- [x] Architecture & integration map (`/docs/ARCHITECTURE.md`)
- [x] Design system tokens & typography hierarchy (`/docs/DESIGN-SYSTEM.md`)
- [x] SEO strategy & Schema.org definitions (`/docs/SEO-STRATEGY.md`)
- [x] Security & privacy controls (`/docs/SECURITY.md`)
- [x] Content model & Firestore collection mapping (`/docs/CONTENT-MODEL.md`)
- [x] Extraction of all 37 high-res design assets from approved references
- [ ] Implement global design tokens in `src/app/globals.css`
- [ ] Build global `DoctorNavbar` (utility bar, logo ribbon, responsive mobile drawer)
- [ ] Build global `DoctorFooter` (quick links, verified hospital address, contact details, social links)

---

## Phase 2: Core Page Implementation (100% Design Match)
- [ ] **Homepage (`src/app/page.tsx`):**
  - Section 01: Hero with Dr. Patel portrait, headline, 4 feature pills, 2 CTAs, floating ribbon badge
  - Section 02: Early Detection Can Save Lives (4 stat cards + editorial ribbon graphic)
  - Section 03: Comprehensive Breast Care Under One Roof (6 clinical service cards with expand icons)
  - Section 04: Understanding Breast Anatomy & 4 Common Breast Conditions matrix
  - Section 05: Personalised Treatment Options (Lumpectomy, Mastectomy, Reconstruction, Oncoplastic)
  - Section 06: About Dr. Noopur Patel spotlight (consultation photo, philosophy quote, key credentials)
  - Section 07: 5-Step Patient Care Journey timeline
  - Section 08: Latest from Instagram awareness carousel
  - Section 09: Real Experiences / Patient Stories (5-star reviews + avatars)
  - Section 10: Frequently Asked Questions accordion
  - Section 11: Call to Action banner ("Take the First Step Towards Better Breast Health")
  - Section 12: Trust Icon Strip
- [ ] **About Us (`src/app/about/page.tsx`):**
  - Hero with Dr. Patel portrait and "Dedicated to Women's Health. Today and Always"
  - Meet Your Doctor (Large consultation photo, credentials, clinical interests)
  - 4 Key Practice Metric Counters (10+ Years, 1000+ Patients, Specialised, Compassionate)
  - Our Approach (4 pillars + 3 photo cards: Detailed Consultation, Advanced Surgical Care, Accurate Diagnosis)
  - Mission, Vision & Values matrix with quote card
  - What Makes Us Different (6 clinical differentiators)
  - Professional Experience & Growth timeline (5 milestones)
  - Safe, Comfortable and Modern Clinic facilities gallery (4 interior photos)
- [ ] **Appointments (`src/app/appointments/page.tsx` & `src/app/contact/page.tsx`):**
  - Two-column booking experience matching Screenshot 3
  - Left: Interactive consultation request form with Zod validation and Firestore lead saving
  - Right: Alternative booking channels (WhatsApp direct, Phone direct, Clinic Location card with photo and timings)
- [ ] **Patient Stories (`src/app/patient-stories/page.tsx`):**
  - Real Stories, Real Strength matching Screenshot 4
  - Category filters (All Stories, Breast Cancer, Oncoplastic, Reconstruction, Benign, Early Detection)
  - Patient testimonial cards with star ratings
  - "A New Chapter of Confidence" banner
  - Video story thumbnail cards with play indicators

---

## Phase 3: CMS & Firestore Real-Time Synchronization
- [ ] Update seed datasets in `src/data/services.ts`, `src/data/testimonials.ts`, `src/data/faqs.ts`, and `src/lib/services/cmsService.ts`
- [ ] Verify that updates in `/admin/services`, `/admin/testimonials`, `/admin/faqs`, and `/admin/settings` reflect dynamically on public pages
- [ ] Verify appointment submission API `/api/leads` logs submissions into `/admin/leads`

---

## Phase 4: Production Build, Testing & Quality Verification
- [ ] TypeScript strict validation (`tsc --noEmit`)
- [ ] Next.js production build (`npm run build`)
- [ ] Cross-device responsiveness check (Desktop, Tablet, Mobile)
- [ ] Doctor Content Approval Checklist generation
