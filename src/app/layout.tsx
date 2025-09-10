import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CardNav from "@/components/CardNav";

const items = [
  {
    label: "About",
    bgColor: "linear-gradient(135deg, #A91D3A, #C72C41, #E94560)",
    textColor: "#fff",
    links: [{ label: "Me", href: "/about/company", ariaLabel: "About Me" }],
  },
  {
    label: "Projects",
    bgColor: "linear-gradient(135deg, #8C1C32, #A91D3A, #C72C41)",
    textColor: "#fff",
    links: [
      {
        label: "Featured",
        href: "/projects/featured",
        ariaLabel: "Featured Projects",
      },
      {
        label: "Case Studies",
        href: "/projects/case-studies",
        ariaLabel: "Project Case Studies",
      },
    ],
  },
  {
    label: "Contact",
    bgColor: "linear-gradient(135deg, #6E1423, #A91D3A, #E94560)",
    textColor: "#fff",
    links: [
      {
        label: "Email",
        href: "mailto:choknantawongvipat@gmail.com",
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#151515] overflow-x-hidden`}
      >
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
        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}