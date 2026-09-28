const path = require('path');
const fs = require('fs');

async function run() {
  const sharp = require('sharp');
  const src = path.join(__dirname, '../public/images/doctor/assets/Photos/Myself/1db1c4b8-abfb-4fe4-98ca-10f34bbda72e.jpg');
  const outDir = path.join(__dirname, '../public/images/doctor/optimized');

  if (!fs.existsSync(src)) {
    console.error('Source not found:', src);
    return;
  }

  const meta = await sharp(src).metadata();
  console.log('Original dimensions:', meta.width, meta.height);

  // 1. Web / Desktop Hero (Portrait 3:4 with ample headroom)
  await sharp(src)
    .rotate()
    .resize({ width: 1200, height: 1600, fit: 'cover', position: 'top' })
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'dr-nupur-hero-web.webp'));

  // 2. Mobile Hero (upper-torso & face focus, 900x1000)
  await sharp(src)
    .rotate()
    .resize({ width: 900, height: 1000, fit: 'cover', position: 'top' })
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'dr-nupur-hero-mobile.webp'));

  // 3. Full original aspect ratio WebP (clean, uncropped)
  await sharp(src)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'dr-nupur-hero-full.webp'));

  console.log('All hero WebP assets created successfully!');
}

run().catch(console.error);
