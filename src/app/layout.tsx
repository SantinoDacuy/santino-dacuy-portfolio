import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CursorEffects from "@/components/ui/CursorEffects";
import EasterEgg from "@/components/ui/EasterEgg";
import GrainOverlay from "@/components/ui/GrainOverlay";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Santino — Software Engineer",
  description: "Portfolio de Santino: backend, bases de datos y BI.",
  openGraph: {
    title: "Santino — Software Engineer",
    description: "Portfolio de Santino: backend, bases de datos y BI.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-body bg-background text-primary">
        <CursorEffects />
        <EasterEgg />
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
