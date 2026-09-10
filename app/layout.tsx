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
  title: 'Santino Dacuy — Analista en Sistemas de Información',
  description:
    'Portafolio de Santino Dacuy, Analista en Sistemas de Información con perfil full-stack orientado a backend y bases de datos. Concepción del Uruguay, Entre Ríos, Argentina.',
  keywords: [
    'Santino Dacuy',
    'Analista en Sistemas',
    'Desarrollador Backend',
    'Full Stack Developer',
    'PostgreSQL',
    'Node.js',
    'React',
    'Data Warehouse',
    'Concepción del Uruguay',
    'Argentina'
  ],
  authors: [{ name: 'Santino Dacuy' }],
  creator: 'Santino Dacuy',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    title: 'Santino Dacuy — Analista en Sistemas de Información',
    description:
      'Desarrollo full-stack con foco en backend, bases de datos y arquitectura de sistemas. Buscando mi primera oportunidad profesional.',
    siteName: 'Santino Dacuy Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santino Dacuy — Analista en Sistemas de Información',
    description:
      'Desarrollo full-stack con foco en backend, bases de datos y arquitectura de sistemas.',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#07090f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`dark ${sans.variable} ${mono.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
