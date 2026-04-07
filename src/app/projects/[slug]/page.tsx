import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { projects, projectsBySlug } from '@/lib/projects'
import type { Metadata } from 'next'
import { buildPageMetadata, projectMetadataBySlug } from '@/lib/metadata'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const projectMetadata = projectMetadataBySlug[slug]

  if (!projectMetadata) {
    return {}
  }

  return buildPageMetadata({
    title: projectMetadata.title,
    description: projectMetadata.description,
    path: `/projects/${slug}`,
  })
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsBySlug[slug]

  if (!project) {
    notFound()
  }

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--white)', minHeight: '100vh', paddingTop: '72px' }}>
        <section className="section" style={{ background: 'var(--off)', borderBottom: '1px solid var(--border)' }}>
          <div className="section-label">Project</div>
          <h1 className="section-headline" style={{ maxWidth: '900px' }}>{project.title}</h1>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '18px' }}>
            <span className="tag">{project.category}</span>
            <span className="tag">Client: {project.client}</span>
          </div>
          <p className="section-sub" style={{ maxWidth: '850px' }}>{project.overview}</p>
        </section>

        <section className="section" style={{ background: 'var(--white)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
            Scope & deliverables
          </h2>
          <ul style={{ maxWidth: '920px', paddingLeft: '20px', display: 'grid', gap: '10px' }}>
            {project.deliverables.map((item) => (
              <li key={item} style={{ color: 'var(--ink2)', fontSize: '16px', lineHeight: 1.7 }}>{item}</li>
            ))}
          </ul>
        </section>

        {project.technologies && project.technologies.length > 0 && (
          <section className="section" style={{ background: 'var(--off)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '20px' }}>
              Platforms & technologies
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '1000px' }}>
              {project.technologies.map((technology) => (
                <span key={technology} className="tag" style={{ fontSize: '11px', padding: '6px 10px' }}>{technology}</span>
              ))}
            </div>
          </section>
        )}

        {project.testimonial && (
          <section className="section" style={{ background: 'var(--ink)', color: 'white' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 42px)', lineHeight: 1.1, marginBottom: '16px' }}>
              Client testimonial
            </h2>
            <p style={{ maxWidth: '920px', color: 'rgba(255,255,255,0.82)', fontSize: '18px', lineHeight: 1.8, fontStyle: 'italic' }}>
              “{project.testimonial.quote}”
            </p>
            <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.65)', fontSize: '14px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {project.testimonial.author} · {project.testimonial.role}
            </p>
          </section>
        )}

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
                Planning a similar project?
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.75, marginTop: '12px' }}>
                Talk with our engineering team about scope, timelines and integration strategy.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/contact" className="btn-cta" style={{ textDecoration: 'none' }}>
                Start your project
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
