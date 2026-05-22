import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import ProjectsListClient from './projects-list-client'
import type { Project } from '@/lib/db-types'

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
    title: locale === 'tr' ? 'Projeler' : 'Projects',
    description: locale === 'tr' ? 'Tamamladığımız projeler ve başarı hikayeleri.' : 'Completed projects and success stories.',
  }
}

export default async function ProjelerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { data: projects } = await db()
    .from('Project')
    .select('*')
    .eq('published', true)
    .order('order', { ascending: true })

  return (
    <>
      <Navbar />
      <ProjectsListClient locale={locale} projects={(projects ?? []) as Project[]} />
      <Footer />
    </>
  )
}
