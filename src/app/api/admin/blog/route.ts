import { NextRequest, NextResponse } from 'next/server'
import { admin } from '@/lib/admin-supabase'

export async function GET() {
  const { data, error } = await admin().from('Post').select('*').order('createdAt', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const now = new Date().toISOString()
    const { data, error } = await admin().from('Post').insert({
      id: crypto.randomUUID(),
      slug: body.slug,
      titleTr: body.titleTr,
      titleEn: body.titleEn,
      excerptTr: body.excerptTr ?? null,
      excerptEn: body.excerptEn ?? null,
      contentTr: body.contentTr ?? '',
      contentEn: body.contentEn ?? '',
      tags: body.tags ?? [],
      published: body.published ?? false,
      publishedAt: body.published ? now : null,
      createdAt: now,
      updatedAt: now,
    }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
