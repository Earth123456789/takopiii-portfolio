'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Translation data
const translations = {
  th: {
    navigation: {
      about: "เกี่ยวกับ",
      education: "การศึกษา",
      certificates: "ใบรับรอง",
      techStack: "เทคโนโลยี",
      projects: "โปรเจค",
      activity: "กิจกรรม",
      contact: "ติดต่อ"
    },
    hero: {
      im: "ฉันคือ",
      frontendDeveloper: "Frontend",
      backendDeveloper: "Backend", 
      fullStackDeveloper: "Full Stack",
      freelancer: "Freelancer",
      greeting: "สวัสดี! ฉันชื่อ วิปัศย์ โชคนันทวงศ์ ชื่อเล่นคือ takopiii"
    },
    education: {
      title: "การศึกษาของฉัน",
      description: "ที่ที่ฉันเรียนรู้ เติบโต และพัฒนาความสามารถ",
      triamudom: "โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า",
      triamudomPeriod: "2559 - 2565",
      triamudomDetail: "แผนการเรียน วิทย์-คณิต-คอมพิวเตอร์",
      kmitl: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
      kmitlPeriod: "2565 - ปัจจุบัน",
      kmitlDetail: "คณะเทคโนโลยีสารสนเทศ ปริญญาตรี",
      status: {
        success: "สำเร็จ",
        inProgress: "กำลังศึกษา"
      }
    },
    certificates: {
      title: "ใบรับรองของฉัน",
      description: "ใบรับรองวิชาชีพและความสำเร็จที่ยืนยันทักษะและความรู้ของฉัน"
    },
    techStack: {
      title: "เทคโนโลยีที่ใช้",
      description: "เทคโนโลยีและเครื่องมือที่ฉันใช้ในการสร้างไอเดียให้เป็นจริง"
    },
    projects: {
      title: "โปรเจคทั้งหมดของฉัน",
      description: "แสดงผลงานและเทคโนโลยีที่ฉันเชี่ยวชาญผ่านโปรเจคจริง",
      eyeYoga: {
        title: "Eye Yoga",
        description: "ระบบตรวจจับและประเมินความถูกต้องของท่าทางผ่านเว็บแคมโดยใช้เทคนิค Human Pose Estimation (MediaPipe, MoveNet, TensorFlow) ผู้ใช้สามารถเลือกท่าที่ต้องการฝึกได้ และระบบจะแสดงท่าอ้างอิงและประเมินผลการปฏิบัติแบบเรียลไทม์ พร้อมให้คะแนนความแม่นยำและการติดตามความก้าวหน้าเพื่อการปรับปรุงอย่างต่อเนื่อง",
        features: [
          "การตรวจจับท่าทางแบบเรียลไทม์ด้วย MediaPipe และ TensorFlow",
          "การให้คะแนนความแม่นยำและการประเมินผลการปฏิบัติ",
          "การเลือกท่าและการฝึกในโหมดต่างๆ",
          "การติดตามความก้าวหน้าและการวิเคราะห์การปรับปรุง"
        ],
        technologies: ["Next.js", "Tailwind CSS", "FastAPI", "Python"],
        demo: "Demo"
      },
      ticketBever: {
        title: "Ticker Bever",
        description: "ระบบจองและจัดการตั๋วที่สร้างด้วย Django พร้อม UI ที่ทันสมัยและตอบสนองด้วย Tailwind CSS แพลตฟอร์มนี้รวม Google API สำหรับการยืนยันตัวตนและฟังก์ชันแชทบอท มีแดชบอร์ดวิเคราะห์ด้วย Chart.js และรองรับการประมวลผลการชำระเงินที่ปลอดภัยด้วย PromptPay ผ่านไลบรารี Python",
        features: [
          "การยืนยันตัวตนผู้ใช้และการรวมแชทบอทด้วย Google API",
          "อินเทอร์เฟซที่ทันสมัยและตอบสนองด้วย Tailwind CSS",
          "แดชบอร์ดแบบโต้ตอบและการแสดงข้อมูลด้วย Chart.js",
          "การประมวลผลการชำระเงินที่ปลอดภัยด้วย PromptPay (ไลบรารี Python)",
          "สร้างด้วย Django เพื่อรองรับระบบหลังบ้านที่ปรับขนาดได้"
        ],
        technologies: ["Django", "Tailwind CSS", "Google API", "Chart.js"],
        demo: "Demo"
      },
      safeJai: {
        title: "Safe Jai (Internship)",
        description: "เว็บไซต์หลายภาษาที่พัฒนาและออกแบบด้วยการสนับสนุนการทำให้เป็นสากล (i18n) เพื่อให้สามารถใช้ภาษาไทยและอังกฤษได้ สร้างด้วย Next.js และ next-i18next สำหรับการจัดการการแปล ระบบรับประกันการเปลี่ยนภาษาที่ราบรื่น ใช้ Tailwind CSS และ SCSS เพื่อสร้าง UI/UX ที่ตอบสนองและสอดคล้องกับระบบการออกแบบขององค์กร ทำงานร่วมกับทีมออกแบบและหลังบ้านอย่างใกล้ชิดเพื่อรวม API และรับประกันการทำงานของระบบที่มีประสิทธิภาพ",
        features: [
          "การสนับสนุนการทำให้เป็นสากล (i18n) ด้วย Next.js และ next-i18next",
          "การสนับสนุนหลายภาษา (ไทย / อังกฤษ)",
          "การออกแบบ UI/UX ที่ตอบสนองด้วย Tailwind CSS และ SCSS",
          "สอดคล้องกับแนวทางการออกแบบและแบรนด์ขององค์กร",
          "การรวม API ที่ราบรื่นกับการทำงานร่วมกับทีมหลังบ้าน",
          "การทดสอบอย่างละเอียดเพื่อประสิทธิภาพและความน่าเชื่อถือของระบบ"
        ],
        technologies: ["Next.js", "Tailwind CSS", "Scss", "next-i18next"],
        demo: "Demo"
      },
      openhouse: {
        title: "Openhouse 2024",
        description: "แอปพลิเคชันเว็บแบบโต้ตอบที่พัฒนาเพื่อ IT Open House 2024 เพื่อให้ผู้เรียนมัธยมปลายมีส่วนร่วมในกิจกรรมแบบลงมือปฏิบัติ สร้างด้วย Next.js และจัดแต่งด้วย Magic UI และ ShadCN UI แพลตฟอร์มรับประกันการออกแบบที่ทันสมัย ตอบสนอง และใช้งานง่าย การตรวจสอบฟอร์มขับเคลื่อนด้วย Zod API ถูกจัดทำเอกสารด้วย SwaggerHub และใช้ Tello สำหรับการสื่อสาร โปรเจคนี้ถูกปรับใช้บน Vercel เพื่อการเข้าถึงที่ราบรื่น",
        features: [
          "Frontend สร้างด้วย Next.js และจัดแต่งด้วย Magic UI & ShadCN UI",
          "การตรวจสอบฟอร์มและการจัดการข้อผิดพลาดด้วย Zod",
          "เอกสาร API ด้วย SwaggerHub",
          "การรวม Tello สำหรับการสื่อสาร",
          "ปรับใช้บน Vercel เพื่อการโฮสต์ที่รวดเร็วและเชื่อถือได้",
          "ออกแบบเป็นแพลตฟอร์มกิจกรรมแบบโต้ตอบสำหรับผู้เรียนมัธยมปลาย"
        ],
        technologies: ["Next.js", "Tailwind CSS", "Shadcn", "Zod"],
        demo: "Demo"
      }
    },
    comingSoon: {
      title: "เนื้อหาเพิ่มเติมกำลังจะมา..."
    },
    activity: {
      title: "กิจกรรมและประสบการณ์ของฉัน",
      description: "กิจกรรมและประสบการณ์ที่ฉันได้เข้าร่วมและเรียนรู้",
      types: {
        academic: "การศึกษา",
        event: "กิจกรรม",
        work: "งาน"
      },
      items: [
        {
          title: "ผู้ช่วยสอน (TA) - Database System Concepts",
          period: "กรกฎาคม 2024 – พฤศจิกายน 2024",
          role: "ผู้ช่วยสอน",
          description: "ตรวจการบ้านและมอบหมายคะแนน พร้อม Feedback เพื่อพัฒนาทักษะการเขียน Query",
          type: "academic"
        },
        {
          title: "ผู้ช่วยสอน (TA) - NoSQL Databases",
          period: "พฤศจิกายน 2024 – มีนาคม 2025",
          role: "ผู้ช่วยสอน",
          description: "ตรวจการบ้านและมอบคะแนน พร้อมแนะแนวทางศึกษา NoSQL เชิงลึก",
          type: "academic"
        },
        {
          title: "Staff - Pre Programming ของคณะเทคโนโลยีสารสนเทศ",
          period: "มิถุนายน 2023",
          role: "ฝ่ายสวัสดิการ",
          description: "ฝ่ายสวัสดิการ: จัดหาสวัสดิการต่างๆ ให้กับผู้เข้าร่วมกิจกรรม เช่น น้ำ, ขนม",
          type: "event"
        },
        {
          title: "Staff - กิจกรรม IT3K ของคณะเทคโนโลยีสารสนเทศ",
          period: "พฤศจิกายน 2024",
          role: "ฝ่ายสถานที่",
          description: "ฝ่ายสถานที่: จัดเตรียมสถานที่ สำหรับ งานกิจกรรมกีฬาของคณะเทคโนโลยีสารสนเทศ และเก็บสถานหลังกิจกรรมเสร็จ",
          type: "event"
        },
        {
          title: "Staff - กิจกรรม Unite (รับน้อง) ของคณะเทคโนโลยีสารสนเทศ",
          period: "มิถุนายน 2024",
          role: "รองหัวหน้าฝ่ายสถานที่",
          description: "รองหัวหน้า ฝ่ายสถานที่: จัดเตรียม, ดูแลความเรียบร้อย และเก็บสถานที่",
          type: "event"
        },
        {
          title: "Staff - กิจกรรม IT Camp ของคณะเทคโนโลยีสารสนเทศ",
          period: "พฤษภาคม 2024",
          role: "ฝ่ายประชาสัมพันธ์ (PR)",
          description: "ฝ่ายประชาสัมพันธ์ (PR): นำวิดีโอ และ รูปถ่ายต่างๆ ประชาสัมพันธ์ ขึ้นทาง Social Media platform ต่างๆ เช่น Instagram, Facebook",
          type: "event"
        },
        {
          title: "Staff - IT Open house 2023 และ 2024",
          period: "ธันวาคม 2023 และ 2024",
          role: "คุมบูธวิชา & นักพัฒนาเว็บไซต์",
          description: "ฝ่ายคุมบูธวิชา (ธันวาคม 2023 และ 2024): ให้ความรู้เกี่ยวกับบูธวิชาการที่คุม แก่ ผู้ที่มาเข้าร่วมงาน | ฝ่ายจัดทำเว็ปไซต์ (ธันวาคม 2024): จัดทำเว็ปไซต์ สำหรับ ลงทะเบียนเข้าร่วมงานและให้คะแนนบูธวิชาการ โดยใช้ Next.js, tailwind และ shadcn",
          type: "event"
        },
        {
          title: "Staff - KMTIL Expo",
          period: "มีนาคม 2025",
          role: "คุมบูธวิชา",
          description: "ฝ่ายคุมบูธวิชา: ให้ความรู้เกี่ยวกับบูธวิชาการที่คุม แก่ ผู้ที่มาเข้าร่วมงาน",
          type: "event"
        },
        {
          title: "Frontend Developer (บริษัท เอ็ดไวซอรี่ จำกัด)",
          period: "เมษายน 2025 - กรกฎาคม 2025",
          role: "นักพัฒนา Frontend",
          description: "พัฒนาและออกแบบระบบแปลภาษา (i18n) สำหรับเว็บไซต์ เพื่อรองรับการใช้งานหลายภาษา (ไทย / อังกฤษ) โดยใช้ Next.js และ next-i18next สำหรับจัดการคำแปล | ใช้ Tailwind CSS และ SCSS สำหรับการจัดการ UI/UX ให้รองรับ Responsive Design และสอดคล้องกับดีไซน์หลักขององค์กร | ร่วมมือกับทีมออกแบบและทีม Backend ในการเชื่อมต่อ API และทดสอบการทำงานของระบบอย่างมีประสิทธิภาพ",
          type: "work"
        }
      ]
    },
    common: {
      demo: "Demo",
      resume: "Resume",
      myResume: "Resume ของฉัน"
    }
  },
  en: {
    navigation: {
      about: "About",
      education: "Education",
      certificates: "Certificates",
      techStack: "Tech Stack",
      projects: "Projects",
      activity: "Activity",
      contact: "Contact"
    },
    hero: {
      im: "I'm",
      frontendDeveloper: "Frontend Developer",
      backendDeveloper: "Backend Developer",
      fullStackDeveloper: "Full Stack Developer",
      freelancer: "Freelancer",
      greeting: "Hello! My Name is Vipat Choknantawong. You can call me Takopiii."
    },
    education: {
      title: "My Education",
      description: "Where I learned, grew, and developed my abilities.",
      triamudom: "Triamudomsuksanomklao School",
      triamudomPeriod: "2016 - 2022",
      triamudomDetail: "Math - Science - Computer",
      kmitl: "King Mongkut's Institute of Technology Ladkrabang",
      kmitlPeriod: "2022 - Now",
      kmitlDetail: "School of Information Technology Bachelor's Degree",
      status: {
        success: "Success",
        inProgress: "In Progress"
      }
    },
    certificates: {
      title: "My Certificates",
      description: "Professional certifications and achievements that validate my skills and knowledge."
    },
    techStack: {
      title: "Technology Stack",
      description: "Technologies and tools I work with to bring ideas to life."
    },
    projects: {
      title: "All My Projects",
      description: "Showcasing my work and the technologies I've mastered through real-world projects.",
      eyeYoga: {
        title: "Eye Yoga",
        description: "A system that detects and evaluates posture correctness through a webcam using Human Pose Estimation techniques (MediaPipe, MoveNet, TensorFlow). Users can select a pose they want to practice, and the system will display a reference pose and assess their performance in real time, providing accuracy scores and progress tracking for continuous improvement.",
        features: [
          "Real-time pose detection using MediaPipe and TensorFlow",
          "Accuracy scoring and performance evaluation",
          "Multiple pose selection and practice modes",
          "Progress tracking and improvement analytics"
        ],
        technologies: ["Next.js", "Tailwind CSS", "FastAPI", "Python"],
        demo: "Demo"
      },
      ticketBever: {
        title: "Ticker Bever",
        description: "A ticket booking and management system built with Django, featuring a modern and responsive UI powered by Tailwind CSS. The platform integrates Google API for authentication and chatbot functionality, provides analytical dashboards using Chart.js, and supports secure payment processing with PromptPay via Python library.",
        features: [
          "User authentication and chatbot integration using Google API",
          "Modern and responsive interface with Tailwind CSS",
          "Interactive dashboards and data visualization using Chart.js",
          "Secure payment processing with PromptPay (Python library)",
          "Built with Django for scalable backend support"
        ],
        technologies: ["Django", "Tailwind CSS", "Google API", "Chart.js"],
        demo: "Demo"
      },
      safeJai: {
        title: "Safe Jai (Internship)",
        description: "A multilingual website developed and designed with support for internationalization (i18n) to enable both Thai and English. Built with Next.js and next-i18next for translation management, the system ensures seamless language switching. Tailwind CSS and SCSS were used to create a responsive UI/UX that aligns with the organization's design system. Collaborated closely with design and backend teams to integrate APIs and ensure efficient system functionality.",
        features: [
          "Internationalization (i18n) support with Next.js and next-i18next",
          "Multilingual support (Thai / English)",
          "Responsive UI/UX design using Tailwind CSS and SCSS",
          "Aligned with the organization's branding and design guidelines",
          "Seamless API integration with backend team collaboration",
          "Thorough testing for system efficiency and reliability"
        ],
        technologies: ["Next.js", "Tailwind CSS", "Scss", "next-i18next"],
        demo: "Demo"
      },
      openhouse: {
        title: "Openhouse 2024",
        description: "An interactive web application developed for IT Open House 2024 to engage high school students in hands-on activities. Built with Next.js and styled using Magic UI and ShadCN UI, the platform ensures a modern, responsive, and user-friendly design. Form validation is powered by Zod. APIs are documented with SwaggerHub, and Tello is used for communication. The project is deployed on Vercel for seamless accessibility.",
        features: [
          "Frontend built with Next.js and styled using Magic UI & ShadCN UI",
          "Form validation and error handling with Zod",
          "API documentation with SwaggerHub",
          "Tello integration for communication",
          "Deployed on Vercel for fast and reliable hosting",
          "Designed as an interactive activity platform for high school students"
        ],
        technologies: ["Next.js", "Tailwind CSS", "Shadcn", "Zod"],
        demo: "Demo"
      }
    },
    comingSoon: {
      title: "More Content Coming Soon..."
    },
    activity: {
      title: "My Activities & Experiences",
      description: "Activities and experiences I've participated in and learned from",
      types: {
        academic: "Academic",
        event: "Event",
        work: "Work"
      },
      items: [
        {
          title: "Teaching Assistant (TA) - Database System Concepts",
          period: "July 2024 – November 2024",
          role: "Teaching Assistant",
          description: "Graded assignments and provided feedback to develop students' query writing skills",
          type: "academic"
        },
        {
          title: "Teaching Assistant (TA) - NoSQL Databases",
          period: "November 2024 – March 2025",
          role: "Teaching Assistant",
          description: "Graded assignments and provided guidance for in-depth NoSQL study",
          type: "academic"
        },
        {
          title: "Staff - Pre Programming of Information Technology Faculty",
          period: "June 2023",
          role: "Welfare Staff",
          description: "Welfare Department: Provided various amenities for participants such as water and snacks",
          type: "event"
        },
        {
          title: "Staff - IT3K Event of Information Technology Faculty",
          period: "November 2024",
          role: "Venue Staff",
          description: "Venue Department: Prepared venues for faculty sports activities and cleaned up after events",
          type: "event"
        },
        {
          title: "Staff - Unite (Freshman Orientation) Event of Information Technology Faculty",
          period: "June 2024",
          role: "Deputy Venue Manager",
          description: "Deputy Venue Manager: Prepared, maintained order, and cleaned up venues",
          type: "event"
        },
        {
          title: "Staff - IT Camp Event of Information Technology Faculty",
          period: "May 2024",
          role: "PR Staff",
          description: "Public Relations (PR) Department: Promoted videos and photos on various Social Media platforms such as Instagram and Facebook",
          type: "event"
        },
        {
          title: "Staff - IT Open House 2023 and 2024",
          period: "December 2023 and 2024",
          role: "Booth Supervisor & Web Developer",
          description: "Booth Supervisor (December 2023 and 2024): Provided knowledge about academic booths to participants | Website Development (December 2024): Developed website for event registration and booth scoring using Next.js, Tailwind, and ShadCN",
          type: "event"
        },
        {
          title: "Staff - KMTIL Expo",
          period: "March 2025",
          role: "Booth Supervisor",
          description: "Booth Department: Provided knowledge about academic booths to participants",
          type: "event"
        },
        {
          title: "Frontend Developer (Edvisory Co., Ltd.)",
          period: "April 2025 - July 2025",
          role: "Frontend Developer",
          description: "Developed and designed internationalization (i18n) system for website to support multilingual usage (Thai/English) using Next.js and next-i18next for translation management | Used Tailwind CSS and SCSS for UI/UX management to support Responsive Design and align with organization's main design | Collaborated with design and backend teams in API integration and efficient system testing",
          type: "work"
        }
      ]
    },
    common: {
      demo: "Demo",
      resume: "Resume",
      myResume: "My Resume"
    }
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['th', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string | string[] => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return (value as string | string[]) || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
