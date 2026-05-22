import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import AboutClient from './about-client'
import type { TeamMember } from '@/lib/db-types'

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
    title: locale === 'tr' ? 'Hakkımızda' : 'About Us',
    description: locale === 'tr'
      ? 'Mulify — Dijital dünyada markanızı büyüten yaratıcı ekip.'
      : 'Mulify — The creative team that grows your brand in the digital world.',
  }
}

export default async function HakkimizdaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { data: members } = await db()
    .from('TeamMember')
    .select('*')
    .eq('published', true)
    .order('order', { ascending: true })

  return (
    <>
      <Navbar />
      <AboutClient locale={locale} members={(members ?? []) as TeamMember[]} />
      <Footer />
    </>
  )
}
