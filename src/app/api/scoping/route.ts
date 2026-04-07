import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

type ScopingReport = {
  headline: string
  overview: string
  key_considerations: string[]
  questions_to_think_about: string[]
  what_to_have_ready: string[]
}

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const FILE_SIZE_LIMIT_BYTES = 10 * 1024 * 1024
const FILE_COUNT_LIMIT = 5
const ALLOWED_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'xlsx', 'dwg', 'dxf'])

const ipRequestMap = new Map<string, number[]>()

const parseReport = (input: unknown): ScopingReport | null => {
  if (!input || typeof input !== 'object') return null
  const report = input as Partial<ScopingReport>
  const keyConsiderations = report.key_considerations
  const questionsToThinkAbout = report.questions_to_think_about
  const whatToHaveReady = report.what_to_have_ready
  const requiredArrays = [keyConsiderations, questionsToThinkAbout, whatToHaveReady]
  if (
    typeof report.headline !== 'string' ||
    typeof report.overview !== 'string' ||
    requiredArrays.some((value) => !Array.isArray(value) || value.some((entry) => typeof entry !== 'string'))
  ) {
    return null
  }

  return {
    headline: report.headline,
    overview: report.overview,
    key_considerations: keyConsiderations as string[],
    questions_to_think_about: questionsToThinkAbout as string[],
    what_to_have_ready: whatToHaveReady as string[],
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

const stripMarkdownCodeFences = (value: string): string =>
  value
    .replace(/^\s*```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim()

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

A prospective client has completed our project scoping tool. Generate a helpful scoping brief based on their inputs:

What they're looking to do: ${input.challengeLabel} (${input.challengeShort})
Their answers to scoping questions:
${answerLines || '- none provided'}

Industry: ${input.industry}
Current platform/s: ${input.platform}
Additional notes: ${input.freeText || 'None provided'}
Attachments: ${input.fileNames.join(', ') || 'None'}
Contact: ${input.contactName} at ${input.contactCompany}`
}

const SYSTEM_PROMPT = `You are a project scoping assistant for Metromotion Controls, a Melbourne-based industrial automation and control systems integrator. Your role is to help prospective clients think through their automation project by highlighting the key considerations they should be aware of.

ABOUT METROMOTION CONTROLS:
- Melbourne-based, delivering nationally across Australia since 2012
- Specialise in: PLC programming (Allen-Bradley, Siemens, Schneider, Omron), SCADA and HMI development (Ignition, AVEVA, FactoryTalk, Citect, WinCC), control panel engineering, industrial data/IIoT, OT networking, functional safety (AS 62061, AS 4024), and commissioning
- Key industries: food and beverage, dairy, packaging, pet food, FMCG, general manufacturing
- Notable clients: Chobani, Lactalis, Arnott's, Bulla, Real Pet Food, Orora, Beak & Johnston
- Engineering approach: ISA-88 batch principles, ISA-101 HMI design, structured FAT/SAT processes, full documentation handover
- Platforms: Rockwell ControlLogix/CompactLogix, Siemens S7-1500/S7-1200, Ignition SCADA, AVEVA, FactoryTalk, EPLAN, OPC UA, MQTT

AUDIENCE:
The reader is a project engineer or automation manager at a manufacturing or processing facility. They are technically competent. They know their plant. They are in the early stages of thinking about a project and want to make sure they haven't missed anything important.

PURPOSE:
Generate a brief that helps them think through their project. It should feel like a helpful checklist from a senior engineer, not a sales pitch.

STRICT RULES:
- ONLY generate project scoping briefs. If the input does not relate to industrial automation or process control, respond with exactly: {"error": "This tool is designed for industrial automation project scoping only."}
- NEVER include pricing, cost estimates, hourly rates, or budget ranges.
- NEVER include timeline estimates, durations, or scheduling guidance.
- NEVER mention competitors by name or make comparisons to other integrators.
- NEVER give advice on hiring, staffing, or personnel decisions.
- NEVER provide safety-critical guidance that someone might act on without proper engineering review.
- NEVER make promises or guarantees on behalf of Metromotion Controls.
- NEVER use em dashes.
- NEVER use marketing language: "innovative", "cutting-edge", "seamless", "holistic", "unlock", "leverage", "empower", "game-changer", "next-level", "We don't just X, we Y".
- Use Australian English spelling.
- Keep the tone warm, practical, and helpful. This is for the client's benefit.
- Be specific where it helps (name standards, protocols, platforms relevant to their situation) but don't overwhelm with jargon.

OUTPUT FORMAT:
Respond with valid JSON only. No markdown, no code fences, no preamble, no explanation. The JSON must have this exact structure:
{
  "headline": "A clear, specific one-line summary of what their project involves",
  "overview": "2-3 sentences describing what a project like this typically looks like. Written for the client, not for engineers. Help them understand what they're getting into.",
  "key_considerations": ["5-6 important things they should be thinking about for this specific type of project. Each one should be a short paragraph (2-3 sentences) that explains why it matters and what to look out for. These should be genuinely useful, not generic."],
  "questions_to_think_about": ["6-8 questions they should think through before engaging any integrator. These help them prepare and make sure the important things get discussed early. Frame them as friendly prompts, not interrogation. For example: 'Do you have up-to-date drawings and an I/O list for the existing system? This saves significant time during the design phase.'"],
  "what_to_have_ready": ["3-4 documents or pieces of information that would be useful to have on hand when discussing this project with an integrator. For example: P&IDs, existing PLC program backups, I/O lists, network drawings."]
}`

async function generateReport(prompt: string): Promise<ScopingReport | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  console.log('Scoping API Anthropic env check:', { hasAnthropicApiKey: Boolean(apiKey) })
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is missing')
    return null
  }

  const requestBody = {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    temperature: 0.3,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user' as const, content: prompt }],
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Anthropic API request failed', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      return null
    }

    const data = (await response.json()) as { content?: Array<{ type: string; text?: string }> }
    const text = data.content?.[0]?.text || ''
    if (!text) {
      console.error('Anthropic response missing text content', { data })
      return null
    }

    const cleaned = stripMarkdownCodeFences(text)
    const parsed = JSON.parse(cleaned)
    const report = parseReport(parsed)
    if (!report) {
      console.error('Anthropic response did not match expected report shape', { parsed })
      return null
    }

    return report
  } catch (error) {
    console.error('Error generating report from Anthropic', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
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
    const truncatedFreeText = freeText.slice(0, 1000)
    const contactName = String(formData.get('contactName') || '').trim()
    const contactCompany = String(formData.get('contactCompany') || '').trim()
    const contactEmail = String(formData.get('contactEmail') || '').trim()
    const contactPhone = String(formData.get('contactPhone') || '').trim()

    const rawAnswers = String(formData.get('challengeAnswers') || '{}')
    let challengeAnswers: Record<string, string> = {}
    try {
      challengeAnswers = JSON.parse(rawAnswers) as Record<string, string>
    } catch (error) {
      console.error('Invalid challenge answers JSON', { rawAnswers, error })
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
      console.error('Missing Supabase configuration', {
        hasSupabaseUrl: Boolean(supabaseUrl),
        hasServiceRoleKey: Boolean(serviceRoleKey),
      })
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
        console.error('Failed to upload scoping file', { fileName: file.name, error })
        return NextResponse.json({ error: `Failed to upload file ${file.name}.` }, { status: 500 })
      }

      filePaths.push(path)
    }

    const { data: insertedLead, error: insertError } = await supabase.from('scoping_leads').insert({
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
      report: { status: 'generation_pending' },
      files: filePaths,
    }).select('id').single()

    if (insertError || !insertedLead?.id) {
      console.error('Unable to save scoping lead', { insertError, insertedLead })
      return NextResponse.json({ error: 'Unable to save scoping lead.' }, { status: 500 })
    }

    const report = await generateReport(
      buildPrompt({
        challengeLabel,
        challengeShort,
        challengeAnswers,
        industry,
        platform,
        timeline,
        freeText: truncatedFreeText,
        fileNames: uploadFiles.map((file) => file.name),
        contactName,
        contactCompany,
      }),
    )

    if (!report) {
      const { error: fallbackUpdateError } = await supabase
        .from('scoping_leads')
        .update({ report: { status: 'generation_unavailable' } })
        .eq('id', insertedLead.id)

      if (fallbackUpdateError) {
        console.error('Failed to mark report as generation_unavailable', { id: insertedLead.id, fallbackUpdateError })
      }

      return NextResponse.json({ success: true, fallback: true })
    }

    const { error: reportUpdateError } = await supabase
      .from('scoping_leads')
      .update({ report })
      .eq('id', insertedLead.id)

    if (reportUpdateError) {
      console.error('Failed to save generated report', { id: insertedLead.id, reportUpdateError })
      return NextResponse.json({ success: true, fallback: true })
    }

    return NextResponse.json({ success: true, report, fallback: false })
  } catch (error) {
    console.error('Unhandled error in scoping POST route', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
