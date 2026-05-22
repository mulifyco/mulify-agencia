import { NextRequest, NextResponse } from 'next/server'
import { admin } from '@/lib/admin-supabase'

export async function GET() {
  const { data, error } = await admin().from('TeamMember').select('*').order('order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { count } = await admin().from('TeamMember').select('*', { count: 'exact', head: true })
    const now = new Date().toISOString()
    const { data, error } = await admin().from('TeamMember').insert({
      id: crypto.randomUUID(),
      nameTr: body.nameTr,
      nameEn: body.nameEn,
      roleTr: body.roleTr,
      roleEn: body.roleEn,
      bioTr: body.bioTr ?? null,
      bioEn: body.bioEn ?? null,
      linkedin: body.linkedin ?? null,
      twitter: body.twitter ?? null,
      github: body.github ?? null,
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
