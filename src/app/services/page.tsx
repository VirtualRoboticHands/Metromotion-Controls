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

const tier1Slugs = ['industrial-automation', 'plc-scada-hmi', 'control-panel-engineering', 'industrial-data-iiot']

const tier1Icons: Record<string, React.ReactNode> = {
  'industrial-automation': (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c8281e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10v4M10 9v6M14 10v4M18 8v8" />
    </svg>
  ),
  'plc-scada-hmi': (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c8281e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="1" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3-3 3M13 14h4" />
    </svg>
  ),
  'control-panel-engineering': (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c8281e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  'industrial-data-iiot': (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#c8281e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
}

export default function ServicesIndexPage() {
  const organisationSchema = buildOrganisationSchema()
  const breadcrumbSchema = buildServicesIndexBreadcrumbSchema()

  const tier1Services = tier1Slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services

  const tier2Services = services.filter((s) => !tier1Slugs.includes(s.slug))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />
      <main className="bg-off min-h-screen pt-[72px]">
        <section className="section relative overflow-hidden border-b border-border">
          <Image
            src="/images/AutomationBanner-1.png"
            alt="Industrial automation services with control systems and instrumentation in operation"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10">
            <div className="section-label text-red">Services</div>
            <h1 className="section-headline text-white">Automation services built for <em>industrial uptime</em></h1>
            <p className="section-sub max-w-[760px] text-white/85">
              Metromotion Controls is a Melbourne-based engineering team delivering control systems, integration and commissioning services across Australia.
            </p>
          </div>
        </section>

        <section className="section pt-14 pb-16">
          {/* TIER 1 — 2x2 card grid */}
          <div className="services-tier1-grid grid grid-cols-2 gap-[10px]">
            {tier1Services.map((service) => (
              <article key={service.slug} className="bg-white border-[0.5px] border-border rounded-xl p-[26px] flex flex-col gap-[14px] min-h-[200px]">
                <div className="w-8 h-8 bg-[#fef2f1] rounded-lg flex items-center justify-center shrink-0">
                  {tier1Icons[service.slug]}
                </div>
                <h2 className="font-sans text-[16.5px] font-medium leading-[1.3] text-ink m-0">
                  {service.name}
                </h2>
                <p className="text-muted text-[13px] leading-[1.65] m-0 flex-1 line-clamp-2">
                  {service.shortDescription}
                </p>
                <Link href={`/services/${service.slug}`} className="text-red text-[13px] font-medium no-underline mt-auto">
                  View service →
                </Link>
              </article>
            ))}
          </div>

          {/* TIER 2 — stacked rows */}
          <div className="mt-[10px] border-[0.5px] border-border rounded-xl bg-white overflow-hidden">
            {tier2Services.map((service, i) => (
              <div key={service.slug} className={`flex items-center justify-between gap-6 px-6 py-[18px]${i > 0 ? ' border-t-[0.5px] border-border' : ''}`}>
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans text-[14.5px] font-medium text-ink m-0 leading-[1.3]">
                    {service.name}
                  </h3>
                  <p className="text-muted text-[12.5px] leading-[1.55] mt-1 mb-0">
                    {service.shortDescription}
                  </p>
                </div>
                <Link href={`/services/${service.slug}`} className="text-red text-[13px] font-medium no-underline shrink-0 whitespace-nowrap">
                  View →
                </Link>
              </div>
            ))}
            {/* Support — not in services lib */}
            <div className="flex items-center justify-between gap-6 px-6 py-[18px] border-t-[0.5px] border-border">
              <div className="flex-1 min-w-0">
                <h3 className="font-sans text-[14.5px] font-medium text-ink m-0 leading-[1.3]">
                  Automation Support &amp; Maintenance
                </h3>
                <p className="text-muted text-[12.5px] leading-[1.55] mt-1 mb-0">
                  Expert on-site and remote support available 24/7, with senior engineers who have real commissioning experience.
                </p>
              </div>
              <Link href="/services/support" className="text-red text-[13px] font-medium no-underline shrink-0 whitespace-nowrap">
                View →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
