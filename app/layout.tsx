import type { Metadata } from "next";
import { Chakra_Petch, Inter, IBM_Plex_Mono } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import BackgroundGrid from "@/components/ui/BackgroundGrid";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionNav from "@/components/ui/SectionNav";
import "./globals.css";

const display = Chakra_Petch({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Parstech — Yüksek Performanslı Fren Balata Sistemleri",
  description:
    "Parstech fren balataları: 650°C ısı direnci, tutarlı sürtünme katsayısı, sessiz çalışma. ECE R90 sertifikalı.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} relative bg-bg font-body text-ink antialiased`}
      >
        <LenisProvider>
          <BackgroundGrid />
          <ScrollProgress />
          <SectionNav />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
