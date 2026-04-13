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
      <main className="bg-off min-h-screen pt-[72px]">
        <section className="section border-b border-border">
          <div className="section-label">Projects</div>
          <h1 className="section-headline">Automation outcomes across <em>Australian industry</em></h1>
          <p className="section-sub max-w-[760px]">
            Explore selected Metromotion Controls case studies spanning major capital programs, targeted factory upgrades, OEM project delivery and specialist engineering services.
          </p>
          <p className="mt-5 max-w-[760px] text-[14px] leading-[1.75] text-muted">
            Each case study is written to show the delivery context, the engineering scope, and the operating outcome, so project teams can quickly see where Metromotion Controls fits.
          </p>
        </section>

        {projectsByCategory.map((group) => (
          <section key={group.category} className="section pt-14">
            <h2 className="font-serif text-[clamp(30px,3vw,44px)] leading-[1.1] text-ink mb-6">
              {group.category}
            </h2>
            <div
              className="industry-grid grid grid-cols-3 bg-border border border-border gap-px"
            >
              {group.projects.map((project) => (
                <article key={project.slug} className="bg-white px-6 py-7 flex flex-col gap-[14px]">
                  <span className="tag w-fit">{project.category}</span>
                  <div className="text-[12px] tracking-[0.08em] uppercase text-muted2">
                    {project.client} • {project.industry}
                  </div>
                  <div className="text-[13px] font-medium text-red">{project.engagement}</div>
                  <h3 className="font-serif text-[30px] leading-[1.1] text-ink">{project.title}</h3>
                  <p className="text-muted text-[15px] leading-[1.7] flex-1 line-clamp-3">{project.overview}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((technology) => (
                        <span key={technology} className="tag">
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link href={`/projects/${project.slug}`} className="btn-outline w-fit">
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
