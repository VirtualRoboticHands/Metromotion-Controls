import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Internal Content Generator | Metromotion Controls',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AdminGenerateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
