'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { localizedPath } from '@/lib/locale-path'

export default function HeroStatic({ locale }: { locale: string }) {
  const isTr = locale === 'tr'

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0F]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 left-1/4 h-[700px] w-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(108,99,255,0.14) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-20 right-1/4 h-[600px] w-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.09) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="container-tight relative z-10 flex min-h-screen flex-col justify-center pb-20 pt-28 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-5"
            >
              <h1 className="font-playfair font-bold leading-[1.05] tracking-tight">
                <span className="block text-4xl text-white md:text-6xl lg:text-7xl">
                  {isTr ? 'Markanızı Dijitalde' : 'Elevate Your Brand'}
                </span>
                <span className="text-amber-gradient mt-1 block text-4xl md:text-6xl lg:text-7xl">
                  {isTr ? 'Büyütüyoruz' : 'Digitally'}
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-white/50 md:text-lg lg:mx-0"
            >
              {isTr
                ? 'Strateji, tasarım ve teknolojiyi birleştirerek markanızı dijital dünyada öne çıkarıyor, rakiplerinizin önüne geçiriyoruz.'
                : 'Combining strategy, design, and technology to make your brand stand out and outperform in the digital world.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Link
                href={localizedPath(locale, '/iletisim')}
                className="animate-pulse-amber group flex items-center gap-3 rounded-2xl bg-[#F5A623] px-7 py-3.5 text-sm font-semibold text-[#0A0A0F] transition-all duration-300 hover:bg-[#FFD166]"
              >
                {isTr ? 'Projenizi Başlatın' : 'Start Your Project'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={localizedPath(locale, '/projeler')}
                className="glass group flex items-center gap-3 rounded-2xl border border-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#F5A623]/30 hover:bg-[#F5A623]/5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-[#F5A623]/20">
                  <Play className="ml-0.5 h-3 w-3 fill-white text-white" />
                </span>
                {isTr ? 'Çalışmaları İncele' : 'View Our Work'}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex min-h-[280px] items-center justify-center px-2 sm:min-h-[380px] sm:px-8 lg:min-h-[520px] lg:px-4"
          >
            <div
              className="mx-auto w-[94vw] max-w-[560px] mix-blend-lighten sm:w-[72vw] sm:max-w-[680px] lg:w-full lg:max-w-[760px]"
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 68% 66% at 51% 51%, #000 34%, rgba(0,0,0,0.96) 48%, rgba(0,0,0,0.55) 66%, transparent 88%)',
                maskImage:
                  'radial-gradient(ellipse 68% 66% at 51% 51%, #000 34%, rgba(0,0,0,0.96) 48%, rgba(0,0,0,0.55) 66%, transparent 88%)',
              }}
            >
              <Image
                src="/images/hero/hero-ads-analytics.png"
                alt={isTr ? 'Google Ads ve Meta Ads performans analitiği' : 'Google Ads and Meta Ads performance analytics'}
                width={1672}
                height={941}
                priority
                quality={95}
                sizes="(max-width: 639px) 94vw, (max-width: 1023px) 72vw, 760px"
                className="h-auto w-full object-contain object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
