import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GeoTech | Topografia & Georreferenciamento',
  description:
    'Soluções precisas em topografia, georreferenciamento, locação de obras e regularização fundiária. Equipamentos GNSS de alta precisão e equipe especializada.',
  keywords: [
    'topografia',
    'georreferenciamento',
    'levantamento topográfico',
    'locação de obras',
    'regularização fundiária',
    'aerolevantamento',
    'drone',
    'GNSS',
    'cadastro técnico',
    'engenharia',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'GeoTech | Topografia & Georreferenciamento',
    description:
      'Precisão em topografia para o seu projeto. Levantamentos topográficos, georreferenciamento e locação de obras.',
    siteName: 'GeoTech Topografia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  authors: [{ name: 'GeoTech Topografia' }],
  category: 'Engenharia',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1F3A5F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'GeoTech Topografia',
              description:
                'Empresa especializada em topografia, georreferenciamento e engenharia de precisão.',
              url: 'https://geotech.com.br',
              telephone: '+55-11-99999-9999',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'São Paulo',
                addressRegion: 'SP',
                addressCountry: 'BR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -23.5505,
                longitude: -46.6333,
              },
              sameAs: ['https://instagram.com/geotech'],
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '18:00',
                },
              ],
              priceRange: '$$',
              serviceArea: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: -23.5505,
                  longitude: -46.6333,
                },
                geoRadius: '500000',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
