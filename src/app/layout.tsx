import type { Metadata } from "next";
import "./globals.css";

// TODO: definir la tipografía final junto con el diseño de Figma
// (con next/font/google o next/font/local, según lo que se elija).

export const metadata: Metadata = {
  title: "Santino — Software Engineer",
  description: "Portfolio de Santino: backend, bases de datos y BI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
