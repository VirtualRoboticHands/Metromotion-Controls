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
      <main className="bg-white min-h-screen pt-[72px]">
        <section className="section bg-off border-b border-border">
          <div className="section-label">Project</div>
          <h1 className="section-headline max-w-[900px]">{project.title}</h1>
          <div className="flex gap-[10px] flex-wrap mt-[18px]">
            <span className="tag">{project.category}</span>
            <span className="tag">Client: {project.client}</span>
          </div>
          <p className="section-sub max-w-[850px]">{project.overview}</p>
        </section>

        <section className="section bg-white">
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
          <section className="section bg-off border-t border-border border-b border-border">
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
