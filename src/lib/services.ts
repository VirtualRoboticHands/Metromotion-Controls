export type ServiceDetail = {
  name: string
  slug: string
  shortDescription: string
  heroDescription: string
  sections: Array<{
    heading: string
    body: string
  }>
  capabilities: string[]
}

export const services: ServiceDetail[] = [
  {
    name: 'Industrial Automation & Control Systems',
    slug: 'industrial-automation',
    shortDescription: 'Process-led automation projects from P&ID development through to commissioning.',
    heroDescription: 'Process-focused control system engineering from first concept to stable production.',
    sections: [
      {
        heading: 'Process understanding first',
        body: 'We start with your process, not just your control hardware. Our engineers work from P&IDs, functional descriptions and operating constraints to define practical control philosophies that operators can run and maintain.'
      },
      {
        heading: 'Vendor-agnostic implementation',
        body: 'We deliver on Rockwell, Siemens, Omron and Schneider platforms without locking you into a single ecosystem. That keeps your future upgrade path open and aligns with the standards already used on your site.'
      },
      {
        heading: 'Turnkey or scoped delivery',
        body: 'Metromotion Controls can manage full project delivery or integrate into your internal engineering team for partial scopes. We handle design, programming, testing and commissioning with clear technical documentation at each stage.'
      }
    ],
    capabilities: [
      'Functional descriptions and control philosophies',
      'P&ID interpretation and process mapping',
      'Turnkey project delivery or partial engineering scopes',
      'Cross-vendor control system design',
      'Commissioning planning and site support'
    ]
  },
  {
    name: 'PLC, SCADA & HMI Programming',
    slug: 'plc-scada-hmi',
    shortDescription: 'Standards-driven PLC, SCADA and HMI development for reliable operations.',
    heroDescription: 'Robust PLC, SCADA and HMI software engineered for uptime, clarity and maintainability.',
    sections: [
      {
        heading: 'Structured software architecture',
        body: 'We develop PLC and SCADA applications using ISA88 batch principles and practical modular design. Standards are built into naming, alarms, interlocks and sequence handling so your team gets consistent outcomes across projects.'
      },
      {
        heading: 'Operator-centred HMI design',
        body: 'Our HMI design approach follows ISA101 principles for situational awareness, alarm visibility and fast troubleshooting. Screens are built for real operators working under production pressure, not for demonstrations.'
      },
      {
        heading: 'Migration and legacy upgrades',
        body: 'We migrate legacy platforms and languages including STL, Ladder and FBD, with simulation and FAT completed before site cutover. This reduces commissioning risk and shortens production interruptions during upgrades.'
      }
    ],
    capabilities: [
      'ISA88 batch control implementation',
      'ISA101-aligned HMI standards and templates',
      'PLC and HMI coding standards development',
      'Simulation and FAT prior to commissioning',
      'Platform migrations across Rockwell, Siemens, Omron, Schneider, Ignition and Wonderware'
    ]
  },
  {
    name: 'Control Panel Engineering & Electrical Design',
    slug: 'control-panel-engineering',
    shortDescription: 'Compliant control panel design and documentation for industrial installations.',
    heroDescription: 'Control panel and electrical design built for compliance, safety and long-term maintainability.',
    sections: [
      {
        heading: 'Australian standards compliance',
        body: 'We design and build control panels to Australian standards with clear component selection, segregation and protection strategies. Every panel is engineered for reliability in real industrial environments.'
      },
      {
        heading: 'Complete engineering documentation',
        body: 'Our team produces electrical schematics, panel layouts, cable schedules and I/O documentation that installers and maintenance teams can actually use. Documentation quality is treated as a critical deliverable, not an afterthought.'
      },
      {
        heading: 'Build-ready designs',
        body: 'Design outputs are prepared to move directly into panel manufacturing, site installation and commissioning. We coordinate with integrators, builders and site electricians to avoid rework and delays.'
      }
    ],
    capabilities: [
      'Control panel design and manufacture specifications',
      'Electrical schematic and layout packages',
      'Cable schedules and terminal plans',
      'As-built documentation and revision control',
      'Site installation and commissioning support'
    ]
  },
  {
    name: 'Industrial Systems Integration',
    slug: 'systems-integration',
    shortDescription: 'Reliable integration across machines, PLC networks and enterprise systems.',
    heroDescription: 'Integration engineering that connects plant floor assets with business-critical systems.',
    sections: [
      {
        heading: 'Machine and line-level integration',
        body: 'We connect OEM machines, conveyors, utility systems and PLCs into coherent production lines. Interface design, handshaking logic and fault handling are engineered to keep throughput stable.'
      },
      {
        heading: 'OT/IT connectivity',
        body: 'Our engineers bridge OT and IT domains with practical network and data architecture. We design secure pathways for operational data to move from control systems into reporting, planning and enterprise tools.'
      },
      {
        heading: 'ERP and enterprise integration',
        body: 'Metromotion Controls integrates production systems with ERP workflows for order execution, material tracking and reporting. Our vendor-agnostic approach avoids unnecessary dependencies and supports staged expansion.'
      }
    ],
    capabilities: [
      'Machine-to-machine interface engineering',
      'PLC and network integration across mixed vendors',
      'OT/IT architecture design and implementation',
      'ERP connectivity and transaction mapping',
      'Vendor-agnostic standards for scalable expansion'
    ]
  },
  {
    name: 'Industrial Data, IIoT & Analytics',
    slug: 'industrial-data-iiot',
    shortDescription: 'Operational data platforms for OEE, MES and production performance reporting.',
    heroDescription: 'Industrial data systems that convert plant signals into actionable operating decisions.',
    sections: [
      {
        heading: 'Data capture and architecture',
        body: 'We capture data from PLCs, SCADA and machines using MQTT and established IoT standards. Architectures are designed for reliable local storage and cloud pathways without compromising production control.'
      },
      {
        heading: 'Operational reporting and MES outcomes',
        body: 'Our solutions deliver OEE reporting, downtime analysis, batch traceability and material usage visibility. We implement MES-aligned workflows that support production teams, quality teams and management reporting.'
      },
      {
        heading: 'Digital transformation roadmapping',
        body: 'We define practical digital roadmaps with staged implementation priorities, clear ROI targets and integration milestones. This keeps transformation programs grounded in operational value rather than technology trends.'
      }
    ],
    capabilities: [
      'MQTT and industrial IoT data capture',
      'Local historian and cloud data pipelines',
      'OEE dashboards and downtime analytics',
      'MES solution scoping and deployment',
      'Production, batch, material and ERP-integrated reporting'
    ]
  },
  {
    name: 'OT Networks, Edge & Remote Access',
    slug: 'ot-networks',
    shortDescription: 'Secure and scalable OT infrastructure for connected industrial operations.',
    heroDescription: 'OT network and edge architecture built for uptime, security and remote support.',
    sections: [
      {
        heading: 'Assessment and architecture',
        body: 'We assess existing OT networks and design scalable architectures for plant growth and resilience. Segmentation, addressing and network services are planned to support both operations and maintenance.'
      },
      {
        heading: 'Remote access and edge systems',
        body: 'Our team deploys secure remote access, industrial switches, routers and edge services for diagnostics and support. Connectivity solutions are designed around your cybersecurity requirements and operational risk profile.'
      },
      {
        heading: 'Server lifecycle and recovery',
        body: 'We handle server installation, migration and disaster recovery for historians and SCADA environments. Backup strategies and patch management are implemented with minimal impact on production.'
      }
    ],
    capabilities: [
      'OT network assessments and redesign',
      'Scalable architecture for multi-line sites',
      'Secure remote access implementation',
      'Industrial switching, routing and edge compute',
      'Disaster recovery, backup and patch management for control servers'
    ]
  },
  {
    name: 'Functional Safety & Safety Systems',
    slug: 'functional-safety',
    shortDescription: 'Safety lifecycle engineering for compliant and dependable risk reduction.',
    heroDescription: 'Functional safety engineering that aligns process risk reduction with compliance obligations.',
    sections: [
      {
        heading: 'Safety assessment and strategy',
        body: 'We perform SIL assessments and define practical safety requirements for machinery and process applications. Risk reduction strategies are selected to meet both operational and regulatory expectations.'
      },
      {
        heading: 'Safety PLC and shutdown implementation',
        body: 'Our engineers design and implement safety PLC architectures and emergency shutdown systems with clear cause-and-effect definition. Safety logic is tested and validated through documented verification activities.'
      },
      {
        heading: 'Standards-based lifecycle delivery',
        body: 'Projects are executed in alignment with IEC 61511 and IEC 62061 lifecycle requirements. We provide traceable documentation from design assumptions through testing and handover.'
      }
    ],
    capabilities: [
      'SIL assessment and risk reduction planning',
      'Safety PLC architecture and programming',
      'Emergency shutdown system design',
      'Verification and validation test planning',
      'Compliance delivery to IEC 61511 and IEC 62061'
    ]
  },
  {
    name: 'Automation Upgrades, Retrofits & Support',
    slug: 'automation-upgrades',
    shortDescription: 'Modernisation and ongoing support for legacy automation environments.',
    heroDescription: 'Upgrade and support programs that modernise controls while protecting production uptime.',
    sections: [
      {
        heading: 'Legacy modernisation without full shutdowns',
        body: 'We plan and execute staged control upgrades that minimise disruption to production. Cutovers are engineered around outages, temporary interfaces and rollback strategies to protect operational continuity.'
      },
      {
        heading: 'Platform migrations and retrofit delivery',
        body: 'Our team migrates obsolete PLC, SCADA and HMI platforms to current architectures with clear testing gates. Retrofits include documentation updates and training so site teams can operate confidently after handover.'
      }
    ],
    capabilities: [
      'Phased upgrade strategies for live sites',
      'Legacy platform migration planning and execution',
      'Fault finding and root-cause troubleshooting',
      'Preventative maintenance programs',
      'Long-term support contracts with defined response models'
    ]
  },
  {
    name: 'Commissioning, FAT & SAT',
    slug: 'commissioning',
    shortDescription: 'Structured testing and commissioning for dependable project handover.',
    heroDescription: 'Commissioning programs that verify performance before and during site startup.',
    sections: [
      {
        heading: 'Factory and site acceptance testing',
        body: 'We plan and execute FAT and SAT procedures with clear test evidence, issue tracking and closure criteria. This gives stakeholders confidence before systems move into production service.'
      },
      {
        heading: 'Simulation before go-live',
        body: 'Control logic and sequence behaviour are validated through simulation before site energisation where feasible. Early validation reduces rework, shortens startup and improves commissioning safety.'
      },
      {
        heading: 'Commissioning management',
        body: 'Our engineers coordinate commissioning activities for both greenfield projects and upgrades. We manage punch lists, defects, stakeholder communication and handover documentation through to stable operation.'
      }
    ],
    capabilities: [
      'FAT and SAT procedure development',
      'Integrated simulation and test environments',
      'Site commissioning execution and supervision',
      'Defect tracking and closeout management',
      'Final handover documentation and support'
    ]
  }
]

export const servicesBySlug = Object.fromEntries(services.map((service) => [service.slug, service])) as Record<string, ServiceDetail>
