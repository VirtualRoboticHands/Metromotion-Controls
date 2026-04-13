import type { Metadata } from 'next'

export const siteUrl = 'https://metromotioncontrols.com.au'
export const siteName = 'Metromotion Controls'

export const defaultMetaDescription =
  'Melbourne-based industrial automation and control systems integrator delivering PLC programming, SCADA, HMI, IIoT and panel engineering across Australia.'

const defaultOgImage = '/logo.png'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  title: {
    default: siteName,
    template: `${siteName} | %s`,
  },
  description: defaultMetaDescription,
  openGraph: {
    siteName,
    locale: 'en_AU',
    type: 'website',
    url: siteUrl,
    title: siteName,
    description: defaultMetaDescription,
    images: [{ url: defaultOgImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultMetaDescription,
    images: [defaultOgImage],
  },
}

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title: {
      absolute: `${title} | ${siteName}`,
    },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: path,
    },
    twitter: {
      title: `${title} | ${siteName}`,
      description,
    },
  }
}

export const serviceMetadataBySlug: Record<string, { title: string; description: string }> = {
  'industrial-automation': {
    title: 'Industrial Automation & Control Systems Melbourne',
    description:
      'Industrial automation and control systems for Melbourne and Australia-wide manufacturers, from concept to commissioning. Discuss your project with our engineers.',
  },
  'plc-scada-hmi': {
    title: 'PLC & SCADA Programming Melbourne',
    description:
      'PLC programming, SCADA development and HMI design for Melbourne and Australian manufacturers needing robust, standards-driven control software. Talk to our team.',
  },
  'control-panel-engineering': {
    title: 'Control Panel Engineering Melbourne',
    description:
      'Control panel engineering and electrical design in Melbourne for compliant, build-ready industrial systems across Australia. Speak with our engineering team today.',
  },
  'systems-integration': {
    title: 'Industrial Systems Integration Melbourne',
    description:
      'Industrial systems integration connecting PLCs, machines and enterprise platforms for Melbourne and Australia-wide sites. Plan your integration with our engineers.',
  },
  'industrial-data-iiot': {
    title: 'Industrial Data, IIoT & Analytics',
    description:
      'Industrial data, IIoT and analytics solutions for Melbourne and Australian plants, delivering OEE visibility and MES outcomes. Explore your roadmap with us.',
  },
  'ot-networks': {
    title: 'OT Networks, Edge & Remote Access',
    description:
      'OT network design, edge architecture and secure remote access for Melbourne and Australian manufacturing sites. Strengthen uptime and support with our team.',
  },
  'functional-safety': {
    title: 'Functional Safety & Safety Systems',
    description:
      'Functional safety and safety systems engineering for Melbourne and Australian industry, including SIL assessment and safety PLC design. Discuss compliance with us.',
  },
  'automation-upgrades': {
    title: 'Automation Upgrades & Retrofits Melbourne',
    description:
      'Automation upgrades and retrofits for Melbourne and Australia-wide factories, modernising legacy PLC and SCADA platforms. Plan a low-risk upgrade with us.',
  },
  commissioning: {
    title: 'Commissioning, FAT & SAT',
    description:
      'Commissioning, FAT and SAT services for Melbourne and Australian automation projects, with structured testing and faster startup. Get commissioning support today.',
  },
  support: {
    title: 'Automation Support & Maintenance',
    description:
      'Automation support and maintenance for Melbourne and Australian manufacturers, with on-site and remote engineering assistance. Book responsive support now.',
  },
}

export const projectMetadataBySlug: Record<string, { title: string; description: string }> = {
  'chobani-yoghurt-plant': {
    title: 'Chobani Greenfields Yoghurt Plant Project',
    description:
      'Chobani yoghurt plant automation project delivered in Australia with site-wide controls integration and commissioning support. Explore this Melbourne-led case study.',
  },
  'la-casa-cheese-factory': {
    title: 'La Casa Greenfields Cheese Factory Project',
    description:
      'Greenfield cheese factory automation project in Australia covering design, build and commissioning for reliable production. Review this Melbourne engineering outcome.',
  },
  'real-pet-food-raw-materials': {
    title: 'Real Pet Food Raw Materials Automation Project',
    description:
      'Raw materials handling automation project for an Australian pet food facility using batch controls and SCADA. See how our Melbourne team delivered performance.',
  },
  'sakata-product-line-integration': {
    title: 'Sakata Product Line Integration Project',
    description:
      'Product line integration project for Sakata in Australia, combining PLC, SCADA and networked automation upgrades. View this Melbourne-delivered project result.',
  },
  'patties-hot-water-automation': {
    title: 'Patties Hot Water Set Automation Project',
    description:
      'Hot water set automation project for Australian food manufacturing, balancing reliable controls with tight budgets. See this practical Melbourne engineering solution.',
  },
  'tibaldi-inventory-management': {
    title: 'Tibaldi Inventory Management Automation Project',
    description:
      'Inventory management automation project for an Australian facility, integrating real-time stock visibility with production controls. Discover this Melbourne case study.',
  },
  'jc-smale-brick-texturing': {
    title: 'JC Smale Brick Texturing Automation Project',
    description:
      'Brick texturing machine automation project in Australia, with flexible commissioning and HMI recipe development. Review this Melbourne controls delivery.',
  },
  'steamtech-boiler-automation': {
    title: 'Steamtech Boiler Automation Project',
    description:
      'Boiler automation project for a Melbourne manufacturer, including PLC migration, I/O testing and commissioning support across Australia. See project details today.',
  },
  'lactalis-commissioning-support': {
    title: 'Lactalis Programming & Commissioning Support Project',
    description:
      'Programming and commissioning support project for Lactalis Australia across multiple dairy sites. See how our Melbourne engineers improved plant performance.',
  },
  'arnotts-control-system-audit': {
    title: "Arnott's Control System Audit Project",
    description:
      "Control system audit project for Arnott's in Australia, documenting assets and future automation recommendations. Review this Melbourne engineering engagement.",
  },
  'orora-network-investigation': {
    title: 'Orora OT Network Investigation Project',
    description:
      'OT network investigation project for Orora in Australia to resolve latency and protect production uptime. See this Melbourne-led automation case study.',
  },
}
