# CYBERSECURITY & PATIENT PRIVACY BLUEPRINT
**Dr. Noopur Patel — Medical Professional Platform**
*Production Security Baseline*

---

## 1. Zero Trust & Patient Privacy by Design
1. **Minimal Contact Triage:**
   Public forms (`/appointments`, `/contact`) intentionally request only basic communication details (Name, Phone, Preferred Date, Consultation Mode, Brief general topic). Detailed medical records, pathology slides, or sensitive diagnostic histories are NOT collected over public web forms.
2. **Server-Side Input Sanitization:**
   All API endpoints validate payloads with strict Zod schemas, stripping non-printable characters and preventing XSS / SQL / NoSQL injections.
3. **No Hardcoded Secrets:**
   All previous credentials and private keys from the legacy agency project have been permanently destroyed. `.env.local` is git-ignored and only uses environment variables.

---

## 2. Security Headers & Network Protections
The Next.js configuration enforces:
- `X-Frame-Options: DENY` (prevents clickjacking attacks)
- `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 3. Role-Based Access Control (RBAC) in `/admin`
- Password hashing using OWASP-compliant `scrypt` with cryptographic salt.
- Account lockout policy: 5 consecutive failed attempts trigger a 15-minute temporary lockout.
- Secure, HTTP-only session cookies with `SameSite=Lax` and `Secure` flags.
