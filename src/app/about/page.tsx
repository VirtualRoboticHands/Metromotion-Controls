import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Metromotion Controls | Industrial Automation & Control Systems Engineers, Melbourne',
  description: 'Metromotion Controls is a Melbourne-based industrial automation and control systems integrator. PLC programming, SCADA, IIoT, OT networking and functional safety for manufacturers across Australia.',
}

const sections = [
  {
    heading: 'Melbourne-Based Control Systems Integrator Since 2012',
    content:
      "Metromotion Controls is a Melbourne-based industrial automation and control systems engineering company, founded in 2012. We specialise in PLC programming, SCADA and HMI development, control panel engineering, industrial data and IIoT, OT networking, functional safety and commissioning for manufacturing and processing facilities across Australia. Our clients include some of Australia's most recognised food and beverage, dairy, packaging and industrial manufacturers. Over 92% of our project work comes from existing clients, a reflection of the long-term partnerships we build and maintain.",
  },
  {
    heading: 'Control Systems Engineering Across the Full Automation Lifecycle',
    content:
      'Metromotion Controls delivers industrial automation projects from initial concept through to commissioning and ongoing support. We work from P&IDs and functional descriptions, understanding the full process before we touch a line of code. Our engineering team has deep experience across process control, batch automation to ISA-88 standards, HMI design to ISA-101, safety systems and OT infrastructure. We are vendor-agnostic, working across all major platforms including Rockwell Automation, Siemens, Omron, Schneider Electric, Ignition by Inductive Automation, Wonderware and Citect. We recommend what is right for the application, not what is easiest for us.',
  },
  {
    heading: 'Industrial Automation Services for Australian Manufacturers',
    content:
      'Metromotion Controls provides automation and control systems engineering services to manufacturers across Victoria and Australia, including food and beverage processing and packaging, dairy manufacturing and processing, pet food and agricultural production, snack food and FMCG manufacturing, industrial packaging and materials handling, and OEM machine builders and engineering firms. Our Melbourne engineering team has delivered projects ranging from small process upgrades to full greenfield factory automation, including large capital projects for clients such as Chobani, Lactalis, La Casa Del Formaggio and Real Pet Food Company.',
  },
  {
    heading: 'Transparent, Process-Aware Engineering',
    content:
      'Metromotion Controls operates on a transparent, vendor-agnostic model with no hidden costs. Our engineers understand process design as well as control systems, which means we consider the needs of operations, maintenance and QA teams when designing automation solutions. We manage project budgets and risk with the same rigour our clients would apply themselves.',
  },
  {
    heading: 'Certified Automation Integrator, Melbourne',
    content:
      'Metromotion Controls is a certified Ignition integrator through Inductive Automation and works in close partnership with Rockwell Automation. Based in Mount Waverley, Melbourne, we serve clients across Victoria, New South Wales, Queensland, South Australia and nationally.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '72px', background: '#f7f6f3' }}>
        <section
          style={{
            padding: '84px 52px 64px',
            borderBottom: '1px solid var(--border)',
            background: '#f7f6f3',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#c8281e',
              fontWeight: 500,
              marginBottom: '22px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <span style={{ width: '22px', height: '1px', background: '#c8281e', display: 'inline-block' }} />
            About Metromotion Controls
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(38px, 4.5vw, 60px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              maxWidth: '920px',
              marginBottom: '18px',
            }}
          >
            Industrial automation and control systems engineers, headquartered in Melbourne and delivering projects across Australia since 2012.
          </h1>
        </section>

        <section style={{ padding: '0 52px 90px', background: '#f7f6f3' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              border: '1px solid var(--border)',
              background: 'var(--border)',
              gap: '1px',
              marginTop: '40px',
            }}
          >
            {sections.map((section) => (
              <article key={section.heading} style={{ background: '#f7f6f3', padding: '42px 38px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(26px, 3.1vw, 36px)',
                    lineHeight: 1.15,
                    color: 'var(--ink)',
                    marginBottom: '14px',
                  }}
                >
                  {section.heading}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    lineHeight: 1.85,
                    color: 'var(--muted)',
                    fontWeight: 300,
                    maxWidth: '1050px',
                  }}
                >
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
