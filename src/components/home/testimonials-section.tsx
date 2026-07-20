'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { Star } from 'lucide-react'
import { mockTestimonials } from '@/lib/mock-data'
import { HomeReveal } from './home-reveal'

function TestimonialCard({ t }: { t: (typeof mockTestimonials)[0] }) {
  return (
    <div className="flex-none w-[340px] md:w-[380px] mx-3">
      <div className="glass rounded-2xl p-6 h-full flex flex-col gap-4 hover:border-white/15 transition-colors duration-300">
        {/* Stars */}
        <div className="flex gap-1">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-[#F5A623] fill-[#F5A623]" />
          ))}
        </div>

        {/* Content */}
        <p className="text-sm text-white/70 leading-relaxed flex-1">"{t.content}"</p>

        {/* Metric badge */}
        <div className="inline-flex self-start px-3 py-1 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/20">
          <span className="text-xs font-semibold text-[#F5A623]">{t.metric}</span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#1C1C28] flex-shrink-0">
            <Image src={t.avatar} alt={t.name} fill sizes="36px" className="object-cover" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{t.name}</div>
            <div className="text-xs text-white/40">{t.role} · {t.company}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, reverse = false, paused }: { items: typeof mockTestimonials; reverse?: boolean; paused: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
      <div
        className={`flex home-marquee ${reverse ? 'home-marquee-reverse' : ''} ${paused ? 'home-marquee-paused' : ''}`}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const [paused, setPaused] = useState(false)

  const half = Math.ceil(mockTestimonials.length / 2)
  const row1 = mockTestimonials.slice(0, half)
  const row2 = mockTestimonials.slice(half)

  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0F] overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.15), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <HomeReveal as="p"
            className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4"
          >
            {isTr ? '— Müşteri Yorumları —' : '— Client Reviews —'}
          </HomeReveal>
          <HomeReveal as="h2" duration={700} delay={100}
            className="font-playfair text-4xl md:text-5xl font-bold text-white"
          >
            {isTr ? (
              <>Başarı, <span className="text-amber-gradient">onların sözleriyle</span></>
            ) : (
              <>Success, <span className="text-amber-gradient">in their words</span></>
            )}
          </HomeReveal>
        </div>
      </div>

      {/* Carousel rows */}
      <div
        className="flex flex-col gap-5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <MarqueeRow items={row1} paused={paused} />
        <MarqueeRow items={[...row2, ...row1.slice(0, 3)]} reverse paused={paused} />
      </div>
    </section>
  )
}
