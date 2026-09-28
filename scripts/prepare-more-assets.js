const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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
  await convertPhoto(
    'public/images/doctor/assets/Photos/Mentors/Camp and awareness_/1000000445.jpg',
    'public/images/doctor/optimized/blog-screening-awareness.webp',
    800,
    500
  );
  await convertPhoto(
    'public/images/doctor/assets/Photos/Myself/1000008235.jpg',
    'public/images/doctor/optimized/blog-benign-lumps.webp',
    800,
    500
  );
  await convertPhoto(
    'public/images/doctor/assets/Photos/Mentors/Camp and awareness_/1000069581.jpg',
    'public/images/doctor/optimized/blog-mammography-guide.webp',
    800,
    500
  );
  await convertPhoto(
    'public/images/doctor/assets/Photos/Myself/1000008237.jpg',
    'public/images/doctor/optimized/clinic-diagnostic-care.webp',
    800,
    500
  );
  await convertPhoto(
    'public/images/doctor/assets/Photos/Myself/1000008230.jpg',
    'public/images/doctor/optimized/clinic-reception-facility.webp',
    800,
    450
  );
  await convertPhoto(
    'public/images/doctor/assets/Photos/Myself/1000008232.jpg',
    'public/images/doctor/optimized/about-clinical-excellence.webp',
    800,
    600
  );
  console.log('Done preparing more unique assets!');
}

run().catch(console.error);
