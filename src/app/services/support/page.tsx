import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { buildPageMetadata, serviceMetadataBySlug } from '@/lib/metadata'

const supportMetadata = serviceMetadataBySlug.support

export const metadata = buildPageMetadata({
  title: supportMetadata.title,
  description: supportMetadata.description,
  path: '/services/support',
})

export default function SupportServicePage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--white)', minHeight: '100vh', paddingTop: '72px' }}>
        <section className="section" style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)' }}>
          <div className="section-label">Service</div>
          <h1 className="section-headline" style={{ maxWidth: '900px' }}>Automation Support &amp; Maintenance</h1>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            Expert on-site and remote support, 24/7 — backed by senior engineers with real commissioning experience.
          </p>
        </section>

        <section className="section" style={{ background: 'var(--white)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
            24/7 Automation Support
          </h2>
          <p style={{ maxWidth: '900px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85 }}>
            Metromotion Controls offers flexible and cost-effective automation support contracts, ensuring expert assistance whenever you need it. Whether it's an urgent on-site breakdown or 24/7 on-call support, we tailor our services to match your operational needs. Our support team is made up of highly skilled senior engineers with extensive project and commissioning experience — working quickly to resolve issues, minimise downtime, and keep your systems running smoothly. With reliable 24/7 support at competitive rates, you can focus on your business while we handle the technical challenges.
          </p>
        </section>

        <section className="section" style={{ background: 'var(--off)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
            Ongoing Site Maintenance
          </h2>
          <p style={{ maxWidth: '900px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85 }}>
            Keeping your factory running at peak efficiency requires continuous improvement and proactive maintenance. Our team combines technical expertise with hands-on support, offering regular inspections, performance assessments, and targeted improvements. By identifying potential issues early, we extend the lifespan of your equipment and enhance operational stability.
          </p>
          <ul style={{ maxWidth: '920px', paddingLeft: '20px', display: 'grid', gap: '10px', marginTop: '20px' }}>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>Breakdown site visit (Melbourne)</li>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>Breakdown remote assistance over phone &amp; VPN (Interstate, International)</li>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>PLC or HMI programming change requests for continuous improvement</li>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>Temporary on-site cover for high workload periods or staff shortage</li>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>Annual electrical and automation site review and recommendation report</li>
            <li style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>Assist maintaining and updating site documentation (Electrical Drawings, Functional Descriptions, User Manuals)</li>
          </ul>
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
