import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { services } from '@/lib/services'
import { buildPageMetadata } from '@/lib/metadata'
import { buildOrganisationSchema, buildServicesIndexBreadcrumbSchema } from '@/lib/schema'

export const metadata = buildPageMetadata({
  title: 'Industrial Automation Services Melbourne',
  description:
    'Industrial automation services from a Melbourne engineering team: control systems, PLC, SCADA, HMI, control panel engineering and commissioning delivered across Australia.',
  path: '/services',
})

type ServiceCardVisual = {
  image: string
  alt: string
  kicker: string
  subtext: string
  objectPosition?: string
}

const serviceOrder = [
  'industrial-automation',
  'plc-scada-hmi',
  'control-panel-engineering',
  'systems-integration',
  'industrial-data-iiot',
  'ot-networks',
  'functional-safety',
  'automation-upgrades',
  'support',
  'commissioning',
]

const serviceCardVisuals: Record<string, ServiceCardVisual> = {
  'industrial-automation': {
    image: '/images/ServicesBanner.png',
    alt: 'Industrial automation engineers working beside a production line in a manufacturing facility',
    kicker: 'Process and controls',
    subtext: 'Control philosophy, sequencing, plant standards, and delivery support from design through startup.',
    objectPosition: 'center center',
  },
  'plc-scada-hmi': {
    image: '/images/AutomationBanner-1.png',
    alt: 'Industrial instrumentation and control hardware used in PLC and SCADA systems',
    kicker: 'PLC, SCADA and HMI',
    subtext: 'Structured PLC code, operator screens, migration work, diagnostics, and FAT-ready software.',
    objectPosition: '60% center',
  },
  'control-panel-engineering': {
    image: '/images/ElectricalEngineeringBanner.png',
    alt: 'Industrial control panel switchboards and electrical engineering hardware',
    kicker: 'Electrical design',
    subtext: 'Build-ready drawings, panel layouts, cable schedules, FAT planning, and as-built documentation.',
    objectPosition: 'center center',
  },
  'systems-integration': {
    image: '/images/ProjectManagementBanner.png',
    alt: 'Project planning documents used to coordinate industrial systems integration work',
    kicker: 'Machine and line integration',
    subtext: 'OEM interfaces, line handshakes, transaction logic, and OT to IT integration across mixed platforms.',
    objectPosition: 'center center',
  },
  'industrial-data-iiot': {
    image: '/images/AutomationBanner-1.png',
    alt: 'Instrumentation and plant data capture hardware used for industrial analytics and reporting',
    kicker: 'Data and reporting',
    subtext: 'Historian, OEE, reporting, and plant data models that stay useful for operations and engineering teams.',
    objectPosition: '65% center',
  },
  'ot-networks': {
    image: '/images/OTBanner.png',
    alt: 'Industrial OT networking hardware and ethernet connectivity',
    kicker: 'Networks and remote access',
    subtext: 'Segmentation, remote access, edge architecture, and server lifecycle planning for live plant environments.',
    objectPosition: '72% center',
  },
  'functional-safety': {
    image: '/images/SafetyBanner.png',
    alt: 'Functional safety hardware and emergency stop equipment in an industrial system',
    kicker: 'Risk reduction',
    subtext: 'Safety studies, safety PLC design, shutdown logic, validation, and lifecycle support.',
    objectPosition: '62% center',
  },
  'automation-upgrades': {
    image: '/images/SupportBanner.png',
    alt: 'Automation engineer working on a production system during upgrade planning and delivery',
    kicker: 'Brownfield upgrades',
    subtext: 'Staged migrations for legacy PLC, SCADA, and control infrastructure where uptime still matters.',
    objectPosition: 'center 36%',
  },
  support: {
    image: '/images/SupportBanner.png',
    alt: 'Industrial automation support engineer inspecting a production system',
    kicker: 'Support and maintenance',
    subtext: 'Breakdown response, planned maintenance, system health checks, and ongoing improvement support.',
    objectPosition: 'center 36%',
  },
  commissioning: {
    image: '/images/CommissioningBanner.png',
    alt: 'Industrial commissioning work taking place on automated process equipment',
    kicker: 'Startup and handover',
    subtext: 'Structured FAT, SAT, startup leadership, issue closeout, and practical handover under outage pressure.',
    objectPosition: 'center center',
  },
}

const heroTopics = ['PLC & SCADA', 'Control panels', 'Systems integration', 'Commissioning']

export default function ServicesIndexPage() {
  const organisationSchema = buildOrganisationSchema()
  const breadcrumbSchema = buildServicesIndexBreadcrumbSchema()

  const orderedServices = serviceOrder
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />
      <main className="min-h-screen bg-[#fcfbf9] pt-[72px]">
        <section className="border-b border-border bg-[#f7f6f3]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center lg:gap-14">
            <div>
              <div className="section-label !mb-5">Services</div>
              <h1 className="font-[var(--font-serif)] text-[clamp(42px,5vw,72px)] leading-[0.98] tracking-[-0.02em] text-[#181714]">
                Industrial automation services for plants that need clear engineering and dependable delivery.
              </h1>
              <p className="mt-6 max-w-[640px] text-[18px] leading-[1.8] text-[#4a4a4a]">
                Metromotion Controls supports manufacturers across Australia with controls engineering, software, electrical
                design, systems integration, and commissioning. Each scope can stand on its own or form part of a wider
                project package.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {heroTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-[#d8d1c8] bg-white px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[#5f5a54]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-border bg-white shadow-[0_22px_60px_rgba(24,23,20,0.08)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/ServicesBanner.png"
                  alt="Metromotion Controls engineer working beside automated production equipment"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181714]/55 via-[#181714]/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
                  Controls, software and site delivery
                </p>
                <p className="mt-2 max-w-[320px] text-[15px] leading-[1.7] text-white/92">
                  Practical engineering support across plant upgrades, new lines, brownfield integrations, and startup work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="section-label !mb-4">Service Areas</div>
                <h2 className="font-[var(--font-serif)] text-[clamp(34px,4vw,54px)] leading-[1.02] tracking-[-0.02em] text-[#181714]">
                  Picture-led service areas, with a clearer read on what each one covers.
                </h2>
              </div>
              <p className="max-w-[520px] text-[16px] leading-[1.8] text-[#5f5a54]">
                Each card links to the full service page. The short scope note is there to help people understand where a
                service usually fits before they click through.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {orderedServices.map((service) => {
                const visual = serviceCardVisuals[service.slug]

                return (
                  <article
                    key={service.slug}
                    className="overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_18px_40px_rgba(24,23,20,0.06)]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                      <Image
                        src={visual.image}
                        alt={visual.alt}
                        fill
                        sizes="(min-width: 1024px) 44vw, 100vw"
                        className="object-cover transition duration-500 hover:scale-[1.02]"
                        style={{ objectPosition: visual.objectPosition ?? 'center' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181714]/65 via-[#181714]/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/78">
                          {visual.kicker}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 md:p-7">
                      <h3 className="font-[var(--font-serif)] text-[32px] leading-[1.05] tracking-[-0.02em] text-[#181714]">
                        <Link href={`/services/${service.slug}`} className="transition hover:text-[#c8281e]">
                          {service.name}
                        </Link>
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.8] text-[#4a4a4a]">{service.shortDescription}</p>

                      <div className="mt-5 rounded-[22px] border border-[#ebe5dd] bg-[#f7f6f3] p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a7671]">
                          Typical scope
                        </p>
                        <p className="mt-2 text-[14px] leading-[1.7] text-[#2f2c28]">{visual.subtext}</p>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <span className="text-[12px] uppercase tracking-[0.12em] text-[#7a7671]">
                          {service.capabilities.length} core capabilities
                        </span>
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center rounded-full border border-[#d9d2ca] px-4 py-2 text-[13px] font-medium text-[#181714] transition hover:border-[#c8281e] hover:text-[#c8281e]"
                        >
                          View service
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-12">
          <div className="mx-auto max-w-7xl rounded-[30px] border border-border bg-[#181714] px-8 py-10 text-white md:px-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">Talk through a scope</p>
                <h2 className="mt-3 font-[var(--font-serif)] text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.02em]">
                  If you already know the area, we can help shape the engineering scope around the plant constraint.
                </h2>
                <p className="mt-4 max-w-[760px] text-[16px] leading-[1.8] text-white/76">
                  That might be downtime, a migration risk, poor visibility, or a shutdown window that needs a tighter plan.
                </p>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-[14px] font-medium text-[#181714] transition hover:bg-[#f7ecea] hover:text-[#c8281e]"
                >
                  Start a conversation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
