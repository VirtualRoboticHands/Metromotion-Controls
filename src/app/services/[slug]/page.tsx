import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { services, servicesBySlug } from '@/lib/services'
import type { Metadata } from 'next'
import { buildPageMetadata, serviceMetadataBySlug } from '@/lib/metadata'

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

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--white)', minHeight: '100vh', paddingTop: '72px' }}>
        <section className="section" style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)' }}>
          <div className="section-label">Service</div>
          <h1 className="section-headline" style={{ maxWidth: '900px' }}>{service.name}</h1>
          <p className="section-sub" style={{ maxWidth: '780px' }}>{service.heroDescription}</p>
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
            As a Melbourne-based controls partner, we deliver this service for food &amp; beverage, water treatment, mining and manufacturing operations across Australia.
          </p>
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
