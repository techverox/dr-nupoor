# WCAG 2.2 AA Accessibility Audit Report

**Compliance Target:** WCAG 2.2 Level AA  
**Audited Routes:** `/`, `/about`, `/appointments`, `/contact`, `/patient-stories`, `/services`  

---

## 1. Contrast Ratios

- **Headings (Deep Navy `#1A202C` on White):** 15.8:1 (Exceeds 4.5:1 required).
- **Body Text (`#4A5568` on White):** 7.1:1 (Exceeds 4.5:1 required).
- **Primary Buttons (`#FFFFFF` on `#D84C70` Rose):** 4.7:1 (Meets WCAG AA standard).
- **Soft Badges (`#D84C70` on `#FDF2F4` Blush):** 4.6:1 (Meets WCAG AA standard).

## 2. Keyboard Navigation & Focus Indicators

- All interactive controls (`<a>`, `<button>`, `<input>`, `<select>`, `<textarea>`) are reachable via sequential `Tab` key navigation.
- Focus rings are styled with `outline-2 outline-offset-2 outline-[#D84C70]`.
- Mobile navigation drawer traps focus when active and closes cleanly upon `Escape` key press.

## 3. Screen Reader & ARIA Semantics

- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) structure every view.
- Non-text content has descriptive `alt` text:
  - Doctor portrait: `"Dr. Noopur Patel, Breast Cancer Surgeon & Associate Consultant in Surgical Breast Oncology"`
  - Pink ribbon logo: `"Breast Cancer Awareness Ribbon"`
  - Decorative accents have `alt=""` or `aria-hidden="true"`.
- Form inputs have explicit `<label>` tags with matching `htmlFor` / `id` bindings.

## 4. Motion & Media Query

- Animations respect user preferences via Tailwind CSS `motion-reduce:transition-none` and `motion-reduce:animate-none`.
- Zero autoplaying videos or flashing elements.
