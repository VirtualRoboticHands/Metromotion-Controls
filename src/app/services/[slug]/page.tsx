import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { services, servicesBySlug } from '@/lib/services'
import type { Metadata } from 'next'
import { buildPageMetadata, serviceMetadataBySlug } from '@/lib/metadata'
import { buildFaqPageSchema, buildOrganisationSchema, buildServiceBreadcrumbSchema, buildServiceSchema } from '@/lib/schema'

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const serviceMetadata = serviceMetadataBySlug[slug]

  if (!serviceMetadata) {
    return {}
  }

  return buildPageMetadata({
    title: serviceMetadata.title,
    description: serviceMetadata.description,
    path: `/services/${slug}`,
  })
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesBySlug[slug]

  if (!service) {
    notFound()
  }

  const serviceSchema = buildServiceSchema({ name: service.name, description: service.heroDescription, slug: service.slug })
  const breadcrumbSchema = buildServiceBreadcrumbSchema({ name: service.name, slug: service.slug })
  const organisationSchema = buildOrganisationSchema()
  const faqSchema = buildFaqPageSchema(service.faqs)
  const heroImageBySlug: Record<string, { src: string; alt: string }> = {
    commissioning: {
      src: '/images/CommissioningBanner.png',
      alt: 'Engineers commissioning industrial automation equipment on site',
    },
    'ot-networks': {
      src: '/images/OTBanner.png',
      alt: 'Industrial OT networking hardware and secure connectivity infrastructure',
    },
    'functional-safety': {
      src: '/images/SafetyBanner.png',
      alt: 'Functional safety systems and machinery safety controls in an industrial plant',
    },
    'automation-upgrades': {
      src: '/images/SupportBanner.png',
      alt: 'Automation upgrade works on legacy industrial control systems',
    },
    support: {
      src: '/images/SupportBanner.png',
      alt: 'Automation support and maintenance engineers working on industrial control systems',
    },
    'control-panel-engineering': {
      src: '/images/ElectricalEngineeringBanner.png',
      alt: 'Control panel engineering and electrical design workspace',
    },
  }
  const heroImage = heroImageBySlug[service.slug]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <main style={{ background: 'var(--white)', minHeight: '100vh', paddingTop: '72px' }}>
        <section className="section" style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          {heroImage && (
            <>
              <Image src={heroImage.src} alt={heroImage.alt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
            </>
          )}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-label" style={{ color: heroImage ? 'var(--red)' : undefined }}>Service</div>
            <h1 className="section-headline" style={{ maxWidth: '900px', color: heroImage ? 'white' : undefined }}>{service.name}</h1>
            <p className="section-sub" style={{ maxWidth: '780px', color: heroImage ? 'rgba(255,255,255,0.85)' : undefined }}>{service.heroDescription}</p>
          </div>
        </section>

        {service.sections.map((section, index) => (
          <section
            key={section.heading}
            className="section"
            style={{ background: index % 2 === 0 ? 'var(--white)' : 'var(--off)' }}
          >
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
              {section.heading}
            </h2>
            <p style={{ maxWidth: '900px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85 }}>{section.body}</p>
          </section>
        ))}

        <section className="section" style={{ background: 'var(--off)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
            Core capabilities
          </h2>
          <ul style={{ maxWidth: '920px', paddingLeft: '20px', display: 'grid', gap: '10px' }}>
            {service.capabilities.map((capability) => (
              <li key={capability} style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>{capability}</li>
            ))}
          </ul>
        </section>

        <section className="section" style={{ background: 'var(--ink)', color: 'white' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, marginBottom: '16px' }}>
            Industries served
          </h2>
          <p style={{ maxWidth: '900px', color: 'rgba(255,255,255,0.75)', fontSize: '16px', lineHeight: 1.8 }}>
            As a Melbourne-based controls partner, we deliver this service for food and beverage, water treatment, mining and manufacturing operations across Australia.
          </p>
        </section>

        <section className="section" style={{ background: 'var(--off)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
            How Metromotion Controls delivers this service
          </h2>
          <p style={{ maxWidth: '900px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85 }}>
            Every engagement is delivered through a structured workflow that combines technical depth with practical site coordination. We begin with a scoping workshop to confirm objectives, interfaces, risks and acceptance criteria. From there, we develop design artefacts, software and test documentation under revision control, with peer review checkpoints to keep quality high. During implementation, we coordinate closely with operations, electricians, OEMs and project managers so assumptions remain visible and decisions are made quickly. FAT, SAT and commissioning activities are documented with clear evidence, defect tracking and closure records. After handover, we can provide targeted training, optimisation support and managed follow-up actions so site teams can operate with confidence. This approach helps clients achieve reliable outcomes, maintain compliance expectations and build internal capability at the same time.
          </p>
        </section>

        <section className="section" style={{ background: 'var(--white)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
            Frequently asked questions
          </h2>
          <div style={{ maxWidth: '920px', display: 'grid', gap: '24px' }}>
            {service.faqs.map((faq) => (
              <article key={faq.question}>
                <h3 style={{ color: 'var(--ink)', fontSize: '20px', lineHeight: 1.4, marginBottom: '8px' }}>{faq.question}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8 }}>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" style={{ background: 'var(--off)' }}>
          <div className="cta-grid" style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '28px',
            alignItems: 'center',
            border: '1px solid var(--border)',
            background: 'var(--white)',
            padding: '36px'
          }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.1, color: 'var(--ink)' }}>
                Need support with {service.name.toLowerCase()}?
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.75, marginTop: '12px' }}>
                Speak directly with an engineer about scope, timing and technical constraints.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/contact" className="btn-cta" style={{ textDecoration: 'none' }}>
                Talk to our team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
