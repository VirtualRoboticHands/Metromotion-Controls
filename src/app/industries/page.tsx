import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { industries } from '@/data/industries'

export default function IndustriesIndexPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--white)', minHeight: '100vh', paddingTop: '72px' }}>
        <section className="section" style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)' }}>
          <div className="section-label">Industries</div>
          <h1 className="section-headline" style={{ maxWidth: '900px' }}>Industry-specific automation expertise</h1>
          <p className="section-sub" style={{ maxWidth: '820px' }}>
            Explore how Metromotion Controls approaches automation in food and beverage, dairy, FMCG, pet food, packaging, agricultural processing and building products environments.
          </p>
        </section>

        <section className="section" style={{ background: 'var(--white)' }}>
          <div style={{ display: 'grid', gap: '14px', maxWidth: '940px' }}>
            {industries.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article style={{ border: '1px solid var(--border)', background: 'var(--off)', padding: '20px' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', color: 'var(--ink)' }}>{industry.name}</h2>
                  <p style={{ marginTop: '10px', color: 'var(--muted)', lineHeight: 1.8 }}>{industry.metaDescription}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
