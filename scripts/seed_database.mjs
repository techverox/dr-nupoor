import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCe51XQ7Dse5MyJlH6IxbS0NauLUnp_UvM",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dr-noopur-website.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dr-noopur-website",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dr-noopur-website.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "128502434880",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:128502434880:web:f7b64716a0351b5c5ce3a5",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-8FB84595QK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const services = [
  {
    id: "service-1",
    title: "Breast Cancer Diagnosis & Treatment",
    subtitle: "Precision oncologic evaluation & comprehensive surgical care",
    slug: "breast-cancer-diagnosis-and-treatment",
    shortDescription: "Accurate diagnostic assessment, mammography & biopsy evaluation, and individualized surgical management for breast malignancies.",
    detailedDescription: "A complete multidisciplinary approach to breast cancer diagnosis and treatment. Dr. Noopur Patel conducts thorough clinical examinations, reviews advanced imaging and pathology, and crafts personalized surgical care plans tailored to each patient's stage and personal goals.",
    order: 1,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-1.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "service-2",
    title: "Oncoplastic Breast Surgery",
    subtitle: "Harmonizing cancer clearance with aesthetic breast preservation",
    slug: "oncoplastic-breast-surgery",
    shortDescription: "Specialized surgical techniques that combine complete cancer removal with plastic surgery principles to preserve natural breast shape.",
    detailedDescription: "Oncoplastic breast surgery merges optimal oncologic outcomes with reconstructive principles. Rather than removing tissue and leaving a contour deformity, Dr. Patel utilizes tissue rearrangement techniques to maintain breast symmetry, contour, and natural appearance.",
    order: 2,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-2.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "service-3",
    title: "Breast Conservation Surgery (BCS)",
    subtitle: "Targeted tumor resection preserving the natural breast",
    slug: "breast-conservation-surgery",
    shortDescription: "Lumpectomy and partial mastectomy procedures designed to remove the tumor with clear margins while preserving the breast.",
    detailedDescription: "For suitable clinical stages, breast conservation surgery allows patients to achieve the same long-term oncologic safety as mastectomy while keeping their natural breast. Combined with modern radiotherapy planning and sentinel node biopsy, BCS is a cornerstone of modern breast cancer management.",
    order: 3,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-3.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "service-4",
    title: "Breast Reconstruction Surgery",
    subtitle: "Restoring form, symmetry and self-confidence after mastectomy",
    slug: "breast-reconstruction-surgery",
    shortDescription: "Immediate and delayed breast reconstruction options using implants or autologous tissue flaps.",
    detailedDescription: "Reconstruction is a personal choice for women undergoing mastectomy. Dr. Noopur Patel collaborates closely with multidisciplinary reconstructive surgeons to offer immediate (at the time of cancer surgery) or delayed reconstruction options tailored to patient anatomy and radiation requirements.",
    order: 4,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-4.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "service-5",
    title: "Benign Breast Conditions",
    subtitle: "Accurate evaluation and management of non-cancerous breast concerns",
    slug: "benign-breast-conditions",
    shortDescription: "Expert diagnosis and gentle treatment for fibroadenomas, breast cysts, mastitis, nipple discharge, and breast pain.",
    detailedDescription: "Most breast lumps and symptoms are benign. Dr. Noopur Patel provides thorough clinical evaluation, ultrasound-guided assessment, and reassurance or minimally invasive excision when necessary for symptomatic or enlarging lesions.",
    order: 5,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-5.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "service-6",
    title: "Follow-up & Long-term Care",
    subtitle: "Structured survivorship surveillance and compassionate ongoing support",
    slug: "follow-up-and-long-term-care",
    shortDescription: "Systematic post-treatment monitoring, annual surveillance mammograms, lymphedema prevention, and survivorship guidance.",
    detailedDescription: "Care does not end after surgery. Dr. Patel provides a structured follow-up protocol with regular physical exams, scheduled surveillance imaging, lifestyle counseling, and dedicated support for physical and emotional well-being.",
    order: 6,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-6.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const faqs = [
  {
    id: "faq-1",
    question: "When should I get a breast cancer screening?",
    answer: "Regular breast cancer screening is recommended for women starting at age 40, or earlier if you have a family history or higher risk factors. Clinical breast exams and digital mammography are the gold standard for early detection.",
    category: "Screening & Prevention",
    order: 1,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "faq-2",
    question: "Is a breast lump always cancerous?",
    answer: "No, the vast majority (over 80%) of breast lumps are benign (non-cancerous), such as fibroadenomas or fluid-filled cysts. However, any new or changing lump requires a professional clinical examination and imaging evaluation.",
    category: "General Breast Health",
    order: 2,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "faq-3",
    question: "What is oncoplastic breast surgery?",
    answer: "Oncoplastic breast surgery combines oncologic principles of cancer removal with plastic surgery techniques to preserve or restore the natural appearance, symmetry, and contour of the breast.",
    category: "Surgical Options",
    order: 3,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "faq-4",
    question: "How long is the recovery after breast surgery?",
    answer: "Recovery varies depending on the type of procedure. For breast-conserving surgery (lumpectomy), most patients resume light activities within 1 to 2 weeks. Mastectomy or reconstruction may require 3 to 6 weeks for complete recovery.",
    category: "Recovery & Care",
    order: 4,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "faq-5",
    question: "Do you offer genetic counselling?",
    answer: "Yes, we evaluate family risk factors and coordinate genetic testing (such as BRCA1/BRCA2) when clinically indicated, helping patients and families make informed decisions about surveillance and risk reduction.",
    category: "Screening & Prevention",
    order: 5,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const testimonials = [
  {
    id: "test-1",
    clientName: "Patient from Ahmedabad",
    clientRole: "Early Detection • Verified Consent",
    testimonial: "Dr. Noopur Patel made a difficult journey feel less overwhelming. Her clarity, kindness and confidence gave me so much strength during my diagnosis and treatment.",
    rating: 5,
    isPublished: true,
    order: 1,
    clientAvatar: "/images/doctor/assets/patient-avatar-1.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test-2",
    clientName: "Patient from Gandhinagar",
    clientRole: "Benign Breast Condition • Verified Consent",
    testimonial: "I felt heard, supported and well cared for throughout my treatment. Highly recommend Dr. Patel to anyone seeking expert, compassionate breast care in Gujarat.",
    rating: 5,
    isPublished: true,
    order: 2,
    clientAvatar: "/images/doctor/assets/patient-avatar-2.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test-3",
    clientName: "Patient from Ahmedabad",
    clientRole: "Oncoplastic Surgery • Verified Consent",
    testimonial: "Excellent doctor with a very compassionate approach. She explains surgical options thoroughly and ensures you are completely comfortable with the care plan.",
    rating: 5,
    isPublished: true,
    order: 3,
    clientAvatar: "/images/doctor/assets/patient-avatar-3.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const siteSettings = {
  id: "global",
  siteName: "Dr. Noopur Patel",
  tagline: "Breast Cancer Surgeon & Associate Consultant in Surgical Breast Oncology",
  hospital: "Marengo CIMS Hospital, Ahmedabad, Gujarat, India",
  address: "Off Science City Road, Sola, Ahmedabad, Gujarat 380060",
  phone: "+91 98765 43210",
  email: "dr.noopurpatel@gmail.com",
  timings: "Monday - Saturday: 10:00 AM - 6:00 PM",
  whatsapp: "+91 98765 43210",
  updatedAt: new Date().toISOString(),
};

const adminUser = {
  id: "admin-noopur-patel",
  email: "admin@noopur.com",
  displayName: "Dr. Noopur Patel Admin",
  roleId: "super_admin",
  roleName: "Super Administrator",
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export async function seedAll() {
  console.log("Starting Firestore database seeding for dr-noopur-website...");

  try {
    for (const service of services) {
      await setDoc(doc(db, "services", service.id), service);
      console.log(`✓ Seeded service: ${service.title}`);
    }

    for (const faq of faqs) {
      await setDoc(doc(db, "faqs", faq.id), faq);
      console.log(`✓ Seeded faq: ${faq.question}`);
    }

    for (const test of testimonials) {
      await setDoc(doc(db, "testimonials", test.id), test);
      console.log(`✓ Seeded testimonial: ${test.clientName}`);
    }

    await setDoc(doc(db, "siteSettings", siteSettings.id), siteSettings);
    console.log("✓ Seeded siteSettings");

    await setDoc(doc(db, "adminUsers", adminUser.id), adminUser);
    console.log("✓ Seeded adminUser: admin@noopur.com");

    console.log("\n==============================================");
    console.log("SUCCESS: Firestore Database fully seeded!");
    console.log("==============================================");
  } catch (error) {
    console.error("Firestore seeding notice:", error.message);
  }
}

if (process.argv[1]?.endsWith("seed_database.mjs")) {
  seedAll();
}
