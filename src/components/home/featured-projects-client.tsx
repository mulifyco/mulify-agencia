'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { localizedPath } from '@/lib/locale-path'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { HomeReveal } from './home-reveal'

const filters = [
  { key: 'all', labelTr: 'Tümü', labelEn: 'All' },
  { key: 'Web', labelTr: 'Web', labelEn: 'Web' },
  { key: 'Sosyal Medya', labelTr: 'Sosyal Medya', labelEn: 'Social Media' },
  { key: 'E-Ticaret', labelTr: 'E-Ticaret', labelEn: 'E-Commerce' },
]

export type FeaturedProjectItem = {
  id: string
  category: string
  card: React.ReactNode
}

export default function FeaturedProjectsClient({ items, locale }: { items: FeaturedProjectItem[]; locale: string }) {
  const isTr = locale === 'tr'
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? items
    : items.filter((item) => item.category === activeFilter)

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <HomeReveal as="p"
              className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4"
            >
              {isTr ? '— Seçili Projeler —' : '— Selected Work —'}
            </HomeReveal>
            <HomeReveal as="h2" duration={700} delay={100}
              className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              {isTr ? (
                <>Müşterilerimizle<br /><span className="text-amber-gradient">birlikte yarattıklarımız</span></>
              ) : (
                <>What we created<br /><span className="text-amber-gradient">with our clients</span></>
              )}
            </HomeReveal>
          </div>

          <HomeReveal direction="fade" delay={300}
            className="flex items-center gap-2"
          >
            <button onClick={scrollPrev} className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:border-[#F5A623]/30 transition-all">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={scrollNext} className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:border-[#F5A623]/30 transition-all">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </HomeReveal>
        </div>

        {/* Filter Tabs */}
        <HomeReveal delay={200}
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
        </HomeReveal>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 pl-6 lg:pl-8" style={{ marginLeft: 'calc((100vw - min(80rem, 100vw)) / 2)' }}>
          {filtered.map((item, i) => (
            <HomeReveal
              key={item.id}
              delay={i * 100}
              className="flex-none w-[340px] md:w-[420px]"
            >
              {item.card}
            </HomeReveal>
          ))}

          {/* View all card */}
          <div className="flex-none w-[200px] flex items-stretch">
            <Link
              href={localizedPath(locale, '/projeler')}
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
