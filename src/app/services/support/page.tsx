import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { buildPageMetadata, serviceMetadataBySlug } from '@/lib/metadata'
import { buildFaqPageSchema, buildOrganisationSchema, buildServiceBreadcrumbSchema, buildServiceSchema } from '@/lib/schema'

const supportMetadata = serviceMetadataBySlug.support

const supportFaqs = [
  {
    question: 'What response options are available for urgent breakdowns?',
    answer: 'We provide both onsite and remote response pathways. The best option depends on fault criticality, available site personnel and remote access readiness. We agree escalation paths and response targets during onboarding so there is no uncertainty during an incident.',
  },
  {
    question: 'Can support contracts include preventative maintenance and improvement work?',
    answer: 'Yes. Many clients combine reactive support with planned inspections, backup verification, code health checks and small optimisation tasks. This blended model helps reduce recurring faults while maintaining fast response for urgent issues.',
  },
  {
    question: 'Do you support sites outside Melbourne?',
    answer: 'Yes. We support interstate and regional sites through remote diagnostics, scheduled visits and coordinated local contractor support where needed. Our delivery model is designed to keep response practical across distributed operations.',
  },
]

export const metadata = buildPageMetadata({
  title: supportMetadata.title,
  description: supportMetadata.description,
  path: '/services/support',
})

export default function SupportServicePage() {
  const serviceSchema = buildServiceSchema({
    name: 'Automation Support & Maintenance',
    description: 'Flexible automation support contracts, breakdown response, preventative maintenance and ongoing controls improvement services.',
    slug: 'support',
  })
  const breadcrumbSchema = buildServiceBreadcrumbSchema({ name: 'Automation Support & Maintenance', slug: 'support' })
  const organisationSchema = buildOrganisationSchema()
  const faqSchema = buildFaqPageSchema(supportFaqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <main style={{ background: 'var(--white)', minHeight: '100vh', paddingTop: '72px' }}>
        <section className="section" style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)' }}>
          <div className="section-label">Service</div>
          <h1 className="section-headline" style={{ maxWidth: '900px' }}>Automation Support &amp; Maintenance</h1>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            Expert onsite and remote automation support, available 24/7 and delivered by senior engineers with practical commissioning experience.
          </p>
        </section>

        <section className="section" style={{ background: 'var(--white)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
            24/7 Automation Support
          </h2>
          <p style={{ maxWidth: '900px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85 }}>
            Metromotion Controls provides flexible automation support models for manufacturers and process plants that cannot afford prolonged downtime. Our team supports emergency breakdown response, remote diagnostics and planned technical assistance for PLC, SCADA, HMI and OT infrastructure. We regularly work across Rockwell, Siemens, Omron, Schneider and Ignition environments, and we can integrate with your internal escalation workflow so operators and maintenance staff know exactly who to call and what information to provide. Support readiness includes secure remote access procedures, current backups, network visibility and defined response targets. This service is often used by sites that have limited in-house automation capacity on night shifts or weekends. By combining rapid fault response with strong diagnostic discipline, we help clients restore production quickly and reduce repeat failures over time.
          </p>
        </section>

        <section className="section" style={{ background: 'var(--off)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
            Ongoing Site Maintenance
          </h2>
          <p style={{ maxWidth: '900px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85 }}>
            Reliable automation performance depends on consistent maintenance, not only reactive callouts. We provide scheduled inspections, software health checks, alarm review and targeted optimisation to keep systems stable and maintainable. Preventative activities can include PLC backup verification, SCADA service status review, network diagnostics, historian health checks and documentation updates. Where improvement opportunities are identified, we implement practical changes such as interlock refinements, HMI usability updates and alarm rationalisation aligned with ISA-18.2 principles. A typical engagement involves monthly remote checks supported by quarterly site visits, with additional attendance during shutdown windows. This model helps operations teams detect risk early, improve resilience and avoid unplanned production impacts. We document findings and recommendations clearly so site leadership can prioritise investment based on real operational evidence.
          </p>
          <ul style={{ maxWidth: '920px', paddingLeft: '20px', display: 'grid', gap: '10px', marginTop: '20px' }}>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>Breakdown site visit support in Melbourne and surrounding regions</li>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>Breakdown remote assistance over phone and secure VPN for interstate sites</li>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>PLC and HMI programming change requests for continuous improvement</li>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>Temporary onsite engineering cover during peak workload or staff shortages</li>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>Annual electrical and automation review with prioritised recommendations</li>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>Support for maintaining drawings, functional descriptions and operator documentation</li>
          </ul>
        </section>

        <section className="section" style={{ background: 'var(--white)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
            How we deliver support at Metromotion Controls
          </h2>
          <p style={{ maxWidth: '900px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85 }}>
            Our support delivery model is designed to be practical for real industrial constraints. During onboarding we map critical assets, confirm escalation contacts, review remote access readiness and establish backup and restore expectations for controllers and servers. We then agree service routines such as monthly health checks, quarterly onsite reviews and clear response categories for urgent incidents. Each engagement includes documented findings, priority-ranked recommendations and progress tracking so improvements remain visible to both maintenance teams and leadership. When faults occur, we follow structured diagnostics that capture root cause, immediate fix and prevention actions, rather than only restoring operation and moving on. This creates a continuous improvement loop that strengthens reliability over time. The result is a dependable partnership that supports daily production while steadily reducing technical risk across your automation environment.
          </p>
        </section>

        <section className="section" style={{ background: 'var(--white)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
            Frequently asked questions
          </h2>
          <div style={{ maxWidth: '920px', display: 'grid', gap: '24px' }}>
            {supportFaqs.map((faq) => (
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
                Need support with your automation systems?
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.75, marginTop: '12px' }}>
                Speak directly with an engineer about your support requirements and site priorities.
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
