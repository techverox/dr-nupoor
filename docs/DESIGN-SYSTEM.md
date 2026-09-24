# DESIGN SYSTEM & UI TOKENS
**Dr. Noopur Patel — Breast Cancer Surgeon & Surgical Breast Oncology Website**
*Version 1.0 • Clinical Editorial Aesthetic*

---

## 1. Visual Philosophy
- **Aesthetic Direction:** Clinical, Editorial, Compassionate, High-Trust, Modern.
- **Tone:** Calm and respectful. Never dramatic, scary, or loud.
- **Core Elements:** Elegant serif headings paired with clean, ultra-legible modern sans-serif body text; soft blush and medical rose accents reflecting breast health awareness with dignified clinical restraint.

---

## 2. Color Palette & Tokens

| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `--color-primary-rose` | `#D84C70` | Primary brand accent, pink ribbon, primary CTA buttons |
| `--color-primary-rose-hover` | `#BE3A5C` | Button hover state, active links |
| `--color-primary-rose-dark` | `#9B2846` | Deep accent text, highlighted serif titles |
| `--color-rose-light` | `#FDF2F4` | Badge backgrounds, light card highlights, pill buttons |
| `--color-rose-subtle` | `#FFF8F9` | Section alternating backgrounds, hero gradient tint |
| `--color-rose-border` | `#F5D6DE` | Card borders, dividers, subtle outlines |
| `--color-navy-dark` | `#1A202C` | Primary headlines, bold typography, footer dark accents |
| `--color-navy-body` | `#2D3748` | Primary body text, readable paragraphs |
| `--color-navy-muted` | `#64748B` | Subtitles, captions, metadata labels, icon accents |
| `--color-pure-white` | `#FFFFFF` | Primary surface cards, container backgrounds |
| `--color-warm-bg` | `#FDFBF9` | Warm clinical background neutral |
| `--color-whatsapp-green` | `#25D366` | WhatsApp consultation CTA button |
| `--color-gold-star` | `#F59E0B` | Verified 5-star rating badges |

---

## 3. Typography Hierarchy

| Style | Font Family | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero H1** | Serif / Playfair / Georgia | 44px - 56px | Bold (700) | 1.15 | Main hero title |
| **H1 Highlight** | Serif Italic | 44px - 56px | 600 / Italic | 1.15 | *"Every Woman"*, *"Today and Always"* |
| **H2 Section Title** | Serif / Cormorant / Georgia | 32px - 40px | SemiBold (600) | 1.2 | Section titles |
| **H3 Card Title** | Sans / Inter / Outfit | 18px - 22px | SemiBold (600) | 1.3 | Service cards, feature headers |
| **Overline Badge** | Sans / Inter | 12px - 13px | Bold (700) | 1.0 | Uppercase tracking (`tracking-wider`) |
| **Body Primary** | Sans / Inter | 15px - 16px | Regular (400) | 1.6 | Paragraphs, descriptions |
| **Body Small** | Sans / Inter | 13px - 14px | Regular (400) | 1.5 | Footnotes, disclaimers, metadata |
| **Button Text** | Sans / Inter | 14px - 15px | Medium (500) | 1.0 | CTAs, navigation links |

---

## 4. UI Components Specification

### 4.1 Buttons
- **Primary CTA (`.btn-primary-rose`):**
  - Background: Linear gradient / solid `#D84C70`
  - Text: `#FFFFFF`
  - Border radius: `9999px` (Full pill)
  - Padding: `12px 28px`
  - Shadow: `0 4px 14px rgba(216, 76, 112, 0.25)`
  - Hover: Background `#BE3A5C`, subtle scale `1.02`

- **Secondary WhatsApp CTA (`.btn-whatsapp-outline`):**
  - Border: `1.5px solid #D84C70`
  - Background: `transparent` or `#FFFFFF`
  - Text: `#D84C70`
  - Border radius: `9999px`
  - Padding: `12px 26px`
  - Hover: Background `#FDF2F4`

### 4.2 Cards
- **Clinical Service Card:** White background, `border: 1px solid #F5D6DE`, border-radius `16px`, overflow hidden, subtle drop-shadow on hover with rose border accent and expanding plus `(+)` icon.
- **Feature Stat Pill:** Rounded-2xl pill with soft pink background `#FDF2F4`, centered typography, vibrant stat number in deep rose.
- **Anatomy Diagram Display:** Clean layout with clear anatomical callouts and condition comparisons.
