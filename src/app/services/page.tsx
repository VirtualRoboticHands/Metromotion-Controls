import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { services } from '@/lib/services'
import { buildPageMetadata } from '@/lib/metadata'
import { buildOrganisationSchema, buildServicesIndexBreadcrumbSchema } from '@/lib/schema'

export const metadata = buildPageMetadata({
  title: 'Industrial Automation Services Melbourne',
  description:
    'Industrial automation services from a Melbourne engineering team: control systems, PLC, SCADA, HMI, control panel engineering and commissioning delivered across Australia.',
  path: '/services',
})

const tier1Slugs = ['industrial-automation', 'plc-scada-hmi', 'control-panel-engineering', 'industrial-data-iiot']

const tier1Icons: Record<string, React.ReactNode> = {
  'industrial-automation': (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c8281e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10v4M10 9v6M14 10v4M18 8v8" />
    </svg>
  ),
  'plc-scada-hmi': (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c8281e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="1" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3-3 3M13 14h4" />
    </svg>
  ),
  'control-panel-engineering': (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c8281e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  'industrial-data-iiot': (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c8281e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
}

export default function ServicesIndexPage() {
  const organisationSchema = buildOrganisationSchema()
  const breadcrumbSchema = buildServicesIndexBreadcrumbSchema()

  const tier1Services = tier1Slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services

  const tier2Services = services.filter((s) => !tier1Slugs.includes(s.slug))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />
      <main style={{ background: 'var(--off)', minHeight: '100vh', paddingTop: '72px' }}>
        <section className="section" style={{ borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <Image
            src="/images/AutomationBanner-1.png"
            alt="Industrial automation services with control systems and instrumentation in operation"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-label" style={{ color: 'var(--red)' }}>Services</div>
            <h1 className="section-headline" style={{ color: 'white' }}>Automation services built for <em>industrial uptime</em></h1>
            <p className="section-sub" style={{ maxWidth: '760px', color: 'rgba(255,255,255,0.85)' }}>
              Metromotion Controls is a Melbourne-based engineering team delivering control systems, integration and commissioning services across Australia.
            </p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '56px', paddingBottom: '64px' }}>
          {/* TIER 1 — 2x2 card grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
          }} className="services-tier1-grid">
            {tier1Services.map((service) => (
              <article key={service.slug} style={{
                background: 'var(--white)',
                border: '0.5px solid var(--border)',
                borderRadius: '12px',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                minHeight: '200px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: '#fef2f1',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {tier1Icons[service.slug]}
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16.5px',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: 'var(--ink)',
                  margin: 0,
                }}>
                  {service.name}
                </h2>
                <p style={{
                  color: 'var(--muted)',
                  fontSize: '13px',
                  lineHeight: 1.65,
                  margin: 0,
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }}>
                  {service.shortDescription}
                </p>
                <Link href={`/services/${service.slug}`} style={{
                  color: '#c8281e',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  marginTop: 'auto',
                }}>
                  View service →
                </Link>
              </article>
            ))}
          </div>

          {/* TIER 2 — stacked rows */}
          <div style={{
            marginTop: '10px',
            border: '0.5px solid var(--border)',
            borderRadius: '12px',
            background: 'var(--white)',
            overflow: 'hidden',
          }}>
            {tier2Services.map((service, i) => (
              <div key={service.slug} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                padding: '18px 24px',
                borderTop: i > 0 ? '0.5px solid var(--border)' : 'none',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14.5px',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    margin: 0,
                    lineHeight: 1.3,
                  }}>
                    {service.name}
                  </h3>
                  <p style={{
                    color: 'var(--muted)',
                    fontSize: '12.5px',
                    lineHeight: 1.55,
                    margin: '4px 0 0',
                  }}>
                    {service.shortDescription}
                  </p>
                </div>
                <Link href={`/services/${service.slug}`} style={{
                  color: '#c8281e',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}>
                  View →
                </Link>
              </div>
            ))}
            {/* Support — not in services lib */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              padding: '18px 24px',
              borderTop: '0.5px solid var(--border)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14.5px',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  Automation Support &amp; Maintenance
                </h3>
                <p style={{
                  color: 'var(--muted)',
                  fontSize: '12.5px',
                  lineHeight: 1.55,
                  margin: '4px 0 0',
                }}>
                  Expert on-site and remote support available 24/7, with senior engineers who have real commissioning experience.
                </p>
              </div>
              <Link href="/services/support" style={{
                color: '#c8281e',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}>
                View →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
