import { ExternalLink } from "lucide-react";
import Image from "next/image";

const Project = () => {
    const projects = [
        {
            id: 1,
            title: "Eye Yoga",
            description: "A system that detects and evaluates posture correctness through a webcam using Human Pose Estimation techniques (MediaPipe, MoveNet, TensorFlow). Users can select a pose they want to practice, and the system will display a reference pose and assess their performance in real time, providing accuracy scores and progress tracking for continuous improvement.",
            image: "/images/project/eyeyoga.png",
            features: [
                "Real-time pose detection using MediaPipe and TensorFlow",
                "Accuracy scoring and performance evaluation",
                "Multiple pose selection and practice modes",
                "Progress tracking and improvement analytics"
            ],
            technologies: ["Next.js", "Tailwind CSS", "FastAPI", "Python"],
            liveDemo: "https://www.youtube.com/watch?v=k2dFXt376ao",
        },
        {
            id: 2,
            title: "Ticker Bever",
            description: "A ticket booking and management system built with Django, featuring a modern and responsive UI powered by Tailwind CSS. The platform integrates Google API for authentication and chatbot functionality, provides analytical dashboards using Chart.js, and supports secure payment processing with PromptPay via Python library.",
            image: "/images/project/ticketbever.png",
            features: [
                "User authentication and chatbot integration using Google API",
                "Modern and responsive interface with Tailwind CSS",
                "Interactive dashboards and data visualization using Chart.js",
                "Secure payment processing with PromptPay (Python library)",
                "Built with Django for scalable backend support"
            ],
            technologies: ["Django", "Tailwind CSS", "Google API", "Chart.js"],
            liveDemo: "https://github.com/Earth123456789/Ticket-Bever",
        },
        {
            id: 2,
            title: "Safe Jai (Internship)",
            description: "A multilingual website developed and designed with support for internationalization (i18n) to enable both Thai and English. Built with Next.js and next-i18next for translation management, the system ensures seamless language switching. Tailwind CSS and SCSS were used to create a responsive UI/UX that aligns with the organization’s design system. Collaborated closely with design and backend teams to integrate APIs and ensure efficient system functionality.",
            image: "/images/project/safejai.png",
            features: [
                "Internationalization (i18n) support with Next.js and next-i18next",
                "Multilingual support (Thai / English)",
                "Responsive UI/UX design using Tailwind CSS and SCSS",
                "Aligned with the organization’s branding and design guidelines",
                "Seamless API integration with backend team collaboration",
                "Thorough testing for system efficiency and reliability"
            ],
            technologies: ["Next.js", "Tailwind CSS", "Scss", "next-i18next"],
            liveDemo: "https://safejai.sa.chula.ac.th/",
        },
        {
            id: 2,
            title: "Openhouse 2024",
            description: "An interactive web application developed for IT Open House 2024 to engage high school students in hands-on activities. Built with Next.js and styled using Magic UI and ShadCN UI, the platform ensures a modern, responsive, and user-friendly design. Form validation is powered by Zod. APIs are documented with SwaggerHub, and Tello is used for communication. The project is deployed on Vercel for seamless accessibility.",
            image: "/images/project/itopenhouse.png",
            features: [
                "Frontend built with Next.js and styled using Magic UI & ShadCN UI",
                "Form validation and error handling with Zod",
                "API documentation with SwaggerHub",
                "Tello integration for communication",
                "Deployed on Vercel for fast and reliable hosting",
                "Designed as an interactive activity platform for high school students"
            ],
            technologies: ["Next.js", "Tailwind CSS", "Shadcn", "Zod"],
            liveDemo: "https://openhouse.it.kmitl.ac.th/", // Replace with actual URL
        }
        // You can add more projects here
    ];

    return (
        <section className="flex flex-col py-12 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="text-center lg:text-left mb-12 sm:mb-16">
                    <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                        All My Projects
                    </h2>
                    <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0">
                        {"Showcasing my work and the technologies I've mastered through real-world projects."}
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
                                        alt={project.title}
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
                                        <h3 className="text-white text-2xl sm:text-3xl font-bold">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="space-y-2 mb-6">
                                        {project.features.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <span className="text-emerald-400 text-sm mt-1 flex-shrink-0">✦</span>
                                                <span className="text-white/70 text-sm sm:text-base leading-relaxed">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech, index) => (
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
                                        Demo
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