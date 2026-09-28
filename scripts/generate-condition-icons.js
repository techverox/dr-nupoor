const sharp = require('sharp');
const path = require('path');

const icons = [
  {
    name: 'condition-grid-lump.png',
    bg: '#FFF0F3',
    border: '#F5CAD5',
    accent: '#9B2846',
    // Medical cross + palpable focus
    svgInner: `
      <circle cx="60" cy="60" r="30" fill="#FCE8ED" stroke="#E292A6" stroke-width="2" stroke-dasharray="4 3"/>
      <circle cx="60" cy="60" r="14" fill="#9B2846"/>
      <circle cx="60" cy="60" r="6" fill="#FFFFFF"/>
    `,
  },
  {
    name: 'condition-grid-fibroadenoma.png',
    bg: '#F0F9FF',
    border: '#BAE6FD',
    accent: '#0369A1',
    // Smooth oval capsule
    svgInner: `
      <ellipse cx="60" cy="60" rx="32" ry="22" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5"/>
      <ellipse cx="58" cy="58" rx="18" ry="12" fill="#0284C7" fill-opacity="0.3"/>
      <circle cx="58" cy="58" r="5" fill="#0369A1"/>
    `,
  },
  {
    name: 'condition-grid-pain.png',
    bg: '#FFFBEB',
    border: '#FDE68A',
    accent: '#D97706',
    // Symptom radiation pulse
    svgInner: `
      <circle cx="60" cy="60" r="34" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3 3"/>
      <circle cx="60" cy="60" r="22" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
      <path d="M 60 48 L 60 64 M 60 68 L 60 72" stroke="#B45309" stroke-width="3" stroke-linecap="round"/>
    `,
  },
  {
    name: 'condition-grid-discharge.png',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    accent: '#7C3AED',
    // Milk duct / droplet
    svgInner: `
      <path d="M 60 36 C 50 50, 42 62, 42 70 C 42 80, 50 88, 60 88 C 70 88, 78 80, 78 70 C 78 62, 70 50, 60 36 Z" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2.5"/>
      <circle cx="56" cy="68" r="4" fill="#6D28D9"/>
    `,
  },
  {
    name: 'condition-grid-cysts.png',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    accent: '#059669',
    // Multi-cystic benign clusters
    svgInner: `
      <circle cx="48" cy="56" r="16" fill="#D1FAE5" stroke="#059669" stroke-width="2"/>
      <circle cx="70" cy="54" r="14" fill="#A7F3D0" stroke="#047857" stroke-width="2"/>
      <circle cx="58" cy="72" r="12" fill="#6EE7B7" stroke="#059669" stroke-width="2"/>
    `,
  },
  {
    name: 'condition-grid-cancer.png',
    bg: '#FFF1F2',
    border: '#FECDD3',
    accent: '#BE123C',
    // Spiculated margin / clinical oncology mark
    svgInner: `
      <circle cx="60" cy="60" r="32" fill="#FFE4E6" stroke="#E11D48" stroke-width="2"/>
      <path d="M 60 32 L 60 88 M 32 60 L 88 60 M 40 40 L 80 80 M 40 80 L 80 40" stroke="#BE123C" stroke-width="2" stroke-linecap="round"/>
      <circle cx="60" cy="60" r="12" fill="#9F1239"/>
    `,
  },
];

async function createIcons() {
  for (const item of icons) {
    const svg = `
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="32" fill="${item.bg}"/>
      <rect x="2" y="2" width="116" height="116" rx="30" fill="none" stroke="${item.border}" stroke-width="2.5"/>
      ${item.svgInner}
    </svg>
    `;

    const outPath = path.join('public/images/doctor/assets', item.name);
    await sharp(Buffer.from(svg))
      .resize(240, 240)
      .png()
      .toFile(outPath);

    console.log(`Generated: ${outPath}`);
  }
}

createIcons().catch(console.error);
