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
  industry: string
  engagement: string
  title: string
  overview: string
  outcomes: string[]
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
    industry: 'Food & Beverage',
    engagement: 'Greenfield plant delivery and long-term support',
    title: 'Greenfields Yoghurt Plant',
    overview:
      'When Chobani established its first Australian manufacturing facility, the project demanded a controls partner capable of managing plant-wide automation from the ground up. Metromotion Controls was engaged as the on-site automation and electrical partner, delivering site power infrastructure, process automation and full-facility integration. The partnership has continued since 2011, with ongoing support aligned to Chobani\'s global automation standards.',
    outcomes: [
      'Plant-wide automation and electrical delivery stayed under one engineering partner from startup through long-term support.',
      'Process, packaging and site services were integrated as one operating environment rather than separate vendor islands.',
      'The delivery model remained aligned to Chobani\'s global automation standards beyond go-live.'
    ],
    deliverables: [
      'Site power upgrade, including new mains design and procurement',
      'Building services and process power distribution',
      'Factory-wide automation integration across process, packaging and site services',
      'Commissioning plus ongoing remote and on-site support'
    ],
    technologies: ['Rockwell ControlLogix', 'FactoryTalk View SE', 'PowerFlex Drives', 'EtherNet/IP'],
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
    industry: 'Dairy',
    engagement: 'Greenfield factory delivery',
    title: 'Greenfields Cheese Factory',
    overview:
      'La Casa Del Formaggio is a family-run Australian business with more than 125 staff, producing Bocconcini, Burrata, Mascarpone, Mozzarella and Ricotta for retail, food service and industrial customers nationwide. To meet rapid production growth, Metromotion Controls was contracted to design, build and commission a fully automated greenfield cheese manufacturing facility in South Australia, delivering full electrical and automation scope from concept through to operational handover.',
    outcomes: [
      'A greenfield cheese facility was delivered with full electrical and automation scope under one project team.',
      'Ignition visibility, MCC design, process automation and CIP controls were aligned into one engineered package.',
      'Training and handover supported a controlled transition into live production.'
    ],
    deliverables: [
      'End-to-end design, build and commissioning of a fully automated greenfield cheese plant',
      'Full electrical scope including MCC design, cable schedules and panel engineering',
      'Automation and control systems for pasteurisation, vat management and CIP processes',
      'Commissioning support for start-up, operator training and operational readiness'
    ],
    technologies: ['Rockwell', 'Ignition SCADA', '21 PowerFlex525 VSDs', '3 Motor Control Centres', '4 HMI stations', '16,237 Ignition tags', '30 PID loops']
  },
  {
    slug: 'real-pet-food-raw-materials',
    client: 'Real Pet Food Company',
    category: 'Large Capital Projects',
    industry: 'Pet Food',
    engagement: 'Raw materials and batch automation',
    title: 'Raw Materials Handling Automation',
    overview:
      'Founded in 1994 as a small chilled dog-roll facility in Queensland, Real Pet Food Company has grown into one of Australia\'s leading pet food manufacturers. This project covered supply, installation and commissioning of a fully automated raw materials handling system, with a particular focus on batch traceability and production scheduling. Metromotion Controls delivered the complete mechanical, electrical and automation scope.',
    outcomes: [
      'Raw materials handling was tied to ISA-88 batch control and live plant-floor visibility.',
      'Full simulation and FAT reduced commissioning risk before the system reached site.',
      'Mechanical, electrical and automation scope stayed coordinated through delivery and startup.'
    ],
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
    industry: 'FMCG & Packaging',
    engagement: 'Line integration upgrade',
    title: 'New Product Line Integration',
    overview:
      "Smith's Snackfood Company manages some of Australia's most recognised snack brands including Grain Waves, Doritos and Sakata rice crackers. When new production equipment was added alongside existing assets, clean integration of automation, networking and control software was critical to maintaining line reliability. Metromotion Controls provided engineering support to deliver seamless integration from field devices through to the site SCADA layer.",
    outcomes: [
      'New equipment was integrated into an existing production environment without creating a fragmented controls layer.',
      'EtherNet/IP networking, PLC changes and SCADA work were delivered together rather than as isolated tasks.',
      'The upgraded line entered service with clearer control philosophies and handover support.'
    ],
    deliverables: [
      'Automation networking and EtherNet/IP communications integration for new line equipment',
      'Development of detailed functional descriptions and control philosophies',
      'PLC and SCADA programming plus commissioning and handover support'
    ],
    technologies: ['Rockwell ControlLogix', 'EtherNet/IP', 'FactoryTalk View SE']
  },
  {
    slug: 'patties-hot-water-automation',
    client: 'Patties Foods',
    category: 'Factory Automation Upgrades',
    industry: 'Food & Beverage',
    engagement: 'Targeted process automation upgrade',
    title: 'Low Cost Hot Water Set Automation',
    overview:
      'Patties Foods is one of Australia\'s leading manufacturers of pies, pasties, sausage rolls and frozen desserts. When Patties needed to automate a hot water set process used for product forming and cooking cycle control, the project required a practical, low-cost engineering solution. Metromotion Controls scoped and delivered a fit-for-purpose control system that met operational requirements without over-engineering the scope or exceeding budget.',
    outcomes: [
      'The control solution met the process requirement without unnecessary complexity or overspend.',
      'Temperature and cycle control became more consistent for the production team.',
      'The operator interface and handover were designed for quick adoption on site.'
    ],
    deliverables: [
      'Scoped and delivered a fit-for-purpose hot water set control solution within strict budget constraints',
      'Reliable temperature and cycle control for consistent product forming and cooking outcomes',
      'Straightforward operator interface designed for fast adoption by production staff',
      'Engineering documentation and handover support for ongoing maintenance'
    ],
    technologies: ['Rockwell CompactLogix', 'PanelView HMI']
  },
  {
    slug: 'tibaldi-inventory-management',
    client: 'Tibaldi',
    category: 'Factory Automation Upgrades',
    industry: 'Food & Beverage',
    engagement: 'Inventory visibility and controls integration',
    title: 'Automatic Inventory Management',
    overview:
      'Tibaldi Smallgoods is an Australian producer of Italian-style cured meats and continental smallgoods with a longstanding reputation in the Melbourne market. As production volumes grew, manual stock tracking and material movement across the factory floor created delays, data gaps and traceability risk. Metromotion Controls designed and implemented an automated inventory management system, integrating directly with existing production controls to provide real-time visibility and reduce manual handling.',
    outcomes: [
      'Manual stock tracking was replaced with integrated, real-time inventory visibility.',
      'Production controls and inventory data were linked to improve traceability across the factory.',
      'The system reduced manual data entry across raw material, work-in-progress and finished goods movements.'
    ],
    deliverables: [
      'Automated inventory tracking and management system design and implementation',
      'Integration with existing production PLC and control infrastructure',
      'Real-time stock visibility across raw material, work-in-progress and finished goods areas',
      'Reduced manual data entry and improved traceability through automated stock movement recording'
    ],
    technologies: ['Rockwell', 'Ignition SCADA', 'SQL Database Integration']
  },
  {
    slug: 'jc-smale-brick-texturing',
    client: 'JC Smale',
    category: 'OEM Automation Projects',
    industry: 'Building Products',
    engagement: 'OEM machine automation',
    title: 'Brick Texturing Machine Automation',
    overview:
      'JC Smale is a Melbourne-based high-performance manufacturing and design engineering business serving multiple industrial sectors. Metromotion Controls has a long-standing working relationship with the JC Smale team, particularly on brickworks automation projects. This engagement required flexible, adaptive delivery — working in parallel with ongoing mechanical development while building a polished HMI capable of managing complex multi-recipe texturing operations.',
    outcomes: [
      'Automation delivery kept pace with live mechanical development instead of waiting for a fixed design freeze.',
      'The HMI was tailored for complex recipe-based texturing workflows rather than a generic operator screen set.',
      'Commissioning support covered both the OEM workshop and the end-customer site.'
    ],
    deliverables: [
      'Automation integration of new equipment during concurrent mechanical development',
      'Site commissioning at both the JC Smale engineering workshop and the end-customer brickworks site',
      'Collaborative HMI design tailored to complex recipe management and operator workflows'
    ],
    technologies: ['Rockwell CompactLogix', 'FactoryTalk View ME', 'EtherNet/IP']
  },
  {
    slug: 'steamtech-boiler-automation',
    client: 'Steamtech Engineering',
    category: 'OEM Automation Projects',
    industry: 'Utilities & OEM',
    engagement: 'Legacy migration and OEM support',
    title: 'Boiler Automation',
    overview:
      'Steamtech Engineering is a Melbourne-based Australian boiler manufacturer established in 1970, producing a broad range of industrial steam and hot water boilers for commercial and industrial customers. As Steamtech modernised its product range, Metromotion Controls was engaged to migrate legacy automation programs and provide commissioning support for Steamtech\'s end customers across Australia, ensuring consistent and reliable outcomes across each installation.',
    outcomes: [
      'Legacy boiler programs were migrated onto current platforms for more maintainable future deployment.',
      'Commissioning support extended to Steamtech end customers, not only the OEM workshop environment.',
      'New installations benefited from a more consistent controls baseline across the product range.'
    ],
    deliverables: [
      'PLC program migration from legacy to current automation platforms',
      'I/O testing and on-site commissioning activities for new installations',
      'Ongoing engineering support to Steamtech end customers post-commissioning'
    ],
    technologies: ['Rockwell CompactLogix', 'PanelView HMI']
  },
  {
    slug: 'lactalis-commissioning-support',
    client: 'Lactalis Australia',
    category: 'Engineering Services',
    industry: 'Dairy',
    engagement: 'Multi-site engineering support',
    title: 'Programming & Commissioning Support',
    overview:
      "Lactalis Australia (formerly Parmalat) is one of Australia's largest dairy contributors and part of the world's largest dairy group, with brands including Paul's Milk, OAK, ICE BREAK, Vaalia Yoghurt and President Cheese. Metromotion Controls was engaged across multiple sites including Bendigo, Echuca, Tamar Valley, Longwarry, Rowville and Lemnos, providing programming, commissioning and ongoing production support across a range of process upgrades and new equipment installations.",
    outcomes: [
      'Programming, commissioning and support were delivered across multiple dairy sites under one engineering relationship.',
      'CIP validations and SCADA work supported hygiene, changeover and product introduction requirements.',
      'The engagement strengthened site capability across upgrades, OEM installs and live production support.'
    ],
    deliverables: [
      'Commissioning and integration of OEM installations across multiple dairy sites',
      'Process upgrades to support new product introductions and production line changes',
      'Factory-wide CIP set validations to maintain hygiene and compliance standards',
      'Continuous improvement of existing process operations and control sequences',
      'SCADA implementation and conversion in Citect across site systems',
      'I/O testing of electrical installations and ongoing production support'
    ],
    technologies: ['Citect SCADA', 'Rockwell', 'EtherNet/IP']
  },
  {
    slug: 'arnotts-control-system-audit',
    client: "Arnott's",
    category: 'Engineering Services',
    industry: 'Food & Beverage',
    engagement: 'Audit and automation roadmap',
    title: 'Control System Audit',
    overview:
      "Arnott's is one of Australia's most recognised food and biscuit manufacturers, with manufacturing operations across the country. As part of a broader operational improvement program, the Arnott's engineering team engaged Metromotion Controls to conduct a structured audit of the existing control system infrastructure. The work provided a clear current-state picture and a prioritised set of recommendations to guide future automation investment decisions and manage obsolescence risk.",
    outcomes: [
      'The audit provided site leadership with a structured current-state view of hardware, software and network risk.',
      'Recommendations were prioritised to guide future automation investment rather than producing a generic asset register.',
      'The result was a practical roadmap for managing obsolescence and future upgrades.'
    ],
    deliverables: [
      'On-site walkthrough to identify, document and assess existing control assets and architecture',
      'Detailed findings report covering current-state hardware, software and network infrastructure',
      "Prioritised recommendations to support Arnott's future automation strategy and risk management"
    ],
    technologies: ['Control System Assessment', 'Rockwell', 'Asset Documentation']
  },
  {
    slug: 'orora-network-investigation',
    client: 'Orora',
    category: 'Engineering Services',
    industry: 'Packaging',
    engagement: 'OT network investigation',
    title: 'OT Network Investigation',
    overview:
      "Orora is one of Australasia's leading packaging solution providers, operating manufacturing and processing sites across the region. When excessive latency on a production-critical OT network began affecting control system performance and line output, Orora's engineering team engaged Metromotion Controls to investigate the root cause. The project combined detailed site investigation, network documentation and a structured recommendations report to resolve the issue and prevent recurrence.",
    outcomes: [
      'The investigation traced production-impacting latency back to the OT network environment.',
      'Accurate network schematics improved future troubleshooting and change control on site.',
      'Recommendations were focused on restoring performance and reducing repeat disruption.'
    ],
    deliverables: [
      'Site investigation of OT network topology, device configurations and traffic behaviour',
      'Development of accurate Ethernet network schematics reflecting the as-built environment',
      'Recommendations report to reduce latency, improve network performance and prevent future production impact'
    ],
    technologies: ['OT Network Assessment', 'Industrial Ethernet', 'Network Topology Analysis']
  }
]

export const projectsBySlug = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<string, ProjectDetail>

export const projectsByCategory = projectCategories.map((category) => ({
  category,
  projects: projects.filter((project) => project.category === category)
}))
