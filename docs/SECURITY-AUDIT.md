# Healthcare Cybersecurity & Data Privacy Audit

**Application:** Dr. Noopur Patel Practice Platform  
**Compliance Context:** Digital Personal Data Protection (DPDP) Act, Ethical Medical Web Standards  

---

## 1. Secrets & Repository Sanitization

- **Git Isolation:** Remote origins disconnected (`git remote -v` returns 0 remotes). Accidental push to external vendor repositories is physically impossible.
- **Service Account Keys:** Legacy service account JSON keys deleted from local disk.
- **Client vs. Server Separation:** Only public client keys prefixed with `NEXT_PUBLIC_` are bundled. Server admin credentials reside exclusively in server environments and are never serialized into client bundles.

---

## 2. Patient Privacy Architecture

- **Minimal Data Collection:** The public consultation request form collects strictly necessary administrative fields:
  - Patient Name
  - Phone Number
  - Email Address
  - Preferred Date & Time
  - General Consultation Category (First-time evaluation, Second opinion, Routine check)
- **No Sensitive Medical Data Upload:** The platform strictly refrains from asking for diagnostic reports, imaging scans, biopsy documents, or detailed symptom logs on public unauthenticated forms, avoiding unencrypted transit risks.
- **Consent Checkbox:** Appointment requests require patient acknowledgment of data processing terms and the educational disclaimer.

---

## 3. Headers & Network Defense

- **CSP & Security Headers:** `next.config.ts` enforces `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Bot Mitigation:** Form submissions incorporate honeypot fields and client rate limiting.
