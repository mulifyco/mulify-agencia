'use client'

import { useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useLocale } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRight, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { mockServices } from '@/lib/mock-data'

export default function ServicesSection() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })

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
        <div ref={headerRef} className="flex items-end justify-between mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4"
            >
              {isTr ? '— Hizmetlerimiz —' : '— Our Services —'}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
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
            </motion.h2>
          </div>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
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
          </motion.div>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 pl-6 lg:pl-8" style={{ marginLeft: 'calc((100vw - min(80rem, 100vw)) / 2)' }}>
          {mockServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-none w-[320px] md:w-[360px]"
            >
              <div
                className={`relative h-full rounded-3xl p-8 flex flex-col transition-all duration-500 group cursor-grab active:cursor-grabbing ${
                  service.featured
                    ? 'bg-gradient-to-br from-[#F5A623]/10 to-[#FFD166]/5 border border-[#F5A623]/30'
                    : 'bg-[#111118] border border-white/5 hover:border-white/10'
                }`}
                style={service.featured ? { boxShadow: '0 0 40px rgba(245,166,35,0.15)' } : {}}
              >
                {/* Featured badge */}
                {service.featured && (
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 rounded-full bg-[#F5A623] text-[#0A0A0F] text-xs font-bold uppercase tracking-wider">
                      {isTr ? 'Öne Çıkan' : 'Featured'}
                    </span>
                  </div>
                )}

                {/* Dome/Arch top decoration */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 rounded-b-full opacity-20 -translate-y-1/2"
                  style={{ backgroundColor: service.color }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 mt-4"
                  style={{ backgroundColor: `${service.color}20`, border: `1px solid ${service.color}30` }}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-playfair text-xl font-bold text-white mb-3 group-hover:text-[#F5A623] transition-colors">
                  {isTr ? service.titleTr : service.titleEn}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed mb-6">
                  {isTr ? service.descTr : service.descEn}
                </p>

                {/* Features */}
                <div className="flex-1 space-y-2.5 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${service.color}20` }}
                      >
                        <Check className="w-2.5 h-2.5" style={{ color: service.color }} />
                      </div>
                      <span className="text-sm text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/${locale}${service.slug ? `/hizmetler/${service.slug}` : '/hizmetler'}`}
                  className="flex items-center gap-2 text-sm font-semibold group/link"
                  style={{ color: service.featured ? '#F5A623' : service.color }}
                >
                  {isTr ? 'Detayları İncele' : 'Learn More'}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}

          {/* View all card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex-none w-[220px]"
          >
            <Link
              href={`/${locale}/hizmetler`}
              className="h-full rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 p-8 hover:border-[#F5A623]/30 hover:bg-[#F5A623]/3 transition-all duration-300 group min-h-[400px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/10 flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors">
                <ArrowRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-sm text-white/40 text-center leading-relaxed group-hover:text-white/60 transition-colors">
                {isTr ? 'Tüm hizmetleri görüntüle' : 'View all services'}
              </p>
            </Link>
          </motion.div>

          {/* Trailing space */}
          <div className="flex-none w-6" />
        </div>
      </div>
    </section>
  )
}
