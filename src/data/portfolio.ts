import { PortfolioItem } from "@/types";

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "portfolio-1",
    title: "Early Stage Breast Cancer Treated with Oncoplastic Breast Conservation",
    slug: "oncoplastic-bcs-patient-care-journey",
    clientName: "Patient M.S., 42",
    industry: "Surgical Oncology",
    category: "Oncoplastic Surgery",
    categoryKey: "oncoplastic",
    authorName: "Dr. Noopur Patel",
    authorRole: "Breast Cancer Surgeon",
    authorAvatar: "/images/doctor/assets/hero-doctor.png",
    heroImage: "/images/doctor/assets/service-2.png",
    servicesDelivered: ["Triple Assessment", "Oncoplastic Breast Conservation (BCS)", "Sentinel Lymph Node Biopsy"],
    shortDescription:
      "A 42-year-old female diagnosed with early-stage invasive breast carcinoma successfully treated with complete clear margins and excellent cosmetic symmetry preservation.",
    challenge:
      "Patient presented with a painless lump in the upper outer quadrant of the left breast. Routine mammography and ultrasound-guided core biopsy confirmed early-stage ductal malignancy. The primary concern was achieving complete oncologic safety while preserving natural breast shape.",
    strategy:
      "Dr. Noopur Patel formulated an individualized oncoplastic breast conservation surgical plan combined with sentinel lymph node biopsy, avoiding full mastectomy and minimizing arm lymphedema risks.",
    execution:
      "Conducted wide local excision with clear histological margins and immediate volume displacement oncoplastic rearrangement. Frozen section assessment verified clear margin boundaries intraoperatively.",
    results:
      "Complete cancer clearance achieved with clear surgical margins. Sentinel nodes negative for metastasis. Full recovery achieved within two weeks with remarkable aesthetic breast symmetry and zero contour deformities.",
    testimonialQuote:
      "Dr. Noopur Patel explained every step with so much reassurance. Her surgical skill gave me full cancer clearance and preserved my natural look. I am forever grateful for her compassionate care.",
    keyTakeaway:
      "Early detection combined with oncoplastic surgical precision provides optimal cancer clearance while preserving patient body image and quality of life.",
    beforePoints: [
      "Palpable 1.8 cm breast lump identified during routine clinical screening",
      "Immense patient anxiety regarding potential need for complete mastectomy",
      "Fear of visible chest contour deformities affecting daily life",
      "Need for rapid diagnostic clarity and multidisciplinary planning",
    ],
    afterPoints: [
      "Complete oncologic resection with verified microscopic clear margins",
      "Preservation of natural breast shape and symmetry with oncoplastic techniques",
      "Minimal postoperative discomfort and prompt return to normal routines in 10 days",
      "Structured survivorship monitoring protocol established with annual surveillance",
    ],
    executionMilestones: [
      "Day 1: Comprehensive clinical examination and high-resolution digital imaging",
      "Day 3: Image-guided core biopsy confirming early-stage clear histology",
      "Day 7: Successful oncoplastic breast conservation with sentinel lymph node biopsy",
      "Day 14: Clear pathology confirmed and smooth outpatient recovery review",
    ],
    metrics: [
      { label: "Cancer Clearance", value: "100%", description: "Verified negative margins" },
      { label: "Recovery Time", value: "10 Days", description: "Return to daily activities" },
      { label: "Symmetry Score", value: "Optimal", description: "Natural contour preservation" },
      { label: "Lymph Node Status", value: "Clear", description: "SLNB negative for metastasis" },
    ],
    tags: ["Oncoplastic Surgery", "BCS", "Early Detection", "Breast Preservation"],
    isFeatured: true,
    isPublished: true,
    order: 1,
    seo: {
      title: "Oncoplastic BCS Patient Care Journey | Dr. Noopur Patel",
      description: "Clinical case review of successful oncoplastic breast conservation surgery by Dr. Noopur Patel at Marengo CIMS Hospital, Ahmedabad.",
      slug: "oncoplastic-bcs-patient-care-journey",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "portfolio-2",
    title: "Minimally Invasive Removal of Symptomatic Giant Fibroadenoma",
    slug: "benign-fibroadenoma-treatment-journey",
    clientName: "Patient P.K., 26",
    industry: "Benign Breast Care",
    category: "Benign Breast Conditions",
    categoryKey: "benign",
    authorName: "Dr. Noopur Patel",
    authorRole: "Breast Cancer Surgeon",
    authorAvatar: "/images/doctor/assets/hero-doctor.png",
    heroImage: "/images/doctor/assets/service-5.png",
    servicesDelivered: ["Ultrasound Evaluation", "Core Needle Biopsy", "Cosmetic Excision"],
    shortDescription:
      "A young professional presented with an enlarging, symptomatic 4.5 cm benign lump. Successfully excised via a concealed sub-areolar cosmetic incision.",
    challenge:
      "The rapid growth of the mass over four months created significant discomfort and emotional distress. Given the patient's young age, preventing visible surface scars was paramount.",
    strategy:
      "High-resolution ultrasound confirmed features consistent with a giant fibroadenoma, confirmed benign on biopsy. Dr. Patel planned an aesthetic peri-areolar incision to conceal the surgical scar naturally.",
    execution:
      "Performed gentle circumareolar enucleation of the benign lesion under local anesthesia, meticulously preserving overlying dermis and surrounding glandular architecture.",
    results:
      "Complete lesion removal with histological benign confirmation. The incision healed with a virtually invisible scar along the areolar border and zero loss of breast volume.",
    testimonialQuote:
      "Dr. Patel was so calm and kind. The procedure was gentle, completely painless, and left no visible scar. I cannot thank her enough for lifting all my worries.",
    keyTakeaway:
      "Accurate benign diagnosis coupled with cosmetic surgical incision techniques ensures total relief without visible scarring.",
    beforePoints: [
      "Rapidly enlarging 4.5 cm breast mass causing discomfort when lying down",
      "Heightened emotional stress and fear of cancer diagnosis",
      "Concern regarding noticeable scarring from surgical intervention",
      "Interference with daily athletic activities and clothing comfort",
    ],
    afterPoints: [
      "Definitive benign confirmation with complete relief from anxiety",
      "Discreet peri-areolar incision line that blends invisibly with natural skin folds",
      "Immediate alleviation of pressure and local breast tenderness",
      "Normal activities resumed within 48 hours post-procedure",
    ],
    executionMilestones: [
      "Day 1: In-clinic physical palpation and targeted breast ultrasonography",
      "Day 2: Rapid biopsy confirmation of benign giant fibroadenoma",
      "Day 5: Gentle aesthetic surgical excision under local anesthesia",
      "Day 10: Suture line healed with unblemished cosmetic outcome",
    ],
    metrics: [
      { label: "Lesion Size", value: "4.5 cm", description: "Completely enucleated" },
      { label: "Cosmetic Scar", value: "Concealed", description: "Natural areolar margin" },
      { label: "Downtime", value: "48 Hours", description: "Quick return to work" },
      { label: "Histology", value: "Benign", description: "Non-cancerous confirmation" },
    ],
    tags: ["Benign Breast Disease", "Fibroadenoma", "Cosmetic Breast Surgery", "Ultrasound"],
    isFeatured: true,
    isPublished: true,
    order: 2,
    seo: {
      title: "Benign Fibroadenoma Treatment Journey | Dr. Noopur Patel",
      description: "How Dr. Noopur Patel successfully treated a giant fibroadenoma using aesthetic incision techniques in Ahmedabad.",
      slug: "benign-fibroadenoma-treatment-journey",
    },
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "portfolio-3",
    title: "Skin-Sparing Mastectomy with Immediate Autologous Flap Reconstruction",
    slug: "skin-sparing-mastectomy-reconstruction",
    clientName: "Patient R.J., 51",
    industry: "Reconstructive Breast Oncology",
    category: "Breast Reconstruction",
    categoryKey: "reconstruction",
    authorName: "Dr. Noopur Patel",
    authorRole: "Breast Cancer Surgeon",
    authorAvatar: "/images/doctor/assets/hero-doctor.png",
    heroImage: "/images/doctor/assets/service-4.png",
    servicesDelivered: ["Multidisciplinary Tumor Board", "Skin-Sparing Mastectomy", "Immediate Reconstruction"],
    shortDescription:
      "Multicentric breast cancer managed with skin-sparing mastectomy and immediate autologous reconstruction, achieving complete cancer control without chest wall flattening.",
    challenge:
      "Patient had extensive multicentric lobular carcinoma across two quadrants, making breast conservation unsuitable. The prospect of living without a breast was profoundly distressing to the patient.",
    strategy:
      "Dr. Patel coordinated a unified single-stage procedure: skin-sparing mastectomy to clear all cancer tissue while preserving the natural skin envelope, combined with immediate reconstruction.",
    execution:
      "Complete cancer clearance accomplished with negative margins. Multidisciplinary reconstruction immediately restored natural breast mound volume and warmth under the same anesthesia session.",
    results:
      "Patient woke up from surgery with a fully formed, soft, and symmetrical breast. Postoperative recovery proceeded smoothly without wound complications.",
    testimonialQuote:
      "Waking up from mastectomy with my breast form already restored gave me so much emotional strength. Dr. Noopur Patel cared for my mental and physical health equally.",
    keyTakeaway:
      "Immediate reconstruction transforms the surgical experience for patients requiring mastectomy, fostering faster emotional recovery and lifelong confidence.",
    beforePoints: [
      "Multicentric tumor distribution requiring complete mastectomy",
      "Severe apprehension regarding traditional chest wall flattening",
      "Desire to complete both cancer surgery and reconstruction in a single procedure",
      "Need for advanced microvascular surgical team coordination",
    ],
    afterPoints: [
      "100% oncologic cancer clearance achieved with clear skin margins",
      "Preservation of native skin envelope providing natural breast contour",
      "Avoided need for a secondary delayed reconstructive surgery",
      "High patient satisfaction and restored body image confidence",
    ],
    executionMilestones: [
      "Day 1: Comprehensive multidisciplinary oncologic consultation",
      "Day 4: Preoperative surgical mapping and anatomical planning",
      "Day 8: Combined single-stage skin-sparing mastectomy and reconstruction",
      "Day 21: Full recovery review with complete healing of surgical flaps",
    ],
    metrics: [
      { label: "Margin Clearance", value: "Clear", description: "Complete oncologic excision" },
      { label: "Surgeries Needed", value: "Single Stage", description: "Immediate reconstruction" },
      { label: "Patient NPS", value: "100%", description: "Verified patient comfort" },
      { label: "Hospital Stay", value: "3 Days", description: "Smooth discharge" },
    ],
    tags: ["Breast Reconstruction", "Skin-Sparing Mastectomy", "Oncology", "Survivorship"],
    isFeatured: true,
    isPublished: true,
    order: 3,
    seo: {
      title: "Immediate Breast Reconstruction Journey | Dr. Noopur Patel",
      description: "Single-stage skin-sparing mastectomy and immediate reconstruction case study by Dr. Noopur Patel at Marengo CIMS Hospital.",
      slug: "skin-sparing-mastectomy-reconstruction",
    },
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
];
