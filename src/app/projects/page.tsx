import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { projectsByCategory } from '@/lib/projects'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'Automation Projects',
  description:
    'Browse automation projects delivered by our Melbourne controls engineers for manufacturers across Australia, from greenfield plants to targeted upgrades. View case studies.',
  path: '/projects',
})

export default function ProjectsIndexPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--off)', minHeight: '100vh', paddingTop: '72px' }}>
        <section className="section" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="section-label">Projects</div>
          <h1 className="section-headline">Automation outcomes across <em>Australian industry</em></h1>
          <p className="section-sub" style={{ maxWidth: '760px' }}>
            Explore selected Metromotion Controls case studies spanning major capital programs, targeted factory upgrades, OEM project delivery and specialist engineering services.
          </p>
        </section>

        {projectsByCategory.map((group) => (
          <section key={group.category} className="section" style={{ paddingTop: '56px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3vw, 44px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '24px' }}>
              {group.category}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                background: 'var(--border)',
                border: '1px solid var(--border)',
                gap: '1px'
              }}
              className="industry-grid"
            >
              {group.projects.map((project) => (
                <article key={project.slug} style={{ background: 'var(--white)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <span className="tag" style={{ width: 'fit-content' }}>{project.category}</span>
                  <div style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted2)' }}>{project.client}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', lineHeight: 1.1, color: 'var(--ink)' }}>{project.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7, flex: 1 }}>{project.overview}</p>
                  <Link href={`/projects/${project.slug}`} className="btn-outline" style={{ width: 'fit-content' }}>
                    View project
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  )
}
