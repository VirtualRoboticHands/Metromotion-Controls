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

type ServiceGroup = {
  title: string
  intro: string
  slugs: string[]
}

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

const serviceGroups: ServiceGroup[] = [
  {
    title: 'Core delivery services',
    intro:
      'These are the scopes most often tied together on new lines, brownfield upgrades, and larger plant improvement projects.',
    slugs: ['industrial-automation', 'plc-scada-hmi', 'control-panel-engineering', 'systems-integration'],
  },
  {
    title: 'Specialist engineering scopes',
    intro:
      'Focused support for data, safety, networks, upgrades, support coverage, and startup work where a site needs targeted depth.',
    slugs: ['industrial-data-iiot', 'ot-networks', 'functional-safety', 'automation-upgrades', 'support', 'commissioning'],
  },
]

const deliveryPrinciples = [
  {
    label: 'Scoping',
    title: 'Start with the plant constraint',
    body: 'We usually begin with the operating issue, site interfaces, and the real shutdown conditions.',
  },
  {
    label: 'Delivery',
    title: 'Build the engineering around site reality',
    body: 'Controls, panels, software, and commissioning need to line up with the plant as it actually runs.',
  },
  {
    label: 'Handover',
    title: 'Leave the site with something it can support',
    body: 'Code, drawings, records, and practical support notes matter just as much as startup performance.',
  },
]

const heroTopics = ['Brownfield upgrades', 'New line packages', 'Shutdown planning', 'Startup support']

export default function ServicesIndexPage() {
  const organisationSchema = buildOrganisationSchema()
  const breadcrumbSchema = buildServicesIndexBreadcrumbSchema()

  const groupedServices = serviceGroups.map((group) => ({
    ...group,
    services: group.slugs
      .map((slug) => services.find((service) => service.slug === slug))
      .filter((service): service is (typeof services)[number] => Boolean(service)),
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />
      <main className="min-h-screen bg-[#fcfbf9] pt-[72px]">
        <section className="overflow-hidden border-b border-border bg-[linear-gradient(180deg,#f6f3ee_0%,#fbfaf8_62%,#fcfbf9_100%)]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:items-center lg:gap-14">
              <div>
                <div className="section-label !mb-5">Services</div>
                <h1 className="max-w-[760px] font-[var(--font-serif)] text-[clamp(44px,5.2vw,78px)] leading-[0.96] tracking-[-0.03em] text-[#181714]">
                  Industrial automation services for plants that need clear engineering, practical delivery, and steady support.
                </h1>
                <p className="mt-6 max-w-[650px] text-[18px] leading-[1.85] text-[#4a4a4a]">
                  Metromotion Controls supports manufacturers across Australia with controls engineering, software,
                  electrical design, systems integration, and commissioning. Some projects need one discipline. Others
                  need the full package to land cleanly on site.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {heroTopics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-[#d7d0c7] bg-white/90 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[#5f5a54]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 -top-6 hidden h-32 w-32 rounded-full bg-[#f7ecea] blur-2xl lg:block" />
                <div className="relative overflow-hidden rounded-[34px] border border-[#e5ded5] bg-white shadow-[0_28px_80px_rgba(24,23,20,0.10)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/ServicesBanner.png"
                      alt="Metromotion Controls engineer working beside automated production equipment"
                      fill
                      priority
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181714]/52 via-[#181714]/10 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/74">
                      Controls, software and site delivery
                    </p>
                    <p className="mt-2 max-w-[320px] text-[15px] leading-[1.75] text-white/92">
                      Practical engineering support across plant upgrades, new lines, brownfield integrations, and startup work.
                    </p>
                  </div>
                  <div className="absolute right-5 top-5 w-[240px] rounded-[24px] border border-white/55 bg-white/88 p-5 text-[#181714] shadow-[0_18px_35px_rgba(24,23,20,0.12)] backdrop-blur md:right-6 md:top-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7a7671]">Typical mix</p>
                    <div className="mt-4 space-y-3">
                      {deliveryPrinciples.map((item) => (
                        <div key={item.label} className="border-b border-[#ece6de] pb-3 last:border-b-0 last:pb-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c8281e]">{item.label}</p>
                          <p className="mt-1 text-[14px] leading-[1.55] text-[#2f2c28]">{item.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {deliveryPrinciples.map((item) => (
                <article
                  key={item.label}
                  className="rounded-[26px] border border-[#e7e0d7] bg-white/82 p-6 shadow-[0_12px_28px_rgba(24,23,20,0.04)] backdrop-blur"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c8281e]">{item.label}</p>
                  <h2 className="mt-3 font-[var(--font-serif)] text-[28px] leading-[1.06] tracking-[-0.02em] text-[#181714]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.75] text-[#4a4a4a]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {groupedServices.map((group) => (
          <section key={group.title} className="px-6 py-16 md:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                  <div className="section-label !mb-4">{group.title === 'Core delivery services' ? 'Core delivery' : 'Specialist scopes'}</div>
                  <h2 className="font-[var(--font-serif)] text-[clamp(34px,4vw,56px)] leading-[1.01] tracking-[-0.03em] text-[#181714]">
                    {group.title}
                  </h2>
                  </div>
                <p className="max-w-[560px] text-[16px] leading-[1.8] text-[#5f5a54]">{group.intro}</p>
              </div>

              <div className="grid gap-8 lg:grid-cols-12">
                {group.services.map((service, index) => {
                  const visual = serviceCardVisuals[service.slug]
                  const featured = index === 0

                  return (
                    <article
                      key={service.slug}
                      className={`group overflow-hidden rounded-[32px] border border-[#e6dfd6] bg-white shadow-[0_20px_48px_rgba(24,23,20,0.06)] ${
                        featured ? 'lg:col-span-12' : 'lg:col-span-6'
                      }`}
                    >
                      {featured ? (
                        <div className="grid lg:grid-cols-[minmax(340px,0.92fr)_minmax(0,1.08fr)]">
                          <div className="relative min-h-[320px] overflow-hidden border-b border-[#e6dfd6] lg:min-h-full lg:border-b-0 lg:border-r">
                            <Image
                              src={visual.image}
                              alt={visual.alt}
                              fill
                              sizes="(min-width: 1024px) 36vw, 100vw"
                              className="object-cover transition duration-700 group-hover:scale-[1.03]"
                              style={{ objectPosition: visual.objectPosition ?? 'center' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#181714]/58 via-[#181714]/18 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                              <p className="inline-flex rounded-full border border-white/18 bg-black/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/86 backdrop-blur">
                                {visual.kicker}
                              </p>
                            </div>
                          </div>

                          <div className="p-7 md:p-8 lg:p-9">
                            <div className="flex flex-wrap gap-2">
                              {service.capabilities.slice(0, 3).map((capability) => (
                                <span
                                  key={capability}
                                  className="rounded-full border border-[#e0d8cf] bg-[#faf8f5] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#6b655f]"
                                >
                                  {capability}
                                </span>
                              ))}
                            </div>

                            <h3 className="mt-5 max-w-[720px] font-[var(--font-serif)] text-[clamp(34px,3.6vw,52px)] leading-[1.02] tracking-[-0.03em] text-[#181714]">
                              <Link href={`/services/${service.slug}`} className="transition hover:text-[#c8281e]">
                                {service.name}
                              </Link>
                            </h3>
                            <p className="mt-4 max-w-[700px] text-[16px] leading-[1.85] text-[#4a4a4a]">
                              {service.shortDescription}
                            </p>

                            <div className="mt-7 grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
                              <div className="rounded-[24px] border border-[#ebe4db] bg-[#f7f6f3] p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a7671]">
                                  Typical scope
                                </p>
                                <p className="mt-2 text-[15px] leading-[1.75] text-[#2f2c28]">{visual.subtext}</p>
                              </div>

                              <div className="rounded-[24px] border border-[#efe7de] bg-[#fcfaf6] p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a7671]">
                                  Usually includes
                                </p>
                                <ul className="mt-3 list-disc space-y-2 pl-5">
                                  {service.capabilities.slice(0, 3).map((capability) => (
                                    <li key={capability} className="text-[14px] leading-[1.6] text-[#3a3733]">
                                      {capability}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                              <p className="max-w-[520px] text-[14px] leading-[1.7] text-[#6a645d]">{service.heroDescription}</p>
                              <Link
                                href={`/services/${service.slug}`}
                                className="inline-flex items-center rounded-full border border-[#d8d1c8] px-5 py-2.5 text-[13px] font-medium text-[#181714] transition hover:border-[#c8281e] hover:text-[#c8281e]"
                              >
                                View service
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="relative aspect-[16/10] overflow-hidden border-b border-[#e6dfd6]">
                            <Image
                              src={visual.image}
                              alt={visual.alt}
                              fill
                              sizes="(min-width: 1024px) 34vw, 100vw"
                              className="object-cover transition duration-700 group-hover:scale-[1.03]"
                              style={{ objectPosition: visual.objectPosition ?? 'center' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#181714]/58 via-[#181714]/18 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-5">
                              <p className="inline-flex rounded-full border border-white/18 bg-black/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/84 backdrop-blur">
                                {visual.kicker}
                              </p>
                            </div>
                          </div>

                          <div className="p-6 md:p-7">
                            <h3 className="font-[var(--font-serif)] text-[34px] leading-[1.04] tracking-[-0.03em] text-[#181714]">
                              <Link href={`/services/${service.slug}`} className="transition hover:text-[#c8281e]">
                                {service.name}
                              </Link>
                            </h3>
                            <p className="mt-3 text-[15px] leading-[1.8] text-[#4a4a4a]">{service.shortDescription}</p>

                            <div className="mt-5 rounded-[22px] border border-[#ebe4db] bg-[#f7f6f3] p-4">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a7671]">
                                Typical scope
                              </p>
                              <p className="mt-2 text-[14px] leading-[1.7] text-[#2f2c28]">{visual.subtext}</p>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                              {service.capabilities.slice(0, 2).map((capability) => (
                                <span
                                  key={capability}
                                  className="rounded-full border border-[#e0d8cf] bg-[#faf8f5] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#6b655f]"
                                >
                                  {capability}
                                </span>
                              ))}
                            </div>

                            <div className="mt-6 flex items-center justify-between gap-4">
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
                        </>
                      )}
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        ))}

        <section className="px-6 pb-20 md:px-12">
          <div className="mx-auto max-w-7xl rounded-[32px] border border-[#23211e] bg-[#181714] px-8 py-10 text-white shadow-[0_28px_60px_rgba(24,23,20,0.14)] md:px-10 md:py-12">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">Talk through a scope</p>
                <h2 className="mt-3 max-w-[840px] font-[var(--font-serif)] text-[clamp(30px,3.8vw,48px)] leading-[1.03] tracking-[-0.03em]">
                  If you already know the area, we can help shape the engineering scope around the plant constraint.
                </h2>
                <p className="mt-4 max-w-[760px] text-[16px] leading-[1.85] text-white/76">
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
