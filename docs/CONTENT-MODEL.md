# CONTENT MODEL & CMS ARCHITECTURE
**Dr. Noopur Patel — Clinical & Educational Schemas**
*Version 1.0 • Production Baseline*

---

## 1. Domain Entities & Schemas

### 1.1 DoctorProfile
```typescript
interface DoctorProfile {
  name: string; // "Dr. Noopur Patel"
  title: string; // "Breast Cancer Surgeon & Oncoplastic Surgeon"
  role: string; // "Associate Consultant – Surgical Breast Oncology"
  hospital: {
    name: string; // "Marengo CIMS Hospital"
    city: string; // "Ahmedabad"
    state: string; // "Gujarat"
    address: string;
    hours: string; // "Mon - Sat: 10:00 AM - 6:00 PM"
  };
  contact: {
    phone: string; // "+91 98765 43210"
    email: string; // "dr.noopurpatel@gmail.com"
    whatsapp: string;
  };
  qualifications: Array<{
    degree: string; // "MBBS", "MS (General Surgery)", "Fellowship in Breast Oncology"
    institution: string; // "AMC MET", "SMIMER", "Max Healthcare"
    year?: string;
  }>;
  stats: Array<{
    value: string; // "10+", "1000+", "1 in 8"
    label: string; // "Years of Experience", "Patients Treated"
  }>;
}
```

### 1.2 ClinicalService
```typescript
interface ClinicalService {
  id: string;
  slug: string;
  title: string; // e.g., "Breast Cancer Diagnosis & Treatment", "Oncoplastic Breast Surgery"
  shortDescription: string;
  fullDescription: string;
  image: string; // Path to clinical asset
  category: "surgical" | "oncology" | "reconstructive" | "benign";
  isPublished: boolean;
  order: number;
}
```

### 1.3 PatientStory (Testimonial)
```typescript
interface PatientStory {
  id: string;
  patientName: string; // e.g., "Patient from Ahmedabad", "Patient from Gandhinagar"
  condition: string; // "Early Detection", "Benign Breast Condition", "Oncoplastic Surgery"
  quote: string;
  rating: number; // 5
  avatar: string; // Portrait image
  verified: boolean;
  isPublished: boolean;
}
```

### 1.4 ClinicalFaq
```typescript
interface ClinicalFaq {
  id: string;
  question: string;
  answer: string;
  category: "screening" | "surgery" | "recovery" | "oncoplastic" | "general";
  isPublished: boolean;
  order: number;
}
```

### 1.5 AppointmentLead
```typescript
interface AppointmentLead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: "in-clinic" | "online" | "second-opinion";
  message?: string;
  status: "new" | "contacted" | "scheduled" | "completed" | "cancelled";
  createdAt: string;
}
```
