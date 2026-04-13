import type { ServiceFaq } from '@/lib/schema'

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
  faqs: ServiceFaq[]
}

export const services: ServiceDetail[] = [
  {
    name: 'Industrial Automation & Control Systems',
    slug: 'industrial-automation',
    shortDescription: 'Process-led automation projects from P&ID development through to commissioning.',
    heroDescription: 'Process-focused control system engineering from first concept to stable production, with clear standards and practical handover.',
    sections: [
      {
        heading: 'Process understanding first',
        body: 'We begin by reviewing your process intent in detail, including P&IDs, cause and effect matrices, piping line lists, utility constraints and product quality requirements. Our engineers run design workshops with operations, maintenance and quality teams so the control philosophy reflects how the plant actually runs during day shift, night shift and changeovers. Typical protocols in this stage include Modbus TCP, EtherNet/IP and Profinet because they influence I/O architecture, diagnostics and spares strategy. We document sequencing using ISA-88 state models and alarm strategy using ISA-18.2 guidance, then convert those requirements into functional descriptions and software design specifications. This approach is valuable when a site has frequent recipe variation, repeated nuisance alarms or unstable startup performance because it gives everyone an agreed baseline before coding starts.'
      },
      {
        heading: 'Vendor-agnostic implementation',
        body: 'Metromotion Controls delivers systems across Rockwell ControlLogix 5580, Siemens S7-1500, Omron NX/NJ and Schneider Modicon M580 platforms. We also design around mixed estates where one area uses Allen-Bradley drives and another uses Siemens ET 200SP remote I/O. Network design aligns with IEC 62443 zone and conduit thinking so production assets are segmented sensibly and can be supported securely. We create reusable templates for alarms, permissives, faceplates and diagnostics, then tailor them to your site standard rather than forcing a generic library. This is especially useful for brownfield expansions where a new filler line must integrate with an existing packaging hall without rewriting every upstream PLC. By staying platform neutral, you can optimise lifecycle cost, supportability and procurement flexibility while still maintaining a consistent operating experience across the plant.'
      },
      {
        heading: 'Turnkey or scoped delivery',
        body: 'Some clients engage us for full EPCM-style controls delivery, while others use us for specialist packages such as PLC software, FAT support or commissioning leadership. Our delivery workflow includes design reviews, code peer reviews, simulation testing, FAT witness records, SAT check sheets and as-built documentation under revision control. We typically use tools such as FactoryTalk Design Studio, TIA Portal V18, EPLAN and versioned code repositories so changes remain traceable. A practical example is a staged pasteuriser upgrade where shutdown windows were limited to 36 hours; we prepared temporary bypass logic, rollback steps and pre-validated cutover plans to keep risk low. Throughout the project we provide clear communication on scope, assumptions and technical constraints, which helps project managers maintain schedule certainty and helps maintenance teams take ownership after handover.'
      }
    ],
    capabilities: [
      'Functional descriptions and control philosophies aligned with ISA-88 and ISA-18.2',
      'P&ID interpretation, process mapping and cause and effect definition',
      'Turnkey project delivery or partial engineering scopes',
      'Cross-vendor control system design with IEC 62443 network principles',
      'Commissioning planning, training and site support'
    ],
    faqs: [
      {
        question: 'When should we start controls engineering in a new project?',
        answer: 'Start during front-end design, ideally when P&IDs and equipment datasheets are first drafted. Early controls involvement reduces redesign, allows correct I/O and network allowances, and improves FAT quality before site installation begins.'
      },
      {
        question: 'Can you work with our existing standards and preferred vendors?',
        answer: 'Yes. We specialise in adapting to site standards and mixed vendor environments. We can extend your current libraries, naming rules and alarm philosophy while still introducing improvements that simplify maintenance and future upgrades.'
      },
      {
        question: 'How do you reduce commissioning risk on live plants?',
        answer: 'We use staged cutover plans, simulation, FAT defect closure, rollback procedures and detailed SAT checklists. This preparation limits downtime and gives operators and electricians clear steps during high-pressure startup windows.'
      }
    ]
  },
  {
    name: 'PLC, SCADA & HMI Programming',
    slug: 'plc-scada-hmi',
    shortDescription: 'Standards-driven PLC, SCADA and HMI development for reliable operations.',
    heroDescription: 'Robust PLC, SCADA and HMI software engineered for uptime, clarity and maintainability across the full asset lifecycle.',
    sections: [
      {
        heading: 'Structured software architecture',
        body: 'Our programming method focuses on modular, testable code that operators and engineers can support years after commissioning. We apply ISA-88 where sequencing or recipe logic is required, and we structure reusable function blocks for motor control, valve manifolds, analogue loops and safety interfaces. Typical hardware includes ControlLogix 5380 and CompactLogix 5480, Siemens S7-1500 and distributed I/O such as Point I/O and ET 200SP. We define naming conventions, alarm classes and permissive logic early so that every machine cell behaves consistently. This matters when a site is scaling from one line to multiple lines because poor code structure quickly multiplies troubleshooting effort. We also implement diagnostics tags and historian-ready data models so SCADA and reporting layers can consume reliable signals without extensive rework later.'
      },
      {
        heading: 'Operator-centred HMI design',
        body: 'HMI and SCADA design follows ISA-101 principles and practical operator feedback from site workshops. We prioritise high-contrast graphics, clear process context, consistent navigation and alarm handling that supports fast decision making. Platforms include FactoryTalk View SE, Ignition Perspective, WinCC Unified and AVEVA System Platform. We avoid decorative clutter and instead present process limits, interlock status and step progress in a way that helps shift teams diagnose faults quickly. For instance, on a packaging line with recurring starve and block events, we can visualise accumulation trends and handshake states between machines so bottlenecks are identified in minutes rather than hours. We also build role-based access, audit trails and change logs to support GMP and internal governance requirements. The result is an interface that improves response times, training outcomes and operator confidence.'
      },
      {
        heading: 'Migration and legacy upgrades',
        body: 'Legacy migration projects require disciplined planning because production continuity is usually the highest priority. We migrate legacy PLC-5, SLC 500, S7-300 and older SCADA nodes to modern architectures using staged conversion and test environments. Source code in Ladder, STL, FBD and structured text is reviewed for hidden assumptions, then rewritten with modern diagnostics and maintainable structure. Protocol bridging via OPC UA, serial gateways or protocol converters is often required during transition. A common scenario is replacing a legacy batching controller while retaining existing field instruments and motor control centres during a budget-constrained year. We prepare FAT scripts, I/O simulation, cutover run sheets and fallback plans so change windows remain controlled. After startup, we provide documentation, training and optimisation support so site teams can operate effectively without relying on tribal knowledge.'
      }
    ],
    capabilities: [
      'ISA-88 batch control implementation and reusable module libraries',
      'ISA-101-aligned HMI standards and templates',
      'PLC and HMI coding standards development',
      'Simulation and FAT prior to commissioning',
      'Platform migrations across Rockwell, Siemens, Omron, Schneider, Ignition and Wonderware'
    ],
    faqs: [
      {
        question: 'What is the benefit of standardised PLC code libraries?',
        answer: 'Standard libraries reduce defects, speed up new projects and make troubleshooting predictable. They also simplify training because electricians and engineers see the same control patterns across different machines and lines.'
      },
      {
        question: 'Do you support remote SCADA development and testing?',
        answer: 'Yes. We can develop remotely using secured VPN and staging servers, then complete FAT and SAT with your team. This model is useful for interstate sites and allows earlier progress before site access is available.'
      },
      {
        question: 'Can you improve an HMI without replacing the whole system?',
        answer: 'In many cases yes. We can redesign key screens, rationalise alarms, improve navigation and add better diagnostics while retaining your existing SCADA platform, provided the underlying infrastructure remains supported.'
      }
    ]
  },
  {
    name: 'Control Panel Engineering & Electrical Design',
    slug: 'control-panel-engineering',
    shortDescription: 'Compliant control panel design and documentation for industrial installations.',
    heroDescription: 'Control panel and electrical design built for compliance, safety and long-term maintainability in Australian industrial environments.',
    sections: [
      {
        heading: 'Australian standards compliance',
        body: 'Our panel engineering process is based on AS/NZS 61439 for low-voltage switchgear assemblies, AS/NZS 3000 wiring rules and relevant machine safety obligations under AS 4024. We select components with realistic availability, spare parts coverage and environmental ratings suited to washdown, dust or high-temperature areas. Typical component families include Allen-Bradley Compact GuardLogix, Siemens S7-1500F, Pilz safety relays, Phoenix Contact terminals and managed industrial switches. We also define segregation, earthing, short-circuit withstand and thermal management requirements early to avoid late-stage panel redesign. This service is especially valuable when a facility is adding new process skids and needs documentation and compliance evidence that can pass internal engineering review and external inspection. Our goal is a panel package that is safe, buildable and supportable for the long term.'
      },
      {
        heading: 'Complete engineering documentation',
        body: 'High-quality documentation is essential for installation speed, fault finding and future upgrades. We produce schematic sets, single-line diagrams, terminal plans, cable schedules, network layouts and I/O lists using revision-controlled templates. Drawings are prepared with clear cross-referencing and consistent device tags so electricians and commissioning staff can work confidently under time pressure. We include functional descriptions, sequence narratives and alarm/interlock matrices to connect electrical design with control behaviour. In regulated industries we can align documentation packs with GMP expectations, including controlled revisions and handover registers. A practical example is a utility plant upgrade where multiple contractors shared scope; clear drawings and tagging prevented duplicate terminations and reduced rework during SAT. By treating documentation as a core deliverable, we help clients reduce lifecycle cost and improve maintainability.'
      },
      {
        heading: 'Build-ready designs',
        body: 'Metromotion Controls prepares design outputs that move directly into manufacture, factory testing and installation. We coordinate with panel builders on enclosure layout, wire duct capacity, heat dissipation, gland plate arrangement and test points so workshop assembly proceeds efficiently. Where required, we define FAT procedures for point-to-point testing, power-up checks, network validation and simulated I/O proving before dispatch. During installation, we support cable routing, termination checks, loop testing and redline management to keep drawings current. This level of detail is important on projects with tight outages, such as replacing a main process panel over a single weekend. Our engineers remain involved through commissioning and as-built completion, ensuring the final package reflects site reality and can be trusted by maintenance teams for years.'
      }
    ],
    capabilities: [
      'Control panel design and manufacture specifications',
      'Electrical schematic and layout packages',
      'Cable schedules, terminal plans and network diagrams',
      'As-built documentation and revision control',
      'Site installation and commissioning support'
    ],
    faqs: [
      {
        question: 'Do you only provide design, or can you support manufacturing as well?',
        answer: 'We can provide design-only packages or stay engaged through build, FAT and installation. Many clients use us to bridge design intent with workshop execution so defects are identified before site delivery.'
      },
      {
        question: 'Which standards are most relevant for control panel projects in Australia?',
        answer: 'AS/NZS 61439 and AS/NZS 3000 are commonly central, with AS 4024 applied for machinery safety contexts. The exact set depends on equipment type, site policy and regulatory obligations.'
      },
      {
        question: 'Can you update old drawings into modern, maintainable formats?',
        answer: 'Yes. We often convert legacy drawing sets into structured digital packages with consistent tags, cross-references and revision history so maintenance teams can troubleshoot and modify systems with confidence.'
      }
    ]
  },
  {
    name: 'Industrial Systems Integration',
    slug: 'systems-integration',
    shortDescription: 'Reliable integration across machines, PLC networks and enterprise systems.',
    heroDescription: 'Integration engineering that connects plant floor assets with business-critical systems while preserving operational reliability.',
    sections: [
      {
        heading: 'Machine and line-level integration',
        body: 'Line integration is about much more than connecting a few tags. We define handshake logic, machine states, fault escalation paths and recovery sequences so connected assets operate as one coherent system. Common integrations include filler to capper, depalletiser to conveyor, or batching skids to utility systems with coordinated permissives. We use standards-based interface definitions, including PackML where appropriate, and validate timing behaviour under realistic throughput conditions. PLC platforms often span Rockwell and Siemens estates, so we design data contracts that remain stable across vendor boundaries. This service is valuable when new OEM equipment must be added to an existing line with minimal disruption. By formalising interfaces and acceptance criteria early, we reduce integration surprises during SAT and help sites achieve stable output sooner after startup.'
      },
      {
        heading: 'OT/IT connectivity',
        body: 'Our engineers design OT/IT data pathways that support reporting and planning without compromising process safety or cyber hygiene. Architectures typically include segmented VLANs, firewalls, DMZ services, OPC UA brokers and message transport through MQTT where suitable. We map data ownership, update rates and quality flags so business systems consume trustworthy context rather than raw, ambiguous tag streams. Design decisions align with IEC 62443 principles and site cybersecurity policies. A frequent use case is delivering production, downtime and quality events from SCADA into analytics platforms for daily performance review. We also consider maintainability, including certificate management, backup strategy and monitoring so integrations remain supportable after go-live. Metromotion Controls works closely with both OT and IT stakeholders to ensure practical outcomes and clear responsibilities.'
      },
      {
        heading: 'ERP and enterprise integration',
        body: 'ERP integration often fails when transaction logic is unclear, so we focus on explicit event models and exception handling from the beginning. We define how work orders, material lots, batch IDs and production confirmations move between plant systems and enterprise platforms such as SAP or Microsoft Dynamics. Integration can be direct through APIs, via middleware, or through MES layers depending on site maturity. We test nominal and abnormal scenarios, including communication loss, duplicate transactions and partial completion states. This approach is particularly useful for traceability-heavy sectors where recall readiness and genealogy reporting are critical. Our team documents mappings, error handling and support procedures so operations and IT teams can manage the integration confidently. The outcome is reliable data flow that improves planning accuracy and reduces manual reconciliation effort.'
      }
    ],
    capabilities: [
      'Machine-to-machine interface engineering and handshake standards',
      'PLC and network integration across mixed vendors',
      'OT/IT architecture design and implementation',
      'ERP connectivity and transaction mapping',
      'Vendor-agnostic standards for scalable expansion'
    ],
    faqs: [
      {
        question: 'Can you integrate new OEM equipment with older lines?',
        answer: 'Yes. We frequently integrate new machines into legacy environments by defining clear interface contracts, translating protocols where needed, and validating recovery behaviour before full production ramp-up.'
      },
      {
        question: 'Which protocol is best for OT to IT data sharing?',
        answer: 'There is no single best option. OPC UA, MQTT and API-based approaches each suit different requirements. We select based on latency, security, maintainability and existing site architecture.'
      },
      {
        question: 'How do you manage integration issues after go-live?',
        answer: 'We provide monitored support with diagnostics, log review and structured incident response. Clear ownership matrices and documented fallback paths help resolve issues quickly without extended production impact.'
      }
    ]
  },
  {
    name: 'Industrial Data, IIoT & Analytics',
    slug: 'industrial-data-iiot',
    shortDescription: 'Operational data platforms for OEE, MES and production performance reporting.',
    heroDescription: 'Industrial data systems that convert plant signals into actionable operating decisions with reliable context and governance.',
    sections: [
      {
        heading: 'Data capture and architecture',
        body: 'Effective analytics starts with disciplined data architecture. We identify critical data points from PLCs, SCADA and instruments, then model them with naming standards, units, quality states and event context. Typical collection paths include OPC UA collectors, MQTT brokers and historian connectors into SQL or cloud storage layers. We deploy edge buffering where network reliability is variable, which helps prevent data loss during outages. Equipment examples include industrial PCs, virtualised historian servers and secure gateway appliances. This service is particularly useful for sites that have many tags but little trust in reports because data consistency has never been formalised. By establishing clear source-of-truth models and validation checks, we give teams a dependable foundation for dashboards, alerts and optimisation initiatives.'
      },
      {
        heading: 'Operational reporting and MES outcomes',
        body: 'We design reporting layers that answer operational questions, not just display charts. Common outputs include OEE by line and shift, downtime Pareto, changeover performance, utility intensity and batch genealogy. Where MES functions are required, we implement workflows for electronic work instructions, lot tracking, quality holds and production declarations. Standards such as ISA-95 help structure data between control, operations and business domains. A practical example is a food plant that needed traceability from raw ingredient intake to pallet dispatch across multiple lines. We integrated production events, quality checks and material movements into one reporting model so investigations and daily reviews became faster and more reliable. Our focus remains on actionable insights that support supervisors, engineers and leadership with consistent metrics.'
      },
      {
        heading: 'Digital transformation roadmapping',
        body: 'Digital programs succeed when delivery is staged and linked to measurable value. We help clients prioritise initiatives by business impact, implementation effort, data readiness and change management capacity. Roadmaps often begin with foundational tasks such as historian cleanup and alarm rationalisation, then progress to predictive analytics or closed-loop optimisation once data confidence is established. We define governance for ownership, data quality monitoring and cybersecurity obligations so systems remain supportable. Metromotion Controls also supports proof-of-value pilots with clear acceptance criteria, then scales successful patterns across additional lines or sites. This method is useful for organisations that want progress without committing to a risky, all-at-once platform replacement. The result is a practical transformation plan that can be executed with confidence.'
      }
    ],
    capabilities: [
      'MQTT and industrial IoT data capture',
      'Local historian and cloud data pipelines',
      'OEE dashboards and downtime analytics',
      'MES solution scoping and deployment',
      'Production, batch, material and ERP-integrated reporting'
    ],
    faqs: [
      {
        question: 'How much historical data do we need before analytics is useful?',
        answer: 'Even a few weeks of clean, contextual data can provide value for downtime and quality analysis. Longer history improves seasonality and trend analysis, but early wins usually come from better event quality and tagging discipline.'
      },
      {
        question: 'Can you connect cloud dashboards without exposing control systems?',
        answer: 'Yes. We design segmented architectures with edge buffering, controlled outbound data paths and strong authentication. This allows reporting access while keeping critical control assets isolated from unnecessary inbound exposure.'
      },
      {
        question: 'Do you provide training for supervisors and engineers?',
        answer: 'Yes. We run practical training on dashboard interpretation, data quality ownership and root-cause workflows so teams can turn insights into sustained operational improvements.'
      }
    ]
  },
  {
    name: 'OT Networks, Edge & Remote Access',
    slug: 'ot-networks',
    shortDescription: 'Secure and scalable OT infrastructure for connected industrial operations.',
    heroDescription: 'OT network and edge architecture built for uptime, security and remote support across evolving plant environments.',
    sections: [
      {
        heading: 'Assessment and architecture',
        body: 'We assess current OT network topology, device health, addressing practices and segmentation boundaries before recommending upgrades. Reviews include switch utilisation, link resilience, spanning tree behaviour, time synchronisation and critical service dependencies. We map assets into practical zones aligned to IEC 62443 concepts, then define conduits and firewall policies that support production and maintenance needs. Typical technologies include managed industrial switches, redundant ring protocols and VLAN segmentation with documented recovery procedures. This work is essential when sites experience intermittent communication faults, unexplained controller dropouts or poor visibility of network ownership. By establishing a clear baseline and future-state architecture, we help clients improve reliability while preparing for expansion, remote diagnostics and stronger cyber posture.'
      },
      {
        heading: 'Remote access and edge systems',
        body: 'Secure remote access is designed around least privilege, strong authentication and auditable session control. We implement vendor and internal access pathways with role-based permissions, multi-factor authentication and defined approval workflows. Edge infrastructure can include protocol gateways, local historians, patch repositories and remote engineering jump hosts. We also define operational rules for who can connect, when access is permitted and how emergency support is handled. A common use case is supporting interstate sites that need rapid PLC diagnostics without waiting for travel. Properly implemented remote access shortens downtime while maintaining governance and cybersecurity expectations. Metromotion Controls integrates these capabilities with your IT security team to ensure controls are practical, enforceable and aligned with broader business policy.'
      },
      {
        heading: 'Server lifecycle and recovery',
        body: 'Control servers and virtual infrastructure require planned lifecycle management to avoid unplanned outages and unsupported systems. We design backup schedules, snapshot policies, patch windows and recovery tests for SCADA, historian and engineering servers. Where possible, we implement redundancy and documented failover sequences so operations can recover quickly from hardware faults or software corruption. Standards and guidance from IEC 62443 and NIST frameworks inform hardening and maintenance strategy. This service is valuable for sites running legacy operating systems or ad hoc backups that have never been tested under pressure. We provide clear runbooks, restoration drills and ownership matrices so teams can respond confidently during incidents. The outcome is a resilient OT platform that supports both day-to-day reliability and long-term modernisation.'
      }
    ],
    capabilities: [
      'OT network assessments and redesign',
      'Scalable architecture for multi-line sites',
      'Secure remote access implementation',
      'Industrial switching, routing and edge compute',
      'Disaster recovery, backup and patch management for control servers'
    ],
    faqs: [
      {
        question: 'How often should an OT network assessment be performed?',
        answer: 'A full assessment is usually recommended every one to two years, or sooner after major plant changes. Regular reviews help detect hidden single points of failure and keep documentation current.'
      },
      {
        question: 'Can remote access be secure enough for critical production sites?',
        answer: 'Yes, when designed with multi-factor authentication, session auditing, segmented access paths and strict approval workflows. Security depends on architecture and governance, not on one product alone.'
      },
      {
        question: 'Do you support server migration from physical to virtual platforms?',
        answer: 'Yes. We plan staged migrations, test recovery paths and validate application performance so sites can modernise infrastructure with minimal production disruption.'
      }
    ]
  },
  {
    name: 'Functional Safety & Safety Systems',
    slug: 'functional-safety',
    shortDescription: 'Safety lifecycle engineering for compliant and dependable risk reduction.',
    heroDescription: 'Functional safety engineering that aligns process risk reduction with compliance obligations and practical operating realities.',
    sections: [
      {
        heading: 'Safety assessment and strategy',
        body: 'Functional safety starts with clear hazard identification and realistic risk assessment. We support HAZOP, LOPA and SIL determination activities, then convert risk targets into specific safety requirements. Standards including IEC 61511, IEC 62061 and ISO 13849 are applied based on process and machinery context. We define safety instrumented functions, response times, proof test intervals and bypass management rules with operations and maintenance input. This stage is particularly important when facilities are expanding hazardous process areas or introducing new high-energy machinery. By documenting assumptions and risk acceptance criteria clearly, we reduce ambiguity and improve compliance confidence during audits. Metromotion Controls focuses on solutions that are both defensible and workable in day-to-day operations.'
      },
      {
        heading: 'Safety PLC and shutdown implementation',
        body: 'Our engineers design and implement safety architectures using platforms such as GuardLogix, S7-1500F and compatible safety I/O and instrumentation. We develop cause and effect matrices, shutdown logic, permissives and reset philosophies that align with site procedures and training capabilities. Testing includes factory verification, loop checks, trip testing and documented evidence of requirement coverage. Where mechanical and electrical scopes intersect, we coordinate closely with OEMs and site teams to confirm final installed behaviour. A practical example is an emergency shutdown redesign for a utility area where nuisance trips had been causing significant downtime. By improving sensing strategy, voting logic and diagnostics, safety integrity was maintained while availability improved. We deliver safety systems that support both protection goals and operational stability.'
      },
      {
        heading: 'Standards-based lifecycle delivery',
        body: 'Safety is not complete at startup, so we support lifecycle activities including management of change, periodic proof testing and performance monitoring. We provide traceable documentation from requirement specification through design, verification, validation and handover. This includes test records, deviation logs, training notes and maintenance guidance for ongoing compliance. Our team can also assist with gap assessments on existing systems where documentation or testing history is incomplete. This is common on older plants that have evolved over time without a full lifecycle framework. By establishing structured safety governance, clients can optimise reliability, reduce audit stress and maintain confidence that risk controls remain effective. The result is a practical safety program that remains robust beyond project completion.'
      }
    ],
    capabilities: [
      'SIL assessment and risk reduction planning',
      'Safety PLC architecture and programming',
      'Emergency shutdown system design',
      'Verification and validation test planning',
      'Compliance delivery to IEC 61511 and IEC 62061'
    ],
    faqs: [
      {
        question: 'What is the difference between IEC 61511 and ISO 13849?',
        answer: 'IEC 61511 is focused on process industry safety instrumented systems, while ISO 13849 is commonly applied to machinery safety control systems. The correct standard depends on the application context and risk profile.'
      },
      {
        question: 'Can you review existing safety systems without replacing everything?',
        answer: 'Yes. We can perform lifecycle gap assessments, identify high-priority remediation actions and support staged improvements so compliance and risk reduction can be improved without unnecessary full replacement.'
      },
      {
        question: 'How do proof tests fit into day-to-day operations?',
        answer: 'Proof tests verify that safety functions still perform as designed. We help define realistic intervals, procedures and records so tests can be completed efficiently during planned maintenance windows.'
      }
    ]
  },
  {
    name: 'Automation Upgrades, Retrofits & Support',
    slug: 'automation-upgrades',
    shortDescription: 'Modernisation and ongoing support for legacy automation environments.',
    heroDescription: 'Upgrade and support programs that modernise controls while protecting production uptime and operational confidence.',
    sections: [
      {
        heading: 'Legacy modernisation without full shutdowns',
        body: 'Legacy modernisation requires careful planning because most sites cannot stop production for long periods. We start with asset criticality analysis, obsolescence risk review and dependency mapping across PLCs, drives, HMI nodes and network infrastructure. From there we build phased upgrade plans that align with planned outages, inventory availability and operational constraints. Typical upgrades include PLC-5 to ControlLogix, S7-300 to S7-1500, and outdated SCADA servers to current supported platforms. We use temporary gateways or parallel running strategies where needed to reduce cutover risk. Detailed run sheets define pre-checks, decision gates, rollback triggers and communication responsibilities. This method is especially useful for 24/7 manufacturing lines where each hour of downtime has significant cost impact. By executing in controlled stages, clients can modernise safely without waiting for a complete plant shutdown event.'
      },
      {
        heading: 'Platform migrations and retrofit delivery',
        body: 'Retrofit projects blend engineering, site coordination and practical support after go-live. We deliver migration design, code conversion, simulation, FAT, SAT and onsite commissioning assistance, then remain available for optimisation once operators are using the new system. Documentation is updated in parallel, including electrical drawings, software backups, alarm lists, network maps and operator guides. Where training is required, we run sessions for electricians, supervisors and maintenance planners so the new platform is understood across shifts. A common scenario is replacing an obsolete SCADA layer while retaining field devices and MCC infrastructure to meet budget limits. We sequence this work to preserve production visibility and avoid data gaps. Metromotion Controls also offers ongoing support contracts, preventative maintenance visits and remote troubleshooting to keep upgraded systems stable over time.'
      }
    ],
    capabilities: [
      'Phased upgrade strategies for live sites',
      'Legacy platform migration planning and execution',
      'Fault finding and root-cause troubleshooting',
      'Preventative maintenance programs',
      'Long-term support contracts with defined response models'
    ],
    faqs: [
      {
        question: 'How do you prioritise what to upgrade first?',
        answer: 'We prioritise based on safety exposure, production impact, supportability and spare part risk. This allows budgets to target the highest operational risk first while still building toward a complete modernisation roadmap.'
      },
      {
        question: 'Can we keep production running during a retrofit?',
        answer: 'Often yes. We use staged cutovers, temporary interfaces and pre-tested migration packages to minimise downtime. The exact strategy depends on process constraints and shutdown windows available at your site.'
      },
      {
        question: 'Do you provide support after migration is complete?',
        answer: 'Yes. We provide post-commissioning support, tuning, documentation updates and optional support contracts so your team has reliable assistance as the upgraded system beds in.'
      }
    ]
  },
  {
    name: 'Automation Support & Maintenance',
    slug: 'support',
    shortDescription: 'Flexible support contracts, breakdown response and planned maintenance for automation environments.',
    heroDescription: 'Expert onsite and remote automation support, available 24/7 and delivered by senior engineers with practical commissioning experience.',
    sections: [
      {
        heading: '24/7 automation support',
        body: 'Metromotion Controls provides flexible automation support models for manufacturers and process plants that cannot afford prolonged downtime. Our team supports emergency breakdown response, remote diagnostics and planned technical assistance for PLC, SCADA, HMI and OT infrastructure. We regularly work across Rockwell, Siemens, Omron, Schneider and Ignition environments, and we can integrate with your internal escalation workflow so operators and maintenance staff know exactly who to call and what information to provide. Support readiness includes secure remote access procedures, current backups, network visibility and defined response targets. This service is often used by sites that have limited in-house automation capacity on night shifts or weekends. By combining rapid fault response with strong diagnostic discipline, we help clients restore production quickly and reduce repeat failures over time.',
      },
      {
        heading: 'Ongoing site maintenance',
        body: 'Reliable automation performance depends on consistent maintenance, not only reactive callouts. We provide scheduled inspections, software health checks, alarm review and targeted optimisation to keep systems stable and maintainable. Preventative activities can include PLC backup verification, SCADA service status review, network diagnostics, historian health checks and documentation updates. Where improvement opportunities are identified, we implement practical changes such as interlock refinements, HMI usability updates and alarm rationalisation aligned with ISA-18.2 principles. A typical engagement involves monthly remote checks supported by quarterly site visits, with additional attendance during shutdown windows. This model helps operations teams detect risk early, improve resilience and avoid unplanned production impacts. We document findings and recommendations clearly so site leadership can prioritise investment based on real operational evidence.',
      },
      {
        heading: 'How we deliver support',
        body: 'Our support delivery model is designed to be practical for real industrial constraints. During onboarding we map critical assets, confirm escalation contacts, review remote access readiness and establish backup and restore expectations for controllers and servers. We then agree service routines such as monthly health checks, quarterly onsite reviews and clear response categories for urgent incidents. Each engagement includes documented findings, priority-ranked recommendations and progress tracking so improvements remain visible to both maintenance teams and leadership. When faults occur, we follow structured diagnostics that capture root cause, immediate fix and prevention actions, rather than only restoring operation and moving on. This creates a continuous improvement loop that strengthens reliability over time.',
      },
    ],
    capabilities: [
      'Breakdown site visit support in Melbourne and surrounding regions',
      'Breakdown remote assistance over phone and secure VPN for interstate sites',
      'PLC and HMI programming change requests for continuous improvement',
      'Temporary onsite engineering cover during peak workload or staff shortages',
      'Annual electrical and automation review with prioritised recommendations',
      'Support for maintaining drawings, functional descriptions and operator documentation',
    ],
    faqs: [
      {
        question: 'What response options are available for urgent breakdowns?',
        answer: 'We provide both onsite and remote response pathways. The best option depends on fault criticality, available site personnel and remote access readiness. We agree escalation paths and response targets during onboarding so there is no uncertainty during an incident.',
      },
      {
        question: 'Can support contracts include preventative maintenance and improvement work?',
        answer: 'Yes. Many clients combine reactive support with planned inspections, backup verification, code health checks and small optimisation tasks. This blended model helps reduce recurring faults while maintaining fast response for urgent issues.',
      },
      {
        question: 'Do you support sites outside Melbourne?',
        answer: 'Yes. We support interstate and regional sites through remote diagnostics, scheduled visits and coordinated local contractor support where needed. Our delivery model is designed to keep response practical across distributed operations.',
      },
    ],
  },
  {
    name: 'Commissioning, FAT & SAT',
    slug: 'commissioning',
    shortDescription: 'Structured testing and commissioning for dependable project handover.',
    heroDescription: 'Commissioning programs that verify performance before and during site startup, with clear evidence and controlled issue closure.',
    sections: [
      {
        heading: 'Factory and site acceptance testing',
        body: 'We develop FAT and SAT plans that define objective test steps, pass criteria, evidence capture and defect management processes. FAT usually covers I/O simulation, sequence verification, alarm checks, fail-safe behaviour and operator workflows before equipment leaves the workshop. SAT confirms installed performance, field wiring integrity, process interactions and operational readiness on site. We use structured punch lists with ownership and due dates so issues are visible and closed in a controlled way. This approach helps stakeholders make informed go-live decisions rather than relying on assumptions. It is particularly useful on multi-contractor projects where responsibilities can become unclear under schedule pressure. With disciplined testing documentation, clients gain confidence that system behaviour matches design intent and that unresolved risk is understood before production starts.'
      },
      {
        heading: 'Simulation before go-live',
        body: 'Simulation shortens commissioning by exposing control and integration issues before energisation. Depending on project scope, we use software simulation, emulation of machine states or hardware-in-the-loop setups to test sequences and exception handling. Protocols such as EtherNet/IP, Profinet and OPC UA can be validated in test environments to reduce onsite surprises. We focus on realistic scenarios, including communication dropouts, instrument faults, utility interruptions and restart behaviour after trips. A practical example is a batching system where simulation identified a deadlock in phase transitions that would have caused lost production during startup. Fixing this early avoided high-cost onsite debugging. Metromotion Controls integrates simulation findings into FAT records so corrective actions are traceable and stakeholders can see readiness progress clearly.'
      },
      {
        heading: 'Commissioning management',
        body: 'Successful commissioning needs technical leadership and disciplined coordination. Our engineers manage workfront planning, permit interfaces, shift handovers, daily issue review and stakeholder communication through to stable operation. We track key readiness metrics such as open defects, test completion, training status and spare part availability so decisions are based on current facts. For upgrades, we prepare cutover windows, rollback plans and post-start support rosters to protect uptime. For greenfield projects, we sequence subsystem energisation and integrated trials to reduce conflict between disciplines. Handover includes as-built records, backup sets, outstanding actions and support contacts. This service gives project teams a clear path from mechanical completion to reliable production, with fewer surprises and better accountability across all involved parties.'
      }
    ],
    capabilities: [
      'FAT and SAT procedure development',
      'Integrated simulation and test environments',
      'Site commissioning execution and supervision',
      'Defect tracking and closeout management',
      'Final handover documentation and support'
    ],
    faqs: [
      {
        question: 'Who should attend FAT and SAT sessions?',
        answer: 'Typically controls engineers, operations representatives, maintenance, project management and relevant vendors. Involving end users early improves test quality and reduces surprises during final startup.'
      },
      {
        question: 'How do you handle defects discovered during SAT?',
        answer: 'Each defect is logged with severity, owner and target date. We track closure transparently, retest affected functions and confirm evidence before moving issues to complete status.'
      },
      {
        question: 'Can commissioning be staged to fit production priorities?',
        answer: 'Yes. We regularly plan staged energisation and line-by-line commissioning so critical production areas can return to service while remaining scopes are completed safely.'
      }
    ]
  }
]

export const servicesBySlug = Object.fromEntries(services.map((service) => [service.slug, service])) as Record<string, ServiceDetail>
