import { NextRequest, NextResponse } from 'next/server'
import { admin } from '@/lib/admin-supabase'

export async function GET() {
  const { data, error } = await admin().from('Lead').select('*').order('createdAt', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const now = new Date().toISOString()
    const { data, error } = await admin().from('Lead').insert({
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      company: body.company ?? null,
      service: body.service ?? null,
      message: body.message,
      budget: body.budget ?? null,
      status: body.status ?? 'new',
      source: body.source ?? 'admin',
      createdAt: now,
      updatedAt: now,
    }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
