'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { mockStats } from '@/lib/mock-data'
import { HomeReveal, useHomeInView } from './home-reveal'

const COUNT_DURATION = 2000

export default function StatsSection() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const { ref, isInView } = useHomeInView<HTMLElement>()
  const [counts, setCounts] = useState(() => mockStats.map(() => 0))
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCounts(mockStats.map((stat) => stat.value))
      return
    }

    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / COUNT_DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const nextCounts = mockStats.map((stat) => Math.floor(eased * stat.value))

      setCounts((currentCounts) =>
        currentCounts.every((count, index) => count === nextCounts[index])
          ? currentCounts
          : nextCounts
      )

      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [isInView])

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #F5A623, #6C63FF, transparent)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #6C63FF, #F5A623, transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <HomeReveal
          as="p"
          direction="fade"
          className="text-center text-xs uppercase tracking-[0.3em] text-white/30 mb-16"
        >
          {isTr ? '— Rakamlarla Başarımız —' : '— Our Success in Numbers —'}
        </HomeReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {mockStats.map((stat, index) => (
            <div key={stat.labelEn} className="relative">
              <HomeReveal
                delay={index * 120}
                duration={700}
                className="flex flex-col items-center text-center px-6"
              >
                <div className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-amber-gradient mb-3 tabular-nums">
                  {counts[index]}
                  <span className="text-[#F5A623]">{stat.suffix}</span>
                </div>
                <div className="text-sm md:text-base text-white/50 font-medium">
                  {isTr ? stat.labelTr : stat.labelEn}
                </div>
              </HomeReveal>

              {index < mockStats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12">
                  <HomeReveal
                    direction="scale"
                    delay={400 + index * 100}
                    className="w-full h-full origin-top"
                    style={{
                      background: 'linear-gradient(to bottom, transparent, rgba(245,166,35,0.3), transparent)',
                    }}
                  >
                    <span className="sr-only">|</span>
                  </HomeReveal>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
