'use client'

import RotatingText from "@/components/RotatingText";
import Aurora from "@/components/Aurora";
import Image from "next/image";
import { MarqueeTech } from "@/components/marquee_tech";
import Project from "@/components/project";
import ImageModal from "@/components/ImageModal";
import Education from "@/components/Education";
import Activity from "@/components/Activity";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFontSize } from "@/contexts/FontSizeContext";

export default function Home() {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    image: string;
    title: string;
    issuer: string;
  } | null>(null);

  const openModal = (cert: { image: string; title: string; issuer: string }) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const educationData = [
    {
      title: t('education.triamudom') as string,
      period: t('education.triamudomPeriod') as string,
      detail: t('education.triamudomDetail') as string,
      image: `/images/tun.png`,
      status: t('education.status.success') as string,
    },
    {
      title: t('education.kmitl') as string,
      period: t('education.kmitlPeriod') as string,
      detail: t('education.kmitlDetail') as string,
      image: `/images/it.webp`,
      status: t('education.status.inProgress') as string,
    },
  ];

  const certificateData = [
    {
      title: `ChatGPT for Developers`,
      issuer: `BorntoDev Academy`,
      image: `/images/certificate/borntodev-acdemy_ChatGPT for Developers_certifiacte.png`,
    },
    {
      title: `Fundamental Web Dev with HTML5 & CSS3`,
      issuer: `BorntoDev Academy`,
      image: `/images/certificate/borntodev-acdemy_Lite _ Fundamental Web Dev with HTML5 & CSS3_certifiacte.png`,
    },
    {
      title: `Cybersecurity Essentials`,
      issuer: `Cisco Networking Academy`,
      image: `/images/certificate/VipatChoknantawong-Cybersecurity Es-certificate.png`,
    },
    {
      title: `NDG Linux Essentials`,
      issuer: `Cisco Networking Academy`,
      image: `/images/certificate/VipatChoknantawong-NDG Linux Essent-certificate.png`,
    },
    {
      title: `Huawei Tech Essentials`,
      issuer: `Huawei`,
      image: `/images/certificate/huwei-tech-essentials.png`,
    },
    {
      title: `42 Bangkok Student`,
      issuer: `42 Bangkok`,
      image: `/images/certificate/vchoknan@student.42bangkok.com.png`,
    },
  ];

  const activityData = t('activity.items') as unknown as Array<{
    title: string;
    period: string;
    role: string;
    description: string;
    type: 'academic' | 'event' | 'work';
  }>;

  return (
    <main className="w-full min-h-screen">
      {/* Galaxy background */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Intro Section */}
      <section className="flex flex-col items-center justify-center text-center w-full min-h-[100vh] px-4 sm:px-6 lg:px-8 py-12 sm:py-20" id="about">
        <div className="max-w-6xl mx-auto">
          {/* Main heading */}
          <article className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <p className={getFontSizeClass("text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white")}>
              {t('hero.im')}
            </p>
            <RotatingText
              texts={[
                t('hero.frontendDeveloper') as string,
                t('hero.backendDeveloper') as string,
                t('hero.fullStackDeveloper') as string,
                t('hero.freelancer') as string,
              ]}
              mainClassName={getFontSizeClass("px-2 sm:px-3 bg-[#A91D3A]/50 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold rounded-lg select-none overflow-hidden py-1 sm:py-2 justify-center")}
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </article>

          {/* Subtitle */}
          <article className="max-w-4xl mx-auto">
            <p className={getFontSizeClass("text-lg sm:text-xl lg:text-2xl text-white opacity-70 leading-relaxed")}>
              {t('hero.greeting')}
            </p>
          </article>
        </div>
      </section>

      {/* Education Section */}
      <Education educationData={educationData} />

      {/* Technology Stack Section */}
      <section className="flex flex-col py-12 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8" id="stack">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center lg:text-left mb-8 sm:mb-12">
            <h2 className={getFontSizeClass("text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4")}>
              {t('techStack.title')}
            </h2>
            <p className={getFontSizeClass("text-white/70 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0")}>
              {t('techStack.description')}
            </p>
          </div>
          <div className="w-full">
            <MarqueeTech />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="project">
        <Project />
      </section>

      {/* Certificates Section */}
      <section className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000" id="certificates">
        <div className="w-full max-w-7xl">
          <div className="text-center lg:text-left mb-12 sm:mb-16">
            <h2 className={getFontSizeClass("text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4")}>
              {t('certificates.title')}
            </h2>
            <p className={getFontSizeClass("text-white/70 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0")}>
              {t('certificates.description')}
            </p>
          </div>

          {/* Certificate Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certificateData.map((cert, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#A91D3A]/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Certificate Image */}
                <div
                  className="relative mb-4 overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openModal(cert)}
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={index < 3}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to view full size
                    </div>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="space-y-2">
                  <h3 className="text-white text-lg sm:text-xl font-semibold leading-tight group-hover:text-[#ff9cb0] transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-[#ff9cb0] font-medium text-sm sm:text-base">
                    {cert.issuer}
                  </p>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#A91D3A]/50 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Section */}
      <Activity activityData={activityData} />

      {/* Footer */}
      <Footer />

      {/* Image Modal */}
      {selectedCertificate && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedCertificate.image}
          imageAlt={selectedCertificate.title}
          title={selectedCertificate.title}
          issuer={selectedCertificate.issuer}
        />
      )}
    </main>
  );
}