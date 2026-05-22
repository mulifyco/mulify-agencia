import { NextResponse } from 'next/server'
import { admin } from '@/lib/admin-supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await admin()
    .from('PricingPlan')
    .select('*')
    .eq('published', true)
    .order('order', { ascending: true })

  if (error) {
    console.error('[/api/pricing] query error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log('[/api/pricing] rows returned:', data?.length)

  return NextResponse.json(data ?? [])
}
