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
  const relatedProjects = projects
    .filter((candidate) => candidate.slug !== project?.slug)
    .filter((candidate) => candidate.category === project?.category || candidate.industry === project?.industry)
    .slice(0, 3)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Nav />
      <main className="bg-white min-h-screen pt-[72px]">
        <section className="section bg-off border-b border-border">
          <div className="section-label">Project</div>
          <h1 className="section-headline max-w-[900px]">{project.title}</h1>
          <div className="flex gap-[10px] flex-wrap mt-[18px]">
            <span className="tag">{project.category}</span>
            <span className="tag">{project.industry}</span>
            <span className="tag">{project.engagement}</span>
            <span className="tag">Client: {project.client}</span>
          </div>
          <p className="section-sub max-w-[850px]">{project.overview}</p>
        </section>

        <section className="section bg-white border-b border-border">
          <div className="grid gap-px border border-border bg-border md:grid-cols-4">
            <div className="bg-off px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.08em] text-muted2">Client</div>
              <div className="mt-2 text-[18px] font-medium text-ink">{project.client}</div>
            </div>
            <div className="bg-off px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.08em] text-muted2">Sector</div>
              <div className="mt-2 text-[18px] font-medium text-ink">{project.industry}</div>
            </div>
            <div className="bg-off px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.08em] text-muted2">Engagement</div>
              <div className="mt-2 text-[18px] font-medium text-ink">{project.engagement}</div>
            </div>
            <div className="bg-off px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.08em] text-muted2">Delivery areas</div>
              <div className="mt-2 text-[18px] font-medium text-ink">{project.deliverables.length}</div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <h2 className="font-serif text-[clamp(30px,3vw,42px)] leading-[1.1] text-ink mb-5">
            Why this project mattered
          </h2>
          <div className="grid gap-4 max-w-[980px] md:grid-cols-3">
            {project.outcomes.map((item) => (
              <div key={item} className="border border-border bg-off px-6 py-6">
                <p className="text-ink2 text-[15px] leading-[1.75]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section bg-off border-t border-border border-b border-border">
          <h2 className="font-serif text-[clamp(30px,3vw,42px)] leading-[1.1] text-ink mb-5">
            Scope & deliverables
          </h2>
          <ul className="max-w-[920px] pl-5 grid gap-[10px]">
            {project.deliverables.map((item) => (
              <li key={item} className="text-ink2 text-[16px] leading-[1.7]">{item}</li>
            ))}
          </ul>
        </section>

        {project.technologies && project.technologies.length > 0 && (
          <section className="section bg-white border-b border-border">
            <h2 className="font-serif text-[clamp(30px,3vw,42px)] leading-[1.1] text-ink mb-5">
              Platforms & technologies
            </h2>
            <div className="flex gap-2 flex-wrap max-w-[1000px]">
              {project.technologies.map((technology) => (
                <span key={technology} className="tag text-[11px] px-[10px] py-[6px]">{technology}</span>
              ))}
            </div>
          </section>
        )}

        {project.testimonial && (
          <section className="section bg-ink text-white">
            <h2 className="font-serif text-[clamp(30px,3vw,42px)] leading-[1.1] mb-4">
              Client testimonial
            </h2>
            <p className="max-w-[920px] text-white/82 text-[18px] leading-[1.8] italic">
              &ldquo;{project.testimonial.quote}&rdquo;
            </p>
            <p className="mt-4 text-white/65 text-[14px] tracking-[0.04em] uppercase">
              {project.testimonial.author} · {project.testimonial.role}
            </p>
          </section>
        )}

        {relatedProjects.length > 0 && (
          <section className="section bg-white border-b border-border">
            <h2 className="font-serif text-[clamp(30px,3vw,42px)] leading-[1.1] text-ink mb-5">
              Related case studies
            </h2>
            <div className="grid gap-px border border-border bg-border md:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <article key={relatedProject.slug} className="bg-off px-6 py-6">
                  <div className="text-[11px] uppercase tracking-[0.08em] text-muted2">
                    {relatedProject.client} • {relatedProject.industry}
                  </div>
                  <h3 className="mt-3 font-serif text-[26px] leading-[1.1] text-ink">
                    {relatedProject.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-muted">
                    {relatedProject.engagement}
                  </p>
                  <Link href={`/projects/${relatedProject.slug}`} className="mt-5 inline-block text-[13px] font-medium text-red no-underline">
                    View project →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="section bg-off">
          <div className="cta-grid grid grid-cols-[2fr_1fr] gap-7 items-center border border-border bg-white p-9">
            <div>
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] leading-[1.1] text-ink">
                Planning a similar project?
              </h2>
              <p className="text-muted text-[15px] leading-[1.75] mt-3">
                Talk with our engineering team about scope, timelines and integration strategy.
              </p>
            </div>
            <div className="flex justify-end">
              <Link href="/contact" className="btn-cta no-underline">
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
