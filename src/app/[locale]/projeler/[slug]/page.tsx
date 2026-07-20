import { notFound } from 'next/navigation'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import ProjectDetailClient from './project-detail-client'
import type { Project } from '@/lib/db-types'
import { getProjectBySlug, getRelatedProjects } from '@/lib/public-content'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const data = await getProjectBySlug(slug)
  if (!data) return {}
  return {
    title: locale === 'tr' ? data.titleTr : data.titleEn,
    description: locale === 'tr' ? data.descTr : data.descEn,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params

  const [project, related] = await Promise.all([
    getProjectBySlug(slug),
    getRelatedProjects(slug),
  ])

  if (!project) notFound()

  return (
    <>
      <Navbar />
      <ProjectDetailClient locale={locale} project={project as Project} related={related} />
      <Footer />
    </>
  )
}
