import { TeamMember } from "@/types";

export const TEAM_MEMBERS_DATA: TeamMember[] = [
  {
    id: "team-1",
    name: "Dr. Noopur Patel",
    role: "Breast Cancer Surgeon & Oncoplastic Specialist",
    bio: "Associate Consultant in Surgical Breast Oncology at Marengo CIMS Hospital, Ahmedabad. Dedicated to compassionate, individualized breast care.",
    avatar: "/images/doctor/assets/hero-doctor.png",
    socials: {
      linkedin: "https://linkedin.com/in/drnoopurpatel",
      email: "dr.noopurpatel@gmail.com",
    },
    order: 1,
    isPublished: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "team-2",
    name: "Clinical Care Coordinator",
    role: "Patient Navigator & Care Support",
    bio: "Guides patients through diagnostic imaging scheduling, consultation preparation, and treatment journey communication.",
    avatar: "/images/doctor/assets/patient-avatar-1.png",
    socials: {
      email: "care@drnoopurpatel.com",
    },
    order: 2,
    isPublished: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "team-3",
    name: "Appointments & Reception",
    role: "Surgical Scheduling & Helpdesk",
    bio: "Assists with clinic appointment slots, hospital admission paperwork, and direct WhatsApp consultations.",
    avatar: "/images/doctor/assets/patient-avatar-2.png",
    socials: {
      email: "appointments@drnoopurpatel.com",
    },
    order: 3,
    isPublished: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];
