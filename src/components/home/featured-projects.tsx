'use client'

import { useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useLocale } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { mockProjects } from '@/lib/mock-data'

const filters = [
  { key: 'all', labelTr: 'Tümü', labelEn: 'All' },
  { key: 'Web', labelTr: 'Web', labelEn: 'Web' },
  { key: 'Sosyal Medya', labelTr: 'Sosyal Medya', labelEn: 'Social Media' },
  { key: 'E-Ticaret', labelTr: 'E-Ticaret', labelEn: 'E-Commerce' },
]

export default function FeaturedProjects() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? mockProjects
    : mockProjects.filter((p) => p.category === activeFilter)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps',
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="relative py-24 md:py-32 bg-[#111118] overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4"
            >
              {isTr ? '— Seçili Projeler —' : '— Selected Work —'}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              {isTr ? (
                <>Müşterilerimizle<br /><span className="text-amber-gradient">birlikte yarattıklarımız</span></>
              ) : (
                <>What we created<br /><span className="text-amber-gradient">with our clients</span></>
              )}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <button onClick={scrollPrev} className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:border-[#F5A623]/30 transition-all">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={scrollNext} className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:border-[#F5A623]/30 transition-all">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-2 mb-10 flex-wrap"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === f.key
                  ? 'bg-[#F5A623] text-[#0A0A0F]'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {isTr ? f.labelTr : f.labelEn}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 pl-6 lg:pl-8" style={{ marginLeft: 'calc((100vw - min(80rem, 100vw)) / 2)' }}>
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-none w-[340px] md:w-[420px]"
            >
              <div className="group relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing">
                {/* Image */}
                <div className="relative h-64 md:h-72 overflow-hidden bg-[#1C1C28]">
                  <Image
                    src={project.image}
                    alt={isTr ? project.titleTr : project.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="420px"
                    unoptimized
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#0A0A0F]/80 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center gap-4">
                    <h3 className="font-playfair text-xl font-bold text-white text-center px-6">
                      {isTr ? project.titleTr : project.titleEn}
                    </h3>
                    <Link
                      href={`/${locale}/projeler/${project.slug}`}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold rounded-xl hover:bg-[#FFD166] transition-colors"
                    >
                      {isTr ? 'İncele' : 'View Project'}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Card footer */}
                <div className="bg-[#16161F] border border-white/5 border-t-0 rounded-b-3xl px-6 py-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-[#F5A623]/10 text-[#F5A623] text-xs font-medium">
                      {project.category}
                    </span>
                    <span className="text-xs text-white/30">{project.client}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-3 group-hover:text-[#F5A623] transition-colors">
                    {isTr ? project.titleTr : project.titleEn}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* View all card */}
          <div className="flex-none w-[200px] flex items-stretch">
            <Link
              href={`/${locale}/projeler`}
              className="flex-1 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3 p-8 hover:border-[#F5A623]/30 hover:bg-[#F5A623]/3 transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#F5A623]/10 flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors">
                <ArrowRight className="w-5 h-5 text-[#F5A623]" />
              </div>
              <p className="text-xs text-white/40 text-center group-hover:text-white/60 transition-colors">
                {isTr ? 'Tüm projeleri gör' : 'View all projects'}
              </p>
            </Link>
          </div>
          <div className="flex-none w-6" />
        </div>
      </div>
    </section>
  )
}
