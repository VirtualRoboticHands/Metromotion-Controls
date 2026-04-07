import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

type ScopingReport = {
  headline: string
  overview: string
  scope_items: string[]
  timeline_estimate: string
  common_pitfalls: string[]
  questions_to_ask: string[]
  metromotion_approach: string
}

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const FILE_SIZE_LIMIT_BYTES = 10 * 1024 * 1024
const FILE_COUNT_LIMIT = 5
const ALLOWED_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'xlsx', 'dwg', 'dxf'])

const ipRequestMap = new Map<string, number[]>()

const fallbackReport: ScopingReport = {
  headline: 'Project Scoping Brief',
  overview:
    'Based on your questionnaire responses, this project should begin with discovery and risk review, then move into detailed design and staged implementation. The practical sequencing will depend on production constraints, integration touchpoints, and changeover windows.',
  scope_items: [
    'Current-state system and documentation review',
    'Functional scope definition and interface mapping',
    'Detailed controls and integration design package',
    'Build, test, and FAT before site deployment',
    'Staged site commissioning with operator handover',
    'Post go-live support and optimisation',
  ],
  timeline_estimate:
    'Typical delivery runs in phases over several weeks to a few months, depending on discovery quality, site access, and cutover constraints.',
  common_pitfalls: [
    'Insufficient upfront discovery on legacy assets and interfaces',
    'Late involvement of operations and maintenance stakeholders',
    'Under-scoped testing before site deployment',
    'Unclear cutover ownership across vendors or teams',
  ],
  questions_to_ask: [
    'How will cutover risk be managed while maintaining production continuity?',
    'What testing evidence will be available before site commissioning?',
    'How will integration dependencies be validated across systems?',
    'What support model applies in the first weeks after go-live?',
    'How will operator training and handover be structured?',
    'What are the highest-risk assumptions in the current scope?',
  ],
  metromotion_approach:
    'Metromotion typically starts with structured discovery, then aligns scope, testing, and commissioning plans to plant realities. We prioritise pragmatic risk management and clear ownership so delivery stays predictable from design through handover.',
}

const parseReport = (input: unknown): ScopingReport | null => {
  if (!input || typeof input !== 'object') return null
  const report = input as Partial<ScopingReport>
  const scopeItems = report.scope_items
  const commonPitfalls = report.common_pitfalls
  const questionsToAsk = report.questions_to_ask
  const requiredArrays = [scopeItems, commonPitfalls, questionsToAsk]
  if (
    typeof report.headline !== 'string' ||
    typeof report.overview !== 'string' ||
    typeof report.timeline_estimate !== 'string' ||
    typeof report.metromotion_approach !== 'string' ||
    requiredArrays.some((value) => !Array.isArray(value) || value.some((entry) => typeof entry !== 'string'))
  ) {
    return null
  }

  return {
    headline: report.headline,
    overview: report.overview,
    scope_items: scopeItems as string[],
    timeline_estimate: report.timeline_estimate,
    common_pitfalls: commonPitfalls as string[],
    questions_to_ask: questionsToAsk as string[],
    metromotion_approach: report.metromotion_approach,
  }
}

const getClientIp = (request: NextRequest): string => {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now()
  const recent = (ipRequestMap.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) {
    ipRequestMap.set(ip, recent)
    return false
  }

  recent.push(now)
  ipRequestMap.set(ip, recent)
  return true
}

const buildPrompt = (input: {
  challengeLabel: string
  challengeShort: string
  challengeAnswers: Record<string, string>
  industry: string
  platform: string
  timeline: string
  freeText: string
  fileNames: string[]
  contactName: string
  contactCompany: string
}) => {
  const answerLines = Object.entries(input.challengeAnswers)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n')

  return `You are a senior automation engineer at Metromotion Controls.
Generate a practical project scoping brief for a prospective industrial client.
Output valid JSON only, no markdown.

Inputs:
Challenge: ${input.challengeLabel} — ${input.challengeShort}
Challenge answers:
${answerLines || '- none provided'}
Industry: ${input.industry}
Current platform: ${input.platform}
Timeline: ${input.timeline}
Additional context: ${input.freeText || 'None'}
Attachments: ${input.fileNames.join(', ') || 'None'}
Contact: ${input.contactName} at ${input.contactCompany}

Respond with shape:
{
  "headline": "specific headline for their situation",
  "overview": "2-3 sentence summary",
  "scope_items": ["5-7 specific scope items"],
  "timeline_estimate": "phase-based realistic guidance",
  "common_pitfalls": ["3-4 pitfalls"],
  "questions_to_ask": ["6-8 thoughtful follow-up questions for discussion with any integrator"],
  "metromotion_approach": "2-3 sentence Metromotion approach"
}`
}

async function generateReport(prompt: string): Promise<ScopingReport> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return fallbackReport

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    return fallbackReport
  }

  const data = (await response.json()) as { content?: Array<{ type: string; text?: string }> }
  const text = data.content?.filter((block) => block.type === 'text').map((block) => block.text || '').join('') || ''

  try {
    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
    return parseReport(parsed) || fallbackReport
  } catch {
    return fallbackReport
  }
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request)
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
  }

  const formData = await request.formData()
  const honeypot = String(formData.get('honeypot') || '')
  if (honeypot.trim()) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 })
  }

  const challenge = String(formData.get('challenge') || '').trim()
  const challengeLabel = String(formData.get('challengeLabel') || '').trim()
  const challengeShort = String(formData.get('challengeShort') || '').trim()
  const industry = String(formData.get('industry') || '').trim()
  const platform = String(formData.get('platform') || '').trim()
  const timeline = String(formData.get('timeline') || '').trim()
  const freeText = String(formData.get('freeText') || '').trim()
  const contactName = String(formData.get('contactName') || '').trim()
  const contactCompany = String(formData.get('contactCompany') || '').trim()
  const contactEmail = String(formData.get('contactEmail') || '').trim()
  const contactPhone = String(formData.get('contactPhone') || '').trim()

  const rawAnswers = String(formData.get('challengeAnswers') || '{}')
  let challengeAnswers: Record<string, string> = {}
  try {
    challengeAnswers = JSON.parse(rawAnswers) as Record<string, string>
  } catch {
    return NextResponse.json({ error: 'Invalid challenge answers.' }, { status: 400 })
  }

  if (!challenge || !industry || !platform || !timeline || !contactName || !contactCompany || !contactEmail) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const uploadFiles = formData.getAll('files').filter((entry): entry is File => entry instanceof File)
  if (uploadFiles.length > FILE_COUNT_LIMIT) {
    return NextResponse.json({ error: 'Maximum of 5 files allowed.' }, { status: 400 })
  }

  for (const file of uploadFiles) {
    if (file.size > FILE_SIZE_LIMIT_BYTES) {
      return NextResponse.json({ error: `${file.name} exceeds 10MB limit.` }, { status: 400 })
    }
    const extension = file.name.split('.').pop()?.toLowerCase() || ''
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json({ error: `${file.name} is not an allowed format.` }, { status: 400 })
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Server configuration missing.' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)

  const filePaths: string[] = []
  for (const file of uploadFiles) {
    const safeBase = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const path = `scoping/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeBase}`

    const { error } = await supabase.storage.from('scoping-files').upload(path, file, {
      contentType: file.type || undefined,
      upsert: false,
    })

    if (error) {
      return NextResponse.json({ error: `Failed to upload file ${file.name}.` }, { status: 500 })
    }

    filePaths.push(path)
  }

  const report = await generateReport(
    buildPrompt({
      challengeLabel,
      challengeShort,
      challengeAnswers,
      industry,
      platform,
      timeline,
      freeText,
      fileNames: uploadFiles.map((file) => file.name),
      contactName,
      contactCompany,
    }),
  )

  const { error: insertError } = await supabase.from('scoping_leads').insert({
    challenge,
    challenge_answers: challengeAnswers,
    industry,
    platform,
    timeline,
    free_text: freeText || null,
    contact_name: contactName,
    contact_company: contactCompany,
    contact_email: contactEmail,
    contact_phone: contactPhone || null,
    report,
    files: filePaths,
  })

  if (insertError) {
    return NextResponse.json({ error: 'Unable to save scoping lead.' }, { status: 500 })
  }

  return NextResponse.json({ report })
}
