'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight, CheckCircle2, Clock, Shield } from 'lucide-react'
import { localizedPath } from '@/lib/locale-path'
import { HomeReveal } from './home-reveal'

const trustBadges = [
  { icon: CheckCircle2, labelTr: '100+ Başarılı Proje', labelEn: '100+ Successful Projects' },
  { icon: Clock, labelTr: 'Zamanında Teslimat', labelEn: 'On-Time Delivery' },
  { icon: Shield, labelTr: '2 Yıl Garanti Desteği', labelEn: '2 Year Guarantee Support' },
]

export default function CTASection() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#111118]">
      {/* Amber glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,166,35,0.08) 0%, transparent 70%)',
        }}
      />
      {/* Border lines */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.4), rgba(108,99,255,0.4), transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.3), rgba(245,166,35,0.3), transparent)' }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: i % 2 === 0 ? 'rgba(245,166,35,0.4)' : 'rgba(108,99,255,0.4)',
            '--home-particle-duration': `${4 + i}s`,
            '--home-particle-delay': `${i * 0.7}s`,
          } as CSSProperties}
          className="absolute rounded-full home-particle-float"
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <HomeReveal
          direction="scale"
          duration={500}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-amber mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
          <span className="text-xs font-medium text-[#F5A623] uppercase tracking-wider">
            {isTr ? 'Ücretsiz Danışmanlık' : 'Free Consultation'}
          </span>
        </HomeReveal>

        {/* Heading */}
        <HomeReveal
          as="h2"
          duration={800}
          delay={100}
          className="font-playfair text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
        >
          {isTr ? (
            <>
              Projenizi hayata<br />
              <span className="text-amber-gradient">geçirmeye hazır mısınız?</span>
            </>
          ) : (
            <>
              Ready to bring your<br />
              <span className="text-amber-gradient">project to life?</span>
            </>
          )}
        </HomeReveal>

        {/* Subtext */}
        <HomeReveal as="p" duration={700} delay={250}
          className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-12"
        >
          {isTr
            ? 'İlk görüşme tamamen ücretsiz. Projenizi anlatalım, size en uygun çözümü birlikte belirleyelim.'
            : 'The first consultation is completely free. Tell us about your project and let\'s find the best solution together.'}
        </HomeReveal>

        {/* CTAs */}
        <HomeReveal duration={700} delay={350}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href={localizedPath(locale, '/iletisim')}
            className="group flex items-center gap-3 px-8 py-4 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-2xl text-base hover:bg-[#FFD166] transition-all duration-300 animate-pulse-amber"
          >
            {isTr ? 'Hemen Başlayın' : 'Get Started Now'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={localizedPath(locale, '/projeler')}
            className="flex items-center gap-2 px-8 py-4 glass border border-white/10 text-white font-semibold rounded-2xl text-base hover:border-[#F5A623]/30 transition-all duration-300"
          >
            {isTr ? 'Portfolyoyu İncele' : 'View Portfolio'}
          </Link>
        </HomeReveal>

        {/* Trust badges */}
        <HomeReveal direction="fade" duration={600} delay={500}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {trustBadges.map((badge) => (
            <div key={badge.labelEn} className="flex items-center gap-2">
              <badge.icon className="w-4 h-4 text-[#F5A623]" />
              <span className="text-sm text-white/40">{isTr ? badge.labelTr : badge.labelEn}</span>
            </div>
          ))}
        </HomeReveal>
      </div>
    </section>
  )
}
