import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { services } from '@/lib/services'
import { buildPageMetadata } from '@/lib/metadata'
import { buildOrganisationSchema, buildServicesIndexBreadcrumbSchema } from '@/lib/schema'

export const metadata = buildPageMetadata({
  title: 'Automation Services',
  description:
    'Explore industrial automation services from our Melbourne engineering team, including control systems, PLC, SCADA and commissioning across Australia. View services now.',
  path: '/services',
})

export default function ServicesIndexPage() {
  const organisationSchema = buildOrganisationSchema()
  const breadcrumbSchema = buildServicesIndexBreadcrumbSchema()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />
      <main style={{ background: 'var(--off)', minHeight: '100vh', paddingTop: '72px' }}>
        <section className="section" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="section-label">Services</div>
          <h1 className="section-headline">Automation services built for <em>industrial uptime</em></h1>
          <p className="section-sub" style={{ maxWidth: '760px' }}>
            Metromotion Controls is a Melbourne-based engineering team delivering control systems, integration and commissioning services across Australia.
          </p>
        </section>

        <section className="section" style={{ paddingTop: '56px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            background: 'var(--border)',
            border: '1px solid var(--border)',
            gap: '1px'
          }} className="industry-grid">
            {services.map((service) => (
              <article key={service.slug} style={{ background: 'var(--white)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', lineHeight: 1.1, color: 'var(--ink)' }}>{service.name}</h2>
                <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7, flex: 1 }}>{service.shortDescription}</p>
                <Link href={`/services/${service.slug}`} className="btn-outline" style={{ width: 'fit-content' }}>
                  View service
                </Link>
              </article>
            ))}
            <article style={{ background: 'var(--white)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', lineHeight: 1.1, color: 'var(--ink)' }}>Automation Support &amp; Maintenance</h2>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7, flex: 1 }}>
                Expert on-site and remote support, available 24/7 and backed by senior engineers with real commissioning experience.
              </p>
              <Link href="/services/support" className="btn-outline" style={{ width: 'fit-content' }}>
                View service
              </Link>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
