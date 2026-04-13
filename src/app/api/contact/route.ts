import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const FROM = 'Metromotion Controls <noreply@metromotioncontrols.com.au>'
const TEAM_EMAILS = ['info@metromotioncontrols.com.au', 'tommy.kim@metromotioncontrols.com.au']

function notificationHtml(data: {
  name: string
  company: string
  email: string
  phone: string | null
  service: string
  message: string
}) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;background:#f7f6f3;font-weight:500;width:140px;vertical-align:top;">${label}</td><td style="padding:8px 12px;border-left:1px solid #e5e4e0;">${value.replace(/\n/g, '<br>')}</td></tr>`

  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;color:#1a1a18;max-width:600px;margin:0 auto;padding:24px;">
  <div style="border-bottom:3px solid #c8281e;padding-bottom:16px;margin-bottom:24px;">
    <strong style="font-size:18px;">New enquiry from ${data.name}</strong><br>
    <span style="color:#666;font-size:14px;">${data.company}</span>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e5e4e0;">
    ${row('Name', data.name)}
    ${row('Company', data.company)}
    ${row('Email', `<a href="mailto:${data.email}">${data.email}</a>`)}
    ${row('Phone', data.phone ?? 'Not provided')}
    ${row('Service', data.service)}
    ${row('Message', data.message)}
    ${row('Submitted', new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }))}
  </table>
  <p style="margin-top:24px;font-size:13px;color:#888;">
    Reply directly to this email or visit your
    <a href="https://supabase.com" style="color:#c8281e;">Supabase dashboard</a>
    to manage enquiries.
  </p>
</body>
</html>`
}

function confirmationHtml(name: string, service: string, message: string) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;color:#1a1a18;max-width:600px;margin:0 auto;padding:24px;">
  <div style="border-bottom:3px solid #c8281e;padding-bottom:16px;margin-bottom:24px;">
    <strong style="font-size:18px;">Thanks for reaching out, ${name}.</strong>
  </div>
  <p style="font-size:15px;line-height:1.7;">
    We have received your enquiry and a member of our engineering team will get back to you within one business day.
  </p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e5e4e0;margin:24px 0;">
    <tr><td style="padding:8px 12px;background:#f7f6f3;font-weight:500;width:140px;">Service</td><td style="padding:8px 12px;border-left:1px solid #e5e4e0;">${service}</td></tr>
    <tr><td style="padding:8px 12px;background:#f7f6f3;font-weight:500;">Your message</td><td style="padding:8px 12px;border-left:1px solid #e5e4e0;">${message.replace(/\n/g, '<br>')}</td></tr>
  </table>
  <p style="font-size:14px;color:#666;line-height:1.65;">
    If your matter is urgent, you can call us on <strong>(03) 9807 6896</strong> or email
    <a href="mailto:info@metromotioncontrols.com.au" style="color:#c8281e;">info@metromotioncontrols.com.au</a>.
  </p>
  <p style="font-size:13px;color:#999;margin-top:32px;border-top:1px solid #e5e4e0;padding-top:16px;">
    Metromotion Controls Pty Ltd &mdash; 39 Sunhill Road, Mount Waverley VIC 3149
  </p>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY)

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, company, email, phone, service, message } = body as {
    name?: string
    company?: string
    email?: string
    phone?: string | null
    service?: string
    message?: string
  }

  if (!name || !company || !email || !service || !message) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  // Save to Supabase
  const { error: dbError } = await supabaseAdmin.from('enquiries').insert({
    name,
    company,
    email,
    phone: phone ?? null,
    service,
    message,
    status: 'new',
  })

  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }

  // Send emails (non-blocking — don't fail the submission if email fails)
  const emailData = { name, company, email, phone: phone ?? null, service, message }

  await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: TEAM_EMAILS,
      replyTo: email,
      subject: `New enquiry from ${name} \u2014 ${company}`,
      html: notificationHtml(emailData),
    }),
    resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Thanks for contacting Metromotion Controls',
      html: confirmationHtml(name, service, message),
    }),
  ])

  return NextResponse.json({ success: true })
}
