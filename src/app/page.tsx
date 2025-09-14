import RotatingText from "@/components/RotatingText";
import Aurora from "@/components/Aurora";
import CardSwap, { Card } from "@/components/CardSwap";
import Image from "next/image";
import { MarqueeTech } from "@/components/marquee_tech";
import Project from "@/components/project";

export default function Home() {
  const educationData = [
    {
      title: `Triamudomsuksanomklao School`,
      period: `2016 - 2022`,
      detail: `Math - Science - Computer`,
      image: `/images/tun.png`,
    },
    {
      title: `King Mongkut's Institute of Technology Ladkrabang`,
      period: `2022 - Now`,
      detail: `School of Information Technology`,
      image: `/images/it.webp`,
    },

    {
      title: `It Open House 2024`,
      period: `Nov 2024`,
      detail: `Frontend Developer`,
      image: `/images/openhouse.png`,
    },

    {
      title: `Edvisory`,
      period: `2022 - Now`,
      detail: `Internship Frontend Developer`,
      image: `/images/edvisory.png`,
    },
  ];

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
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
              {`I'm`}
            </p>
            <RotatingText
              texts={[
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
                "Freelancer",
              ]}
              mainClassName="px-2 sm:px-3 bg-[#A91D3A]/50 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold rounded-lg select-none overflow-hidden py-1 sm:py-2 justify-center"
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
            <p className="text-lg sm:text-xl lg:text-2xl text-white opacity-70 leading-relaxed">
              Hello! My Name is Vipat Choknantawong. You can call me Takopiii.
            </p>
          </article>
        </div>
      </section>

      {/* Education Section */}
      <section className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8" id="educate">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Text content */}
            <div className="text-center lg:text-left lg:flex-shrink-0 lg:max-w-md xl:max-w-lg">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-4 sm:mb-6">
                My Education & Experience
              </h2>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                Where I learned, grew, and developed my abilities.
              </p>
            </div>

            {/* Cards container */}
            <div className="relative w-full lg:flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
              <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={true}
              >
                {educationData.map((exper, index) => (
                  <Card
                    key={index}
                    className="p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 text-center backdrop-blur-sm"
                  >
                    <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">
                      {exper.title}
                    </h3>
                    <p className="text-[#ff9cb0] font-bold text-sm sm:text-base">
                      {exper.period}
                    </p>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                      {exper.detail}
                    </p>
                    <div className="mt-2 sm:mt-4">
                      <Image
                        src={exper.image}
                        alt={exper.title}
                        width={200}
                        height={200}
                        className="rounded-lg object-contain w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px]"
                        priority={index === 0}
                      />
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="flex flex-col py-12 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8" id="stack">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center lg:text-left mb-8 sm:mb-12">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Technology Stack
            </h2>
            <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0">
              Technologies and tools I work with to bring ideas to life.
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

      {/* Coming Soon Message */}
      <div className="text-center mt-16 sm:mt-20" id="activity" >
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10">
          <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            More Content Coming Soon...
          </h3>
        </div>
      </div>
    </main>
  );
}