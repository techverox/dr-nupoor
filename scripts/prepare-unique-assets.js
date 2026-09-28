const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createAvatar(initials, bgColor, textColor, outputPath) {
  const svg = `
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgColor[0]}" />
        <stop offset="100%" stop-color="${bgColor[1]}" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="100" fill="url(#grad-${initials})" />
    <circle cx="100" cy="78" r="38" fill="white" fill-opacity="0.85" />
    <path d="M 35 178 C 35 125, 165 125, 165 178 Z" fill="white" fill-opacity="0.85" />
    <text x="100" y="88" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="${textColor}" text-anchor="middle">${initials}</text>
  </svg>
  `;
  await sharp(Buffer.from(svg)).png().toFile(outputPath);
  console.log('Created avatar:', outputPath);
}

async function convertPhoto(srcRelative, destRelative, width = 800, height = 500) {
  const src = path.join(__dirname, '..', srcRelative);
  const dest = path.join(__dirname, '..', destRelative);
  if (!fs.existsSync(src)) {
    console.warn('Source file does not exist:', src);
    return;
  }
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await sharp(src)
    .resize(width, height, { fit: 'cover', position: 'entropy' })
    .webp({ quality: 85 })
    .toFile(dest);
  console.log('Optimized photo:', destRelative);
}

async function run() {
  const assetsDir = path.join(__dirname, '../public/images/doctor/assets');
  const optDir = path.join(__dirname, '../public/images/doctor/optimized');

  // 1. Patient Avatars 7 through 11 for Patient Stories
  await createAvatar('RG', ['#fbcfe8', '#f472b6'], '#9d174d', path.join(assetsDir, 'patient-avatar-7.png'));
  await createAvatar('SD', ['#fed7aa', '#fb923c'], '#c2410c', path.join(assetsDir, 'patient-avatar-8.png'));
  await createAvatar('MR', ['#e9d5ff', '#c084fc'], '#7e22ce', path.join(assetsDir, 'patient-avatar-9.png'));
  await createAvatar('TK', ['#ccfbf1', '#2dd4bf'], '#0f766e', path.join(assetsDir, 'patient-avatar-10.png'));
  await createAvatar('PL', ['#fef08a', '#eab308'], '#a16207', path.join(assetsDir, 'patient-avatar-11.png'));

  // 2. Team member avatars
  await createAvatar('PS', ['#dbeafe', '#60a5fa'], '#1e40af', path.join(assetsDir, 'team-coordinator-priya.png'));
  await createAvatar('SJ', ['#ede9fe', '#a78bfa'], '#5b21b6', path.join(assetsDir, 'team-coordinator-sneha.png'));

  // 3. Fallback submit avatar
  await createAvatar('PT', ['#fce7f3', '#f43f5e'], '#be123c', path.join(assetsDir, 'patient-avatar-submit.png'));

  // 4. Video Story Thumbnails (from real photos)
  await convertPhoto(
    'public/images/doctor/assets/Photos/Support group and activities_/1000008033.jpg',
    'public/images/doctor/optimized/video-story-priya.webp',
    640,
    360
  );
  await convertPhoto(
    'public/images/doctor/assets/Photos/Mentors/Camp and awareness_/1000000443.jpg',
    'public/images/doctor/optimized/video-story-ananya.webp',
    640,
    360
  );
  await convertPhoto(
    'public/images/doctor/assets/Photos/Support group and activities_/1000082876.jpg',
    'public/images/doctor/optimized/video-story-meenakshi.webp',
    640,
    360
  );

  // 5. Dedicated Surgical / Treatment Photos for BreastCancerTreatments.tsx
  await convertPhoto(
    'public/images/doctor/assets/Photos/MDT_/1000006063.jpg',
    'public/images/doctor/optimized/treatment-oncoplastic-surgical.webp',
    640,
    420
  );
  await convertPhoto(
    'public/images/doctor/assets/Photos/MDT_/1000007229.jpg',
    'public/images/doctor/optimized/treatment-reconstruction-latissimus.webp',
    640,
    420
  );
  await convertPhoto(
    'public/images/doctor/assets/Photos/MDT_/1000008025.jpg',
    'public/images/doctor/optimized/treatment-sentinel-node.webp',
    640,
    420
  );
  await convertPhoto(
    'public/images/doctor/assets/Photos/MDT_/1000006064.jpg',
    'public/images/doctor/optimized/treatment-mastectomy-care.webp',
    640,
    420
  );

  // 6. Dedicated Blog Default Hero Fallback
  await convertPhoto(
    'public/images/doctor/assets/Photos/Mentors/Camp and awareness_/1000011108.jpg',
    'public/images/doctor/optimized/blog-default-hero.webp',
    1200,
    630
  );

  console.log('All unique assets prepared successfully!');
}

run().catch(console.error);
