import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { sendContactNotification } from '@/lib/email'

function admin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  company: z.string().max(100).optional(),
  service: z.string().max(100).optional(),
  message: z.string().min(10).max(5000),
  budget: z.string().max(100).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = ContactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Geçersiz form verileri', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, company, service, message, budget } = result.data
    const now = new Date().toISOString()

    const { error: dbError } = await admin().from('Lead').insert({
      id: crypto.randomUUID(),
      name, email,
      phone: phone ?? null,
      company: company ?? null,
      service: service ?? null,
      message,
      budget: budget ?? null,
      status: 'new',
      source: 'website',
      createdAt: now,
      updatedAt: now,
    })

    if (dbError) {
      console.error('[contact] DB insert error:', dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // Await email — fire-and-forget silently dies in serverless before the promise resolves
    console.log('[contact] Sending email to:', process.env.ADMIN_EMAIL)
    try {
      const emailResult = await sendContactNotification(
        { name, email, phone, company, service, message, budget },
        now
      )
      console.log('[contact] Email result:', JSON.stringify(emailResult))
    } catch (emailErr) {
      console.error('[contact] Email error:', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
