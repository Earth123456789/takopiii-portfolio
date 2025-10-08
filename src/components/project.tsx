'use client'

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFontSize } from "@/contexts/FontSizeContext";

const Project = () => {
    const { t } = useLanguage();
    const { getFontSizeClass } = useFontSize();

    const projects = [
        {
            id: 1,
            title: t('projects.eyeYoga.title'),
            description: t('projects.eyeYoga.description'),
            image: "/images/project/eyeyoga.png",
            features: t('projects.eyeYoga.features'),
            technologies: t('projects.eyeYoga.technologies'),
            liveDemo: "https://www.youtube.com/watch?v=k2dFXt376ao",
        },
        {
            id: 2,
            title: t('projects.ticketBever.title'),
            description: t('projects.ticketBever.description'),
            image: "/images/project/ticketbever.png",
            features: t('projects.ticketBever.features'),
            technologies: t('projects.ticketBever.technologies'),
            liveDemo: "https://github.com/Earth123456789/Ticket-Bever",
        },
        {
            id: 3,
            title: t('projects.safeJai.title'),
            description: t('projects.safeJai.description'),
            image: "/images/project/safejai.png",
            features: t('projects.safeJai.features'),
            technologies: t('projects.safeJai.technologies'),
            liveDemo: "https://safejai.sa.chula.ac.th/",
        },
        {
            id: 4,
            title: t('projects.openhouse.title'),
            description: t('projects.openhouse.description'),
            image: "/images/project/itopenhouse.png",
            features: t('projects.openhouse.features'),
            technologies: t('projects.openhouse.technologies'),
            liveDemo: "https://openhouse.it.kmitl.ac.th/",
        }
    ];

    return (
        <section className="flex flex-col py-12 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="text-center lg:text-left mb-12 sm:mb-16">
                    <h2 className={getFontSizeClass("text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4")}>
                        {t('projects.title')}
                    </h2>
                    <p className={getFontSizeClass("text-white/70 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0")}>
                        {t('projects.description')}
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-8 lg:gap-12">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="flex flex-col xl:flex-row gap-6 lg:gap-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            {/* Project Image */}
                            <div className="xl:w-1/2 flex-shrink-0">
                                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10">
                                    <Image
                                        src={project.image}
                                        alt={project.title as string}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                    />
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="xl:w-1/2 flex flex-col justify-between">
                                {/* Project Info */}
                                <div className="mb-6">
                                    {/* Title with Icon */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-2 h-8 bg-gradient-to-b from-[#C73659] to-[#EEEEEE] rounded-full"></div>
                                        <h3 className={getFontSizeClass("text-white text-2xl sm:text-3xl font-bold")}>
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className={getFontSizeClass("text-white/80 text-base sm:text-lg leading-relaxed mb-6")}>
                                        {project.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="space-y-2 mb-6">
                                        {Array.isArray(project.features) && project.features.map((feature: string, index: number) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <span className="text-emerald-400 text-sm mt-1 flex-shrink-0">✦</span>
                                                <span className={getFontSizeClass("text-white/70 text-sm sm:text-base leading-relaxed")}>
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {Array.isArray(project.technologies) && project.technologies.map((tech: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white text-sm rounded-full border border-blue-400/30 hover:border-blue-400/50 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <a
                                        href={project.liveDemo}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#A91D3A] to-[#151515]/50  text-white rounded-lg hover:bg-white/20 hover:border-white/30  transition-all duration-200 font-medium shadow-lg"
                                    >
                                        <ExternalLink size={16} />
                                        {t('common.demo')}
                                    </a>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Project;