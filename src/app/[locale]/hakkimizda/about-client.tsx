'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Target, Lightbulb, Heart, Zap, Users, Award, TrendingUp, Globe } from 'lucide-react'

function LinkedinIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
function TwitterIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
}
function GithubIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
}
import type { TeamMember } from '@/lib/db-types'

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

function StatItem({ value, suffix, labelTr, labelEn, isTr }: { value: number; suffix: string; labelTr: string; labelEn: string; isTr: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(value, isInView)
  return (
    <div ref={ref} className="text-center">
      <div className="font-playfair text-5xl md:text-6xl font-bold text-amber-gradient tabular-nums mb-2">{count}{suffix}</div>
      <div className="text-sm text-white/40">{isTr ? labelTr : labelEn}</div>
    </div>
  )
}

const VALUES = [
  { icon: Target, color: '#F5A623', titleTr: 'Sonuç Odaklı', titleEn: 'Results-Driven', descTr: 'Her proje için ölçülebilir hedefler belirler, başarıyı rakamlarla kanıtlarız.', descEn: 'We set measurable goals for every project and prove success with numbers.' },
  { icon: Lightbulb, color: '#6C63FF', titleTr: 'Yaratıcı Düşünce', titleEn: 'Creative Thinking', descTr: 'Alışılmışın dışında yaklaşımlarla her marka için özgün çözümler üretiriz.', descEn: 'We create unique solutions for every brand with outside-the-box approaches.' },
  { icon: Heart, color: '#F472B6', titleTr: 'Müşteri Önce', titleEn: 'Client First', descTr: 'Müşteri memnuniyeti bizim için bir öncelik değil, temel felsefemizdir.', descEn: 'Client satisfaction is not just a priority for us — it\'s our core philosophy.' },
  { icon: Zap, color: '#10B981', titleTr: 'Hız & Kalite', titleEn: 'Speed & Quality', descTr: 'Söz verilen tarihlerde, söz verilen kalitede. Hiçbir taviz vermeden.', descEn: 'On promised dates, with promised quality. Without any compromise.' },
]

const TIMELINE = [
  { year: '2012', color: '#F5A623', titleTr: 'Kuruluş', titleEn: 'Founded', descTr: '3 kişilik ekiple yola çıktık', descEn: 'Started with a team of 3' },
  { year: '2015', color: '#6C63FF', titleTr: 'İlk 50 Müşteri', titleEn: 'First 50 Clients', descTr: 'Türkiye\'nin önde gelen markalarıyla çalıştık', descEn: 'Worked with Turkey\'s leading brands' },
  { year: '2019', color: '#10B981', titleTr: 'Küresel Büyüme', titleEn: 'Global Growth', descTr: 'Avrupa ve Orta Doğu\'ya açıldık', descEn: 'Expanded to Europe and Middle East' },
  { year: '2024', color: '#F472B6', titleTr: 'AI Çağı', titleEn: 'AI Era', descTr: 'Yapay zeka araçlarını süreçlerimize entegre ettik', descEn: 'Integrated AI tools into our processes' },
]

function fi(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as any,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as any },
  }
}

export default function AboutClient({ locale, members }: { locale: string; members: TeamMember[] }) {
  const isTr = locale === 'tr'
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: '-80px' })

  return (
    <main className="bg-[#0A0A0F] min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8" ref={heroRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.35em] text-[#F5A623] mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#F5A623]/60" />
            {isTr ? 'Hakkımızda' : 'About Us'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 max-w-4xl"
          >
            {isTr ? (
              <>Markaları dijital dünyada<br /><span className="text-amber-gradient">büyütmek için varız</span></>
            ) : (
              <>We exist to grow brands<br /><span className="text-amber-gradient">in the digital world</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-xl leading-relaxed max-w-2xl"
          >
            {isTr
              ? 'Yaratıcılık, teknoloji ve stratejiyi bir araya getirerek kalıcı sonuçlar üreten İstanbul merkezli, küresel bakışlı dijital ajans.'
              : 'An Istanbul-based, globally-minded digital agency that combines creativity, technology and strategy to produce lasting results.'}
          </motion.p>
        </div>
      </section>

      {/* ─── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value={150} suffix="+" labelTr="Mutlu Müşteri" labelEn="Happy Clients" isTr={isTr} />
            <StatItem value={12} suffix="+" labelTr="Yıl Deneyim" labelEn="Years Experience" isTr={isTr} />
            <StatItem value={340} suffix="%" labelTr="Ort. Büyüme" labelEn="Avg. Growth" isTr={isTr} />
            <StatItem value={98} suffix="%" labelTr="Memnuniyet" labelEn="Satisfaction" isTr={isTr} />
          </div>
        </div>
      </section>

      {/* ─── Story ─────────────────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.p {...fi(0)} className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-[#F5A623]/60" />{isTr ? 'Hikayemiz' : 'Our Story'}
              </motion.p>
              <motion.h2 {...fi(0.1)} className="font-playfair text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                {isTr ? 'Küçük ekip,\nbüyük vizyon' : 'Small team,\nbig vision'}
              </motion.h2>
              <motion.div {...fi(0.2)} className="space-y-5 text-white/55 leading-relaxed">
                <p>
                  {isTr
                    ? '2012\'de 3 kişilik bir ekiple "dijital dünyada fark yaratabiliriz" inancıyla yola çıktık. İlk yıl zorlu geçti — ama her zorluk bizi daha güçlü yaptı.'
                    : "In 2012, we set out with a team of 3 and the belief that 'we can make a difference in the digital world.' The first year was tough — but every challenge made us stronger."}
                </p>
                <p>
                  {isTr
                    ? 'Bugün 30\'dan fazla uzman profesyonelden oluşan bir ekiple, Türkiye\'nin en iyi markaları ve global şirketler için çalışıyoruz. Her projede müşterilerimizin başarısını kendi başarımız olarak görüyoruz.'
                    : "Today, with a team of more than 30 expert professionals, we work for Turkey's best brands and global companies. In every project, we see our clients' success as our own."}
                </p>
              </motion.div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#F5A623]/40 via-white/10 to-transparent" />
              <div className="space-y-6">
                {TIMELINE.map((item, i) => (
                  <motion.div key={item.year} {...fi(i * 0.1)} className="relative pl-14">
                    <div className="absolute left-0 top-3 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold z-10" style={{ background: `${item.color}20`, border: `2px solid ${item.color}60`, color: item.color }}>
                      {item.year.slice(2)}
                    </div>
                    <div className="glass rounded-2xl p-5" style={{ borderColor: `${item.color}20` }}>
                      <div className="font-semibold text-white mb-1">{isTr ? item.titleTr : item.titleEn}</div>
                      <div className="text-sm text-white/45">{isTr ? item.descTr : item.descEn}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fi(0)} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#F5A623]/60" />{isTr ? 'Değerlerimiz' : 'Our Values'}<span className="w-8 h-px bg-[#F5A623]/60" />
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
              {isTr ? 'Bizi biz yapan değerler' : 'The values that define us'}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.titleEn} {...fi(i * 0.1)} className="group glass rounded-2xl p-7 hover:border-opacity-50 transition-all" style={{ borderColor: `${v.color}20` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: `${v.color}15`, border: `1px solid ${v.color}30` }}>
                  <v.icon className="w-6 h-6" style={{ color: v.color }} />
                </div>
                <h3 className="font-playfair text-lg font-bold text-white mb-3">{isTr ? v.titleTr : v.titleEn}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{isTr ? v.descTr : v.descEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ──────────────────────────────────────────────────────────── */}
      {members.length > 0 && (
        <section className="py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fi(0)} className="mb-14">
              <p className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-[#F5A623]/60" />{isTr ? 'Ekibimiz' : 'Our Team'}
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
                {isTr ? 'Arkamızdaki yetenekler' : 'The talent behind us'}
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {members.map((member, i) => (
                <motion.div key={member.id} {...fi(i * 0.07)} className="group glass rounded-2xl p-6 hover:border-[#F5A623]/25 transition-all">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center mx-auto mb-5 font-playfair font-bold text-xl text-[#F5A623] group-hover:scale-105 transition-transform">
                    {(isTr ? member.nameTr : member.nameEn).charAt(0)}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white mb-1">{isTr ? member.nameTr : member.nameEn}</div>
                    <div className="text-sm text-[#F5A623]/80 mb-3">{isTr ? member.roleTr : member.roleEn}</div>
                    {(isTr ? member.bioTr : member.bioEn) && (
                      <p className="text-xs text-white/40 line-clamp-2 mb-4">{isTr ? member.bioTr : member.bioEn}</p>
                    )}
                    <div className="flex justify-center gap-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg glass flex items-center justify-center text-white/30 hover:text-[#F5A623] hover:border-[#F5A623]/30 transition-all">
                          <LinkedinIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg glass flex items-center justify-center text-white/30 hover:text-[#F5A623] hover:border-[#F5A623]/30 transition-all">
                          <TwitterIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg glass flex items-center justify-center text-white/30 hover:text-[#F5A623] hover:border-[#F5A623]/30 transition-all">
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fi(0)} className="glass rounded-3xl p-12 border-[#F5A623]/15">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              {isTr ? 'Ekibimizin bir parçası olun' : 'Become part of our team'}
            </h2>
            <p className="text-white/50 mb-8">
              {isTr ? 'Fikrinizi bizimle paylaşın. Birlikte büyüyelim.' : 'Share your idea with us. Let\'s grow together.'}
            </p>
            <Link href={`/${locale}/iletisim`} className="inline-flex items-center gap-2 px-10 py-4 bg-[#F5A623] text-[#0A0A0F] font-bold rounded-xl hover:bg-[#FFD166] transition-all text-base">
              {isTr ? 'İletişime Geç' : 'Get in Touch'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
