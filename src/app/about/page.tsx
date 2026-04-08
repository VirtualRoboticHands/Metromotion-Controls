import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'About Metromotion Controls',
  description:
    'Learn about Metromotion Controls, a Melbourne automation engineering team supporting manufacturers across Australia with PLC, SCADA and control systems expertise.',
  path: '/about',
})

const timeline = [
  { year: '2012', title: 'Founded & Chobani Partnership', desc: 'Metromotion Controls established in Melbourne. Engaged as automation partner for Chobani\'s Australian yoghurt manufacturing operations, a partnership that continues today.' },
  { year: '2015', title: 'National Expansion', desc: 'First interstate projects delivered, extending beyond Victoria to food and beverage manufacturing sites across New South Wales, South Australia, and Queensland.' },
  { year: '2017', title: 'La Casa del Formaggio & Ignition Gold Certified', desc: 'Began a long-term automation partnership with La Casa del Formaggio, supporting their cheese manufacturing operations. Achieved Ignition Gold Certified Integrator status in the same year.' },
  { year: '2018', title: 'Lactalis Partnership', desc: 'Partnered with Lactalis Australia for automation support across their dairy processing operations. A relationship that continues today across multiple sites nationally, covering PLC, SCADA, and control system engineering.' },
  { year: '2020', title: 'Remedy Drinks Partnership', desc: 'Partnered with Remedy Drinks on their greenfield kombucha manufacturing facility. An ongoing partnership supporting their continued growth and production expansion.' },
  { year: '2026', title: '20 Engineers, National Delivery', desc: 'Team grows to 20 engineers. Delivering across 7+ industries nationally with long-term partnerships spanning food and beverage, dairy, FMCG, pet food, packaging, agricultural processing, and building products.' },
]
const values = [
  { title: 'Engineer-to-Engineer', desc: 'You talk directly to the engineers who design and deliver your systems. No sales layer, no account managers. The person scoping your project is the same person commissioning it.' },
  { title: 'Build to Maintain', desc: 'We design systems knowing we\'ll be the ones supporting them long term. That means cleaner code, better documentation, and architecture that your maintenance team can actually work with.' },
  { title: 'Platform Agnostic', desc: 'We recommend what\'s right for your site, not what earns us the biggest margin. Allen-Bradley, Siemens, Ignition, AVEVA. We work across all major platforms and design around your existing standards.' },
  { title: 'Long-Term Partnerships', desc: 'Our business is built on relationships that last. 80% of our clients come back, and our longest partnerships span over a decade. We want your project to succeed because that\'s how we earn the next one. That means honest scoping, transparent delivery, and no surprise variations.' },
]

export default function AboutPage() {
  const yearsInOperation = new Date().getFullYear() - 2012

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '72px' }}>
        {/* Header */}
        <section style={{
          background: 'var(--ink)', padding: '80px 52px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }} className="about-header">
          <Image
            src="/images/ProjectManagementBanner.png"
            alt="Project management planning session for industrial automation delivery"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-label" style={{ color: 'var(--red)' }}>About Us</div>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(38px, 4.5vw, 60px)',
              color: 'white', lineHeight: 1.05, letterSpacing: '-0.02em',
            }}>
              Engineers who<br/>build what they <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>maintain</em>
            </h1>
          </div>
          <p style={{
            fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, fontWeight: 300,
            position: 'relative', zIndex: 1,
          }}>
            Metromotion Controls is a Melbourne-based industrial automation and control systems engineering company. We design, program, commission and support automation systems for food and beverage, dairy, FMCG, pet food, packaging, agricultural processing, and building products facilities across Australia. Founded in 2012, we&apos;ve grown to a team of 20 engineers delivering nationally.
          </p>
        </section>

        {/* Stats band */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'var(--border)', borderBottom: '1px solid var(--border)', gap: '1px',
        }} className="about-stats">
          {[
            { num: '200+', label: 'Projects delivered' },
            { num: '80%', label: 'Repeat client rate' },
            { num: '75+', label: 'Clients served' },
            { num: `${yearsInOperation}+`, label: 'Years in operation' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--white)', padding: '40px 36px',
              display: 'flex', flexDirection: 'column', gap: '6px',
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', color: 'var(--red)', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <section className="section" style={{ background: 'var(--off)' }}>
          <div className="section-label">How We Work</div>
          <h2 className="section-headline">Our <em>approach</em></h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            background: 'var(--border)', border: '1px solid var(--border)', gap: '1px', marginTop: '48px',
          }} className="values-grid">
            {values.map(v => (
              <div key={v.title} style={{
                background: 'var(--white)', padding: '40px 32px',
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)' }}>{v.title}</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="section" style={{ background: 'var(--white)' }}>
          <div className="section-label">Our History</div>
          <h2 className="section-headline">Our story <em>so far</em></h2>
          <div style={{
            marginTop: '48px', display: 'flex', flexDirection: 'column',
            border: '1px solid var(--border)',
          }}>
            {timeline.map((t, i) => (
              <div key={t.year} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr', gap: '32px',
                padding: '32px 36px',
                borderBottom: i < timeline.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }} className="timeline-row">
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--red)', lineHeight: 1 }}>{t.year}</div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>{t.title}</div>
                  <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{
          background: 'var(--ink)', padding: '80px 52px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px',
        }} className="about-cta">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3.5vw, 44px)', color: 'white', lineHeight: 1.1 }}>
            Ready to work with us?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', maxWidth: '460px', lineHeight: 1.7, fontWeight: 300 }}>
            Talk to an engineer, not a sales team. We&apos;ll give you a straight answer.
          </p>
          <Link href="/contact" className="btn-cta" style={{ textDecoration: 'none', marginTop: '8px' }}>
            Start a Conversation
          </Link>
        </div>
      </main>
      <Footer />

    </>
  )
}
