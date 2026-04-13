import type { Metadata } from 'next'
import './globals.css'
import {
  buildAbsoluteAssetUrl,
  defaultMetadata,
  organisationLogoPath,
  siteUrl,
} from '@/lib/metadata'

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: 'Metromotion Controls',
        url: siteUrl,
        logo: buildAbsoluteAssetUrl(organisationLogoPath),
        description:
          'Melbourne-based industrial automation and control systems integrator specialising in PLC programming, SCADA, HMI, IIoT and control panel engineering for manufacturers across Australia',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '39 Sunhill Rd',
          addressLocality: 'Mount Waverley',
          addressRegion: 'VIC',
          postalCode: '3149',
          addressCountry: 'Australia',
        },
        telephone: '+61398076896',
        email: 'info@metromotioncontrols.com.au',
        areaServed: 'Australia',
        foundingDate: '2012',
      },
      {
        '@type': 'ProfessionalService',
        name: 'Metromotion Controls',
        url: siteUrl,
        logo: buildAbsoluteAssetUrl(organisationLogoPath),
        serviceType: [
          'Industrial Automation',
          'Control Systems Integration',
          'PLC Programming',
          'SCADA Development',
        ],
        areaServed: 'Australia',
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  )
}
