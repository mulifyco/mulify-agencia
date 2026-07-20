import { getLocale } from 'next-intl/server'
import type { Project } from '@/lib/db-types'
import FeaturedProjectsClient from './featured-projects-client'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { localizedPath } from '@/lib/locale-path'
import { mockProjects } from '@/lib/mock-data'

function projectCategory(tags: string[]) {
  const value = tags.join(' ').toLocaleLowerCase('tr-TR')
  if (value.includes('sosyal') || value.includes('social')) return 'Sosyal Medya'
  if (value.includes('ticaret') || value.includes('commerce') || value.includes('shopify')) return 'E-Ticaret'
  return 'Web'
}

export default async function FeaturedProjects({ projects }: { projects: Project[] }) {
  const locale = await getLocale()
  const isTr = locale === 'tr'
  const source = projects.length > 0 ? projects.slice(0, 6) : mockProjects.slice(0, 6).map((project) => ({ ...project, descTr: '', descEn: '' }))
  const items = source.map((project) => {
    const category = projectCategory(project.tags ?? [])
    return {
      id: project.id,
      category,
      card: (
        <div className="group relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing">
          <div className="relative h-64 md:h-72 overflow-hidden bg-[#1C1C28]">
            {project.image ? <Image src={project.image} alt={isTr ? project.titleTr : project.titleEn} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 340px, 420px" /> : null}
            <div className="absolute inset-0 bg-[#0A0A0F]/80 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center gap-4">
              <h3 className="font-playfair text-xl font-bold text-white text-center px-6">{isTr ? project.titleTr : project.titleEn}</h3>
              <Link href={localizedPath(locale, `/projeler/${project.slug}`)} className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold rounded-xl hover:bg-[#FFD166] transition-colors">{isTr ? 'İncele' : 'View Project'}<ExternalLink className="w-3.5 h-3.5" /></Link>
            </div>
          </div>
          <div className="bg-[#16161F] border border-white/5 border-t-0 rounded-b-3xl px-6 py-5">
            <div className="flex items-center justify-between mb-3"><span className="px-2.5 py-1 rounded-lg bg-[#F5A623]/10 text-[#F5A623] text-xs font-medium">{category}</span><span className="text-xs text-white/30">{project.client}</span></div>
            <h3 className="font-semibold text-white mb-3 group-hover:text-[#F5A623] transition-colors">{isTr ? project.titleTr : project.titleEn}</h3>
            <div className="flex flex-wrap gap-2">{(project.tags ?? []).map((tag) => <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-xs">{tag}</span>)}</div>
          </div>
        </div>
      ),
    }
  })
  return <FeaturedProjectsClient items={items} locale={locale} />
}
