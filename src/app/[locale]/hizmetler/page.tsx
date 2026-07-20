import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import ServicesListClient from './services-list-client'
import type { Service } from '@/lib/db-types'
import { SERVICE_CARD_COLUMNS } from '@/lib/public-content'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'tr' ? 'Hizmetler' : 'Services',
    description: locale === 'tr'
      ? 'Web tasarım, geliştirme, dijital pazarlama ve daha fazlası.'
      : 'Web design, development, digital marketing and more.',
  }
}

export default async function HizmetlerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { data: services } = await db()
    .from('Service')
    .select(SERVICE_CARD_COLUMNS)
    .eq('published', true)
    .order('order', { ascending: true })

  return (
    <>
      <Navbar />
      <ServicesListClient locale={locale} services={(services ?? []) as Service[]} />
      <Footer />
    </>
  )
}
