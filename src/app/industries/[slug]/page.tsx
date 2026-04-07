import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { industries, industriesBySlug } from '@/data/industries'
import { IndustryBody, IndustryBreadcrumb, IndustryCTA, IndustryChallenges, IndustryHero } from '@/components/industries/IndustrySections'
import { siteUrl } from '@/lib/metadata'

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const industry = industriesBySlug[slug]
  if (!industry) return {}

  const path = `/industries/${industry.slug}`

  return {
    title: { absolute: industry.title },
    description: industry.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: industry.title,
      description: industry.metaDescription,
      url: path,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: industry.title,
      description: industry.metaDescription,
    },
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industriesBySlug[slug]

  if (!industry) notFound()

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${industry.name} Automation`,
      provider: { '@type': 'Organization', name: 'Metromotion Controls', url: siteUrl },
      areaServed: { '@type': 'Country', name: 'Australia' },
      serviceType: `${industry.name} industrial automation`,
      description: industry.metaDescription,
      url: `${siteUrl}/industries/${industry.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Industries', item: `${siteUrl}/industries` },
        { '@type': 'ListItem', position: 3, name: industry.name, item: `${siteUrl}/industries/${industry.slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Metromotion Controls',
      url: siteUrl,
      areaServed: 'Australia',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: industry.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ]

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--white)', minHeight: '100vh', paddingTop: '72px' }}>
        <IndustryBreadcrumb name={industry.name} slug={industry.slug} />
        <IndustryHero industry={industry} />
        <IndustryChallenges industry={industry} />
        <IndustryBody industry={industry} />
        <IndustryCTA name={industry.name} />
        {schemas.map((schema, index) => (
          <script
            key={`${industry.slug}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </main>
      <Footer />
    </>
  )
}
