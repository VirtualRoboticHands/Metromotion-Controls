export const projectCategories = [
  'Large Capital Projects',
  'Factory Automation Upgrades',
  'OEM Automation Projects',
  'Engineering Services'
] as const

export type ProjectCategory = (typeof projectCategories)[number]

export type ProjectDetail = {
  slug: string
  client: string
  category: ProjectCategory
  title: string
  overview: string
  deliverables: string[]
  technologies?: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

export const projects: ProjectDetail[] = [
  {
    slug: 'chobani-yoghurt-plant',
    client: 'Chobani',
    category: 'Large Capital Projects',
    title: 'Greenfields Yoghurt Plant',
    overview:
      'As Chobani expanded into Australia, the company acquired a local yoghurt operation and invested in a new automated yoghurt facility. Metromotion Controls was engaged as the on-site automation and electrical partner to deliver core infrastructure and plant-wide integration. This partnership has continued since 2011, with ongoing support aligned to Chobani\'s global automation standards.',
    deliverables: [
      'Site power upgrade, including new mains design and procurement',
      'Building services and process power distribution',
      'Factory-wide automation integration across process, packaging and site services',
      'Commissioning plus ongoing remote and on-site support'
    ],
    testimonial: {
      quote:
        'Metromotion Controls and all the team have been an outstanding partner of Chobani since 2011. They provided a one in a million partnership that we have not seen anywhere else in the world. From the initial onset of the project they provided outstanding project management of the whole portfolio, managed all pricing and quotations, facilitated design of all process, mechanical and electrical to meet our end goals, and coordinated all installation. We have continued to work with them on all projects since completion in 2012 and would not hesitate to recommend them.',
      author: 'Hugh Roddy',
      role: 'Senior Director Global Automation, Controls & Energy Management, Chobani'
    }
  },
  {
    slug: 'la-casa-cheese-factory',
    client: 'La Casa Del Formaggio',
    category: 'Large Capital Projects',
    title: 'Greenfields Cheese Factory',
    overview:
      'La Casa Del Formaggio is a family-run Australian business with more than 125 staff, producing Bocconcini, Burrata, Mascarpone, Mozzarella and Ricotta for retail, food service and industrial customers nationwide. To meet rapid growth, Metromotion Controls was contracted to design, build and commission a fully automated greenfield cheese manufacturing facility in South Australia.',
    deliverables: [
      'End-to-end design, build and commissioning of a fully automated greenfield cheese plant',
      'Delivery of automation and electrical systems to support growing production demand',
      'Commissioning support for start-up and operational readiness'
    ],
    technologies: ['Rockwell', 'Ignition SCADA', '21 PowerFlex525 VSDs', '3 Motor Control Centres', '4 HMI stations', '16,237 Ignition tags', '30 PID loops']
  },
  {
    slug: 'real-pet-food-raw-materials',
    client: 'Real Pet Food Company',
    category: 'Large Capital Projects',
    title: 'Raw Materials Handling Automation',
    overview:
      'Founded in 1994 as a small chilled dog-roll facility in Queensland, Real Pet Food Company has grown into one of Australia\'s leading pet food manufacturers. This project covered supply, installation and commissioning of processing equipment across mechanical, electrical and automation scopes.',
    deliverables: [
      'Automation architecture design using Rockwell PLC, I/O and VSDs, Stratix managed networking and Ignition SCADA',
      'Tailored ISA-88 batch control platform from production scheduling through to live plant-floor batch visibility',
      'Full system simulation and FAT completed prior to site installation',
      'Mechanical installation, electrical installation, and end-to-end automation delivery'
    ],
    technologies: ['Rockwell PLC', 'Ignition SCADA', 'Stratix managed network', 'ISA-88 batch control'],
    testimonial: {
      quote:
        'Thanks again for helping us deliver another successful project on time and on budget. The automation platform delivered far exceeded all our expectations. Metromotion Controls will definitely be first choice for our next project.',
      author: 'Gary Saywell',
      role: 'Project Engineer, Real Pet Food'
    }
  },
  {
    slug: 'sakata-product-line-integration',
    client: "Sakata (Smith's Snackfood Company)",
    category: 'Factory Automation Upgrades',
    title: 'New Product Line Integration',
    overview:
      "The Smith's Snackfood Company has brought successful brands such as Grain Waves, Doritos and Sakata rice crackers to market. Metromotion Controls supported the integration of new equipment into an existing production line to enable reliable expansion.",
    deliverables: [
      'Automation networking and communications integration for new line equipment',
      'Development of detailed functional descriptions',
      'PLC and SCADA programming plus commissioning support'
    ],
    technologies: ['Rockwell']
  },
  {
    slug: 'patties-hot-water-automation',
    client: 'Patties Foods',
    category: 'Factory Automation Upgrades',
    title: 'Low Cost Hot Water Set Automation',
    overview:
      'Patties Foods manufactures meat pies, baked goods, frozen fruit products and pre-made desserts for the Australian market. Metromotion Controls delivered a low-cost control system for a hot water set process, balancing dependable performance with strict budget constraints.',
    deliverables: [
      'Design and implementation of a cost-effective hot water set control solution',
      'Reliable process functionality and consistent operational performance',
      'Fit-for-purpose engineering without unnecessary system complexity'
    ]
  },
  {
    slug: 'tibaldi-inventory-management',
    client: 'Tibaldi',
    category: 'Factory Automation Upgrades',
    title: 'Automatic Inventory Management',
    overview:
      'Metromotion Controls designed and implemented an automated inventory management system integrated with Tibaldi\'s existing production controls to improve stock handling and visibility.',
    deliverables: [
      'Automated inventory management system design and implementation',
      'Integration with existing production control systems',
      'Real-time stock visibility and reduced manual handling'
    ]
  },
  {
    slug: 'jc-smale-brick-texturing',
    client: 'JC Smale',
    category: 'OEM Automation Projects',
    title: 'Brick Texturing Machine Automation',
    overview:
      'JC Smale is a high-performance manufacturing and design engineering team serving multiple sectors. Metromotion Controls has delivered several projects for JC Smale, particularly in brickworks applications. This project required flexible automation delivery while equipment remained in mechanical development.',
    deliverables: [
      'Integration of new equipment during ongoing mechanical development',
      'Site commissioning at both the engineering workshop and the end-customer brickworks site',
      'Collaborative development of an HMI interface tailored to complex recipe management'
    ]
  },
  {
    slug: 'steamtech-boiler-automation',
    client: 'Steamtech Engineering',
    category: 'OEM Automation Projects',
    title: 'Boiler Automation',
    overview:
      'Steamtech Engineering is a Melbourne-based Australian boiler manufacturer established in 1970, producing a broad range of industrial steam and hot water boilers. Metromotion Controls provided local engineering support for automation delivery and customer commissioning outcomes.',
    deliverables: [
      'PLC program migration for existing automation systems',
      'I/O testing and on-site commissioning activities',
      'Ongoing engineering support to Steamtech end customers'
    ],
    technologies: ['Rockwell']
  },
  {
    slug: 'lactalis-commissioning-support',
    client: 'Lactalis Australia',
    category: 'Engineering Services',
    title: 'Programming & Commissioning Support',
    overview:
      "Lactalis Australia (formerly Parmalat) is one of Australia's largest dairy contributors and is part of the world's largest dairy group, with brands including Paul's Milk, OAK, ICE BREAK, Vaalia Yoghurt and President Cheese. Metromotion Controls was engaged across multiple sites including Bendigo, Echuca, Tamar Valley, Longwarry, Rowville and Lemnos.",
    deliverables: [
      'Commissioning and integration of OEM installations',
      'Process upgrades to support new product introductions',
      'Factory-wide CIP set validations',
      'Continuous improvement of existing process operations',
      'SCADA implementation and conversion in Citect',
      'I/O testing of electrical installations',
      'Ongoing production support'
    ],
    technologies: ['Citect SCADA', 'Rockwell']
  },
  {
    slug: 'arnotts-control-system-audit',
    client: "Arnott's",
    category: 'Engineering Services',
    title: 'Control System Audit',
    overview:
      "Arnott's is one of Australia's most recognised food manufacturers. As part of a broader improvement program, Metromotion Controls delivered a comprehensive audit of the site's existing control system architecture.",
    deliverables: [
      'On-site walkthrough to identify and document existing control assets',
      'Detailed findings report covering current-state architecture',
      'Recommendations to support Arnott\'s future automation strategy'
    ]
  },
  {
    slug: 'orora-network-investigation',
    client: 'Orora',
    category: 'Engineering Services',
    title: 'OT Network Investigation',
    overview:
      "Orora delivers a broad range of tailored packaging solutions. Metromotion Controls was engaged by Orora's engineering team to diagnose excessive control network latency that was impacting production performance.",
    deliverables: [
      'Site investigation of network topology and device configurations',
      'Development of Ethernet network schematics',
      'Recommendations report to improve network performance and reduce production downtime'
    ]
  }
]

export const projectsBySlug = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<string, ProjectDetail>

export const projectsByCategory = projectCategories.map((category) => ({
  category,
  projects: projects.filter((project) => project.category === category)
}))
