import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'About Metromotion Controls',
  description:
    'Learn about Metromotion Controls, a Melbourne automation engineering team supporting manufacturers across Australia with PLC, SCADA and control systems expertise.',
  path: '/about',
})

const timeline = [
  { year: '2012', title: 'Founded & Chobani Partnership', desc: 'Metromotion Controls established in Melbourne. Engaged as automation partner for Chobani\'s Australian yoghurt manufacturing operations, a partnership that continues today.' },
  { year: '2015', title: 'National Expansion', desc: 'First interstate projects delivered, extending beyond Victoria to food and beverage manufacturing sites across New South Wales, South Australia, and Queensland.' },
  { year: '2017', title: 'La Casa del Formaggio & Ignition Gold Certified', desc: 'Began a long-term automation partnership with La Casa del Formaggio, supporting their cheese manufacturing operations. Achieved Ignition Gold Certified Integrator status in the same year.' },
  { year: '2018', title: 'Lactalis Partnership', desc: 'Partnered with Lactalis Australia for automation support across their dairy processing operations. A relationship that continues today across multiple sites nationally, covering PLC, SCADA, and control system engineering.' },
  { year: '2020', title: 'Remedy Drinks Partnership', desc: 'Partnered with Remedy Drinks on their greenfield kombucha manufacturing facility. An ongoing partnership supporting their continued growth and production expansion.' },
  { year: '2026', title: '20 Engineers, National Delivery', desc: 'Team grows to 20 engineers. Delivering across 7+ industries nationally with long-term partnerships spanning food and beverage, dairy, FMCG, pet food, packaging, agricultural processing, and building products.' },
]
const values = [
  { title: 'Engineer-to-Engineer', desc: 'You talk directly to the engineers who design and deliver your systems. No sales layer, no account managers. The person scoping your project is the same person commissioning it.' },
  { title: 'Build to Maintain', desc: 'We design systems knowing we\'ll be the ones supporting them long term. That means cleaner code, better documentation, and architecture that your maintenance team can actually work with.' },
  { title: 'Platform Agnostic', desc: 'We recommend what\'s right for your site, not what earns us the biggest margin. Allen-Bradley, Siemens, Ignition, AVEVA. We work across all major platforms and design around your existing standards.' },
  { title: 'Long-Term Partnerships', desc: 'Our business is built on relationships that last. 80% of our clients come back, and our longest partnerships span over a decade. We want your project to succeed because that\'s how we earn the next one. That means honest scoping, transparent delivery, and no surprise variations.' },
]
const selectedClients = [
  'Chobani',
  'Lactalis',
  'La Casa Del Formaggio',
  'Real Pet Food',
  'Arnott\'s',
  'Orora',
  'Patties Foods',
  'Remedy Drinks',
]
const certificationBadges = [
  { src: '/images/platforms/ignitiongold.png', alt: 'Ignition Gold Certified Integrator badge' },
  { src: '/images/platforms/rockwell.png', alt: 'Rockwell Automation certification badge' },
]

export default function AboutPage() {
  const yearsInOperation = new Date().getFullYear() - 2012

  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        {/* Header */}
        <section className="about-header relative overflow-hidden bg-ink grid grid-cols-2 gap-20 items-center px-[52px] py-[80px]">
          <Image
            src="/images/ProjectManagementBanner.png"
            alt="Project management planning session for industrial automation delivery"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10">
            <div className="section-label text-red">About Us</div>
            <h1 className="font-serif text-[clamp(38px,4.5vw,60px)] text-white leading-[1.05] tracking-[-0.02em]">
              Built by engineers who<br/>support what they <em className="text-red italic">build</em>
            </h1>
          </div>
          <p className="relative z-10 text-[15px] text-white/55 leading-[1.85] font-light">
            Metromotion Controls is a Melbourne-based industrial automation and control systems engineering company. We design, program, commission and support automation systems for food and beverage, dairy, FMCG, pet food, packaging, agricultural processing, and building products facilities across Australia. Founded in 2012, we&apos;ve grown to a team of 20 engineers delivering nationally.
          </p>
        </section>

        {/* Stats band */}
        <div className="about-stats grid grid-cols-4 bg-border border-b border-border gap-px">
          {[
            { num: '200+', label: 'Projects delivered' },
            { num: '80%', label: 'Repeat client rate' },
            { num: '75+', label: 'Clients served' },
            { num: `${yearsInOperation}+`, label: 'Years in operation' },
          ].map(s => (
            <div key={s.label} className="bg-white px-9 py-10 flex flex-col gap-[6px]">
              <div className="font-serif text-[40px] text-red leading-none">{s.num}</div>
              <div className="text-[12px] text-muted tracking-[0.05em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <section className="section bg-off">
          <div className="section-label">Our Approach</div>
          <h2 className="section-headline">Our <em>approach</em></h2>
          <div className="values-grid grid grid-cols-2 bg-border border border-border gap-px mt-12">
            {values.map(v => (
              <div key={v.title} className="bg-white px-8 py-10 flex flex-col gap-3">
                <div className="text-[18px] font-semibold text-ink">{v.title}</div>
                <div className="text-[14px] text-muted leading-[1.75] font-light">{v.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section bg-white border-t border-border">
          <div className="section-label">Credentials</div>
          <h2 className="section-headline">Trusted by teams that need <em>delivery certainty</em></h2>
          <p className="section-sub max-w-[760px]">
            Metromotion Controls supports project engineers, maintenance teams and operations leaders who need practical delivery, not generic capability statements.
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h3 className="text-[12px] uppercase tracking-[0.12em] text-muted2">Selected clients</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedClients.map((client) => (
                  <span key={client} className="tag px-[12px] py-[7px] text-[11px]">
                    {client}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[12px] uppercase tracking-[0.12em] text-muted2">Certifications</h3>
              <div className="mt-4 flex flex-wrap gap-4">
                {certificationBadges.map((badge) => (
                  <div key={badge.src} className="border border-border bg-off px-4 py-4">
                    <Image
                      src={badge.src}
                      alt={badge.alt}
                      width={180}
                      height={72}
                      style={{ width: 'auto', height: '72px', objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section bg-white">
          <div className="section-label">Our History</div>
          <h2 className="section-headline">Our story <em>so far</em></h2>
          <div className="mt-12 flex flex-col border border-border">
            {timeline.map((t, i) => (
              <div key={t.year} className={`timeline-row grid grid-cols-[120px_1fr] gap-8 px-9 py-8 items-start${i < timeline.length - 1 ? ' border-b border-border' : ''}`}>
                <div className="font-serif text-[28px] text-red leading-none">{t.year}</div>
                <div>
                  <div className="text-[16px] font-semibold text-ink mb-[6px]">{t.title}</div>
                  <div className="text-[14px] text-muted leading-[1.7] font-light">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="about-cta bg-ink px-[52px] py-[80px] flex flex-col items-center text-center gap-5">
          <h2 className="font-serif text-[clamp(30px,3.5vw,44px)] text-white leading-[1.1]">
            Ready to work with us?
          </h2>
          <p className="text-[15px] text-white/45 max-w-[460px] leading-[1.7] font-light">
            Talk to an engineer, not a sales team. We&apos;ll give you a straight answer.
          </p>
          <Link href="/contact" className="btn-cta no-underline mt-2">
            Start a Conversation
          </Link>
        </div>
      </main>
      <Footer />

    </>
  )
}
