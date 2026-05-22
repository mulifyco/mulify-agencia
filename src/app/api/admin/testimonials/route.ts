import { NextRequest, NextResponse } from 'next/server'
import { admin } from '@/lib/admin-supabase'

export async function GET() {
  const { data, error } = await admin().from('Testimonial').select('*').order('order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { count } = await admin().from('Testimonial').select('*', { count: 'exact', head: true })
    const now = new Date().toISOString()
    const { data, error } = await admin().from('Testimonial').insert({
      id: crypto.randomUUID(),
      nameTr: body.nameTr,
      nameEn: body.nameEn,
      roleTr: body.roleTr ?? null,
      roleEn: body.roleEn ?? null,
      company: body.company ?? null,
      contentTr: body.contentTr,
      contentEn: body.contentEn,
      rating: body.rating ?? 5,
      featured: body.featured ?? false,
      published: body.published ?? true,
      order: count ?? 0,
      createdAt: now,
      updatedAt: now,
    }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
