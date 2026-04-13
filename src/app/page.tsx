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
  const certificationBadges = ['ignitiongold.png', 'rockwell.png']
    .map((file) => resolveImagePath(file, ['images', 'images/platforms']))
    .filter((badge): badge is string => Boolean(badge))
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero-grid pt-[72px] grid grid-cols-2 min-h-screen relative overflow-hidden">
        <Image
          src="/images/shutterstock_1038399151-scaled.jpg"
          alt="Industrial automation control cabinets and piping in a modern processing facility"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="hero-left px-[52px] py-[80px] flex flex-col justify-center border-r border-white/25 relative z-10">
          <div
            className="inline-flex items-center gap-[10px] text-[11px] tracking-[0.14em] uppercase text-red mb-8 font-medium"
            style={{ animation: 'fadeUp 0.5s 0.1s both' }}
          >
            <span className="w-[22px] h-px bg-red inline-block" />
            Control Systems Integrator · Melbourne, AU
          </div>
          <h1
            className="font-serif text-[clamp(48px,5.2vw,72px)] leading-[1.02] tracking-[-0.02em] text-white mb-7"
            style={{ animation: 'fadeUp 0.6s 0.2s both' }}
          >
            Automation<br/>engineering<br/>for <em className="text-red italic">Australian</em><br/>industry
          </h1>
          <p
            className="text-[17px] text-white/85 leading-[1.75] max-w-[420px] mb-11 font-light"
            style={{ animation: 'fadeUp 0.6s 0.3s both' }}
          >
            PLC, SCADA &amp; HMI specialists trusted by <strong className="text-white font-medium">Chobani, Lactalis, La Casa del Formaggio</strong> and Australia&apos;s leading manufacturers. Delivering nationally from Melbourne since 2012.
          </p>
          <div className="flex gap-3" style={{ animation: 'fadeUp 0.6s 0.4s both' }}>
            <Link href="/#projects" className="btn-primary">View Our Work</Link>
            <Link
              href="#scope"
              className="bg-red text-white border border-red px-[26px] py-[14px] no-underline text-[13px] font-medium tracking-[0.02em] shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
            >
              Start a Project
            </Link>
          </div>
        </div>

        <div className="hero-right bg-black/25 flex flex-col relative z-10">
          {[
            { num: '200', suffix: '+', label: 'Projects delivered' },
            { num: '80', suffix: '%', label: 'Repeat client rate' },
            { num: '75', suffix: '+', label: 'Clients served' },
            { num: String(yearsInOperation), suffix: '+', label: 'Years in operation' },
          ].map((stat, i) => (
            <div key={i} className={`hero-stat flex-1 px-[52px] flex flex-col justify-center${i < 3 ? ' border-b border-white/20' : ''}`}>
              <div>
                <div className="font-serif text-[52px] text-white leading-none mb-[5px]">
                  {stat.num}
                  {stat.suffix && <em className="text-red not-italic text-[38px]">{stat.suffix}</em>}
                </div>
                <div className="text-[12px] text-white/75 tracking-[0.05em] uppercase font-normal">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS STRIP */}
      <Reveal><div className="clients-strip px-[52px] py-7 border-b border-border bg-white flex flex-col items-stretch gap-5">
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
      <Reveal><div className="intro-grid bg-ink px-[52px] py-[80px] grid grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="font-serif text-[clamp(30px,3.2vw,44px)] text-white leading-[1.1] tracking-[-0.02em]">
            Engineering that keeps<br/>your production <em className="text-red italic">moving</em>
          </h2>
        </div>
        <div>
          <p className="text-[15px] text-white/55 leading-[1.85] font-light">
            Metromotion Controls is a Melbourne-based control systems integrator delivering automation engineering for manufacturers across Australia. We specialise in PLC programming, SCADA and HMI development, control panel engineering, and commissioning for production facilities that run around the clock.
            <br/><br/>
            Our core industries are food and beverage, dairy, FMCG, pet food, packaging, agricultural processing, and building products. We work across all major platforms including Allen-Bradley, Siemens, Ignition, and AVEVA, and we stay involved from first scope through to ongoing support.
          </p>
        </div>
      </div></Reveal>

      {/* SERVICES */}
      <Reveal><section className="section bg-off" id="services">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
          <div>
            <div className="section-label">What We Do</div>
            <h2 className="section-headline">What we <em>deliver</em></h2>
          </div>
          <p className="section-sub">From first brief to final commissioning, and long after. We cover the full scope so you deal with one team, not multiple vendors.</p>
        </div>
        <div className="services-grid grid grid-cols-5 bg-border border border-border gap-px">
          {services.map(svc => (
            <Link href={svc.href} key={svc.num} className="service-card-wrapper hover-lift service-card-link bg-white px-[26px] py-8 flex flex-col gap-[13px] relative no-underline" style={{ transition: 'background 0.22s, transform 0.22s ease, box-shadow 0.22s ease' }}>
              <div className="text-[10px] text-muted2 tracking-[0.1em] font-medium uppercase">{svc.num}</div>
              <div className="w-[38px] h-[38px] border border-border flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] stroke-red fill-none [stroke-width:1.5] [stroke-linecap:round] [stroke-linejoin:round]">
                  {svc.icon}
                </svg>
              </div>
              <div className="text-[15px] font-semibold text-ink leading-[1.3]">{svc.title}</div>
              <div className="text-[13px] text-muted leading-[1.65] font-light flex-1">{svc.desc}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {svc.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </section></Reveal>

      {/* INDUSTRIES */}
      <Reveal><section className="section bg-white" id="industries">
        <div className="section-label">Industries</div>
        <h2 className="section-headline">Deep sector <em>expertise</em></h2>
        <p className="section-sub">Over a decade focused on Australia&apos;s most demanding manufacturing sites. We understand the equipment, compliance requirements, and uptime targets your team is measured against.</p>
        <div className="industry-grid industry-cards-grid grid grid-cols-4 gap-[11px] mt-12">
          {industries.map(ind => (
            <div key={ind.num} className="hover-lift bg-white px-[22px] pt-7 pb-6 flex flex-col gap-[10px]" style={{
              transition: 'background 0.2s',
              borderTop: '3px solid #c8281e',
              borderLeft: '0.5px solid var(--border)',
              borderRight: '0.5px solid var(--border)',
              borderBottom: '0.5px solid var(--border)',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}>
              <div className="text-[12px] text-red font-medium tracking-[0.05em]">{ind.num}</div>
              <div className="text-[14px] font-medium text-ink leading-[1.35]">{ind.name}</div>
              <div className="text-[13px] text-muted leading-[1.65] font-light">{ind.desc}</div>
            </div>
          ))}
        </div>
      </section></Reveal>

      {/* PROJECTS */}
      <Reveal><section className="section bg-off" id="projects">
        <div className="section-label">Case Studies</div>
        <h2 className="section-headline">Projects that <em>speak</em><br/>for themselves</h2>

        {/* Featured project */}
        <div className="project-main grid gap-0 border border-border mt-12" style={{ gridTemplateColumns: '55% 45%' }}>
          <div className="bg-off2 min-h-[380px] flex items-center justify-center relative overflow-hidden border-r border-border">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }} />
            <div className="absolute top-5 left-5 bg-red text-white text-[10px] tracking-[0.1em] uppercase px-3 py-[5px] font-medium">
              Featured Project
            </div>
            <div className="relative bg-white border border-border2 px-[22px] py-[11px] text-[12px] tracking-[0.07em] uppercase text-muted flex items-center gap-[9px]">
              <span className="w-[7px] h-[7px] bg-red inline-block shrink-0" />
              Greenfields Yoghurt Plant, Chobani
            </div>
          </div>
          <div className="bg-white px-9 py-11 flex flex-col gap-[18px]">
            <div className="text-[11px] tracking-[0.1em] uppercase text-red font-medium">
              Chobani · Food &amp; Beverage · Greenfield
            </div>
            <div className="font-serif text-[28px] leading-[1.15] tracking-[-0.02em] text-ink">
              Full-plant automation from the ground up
            </div>
            <p className="text-[14px] text-muted leading-[1.75] font-light">
              End-to-end automation design and commissioning for a large-scale greenfields yoghurt manufacturing facility. Scope covered PLC programming, SCADA development, CIP automation, batching control, and full site integration.
            </p>
            <div className="flex gap-6 py-[18px] border-t border-border border-b border-border">
              {[
                { val: '100', suffix: '%', label: 'On schedule' },
                { val: 'Rockwell', suffix: '', label: 'Platform' },
                { val: '2012', suffix: '→', label: 'Still ongoing' },
              ].map(m => (
                <div key={m.label} className="flex flex-col gap-[3px]">
                  <div className="font-serif text-[26px] text-ink leading-none">
                    {m.val}{m.suffix && <em className="text-red not-italic text-[18px]">{m.suffix}</em>}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.07em] text-muted font-medium">{m.label}</div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-primary self-start mt-1">
              Discuss a Similar Project
            </Link>
            <Link href="#scope" className="text-[12px] text-muted no-underline">
              Or use the project scoping tool →
            </Link>
          </div>
        </div>

        {/* Case study cards */}
        <div className="cases-grid grid grid-cols-3 bg-border border border-border border-t-0 gap-px">
          {showcaseProjects.map(p => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="hover-lift bg-white px-[26px] py-[26px] flex flex-col gap-[9px] no-underline" style={{ transition: 'background 0.2s' }}>
              <div className="text-[10px] tracking-[0.1em] uppercase text-red font-medium">{p.category}</div>
              <div className="text-[11px] tracking-[0.08em] uppercase text-muted2 font-medium">{p.client}</div>
              <div className="text-[15px] font-semibold text-ink leading-[1.3]">{p.title}</div>
              <div className="text-[13px] text-muted leading-[1.6] font-light line-clamp-2">{p.overview}</div>
              <div className="text-[12px] text-red font-medium mt-1">View project →</div>
            </Link>
          ))}
        </div>
      </section></Reveal>

      {/* TESTIMONIALS */}
      <Reveal><section className="section testimonials-section-dark bg-[#1a1a18] px-10 py-12" id="about">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-red uppercase text-[11px] tracking-[2px] font-medium mb-6">
            Client Testimonials
          </div>

          <div className="flex flex-col gap-5">
            <div className="font-serif italic text-[clamp(20px,2.2vw,22px)] text-off leading-[1.5]">
              All the team have been an outstanding partner of Chobani since 2012. They have provided a one in a million partnership that we have not seen anywhere else in the world to date. They continue to do so on many levels.
            </div>
            <div className="flex items-stretch gap-3">
              <div className="w-[3px] bg-red rounded-[1px] shrink-0" />
              <div>
                <div className="text-[14px] font-medium text-off">Hugh Roddy</div>
                <div className="text-[12px] text-[#9c9a92]">Vice President Global Engineering, Chobani</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-7 pt-6">
            <p className="text-[14px] text-[#b8b6ac] leading-[1.75] italic font-light">
              &ldquo;Thanks again for helping us deliver another successful project on time and on budget. The automation platform that was delivered far exceeded all our expectations. Metromotion Controls will definitely be first choice for our next project.&rdquo;
            </p>
            <div className="mt-3">
              <div className="text-[14px] font-medium text-[#d4d2c8]">Gary Saywell</div>
              <div className="text-[12px] text-[#7c7a72]">Project Engineer, Real Pet Food</div>
            </div>
          </div>
        </div>
      </section></Reveal>

      {/* PLATFORMS */}
      <Reveal><section className="section bg-off">
        <div className="section-label">Our Expertise</div>
        <h2 className="section-headline">Platform <em>agnostic</em><br/>and vendor independent</h2>
        <p className="section-sub">We work across leading automation platforms and design around your site standards, not ours.</p>
        <div className="platform-grid grid grid-cols-4 bg-border border border-border gap-px mt-12">
          {platformLogos.map((platform) => (
            <div key={platform.name} className="bg-white px-4 py-6 flex items-center justify-center min-h-[94px]">
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
          <div className="mt-[30px]">
            <div className="section-label">Certifications</div>
            <div className="flex gap-4 flex-wrap items-center">
              {certificationBadges.map((badgePath) => (
                <div
                  key={badgePath}
                  className="bg-white border border-border px-[18px] py-[14px] min-h-[106px] flex items-center"
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
      <Reveal><section className="section bg-white">
        <div className="section-label">Why Metromotion</div>
        <h2 className="section-headline">The difference<br/><em>experience</em> makes</h2>
        <div className="why-grid grid grid-cols-3 bg-border border border-border gap-px mt-12">
          {whyCards.map(w => (
            <div key={w.title} className="bg-white px-[30px] py-9 flex flex-col gap-[13px]">
              <div className="font-serif text-[40px] text-red leading-none">{w.num}</div>
              <div className="text-[16px] font-semibold text-ink">{w.title}</div>
              <div className="text-[13.5px] text-muted leading-[1.7] font-light">{w.desc}</div>
            </div>
          ))}
        </div>
      </section></Reveal>

      {/* SCOPING TOOL */}
      <Reveal><section id="scope" className="section bg-off">
        <div className="mb-8">
          <div className="section-label">Project Scoping Tool</div>
          <h2 className="section-headline">Plan your <em>project</em></h2>
          <p className="section-sub">Tell us about your automation challenge. We&apos;ll come back with the key requirements, risks, and decisions to work through before engineering starts.</p>
        </div>
        <div className="bg-off">
          <ProjectScopingTool />
        </div>
      </section></Reveal>

      {/* CTA BAND */}
      <div id="contact" className="cta-grid bg-ink px-[52px] py-24 grid gap-[60px] items-center" style={{ gridTemplateColumns: '1fr auto' }}>
        <div>
          <h2 className="font-serif text-[clamp(34px,3.8vw,52px)] text-white leading-[1.05] tracking-[-0.02em]">
            Ready to improve<br/>your <em className="text-red italic">production?</em>
          </h2>
          <p className="text-[15px] text-white/45 mt-3 font-light max-w-[480px] leading-[1.75]">
            Tell us about your project and we&apos;ll come back with a straight answer on scope, approach, and what&apos;s involved. No fluff, no sales pitch.
          </p>
        </div>
        <div className="flex flex-row gap-3 items-center flex-wrap shrink-0">
          <Link href="/contact" className="btn-cta no-underline">Start a Conversation</Link>
          <Link href="#scope" className="btn-outline no-underline text-white border-white/35">Scope Your Project</Link>
          <div className="flex flex-col gap-[5px]">
            <a href="tel:0398076896" className="text-[13px] text-white/40 no-underline">(03) 9807 6896</a>
            <a href="mailto:info@metromotioncontrols.com.au" className="text-[13px] text-white/40 no-underline">info@metromotioncontrols.com.au</a>
            <span className="text-[13px] text-white/40">39 Sunhill Rd, Mount Waverley VIC 3149</span>
          </div>
        </div>
      </div>

      <Footer />

    </>
  )
}
