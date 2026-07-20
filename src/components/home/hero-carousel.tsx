'use client'

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { localizedPath } from '@/lib/locale-path'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Play, TrendingUp } from 'lucide-react'

const AUTOPLAY_DELAY = 5000
const DASHBOARD_BARS = [55, 75, 45, 88, 65, 100, 82]
const BROWSER_CODE_LINES = [
  [{ t: 'export default ', c: '#6C63FF' }, { t: 'function ', c: 'rgba(255,255,255,0.55)' }, { t: 'App', c: '#F5A623' }, { t: '() {', c: 'rgba(255,255,255,0.4)' }],
  [{ t: '  return (', c: 'rgba(255,255,255,0.35)' }],
  [{ t: '    <', c: 'rgba(255,255,255,0.3)' }, { t: 'main ', c: '#14B8A6' }, { t: 'className', c: '#6C63FF' }, { t: '="hero"', c: '#F5A623' }, { t: '>', c: 'rgba(255,255,255,0.3)' }],
  [{ t: '      <', c: 'rgba(255,255,255,0.3)' }, { t: 'h1', c: '#14B8A6' }, { t: '>', c: 'rgba(255,255,255,0.3)' }, { t: 'Fast & Beautiful', c: 'rgba(255,255,255,0.65)' }, { t: '</h1>', c: 'rgba(255,255,255,0.3)' }],
  [{ t: '    </main>', c: 'rgba(255,255,255,0.3)' }],
  [{ t: '  )', c: 'rgba(255,255,255,0.35)' }],
  [{ t: '}', c: 'rgba(255,255,255,0.55)' }],
]
const TECH_BADGES = [
  { label: 'Next.js', pos: '-top-4 right-6', bg: 'rgba(255,255,255,0.08)', delay: 0, floatH: 8 },
  { label: 'TypeScript', pos: 'top-1/3 -right-10', bg: 'rgba(49,120,198,0.22)', delay: 1, floatH: 6 },
  { label: '0.8s Load', pos: '-bottom-4 left-6', bg: 'rgba(20,184,166,0.15)', delay: 0.5, floatH: 7 },
  { label: 'React', pos: 'bottom-16 -left-8', bg: 'rgba(97,218,251,0.12)', delay: 1.5, floatH: 5 },
]

// ─── Illustration: Banner 1 — Analytics Dashboard ────────────────────────

const DashboardIllustration = memo(function DashboardIllustration({ active }: { active: boolean }) {
  return (
    <div className="relative w-full max-w-[380px] mx-auto">
      <div className="glass rounded-3xl p-5 border border-purple-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Analytics</p>
            <p className="text-2xl font-bold text-white font-playfair">+340%</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/10 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-medium">Live</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-1 h-20 mb-4">
          {DASHBOARD_BARS.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{ background: i === 5 ? '#F5A623' : 'rgba(108,99,255,0.4)' }}
              initial={{ height: 0 }}
              animate={active ? { height: `${h}%` } : { height: 0 }}
              transition={{ duration: 0.6, delay: active ? 0.3 + i * 0.07 : 0, ease: 'easeOut' }}
            />
          ))}
        </div>

        {/* Trend line */}
        <svg viewBox="0 0 200 40" className="w-full h-8 mb-4">
          <defs>
            <linearGradient id="dash-g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,35 C40,28 80,18 120,10 S170,3 200,1"
            stroke="#F5A623" strokeWidth="2" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          />
          <path d="M0,35 C40,28 80,18 120,10 S170,3 200,1 L200,40 L0,40 Z" fill="url(#dash-g1)" />
        </svg>

        <div className="grid grid-cols-3 gap-2">
          {[
            { l: 'Visitors', v: '24.5K' },
            { l: 'Bounce', v: '24%' },
            { l: 'Conv.', v: '6.8%' },
          ].map(m => (
            <div key={m.l} className="bg-white/5 rounded-xl p-2 text-center">
              <div className="text-[9px] text-white/35">{m.l}</div>
              <div className="text-xs font-bold text-white mt-0.5">{m.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating cards */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -right-3 glass rounded-2xl px-4 py-2.5 border border-amber-500/25"
      >
        <div className="text-[9px] text-white/40">Traffic</div>
        <div className="text-base font-bold text-amber-400 font-playfair">+340%</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-4 -left-3 glass rounded-2xl px-4 py-2.5 border border-purple-500/25"
      >
        <div className="text-[9px] text-white/40">Clients</div>
        <div className="text-base font-bold text-purple-400 font-playfair">150+</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-8 -right-8 glass rounded-2xl px-3 py-2 border border-emerald-500/20"
      >
        <div className="text-[9px] text-white/40">Satisfaction</div>
        <div className="text-sm font-bold text-emerald-400">98%</div>
      </motion.div>
    </div>
  )
})

// ─── Illustration: Banner 2 — Browser / Code ──────────────────────────────

const BrowserIllustration = memo(function BrowserIllustration({ active }: { active: boolean }) {
  return (
    <div className="relative w-full max-w-[380px] mx-auto">
      <div className="glass rounded-3xl overflow-hidden border border-teal-500/20">
        {/* Browser chrome */}
        <div className="bg-white/5 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          </div>
          <div className="flex-1 bg-white/5 rounded-full px-3 py-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400/70" />
            <span className="text-[10px] text-white/35">mulify.co</span>
          </div>
        </div>

        {/* Code area */}
        <div className="p-5 font-mono text-[11px] leading-[1.7] space-y-0">
          {BROWSER_CODE_LINES.map((line, i) => (
            <motion.div
              key={i}
              className="flex flex-wrap"
              initial={{ opacity: 0, x: -8 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.3, delay: active ? 0.4 + i * 0.08 : 0 }}
            >
              {line.map((part, j) => (
                <span key={j} style={{ color: part.c }}>{part.t}</span>
              ))}
            </motion.div>
          ))}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-1.5 h-[14px] bg-teal-400 rounded-sm align-text-bottom ml-0.5"
          />
        </div>

        {/* PageSpeed bar */}
        <div className="mx-5 mb-5 bg-white/5 rounded-2xl p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-white/40">PageSpeed Score</span>
            <span className="text-sm font-bold text-emerald-400">100</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
              initial={{ width: '0%' }}
              animate={active ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 1.1, delay: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Tech badges */}
      {TECH_BADGES.map((b) => (
        <motion.div
          key={b.label}
          animate={{ y: [0, -b.floatH, 0] }}
          transition={{ duration: 4 + b.delay, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
          className={`absolute ${b.pos} glass rounded-full px-3 py-1.5 text-[10px] font-semibold text-white/80 border border-white/10`}
          style={{ background: b.bg }}
        >
          {b.label}
        </motion.div>
      ))}
    </div>
  )
})

// ─── Illustration: Banner 3 — Growth Chart ───────────────────────────────

const GrowthIllustration = memo(function GrowthIllustration({ active }: { active: boolean }) {
  return (
    <div className="relative w-full max-w-[380px] mx-auto">
      <div className="glass rounded-3xl p-5 border border-amber-500/20">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">ROI Performance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-amber-400 font-playfair">+240%</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-2.5 h-2.5" /> ROI
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/40 mb-1">ROAS</p>
            <p className="text-2xl font-bold text-white font-playfair">4.8x</p>
          </div>
        </div>

        {/* Growth area chart */}
        <svg viewBox="0 0 280 100" className="w-full h-28 mb-3">
          <defs>
            <linearGradient id="growth-g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="growth-g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[25, 50, 75].map(y => (
            <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}

          {/* Baseline (before) */}
          <path d="M0,95 C60,90 120,85 180,80 S240,75 280,70" stroke="#10B981" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.5" />
          <path d="M0,95 C60,90 120,85 180,80 S240,75 280,70 L280,100 L0,100 Z" fill="url(#growth-g2)" />

          {/* Growth line (after) */}
          <motion.path
            d="M0,92 C35,78 70,60 110,42 S175,15 210,7 S255,2 280,1"
            stroke="#F5A623" strokeWidth="2.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          />
          <path d="M0,92 C35,78 70,60 110,42 S175,15 210,7 S255,2 280,1 L280,100 L0,100 Z" fill="url(#growth-g1)" />

          {/* Data points */}
          {[[110, 42], [210, 7], [280, 1]].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r="4"
              fill="#F5A623" stroke="#0A0A0F" strokeWidth="2"
              initial={{ scale: 0 }}
              animate={active ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.3, delay: active ? 1.5 + i * 0.15 : 0 }}
            />
          ))}
        </svg>

        <div className="flex justify-between text-[9px] text-white/30">
          {['Q1', 'Q2', 'Q3', 'Q4'].map(q => <span key={q}>{q}</span>)}
        </div>
      </div>

      {/* Floating metric cards */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -right-3 glass rounded-2xl px-4 py-3 border border-amber-500/30"
      >
        <div className="text-[9px] text-white/40">ROI</div>
        <div className="text-xl font-bold text-amber-400 font-playfair">+240%</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -bottom-4 -left-3 glass rounded-2xl px-4 py-3 border border-orange-500/20"
      >
        <div className="text-[9px] text-white/40">ROAS</div>
        <div className="text-xl font-bold text-orange-400 font-playfair">4.8x</div>
      </motion.div>
    </div>
  )
})

// ─── Slide backgrounds ────────────────────────────────────────────────────

const SLIDE_THEMES = [
  {
    aurora1: 'rgba(108,99,255,0.14)',
    aurora2: 'rgba(147,51,234,0.09)',
    accent: '#6C63FF',
  },
  {
    aurora1: 'rgba(20,184,166,0.14)',
    aurora2: 'rgba(16,185,129,0.09)',
    accent: '#14B8A6',
  },
  {
    aurora1: 'rgba(245,166,35,0.14)',
    aurora2: 'rgba(251,146,60,0.09)',
    accent: '#F5A623',
  },
]

// ─── Main Component ───────────────────────────────────────────────────────

export default function HeroCarousel({ locale }: { locale: string }) {
  const isTr = locale === 'tr'

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      emblaApi?.scrollNext()
    }, AUTOPLAY_DELAY)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      const nextIndex = emblaApi.selectedScrollSnap()
      setSelectedIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex)
    }
    emblaApi.on('select', onSelect)
    startTimer()
    return () => {
      emblaApi.off('select', onSelect)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [emblaApi, startTimer])

  const scrollPrev = useCallback(() => { emblaApi?.scrollPrev(); startTimer() }, [emblaApi, startTimer])
  const scrollNext = useCallback(() => { emblaApi?.scrollNext(); startTimer() }, [emblaApi, startTimer])
  const scrollTo = useCallback((i: number) => { emblaApi?.scrollTo(i); startTimer() }, [emblaApi, startTimer])

  const slides = useMemo(() => [
    {
      id: 1,
      badge: isTr ? '✦ Dijital Ajans — İstanbul' : '✦ Digital Agency — Istanbul',
      headline1: isTr ? 'Markanızı Dijitalde' : 'Elevate Your Brand',
      headline2: isTr ? 'Büyütüyoruz' : 'Digitally',
      subtext: isTr
        ? 'Strateji, tasarım ve teknolojiyi birleştirerek markanızı dijital dünyada öne çıkarıyor, rakiplerinizin önüne geçiriyoruz.'
        : 'Combining strategy, design, and technology to make your brand stand out and outperform in the digital world.',
      Illustration: DashboardIllustration,
    },
    {
      id: 2,
      badge: isTr ? '⚡ Web Tasarım & Geliştirme' : '⚡ Web Design & Development',
      headline1: isTr ? 'Performanslı' : 'High-Performance',
      headline2: isTr ? 'Web Siteleri' : 'Web Sites',
      subtext: isTr
        ? 'Next.js, React ve TypeScript ile 0.8 saniyede yüklenen, 100 PageSpeed skorlu web siteleri geliştiriyoruz.'
        : 'We build sites that load in 0.8 seconds with perfect PageSpeed scores using Next.js, React and TypeScript.',
      Illustration: BrowserIllustration,
    },
    {
      id: 3,
      badge: isTr ? '📈 Dijital Pazarlama & Büyüme' : '📈 Digital Marketing & Growth',
      headline1: isTr ? 'Ölçülebilir' : 'Measurable',
      headline2: isTr ? 'Büyüme' : 'Growth',
      subtext: isTr
        ? 'Veriye dayalı dijital pazarlama stratejileriyle ortalama %240 ROI ve 4.8x ROAS elde ediyoruz.'
        : 'Our data-driven digital marketing strategies deliver an average of +240% ROI and 4.8x ROAS for clients.',
      Illustration: GrowthIllustration,
    },
  ], [isTr])

  return (
    <div className="relative w-full">
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => {
            const theme = SLIDE_THEMES[index]
            const isActive = selectedIndex === index
            const { Illustration } = slide

            return (
              <div
                key={slide.id}
                className="relative flex-shrink-0 w-full min-h-screen bg-[#0A0A0F]"
              >
                {/* Aurora background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    animate={{ scale: [1, 1.12, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${theme.aurora1} 0%, transparent 70%)`,
                      filter: 'blur(60px)',
                    }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], x: [0, -40, 0], y: [0, 30, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                    className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${theme.aurora2} 0%, transparent 70%)`,
                      filter: 'blur(60px)',
                    }}
                  />
                  {/* Grid */}
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

                {/* Inactive slides keep their Embla geometry and background, but not their heavy content tree. */}
                {isActive && <div className="relative z-10 container-tight min-h-screen flex flex-col justify-center pt-28 pb-24">
                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left: Text content */}
                    <div className="text-center lg:text-left">
                      {/* Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6 flex justify-center lg:justify-start"
                      >
                        <div
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase"
                          style={{
                            background: `${theme.accent}14`,
                            border: `1px solid ${theme.accent}30`,
                            color: theme.accent,
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ background: theme.accent }}
                          />
                          {slide.badge}
                        </div>
                      </motion.div>

                      {/* Headline */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mb-5"
                      >
                        <h1 className="font-playfair font-bold leading-[1.05] tracking-tight">
                          <span className="block text-4xl md:text-6xl lg:text-7xl text-white">
                            {slide.headline1}
                          </span>
                          <span className="block text-4xl md:text-6xl lg:text-7xl text-amber-gradient mt-1">
                            {slide.headline2}
                          </span>
                        </h1>
                      </motion.div>

                      {/* Subtext */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="text-base md:text-lg text-white/50 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
                      >
                        {slide.subtext}
                      </motion.p>

                      {/* CTA Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                      >
                        <Link
                          href={localizedPath(locale, '/iletisim')}
                          className="group flex items-center gap-3 px-7 py-3.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-2xl text-sm hover:bg-[#FFD166] transition-all duration-300 animate-pulse-amber"
                        >
                          {isTr ? 'Projenizi Başlatın' : 'Start Your Project'}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                          href={localizedPath(locale, '/projeler')}
                          className="group flex items-center gap-3 px-7 py-3.5 glass border border-white/10 text-white font-semibold rounded-2xl text-sm hover:border-[#F5A623]/30 hover:bg-[#F5A623]/5 transition-all duration-300"
                        >
                          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors">
                            <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                          </div>
                          {isTr ? 'Çalışmaları İncele' : 'View Our Work'}
                        </Link>
                      </motion.div>
                    </div>

                    {/* Right: Illustration */}
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                      transition={{ duration: 0.8, delay: 0.25 }}
                      className="flex items-center justify-center px-8 lg:px-4"
                    >
                      <Illustration active={isActive} />
                    </motion.div>

                  </div>
                </div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass rounded-full flex items-center justify-center border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5 text-white/60" />
      </button>

      {/* Next arrow */}
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass rounded-full flex items-center justify-center border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5 text-white/60" />
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? 'w-7 h-2 bg-[#F5A623]'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-white/5">
        <motion.div
          key={selectedIndex}
          className="h-full bg-[#F5A623]/50"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: AUTOPLAY_DELAY / 1000, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
