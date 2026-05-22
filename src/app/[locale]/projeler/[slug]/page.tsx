import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import ProjectDetailClient from './project-detail-client'
import type { Project } from '@/lib/db-types'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const { data } = await db().from('Project').select('titleTr,titleEn,descTr,descEn').eq('slug', slug).single()
  if (!data) return {}
  return {
    title: locale === 'tr' ? data.titleTr : data.titleEn,
    description: locale === 'tr' ? data.descTr : data.descEn,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params

  const [{ data: project }, { data: allProjects }] = await Promise.all([
    db().from('Project').select('*').eq('slug', slug).eq('published', true).single(),
    db().from('Project').select('*').eq('published', true).order('order'),
  ])

  if (!project) notFound()

  const related = ((allProjects ?? []) as Project[])
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <Navbar />
      <ProjectDetailClient locale={locale} project={project as Project} related={related} />
      <Footer />
    </>
  )
}
