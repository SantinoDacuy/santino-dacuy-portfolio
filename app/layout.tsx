import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://santino-dacuy-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: 'Santino Dacuy — Analista en Sistemas de Información | Portafolio',
  description:
    'Portafolio oficial de Santino Dacuy, Analista en Sistemas de Información con perfil orientado a backend, bases de datos y arquitectura de sistemas. Concepción del Uruguay, Entre Ríos, Argentina.',
  keywords: [
    'Santino Dacuy',
    'Santino Dacuy portfolio',
    'Santino Dacuy analista en sistemas',
    'Analista en Sistemas de Información',
    'Desarrollador Backend',
    'Full Stack Developer',
    'PostgreSQL',
    'Node.js',
    'Next.js',
    'Data Warehouse',
    'UADER FCyT',
    'Concepción del Uruguay',
    'Entre Ríos',
    'Argentina'
  ],
  authors: [{ name: 'Santino Dacuy', url: 'https://santino-dacuy-portfolio.vercel.app' }],
  creator: 'Santino Dacuy',
  publisher: 'Santino Dacuy',
  openGraph: {
    type: 'profile',
    locale: 'es_AR',
    url: 'https://santino-dacuy-portfolio.vercel.app',
    title: 'Santino Dacuy — Analista en Sistemas de Información',
    description:
      'Portafolio profesional de Santino Dacuy: desarrollo full-stack con foco en backend, bases de datos relacionales y arquitectura de software.',
    siteName: 'Santino Dacuy Portfolio',
    images: [
      {
        url: '/SANyLEGO.jpeg',
        width: 1200,
        height: 630,
        alt: 'Santino Dacuy — Analista en Sistemas de Información',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santino Dacuy — Analista en Sistemas de Información',
    description:
      'Portafolio profesional de Santino Dacuy: desarrollo full-stack con foco en backend y bases de datos.',
    images: ['/SANyLEGO.jpeg'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  colorScheme: 'dark',
  themeColor: '#07090f',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://santino-dacuy-portfolio.vercel.app/#person',
      name: 'Santino Dacuy',
      jobTitle: 'Analista en Sistemas de Información',
      description:
        'Analista en Sistemas de Información y desarrollador full-stack orientado a backend y bases de datos.',
      url: 'https://santino-dacuy-portfolio.vercel.app',
      image: 'https://santino-dacuy-portfolio.vercel.app/SANyLEGO.jpeg',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Concepción del Uruguay',
        addressRegion: 'Entre Ríos',
        addressCountry: 'AR',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Universidad Autónoma de Entre Ríos (UADER) - FCyT',
      },
      sameAs: [
        'https://www.linkedin.com/in/santino-dacuy',
        'https://github.com/SantinoDacuy',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://santino-dacuy-portfolio.vercel.app/#website',
      url: 'https://santino-dacuy-portfolio.vercel.app',
      name: 'Santino Dacuy Portfolio',
      description: 'Portafolio oficial de Santino Dacuy - Analista en Sistemas de Información',
      publisher: {
        '@id': 'https://santino-dacuy-portfolio.vercel.app/#person',
      },
      inLanguage: 'es-AR',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`dark ${sans.variable} ${mono.variable} overflow-x-hidden`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans overflow-x-hidden min-h-screen relative">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
