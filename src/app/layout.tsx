import type { Metadata } from "next";
import "./globals.css";
import CardNav from "@/components/CardNav";
import { FontSizeProvider } from "@/contexts/FontSizeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ControlPanel from "@/components/ControlPanel";

// Navigation items will be created dynamically in CardNav component
const items = [
  {
    label: "About",
    bgColor: "linear-gradient(135deg, #A91D3A, #C72C41, #E94560)",
    textColor: "#fff",
    links: [
      { label: "About", href: "#about", ariaLabel: "About Me" },
      { label: "Education", href: "#educate", ariaLabel: "About Education" },
      { label: "Tech Stack", href: "#stack", ariaLabel: "About Tech Stack" },
      { label: "Projects", href: "#project", ariaLabel: "About Projects" },
      { label: "Certificates", href: "#certificates", ariaLabel: "About Certificates" },
      { label: "Activities", href: "#activity", ariaLabel: "About Activities" },
    ],
  },

  {
    label: "Contact",
    bgColor: "linear-gradient(135deg, #6E1423, #A91D3A, #E94560)",
    textColor: "#fff",
    links: [
      {
        label: "Email",
        href: "mailto:vipat.choknantawong@gmail.com",
        ariaLabel: "Send email to Vipat",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/vipat.choknantawong",
        ariaLabel: "Visit Facebook profile",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/earth-vipat-a87b092a5/",
        ariaLabel: "Visit LinkedIn profile",
      },
    ],
  },
];


export const metadata: Metadata = {
  title: "Vipat | Portfolio",
  description: "Portfolio website of Vipat Choknantawong - Full Stack Developer and Freelancer specializing in modern web technologies.",
  keywords: "Vipat, Choknantawong, Portfolio, Full Stack Developer, Frontend, Backend, React, Next.js",
  authors: [{ name: "Vipat Choknantawong" }],
  openGraph: {
    title: "Vipat | Portfolio",
    description: "Portfolio website of Vipat Choknantawong - Full Stack Developer",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="antialiased bg-[#151515] overflow-x-hidden font-sans"
      >
        <LanguageProvider>
          <FontSizeProvider>
            <CardNav
              logo="/logo.png"
              logoAlt="Vipat Portfolio Logo"
              items={items}
              baseColor="rgba(255, 255, 255, 0.95)"
              menuColor="#000"
              buttonBgColor="#A91D3A"
              buttonTextColor="#fff"
              ease="power3.out"
              className="animate-slide-down"
            />
            <ControlPanel />
            <main className="relative min-h-screen">
              {children}
            </main>
          </FontSizeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}