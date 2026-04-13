import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { services, servicesBySlug } from '@/lib/services'
import type { Metadata } from 'next'
import { buildPageMetadata, serviceMetadataBySlug } from '@/lib/metadata'
import { buildFaqPageSchema, buildOrganisationSchema, buildServiceBreadcrumbSchema, buildServiceSchema } from '@/lib/schema'

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const serviceMetadata = serviceMetadataBySlug[slug]

  if (!serviceMetadata) {
    return {}
  }

  return buildPageMetadata({
    title: serviceMetadata.title,
    description: serviceMetadata.description,
    path: `/services/${slug}`,
  })
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesBySlug[slug]

  if (!service) {
    notFound()
  }

  const serviceSchema = buildServiceSchema({ name: service.name, description: service.heroDescription, slug: service.slug })
  const breadcrumbSchema = buildServiceBreadcrumbSchema({ name: service.name, slug: service.slug })
  const organisationSchema = buildOrganisationSchema()
  const faqSchema = buildFaqPageSchema(service.faqs)
  const heroImageBySlug: Record<string, { src: string; alt: string }> = {
    commissioning: {
      src: '/images/CommissioningBanner.png',
      alt: 'Engineers commissioning industrial automation equipment on site',
    },
    'ot-networks': {
      src: '/images/OTBanner.png',
      alt: 'Industrial OT networking hardware and secure connectivity infrastructure',
    },
    'functional-safety': {
      src: '/images/SafetyBanner.png',
      alt: 'Functional safety systems and machinery safety controls in an industrial plant',
    },
    'automation-upgrades': {
      src: '/images/SupportBanner.png',
      alt: 'Automation upgrade works on legacy industrial control systems',
    },
    support: {
      src: '/images/SupportBanner.png',
      alt: 'Automation support and maintenance engineers working on industrial control systems',
    },
    'control-panel-engineering': {
      src: '/images/ElectricalEngineeringBanner.png',
      alt: 'Control panel engineering and electrical design workspace',
    },
  }
  const heroImage = heroImageBySlug[service.slug]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <main className="bg-white min-h-screen pt-[72px]">
        <section className="section bg-off border-b border-border relative overflow-hidden">
          {heroImage && (
            <>
              <Image src={heroImage.src} alt={heroImage.alt} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-black/45" />
            </>
          )}
          <div className="relative z-10">
            <div className={`section-label${heroImage ? ' text-red' : ''}`}>Service</div>
            <h1 className={`section-headline max-w-[900px]${heroImage ? ' text-white' : ''}`}>{service.name}</h1>
            <p className={`section-sub max-w-[780px]${heroImage ? ' text-white/85' : ''}`}>{service.heroDescription}</p>
          </div>
        </section>

        {service.sections.map((section, index) => (
          <section
            key={section.heading}
            className={`section${index % 2 === 0 ? ' bg-white' : ' bg-off'}`}
          >
            <h2 className="font-serif text-[clamp(30px,3vw,42px)] leading-[1.1] text-ink mb-5">
              {section.heading}
            </h2>
            <p className="max-w-[900px] text-muted text-[16px] leading-[1.85]">{section.body}</p>
          </section>
        ))}

        <section className="section bg-off">
          <h2 className="font-serif text-[clamp(30px,3vw,42px)] leading-[1.1] text-ink mb-5">
            Core capabilities
          </h2>
          <ul className="max-w-[920px] pl-5 grid gap-[10px]">
            {service.capabilities.map((capability) => (
              <li key={capability} className="text-ink2 text-[16px] leading-[1.7]">{capability}</li>
            ))}
          </ul>
        </section>

        <section className="section bg-ink text-white">
          <h2 className="font-serif text-[clamp(30px,3vw,42px)] leading-[1.1] mb-4">
            Industries served
          </h2>
          <p className="max-w-[900px] text-white/75 text-[16px] leading-[1.8]">
            As a Melbourne-based controls partner, we deliver this service for food and beverage, water treatment, mining and manufacturing operations across Australia.
          </p>
        </section>

        <section className="section bg-off">
          <h2 className="font-serif text-[clamp(30px,3vw,42px)] leading-[1.1] text-ink mb-5">
            How Metromotion Controls delivers this service
          </h2>
          <p className="max-w-[900px] text-muted text-[16px] leading-[1.85]">
            Every engagement is delivered through a structured workflow that combines technical depth with practical site coordination. We begin with a scoping workshop to confirm objectives, interfaces, risks and acceptance criteria. From there, we develop design artefacts, software and test documentation under revision control, with peer review checkpoints to keep quality high. During implementation, we coordinate closely with operations, electricians, OEMs and project managers so assumptions remain visible and decisions are made quickly. FAT, SAT and commissioning activities are documented with clear evidence, defect tracking and closure records. After handover, we can provide targeted training, optimisation support and managed follow-up actions so site teams can operate with confidence. This approach helps clients achieve reliable outcomes, maintain compliance expectations and build internal capability at the same time.
          </p>
        </section>

        <section className="section bg-white">
          <h2 className="font-serif text-[clamp(30px,3vw,42px)] leading-[1.1] text-ink mb-5">
            Frequently asked questions
          </h2>
          <div className="max-w-[920px] grid gap-6">
            {service.faqs.map((faq) => (
              <article key={faq.question}>
                <h3 className="text-ink text-[20px] leading-[1.4] mb-2">{faq.question}</h3>
                <p className="text-muted text-[16px] leading-[1.8]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section bg-off">
          <div className="cta-grid grid grid-cols-[2fr_1fr] gap-7 items-center border border-border bg-white p-9">
            <div>
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] leading-[1.1] text-ink">
                Need support with {service.name.toLowerCase()}?
              </h2>
              <p className="text-muted text-[15px] leading-[1.75] mt-3">
                Speak directly with an engineer about scope, timing and technical constraints.
              </p>
            </div>
            <div className="flex justify-end">
              <Link href="/contact" className="btn-cta no-underline">
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
