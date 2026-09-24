# Search Engine & Entity Optimization (SEO / GEO / AEO) Audit

**Target Entity:** Dr. Noopur Patel (Physician / Breast Cancer Surgeon)  
**Location Focus:** Ahmedabad, Gujarat, India  
**Practice Base:** Marengo CIMS Hospital  

---

## 1. Schema.org Structured Data Audit

The website injects structured JSON-LD data into the global head:
- **`@type: "Physician"`**:
  - `name`: "Dr. Noopur Patel"
  - `medicalSpecialty`: ["Surgical Breast Oncology", "Breast Surgery", "Oncoplastic Surgery"]
  - `hospitalAffiliation`: "Marengo CIMS Hospital, Ahmedabad"
  - `address`: "Off Science City Road, Sola, Ahmedabad, Gujarat 380060"
  - `telephone`: "+91 98765 43210"
  - `priceRange`: "$$"
  - `url`: "https://drnoopurpatel.com"
- **`@type: "WebSite"`** with Google SiteLinks SearchBox specification.
- **`@type: "MedicalBusiness"`** linking to hospital coordinates and appointment routing.

## 2. On-Page Metadata Integrity

- **Homepage:** Title: `Dr. Noopur Patel | Breast Cancer Surgeon | Marengo CIMS Hospital Ahmedabad`
- **About:** Title: `About Dr. Noopur Patel | Breast Surgeon & Oncoplastic Specialist Ahmedabad`
- **Appointments:** Title: `Request an Appointment | Dr. Noopur Patel Breast Surgeon Ahmedabad`
- **Patient Stories:** Title: `Patient Stories & Reflections | Dr. Noopur Patel Breast Oncology`
- **Canonical URLs:** Enforced across all routes to prevent duplicate content indexing.
- **OpenGraph & Twitter Card:** High-resolution preview image points to `/images/doctor/assets/dr-noopur-hd.jpg`.

## 3. Crawler Directives

- `robots.txt`: Allows public indexing of educational and patient routes while disallowing sensitive `/admin` and `/api` administrative paths.
- `sitemap.xml`: Auto-generated containing all 46 static and dynamic canonical endpoints with updated change frequencies.
