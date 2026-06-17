import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { TopoPageBackground } from '@/components/topo-page-background'
import config from '@/site.config'
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
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: config.seo.title,
    description: config.seo.description,
    siteName: config.brand.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  authors: [{ name: config.brand.name }],
  category: 'Engenharia',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: config.colors.primary,
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
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
        suppressHydrationWarning
      >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --primary: ${config.colors.primary};
                --foreground: ${config.colors.foreground};
                --background: ${config.colors.background};
                --muted: ${config.colors.muted};
                --secondary: ${config.colors.secondary};
                --destructive: ${config.colors.destructive};
                --border: ${config.colors.border};
                --topo-line: ${config.colors.topoLine};
                --topo-accent: ${config.colors.topoAccent};
                --background-alt: ${config.colors.backgroundAlt};
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: config.brand.name,
              description: config.seo.description,
              url: config.seo.ogImage || 'https://example.com',
              telephone: config.contact.phone,
              address: {
                '@type': 'PostalAddress',
                addressLocality: config.contact.address,
                addressCountry: 'BR',
              },
              sameAs: [config.social.instagram, config.social.linkedin].filter(Boolean),
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '18:00',
                },
              ],
              priceRange: '$$',
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Fundo topográfico fixo — carta de relevo para todo o site */}
        <TopoPageBackground />
        {/* Conteúdo acima do fundo */}
        <div className="relative" style={{ zIndex: 1 }}>
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
