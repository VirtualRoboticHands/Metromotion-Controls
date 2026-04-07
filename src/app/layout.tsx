import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Metromotion Controls | Industrial Automation & Control Systems',
  description: 'Melbourne-based industrial automation and control systems engineering. PLC, SCADA, HMI specialists trusted by Chobani, Bulla, Arnott\'s and Australia\'s leading manufacturers.',
  keywords: 'industrial automation, control systems, PLC programming, SCADA, HMI, Melbourne, Australia, food and beverage automation',
  openGraph: {
    title: 'Metromotion Controls | Industrial Automation & Control Systems',
    description: 'PLC, SCADA & HMI specialists delivering nationally from Melbourne since 2012.',
    url: 'https://metromotioncontrols.com.au',
    siteName: 'Metromotion Controls',
    locale: 'en_AU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
