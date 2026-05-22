'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { localizedPath } from '@/lib/locale-path'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Calendar, Clock, Search, Tag } from 'lucide-react'
import type { Post } from '@/lib/db-types'

const PLACEHOLDER_POSTS: Post[] = [
  {
    id: '1', slug: 'dijital-pazarlama-trendleri-2025',
    titleTr: 'Dijital Pazarlama Trendleri 2025', titleEn: 'Digital Marketing Trends 2025',
    excerptTr: 'Bu yıl markanızı büyütecek en önemli dijital pazarlama trendleri ve stratejileri.', excerptEn: 'The most important digital marketing trends and strategies that will grow your brand this year.',
    contentTr: '', contentEn: '', coverImage: null, tags: ['SEO', 'Pazarlama'],
    published: true, publishedAt: '2025-03-15T00:00:00Z', createdAt: '2025-03-15T00:00:00Z', updatedAt: '2025-03-15T00:00:00Z', authorId: null,
  },
  {
    id: '2', slug: 'nextjs-14-app-router',
    titleTr: 'Next.js 14 ile Modern Web Geliştirme', titleEn: 'Modern Web Dev with Next.js 14',
    excerptTr: 'Next.js 14 App Router ile performanslı ve SEO dostu web uygulamaları nasıl geliştirilir?', excerptEn: 'How to build performant, SEO-friendly web applications with Next.js 14 App Router.',
    contentTr: '', contentEn: '', coverImage: null, tags: ['Next.js', 'React'],
    published: true, publishedAt: '2025-02-20T00:00:00Z', createdAt: '2025-02-20T00:00:00Z', updatedAt: '2025-02-20T00:00:00Z', authorId: null,
  },
  {
    id: '3', slug: 'ui-ux-tasarim-ilkeleri',
    titleTr: 'Başarılı UI/UX Tasarımın 10 İlkesi', titleEn: '10 Principles of Successful UI/UX Design',
    excerptTr: 'Kullanıcı deneyimini iyileştiren ve dönüşüm oranlarını artıran temel tasarım ilkeleri.', excerptEn: 'Core design principles that improve user experience and increase conversion rates.',
    contentTr: '', contentEn: '', coverImage: null, tags: ['UI/UX', 'Tasarım'],
    published: true, publishedAt: '2025-01-10T00:00:00Z', createdAt: '2025-01-10T00:00:00Z', updatedAt: '2025-01-10T00:00:00Z', authorId: null,
  },
  {
    id: '4', slug: 'e-ticaret-donusum-optimizasyonu',
    titleTr: 'E-Ticaret Sitelerinde Dönüşüm Optimizasyonu', titleEn: 'Conversion Optimization for E-Commerce',
    excerptTr: 'Online mağazanızın satışlarını artırmak için kanıtlanmış optimizasyon teknikleri.', excerptEn: 'Proven optimization techniques to boost sales in your online store.',
    contentTr: '', contentEn: '', coverImage: null, tags: ['E-Ticaret', 'SEO'],
    published: true, publishedAt: '2024-12-05T00:00:00Z', createdAt: '2024-12-05T00:00:00Z', updatedAt: '2024-12-05T00:00:00Z', authorId: null,
  },
]

const GRADIENTS = [
  'from-[#6C63FF]/20 to-[#F5A623]/10',
  'from-[#F5A623]/20 to-[#10B981]/10',
  'from-[#10B981]/20 to-[#06B6D4]/10',
  'from-[#F472B6]/20 to-[#6C63FF]/10',
]

function readTime(content: string, isTr: boolean) {
  const words = (content ?? '').split(/\s+/).length || 300
  const mins = Math.max(1, Math.round(words / 200))
  return isTr ? `${mins} dk okuma` : `${mins} min read`
}

function formatDate(dateStr: string | null, isTr: boolean) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(isTr ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function PostCard({ post, index, locale }: { post: Post; index: number; locale: string }) {
  const isTr = locale === 'tr'
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] as any }}
    >
      <Link href={localizedPath(locale, `/blog/${post.slug}`)} className="group block glass rounded-2xl overflow-hidden hover:border-[#F5A623]/30 transition-all duration-300 h-full">
        {/* Image */}
        <div className={`aspect-video relative overflow-hidden bg-gradient-to-br ${GRADIENTS[index % 4]} flex items-center justify-center`}>
          {post.coverImage ? (
            <img src={post.coverImage} alt={isTr ? post.titleTr : post.titleEn} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <span className="text-4xl opacity-20 transition-transform duration-700 group-hover:scale-110">✦</span>
          )}
          {/* Tags overlay */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {(post.tags ?? []).slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#0A0A0F]/70 backdrop-blur-sm text-white/70 flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" />{tag}
              </span>
            ))}
          </div>
          {index === 0 && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[#F5A623] text-[#0A0A0F]">
              {isTr ? 'Yeni' : 'New'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-[#F5A623] transition-colors line-clamp-2">
            {isTr ? post.titleTr : post.titleEn}
          </h3>
          <p className="text-white/40 text-sm line-clamp-2 mb-4 leading-relaxed">
            {isTr ? post.excerptTr : post.excerptEn}
          </p>
          <div className="flex items-center justify-between text-xs text-white/30">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.publishedAt, isTr)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime(isTr ? post.contentTr : post.contentEn, isTr)}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#F5A623] opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlogListClient({ locale, posts }: { locale: string; posts: Post[] }) {
  const isTr = locale === 'tr'
  const displayPosts = posts.length > 0 ? posts : PLACEHOLDER_POSTS

  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(displayPosts.flatMap((p) => p.tags ?? [])))

  const filtered = displayPosts.filter((p) => {
    const matchTag = !activeTag || (p.tags ?? []).includes(activeTag)
    const q = search.toLowerCase()
    const matchSearch = !q || (isTr ? p.titleTr : p.titleEn).toLowerCase().includes(q) || (isTr ? p.excerptTr : p.excerptEn)?.toLowerCase().includes(q)
    return matchTag && matchSearch
  })

  const [featured, ...rest] = filtered

  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <main className="bg-[#0A0A0F] min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], x: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 right-1/4 w-[600px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)', filter: 'blur(70px)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8" ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.35em] text-[#F5A623] mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#F5A623]/60" />
            Blog
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as any }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
          >
            {isTr ? (
              <>Dijital dünyadan<br /><span className="text-amber-gradient">içgörüler</span></>
            ) : (
              <>Insights from<br /><span className="text-amber-gradient">the digital world</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mb-10"
          >
            {isTr
              ? 'Sektör trendleri, teknik rehberler ve dijital pazarlama ipuçları — her hafta yeni içerik.'
              : 'Industry trends, technical guides, and digital marketing tips — new content every week.'}
          </motion.p>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            {/* Search */}
            <div className="relative flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isTr ? 'Yazı ara...' : 'Search posts...'}
                className="pl-10 pr-4 py-2.5 rounded-xl glass text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F5A623]/40 transition-all w-56"
              />
            </div>
            {/* Tag filters */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!activeTag ? 'bg-[#F5A623] text-[#0A0A0F]' : 'glass text-white/60 hover:text-white hover:border-white/20'}`}
                >
                  {isTr ? 'Tümü' : 'All'}
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTag === tag ? 'bg-[#F5A623] text-[#0A0A0F]' : 'glass text-white/60 hover:text-white hover:border-white/20'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Posts ─────────────────────────────────────────────────────────── */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-32 text-white/30">
                <div className="text-5xl mb-4">✦</div>
                <p>{isTr ? 'Arama kriterinize uygun yazı bulunamadı.' : 'No posts found matching your criteria.'}</p>
              </motion.div>
            ) : (
              <motion.div key={`${activeTag}-${search}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {/* Featured */}
                {featured && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
                    className="mb-10"
                  >
                    <Link href={localizedPath(locale, `/blog/${featured.slug}`)} className="group block glass rounded-2xl overflow-hidden hover:border-[#F5A623]/30 transition-all duration-300">
                      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-0">
                        <div className={`aspect-video lg:aspect-auto min-h-[280px] relative overflow-hidden bg-gradient-to-br ${GRADIENTS[0]} flex items-center justify-center`}>
                          {featured.coverImage ? (
                            <img src={featured.coverImage} alt={isTr ? featured.titleTr : featured.titleEn} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                            <span className="text-7xl opacity-15 transition-transform duration-700 group-hover:scale-110">✦</span>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0F]/50" />
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <div className="flex flex-wrap items-center gap-2 mb-5">
                            {(featured.tags ?? []).slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] glass text-white/50 flex items-center gap-1">
                                <Tag className="w-2.5 h-2.5" />{tag}
                              </span>
                            ))}
                          </div>
                          <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#F5A623] transition-colors leading-tight">
                            {isTr ? featured.titleTr : featured.titleEn}
                          </h2>
                          <p className="text-white/40 leading-relaxed mb-6 text-sm lg:text-base">
                            {isTr ? featured.excerptTr : featured.excerptEn}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-white/30">
                              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(featured.publishedAt, isTr)}</span>
                              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{readTime(isTr ? featured.contentTr : featured.contentEn, isTr)}</span>
                            </div>
                            <span className="flex items-center gap-1.5 text-sm text-[#F5A623] font-medium">
                              {isTr ? 'Oku' : 'Read'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* Grid */}
                {rest.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post, i) => (
                      <PostCard key={post.id} post={post} index={i} locale={locale} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-playfair text-3xl font-bold text-white mb-3">
              {isTr ? 'Projenizi tartışalım' : "Let's talk about your project"}
            </h2>
            <p className="text-white/40 text-sm mb-8">
              {isTr ? 'İçeriklerimiz ilginizi çektiyse, sizin için neler yapabileceğimize bakalım.' : "If our content caught your attention, let's see what we can do for you."}
            </p>
            <Link href={localizedPath(locale, '/iletisim')} className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl hover:bg-[#FFD166] transition-all">
              {isTr ? 'Teklif Al' : 'Get Quote'} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
