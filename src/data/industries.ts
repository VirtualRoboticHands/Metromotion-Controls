export type IndustryChallenge = { title: string; detail: string }
export type IndustryProject = { name: string; scope: string }
export type IndustryFaq = { question: string; answer: string }

export type IndustryContent = {
  slug: string
  name: string
  targetKeyword: string
  title: string
  metaDescription: string
  heroSummary: string[]
  challenges: IndustryChallenge[]
  solutions: string[]
  typicalProjects: IndustryProject[]
  platformsIntro: string
  platforms: string[]
  standards: string[]
  faqs: IndustryFaq[]
}

export const industries: IndustryContent[] = [
  {
    slug: 'food-beverage',
    name: 'Food & Beverage',
    targetKeyword: 'food and beverage automation Australia',
    title: 'Food & Beverage Automation | Metromotion Controls',
    metaDescription:
      'Food and beverage automation Australia specialists in Melbourne delivering HACCP-ready batch, CIP, traceability and production line integration.',
    heroSummary: [
      'Metromotion Controls delivers food and beverage automation projects for Australian manufacturers that need reliable throughput, strict quality outcomes and documented compliance. Our team designs control strategies that align with plant hygiene requirements, operator workflows and shift-based production targets.',
      'We support greenfield and brownfield projects across batching, processing, packaging and utilities. This includes staged commissioning around live production, integration with ERP and MES systems, and practical control architecture that can scale as product portfolios expand.',
      "We have supported projects for brands such as Chobani and Arnott's, where process consistency, line performance and data integrity are critical to day-to-day operations.",
    ],
    challenges: [
      { title: 'HACCP-critical control points across mixed process and packaging assets', detail: 'Food plants often operate separate control islands that make CCP verification fragmented. Teams need a unified method to monitor hold times, temperatures, metal detection and release logic with full audit trails.' },
      { title: 'Recipe and batch complexity for high SKU environments', detail: 'Frequent changeovers introduce risk around ingredient dosing, setpoint management and allergen segregation. Manual overrides and spreadsheet-driven workflows can cause rework and compliance exposure.' },
      { title: 'CIP execution quality and utility consumption', detail: 'Cleaning in place sequences are frequently overrun to maintain confidence, increasing downtime, water usage and chemical costs. Plants need validated CIP logic with repeatable verification and exception handling.' },
      { title: 'Line integration from processing to end-of-line', detail: 'Legacy PLCs, third-party OEM equipment and disconnected label systems create bottlenecks, micro-stops and weak traceability through to pallet dispatch.' },
    ],
    solutions: [
      'Our food and beverage automation programs start with a control narrative aligned to HACCP plans, quality procedures and production KPIs. We map each critical process point to PLC interlocks, alarm priorities and event logging so operations, quality and maintenance teams all work from one source of truth.',
      'For batching and recipe management, we implement ISA-88 inspired batch structures with controlled phase logic, parameter security, versioned recipes and operator confirmation steps. Typical deployments include Rockwell PlantPAx, Siemens TIA Portal and Ignition or FactoryTalk SCADA layers, connected to SQL historians for lot genealogy and downtime analytics.',
      'On CIP systems, we deliver sequence control for pre-rinse, caustic, intermediate rinse, acid and final sanitise cycles with conductivity, temperature, flow and return-path verification. We include permissive checks, fault recovery pathways and digital records to support internal audits and customer compliance requests.',
      'For integrated production lines, we coordinate machine-to-machine handshakes, conveyor accumulation logic, reject tracking, print-and-verify workflows and palletiser interfaces. We also connect ERP or MES transactions for schedule download, work-order confirmation and finished goods traceability, reducing manual administration while improving real-time visibility.',
    ],
    typicalProjects: [
      { name: 'High-care batching and transfer system upgrade', scope: 'Migration of legacy PLC controls to a modern redundant architecture, including recipe governance, automated ingredient verification, and integrated batch reporting by lot and shift.' },
      { name: 'CIP optimisation program for multi-line processing halls', scope: 'Standardised CIP phases, utility metering integration, dashboarding for cycle compliance, and a performance baseline to reduce clean times without compromising hygiene validation.' },
      { name: 'Processing-to-packaging line coordination project', scope: 'Integration of fillers, sealers, checkweighers and case packers with central line control, reason-coded downtime capture and OEE reporting for production leadership.' },
      { name: 'Traceability and quality data platform', scope: 'PLC-to-database architecture that links recipe version, process values, in-line QA checks and pallet labels to deliver end-to-end digital genealogy for recall readiness.' },
    ],
    platformsIntro: 'Food and beverage facilities in Australia typically require interoperability across processing skids, OEM packaging equipment and enterprise systems. We design standards-based architectures that can be supported locally and expanded over time.',
    platforms: [
      'PLC/SCADA: Rockwell ControlLogix and CompactLogix, Siemens S7-1500, Schneider EcoStruxure, Ignition, FactoryTalk View and WinCC.',
      'Instrumentation and drives: Endress+Hauser, IFM, VEGA, Emerson, ABB and SEW-Eurodrive.',
      'Integration protocols: EtherNet/IP, Profinet, Modbus TCP, OPC UA and MQTT for plant and cloud-adjacent data flows.',
      'Data and reporting stack: SQL Server, AVEVA Historian, Power BI and structured alarm/event models for operational governance.',
    ],
    standards: ['HACCP and site quality plans for CCP management and verification evidence.', 'FSANZ-aligned production and labelling data requirements.', 'AS/NZS 4024 and ISO 13849 principles for machinery safety integration.', 'ISA-88 batch structure and ISA-95 integration concepts where appropriate.'],
    faqs: [
      { question: 'How do you manage allergen control in automated recipe systems?', answer: 'We apply recipe authorisation, controlled transitions between product families, and mandatory verification steps before batch release. CIP status, line clearance checks and ingredient ID validation are linked to interlocks so operators cannot bypass critical allergen controls without approved workflows.' },
      { question: 'Can you upgrade controls while production remains active?', answer: 'Yes. We commonly stage FAT, SAT and cutovers around production windows, with temporary bypass plans, rollback options and clear commissioning gates. This approach reduces downtime risk while ensuring each line segment is validated before full operational handover.' },
      { question: 'What traceability depth can be achieved for finished product?', answer: 'We typically capture lot, recipe, process setpoints, critical measurements, quality results, and packaging identifiers through to pallet or dispatch unit level. The depth depends on available instrumentation and labelling systems, but the architecture is designed for fast recall response and audit readiness.' },
    ],
  },
  {
    slug: 'dairy', name: 'Dairy', targetKeyword: 'dairy processing automation Melbourne', title: 'Dairy Automation | Metromotion Controls',
    metaDescription: 'Dairy processing automation Melbourne specialists delivering milk reception, pasteurisation, separation, CIP and compliance-ready controls across Australia.',
    heroSummary: [
      'Dairy plants rely on stable process control from milk reception through pasteurisation, separation, standardisation and packaging. Metromotion Controls engineers automation systems that maintain product integrity while supporting production flexibility and cold-chain assurance.',
      'We configure dairy control systems with strong hygiene logic, validated process states and complete batch records. Our work supports both daily production reliability and long-term expansion plans for Australian dairy operations.',
      'We have provided programming and commissioning support to Lactalis facilities, helping teams modernise control environments while sustaining operating performance.',
    ],
    challenges: [
      { title: 'Process consistency through thermal and separation stages', detail: 'Pasteurisation and separation steps require tightly controlled temperature, pressure and flow envelopes. Variability can impact product quality, shelf life and compliance outcomes.' },
      { title: 'Reliable milk intake and receival data integrity', detail: 'Milk reception systems need dependable tanker unloading control, sampling alignment and volume reconciliation. Disconnected systems make mass balance and supplier traceability harder.' },
      { title: 'CIP scheduling across shared process assets', detail: 'Shared lines, tanks and valves create scheduling conflicts between production and cleaning activities. Plants need enforceable state control to avoid cross-contamination risks.' },
      { title: 'Cold chain monitoring across utilities and storage', detail: 'Temperature excursions in silos, buffer tanks or finished goods areas can create significant risk. Sites require alarm management that supports rapid intervention and documented response.' },
    ],
    solutions: [
      'We build dairy processing automation around deterministic sequence control, validated permissives and complete state visibility for operators. Control modules are structured by equipment class, which improves troubleshooting and keeps future expansion manageable.',
      'For milk reception and pasteurisation, we implement dependable transfer logic, custody event capture, thermal hold verification and automated reporting for quality teams. Integrated historians store key process values to support compliance checks, incident investigations and continuous improvement.',
      'Our batch and routing logic for separation and standardisation supports recipe targets, fat-content control and line allocation rules. We design valve matrix control with route validation and clean/dirty segregation to reduce operator burden and improve safety around product path selection.',
      'Cold chain reliability is addressed by linking refrigeration plant signals, tank temperatures, utility alarms and escalation workflows into one supervisory layer. Notifications and acknowledgement pathways are designed for shift-based operations, with actionable alarm rationalisation rather than alarm overload.',
    ],
    typicalProjects: [
      { name: 'Milk reception and transfer control upgrade', scope: 'Replacement of legacy intake controls with automated route checks, unloading sequences, CIP interlocks and digital reconciliation reports for operations and quality teams.' },
      { name: 'Pasteuriser and separator integration project', scope: 'Coordinated PLC and HMI strategy for thermal process units, including hold-time verification, trend diagnostics and event capture for regulatory documentation.' },
      { name: 'CIP centralisation and optimisation', scope: 'Development of reusable CIP phases, central scheduling logic and sanitation reporting integrated with production planning and maintenance teams.' },
      { name: 'Cold-chain monitoring and escalation platform', scope: 'Unified dashboard for refrigeration, silo and finished goods areas with alarm tiers, mobile notifications and historical analysis for root-cause investigations.' },
    ],
    platformsIntro: 'Dairy sites commonly blend legacy infrastructure with modern process skids and high-speed packaging. We select technology stacks that maintain vendor supportability and robust operational diagnostics.',
    platforms: ['Control platforms: Siemens PCS 7/TIA, Rockwell PlantPAx, Schneider systems and distributed I/O for hygienic process areas.', 'Field devices: hygienic flowmeters, temperature transmitters, pressure instruments and valve manifolds from major process vendors.', 'Communications: Profinet, EtherNet/IP, Modbus TCP and OPC UA for cross-system integration.', 'Operations data: historian platforms, secure remote access tooling and SCADA redundancy for high-availability areas.'],
    standards: ['FSANZ and internal dairy quality program requirements.', 'HACCP verification logic at thermal and handling control points.', 'AS/NZS electrical compliance and machinery safety obligations.', 'Documented commissioning aligned to FAT/SAT and validation procedures.'],
    faqs: [
      { question: 'How do you protect pasteurisation compliance in control logic?', answer: 'We enforce hold-time, flow-diversion and permissive checks in PLC logic with tamper-resistant parameter controls. Event logs and trends are retained for quality review and audit evidence, supporting both routine verification and exception investigations.' },
      { question: 'Can dairy CIP be integrated with production scheduling?', answer: 'Yes. We configure CIP and production as coordinated states so tank and line availability are visible in one schedule. This reduces clashes, supports faster turnarounds and gives planners confidence about asset readiness.' },
      { question: 'Do you support multi-site dairy standardisation?', answer: 'Yes. We can define reusable control modules, naming conventions, alarm classes and reporting models so multiple facilities operate with consistent engineering standards while still accommodating site-specific process requirements.' },
    ],
  },
  {
    slug: 'packaging', name: 'Packaging', targetKeyword: 'packaging automation Australia', title: 'Packaging Automation | Metromotion Controls',
    metaDescription: 'Packaging automation Australia engineering for high-speed line control, vision, labelling, palletising and OEE monitoring from Melbourne.',
    heroSummary: ['Packaging environments demand high-speed reliability, short changeovers and accurate quality verification. Metromotion Controls designs packaging automation solutions that keep lines running while maintaining strict product and label integrity.', 'Our team integrates primary and secondary packaging assets, from fillers and sealers through to case packing and pallet handling. We prioritise deterministic line logic, practical diagnostics and performance data that operators and production managers can use daily.', 'We have supported network and controls projects for Orora and other packaging-intensive operations where uptime and fault isolation have a direct commercial impact.'],
    challenges: [
      { title: 'Micro-stops and cascading faults on high-speed lines', detail: 'Small interruptions can quickly escalate across infeed, process and end-of-line zones. Teams need clear fault hierarchy and buffer-aware control to stabilise throughput.' },
      { title: 'Frequent SKU and format changeovers', detail: 'Short runs require rapid, repeatable setup changes across machine parameters, label data and inspection limits. Manual setup increases variation and startup scrap.' },
      { title: 'Vision and print verification integration', detail: 'Inspection and coding systems are often bolted on rather than integrated. This can lead to inconsistent reject handling and poor root-cause visibility.' },
      { title: 'Limited OEE signal quality', detail: 'Many lines collect runtime states without standard reason coding or context. This limits improvement programs because losses are not measured consistently.' },
    ],
    solutions: ['We structure packaging line control around equipment states, coordinated handshakes and accumulation logic that protects throughput under variable downstream demand. Line control includes deterministic start, stop and recovery sequences with clear operator guidance.', 'For changeovers, we deploy recipe parameter packs across PLC, HMI, vision and printer systems, with role-based permissions and confirmation workflows. This reduces setup errors and improves first-pass quality after product transitions.', 'Vision and labelling systems are integrated into core line control rather than isolated at machine level. Reject confirmation, recirculation strategies, ejection timing and rework capture are implemented to support compliance and reduce unexplained losses.', 'We implement OEE architectures with ISA-95 aligned reason trees, standardised downtime events and contextual production counts. Data is available in real time and historically, enabling operations teams to prioritise improvements by verified loss categories.'],
    typicalProjects: [
      { name: 'High-speed packaging line control retrofit', scope: 'Line master PLC implementation across conveyors, labellers, checkweighers and palletising, including zone-based diagnostics and coordinated recovery logic.' },
      { name: 'Automated format changeover deployment', scope: 'Central recipe model that synchronises machine setpoints, print templates and vision tolerances to reduce changeover duration and startup rejects.' },
      { name: 'Integrated label and code verification project', scope: 'Connection of camera systems, printers and reject stations with full event logging for compliance reporting and quality analytics.' },
      { name: 'Packaging OEE and performance dashboard rollout', scope: 'Plant-wide data model with runtime states, reason coding governance and management dashboards for shift and weekly performance review.' },
    ],
    platformsIntro: 'Packaging plants benefit from controls that can integrate OEM machine controllers, third-party inspection equipment and enterprise reporting tools without compromising line speed.',
    platforms: ['Automation platforms: Rockwell Logix, Siemens TIA, Beckhoff and Schneider depending on line architecture.', 'Inspection and coding: Cognex, Keyence, SICK, Markem-Imaje, Domino and Videojet integrations.', 'Robotics and motion: ABB, FANUC, KUKA and servo control systems for palletising and pick-and-place operations.', 'Data standards: OPC UA, PackML concepts, MQTT gateways and SQL-based event storage for OEE.'],
    standards: ['AS/NZS 4024 and ISO 13849 for machinery safety implementation.', 'GS1-aligned labelling and traceability data structures where required.', 'Site quality requirements for print verification and reject accountability.', 'Structured FAT/SAT documentation for packaging line acceptance.'],
    faqs: [
      { question: 'Can you integrate multiple OEM machines into one line control strategy?', answer: 'Yes. We commonly implement a line master layer that coordinates machine states and handshakes while preserving OEM controller responsibilities. This improves startup behaviour, reduces fault propagation and gives operators one consistent view of line status.' },
      { question: 'How do you reduce changeover time on packaging lines?', answer: 'We standardise product recipes across all relevant subsystems and include guided setup workflows on HMIs. Combined with validation checks and role-based access, this reduces manual parameter entry and shortens time to stable production.' },
      { question: 'What level of OEE reporting can be delivered?', answer: 'We provide real-time dashboards, shift summaries and historical analysis by line, machine and reason code. The architecture supports both daily operational decisions and longer-term loss elimination programs with verifiable data quality.' },
    ],
  },
  {
    slug: 'pet-food', name: 'Pet Food', targetKeyword: 'pet food manufacturing automation', title: 'Pet Food Automation | Metromotion Controls',
    metaDescription: 'Pet food manufacturing automation experts in Melbourne for raw material handling, batching, extrusion, packaging integration and traceability.',
    heroSummary: ['Pet food manufacturers balance strict formulation control with high-throughput production and varied product formats. Metromotion Controls delivers automation systems that protect recipe integrity while improving line availability and traceability.', 'Our work spans raw material intake, grinding, mixing, extrusion, drying, coating and packaging integration. We design for practical plant operation, from shift handover clarity to maintainability and secure data flow.', 'We have delivered automation outcomes for Real Pet Food environments where ingredient control, process consistency and dispatch readiness are central to commercial performance.'],
    challenges: [
      { title: 'Raw material variability and intake control', detail: 'Protein meals, grains, oils and micronutrients have different handling needs and quality constraints. Sites need robust weighing, dosing and route validation to avoid formulation drift.' },
      { title: 'Mixing, extrusion and moisture consistency', detail: 'Process windows can shift with ingredient characteristics and upstream variation. Without coordinated control and feedback, product texture and nutritional targets can drift.' },
      { title: 'Synchronising process and packaging operations', detail: 'Process interruptions can destabilise packaging flow, while packaging stops can create upstream product handling issues. Integrated state management is needed to protect yield.' },
      { title: 'Traceability from ingredient lot to finished pack', detail: 'Pet food operations require rapid traceability for quality assurance and market response. Manual records are too slow for efficient containment and analysis.' },
    ],
    solutions: ['We deploy raw material handling controls with validated routing, bin inventory visibility and weigh-scale integration to manage dosing accuracy. Ingredient identity checks and transfer confirmations are embedded into sequence logic to reduce operator error.', 'Batching and mixing strategies use parameter-governed phase control with alarmed tolerances and automated exception capture. For extrusion and thermal stages, we integrate key process measurements such as temperature, pressure and moisture indicators into trend-driven operational dashboards.', 'Our integration approach connects process assets with packaging lines through coordinated buffering logic, transfer permissives and state machines that support controlled recovery after disturbances. This reduces waste and minimises unstable restarts.', 'For traceability, we link ingredient receipt data, batch execution records, in-process quality checks and packaging identifiers within a common data architecture. The result is faster recall analysis, clearer supplier performance insight and stronger quality governance.'],
    typicalProjects: [
      { name: 'Raw material intake and batching automation program', scope: 'Automation of intake, storage and dosing workflows with lot validation, recipe enforcement and digital batch records integrated to plant reporting.' },
      { name: 'Extrusion line control enhancement', scope: 'Control strategy upgrade for extruder feed, thermal control and downstream handling with enhanced alarms, trend tools and startup sequence reliability.' },
      { name: 'Process-to-packaging integration project', scope: 'Unified line-state model connecting dryers, coaters, conveyors and packaging equipment to reduce stop/start losses and improve throughput stability.' },
      { name: 'End-to-end traceability implementation', scope: 'Data model and interface development linking ingredient lots to finished goods labels and pallet IDs for compliance and customer reporting requirements.' },
    ],
    platformsIntro: 'Pet food sites generally combine continuous and batch operations. We align platform selection to hygiene, throughput and reporting requirements while keeping support practical for maintenance teams.',
    platforms: ['PLC and visualisation: Rockwell, Siemens and Ignition-based supervisory systems.', 'Material handling controls: weigh systems, load cells, VFDs and pneumatic transfer instrumentation.', 'Protocol stack: EtherNet/IP, Profinet, Modbus TCP, OPC UA and secure remote support access.', 'Information systems: historian, SQL repositories and reporting integrations for quality and production teams.'],
    standards: ['HACCP-aligned control checkpoints for recipe and process assurance.', 'FSANZ and customer quality documentation requirements.', 'AS/NZS machinery and electrical safety compliance for integrated lines.', 'Structured commissioning and validation records for regulated production environments.'],
    faqs: [
      { question: 'How do you handle recipe security in pet food automation?', answer: 'We apply role-based recipe control, approved parameter ranges and change logging for every recipe revision. Operator workflows include confirmation checkpoints so formulation-critical settings cannot be altered without traceable authorisation.' },
      { question: 'Can extrusion control be improved without replacing all hardware?', answer: 'In many cases, yes. We often improve performance through software refactoring, better signal conditioning, additional instrumentation and operator guidance while retaining suitable field hardware and minimising capital disruption.' },
      { question: 'What traceability response time can be expected?', answer: 'With an integrated architecture, lot-to-pack trace investigations can typically be completed in minutes rather than hours. Actual performance depends on instrumentation quality and data discipline, which we address during design and commissioning.' },
    ],
  },
  {
    slug: 'fmcg', name: 'FMCG', targetKeyword: 'FMCG manufacturing automation Australia', title: 'FMCG Automation | Metromotion Controls',
    metaDescription: 'FMCG manufacturing automation Australia solutions for high-volume lines, fast changeovers, quality control and production data integration from Melbourne.',
    heroSummary: ['FMCG operations require automation that can sustain high-volume output while responding quickly to demand, promotions and product mix changes. Metromotion Controls engineers control systems that support throughput, repeatability and disciplined quality execution.', 'We help FMCG manufacturers standardise line behaviours, improve changeover performance and connect production assets to planning and reporting systems. The focus is practical, measurable improvement with engineering foundations that remain maintainable.', 'Our team has delivered controls and integration support across Australian FMCG environments where multi-SKU complexity and operational pace are significant drivers.'],
    challenges: [
      { title: 'High-output operations with narrow downtime tolerance', detail: 'Minor inefficiencies accumulate quickly on FMCG lines. Sites need robust control logic, rapid fault identification and resilient startup behaviour.' },
      { title: 'Fast changeovers and campaign scheduling pressure', detail: 'Frequent product transitions can create setup error risk and variable startup quality. Coordination between production planning and shop-floor settings is essential.' },
      { title: 'Quality control integration across multiple checkpoints', detail: 'In-process and end-of-line checks are often isolated, making it hard to connect quality outcomes to machine states or setpoint history.' },
      { title: 'Multi-SKU data complexity and reporting consistency', detail: 'Without a common data model, teams struggle to compare performance across products, lines and shifts. This weakens improvement prioritisation.' },
    ],
    solutions: ['We design FMCG automation architectures with reusable machine state models, controlled startup sequences and layered diagnostics. This supports faster recovery from interruptions and provides clearer escalation pathways for operations and maintenance.', 'Changeover optimisation is delivered through central recipe management, guided setup workflows, parameter verification and automated job context loading from scheduling systems. Production teams gain predictable transition performance and lower startup scrap.', 'Quality systems are integrated directly into line control through checkweigher, vision, coding and reject interfaces. Events are contextualised with product, batch and machine-state information so teams can correlate defects with process conditions and act quickly.', 'For multi-SKU analytics, we deploy unified data structures and reason coding standards that support OEE, adherence-to-plan and quality KPI reporting. Integration with MES or ERP systems provides a clearer link between planning decisions and plant-floor outcomes.'],
    typicalProjects: [
      { name: 'FMCG line standardisation and controls refresh', scope: 'Development of common PLC/HMI templates across multiple lines, improving maintainability, operator familiarity and fault response speed.' },
      { name: 'Rapid changeover automation project', scope: 'Implementation of synchronised recipe and setup governance with line clearance prompts, reducing transition time and startup losses.' },
      { name: 'Integrated quality and reject accountability system', scope: 'Connection of in-line inspection devices to central reporting with traceable reject causes, rework paths and quality trend dashboards.' },
      { name: 'Production scheduling and execution integration', scope: 'Bidirectional interfaces between planning systems and line controls for work-order download, completion feedback and performance reporting.' },
    ],
    platformsIntro: 'FMCG facilities usually run mixed vendor fleets with strict uptime expectations. We prioritise platform choices that support long-term maintenance capability and clear operational visibility.',
    platforms: ['Control and HMI: Rockwell, Siemens, Schneider and scalable SCADA platforms.', 'Inspection and coding ecosystems integrated through standard industrial communications.', 'Data integration: OPC UA, MQTT, SQL and API-based connectors to MES/ERP environments.', 'Performance stack: historian, OEE dashboards and event models aligned to plant governance.'],
    standards: ['Site quality systems and product compliance frameworks.', 'AS/NZS electrical and machinery safety obligations.', 'Structured commissioning and validation for production handover.', 'ISA-95 aligned contextualisation for production and enterprise data where suitable.'],
    faqs: [
      { question: 'How quickly can line changeovers be improved?', answer: 'Improvements depend on baseline maturity, but projects commonly deliver measurable gains once recipes, setup verification and operator prompts are standardised. We usually establish baseline metrics first, then track performance after phased deployment.' },
      { question: 'Can existing FMCG lines be standardised without full replacement?', answer: 'Yes. Standardisation can be achieved through software frameworks, common HMI patterns, data models and interface layers while retaining suitable legacy equipment. This lowers capital risk and speeds rollout across multiple lines.' },
      { question: 'Do you integrate shop-floor systems with production planning tools?', answer: 'Yes. We implement interfaces that exchange schedule, recipe and execution status data between line control systems and MES or ERP platforms, reducing manual data entry and improving adherence-to-plan visibility.' },
    ],
  },
  {
    slug: 'advanced-manufacturing', name: 'Advanced Manufacturing', targetKeyword: 'advanced manufacturing automation Melbourne', title: 'Advanced Manufacturing Automation | Metromotion Controls',
    metaDescription: 'Advanced manufacturing automation Melbourne expertise for robotics integration, Industry 4.0 data systems, digital twins and predictive maintenance.',
    heroSummary: ['Advanced manufacturing facilities require precision, repeatability and continuous optimisation across complex automated assets. Metromotion Controls delivers control and integration solutions that support high-performance production and data-driven decision making.', 'We work across robotics, motion systems, process cells, inspection systems and plant data platforms. Our engineering approach combines robust real-time control with scalable information architecture for Industry 4.0 adoption.', 'Projects are delivered with practical commissioning discipline and long-term maintainability in mind, helping manufacturers in Melbourne and across Australia scale capability with confidence.'],
    challenges: [
      { title: 'Precision control across tightly coupled equipment', detail: 'Advanced cells often include robotics, servo motion, machine vision and process modules with tight synchronisation requirements. Small timing issues can reduce yield and cycle performance.' },
      { title: 'Data silos limiting optimisation and troubleshooting', detail: 'High-value assets generate large datasets, but disconnected systems prevent useful insights. Teams need contextual data that links process, quality and maintenance events.' },
      { title: 'Scaling Industry 4.0 initiatives beyond pilots', detail: 'Many sites run isolated proof-of-concepts without production-grade integration. Sustainable rollout requires standards, cyber-aware architectures and clear ownership models.' },
      { title: 'Reactive maintenance on critical assets', detail: 'Unexpected failures in high-precision equipment can be costly. Plants need condition visibility and predictive indicators integrated into daily operations.' },
    ],
    solutions: ['We develop advanced manufacturing controls using modular software architectures, deterministic communications and validated state machines. Robotics and motion systems are integrated with clear sequencing, safety zoning and fault recovery logic to maintain consistent cycle times.', 'Our data strategy links PLC and edge data to historian and analytics environments with strong naming conventions and contextual tagging. This enables meaningful dashboards, model-ready datasets and faster root-cause analysis across engineering, quality and operations teams.', 'For Industry 4.0 programs, we implement pragmatic rollout pathways that include secure OT network segmentation, standard protocol selection, governed data pipelines and staged operational adoption. The goal is measurable value at each phase rather than broad, unmanaged complexity.', 'Predictive maintenance capabilities are delivered through condition monitoring integration, alarm intelligence and trend-based alerts for critical components. We can also support digital twin initiatives by aligning control logic, process states and equipment models to improve virtual testing and change validation.'],
    typicalProjects: [
      { name: 'Robotics cell integration and safety coordination', scope: 'Integration of multi-robot stations with vision and motion control, including safety PLC zoning, interlocks and coordinated startup/recovery sequences.' },
      { name: 'Industry 4.0 data foundation program', scope: 'Deployment of plant data infrastructure linking PLC signals, quality results and asset events to a structured analytics environment for real-time and historical insight.' },
      { name: 'Digital twin enablement for process cells', scope: 'Alignment of control narratives, state models and simulation interfaces to support virtual FAT, change validation and training use cases.' },
      { name: 'Predictive maintenance and condition monitoring rollout', scope: 'Integration of vibration, thermal and runtime indicators into maintenance dashboards with threshold logic and escalation workflows.' },
    ],
    platformsIntro: 'Advanced manufacturing projects require flexible yet robust technology choices. We design around open, supportable platforms that enable both deterministic control and modern data services.',
    platforms: ['Automation stack: Siemens, Rockwell, Beckhoff and Codesys-based systems depending on application constraints.', 'Robotics and vision: FANUC, ABB, KUKA, Universal Robots, Cognex and Keyence integrations.', 'Industrial communications: OPC UA, Profinet, EtherCAT, EtherNet/IP and MQTT at edge integration boundaries.', 'Analytics and operations: historian platforms, SQL/time-series stores, Power BI and event-driven alerting pipelines.'],
    standards: ['ISO 10218 and AS/NZS machinery safety requirements for robotic systems.', 'IEC 62443-aligned OT cybersecurity principles for connected environments.', 'AS/NZS electrical compliance and documented commissioning practices.', 'ISA-95 and ISA-88 concepts for scalable data and control modelling.'],
    faqs: [
      { question: 'What does a practical Industry 4.0 roadmap look like?', answer: 'A practical roadmap starts with high-value use cases, standard data structures and secure connectivity. We typically phase delivery from data visibility to analytics and optimisation, ensuring each step is operationally adopted before expanding scope.' },
      { question: 'Can robotics be integrated with existing line controls?', answer: 'Yes. We integrate robotics with existing PLC and SCADA systems using clear interface contracts, safety logic coordination and deterministic state handling. This approach reduces integration risk and preserves existing operational knowledge.' },
      { question: 'How do you approach predictive maintenance implementation?', answer: 'We prioritise critical assets, define measurable failure indicators and integrate those signals into maintenance workflows. Success depends on clean data, alarm relevance and clear accountability for intervention, all of which are built into our deployment approach.' },
    ],
  },
]

export const industriesBySlug = Object.fromEntries(industries.map((industry) => [industry.slug, industry])) as Record<string, IndustryContent>
