'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { localizedPath } from '@/lib/locale-path'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Tag, Calendar, User, TrendingUp } from 'lucide-react'
import type { Project } from '@/lib/db-types'

const METRICS_MAP: Record<string, { tr: { value: string; label: string }[]; en: { value: string; label: string }[] }> = {
  'moda-brand-redesign': {
    tr: [{ value: '+240%', label: 'Organik Trafik' }, { value: '+85%', label: 'Dönüşüm Oranı' }, { value: '3.2x', label: 'ROI' }],
    en: [{ value: '+240%', label: 'Organic Traffic' }, { value: '+85%', label: 'Conversion Rate' }, { value: '3.2x', label: 'ROI' }],
  },
  'saas-dashboard': {
    tr: [{ value: '60%', label: 'Daha Hızlı Yükleme' }, { value: '+40%', label: 'Kullanıcı Retansiyonu' }, { value: '4.9/5', label: 'Müşteri Skoru' }],
    en: [{ value: '60%', label: 'Faster Load Time' }, { value: '+40%', label: 'User Retention' }, { value: '4.9/5', label: 'Client Score' }],
  },
}

const DEFAULT_METRICS = {
  tr: [{ value: '+180%', label: 'Organik Trafik' }, { value: '+65%', label: 'Dönüşüm Oranı' }, { value: '98%', label: 'Memnuniyet' }],
  en: [{ value: '+180%', label: 'Organic Traffic' }, { value: '+65%', label: 'Conversion Rate' }, { value: '98%', label: 'Satisfaction' }],
}

const GRADIENT_MAP: Record<number, string> = {
  0: 'from-[#F5A623]/15 to-[#6C63FF]/10',
  1: 'from-[#6C63FF]/15 to-[#10B981]/10',
  2: 'from-[#10B981]/15 to-[#F472B6]/10',
}

export default function ProjectDetailClient({
  locale, project, related,
}: {
  locale: string
  project: Project
  related: Project[]
}) {
  const isTr = locale === 'tr'
  const title = isTr ? project.titleTr : project.titleEn
  const desc = isTr ? project.descTr : project.descEn
  const metrics = (METRICS_MAP[project.slug] ?? DEFAULT_METRICS)
  const metricsData = isTr ? metrics.tr : metrics.en

  const metricsRef = useRef<HTMLDivElement>(null)
  const isMetricsInView = useInView(metricsRef, { once: true, margin: '-80px' })
  const relatedRef = useRef<HTMLDivElement>(null)
  const isRelatedInView = useInView(relatedRef, { once: true, margin: '-80px' })

  const formatDate = (str: string) => new Date(str).toLocaleDateString(isTr ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long' })

  return (
    <main className="bg-[#0A0A0F] min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href={localizedPath(locale, '/projeler')} className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#F5A623] transition-colors mb-12 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {isTr ? 'Tüm Projeler' : 'All Projects'}
            </Link>
          </motion.div>

          {/* Meta info */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="flex flex-wrap items-center gap-4 mb-5">
            {project.client && (
              <div className="flex items-center gap-1.5 text-sm text-[#F5A623]/80 font-medium">
                <User className="w-3.5 h-3.5" />{project.client}
              </div>
            )}
            {project.createdAt && (
              <div className="flex items-center gap-1.5 text-sm text-white/30">
                <Calendar className="w-3.5 h-3.5" />{formatDate(project.createdAt)}
              </div>
            )}
            {(project.tags ?? []).slice(0, 2).map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full glass text-xs text-white/50">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-[#F5A623] glass-amber hover:bg-[#F5A623]/15 transition-all">
                <ExternalLink className="w-3 h-3" />{isTr ? 'Canlı Site' : 'Live Site'}
              </a>
            )}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-12">
            {title}
          </motion.h1>

          {/* Hero image */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }} className="relative aspect-[16/7] rounded-3xl overflow-hidden">
            {project.image ? (
              <Image src={project.image} alt={title} fill sizes="(max-width: 1024px) 100vw, 896px" className="object-cover" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${GRADIENT_MAP[0]} flex items-center justify-center`}>
                <span className="text-8xl opacity-20">✦</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Description + Tags ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-lg text-white/60 leading-relaxed mb-8"
              >
                {desc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-wrap gap-2"
              >
                {(project.tags ?? []).map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-xl glass text-sm text-white/60 border border-white/8">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Sidebar info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5"
            >
              {project.client && (
                <div className="glass rounded-2xl p-5">
                  <div className="text-xs text-white/30 uppercase tracking-wide mb-2">{isTr ? 'Müşteri' : 'Client'}</div>
                  <div className="font-semibold text-white">{project.client}</div>
                </div>
              )}
              {(project.tags ?? []).length > 0 && (
                <div className="glass rounded-2xl p-5">
                  <div className="text-xs text-white/30 uppercase tracking-wide mb-3">{isTr ? 'Teknolojiler' : 'Technologies'}</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/20">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
              {project.url && (
                <a href={project.url} target="_blank" rel="noreferrer" className="flex items-center justify-between glass rounded-2xl p-5 hover:border-[#F5A623]/30 transition-all group">
                  <span className="text-sm text-white/60">{isTr ? 'Projeyi Ziyaret Et' : 'Visit Project'}</span>
                  <ExternalLink className="w-4 h-4 text-[#F5A623] group-hover:scale-110 transition-transform" />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Results / Metrics ─────────────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5 bg-white/[0.015]" ref={metricsRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isMetricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-10"
          >
            <TrendingUp className="w-5 h-5 text-[#F5A623]" />
            <h2 className="font-playfair text-2xl font-bold text-white">
              {isTr ? 'Proje Sonuçları' : 'Project Results'}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {metricsData.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} animate={isMetricsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="glass rounded-2xl p-8 text-center border border-[#F5A623]/15 bg-[#F5A623]/3"
              >
                <div className="font-playfair text-4xl font-bold text-[#F5A623] mb-2">{metric.value}</div>
                <div className="text-sm text-white/50">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Image Gallery ─────────────────────────────────────────────────── */}
      {(project.images ?? []).length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-playfair text-2xl font-bold text-white mb-8">{isTr ? 'Proje Görselleri' : 'Project Gallery'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative aspect-video rounded-2xl overflow-hidden"
                >
                  <Image src={img} alt={`${title} ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Related Projects ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-20 border-t border-white/5" ref={relatedRef}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={isRelatedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-10"
            >
              <h2 className="font-playfair text-2xl font-bold text-white">{isTr ? 'Benzer Projeler' : 'Similar Projects'}</h2>
              <Link href={localizedPath(locale, '/projeler')} className="text-sm text-[#F5A623] hover:text-[#FFD166] flex items-center gap-1.5 transition-colors">
                {isTr ? 'Tümünü Gör' : 'View All'} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 30 }} animate={isRelatedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link href={localizedPath(locale, `/projeler/${rel.slug}`)} className="group block">
                    <div className={`aspect-video rounded-2xl overflow-hidden mb-4 bg-gradient-to-br ${GRADIENT_MAP[i] ?? GRADIENT_MAP[0]} flex items-center justify-center relative`}>
                      {rel.image && <Image src={rel.image} alt={isTr ? rel.titleTr : rel.titleEn} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />}
                      {!rel.image && <span className="text-4xl opacity-20">✦</span>}
                      <div className="absolute inset-0 bg-[#0A0A0F]/70 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    {rel.client && <div className="text-xs text-[#F5A623]/70 mb-1">{rel.client}</div>}
                    <h3 className="font-semibold text-white group-hover:text-[#F5A623] transition-colors">
                      {isTr ? rel.titleTr : rel.titleEn}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-white mb-1">{isTr ? 'Benzer bir proje mi istiyorsunuz?' : 'Want a similar project?'}</h2>
            <p className="text-white/40 text-sm">{isTr ? 'Projenizi bizimle paylaşın.' : 'Share your project with us.'}</p>
          </div>
          <Link href={localizedPath(locale, '/iletisim')} className="flex-shrink-0 flex items-center gap-2 px-8 py-3.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl hover:bg-[#FFD166] transition-all">
            {isTr ? 'Teklif Al' : 'Get Quote'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
