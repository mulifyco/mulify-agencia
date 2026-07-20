'use client'

import { useRef, useCallback } from 'react'
import Link from 'next/link'
import { localizedPath } from '@/lib/locale-path'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { HomeReveal } from './home-reveal'

export default function ServicesCarousel({ locale, cards }: { locale: string; cards: React.ReactNode[] }) {
  const isTr = locale === 'tr'
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: true, dragFree: true },
    [autoplay.current]
  )

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
    autoplay.current.reset()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
    autoplay.current.reset()
  }, [emblaApi])

  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0F] overflow-hidden">
      {/* Subtle purple glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <HomeReveal as="p"
              className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4"
            >
              {isTr ? '— Hizmetlerimiz —' : '— Our Services —'}
            </HomeReveal>
            <HomeReveal as="h2" duration={700} delay={100}
              className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              {isTr ? (
                <>
                  Dijital başarınız için<br />
                  <span className="text-amber-gradient">eksiksiz çözümler</span>
                </>
              ) : (
                <>
                  Complete solutions for<br />
                  <span className="text-amber-gradient">your digital success</span>
                </>
              )}
            </HomeReveal>
          </div>

          {/* Navigation arrows */}
          <HomeReveal direction="fade" delay={300}
            className="hidden md:flex items-center gap-2"
          >
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:border-[#F5A623]/30 hover:bg-[#F5A623]/5 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:border-[#F5A623]/30 hover:bg-[#F5A623]/5 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </HomeReveal>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 pl-6 lg:pl-8" style={{ marginLeft: 'calc((100vw - min(80rem, 100vw)) / 2)' }}>
          {cards.map((card, i) => (
            <HomeReveal
              key={i}
              direction="right"
              delay={i * 100}
              className="flex-none w-[320px] md:w-[360px]"
            >
              {card}
            </HomeReveal>
          ))}

          {/* View all card */}
          <HomeReveal direction="right" delay={600}
            className="flex-none w-[220px]"
          >
            <Link
              href={localizedPath(locale, '/hizmetler')}
              className="h-full rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 p-8 hover:border-[#F5A623]/30 hover:bg-[#F5A623]/3 transition-all duration-300 group min-h-[400px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/10 flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors">
                <ArrowRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-sm text-white/40 text-center leading-relaxed group-hover:text-white/60 transition-colors">
                {isTr ? 'Tüm hizmetleri görüntüle' : 'View all services'}
              </p>
            </Link>
          </HomeReveal>

          {/* Trailing space */}
          <div className="flex-none w-6" />
        </div>
      </div>
    </section>
  )
}
