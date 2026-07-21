import { siteMetadata } from "@/data/metadata";
import "./globals.css";
import CardNav from "@/components/CardNav";
import { FontSizeProvider } from "@/contexts/FontSizeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SlideProvider } from "@/contexts/SlideContext";
import ControlPanel from "@/components/ControlPanel";
import ModeSwitchHint from "@/components/ModeSwitchHint";
import { SpotifyFloatingPlayer } from "@/components/spotify/SpotifyFloatingPlayer";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var theme = stored ? JSON.parse(stored) : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden font-sans">
        <ThemeProvider>
          <LanguageProvider>
            <FontSizeProvider>
              <SlideProvider>
                <CardNav
                  logo="/logo.png"
                  logoAlt="Vipat Portfolio Logo"
                  baseColor="var(--card)"
                  menuColor="var(--foreground)"
                  buttonBgColor="var(--primary)"
                  buttonTextColor="var(--primary-foreground)"
                  ease="power3.out"
                  className="animate-slide-down"
                />
                <ModeSwitchHint />
                <ControlPanel />
                <main className="relative min-h-screen">{children}</main>
                <SpotifyFloatingPlayer />
              </SlideProvider>
            </FontSizeProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
