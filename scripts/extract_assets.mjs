import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = './public/images/doctor/assets';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const homeImg = './public/images/doctor/file_000000006690821192c8d129643f997a.png';
const aboutImg = './public/images/doctor/file_0000000009048208b8ee459950732187.png';
const appointImg = './public/images/doctor/file_00000000bfd882119547229f6f81ff2d.png';
const storiesImg = './public/images/doctor/file_0000000009988211a78a56e2d10ec9e0.png';

async function run() {
  console.log('Extracting visual assets with sharp...');
  
  // 1. Hero Doctor Portrait from Homepage (or Appointment page where it's 1536x1024 wide!)
  // In appointment page (1536x1024):
  // Let's get appointment metadata: width 1536, height 1024
  // Doctor in appointment page hero is on the right!
  await sharp(appointImg)
    .extract({ left: 1040, top: 80, width: 440, height: 260 })
    .toFile(path.join(outDir, 'hero-doctor-appoint.png'));

  // Hero Doctor from Homepage:
  await sharp(homeImg)
    .extract({ left: 430, top: 75, width: 320, height: 275 })
    .toFile(path.join(outDir, 'hero-doctor.png'));

  // 2. Early Detection ribbon woman (Homepage)
  await sharp(homeImg)
    .extract({ left: 470, top: 360, width: 285, height: 180 })
    .toFile(path.join(outDir, 'early-detection-woman.png'));

  // 3. Services 6 cards (Homepage: around y = 600 to 720)
  // Let's slice the 6 service images
  const serviceW = 110;
  const serviceH = 85;
  const serviceY = 615;
  await sharp(homeImg).extract({ left: 22, top: serviceY, width: serviceW, height: serviceH }).toFile(path.join(outDir, 'service-1.png'));
  await sharp(homeImg).extract({ left: 144, top: serviceY, width: serviceW, height: serviceH }).toFile(path.join(outDir, 'service-2.png'));
  await sharp(homeImg).extract({ left: 266, top: serviceY, width: serviceW, height: serviceH }).toFile(path.join(outDir, 'service-3.png'));
  await sharp(homeImg).extract({ left: 388, top: serviceY, width: serviceW, height: serviceH }).toFile(path.join(outDir, 'service-4.png'));
  await sharp(homeImg).extract({ left: 510, top: serviceY, width: serviceW, height: serviceH }).toFile(path.join(outDir, 'service-5.png'));
  await sharp(homeImg).extract({ left: 632, top: serviceY, width: serviceW, height: serviceH }).toFile(path.join(outDir, 'service-6.png'));

  // 4. Anatomy diagram (Homepage)
  await sharp(homeImg)
    .extract({ left: 250, top: 760, width: 270, height: 195 })
    .toFile(path.join(outDir, 'anatomy-diagram.png'));

  // 5. 4 Breast conditions (Homepage)
  await sharp(homeImg).extract({ left: 545, top: 790, width: 90, height: 60 }).toFile(path.join(outDir, 'condition-normal.png'));
  await sharp(homeImg).extract({ left: 645, top: 790, width: 90, height: 60 }).toFile(path.join(outDir, 'condition-benign.png'));
  await sharp(homeImg).extract({ left: 545, top: 865, width: 90, height: 60 }).toFile(path.join(outDir, 'condition-cancer.png'));
  await sharp(homeImg).extract({ left: 645, top: 865, width: 90, height: 60 }).toFile(path.join(outDir, 'condition-ductal.png'));

  // 6. Treatment options (Homepage)
  const treatW = 110;
  const treatH = 80;
  const treatY = 970;
  await sharp(homeImg).extract({ left: 266, top: treatY, width: treatW, height: treatH }).toFile(path.join(outDir, 'treatment-lumpectomy.png'));
  await sharp(homeImg).extract({ left: 388, top: treatY, width: treatW, height: treatH }).toFile(path.join(outDir, 'treatment-mastectomy.png'));
  await sharp(homeImg).extract({ left: 510, top: treatY, width: treatW, height: treatH }).toFile(path.join(outDir, 'treatment-reconstruction.png'));
  await sharp(homeImg).extract({ left: 632, top: treatY, width: treatW, height: treatH }).toFile(path.join(outDir, 'treatment-oncoplastic.png'));

  // 7. Doctor Consultation / Office (About & Home)
  await sharp(homeImg)
    .extract({ left: 20, top: 1100, width: 155, height: 150 })
    .toFile(path.join(outDir, 'doctor-office-home.png'));

  // In About Page: large consultation photo!
  await sharp(aboutImg)
    .extract({ left: 18, top: 350, width: 325, height: 215 })
    .toFile(path.join(outDir, 'doctor-consultation-about.png'));

  // 8. Clinic interior photos (About page: y ~ 1580)
  const clinicW = 168;
  const clinicH = 90;
  const clinicY = 1590;
  await sharp(aboutImg).extract({ left: 38, top: clinicY, width: clinicW, height: clinicH }).toFile(path.join(outDir, 'clinic-reception.png'));
  await sharp(aboutImg).extract({ left: 215, top: clinicY, width: clinicW, height: clinicH }).toFile(path.join(outDir, 'clinic-consultation.png'));
  await sharp(aboutImg).extract({ left: 392, top: clinicY, width: clinicW, height: clinicH }).toFile(path.join(outDir, 'clinic-mammography.png'));
  await sharp(aboutImg).extract({ left: 569, top: clinicY, width: clinicW, height: clinicH }).toFile(path.join(outDir, 'clinic-lounge.png'));

  // 9. Banner woman with scarf (Stories page & About page)
  await sharp(storiesImg)
    .extract({ left: 32, top: 505, width: 250, height: 125 })
    .toFile(path.join(outDir, 'banner-new-chapter.png'));

  // 10. CTA hope woman banner (Homepage bottom)
  await sharp(homeImg)
    .extract({ left: 0, top: 1795, width: 769, height: 80 })
    .toFile(path.join(outDir, 'cta-banner.png'));

  // 11. Appointment page clinic reception photo
  await sharp(appointImg)
    .extract({ left: 1060, top: 525, width: 375, height: 170 })
    .toFile(path.join(outDir, 'clinic-appoint-card.png'));

  // 12. Instagram cards (Homepage: y ~ 1420 to 1520)
  const instaW = 140;
  const instaH = 100;
  const instaY = 1435;
  await sharp(homeImg).extract({ left: 38, top: instaY, width: instaW, height: instaH }).toFile(path.join(outDir, 'insta-1.png'));
  await sharp(homeImg).extract({ left: 180, top: instaY, width: instaW, height: instaH }).toFile(path.join(outDir, 'insta-2.png'));
  await sharp(homeImg).extract({ left: 322, top: instaY, width: instaW, height: instaH }).toFile(path.join(outDir, 'insta-3.png'));
  await sharp(homeImg).extract({ left: 464, top: instaY, width: instaW, height: instaH }).toFile(path.join(outDir, 'insta-4.png'));
  await sharp(homeImg).extract({ left: 606, top: instaY, width: instaW, height: instaH }).toFile(path.join(outDir, 'insta-5.png'));

  // 13. Patient story avatars (Homepage: y ~ 1580)
  await sharp(homeImg).extract({ left: 45, top: 1585, width: 45, height: 45 }).toFile(path.join(outDir, 'patient-avatar-1.png'));
  await sharp(homeImg).extract({ left: 280, top: 1585, width: 45, height: 45 }).toFile(path.join(outDir, 'patient-avatar-2.png'));
  await sharp(homeImg).extract({ left: 515, top: 1585, width: 45, height: 45 }).toFile(path.join(outDir, 'patient-avatar-3.png'));

  // 14. Doctor Logo Ribbon (Navbar: top left)
  await sharp(homeImg).extract({ left: 35, top: 22, width: 35, height: 40 }).toFile(path.join(outDir, 'pink-ribbon-logo.png'));

  // 15. Stronger Women Healthier Tomorrows Floating Badge (Hero right)
  await sharp(homeImg).extract({ left: 605, top: 275, width: 145, height: 60 }).toFile(path.join(outDir, 'hero-badge-ribbon.png'));

  console.log('All visual assets successfully extracted!');
}

run().catch(console.error);
