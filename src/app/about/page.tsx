import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Ribbon, 
  Heart, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Award, 
  GraduationCap, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Quote, 
  ArrowRight,
  Stethoscope,
  Smile
} from "lucide-react";
import DoctorNavbar from "@/components/doctor/DoctorNavbar";
import DoctorFooter from "@/components/doctor/DoctorFooter";
import HopeCtaBanner from "@/components/doctor/HopeCtaBanner";
import TrustStrip from "@/components/doctor/TrustStrip";
import PatientStoriesSection from "@/components/doctor/PatientStoriesSection";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { getCmsTestimonials } from "@/lib/services/cmsService";
import { 
  DOCTOR_PROFILE_IMAGES,
  MENTORS_MEDIA,
  MDT_MEDIA,
  HOSPITAL_MEDIA
} from "@/data/mediaManifest";

export const metadata = {
  title: "About Dr. Noopur Patel | Breast Cancer Surgeon Ahmedabad",
  description:
    "Learn about Dr. Noopur Patel, Breast Surgeon & Oncoplastic Surgeon at Marengo CIMS Hospital, Ahmedabad. Dedicated to compassionate, evidence-based care.",
};

export default async function AboutPage() {
  let testimonials = TESTIMONIALS_DATA;
  try {
    const cmsTestimonials = await getCmsTestimonials().catch(() => null);
    if (cmsTestimonials && cmsTestimonials.length > 0) {
      testimonials = cmsTestimonials;
    }
  } catch {}

  const differentiators = [
    "Specialised in Breast Surgery & Oncoplastic Techniques",
    "Use of Latest Diagnostic & Surgical Technology",
    "Natural-Looking Reconstructive Options",
    "Multidisciplinary & Evidence-Based Approach",
    "Clear Communication & Patient Education",
    "Support Through Every Step of Your Journey",
  ];

  const milestones = [
    {
      num: 1,
      title: "Education & Training",
      desc: "Strong academic background in General Surgery and Breast Surgery.",
      icon: <GraduationCap className="w-5 h-5 text-[#D84C70]" />,
    },
    {
      num: 2,
      title: "Specialisation in Breast Surgery",
      desc: "Focused fellowship training in breast cancer surgery and oncoplastic techniques.",
      icon: <Ribbon className="w-5 h-5 text-[#D84C70]" />,
    },
    {
      num: 3,
      title: "Dedicated Clinical Practice",
      desc: "Comprehensive operative experience managing both benign and malignant breast diseases.",
      icon: <Clock className="w-5 h-5 text-[#D84C70]" />,
    },
    {
      num: 4,
      title: "Multidisciplinary Care",
      desc: "Collaborative patient management alongside medical oncology, pathology, and radiology teams.",
      icon: <Users className="w-5 h-5 text-[#D84C70]" />,
    },
    {
      num: 5,
      title: "Continued Learning",
      desc: "Regularly updating skills with latest international research and clinical guidelines.",
      icon: <Award className="w-5 h-5 text-[#D84C70]" />,
    },
  ];

  const facilities = [
    {
      title: HOSPITAL_MEDIA.reception.title,
      image: HOSPITAL_MEDIA.reception.src,
      desc: HOSPITAL_MEDIA.reception.desc,
    },
    {
      title: HOSPITAL_MEDIA.consultation.title,
      image: HOSPITAL_MEDIA.consultation.src,
      desc: HOSPITAL_MEDIA.consultation.desc,
    },
    {
      title: HOSPITAL_MEDIA.mammography.title,
      image: HOSPITAL_MEDIA.mammography.src,
      desc: HOSPITAL_MEDIA.mammography.desc,
    },
    {
      title: HOSPITAL_MEDIA.lounge.title,
      image: HOSPITAL_MEDIA.lounge.src,
      desc: HOSPITAL_MEDIA.lounge.desc,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DoctorNavbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative w-full bg-gradient-to-b from-[#FFF8F9] to-white pt-8 pb-16 lg:py-20 border-b border-rose-100/60 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block">
                  ABOUT US
                </span>
                <h1 className="font-serif text-[42px] sm:text-[52px] font-bold text-[#1A202C] leading-[1.15]">
                  Dedicated to Women&apos;s Health.{" "}
                  <span className="italic font-serif text-[#D84C70] block sm:inline">
                    Today and Always.
                  </span>
                </h1>
                <p className="text-slate-600 text-[16px] sm:text-[17px] leading-relaxed max-w-2xl">
                  At Dr. Noopur Patel&apos;s clinic, we believe every woman deserves accurate diagnosis, advanced treatment and compassionate care for all breast health concerns — in a safe, supportive and empowering environment.
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href="/appointments"
                    className="inline-flex items-center gap-2 bg-[#D84C70] hover:bg-[#BE3A5C] text-white text-[14.5px] font-semibold px-7 py-3.5 rounded-full shadow-md transition-all active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book an Appointment</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[32px] overflow-hidden bg-[#FDF2F4] border border-[#F5D6DE] shadow-xl p-2.5">
                  <div className="relative w-full h-full rounded-[26px] overflow-hidden">
                    <Image
                      src={DOCTOR_PROFILE_IMAGES.heroPrimary.src}
                      alt={DOCTOR_PROFILE_IMAGES.heroPrimary.alt}
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="400px"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-4 right-2 sm:right-6 bg-white/95 backdrop-blur-md border border-[#F5D6DE] rounded-2xl p-2.5 shadow-lg flex items-center gap-3 max-w-[210px]">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#FCE8ED] text-[#D84C70] shadow-xs">
                    <Heart className="w-5 h-5 fill-[#D84C70]/20" />
                  </div>
                  <div className="text-[11px] leading-tight font-bold text-slate-800">
                    Care. Support. Strength.
                    <span className="text-[#D84C70] font-semibold block text-[10px]">
                      For Every Woman
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. MEET YOUR DOCTOR SECTION */}
        <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden border border-[#F5D6DE] shadow-lg">
                  <Image
                    src={DOCTOR_PROFILE_IMAGES.spotlightStanding.src}
                    alt={DOCTOR_PROFILE_IMAGES.spotlightStanding.alt}
                    fill
                    className="object-cover object-[center_20%]"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block">
                  MEET YOUR DOCTOR
                </span>
                <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#1A202C]">
                  Dr. Noopur Patel
                </h2>
                <p className="text-[15px] font-semibold text-[#D84C70]">
                  Breast Surgeon &amp; Oncoplastic Surgeon
                </p>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Dr. Noopur Patel is an Associate Consultant in Surgical Breast Oncology at Marengo CIMS Hospital, Ahmedabad. Dedicated to providing comprehensive, compassionate and personalised care for women at every stage of their breast health journey.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFF8F9] border border-[#F5D6DE]">
                    <ShieldCheck className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                    <span className="text-[12.5px] font-semibold text-slate-800">Evidence-Based</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFF8F9] border border-[#F5D6DE]">
                    <Heart className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                    <span className="text-[12.5px] font-semibold text-slate-800">Patient-Centred</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFF8F9] border border-[#F5D6DE]">
                    <Activity className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                    <span className="text-[12.5px] font-semibold text-slate-800">Advanced Techniques</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFF8F9] border border-[#F5D6DE]">
                    <Sparkles className="w-4 h-4 text-[#D84C70] flex-shrink-0" />
                    <span className="text-[12.5px] font-semibold text-slate-800">Aesthetic Focus</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. VERIFIED PROFESSIONAL CREDENTIALS STRIP */}
        <section className="w-full bg-[#FFF8F9] border-b border-[#F5D6DE] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-[#F5D6DE]/60 shadow-xs">
                <div className="text-[#9B2846] font-serif text-[24px] sm:text-[28px] font-bold">
                  MBBS
                </div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#D84C70]">Medical Foundation</p>
                <p className="text-[12px] text-slate-600">Comprehensive Undergraduate Medical Training</p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-[#F5D6DE]/60 shadow-xs">
                <div className="text-[#9B2846] font-serif text-[24px] sm:text-[28px] font-bold">
                  MS
                </div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#D84C70]">General Surgery</p>
                <p className="text-[12px] text-slate-600">Advanced Surgical Residency & Operative Care</p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-[#F5D6DE]/60 shadow-xs">
                <div className="text-[#9B2846] font-serif text-[24px] sm:text-[28px] font-bold">
                  Fellowship
                </div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#D84C70]">Breast Surgery</p>
                <p className="text-[12px] text-slate-600">Subspeciality Breast Oncology & Oncoplastic Training</p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-[#F5D6DE]/60 shadow-xs">
                <div className="text-[#9B2846] font-serif text-[22px] sm:text-[24px] font-bold">
                  Associate Consultant
                </div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#D84C70]">Surgical Breast Oncology</p>
                <p className="text-[12px] text-slate-600">Marengo CIMS Hospital, Ahmedabad</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OUR APPROACH SECTION */}
        <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                  OUR APPROACH
                </span>
                <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1A202C] leading-tight mb-3">
                  More Than Treatment. A Partnership in Your Health.
                </h2>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  We take time to listen, understand your concerns and guide you with clear, honest and evidence-based information. Our goal is not just to treat a disease, but to support you through every step — physically, emotionally and mentally.
                </p>
              </div>

              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-[#FFF8F9] hover:bg-[#FDF2F4] transition-all shadow-xs"
                >
                  <span>Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 3 Photographic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FFF8F9] border border-[#F5D6DE] rounded-2xl overflow-hidden p-5 shadow-xs">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <Image
                    src={DOCTOR_PROFILE_IMAGES.consulting.src}
                    alt={DOCTOR_PROFILE_IMAGES.consulting.alt}
                    fill
                    className="object-cover object-top"
                    sizes="350px"
                  />
                </div>
                <h3 className="font-serif text-[18px] font-bold text-slate-900 mb-1">
                  Detailed Consultation
                </h3>
                <p className="text-[13px] text-slate-500">
                  Understanding your concerns and reviewing every diagnostic finding thoroughly.
                </p>
              </div>

              <div className="bg-[#FFF8F9] border border-[#F5D6DE] rounded-2xl overflow-hidden p-5 shadow-xs">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <Image
                    src={DOCTOR_PROFILE_IMAGES.fellowship.src}
                    alt={DOCTOR_PROFILE_IMAGES.fellowship.alt}
                    fill
                    className="object-cover object-top"
                    sizes="350px"
                  />
                </div>
                <h3 className="font-serif text-[18px] font-bold text-slate-900 mb-1">
                  Advanced Surgical Care
                </h3>
                <p className="text-[13px] text-slate-500">
                  With oncological precision, modern equipment, and highest patient safety standards.
                </p>
              </div>

              <div className="bg-[#FFF8F9] border border-[#F5D6DE] rounded-2xl overflow-hidden p-5 shadow-xs">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <Image
                    src={HOSPITAL_MEDIA.mammography.src}
                    alt={HOSPITAL_MEDIA.mammography.alt}
                    fill
                    className="object-cover"
                    sizes="350px"
                  />
                </div>
                <h3 className="font-serif text-[18px] font-bold text-slate-900 mb-1">
                  Accurate Diagnosis
                </h3>
                <p className="text-[13px] text-slate-500">
                  Using state-of-the-art imaging, digital mammography, and histology correlation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MISSION, VISION & VALUES MATRIX */}
        <section className="w-full py-16 lg:py-24 bg-[#FFF8F9]/50 border-b border-rose-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-2xl p-7 border border-[#F5D6DE] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FDF2F4] text-[#D84C70] flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-[20px] font-bold text-slate-900">
                  Our Mission
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  To provide comprehensive, evidence-based and compassionate breast care to every woman, empowering them to make informed decisions about their health.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-[#F5D6DE] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FDF2F4] text-[#D84C70] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-[20px] font-bold text-slate-900">
                  Our Vision
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  To be a trusted centre for breast health, known for clinical excellence, advanced surgical techniques and a patient-centred approach.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-[#F5D6DE] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FDF2F4] text-[#D84C70] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-[20px] font-bold text-slate-900">
                  Our Values
                </h3>
                <ul className="space-y-1.5 text-[13.5px] text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70]" />
                    Compassion &amp; Respect
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70]" />
                    Accuracy &amp; Transparency
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70]" />
                    Patient Education
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70]" />
                    Ethical Medical Practice
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D84C70]" />
                    Continuous Learning
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* 6. WHAT MAKES US DIFFERENT */}
        <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-3xl overflow-hidden bg-[#FFF8F9] border border-[#F5D6DE] shadow-md">
                  <Image
                    src={DOCTOR_PROFILE_IMAGES.spotlightCrossedArms.src}
                    alt={DOCTOR_PROFILE_IMAGES.spotlightCrossedArms.alt}
                    fill
                    className="object-cover object-[center_18%]"
                    sizes="420px"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                    WHAT MAKES US DIFFERENT
                  </span>
                  <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#1A202C] leading-tight mb-3">
                    Expertise. Empathy. Better Outcomes.
                  </h2>
                  <p className="text-slate-600 text-[15px] leading-relaxed">
                    We combine advanced surgical skills with a compassionate, patient-first approach. Our focus is on early detection, accurate diagnosis and personalised treatment plans to achieve the best possible outcomes — both medically and aesthetically.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {differentiators.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FFF8F9] border border-[#F5D6DE]/60">
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#D84C70] flex-shrink-0 mt-0.5 border border-[#F5D6DE]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13px] font-semibold text-slate-800 leading-snug">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. PROFESSIONAL EXPERIENCE & GROWTH TIMELINE */}
        <section className="w-full py-16 lg:py-24 bg-[#FFF8F9]/40 border-b border-rose-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                OUR JOURNEY
              </span>
              <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1A202C] leading-tight">
                Professional Experience &amp; Growth
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#F5D6DE] rounded-2xl p-5 text-center flex flex-col items-center justify-between shadow-xs hover:shadow-md transition-all"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] flex items-center justify-center mb-3">
                      {m.icon}
                    </div>
                    <h3 className="font-serif text-[16px] font-bold text-slate-900 mb-2">
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-[12.5px] text-slate-500 leading-normal">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. PROFESSIONAL MENTORSHIP & GUIDANCE SECTION (From /Mentors) */}
        <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60" id="mentors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                  MENTORSHIP &amp; TRAINING
                </span>
                <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1A202C] leading-tight mb-3">
                  Professional Mentorship &amp; Guidance
                </h2>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Clinical mastery is built upon the foundation of strong mentorship. Dr. Noopur Patel has trained under distinguished senior surgical oncology mentors, absorbing meticulous operative technique, clinical ethics, and compassionate patient care.
                </p>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFF8F9] border border-[#F5D6DE] text-xs font-semibold text-[#88213B]">
                  <GraduationCap className="w-4 h-4 text-[#D84C70]" />
                  <span>Subspecialty Breast Oncology Training</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MENTORS_MEDIA.map((mentor) => (
                <div
                  key={mentor.id}
                  className="group bg-[#FFF8F9]/50 rounded-2xl overflow-hidden border border-[#F5D6DE] shadow-xs hover:shadow-md hover:border-[#D84C70]/60 transition-all flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={mentor.src}
                      alt={mentor.alt}
                      fill
                      className="object-contain p-2 group-hover:scale-103 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-[#88213B] bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#F5D6DE] shadow-2xs">
                      {mentor.badge}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h3 className="font-serif text-[16px] font-bold text-slate-900 mb-1.5 group-hover:text-[#88213B] transition-colors">
                        {mentor.title}
                      </h3>
                      <p className="text-[12.5px] text-slate-600 leading-relaxed">
                        {mentor.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#D84C70]">
                      <span>{mentor.category}</span>
                      <span className="text-slate-400">Clinical Excellence</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. MULTIDISCIPLINARY TEAM (MDT) & TUMOR BOARD (From /MDT_) */}
        <section className="w-full py-16 lg:py-24 bg-[#FFF8F9]/40 border-b border-rose-100/60" id="mdt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                  COLLABORATIVE ONCOLOGY CARE
                </span>
                <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1A202C] leading-tight mb-3">
                  Multidisciplinary Team &amp; Tumor Board
                </h2>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  No breast cancer is treated in isolation. Complex cases are deliberated collaboratively in weekly multidisciplinary tumor boards alongside surgical oncologists, medical oncologists, radiation oncologists, radiologists, and pathologists at Marengo CIMS Hospital.
                </p>
              </div>

              <div>
                <Link
                  href="/appointments"
                  className="inline-flex items-center gap-2 bg-[#D84C70] hover:bg-[#BE3A5C] text-white text-[13.5px] font-semibold px-6 py-3 rounded-full shadow-xs transition-all active:scale-95"
                >
                  <Users className="w-4 h-4" />
                  <span>Request MDT Case Review</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MDT_MEDIA.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#F5D6DE] shadow-xs hover:shadow-lg hover:border-[#D84C70]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 text-[10.5px] font-bold uppercase tracking-wider text-white bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {item.badge}
                    </span>
                    <h3 className="absolute bottom-3 left-4 right-4 font-serif text-lg font-bold text-white drop-shadow">
                      {item.title}
                    </h3>
                  </div>

                  <div className="p-5 sm:p-6 bg-white flex-1 flex flex-col justify-between">
                    <p className="text-[13px] text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#88213B]">
                      <span>{item.category}</span>
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px]">
                        NCCN Guidelines Compliant
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. OUR FACILITIES (4 Interior Photos) */}
        <section className="w-full py-16 lg:py-24 bg-white border-b border-rose-100/60" id="facilities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#D84C70] block mb-2">
                  OUR FACILITIES
                </span>
                <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1A202C] leading-tight mb-3">
                  A Safe, Comfortable and Modern Clinic
                </h2>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Our clinic is designed to provide a comfortable and private environment, equipped with modern technology for accurate diagnosis and advanced treatment.
                </p>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#D84C70] hover:text-[#BE3A5C] text-[14px] font-semibold px-5 py-2.5 rounded-full border border-[#F5D6DE] bg-[#FFF8F9] hover:bg-[#FDF2F4] transition-all shadow-xs"
                >
                  <span>View Location</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facilities.map((fac, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#F5D6DE] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={fac.image}
                      alt={fac.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="300px"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-[16px] font-bold text-slate-900 mb-1">
                      {fac.title}
                    </h3>
                    <p className="text-[12px] text-slate-500">
                      {fac.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. REAL PATIENT STORIES */}
        <PatientStoriesSection testimonials={testimonials} />

        {/* 10. HOPE CTA BANNER & TRUST STRIP */}
        <HopeCtaBanner />
        <TrustStrip />
      </main>

      <DoctorFooter />
    </div>
  );
}
