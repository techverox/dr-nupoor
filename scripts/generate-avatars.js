const sharp = require('sharp');
const path = require('path');

const avatars = [
  {
    name: 'patient-avatar-4.png',
    bg: '#FDF2F4',
    border: '#F5CAD5',
    accent: '#9B2846',
    hair: '#5A1B2D',
    skin: '#FCD7C8',
  },
  {
    name: 'patient-avatar-5.png',
    bg: '#F0F9FF',
    border: '#BAE6FD',
    accent: '#0284C7',
    hair: '#1E293B',
    skin: '#FBE2D5',
  },
  {
    name: 'patient-avatar-6.png',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    accent: '#7C3AED',
    hair: '#4C1D95',
    skin: '#FDDEC8',
  },
  {
    name: 'patient-avatar-7.png',
    bg: '#FDF4FF',
    border: '#F5D0FE',
    accent: '#C026D3',
    hair: '#701A75',
    skin: '#FEE2D5',
  },
  {
    name: 'patient-avatar-8.png',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    accent: '#059669',
    hair: '#064E3B',
    skin: '#FDE4D0',
  },
];

async function createAvatars() {
  for (const a of avatars) {
    const svg = `
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" fill="${a.bg}" stroke="${a.border}" stroke-width="3"/>
      <!-- Body / Shoulders -->
      <path d="M 24 116 C 24 92, 40 82, 60 82 C 80 82, 96 92, 96 116 Z" fill="${a.accent}" />
      <!-- Neck -->
      <rect x="52" y="66" width="16" height="20" rx="4" fill="${a.skin}" />
      <!-- Head -->
      <circle cx="60" cy="50" r="22" fill="${a.skin}" />
      <!-- Hair -->
      <path d="M 38 52 C 38 30, 48 24, 60 24 C 72 24, 82 30, 82 52 C 82 46, 76 34, 60 34 C 44 34, 38 46, 38 52 Z" fill="${a.hair}" />
      <!-- Gentle feature -->
      <path d="M 52 56 Q 60 62 68 56" stroke="${a.hair}" stroke-width="2" fill="none" stroke-linecap="round" />
    </svg>
    `;

    const outPath = path.join('public/images/doctor/assets', a.name);
    await sharp(Buffer.from(svg))
      .resize(120, 120)
      .png()
      .toFile(outPath);

    console.log(`Generated: ${outPath}`);
  }
}

createAvatars().catch(console.error);
