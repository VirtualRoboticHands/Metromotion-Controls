import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, phone, email, challenge, message } = body

    // Validate required fields
    if (!name || !company || !email || !challenge) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const combinedMessage = [
      challenge ? `Challenge: ${challenge}` : null,
      message || null,
    ]
      .filter(Boolean)
      .join('\n\n')

    const { error } = await supabase
      .from('contact_enquiries')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          message: combinedMessage || null,
        },
      ])

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
