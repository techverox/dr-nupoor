# Core Web Vitals & Performance Audit

**Engine:** Next.js 16.3.4 (App Router & Turbopack)  
**Bundler Target:** React 19.2.8 (Server Components Default)  

---

## 1. Metrics & Core Web Vitals Target

| Metric | Target | Implemented Optimization |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | < 1.5s | Next.js `<Image priority>` on hero doctor portrait with exact responsive `sizes` attribute. |
| **CLS (Cumulative Layout Shift)** | 0.00 | All image containers use explicit aspect ratios (`aspect-[4/5]`, `aspect-[16/9]`) or explicit `width`/`height`. |
| **INP (Interaction to Next Paint)** | < 100ms | Lightweight native state handling, zero heavy animation libraries, debounced handlers. |
| **TTFB (Time to First Byte)** | < 200ms | Static site generation (SSG) with incremental static regeneration (`revalidate = 60`) for public pages. |

---

## 2. Asset & Script Optimization

- **Fonts:** Next.js Font Optimization (`next/font/google`) with automatic subsetting for `Playfair Display` and `Inter` (Zero render-blocking external Google Fonts stylesheet requests).
- **Images:** WebP/AVIF automatic negotiation via Next.js image optimizer.
- **Bundle Footprint:** Minimal client components. SVG icons imported cleanly without bloating vendor chunks.
- **Production Build:** 46/46 pages generated in 1.0s during build phase.
