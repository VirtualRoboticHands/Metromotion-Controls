import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Metromotion Controls',
  description:
    'Contact Metromotion Controls for industrial automation, PLC programming and SCADA support in Melbourne and across Australia. Speak with an engineer today.',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
