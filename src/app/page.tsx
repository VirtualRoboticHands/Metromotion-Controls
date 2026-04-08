import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'node:fs'
import path from 'node:path'
import { buildPageMetadata } from '@/lib/metadata'
import ProjectScopingTool from '@/components/ProjectScopingTool'
import Reveal from '@/components/animations/Reveal'

export const metadata = buildPageMetadata({
  title: 'Industrial Automation & Control Systems',
  description:
    'Industrial automation and control systems experts in Melbourne delivering PLC, SCADA and HMI solutions across Australia. Start your next project with confidence.',
  path: '/',
})

const services = [
  { num: '01', title: 'Project Management', desc: 'End-to-end delivery from scope and design through procurement, installation and handover. On time, on budget.', tags: ['Scope & Schedule', 'Procurement'], icon: <><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 3v18"/><circle cx="15" cy="15" r="2"/></> },
  { num: '02', title: 'Electrical Engineering', desc: 'Full electrical design, MCC layouts, cable schedules, panel builds and site installation using EPLAN and AutoCAD.', tags: ['EPLAN', 'AutoCAD', 'Panel Build'], icon: <><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></> },
  { num: '03', title: 'Safety Systems', desc: 'Safety-rated control design and verification to AS 61508 / AS 62061. Keeping your people safe and machines compliant.', tags: ['AS 61508', 'SIL Assessment', 'Safety PLC'], icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
  { num: '04', title: 'PLC, HMI & SCADA', desc: 'Custom control logic, supervisory systems and intuitive operator interfaces across all major platforms.', tags: ['Allen-Bradley', 'Siemens', 'Ignition'], icon: <><rect x="2" y="3" width="20" height="14" rx="1"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3-3 3M13 14h4"/></> },
  { num: '05', title: 'Commissioning', desc: 'On-site commissioning, FAT/SAT, loop checks and production ramp-up support. We stay until the line runs right.', tags: ['FAT / SAT', 'Loop Check', 'Startup'], icon: <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></> },
  { num: '06', title: 'Data Analytics & OEE', desc: 'Real-time OEE dashboards and production visibility. Track availability, performance and quality to find your biggest gains.', tags: ['OEE', 'Downtime', 'KPI Dashboards'], icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/> },
  { num: '07', title: 'OT Services & Integration', desc: 'SAP, ERP, MES and cloud connectivity. IIoT architecture, OPC-UA and secure industrial networking.', tags: ['SAP', 'MES', 'OPC-UA', 'IIoT'], icon: <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></> },
  { num: '08', title: 'Ongoing Support', desc: 'Support contracts, preventive maintenance and on-call engineering. We build systems we maintain, so we build them right.', tags: ['On-call', 'Preventive PM', 'Documentation'], icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/> },
]

const industries = [
  { num: '01', name: 'Food & Beverage / Dairy', desc: 'Dairy, yoghurt, cheese, beverages, bakery and confectionery. Hygienic controls, CIP automation and stable batching for reliable output.' },
  { num: '02', name: 'FMCG & Packaging', desc: 'High-speed lines, multi-SKU production, palletising, labelling and changeover optimisation with clean machine-to-line integration.' },
  { num: '03', name: 'Pet Food & Agricultural Processing', desc: 'Pet food manufacturing, seed processing, orchard and packhouse operations, and fruit processing with strong traceability and uptime focus.' },
  { num: '04', name: 'Building Products & Manufacturing', desc: 'Heavy clay, bricks, tiles and pavers with precision process control and industrial automation for demanding production environments.' },
]

const caseStudies = [
  { type: 'Greenfield', name: 'Greenfields Cheese Factory', desc: 'Full automation scope for a new cheese manufacturing facility, pasteurisation, vat control, and CIP systems.' },
  { type: 'Integration', name: 'Raw Materials Handling', desc: 'Automated intake, weighing, batching and transfer systems with full traceability and ERP integration.' },
  { type: 'Upgrade', name: 'Factory Automation Upgrades', desc: 'Legacy PLC migration and SCADA upgrades across multiple sites, zero unplanned downtime on any cutover.' },
  { type: 'Support', name: 'Site Automation Support', desc: 'Long-term on-call engineering, preventive maintenance and continuous improvement programs.' },
  { type: 'Commissioning', name: 'OEM Machine Integration', desc: 'Commissioning and site integration of imported OEM machinery, protocols, safety systems and production reporting.' },
  { type: 'Analytics', name: 'OEE Analytics Platform', desc: 'Real-time OEE dashboards and downtime tracking integrated into existing SCADA across three production lines.' },
]

const whyCards = [
  { num: '92%', title: 'Repeat Business', desc: 'Over 92% of our work comes from existing clients. That\'s the result of delivering what we promise, and staying involved long after go-live.' },
  { num: '14+', title: 'Years Specialising', desc: 'Over a decade focused exclusively on industrial automation for food and beverage manufacturing. We know your equipment, your environment, and the pressure you\'re under.' },
  { num: 'OT+IT', title: 'Full Stack Integration', desc: 'From field devices to SAP, we connect factory systems with business systems. No third-party middleware and no vendor finger-pointing.' },
  { num: 'Zero', title: 'Unplanned Cutovers', desc: 'Every legacy migration is planned to the minute. We\'ve never caused unplanned production downtime during a system cutover.' },
  { num: 'AU', title: 'National Reach', desc: 'Based in Melbourne, delivering across Australia. We\'ve worked on sites from Brisbane to Adelaide, and we travel for the right project.' },
  { num: '∞', title: 'Long-Term Partnerships', desc: 'We build systems we have to maintain. So we build them right. Our longest client relationships span the full lifetime of the company.' },
]

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg'])
const publicDir = path.join(process.cwd(), 'public')

function getImageFiles(relativeDir: string) {
  const absDir = path.join(publicDir, relativeDir)
  if (!fs.existsSync(absDir)) return []
  return fs
    .readdirSync(absDir)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
}

function resolveImagePath(filename: string, searchDirs: string[]) {
  for (const dir of searchDirs) {
    if (fs.existsSync(path.join(publicDir, dir, filename))) {
      return `/${dir}/${filename}`
    }
  }
  return null
}

function humanizeFilename(filename: string) {
  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function HomePage() {
  const yearsInOperation = new Date().getFullYear() - 2012
  const clientLogos = getImageFiles('images/clients')
  const platformLogos = getImageFiles('images/platforms').filter(
    (file) => !['ignitiongold.png', 'rockwell.png', 'screens.png', 'elec-drawings.png'].includes(file.toLowerCase()),
  )
  const certificationBadges = ['ignitiongold.png', 'rockwell.png']
    .map((file) => resolveImagePath(file, ['images', 'images/platforms']))
    .filter((badge): badge is string => Boolean(badge))
  const workShowcaseImages = ['screens.png', 'elec-drawings.png']
    .map((file) => resolveImagePath(file, ['images', 'images/platforms']))
    .filter((image): image is string => Boolean(image))
  const hughRoddyImage = resolveImagePath('hugh-roddy.jpg', ['images', 'images/platforms'])

  return (
    <>
      <Nav />

      {/* HERO */}
      <section style={{
        paddingTop: '72px', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', position: 'relative', overflow: 'hidden',
      }} className="hero-grid">
        <Image
          src="/images/shutterstock_1038399151-scaled.jpg"
          alt="Industrial automation control cabinets and piping in a modern processing facility"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
        <div style={{
          padding: '80px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          borderRight: '1px solid rgba(255,255,255,0.25)', position: 'relative', zIndex: 1,
        }} className="hero-left">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' as const,
            color: 'var(--red)', marginBottom: '32px', fontWeight: 500,
            animation: 'fadeUp 0.5s 0.1s both',
          }}>
            <span style={{ width: '22px', height: '1px', background: 'var(--red)', display: 'inline-block' }} />
            Control Systems Integrator · Melbourne, AU
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(48px, 5.2vw, 72px)',
            lineHeight: 1.02, letterSpacing: '-0.02em', color: 'white',
            marginBottom: '28px',
            animation: 'fadeUp 0.6s 0.2s both',
          }}>
            Automation<br/>engineering<br/>for <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>Australian</em><br/>industry
          </h1>
          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75,
            maxWidth: '420px', marginBottom: '44px', fontWeight: 300,
            animation: 'fadeUp 0.6s 0.3s both',
          }}>
            PLC, SCADA &amp; HMI specialists trusted by <strong style={{ color: 'white', fontWeight: 500 }}>Chobani, Bulla, Arnott&apos;s</strong> and Australia&apos;s leading manufacturers. Delivering nationally from Melbourne since 2012.
          </p>
          <div style={{ display: 'flex', gap: '12px', animation: 'fadeUp 0.6s 0.4s both' }}>
            <Link href="/#projects" className="btn-primary">View Our Work</Link>
            <Link href="#scope" className="btn-outline">Start a Project</Link>
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }} className="hero-right">
          {[
            { num: '200', suffix: '+', label: 'Projects delivered' },
            { num: '80', suffix: '%', label: 'Repeat client rate' },
            { num: '75', suffix: '+', label: 'Clients served' },
            { num: String(yearsInOperation), suffix: '+', label: 'Years in operation' },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1, padding: '0 52px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            }} className="hero-stat">
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '52px', color: 'white', lineHeight: 1, marginBottom: '5px' }}>
                  {stat.num}
                  {stat.suffix && <em style={{ color: 'var(--red)', fontStyle: 'normal', fontSize: '38px' }}>{stat.suffix}</em>}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 400 }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS STRIP */}
      <Reveal><div style={{
        padding: '28px 52px', borderBottom: '1px solid var(--border)', background: 'var(--white)',
        display: 'flex', alignItems: 'center', gap: '36px',
      }} className="clients-strip">
        <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--muted2)', whiteSpace: 'nowrap', flexShrink: 0 }}>Trusted by</span>
        <div style={{ width: '1px', height: '18px', background: 'var(--border2)', flexShrink: 0 }} />
        <div className="logo-marquee-track">
          <div className="logo-marquee-inner">
            {[...clientLogos, ...clientLogos].map((logo, idx) => (
              <div key={`${logo}-${idx}`} className="logo-marquee-item">
                <Image
                  src={`/images/clients/${logo}`}
                  alt={`${humanizeFilename(logo)} client logo`}
                  width={160}
                  height={40}
                  style={{ width: 'auto', height: '40px', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div></Reveal>

      {/* INTRO BAND */}
      <Reveal><div style={{
        background: 'var(--ink)', padding: '80px 52px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center',
      }} className="intro-grid">
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3.2vw, 44px)', color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Engineering that keeps<br/>your production <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>moving</em>
          </h2>
        </div>
        <div>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, fontWeight: 300 }}>
            Metromotion Controls is a Melbourne-based control systems integrator delivering automation engineering for manufacturers across Australia. We specialise in PLC programming, SCADA and HMI development, control panel engineering, and commissioning for production facilities that run around the clock.
            <br/><br/>
            Our core industries are food and beverage, dairy, FMCG, pet food, packaging, agricultural processing, and building products. We work across all major platforms including Allen-Bradley, Siemens, Ignition, and AVEVA, and we stay involved from first scope through to ongoing support.
          </p>
        </div>
      </div></Reveal>

      <Reveal><section id="scope" className="section" style={{ background: 'var(--off)' }}>
        <div style={{ marginBottom: '32px' }}>
          <div className="section-label">Project Scoping Tool</div>
          <h2 className="section-headline">Start <em>scoping</em> your project</h2>
          <p className="section-sub">Answer a few questions about your automation challenge. We&apos;ll generate a scoping brief that lists system requirements, risks, and the decisions to settle before implementation starts.</p>
        </div>
        <div style={{ background: '#f7f6f3' }}>
          <ProjectScopingTool />
        </div>
      </section></Reveal>

      {/* SERVICES */}
      <Reveal><section className="section" id="services" style={{ background: 'var(--off)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap' as const, gap: '24px' }}>
          <div>
            <div className="section-label">What We Do</div>
            <h2 className="section-headline">Eight disciplines,<br/>one <em>integrated</em> team</h2>
          </div>
          <p className="section-sub">From first brief to commissioning and ongoing support, one team handles design, build, controls, and startup so handovers are clear and accountability stays with us.</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'var(--border)', border: '1px solid var(--border)', gap: '1px',
        }} className="services-grid">
          {services.map(svc => (
            <div key={svc.num} className="service-card-wrapper hover-lift" style={{
              background: 'var(--white)', padding: '32px 26px',
              display: 'flex', flexDirection: 'column', gap: '13px',
              position: 'relative', transition: 'background 0.22s',
            }}>
              <div style={{ fontSize: '10px', color: 'var(--muted2)', letterSpacing: '0.1em', fontWeight: 500, textTransform: 'uppercase' as const }}>{svc.num}</div>
              <div style={{
                width: '38px', height: '38px', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 24 24" style={{ width: '17px', height: '17px', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  {svc.icon}
                </svg>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{svc.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300, flex: 1 }}>{svc.desc}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px', marginTop: '4px' }}>
                {svc.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
        {workShowcaseImages.length > 0 && (
          <div
            style={{
              marginTop: '28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '16px',
            }}
            className="work-showcase-grid"
          >
            {workShowcaseImages.map((imagePath) => (
              <div
                key={imagePath}
                className="hover-lift"
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  padding: '12px',
                  position: 'relative',
                  minHeight: '210px',
                }}
              >
                <Image
                  src={imagePath}
                  alt={`${humanizeFilename(path.basename(imagePath))} from a Metromotion Controls project`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover', padding: '12px' }}
                />
              </div>
            ))}
          </div>
        )}
      </section></Reveal>

      {/* INDUSTRIES */}
      <Reveal><section className="section" id="industries" style={{ background: 'var(--white)' }}>
        <div className="section-label">Industries</div>
        <h2 className="section-headline">Deep sector <em>expertise</em></h2>
        <p className="section-sub">Over a decade focused on Australia&apos;s most demanding manufacturing sites. We understand the equipment, compliance requirements, and uptime targets your team is measured against.</p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'var(--border)', border: '1px solid var(--border)', gap: '1px', marginTop: '48px',
        }} className="industry-grid">
          {industries.map(ind => (
            <div key={ind.num} className="hover-lift" style={{
              background: 'var(--white)', padding: '36px 26px',
              display: 'flex', flexDirection: 'column', gap: '12px', transition: 'background 0.2s',
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--muted2)', fontStyle: 'italic' }}>{ind.num}</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25 }}>{ind.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{ind.desc}</div>
            </div>
          ))}
        </div>
      </section></Reveal>

      {/* PROJECTS */}
      <Reveal><section className="section" id="projects" style={{ background: 'var(--off)' }}>
        <div className="section-label">Case Studies</div>
        <h2 className="section-headline">Projects that <em>speak</em><br/>for themselves</h2>

        {/* Featured project */}
        <div style={{
          display: 'grid', gridTemplateColumns: '55% 45%', gap: 0,
          border: '1px solid var(--border)', marginTop: '48px',
        }} className="project-main">
          <div style={{
            background: 'var(--off2)', minHeight: '380px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
            borderRight: '1px solid var(--border)',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }} />
            <div style={{
              position: 'absolute', top: '20px', left: '20px',
              background: 'var(--red)', color: 'white',
              fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '5px 12px', fontWeight: 500,
            }}>Featured Project</div>
            <div style={{
              position: 'relative', background: 'var(--white)', border: '1px solid var(--border2)',
              padding: '11px 22px', fontSize: '12px', letterSpacing: '0.07em', textTransform: 'uppercase' as const,
              color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '9px',
            }}>
              <span style={{ width: '7px', height: '7px', background: 'var(--red)', display: 'inline-block', flexShrink: 0 }} />
              Greenfields Yoghurt Plant, Chobani
            </div>
          </div>
          <div style={{
            background: 'var(--white)', padding: '44px 36px',
            display: 'flex', flexDirection: 'column', gap: '18px',
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--red)', fontWeight: 500 }}>
              Chobani · Food &amp; Beverage · Greenfield
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              Full-plant automation from the ground up
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300 }}>
              End-to-end automation design and commissioning for a large-scale greenfields yoghurt manufacturing facility. Scope covered PLC programming, SCADA development, CIP automation, batching control, and full site integration.
            </p>
            <div style={{
              display: 'flex', gap: '24px', padding: '18px 0',
              borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
            }}>
              {[
                { val: '100', suffix: '%', label: 'On schedule' },
                { val: 'Rockwell', suffix: '', label: 'Platform' },
                { val: '2011', suffix: '→', label: 'Still ongoing' },
              ].map(m => (
                <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--ink)', lineHeight: 1 }}>
                    {m.val}{m.suffix && <em style={{ color: 'var(--red)', fontStyle: 'normal', fontSize: '18px' }}>{m.suffix}</em>}
                  </div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--muted)', fontWeight: 500 }}>{m.label}</div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
              Discuss a Similar Project
            </Link>
            <Link href="#scope" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'none' }}>
              Or use the project scoping tool →
            </Link>
          </div>
        </div>

        {/* Case study cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          background: 'var(--border)', border: '1px solid var(--border)', borderTop: 'none', gap: '1px',
        }} className="cases-grid">
          {caseStudies.map(cs => (
            <div key={cs.name} className="hover-lift" style={{
              background: 'var(--white)', padding: '26px',
              display: 'flex', flexDirection: 'column', gap: '9px', transition: 'background 0.2s',
            }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--red)', fontWeight: 500 }}>{cs.type}</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{cs.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{cs.desc}</div>
            </div>
          ))}
        </div>
      </section></Reveal>

      {/* TESTIMONIALS */}
      <Reveal><section className="section" id="about" style={{ background: 'var(--white)' }}>
        <div className="section-label">Client Testimonials</div>
        <h2 className="section-headline">What our clients <em>say</em></h2>

        {/* Hero quote */}
        <div style={{
          background: 'var(--off)', border: '1px solid var(--border)',
          padding: '56px 64px', marginTop: '48px',
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '40px', alignItems: 'start',
        }} className="testimonial-hero">
          {hughRoddyImage ? (
            <Image
              src={hughRoddyImage}
              alt="Hugh Roddy, Vice President Global Engineering at Chobani"
              width={56}
              height={56}
              style={{ width: '56px', height: '56px', borderRadius: '999px', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '999px',
                background: 'var(--off2)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                color: 'var(--ink2)',
                fontSize: '14px',
              }}
            >
              HR
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(19px, 2.4vw, 26px)', lineHeight: 1.45, color: 'var(--ink)', fontStyle: 'italic', letterSpacing: '-0.01em' }}>
              All the team have been an outstanding partner of Chobani since 2011. They have provided a one in a million partnership that we have not seen anywhere else in the world to date, and they continue to do so on many levels.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '22px', height: '1px', background: 'var(--red)' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>Hugh Roddy</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Vice President Global Engineering, Chobani</div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary testimonials */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          background: 'var(--border)', border: '1px solid var(--border)', borderTop: 'none', gap: '1px',
        }} className="testimonial-grid">
          {[
            { quote: 'Thanks again for helping us deliver another successful project on time and on budget. The automation platform that was delivered far exceeded all our expectations. Metromotion Controls will definitely be first choice for our next project.', name: 'Gary Saywell', role: 'Project Engineer, Real Pet Food', initial: 'GS' },
            { quote: 'The depth of knowledge and professionalism brought to every project has made Metromotion Controls an indispensable partner for our engineering operations. Their understanding of our processes means they anticipate problems before they arise.', name: 'Engineering Manager', role: 'Bulla Dairy Foods', initial: 'BL' },
          ].map(t => (
            <div key={t.initial} style={{ background: 'var(--white)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, fontStyle: 'italic', fontWeight: 300 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                <div style={{
                  width: '36px', height: '36px', background: 'var(--off2)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 600, color: 'var(--ink2)', flexShrink: 0,
                }}>{t.initial}</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section></Reveal>

      {/* PLATFORMS */}
      <Reveal><section className="section" style={{ background: 'var(--off)' }}>
        <div className="section-label">Our Expertise</div>
        <h2 className="section-headline">Platform <em>agnostic,</em><br/>vendor independent</h2>
        <p className="section-sub">We work across leading automation platforms and design around your site standards, not ours.</p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'var(--border)', border: '1px solid var(--border)', gap: '1px', marginTop: '48px',
        }} className="platform-grid">
          {platformLogos.map((logo) => (
            <div key={logo} style={{
              background: 'var(--white)', padding: '24px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: '72px',
            }}>
              <Image
                src={`/images/platforms/${logo}`}
                alt={`${humanizeFilename(logo)} platform logo`}
                width={160}
                height={36}
                style={{ width: 'auto', height: '36px', objectFit: 'contain' }}
                className="logo-image"
              />
            </div>
          ))}
        </div>
        {certificationBadges.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <div className="section-label">Certifications</div>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {certificationBadges.map((badgePath) => (
                <div
                  key={badgePath}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border)',
                    padding: '14px 18px',
                    minHeight: '88px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={badgePath}
                    alt={`${humanizeFilename(path.basename(badgePath))} certification badge`}
                    width={190}
                    height={60}
                    style={{ width: 'auto', height: '60px', objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section></Reveal>

      {/* WHY */}
      <Reveal><section className="section" style={{ background: 'var(--white)' }}>
        <div className="section-label">Why Metromotion</div>
        <h2 className="section-headline">The difference<br/><em>experience</em> makes</h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          background: 'var(--border)', border: '1px solid var(--border)', gap: '1px', marginTop: '48px',
        }} className="why-grid">
          {whyCards.map(w => (
            <div key={w.title} style={{ background: 'var(--white)', padding: '36px 30px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', color: 'var(--red)', lineHeight: 1 }}>{w.num}</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>{w.title}</div>
              <div style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </section></Reveal>

      {/* CTA BAND */}
      <div id="contact" style={{
        background: 'var(--ink)', padding: '96px 52px',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px', alignItems: 'center',
      }} className="cta-grid">
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 3.8vw, 52px)', color: 'white', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Ready to improve<br/>your <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>production?</em>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', marginTop: '12px', fontWeight: 300, maxWidth: '480px', lineHeight: 1.75 }}>
            Tell us about your project and we&apos;ll come back with a direct answer on scope, timeline, and delivery approach. Clear engineering advice, no sales script.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
          <Link href="/contact" className="btn-cta" style={{ textDecoration: 'none' }}>Start a Conversation</Link>
          <Link href="#scope" className="btn-outline" style={{ textDecoration: 'none', color: 'white', borderColor: 'rgba(255,255,255,0.35)' }}>Scope Your Project</Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <a href="tel:0398076896" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>(03) 9807 6896</a>
            <a href="mailto:info@metromotioncontrols.com.au" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>info@metromotioncontrols.com.au</a>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>39 Sunhill Rd, Mount Waverley VIC 3149</span>
          </div>
        </div>
      </div>

      <Footer />

    </>
  )
}
