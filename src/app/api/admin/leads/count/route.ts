import { NextResponse } from 'next/server'
import { admin } from '@/lib/admin-supabase'

export async function GET() {
  const { count, error } = await admin()
    .from('Lead')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new')

  if (error) return NextResponse.json({ count: 0 })
  return NextResponse.json({ count: count ?? 0 })
}
