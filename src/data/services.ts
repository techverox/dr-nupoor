import { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "service-1",
    title: "Breast Cancer Diagnosis & Treatment",
    subtitle: "Precision oncologic evaluation & comprehensive surgical care",
    slug: "breast-cancer-diagnosis-and-treatment",
    shortDescription:
      "Accurate diagnostic assessment, mammography & biopsy evaluation, and individualized surgical management for breast malignancies.",
    detailedDescription:
      "A complete multidisciplinary approach to breast cancer diagnosis and treatment. Dr. Noopur Patel conducts thorough clinical examinations, reviews advanced imaging and pathology, and crafts personalized surgical care plans tailored to each patient's stage and personal goals.",
    problemStatement:
      "A new breast symptom, abnormal mammogram, or cancer diagnosis can create anxiety and uncertainty regarding next clinical steps.",
    solutionStatement:
      "Compassionate, timely, and evidence-based diagnostic pathways with transparent explanations of staging, surgical options, and care coordination.",
    outcomeStatement:
      "Clear clinical roadmap, optimal oncologic clearance, and holistic guidance through every stage of treatment.",
    order: 1,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-1.png",
    capabilities: [
      {
        title: "Triple Assessment",
        description: "Clinical breast examination, digital mammography/ultrasound correlation, and image-guided core biopsy.",
      },
      {
        title: "Multidisciplinary Tumor Board Coordination",
        description: "Collaborative staging and treatment planning alongside medical oncologists and radiation specialists.",
      },
      {
        title: "Sentinel Lymph Node Biopsy (SLNB)",
        description: "Targeted lymph node evaluation to minimize axillary dissection and decrease lymphedema risk.",
      },
      {
        title: "Personalized Surgical Planning",
        description: "Evidence-based surgical decision making between breast conservation and mastectomy.",
      },
    ],
    benefits: [
      {
        title: "Early Stage Precision",
        description: "Detection and intervention at the earliest possible stage to optimize long-term outcomes.",
      },
      {
        title: "Clear Communication",
        description: "Thorough, empathetic consultations that empower patients and families with knowledge.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-2",
    title: "Oncoplastic Breast Surgery",
    subtitle: "Harmonizing cancer clearance with aesthetic breast preservation",
    slug: "oncoplastic-breast-surgery",
    shortDescription:
      "Specialized surgical techniques that combine complete cancer removal with plastic surgery principles to preserve natural breast shape.",
    detailedDescription:
      "Oncoplastic breast surgery unites the rigorous standards of surgical oncology with delicate plastic and reconstructive techniques. This allows Dr. Noopur Patel to excise larger or complex tumors while maintaining natural contour, symmetry, and breast shape.",
    problemStatement:
      "Conventional surgery can sometimes lead to breast deformities, asymmetry, or tissue indentation after tumor excision.",
    solutionStatement:
      "Advanced oncoplastic tissue rearrangement and volume displacement techniques designed to optimize both oncological safety and cosmetic appearance.",
    outcomeStatement:
      "Clean surgical margins with preserved body confidence, symmetry, and natural breast contour.",
    order: 2,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-2.png",
    capabilities: [
      {
        title: "Volume Displacement Techniques",
        description: "Local glandular flaps and reshaping to fill surgical defects seamlessly.",
      },
      {
        title: "Therapeutic Mammoplasty",
        description: "Combining breast reduction/lift with wide tumor excision for larger breasts.",
      },
      {
        title: "Contralateral Symmetry Procedures",
        description: "Balancing surgery on the opposite breast when indicated to maintain symmetry.",
      },
    ],
    benefits: [
      {
        title: "Preserved Natural Aesthetics",
        description: "Avoids post-surgical cosmetic defects without compromising cancer safety.",
      },
      {
        title: "Restored Emotional Confidence",
        description: "Supports patient body image and emotional well-being throughout recovery.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-3",
    title: "Breast Conservation Surgery (BCS)",
    subtitle: "Targeted lumpectomy preserving healthy breast tissue",
    slug: "breast-conservation-surgery-bcs",
    shortDescription:
      "Surgical removal of the tumor with a rim of healthy tissue, preserving the maximum amount of natural breast tissue.",
    detailedDescription:
      "Breast Conservation Surgery (lumpectomy or partial mastectomy) is an established, evidence-based standard of care for suitable early-stage breast cancers. The aim is to completely remove the cancer while preserving the natural appearance of the breast.",
    problemStatement:
      "Many patients mistakenly believe that an entire breast must always be removed to treat breast cancer.",
    solutionStatement:
      "Clinical evidence confirms that BCS followed by radiotherapy yields survival rates equivalent to total mastectomy in eligible patients.",
    outcomeStatement:
      "High cure rates with minimal tissue loss and faster functional physical recovery.",
    order: 3,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-3.png",
    capabilities: [
      {
        title: "Wide Local Excision",
        description: "Precise margin-guided tumor excision with aesthetic incision placement.",
      },
      {
        title: "Hidden Scar Techniques",
        description: "Strategically placed incisions along the natural folds, areola border, or axilla.",
      },
      {
        title: "Specimen Radiography",
        description: "Intraoperative confirmation of complete lesion removal and margin clearance.",
      },
    ],
    benefits: [
      {
        title: "Less Invasive Recovery",
        description: "Shorter hospital stay and quicker return to regular daily routines.",
      },
      {
        title: "Maximized Tissue Preservation",
        description: "Maintains natural breast sensation and form.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-4",
    title: "Breast Reconstruction Surgery",
    subtitle: "Immediate and delayed reconstructive options",
    slug: "breast-reconstruction-surgery",
    shortDescription:
      "Rebuilding the breast mound following mastectomy using advanced implant-based or autologous tissue flap procedures.",
    detailedDescription:
      "For women who require or choose mastectomy, breast reconstruction restores breast form, volume, and symmetry. Dr. Noopur Patel discusses all options—including immediate reconstruction at the time of mastectomy or delayed reconstruction after adjuvant therapy.",
    problemStatement:
      "Losing a breast to cancer can cause profound physical and emotional distress for women.",
    solutionStatement:
      "Comprehensive reconstructive planning tailored to individual anatomy, body habitus, and treatment timelines.",
    outcomeStatement:
      "A renewed sense of wholeness, restored clothing fit, and empowered survivorship.",
    order: 4,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-4.png",
    capabilities: [
      {
        title: "Implant-Based Reconstruction",
        description: "Utilizing modern cohesive silicone gel implants or tissue expanders.",
      },
      {
        title: "Autologous Flap Reconstruction",
        description: "Reconstructing the breast using the patient's own tissue (LD or abdominal flaps).",
      },
      {
        title: "Nipple-Sparing Mastectomy",
        description: "Preserving the patient's natural skin envelope and nipple-areola complex when clinically safe.",
      },
    ],
    benefits: [
      {
        title: "Immediate Rebuilding",
        description: "Waking up from surgery with a restored breast mound whenever feasible.",
      },
      {
        title: "Lifelong Symmetry",
        description: "Restores balance in clothing and daily physical movement.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-5",
    title: "Benign Breast Conditions",
    subtitle: "Evaluation and management of non-cancerous breast concerns",
    slug: "benign-breast-conditions",
    shortDescription:
      "Comprehensive assessment and gentle treatment for fibroadenomas, breast cysts, mastitis, breast pain, and nipple discharge.",
    detailedDescription:
      "The vast majority of breast symptoms and lumps are non-cancerous. Dr. Noopur Patel provides thorough, reassuring clinical evaluations for common conditions such as fibroadenomas, cysts, cyclical mastalgia (breast pain), and benign nipple discharge.",
    problemStatement:
      "Discovering a breast lump causes immediate anxiety, even though 80%+ of lumps are entirely benign.",
    solutionStatement:
      "Prompt clinical evaluation and imaging to deliver accurate diagnosis, definitive reassurance, and minimally invasive care.",
    outcomeStatement:
      "Peace of mind, symptom relief, and non-operative or minimally invasive management.",
    order: 5,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-5.png",
    capabilities: [
      {
        title: "Fibroadenoma Evaluation & Excision",
        description: "Careful monitoring or gentle micro-surgical excision for symptomatic lumps.",
      },
      {
        title: "Cyst Aspiration",
        description: "Quick, in-office ultrasound-guided fluid drainage for painful cysts.",
      },
      {
        title: "Mastitis & Abscess Treatment",
        description: "Medical therapy and ultrasound-guided needle drainage to avoid scarring.",
      },
      {
        title: "Cyclical Breast Pain Management",
        description: "Evidence-based dietary, lifestyle, and medical guidance for breast pain.",
      },
    ],
    benefits: [
      {
        title: "Definitive Reassurance",
        description: "Fast-tracked confirmation eliminating fear and anxiety.",
      },
      {
        title: "Conservative Care",
        description: "Surgery is recommended only when genuinely beneficial.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "service-6",
    title: "Follow-up & Long-Term Care",
    subtitle: "Dedicated survivorship care, surveillance, and genetic guidance",
    slug: "follow-up-and-long-term-care",
    shortDescription:
      "Continuous post-treatment surveillance, lymphedema monitoring, lifestyle counselling, and high-risk genetic evaluation.",
    detailedDescription:
      "Completing surgery is just one milestone. Dr. Noopur Patel provides continuous, structured follow-up care for long-term health, surveillance for recurrence, management of treatment side effects, and genetic risk assessment for family members.",
    problemStatement:
      "Cancer survivorship brings long-term questions regarding recurrence risk, post-surgical recovery, and emotional health.",
    solutionStatement:
      "Structured clinical follow-up schedules, regular imaging surveillance, and accessible ongoing support.",
    outcomeStatement:
      "Confidence in survivorship, proactive monitoring, and lifelong clinical companionship.",
    order: 6,
    isPublished: true,
    isFeatured: true,
    icon: "/images/doctor/assets/service-6.png",
    capabilities: [
      {
        title: "Scheduled Surveillance Protocol",
        description: "Structured clinical check-ups and annual imaging to ensure ongoing health.",
      },
      {
        title: "Genetic Counselling Guidance",
        description: "Risk assessment and BRCA1/2 testing recommendations for high-risk families.",
      },
      {
        title: "Lymphedema Prevention",
        description: "Early detection, arm measurement protocols, and physical therapy guidance.",
      },
      {
        title: "Survivorship Lifestyle Coaching",
        description: "Nutritional and physical wellness advice to support healthy longevity.",
      },
    ],
    benefits: [
      {
        title: "Ongoing Peace of Mind",
        description: "Direct access to your surgical oncologist for any new symptoms.",
      },
      {
        title: "Family Risk Awareness",
        description: "Proactive screening strategies to safeguard family members.",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];
