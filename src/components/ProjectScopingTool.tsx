'use client'

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'

type ChallengeQuestion = {
  key: string
  label: string
  opts: string[]
}

type Challenge = {
  id: string
  label: string
  short: string
  icon: string
  questions: ChallengeQuestion[]
}

type Report = {
  headline: string
  overview: string
  key_considerations: string[]
  questions_to_think_about: string[]
  what_to_have_ready: string[]
}

const CHALLENGES: Challenge[] = [
  {
    id: 'oee',
    label: 'OEE & Production Visibility',
    short: "I can't see what's happening on my lines in real time",
    icon: '◉',
    questions: [
      {
        key: 'oee_tracking',
        label: 'How are you tracking production performance today?',
        opts: ['Spreadsheets & whiteboards', 'Basic HMI counters', 'Existing MES or OEE system', "We're not tracking it"],
      },
      { key: 'oee_lines', label: 'How many lines need visibility?', opts: ['1–2 lines', '3–5 lines', '6–10 lines', '10+'] },
      {
        key: 'oee_loss',
        label: 'Where do you think your biggest losses are?',
        opts: ['Unplanned downtime & breakdowns', 'Changeover & setup time', 'Speed losses & small stops', 'Quality / reject / rework', "Honestly, we don't know yet"],
      },
    ],
  },
  {
    id: 'data',
    label: 'Data, Dashboards & Analytics',
    short: "I have data but can't turn it into decisions",
    icon: '▤',
    questions: [
      {
        key: 'data_source',
        label: 'Where does your production data live today?',
        opts: ['Historian (PI, Wonderware, etc.)', 'PLC memory only — nothing is logged', 'Spreadsheets & manual operator logs', 'Multiple disconnected systems'],
      },
      {
        key: 'data_audience',
        label: 'Who needs to see the dashboards?',
        opts: ['Operators on the floor', 'Shift & line managers', 'Plant / site management', 'All levels — floor to boardroom'],
      },
      {
        key: 'data_decision',
        label: 'What decisions should the data support?',
        opts: ['Shift performance & production targets', 'Maintenance planning & downtime trends', 'Production scheduling & capacity', 'Cost, yield & efficiency reporting'],
      },
    ],
  },
  {
    id: 'legacy',
    label: 'Legacy System Migration',
    short: 'My control system is end-of-life or unsupported',
    icon: '⟲',
    questions: [
      { key: 'legacy_hw', label: "What's the current hardware?", opts: ['Allen-Bradley PLC-5 or SLC 500', 'Siemens S5 or S7-300', 'Other legacy PLC / DCS', 'Multiple / mixed legacy systems', 'Not sure of the exact model'] },
      { key: 'legacy_driver', label: "What's driving the upgrade?", opts: ["Can't get spare parts anymore", 'Vendor end-of-life / no support', 'Reliability / performance issues', 'Cybersecurity or compliance risk'] },
      { key: 'legacy_cutover', label: 'Can production stop for the cutover?', opts: ['Yes — planned shutdown window available', 'Partial — some lines can stop', 'No — must be hot-cutover with zero downtime', 'Not sure yet'] },
    ],
  },
  {
    id: 'scada',
    label: 'SCADA & HMI Upgrade',
    short: 'I need a new or modernised SCADA system',
    icon: '▦',
    questions: [
      { key: 'scada_type', label: 'What type of work?', opts: ['New SCADA system from scratch', 'Re-platform / upgrade existing', 'Consolidating multiple SCADA systems', 'Adding screens, tags, or functionality'] },
      { key: 'scada_io', label: 'Approximate I/O count?', opts: ['Under 500', '500–2,000', '2,000–5,000', '5,000+', 'Not sure'] },
      { key: 'scada_integration', label: 'What needs to integrate with the SCADA?', opts: ['Historian / trending only', 'MES / production reporting', 'ERP / business systems', 'All of the above', 'Just standalone HMI / SCADA'] },
    ],
  },
  {
    id: 'batching',
    label: 'CIP, Batching & Process Automation',
    short: 'I need to automate batch processes or CIP',
    icon: '◎',
    questions: [
      { key: 'batch_scope', label: 'What are you automating?', opts: ['CIP system only', 'Batch / recipe process only', 'Both CIP + batching', 'Full process incl. filling / packaging'] },
      { key: 'batch_current', label: 'How is it controlled today?', opts: ['Manual / semi-manual operation', 'Hardcoded PLC sequences (no recipe flexibility)', 'Existing batch management software', 'Not built yet — greenfield'] },
      { key: 'batch_recipes', label: 'How many products / recipes run through the same equipment?', opts: ['1–5 products', '5–20 products', '20+ products', 'Varies — high changeover frequency'] },
    ],
  },
  {
    id: 'erp',
    label: 'ERP & Business System Integration',
    short: "Plant floor data doesn't reach my business systems",
    icon: '⇄',
    questions: [
      { key: 'erp_system', label: 'Which ERP / business system?', opts: ['SAP (any variant)', 'Microsoft Dynamics', 'MYOB / Pronto / DEAR', 'NetSuite', 'Other / not sure'] },
      { key: 'erp_flow', label: 'What data needs to flow, and which direction?', opts: ['Production orders & schedules → down to floor', 'Consumption & inventory → up to ERP', 'Quality & compliance data → up to ERP', 'Bidirectional — all of the above'] },
      { key: 'erp_existing', label: 'Is there an existing integration?', opts: ['No — nothing connects today', 'Partial — CSV / manual data transfer', "Yes — but it's broken or unreliable", 'Replacing a legacy integration'] },
    ],
  },
  {
    id: 'iiot',
    label: 'IIoT & Cloud Connectivity',
    short: 'I want to connect my plant to the cloud',
    icon: '☁',
    questions: [
      { key: 'iiot_goal', label: "What's the primary goal?", opts: ['Remote monitoring & alerts', 'Cloud dashboards for management', 'Predictive maintenance', 'Centralised data across multiple sites'] },
      { key: 'iiot_network', label: 'Current OT network setup?', opts: ['Air-gapped / fully isolated from IT', 'Some IT/OT connection exists', 'IT/OT converged with managed firewall', 'Not sure of the current setup'] },
      { key: 'iiot_cloud', label: 'Cloud platform preference?', opts: ['Microsoft Azure', 'AWS', 'No preference', 'Our IT team will advise'] },
    ],
  },
  {
    id: 'safety',
    label: 'Safety Systems & SIL',
    short: 'I need functional safety design or assessment',
    icon: '△',
    questions: [
      { key: 'safety_driver', label: "What's driving the safety requirement?", opts: ['New machine or production line', 'Risk assessment or audit finding', 'WorkSafe / compliance requirement', 'Insurance requirement'] },
      { key: 'safety_existing', label: 'Existing safety system?', opts: ['Yes — needs upgrading / replacing', 'Yes — needs assessment / review', 'No — designing from scratch', "Not sure what's in place"] },
      { key: 'safety_docs', label: 'Do you have existing risk assessments or SRS documentation?', opts: ['Yes — current and complete', 'Yes — but outdated or incomplete', 'No — needs to be done from scratch', 'Not sure'] },
    ],
  },
  {
    id: 'greenfield',
    label: 'Greenfield / New Line Build',
    short: "I'm building a new line or plant from scratch",
    icon: '⬡',
    questions: [
      { key: 'green_stage', label: 'What stage is the project at?', opts: ['Early concept / feasibility', 'Detailed design underway', 'Construction in progress', 'Equipment ordered or arriving'] },
      { key: 'green_decided', label: "What's already been decided?", opts: ['Nothing locked in yet', 'Mechanical / process design done', 'Automation platform selected', 'Full design — just need controls delivery'] },
      { key: 'green_scale', label: 'Approximate automation scope?', opts: ['Under $500K', '$500K–$2M', '$2M–$5M', '$5M+', 'Too early to say'] },
    ],
  },
  {
    id: 'commissioning',
    label: 'Commissioning & Validation',
    short: 'I need FAT, SAT, or commissioning support',
    icon: '✓',
    questions: [
      { key: 'comm_type', label: 'What type of commissioning?', opts: ['Factory Acceptance Test (FAT)', 'Site Acceptance Test (SAT)', 'Full commissioning & handover', 'Loop checks & I/O verification only'] },
      { key: 'comm_context', label: 'Context?', opts: ['New build — our team did the controls', "New build — another vendor's controls", 'System upgrade or migration', 'OEM/vendor handover support'] },
      { key: 'comm_docs', label: 'Documentation status?', opts: ['Complete and current', 'Partial — needs updating', 'Minimal or non-existent', 'Not sure'] },
    ],
  },
  {
    id: 'support',
    label: 'Ongoing Support & Maintenance',
    short: 'I need a reliable controls support partner',
    icon: '⚙',
    questions: [
      { key: 'support_type', label: 'What kind of support?', opts: ['24/7 on-call emergency response', 'Scheduled preventive maintenance', 'System health checks & audits', 'Ad-hoc troubleshooting as needed'] },
      { key: 'support_scope', label: 'What systems need covering?', opts: ['PLC & SCADA only', 'PLC + electrical + instrumentation', 'Full controls + IT/network', 'Everything — we have no internal controls team'] },
      { key: 'support_sites', label: 'How many sites?', opts: ['Single site', '2–3 sites', '4+ sites / national'] },
    ],
  },
  { id: 'other', label: 'Something Else', short: "My situation doesn't fit neatly into a box", icon: '…', questions: [] },
]

const INDUSTRIES = ['Food & Beverage', 'Dairy', 'Packaging & Processing', 'Pet Food & Animal Nutrition', 'FMCG / Consumer Goods', 'Advanced Manufacturing', 'Pharma & Life Sciences', 'Water & Utilities', 'Other']
const PLATFORMS = ['Rockwell / Allen-Bradley', 'Siemens (S7 / TIA Portal)', 'Schneider / Modicon', 'Ignition (Inductive Automation)', 'Wonderware / AVEVA', 'Citect / Plant SCADA', 'Omron', 'Mitsubishi', 'Mixed / Multiple', 'Not sure', 'No existing system']
const TIMELINES = [
  { id: 'urgent', label: 'Urgent — weeks', sub: "Something's broken or at risk" },
  { id: 'quarter', label: 'This quarter', sub: 'Budgeted and ready to move' },
  { id: 'sixmonth', label: '3–6 months', sub: 'Planning & scoping phase' },
  { id: 'exploring', label: 'Just exploring', sub: 'Building a business case' },
]

const stepLabels = ['Challenge', 'Details', 'Context', 'Contact']
const loadingMessages = ['Reviewing your requirements…', 'Matching against similar projects…', 'Building your scoping brief…', 'Finalising…']
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'xlsx', 'dwg', 'dxf']

const buttonBase = 'rounded-sm border px-4 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-40'
const METROMOTION_PHONE_DIGITS = '0398076896'
const METROMOTION_PHONE_WITH_SPACES = '03 9807 6896'

const stripUnsafeContent = (value: string): string =>
  value
    .replace(/<[^>]*>/g, '')
    .replace(/\bhttps?:\/\/[^\s]+/gi, '')
    .replace(/\bwww\.[^\s]+/gi, '')
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '')
    .replace(/\+?\d[\d\s().-]{7,}\d/g, (match) => {
      const digitsOnly = match.replace(/\D/g, '')
      const allowed = [METROMOTION_PHONE_DIGITS, `61${METROMOTION_PHONE_DIGITS.slice(1)}`]
      return allowed.includes(digitsOnly) ? METROMOTION_PHONE_WITH_SPACES : ''
    })
    .replace(/\s{2,}/g, ' ')
    .trim()

const isValidReport = (input: unknown): input is Report => {
  if (!input || typeof input !== 'object') return false
  const candidate = input as Partial<Report>
  return (
    typeof candidate.headline === 'string' &&
    typeof candidate.overview === 'string' &&
    Array.isArray(candidate.key_considerations) &&
    candidate.key_considerations.every((item) => typeof item === 'string') &&
    Array.isArray(candidate.questions_to_think_about) &&
    candidate.questions_to_think_about.every((item) => typeof item === 'string') &&
    Array.isArray(candidate.what_to_have_ready) &&
    candidate.what_to_have_ready.every((item) => typeof item === 'string')
  )
}

const sanitiseReport = (input: Report): Report => ({
  headline: stripUnsafeContent(input.headline),
  overview: stripUnsafeContent(input.overview),
  key_considerations: input.key_considerations.map((item) => stripUnsafeContent(item)).filter(Boolean),
  questions_to_think_about: input.questions_to_think_about.map((item) => stripUnsafeContent(item)).filter(Boolean),
  what_to_have_ready: input.what_to_have_ready.map((item) => stripUnsafeContent(item)).filter(Boolean),
})

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ProjectScopingTool() {
  const [step, setStep] = useState(0)
  const [challenge, setChallenge] = useState<string | null>(null)
  const [cAns, setCAns] = useState<Record<string, string>>({})
  const [industry, setIndustry] = useState<string | null>(null)
  const [platform, setPlatform] = useState<string | null>(null)
  const [timeline, setTimeline] = useState<string | null>(null)
  const [freeText, setFreeText] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [honeypot, setHoneypot] = useState('')
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '' })
  const [report, setReport] = useState<Report | null>(null)
  const [fallbackMode, setFallbackMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const currentChallenge = useMemo(
    () => CHALLENGES.find((item) => item.id === challenge) ?? null,
    [challenge],
  )

  const challengeQuestionsDone =
    challenge === 'other' ||
    (currentChallenge?.questions?.every((question) => Boolean(cAns[question.key])) ?? false)

  const canSubmit =
    contact.name.trim() && contact.company.trim() && contact.email.trim() && challenge && industry && platform && timeline

  useEffect(() => {
    if (!loading) {
      setLoadingMsgIndex(0)
      return
    }

    const timer = setInterval(() => {
      setLoadingMsgIndex((prev) => Math.min(prev + 1, loadingMessages.length - 1))
    }, 2500)

    return () => clearInterval(timer)
  }, [loading])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? [])
    const nextFiles = [...files]

    for (const file of selectedFiles) {
      if (nextFiles.length >= 5) break
      if (file.size > 10 * 1024 * 1024) {
        setError(`File ${file.name} exceeds 10MB limit.`)
        continue
      }

      const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        setError(`File ${file.name} is not a supported format.`)
        continue
      }

      nextFiles.push(file)
    }

    setFiles(nextFiles)
    event.target.value = ''
  }

  const submit = async () => {
    if (!currentChallenge) return
    setError(null)
    setFallbackMode(false)
    setLoading(true)
    setStep(4)

    const formData = new FormData()
    formData.set('challenge', challenge ?? '')
    formData.set('challengeLabel', currentChallenge.label)
    formData.set('challengeShort', currentChallenge.short)
    formData.set('challengeAnswers', JSON.stringify(cAns))
    formData.set('industry', industry ?? '')
    formData.set('platform', platform ?? '')
    formData.set('timeline', timeline ?? '')
    formData.set('freeText', freeText.slice(0, 1000))
    formData.set('contactName', contact.name)
    formData.set('contactCompany', contact.company)
    formData.set('contactEmail', contact.email)
    formData.set('contactPhone', contact.phone)
    formData.set('honeypot', honeypot)

    files.forEach((file) => formData.append('files', file))

    try {
      const response = await fetch('/api/scoping', { method: 'POST', body: formData })
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error ?? 'Unable to generate scoping brief right now.')
      }

      const payload = (await response.json()) as { report?: unknown; fallback?: boolean }
      if (payload.fallback) {
        setFallbackMode(true)
        setReport(null)
        return
      }
      if (!isValidReport(payload.report)) {
        setFallbackMode(true)
        setReport(null)
        return
      }
      setReport(sanitiseReport(payload.report))
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to generate report.')
      setStep(3)
    } finally {
      setLoading(false)
    }
  }

  const resetTool = () => {
    setStep(0)
    setChallenge(null)
    setCAns({})
    setIndustry(null)
    setPlatform(null)
    setTimeline(null)
    setFreeText('')
    setFiles([])
    setContact({ name: '', company: '', email: '', phone: '' })
    setReport(null)
    setFallbackMode(false)
  }

  return (
    <div className="overflow-hidden rounded-sm border border-[#e2e0db] bg-white">
      <div className="flex items-center justify-between border-b border-[#e2e0db] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#c8281e]" />
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#1a1a1a]">Metromotion</span>
        </div>
        <span className="text-xs text-[#7a7770]">Project Scoping Tool</span>
      </div>

      {step < 4 && (
        <div className="grid grid-cols-2 border-b border-[#e2e0db] sm:grid-cols-4">
          {stepLabels.map((label, index) => (
            <div
              key={label}
              className={`border-b-2 px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.08em] ${
                index === step
                  ? 'border-[#c8281e] text-[#c8281e]'
                  : index < step
                    ? 'border-transparent text-[#1a1a1a]'
                    : 'border-transparent text-[#b6b2aa]'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      )}

      <div ref={scrollRef} className="max-h-[78vh] overflow-y-auto px-5 py-8 sm:px-8">
        {step === 0 && (
          <div>
            <h3 className="font-[var(--font-serif)] text-3xl leading-tight text-[#1a1a1a]">What are you trying to solve?</h3>
            <p className="mt-2 text-sm text-[#7a7770]">Pick the challenge closest to your situation.</p>
            <div className="mt-7 grid gap-px border border-[#e2e0db] bg-[#e2e0db] md:grid-cols-2">
              {CHALLENGES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setChallenge(item.id)
                    setCAns({})
                    setStep(1)
                  }}
                  className="bg-white p-4 text-left transition hover:bg-[#f7f6f3]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-lg text-[#c8281e]">{item.icon}</span>
                    <span className="text-sm font-semibold text-[#1a1a1a]">{item.label}</span>
                  </div>
                  <p className="pl-8 pt-1 text-xs leading-relaxed text-[#7a7770]">{item.short}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && currentChallenge && (
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl text-[#c8281e]">{currentChallenge.icon}</span>
              <h3 className="font-[var(--font-serif)] text-3xl leading-tight text-[#1a1a1a]">{currentChallenge.label}</h3>
            </div>
            <p className="mt-2 text-sm text-[#7a7770]">
              {currentChallenge.id === 'other' ? "Tell us what you're dealing with." : 'These help us tailor your scoping brief to your exact situation.'}
            </p>
            <div className="mt-7 space-y-6">
              {currentChallenge.questions.map((question) => (
                <div key={question.key}>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a]">{question.label}</label>
                  <div className="flex flex-wrap gap-2">
                    {question.opts.map((option) => (
                      <button
                        key={option}
                        onClick={() => setCAns((prev) => ({ ...prev, [question.key]: option }))}
                        className={`${buttonBase} ${cAns[question.key] === option ? 'border-[#c8281e] bg-[#c8281e] text-white' : 'border-[#e2e0db] bg-white text-[#1a1a1a] hover:border-[#c8281e]'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {currentChallenge.id === 'other' && (
              <div className="mt-6">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a]">Describe your situation</label>
                <textarea
                  value={freeText}
                  onChange={(event) => setFreeText(event.target.value)}
                  rows={4}
                  className="w-full rounded-sm border border-[#e2e0db] px-3 py-2 text-sm outline-none ring-[#c8281e] focus:ring-1"
                />
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => setStep(0)} className="text-sm text-[#7a7770] hover:text-[#1a1a1a]">← Back</button>
              <button
                onClick={() => setStep(2)}
                disabled={currentChallenge.id !== 'other' && !challengeQuestionsDone}
                className="rounded-sm bg-[#c8281e] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#a8201a] disabled:opacity-35"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-[var(--font-serif)] text-3xl leading-tight text-[#1a1a1a]">A bit of context</h3>
            <p className="mt-2 text-sm text-[#7a7770]">Helps us match against similar projects we&apos;ve delivered.</p>

            <div className="mt-7 space-y-7">
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a]">Your industry</label>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map((value) => (
                    <button key={value} onClick={() => setIndustry(value)} className={`${buttonBase} ${industry === value ? 'border-[#c8281e] bg-[#c8281e] text-white' : 'border-[#e2e0db] bg-white text-[#1a1a1a]'}`}>{value}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a]">Current control platform</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((value) => (
                    <button key={value} onClick={() => setPlatform(value)} className={`${buttonBase} ${platform === value ? 'border-[#c8281e] bg-[#c8281e] text-white' : 'border-[#e2e0db] bg-white text-[#1a1a1a]'}`}>{value}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a]">Timeline</label>
                <div className="grid gap-px border border-[#e2e0db] bg-[#e2e0db] sm:grid-cols-2">
                  {TIMELINES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTimeline(item.id)}
                      className={`p-3 text-left transition ${timeline === item.id ? 'bg-[#f7f6f3]' : 'bg-white hover:bg-[#f7f6f3]'}`}
                    >
                      <span className="block text-sm font-semibold text-[#1a1a1a]">{item.label}</span>
                      <span className="text-xs text-[#7a7770]">{item.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {challenge !== 'other' && (
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a]">Anything else? <span className="font-normal text-[#7a7770]">(optional)</span></label>
                  <textarea value={freeText} onChange={(event) => setFreeText(event.target.value)} rows={3} className="w-full rounded-sm border border-[#e2e0db] px-3 py-2 text-sm outline-none ring-[#c8281e] focus:ring-1" />
                </div>
              )}

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a]">Photos or documents <span className="font-normal text-[#7a7770]">(optional — up to 5)</span></label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.dwg,.dxf"
                  onChange={handleFile}
                  className="w-full rounded-sm border border-dashed border-[#7a7770] px-3 py-2 text-sm"
                />
                <p className="mt-2 text-xs text-[#7a7770]">Allowed: PDF, DOC, DOCX, JPG, PNG, XLSX, DWG, DXF. Max 10MB per file.</p>
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-sm border border-[#e2e0db] bg-[#f7f6f3] px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-[#1a1a1a]">{file.name}</p>
                          <p className="text-[11px] text-[#7a7770]">{formatSize(file.size)}</p>
                        </div>
                        <button onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== index))} className="text-sm text-[#7a7770] hover:text-[#1a1a1a]">Remove</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => setStep(1)} className="text-sm text-[#7a7770] hover:text-[#1a1a1a]">← Back</button>
              <button onClick={() => setStep(3)} disabled={!industry || !platform || !timeline} className="rounded-sm bg-[#c8281e] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#a8201a] disabled:opacity-35">Continue →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-[var(--font-serif)] text-3xl leading-tight text-[#1a1a1a]">Almost there</h3>
            <p className="mt-2 text-sm text-[#7a7770]">We&apos;ll generate your scoping brief in about 10 seconds.</p>

            <div className="mt-7 space-y-4">
              {[
                { key: 'name', label: 'Your name', type: 'text', placeholder: 'e.g. Sarah Chen' },
                { key: 'company', label: 'Company', type: 'text', placeholder: 'e.g. Acme Dairy' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'e.g. sarah@acmedairy.com.au' },
                { key: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: 'e.g. 0412 345 678' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a]">{field.label}</label>
                  <input
                    type={field.type}
                    value={contact[field.key as keyof typeof contact]}
                    onChange={(event) =>
                      setContact((prev) => ({
                        ...prev,
                        [field.key]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="w-full rounded-sm border border-[#e2e0db] px-3 py-2 text-sm outline-none ring-[#c8281e] focus:ring-1"
                  />
                </div>
              ))}

              <input
                type="text"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
                className="hidden"
              />

              <div className="rounded-sm border border-[#e2e0db] bg-[#f7f6f3] px-4 py-3">
                <p className="text-xs leading-relaxed text-[#7a7770]">Your brief appears on screen immediately. We&apos;ll follow up within one business day — no obligations.</p>
              </div>

              {error && <p className="text-sm text-[#c8281e]">{error}</p>}

              <div className="flex items-center justify-between">
                <button onClick={() => setStep(2)} className="text-sm text-[#7a7770] hover:text-[#1a1a1a]">← Back</button>
                <button onClick={submit} disabled={!canSubmit || loading} className="rounded-sm bg-[#c8281e] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#a8201a] disabled:opacity-35">Generate My Scoping Brief →</button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && loading && !report && !fallbackMode && (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-6">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e2e0db] border-t-[#c8281e]" />
            <p className="text-sm text-[#1a1a1a]">{loadingMessages[loadingMsgIndex]}</p>
          </div>
        )}

        {step === 4 && fallbackMode && (
          <div>
            <h3 className="font-[var(--font-serif)] text-3xl leading-tight text-[#1a1a1a]">Thanks {contact.name}.</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1a1a1a]">
              We weren&apos;t able to generate your scoping brief right now, but we&apos;ve received all your project details. One of our engineers will review what you&apos;ve shared and be in touch within one business day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="tel:0398076896"
                className="rounded-sm bg-[#c8281e] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#a8201a]"
              >
                Call us — (03) 9807 6896
              </a>
              <button
                onClick={resetTool}
                className="rounded-sm border border-[#e2e0db] px-5 py-2 text-sm font-semibold text-[#1a1a1a] transition hover:border-[#c8281e]"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {step === 4 && !fallbackMode && report && currentChallenge && (
          <div>
            <div className="mb-7 border-b border-[#e2e0db] pb-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#c8281e]">Scoping Brief — {currentChallenge.label}</span>
              <h3 className="mt-2 font-[var(--font-serif)] text-3xl leading-tight text-[#1a1a1a]">{report.headline}</h3>
              <p className="mt-1 text-xs text-[#7a7770]">Prepared for {contact.name} at {contact.company}</p>
            </div>

            <p className="mb-7 text-sm leading-relaxed text-[#1a1a1a]">{report.overview}</p>

            <div className="mb-7 rounded-sm border border-[#e2e0db] bg-white p-5">
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#c8281e]">Key Considerations for Your Project</h4>
              <ol className="space-y-3">
                {report.key_considerations.map((item, index) => (
                  <li key={`${index}-${item.slice(0, 24)}`} className="flex gap-3 text-sm text-[#1a1a1a]">
                    <span className="pt-0.5 text-xs font-semibold text-[#c8281e]">{index + 1}.</span>
                    <p className="leading-relaxed">{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mb-7 rounded-sm border border-[#e2e0db] bg-[#f7f6f3] px-5 py-5">
              <h4 className="mb-1 font-[var(--font-serif)] text-xl text-[#1a1a1a]">Questions Worth Thinking Through</h4>
              <p className="mb-4 text-sm text-[#4d4a45]">These prompts can help you prepare for early project conversations and make sure important details get discussed.</p>
              <ul className="space-y-3">
                {report.questions_to_think_about.map((item, index) => (
                  <li key={`${index}-${item.slice(0, 24)}`} className="flex gap-2 text-sm text-[#1a1a1a]">
                    <span className="font-semibold text-[#7a7770]">Q{index + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-7 rounded-sm border border-[#e2e0db] bg-white p-5">
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#c8281e]">What to Have Ready</h4>
              <ul className="space-y-2">
                {report.what_to_have_ready.map((item, index) => (
                  <li key={`${index}-${item.slice(0, 24)}`} className="flex items-start gap-2 text-sm text-[#1a1a1a]">
                    <input type="checkbox" checked readOnly aria-label={`Checklist item ${index + 1}`} className="mt-0.5 h-4 w-4 rounded border-[#c8c4bc] accent-[#c8281e]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-[#1a1a1a]">Want to discuss this further?</span>
              <a
                href={`mailto:info@metromotioncontrols.com.au?subject=${encodeURIComponent(`Scoping Enquiry — ${contact.company}`)}`}
                className="rounded-sm bg-[#c8281e] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#a8201a]"
              >
                Email info@metromotioncontrols.com.au
              </a>
              <a href="tel:0398076896" className="text-sm text-[#7a7770] hover:text-[#1a1a1a]">Call (03) 9807 6896</a>
              <button
                onClick={resetTool}
                className="ml-auto text-sm text-[#7a7770] hover:text-[#1a1a1a]"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#e2e0db] px-5 py-3 text-center text-[11px] text-[#7a7770]">
        Metromotion Controls · 39 Sunhill Road, Mount Waverley VIC 3149 · (03) 9807 6896
      </div>
    </div>
  )
}
