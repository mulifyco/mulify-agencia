'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useLocale } from 'next-intl'
import { ArrowRight, CheckCircle2, Clock, Shield } from 'lucide-react'
import { localizedPath } from '@/lib/locale-path'

const trustBadges = [
  { icon: CheckCircle2, labelTr: '100+ Başarılı Proje', labelEn: '100+ Successful Projects' },
  { icon: Clock, labelTr: 'Zamanında Teslimat', labelEn: 'On-Time Delivery' },
  { icon: Shield, labelTr: '2 Yıl Garanti Desteği', labelEn: '2 Year Guarantee Support' },
]

export default function CTASection() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: i % 2 === 0 ? 'rgba(245,166,35,0.4)' : 'rgba(108,99,255,0.4)',
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
        />
      ))}

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-amber mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
          <span className="text-xs font-medium text-[#F5A623] uppercase tracking-wider">
            {isTr ? 'Ücretsiz Danışmanlık' : 'Free Consultation'}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-12"
        >
          {isTr
            ? 'İlk görüşme tamamen ücretsiz. Projenizi anlatalım, size en uygun çözümü birlikte belirleyelim.'
            : 'The first consultation is completely free. Tell us about your project and let\'s find the best solution together.'}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
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
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {trustBadges.map((badge) => (
            <div key={badge.labelEn} className="flex items-center gap-2">
              <badge.icon className="w-4 h-4 text-[#F5A623]" />
              <span className="text-sm text-white/40">{isTr ? badge.labelTr : badge.labelEn}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
