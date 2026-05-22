'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLocale } from 'next-intl'
import { mockStats } from '@/lib/mock-data'

function useCountUp(target: number, isInView: boolean, duration = 2000) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isInView, target, duration])

  return count
}

function StatCard({
  stat,
  index,
  isTr,
}: {
  stat: (typeof mockStats)[0]
  index: number
  isTr: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(stat.value, isInView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-6"
    >
      <div className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-amber-gradient mb-3 tabular-nums">
        {count}
        <span className="text-[#F5A623]">{stat.suffix}</span>
      </div>
      <div className="text-sm md:text-base text-white/50 font-medium">
        {isTr ? stat.labelTr : stat.labelEn}
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      {/* Background accent */}
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
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs uppercase tracking-[0.3em] text-white/30 mb-16"
        >
          {isTr ? '— Rakamlarla Başarımız —' : '— Our Success in Numbers —'}
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {mockStats.map((stat, i) => (
            <div key={stat.labelEn} className="relative">
              <StatCard stat={stat} index={i} isTr={isTr} />
              {/* Vertical divider (not after last) */}
              {i < mockStats.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 origin-top"
                  style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(245,166,35,0.3), transparent)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
