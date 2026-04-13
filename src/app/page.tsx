import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'node:fs'
import path from 'node:path'
import { buildPageMetadata } from '@/lib/metadata'
import ProjectScopingTool from '@/components/ProjectScopingTool'
import Reveal from '@/components/animations/Reveal'
import { projectsBySlug } from '@/lib/projects'

export const metadata = buildPageMetadata({
  title: 'Industrial Automation & Control Systems',
  description:
    'Industrial automation and control systems experts in Melbourne delivering PLC, SCADA and HMI solutions across Australia. Start your next project with confidence.',
  path: '/',
})

const services = [
  { num: '01', title: 'Industrial Automation & Control Systems', href: '/services/industrial-automation', desc: 'Process-led automation from P&ID development through to commissioning. End-to-end delivery, on time and on budget.', tags: ['Scope & Schedule', 'Procurement'], icon: <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10v4M10 9v6M14 10v4M18 8v8"/></> },
  { num: '02', title: 'PLC, SCADA & HMI Programming', href: '/services/plc-scada-hmi', desc: 'Custom control logic, supervisory systems and intuitive operator interfaces across all major platforms.', tags: ['Allen-Bradley', 'Siemens', 'Ignition'], icon: <><rect x="2" y="3" width="20" height="14" rx="1"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3-3 3M13 14h4"/></> },
  { num: '03', title: 'Control Panel Engineering & Electrical Design', href: '/services/control-panel-engineering', desc: 'Full electrical design, MCC layouts, cable schedules, panel builds and site installation using EPLAN and AutoCAD.', tags: ['EPLAN', 'AutoCAD', 'Panel Build'], icon: <><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></> },
  { num: '04', title: 'Industrial Data, IIoT & Analytics', href: '/services/industrial-data-iiot', desc: 'Real time OEE dashboards and production visibility. Track availability, performance, and quality to find your biggest gains.', tags: ['OEE', 'Downtime', 'KPI Dashboards'], icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/> },
  { num: '05', title: 'Industrial Systems Integration', href: '/services/systems-integration', desc: 'Reliable integration across machines, PLC networks and enterprise systems. One coherent system, not a patchwork of vendors.', tags: ['ERP Integration', 'PackML', 'OPC-UA'], icon: <><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 12h6M16 8l-6 3.5M16 16l-6-3.5"/></> },
  { num: '06', title: 'OT Networks, Edge & Remote Access', href: '/services/ot-networks', desc: 'Secure and scalable OT infrastructure including IIoT architecture, OPC-UA, segmented networking and remote access.', tags: ['SAP', 'MES', 'OPC-UA', 'IIoT'], icon: <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></> },
  { num: '07', title: 'Functional Safety & Safety Systems', href: '/services/functional-safety', desc: 'Safety lifecycle engineering and verification to IEC 61511 / AS 62061. Keeping your people safe and machines compliant.', tags: ['AS 61508', 'SIL Assessment', 'Safety PLC'], icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
  { num: '08', title: 'Automation Upgrades, Retrofits & Support', href: '/services/automation-upgrades', desc: 'Staged modernisation and ongoing support for legacy automation environments, planned around your production schedule.', tags: ['PLC Migration', 'Retrofits', 'Lifecycle'], icon: <><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></> },
  { num: '09', title: 'Commissioning, FAT & SAT', href: '/services/commissioning', desc: 'On-site commissioning, FAT/SAT, loop checks and production ramp-up support. We stay until the line runs right.', tags: ['FAT / SAT', 'Loop Check', 'Startup'], icon: <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></> },
  { num: '10', title: 'Automation Support & Maintenance', href: '/services/support', desc: 'Support contracts, preventive maintenance and on-call engineering. We build systems we maintain, so we build them right.', tags: ['On-call', 'Preventive PM', 'Documentation'], icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/> },
]

const industries = [
  { num: '01', name: 'Food & Beverage / Dairy', desc: 'Yoghurt, cheese, milk processing, beverages, bakery, and confectionery. CIP automation, batching control, and hygienic system design to food-grade standards.' },
  { num: '02', name: 'FMCG & Packaging', desc: 'High-speed production lines, multi-SKU management, palletising, labelling, and changeover optimisation. Line integration and production reporting.' },
  { num: '03', name: 'Pet Food & Agricultural Processing', desc: 'Pet food manufacturing, seed processing, orchard and packhouse operations. Complex recipes, raw material handling, and traceability.' },
  { num: '04', name: 'Building Products & General Manufacturing', desc: 'Heavy clay, bricks, tiles, and general industrial automation. Precision process control, kiln management, and production data systems.' },
]

const showcaseProjectSlugs = [
  'chobani-yoghurt-plant',
  'la-casa-cheese-factory',
  'real-pet-food-raw-materials',
  'sakata-product-line-integration',
  'jc-smale-brick-texturing',
  'lactalis-commissioning-support',
]
const showcaseProjects = showcaseProjectSlugs
  .map(slug => projectsBySlug[slug])
  .filter(Boolean)

const whyCards = [
  { num: '80%', title: 'Repeat Business', desc: 'Around 80% of our work comes from existing clients. That comes from delivering what we promise and staying involved long after go-live.' },
  { num: '14+', title: 'Years Specialising', desc: 'Over a decade focused exclusively on industrial automation for food and beverage manufacturing. We know your equipment, your environment, and the pressure you\'re under.' },
  { num: 'OT+IT', title: 'Full Stack Integration', desc: 'From field devices to SAP, we connect factory systems with business systems. No third-party middleware and no vendor finger-pointing.' },
  { num: '✓', title: 'Meticulous Migration Planning', desc: 'Every legacy migration is planned down to the hour. We stage cutovers around your production schedule, with rollback plans and clear commissioning gates at every step.' },
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
  const clientFiles = getImageFiles('images/clients')
  const trustedByClients = [
    { name: 'Chobani', file: 'CHO®_WM_REG_RGB_560_052019.png', h: 30 },
    { name: 'Lactalis', file: 'lactalislogo.png', h: 44 },
    { name: 'La Casa del Formaggio', file: 'la-casa-resized-01.jpg', h: 52 },
    { name: 'Remedy Drinks', file: 'RemedyLogo.png', h: 52 },
    { name: 'Peters Ice Cream', file: 'peters.jpeg', h: 52 },
    { name: 'Real Pet Food', file: 'rpf.webp', h: 52 },
    { name: 'Austral Bricks', file: 'australbricks.png', h: 28 },
    { name: 'Beak & Johnston', file: 'logo-beak.png', h: 44 },
    { name: 'Kinrise', file: 'kinrise.png', h: 44 },
    { name: 'Tibaldi', file: 'tibaldi.png', h: 52 },
  ]
  const matchFile = (candidates: string[], files: string[]) =>
    files.find((existing) => candidates.some((candidate) => candidate.toLowerCase() === existing.toLowerCase())) ?? null
  const trustedByEntries = trustedByClients
    .filter((client) => clientFiles.some((file) => file.toLowerCase() === client.file.toLowerCase()))
    .map((client) => ({ ...client, path: `/images/clients/${client.file}` }))

  const platformFiles = getImageFiles('images/platforms')
  const platformLogoConfig = [
    { name: 'Rockwell Automation', files: ['rockwell-1.png'] },
    { name: 'Siemens', files: ['siemens-logo.png'] },
    { name: 'Ignition', files: ['ignition-1.png'] },
    { name: 'Wonderware / AVEVA', files: ['wonderware-1.png', 'wonderware.png'] },
    { name: 'Schneider Electric', files: ['schneider.png'] },
    { name: 'Omron', files: ['omron.jpg'] },
    { name: 'Citect SCADA', files: ['citect.png'] },
    { name: 'ifm', files: ['ifm.png'] },
    { name: 'SICK', files: ['sick.png'] },
    { name: 'Sepasoft', files: ['sepasoft.png'] },
    { name: 'Phoenix Contact', files: ['phoenix.png'] },
  ]
  const platformLogos = platformLogoConfig
    .map((vendor) => {
      const file = matchFile(vendor.files, platformFiles)
      return file ? { name: vendor.name, file } : null
    })
    .filter((vendor): vendor is { name: string; file: string } => Boolean(vendor))
  console.info('[Logo Debug] trusted-by and platform logo path resolution', {
    trustedByAvailableFiles: {
      clientsDir: clientFiles,
    },
    trustedByReferencedPaths: trustedByEntries.map((client) => ({
      name: client.name,
      path: client.path ?? '[missing]',
    })),
    platformAvailableFiles: platformFiles,
    platformReferencedPaths: platformLogos.map((platform) => `/images/platforms/${platform.file}`),
  })
  const certificationBadges = ['ignitiongold.png', 'rockwell.png']
    .map((file) => resolveImagePath(file, ['images', 'images/platforms']))
    .filter((badge): badge is string => Boolean(badge))
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
            PLC, SCADA &amp; HMI specialists trusted by <strong style={{ color: 'white', fontWeight: 500 }}>Chobani, Lactalis, La Casa del Formaggio</strong> and Australia&apos;s leading manufacturers. Delivering nationally from Melbourne since 2012.
          </p>
          <div style={{ display: 'flex', gap: '12px', animation: 'fadeUp 0.6s 0.4s both' }}>
            <Link href="/#projects" className="btn-primary">View Our Work</Link>
            <Link
              href="#scope"
              style={{
                background: '#c8281e',
                color: '#fff',
                border: '1px solid #c8281e',
                padding: '14px 26px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.02em',
                boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
              }}
            >
              Start a Project
            </Link>
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
        display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '20px',
      }} className="clients-strip">
        {trustedByEntries.length > 0 && (
          <div className="logo-marquee">
            <div className="logo-marquee-track">
              {[...trustedByEntries, ...trustedByEntries].map((client, index) => (
                <div key={`${client.name}-${index}`} className="logo-marquee-item">
                  {client.path ? (
                    <Image
                      src={client.path}
                      alt={`${client.name} logo`}
                      width={200}
                      height={60}
                      style={{ height: `${client.h}px`, width: 'auto', objectFit: 'contain' }}
                      className="trusted-logo-image"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
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

      {/* SERVICES */}
      <Reveal><section className="section" id="services" style={{ background: 'var(--off)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap' as const, gap: '24px' }}>
          <div>
            <div className="section-label">What We Do</div>
            <h2 className="section-headline">What we <em>deliver</em></h2>
          </div>
          <p className="section-sub">From first brief to final commissioning, and long after. We cover the full scope so you deal with one team, not multiple vendors.</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          background: 'var(--border)', border: '1px solid var(--border)', gap: '1px',
        }} className="services-grid">
          {services.map(svc => (
            <Link href={svc.href} key={svc.num} className="service-card-wrapper hover-lift service-card-link" style={{
              background: 'var(--white)', padding: '32px 26px',
              display: 'flex', flexDirection: 'column', gap: '13px',
              position: 'relative', transition: 'background 0.22s, transform 0.22s ease, box-shadow 0.22s ease',
              textDecoration: 'none',
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
            </Link>
          ))}
        </div>
      </section></Reveal>

      {/* INDUSTRIES */}
      <Reveal><section className="section" id="industries" style={{ background: 'var(--white)' }}>
        <div className="section-label">Industries</div>
        <h2 className="section-headline">Deep sector <em>expertise</em></h2>
        <p className="section-sub">Over a decade focused on Australia&apos;s most demanding manufacturing sites. We understand the equipment, compliance requirements, and uptime targets your team is measured against.</p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '11px', marginTop: '48px',
        }} className="industry-grid industry-cards-grid">
          {industries.map(ind => (
            <div key={ind.num} className="hover-lift" style={{
              background: 'var(--white)', padding: '28px 22px 24px',
              display: 'flex', flexDirection: 'column', gap: '10px', transition: 'background 0.2s',
              borderTop: '3px solid #c8281e',
              borderLeft: '0.5px solid var(--border)',
              borderRight: '0.5px solid var(--border)',
              borderBottom: '0.5px solid var(--border)',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}>
              <div style={{ fontSize: '12px', color: '#c8281e', fontWeight: 500, letterSpacing: '0.05em' }}>{ind.num}</div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.35 }}>{ind.name}</div>
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
                { val: '2012', suffix: '→', label: 'Still ongoing' },
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
          {showcaseProjects.map(p => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="hover-lift" style={{
              background: 'var(--white)', padding: '26px',
              display: 'flex', flexDirection: 'column', gap: '9px', transition: 'background 0.2s',
              textDecoration: 'none',
            }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--red)', fontWeight: 500 }}>{p.category}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--muted2)', fontWeight: 500 }}>{p.client}</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{p.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{p.overview}</div>
              <div style={{ fontSize: '12px', color: 'var(--red)', fontWeight: 500, marginTop: '4px' }}>View project →</div>
            </Link>
          ))}
        </div>
      </section></Reveal>

      {/* TESTIMONIALS */}
      <Reveal><section className="section testimonials-section-dark" id="about" style={{ background: '#1a1a18', padding: '48px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ color: '#c8281e', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '2px', fontWeight: 500, marginBottom: '24px' }}>
            Client Testimonials
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(20px, 2.2vw, 22px)', color: '#f7f6f3', lineHeight: 1.5 }}>
              All the team have been an outstanding partner of Chobani since 2012. They have provided a one in a million partnership that we have not seen anywhere else in the world to date. They continue to do so on many levels.
            </div>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: '12px' }}>
              <div style={{ width: '3px', background: '#c8281e', borderRadius: '1px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#f7f6f3' }}>Hugh Roddy</div>
                <div style={{ fontSize: '12px', color: '#9c9a92' }}>Vice President Global Engineering, Chobani</div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '28px', paddingTop: '24px' }}>
            <p style={{ fontSize: '14px', color: '#b8b6ac', lineHeight: 1.75, fontStyle: 'italic', fontWeight: 300 }}>
              &ldquo;Thanks again for helping us deliver another successful project on time and on budget. The automation platform that was delivered far exceeded all our expectations. Metromotion Controls will definitely be first choice for our next project.&rdquo;
            </p>
            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#d4d2c8' }}>Gary Saywell</div>
              <div style={{ fontSize: '12px', color: '#7c7a72' }}>Project Engineer, Real Pet Food</div>
            </div>
          </div>
        </div>
      </section></Reveal>

      {/* PLATFORMS */}
      <Reveal><section className="section" style={{ background: 'var(--off)' }}>
        <div className="section-label">Our Expertise</div>
        <h2 className="section-headline">Platform <em>agnostic</em><br/>and vendor independent</h2>
        <p className="section-sub">We work across leading automation platforms and design around your site standards, not ours.</p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'var(--border)', border: '1px solid var(--border)', gap: '1px', marginTop: '48px',
        }} className="platform-grid">
          {platformLogos.map((platform) => (
            <div key={platform.name} style={{
              background: 'var(--white)', padding: '24px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: '94px',
            }}>
              <Image
                src={`/images/platforms/${platform.file}`}
                alt={`${platform.name} platform logo`}
                width={160}
                height={36}
                style={{ width: 'auto', height: '47px', objectFit: 'contain' }}
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
                    minHeight: '106px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={badgePath}
                    alt={`${humanizeFilename(path.basename(badgePath))} certification badge`}
                    width={190}
                    height={72}
                    style={{ width: 'auto', height: '72px', objectFit: 'contain' }}
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

      {/* SCOPING TOOL */}
      <Reveal><section id="scope" className="section" style={{ background: 'var(--off)' }}>
        <div style={{ marginBottom: '32px' }}>
          <div className="section-label">Project Scoping Tool</div>
          <h2 className="section-headline">Plan your <em>project</em></h2>
          <p className="section-sub">Tell us about your automation challenge. We&apos;ll come back with the key requirements, risks, and decisions to work through before engineering starts.</p>
        </div>
        <div style={{ background: '#f7f6f3' }}>
          <ProjectScopingTool />
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
            Tell us about your project and we&apos;ll come back with a straight answer on scope, approach, and what&apos;s involved. No fluff, no sales pitch.
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
