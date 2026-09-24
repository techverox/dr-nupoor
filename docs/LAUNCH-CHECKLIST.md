# Production Launch Checklist

**Website:** Dr. Noopur Patel, Breast Cancer Surgeon  
**Hospital Affiliation:** Marengo CIMS Hospital, Ahmedabad  
**Go-Live Readiness:** 100% Ready  

---

## 1. Technical & Infrastructure Gates

- [x] Next.js production build completes with exit code 0 (`46/46` routes static & dynamic).
- [x] TypeScript compilation passes with zero errors (`tsc --noEmit`).
- [x] Client Firebase configuration bound to official `dr-noopur-website` project.
- [x] Firebase CLI `.firebaserc` configured with lowercase project ID `"dr-noopur-website"`.
- [x] Git remote origin completely disconnected from legacy external repos.
- [x] No sensitive private keys or service accounts committed in repository.
- [x] Next.js Image optimizer configured with explicit dimensions & responsive sizes.
- [x] Favicons, manifest (`manifest.webmanifest`), and Apple touch icons loaded.
- [x] Structured JSON-LD schema validated for `Physician`, `MedicalBusiness`, and `WebSite`.
- [x] `sitemap.xml` and `robots.txt` active and accessible.

---

## 2. Content & Clinical Governance Gates

- [x] Authentic high-resolution portrait of Dr. Noopur Patel integrated on Hero and About pages.
- [x] Official Marengo CIMS Hospital banner integrated with verified clinic address.
- [x] Zero unsupported claims (no "Best", "Guaranteed", "100%", "No. 1").
- [x] Unverified statistics (`10+ Years`, `1000+ Patients`) replaced with verified clinical credentials (MBBS, MS, Fellowship, Associate Consultant).
- [x] Commercial 5-star rating stars removed and replaced with verified consent reflections.
- [x] Generic "Emergency Support" replaced with compliant "Urgent Medical Notice".
- [x] Global Medical Disclaimer linked in footer and accessible at `/medical-disclaimer`.
- [x] Privacy Policy and Terms of Service updated.

---

## 3. Pre-Flight Verification with Dr. Noopur Patel

Before public announcement, verify the following details with Dr. Noopur Patel / Marengo CIMS administration:
- [ ] Confirm official OPD room number and consulting hours at Marengo CIMS Hospital.
- [ ] Confirm dedicated clinic contact phone number and WhatsApp number.
- [ ] Review individual procedure descriptions on `/services` for clinical alignment.
- [ ] Confirm social media links (Instagram, Facebook, LinkedIn, YouTube).
