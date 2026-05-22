import { NextRequest, NextResponse } from 'next/server'
import { admin } from '@/lib/admin-supabase'

export async function GET() {
  const { data, error } = await admin().from('PricingPlan').select('*').order('order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { count } = await admin().from('PricingPlan').select('*', { count: 'exact', head: true })
    const now = new Date().toISOString()
    const { data, error } = await admin().from('PricingPlan').insert({
      id: crypto.randomUUID(),
      slug: body.slug,
      nameTr: body.nameTr,
      nameEn: body.nameEn,
      descTr: body.descTr ?? null,
      descEn: body.descEn ?? null,
      price: body.price ?? 0,
      currency: body.currency ?? 'USD',
      period: body.period ?? 'month',
      features: body.features ?? [],
      ctaText: body.ctaText ?? null,
      highlighted: body.highlighted ?? false,
      published: body.published ?? true,
      order: body.order ?? count ?? 0,
      createdAt: now,
      updatedAt: now,
    }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
