'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { localizedPath } from '@/lib/locale-path'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/db-types'
import {
  PROJECT_SERVICE_CATEGORIES,
  getProjectServiceCategory,
  type ProjectServiceCategory,
} from '@/lib/project-service-categories'

const PLACEHOLDER: Project[] = [
  { id: '1', slug: 'moda-brand-redesign', titleTr: 'Moda Marka Yenileme', titleEn: 'Fashion Brand Redesign', descTr: 'Köklü bir moda markasının dijital kimliğini ve e-ticaret platformunu baştan tasarladık.', descEn: 'We redesigned the digital identity and e-commerce platform of an established fashion brand.', client: 'FashionCo TR', url: null, image: null, images: [], tags: ['UI/UX', 'E-Ticaret', 'Shopify'], featured: true, published: true, order: 0, serviceId: null, createdAt: '', updatedAt: '' },
  { id: '2', slug: 'saas-dashboard', titleTr: 'SaaS Dashboard', titleEn: 'SaaS Dashboard', descTr: 'B2B SaaS için kompleks analitik dashboard ve kullanıcı yönetim paneli.', descEn: 'Complex analytics dashboard and user management panel for B2B SaaS.', client: 'TechStartup', url: null, image: null, images: [], tags: ['Next.js', 'React', 'TypeScript'], featured: false, published: true, order: 1, serviceId: null, createdAt: '', updatedAt: '' },
  { id: '3', slug: 'restoran-agi', titleTr: 'Restoran Zinciri Dijitali', titleEn: 'Restaurant Chain Digital', descTr: 'İstanbul\'daki restoran zinciri için online rezervasyon ve menü sistemi.', descEn: 'Online reservation and menu system for a restaurant chain in Istanbul.', client: 'İstanbul Lezzet', url: null, image: null, images: [], tags: ['Web Tasarım', 'Next.js'], featured: true, published: true, order: 2, serviceId: null, createdAt: '', updatedAt: '' },
  { id: '4', slug: 'hukuk-sitesi', titleTr: 'Hukuk Bürosu Web Sitesi', titleEn: 'Law Firm Website', descTr: 'Prestijli hukuk bürosu için kurumsal web sitesi ve blog.', descEn: 'Corporate website and blog for a prestigious law firm.', client: 'Yıldız Hukuk', url: null, image: null, images: [], tags: ['Web Tasarım', 'SEO'], featured: false, published: true, order: 3, serviceId: null, createdAt: '', updatedAt: '' },
  { id: '5', slug: 'organik-market', titleTr: 'Organik Market E-Ticaret', titleEn: 'Organic Market E-Commerce', descTr: 'Organik gıda markası için tam entegre e-ticaret çözümü.', descEn: 'Fully integrated e-commerce solution for an organic food brand.', client: 'Doğal Dükkan', url: null, image: null, images: [], tags: ['E-Ticaret', 'Shopify', 'UI/UX'], featured: false, published: true, order: 4, serviceId: null, createdAt: '', updatedAt: '' },
]

const GRADIENT_MAP: Record<number, string> = {
  0: 'from-[#F5A623]/20 to-[#6C63FF]/10',
  1: 'from-[#6C63FF]/20 to-[#10B981]/10',
  2: 'from-[#10B981]/20 to-[#F5A623]/10',
  3: 'from-[#F472B6]/20 to-[#06B6D4]/10',
  4: 'from-[#06B6D4]/20 to-[#F5A623]/10',
}

function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: string }) {
  const isTr = locale === 'tr'
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={localizedPath(locale, `/projeler/${project.slug}`)} className="block">
        {/* Image area */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
          {project.image ? (
            <img src={project.image} alt={isTr ? project.titleTr : project.titleEn} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${GRADIENT_MAP[index % 5] ?? GRADIENT_MAP[0]} flex items-center justify-center transition-transform duration-700 group-hover:scale-105`}>
              <span className="text-5xl opacity-30">✦</span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#0A0A0F]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
              {isTr ? 'İncele' : 'View'} <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[#F5A623] text-[#0A0A0F]">
              {isTr ? 'Öne Çıkan' : 'Featured'}
            </div>
          )}
          {project.url && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {project.client && (
            <div className="text-xs text-[#F5A623]/70 mb-1.5 font-medium">{project.client}</div>
          )}
          <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-[#F5A623] transition-colors">
            {isTr ? project.titleTr : project.titleEn}
          </h3>
          <p className="text-white/40 text-sm line-clamp-2 mb-3">
            {isTr ? project.descTr : project.descEn}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(project.tags ?? []).map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs bg-white/5 border border-white/8 text-white/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProjectsListClient({ locale, projects }: { locale: string; projects: Project[] }) {
  const isTr = locale === 'tr'
  const displayProjects = projects.length > 0 ? projects : PLACEHOLDER
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })

  const filters = [{ key: null, label: 'Tümü' }, ...PROJECT_SERVICE_CATEGORIES]
  const [activeCategory, setActiveCategory] = useState<ProjectServiceCategory | null>(null)
  const filtered = activeCategory
    ? displayProjects.filter((project) => getProjectServiceCategory(project) === activeCategory)
    : displayProjects

  return (
    <main className="bg-[#0A0A0F] min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.12, 1], y: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8" ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.35em] text-[#F5A623] mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#F5A623]/60" />
            {isTr ? 'Portfolyo' : 'Portfolio'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
          >
            {isTr ? (
              <>Tamamladığımız<br /><span className="text-amber-gradient">projeler</span></>
            ) : (
              <>Our completed<br /><span className="text-amber-gradient">projects</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mb-10"
          >
            {isTr
              ? 'Her proje, müşterilerimizle kurduğumuz güçlü ortaklığın ve mükemmele olan bağlılığımızın yansımasıdır.'
              : 'Every project reflects the strong partnership we build with our clients and our commitment to excellence.'}
          </motion.p>

          {/* Filter tabs */}
          {filters.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {filters.map((f) => (
                <button
                  key={f.key ?? 'all'}
                  onClick={() => setActiveCategory(f.key)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === f.key
                      ? 'bg-[#F5A623] text-[#0A0A0F]'
                      : 'glass text-white/60 hover:text-white hover:border-white/20'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Projects Grid ─────────────────────────────────────────────────── */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24 text-white/30">
                Bu kategoride henüz yayınlanmış proje bulunmuyor.
              </motion.div>
            ) : (
              <motion.div key={activeCategory ?? 'all'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} locale={locale} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-white mb-1">{isTr ? 'Projenizi hayata geçirelim' : "Let's bring your project to life"}</h2>
            <p className="text-white/40 text-sm">{isTr ? 'Benzer bir proje için bizimle iletişime geçin.' : 'Contact us for a similar project.'}</p>
          </div>
          <Link href={localizedPath(locale, '/iletisim')} className="flex-shrink-0 flex items-center gap-2 px-8 py-3.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl hover:bg-[#FFD166] transition-all">
            {isTr ? 'Teklif Al' : 'Get Quote'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
