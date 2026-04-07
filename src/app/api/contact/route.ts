import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, phone, email, challenge, message } = body

    // Validate required fields
    if (!name || !company || !email || !challenge) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // If Supabase is configured, store the submission
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name, company, phone, email, challenge, message,
          submitted_at: new Date().toISOString(),
        }])

      if (error) {
        console.error('Supabase insert error:', error)
        // Don't fail the request - still send notification
      }
    }

    // TODO: Add email notification (Resend, SendGrid, etc.)
    // For now, log the submission
    console.log('New contact submission:', { name, company, email, challenge })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
