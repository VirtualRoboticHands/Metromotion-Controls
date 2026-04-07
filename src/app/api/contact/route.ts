import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, phone, service, message } = body

    if (!name || !company || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const { error: insertError } = await supabase.from('enquiries').insert({
      name,
      company,
      email,
      phone: phone || null,
      service,
      message,
      status: 'new',
    })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save enquiry.' }, { status: 500 })
    }

    if (!resend) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
    }

    const textBody = [
      'A new enquiry has been submitted via the Metromotion Controls contact page.',
      '',
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Service: ${service}`,
      '',
      'Message:',
      message,
    ].join('\n')

    const subjectCompany = company?.trim() ? company : 'Unknown Company'

    const { error: emailError } = await resend.emails.send({
      from: 'noreply@metromotioncontrols.com.au',
      to: ['info@metromotioncontrols.com.au', 'tommy.kim@metromotioncontrols.com.au'],
      subject: `New Enquiry: ${service} — ${subjectCompany}`,
      text: textBody,
    })

    if (emailError) {
      console.error('Resend error:', emailError)
      return NextResponse.json({ error: 'Enquiry was saved but email notification failed.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form API error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
