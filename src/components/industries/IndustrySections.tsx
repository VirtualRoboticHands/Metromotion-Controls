import Link from 'next/link'
import Image from 'next/image'
import type { IndustryContent } from '@/data/industries'

const h2Style = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(30px, 3vw, 42px)',
  lineHeight: 1.1,
  color: 'var(--ink)',
  marginBottom: '20px',
} as const

export function IndustryBreadcrumb({ name, slug }: { name: string; slug: string }) {
  return (
    <section className="section" style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
      <ol style={{ listStyle: 'none', display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--muted)' }}>
        <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
        <li>/</li>
        <li><Link href="/industries" style={{ color: 'inherit', textDecoration: 'none' }}>Industries</Link></li>
        <li>/</li>
        <li style={{ color: 'var(--ink)' }}><Link href={`/industries/${slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{name}</Link></li>
      </ol>
    </section>
  )
}

export function IndustryHero({ industry }: { industry: IndustryContent }) {
  const heroImage = industry.slug === 'dairy'
    ? {
        src: '/images/ServicesBanner.png',
        alt: 'Dairy processing automation systems and production equipment',
      }
    : null

  return (
    <section className="section" style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      {heroImage && (
        <>
          <Image src={heroImage.src} alt={heroImage.alt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
        </>
      )}
      <div className="section-label" style={{ color: heroImage ? 'var(--red)' : undefined, position: 'relative', zIndex: 1 }}>Industry</div>
      <h1 className="section-headline" style={{ maxWidth: '900px', color: heroImage ? 'white' : undefined, position: 'relative', zIndex: 1 }}>{industry.name}</h1>
      {industry.heroSummary.map((item) => (
        <p key={item} className="section-sub" style={{ maxWidth: '900px', marginTop: '14px', color: heroImage ? 'rgba(255,255,255,0.85)' : undefined, position: 'relative', zIndex: 1 }}>{item}</p>
      ))}
      <Link href="/contact" className="btn-cta" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '20px', position: 'relative', zIndex: 1 }}>
        Get in Touch
      </Link>
    </section>
  )
}

export function IndustryChallenges({ industry }: { industry: IndustryContent }) {
  return (
    <section className="section" style={{ background: 'var(--white)' }}>
      <h2 style={h2Style}>Challenges in {industry.name}</h2>
      <div style={{ display: 'grid', gap: '18px', maxWidth: '950px' }}>
        {industry.challenges.map((challenge) => (
          <article key={challenge.title} style={{ border: '1px solid var(--border)', padding: '20px', background: 'var(--off)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--ink)' }}>{challenge.title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8, marginTop: '10px' }}>{challenge.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function IndustryBody({ industry }: { industry: IndustryContent }) {
  return (
    <>
      <section className="section" style={{ background: 'var(--off)' }}>
        <h2 style={h2Style}>Solutions</h2>
        {industry.solutions.map((item) => (
          <p key={item} style={{ maxWidth: '920px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85, marginTop: '12px' }}>{item}</p>
        ))}
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <h2 style={h2Style}>Typical Projects</h2>
        <div style={{ display: 'grid', gap: '16px', maxWidth: '950px' }}>
          {industry.typicalProjects.map((project) => (
            <article key={project.name} style={{ border: '1px solid var(--border)', padding: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '23px', color: 'var(--ink)' }}>{project.name}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8, marginTop: '10px' }}>{project.scope}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--off)' }}>
        <h2 style={h2Style}>Platforms & Standards</h2>
        <p style={{ maxWidth: '920px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85 }}>{industry.platformsIntro}</p>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--ink)', marginTop: '20px' }}>Platforms and protocols</h3>
        <ul style={{ maxWidth: '920px', paddingLeft: '20px', display: 'grid', gap: '10px', marginTop: '10px' }}>
          {industry.platforms.map((item) => <li key={item} style={{ color: 'var(--ink2)', lineHeight: 1.7 }}>{item}</li>)}
        </ul>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--ink)', marginTop: '20px' }}>Standards and compliance references</h3>
        <ul style={{ maxWidth: '920px', paddingLeft: '20px', display: 'grid', gap: '10px', marginTop: '10px' }}>
          {industry.standards.map((item) => <li key={item} style={{ color: 'var(--ink2)', lineHeight: 1.7 }}>{item}</li>)}
        </ul>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <h2 style={h2Style}>FAQ</h2>
        <div style={{ display: 'grid', gap: '16px', maxWidth: '950px' }}>
          {industry.faqs.map((faq) => (
            <article key={faq.question} style={{ border: '1px solid var(--border)', padding: '20px', background: 'var(--off)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--ink)' }}>{faq.question}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8, marginTop: '10px' }}>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export function IndustryCTA({ name }: { name: string }) {
  return (
    <section className="section" style={{ background: 'var(--ink)', color: 'white' }}>
      <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1 }}>
            Ready to discuss your {name.toLowerCase()} project?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', marginTop: '12px', maxWidth: '760px', lineHeight: 1.8 }}>
            Talk with our engineering team about scope, timeline, compliance and integration priorities.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/contact" className="btn-cta" style={{ textDecoration: 'none' }}>Get in Touch</Link>
        </div>
      </div>
    </section>
  )
}
