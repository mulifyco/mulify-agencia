'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { localizedPath } from '@/lib/locale-path'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Link2 } from 'lucide-react'

function TwitterIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
}
function LinkedinIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
import type { Post } from '@/lib/db-types'

const GRADIENTS = [
  'from-[#6C63FF]/20 to-[#F5A623]/10',
  'from-[#F5A623]/20 to-[#10B981]/10',
  'from-[#10B981]/20 to-[#06B6D4]/10',
]

function readTime(content: string, isTr: boolean) {
  const words = (content ?? '').split(/\s+/).filter(Boolean).length || 400
  const mins = Math.max(2, Math.round(words / 200))
  return isTr ? `${mins} dk okuma` : `${mins} min read`
}

function formatDate(dateStr: string | null, isTr: boolean) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(isTr ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function extractHeadings(md: string): { id: string; text: string; level: number }[] {
  const lines = md.split('\n')
  return lines
    .filter((l) => /^#{1,3} /.test(l))
    .map((l) => {
      const level = l.match(/^#+/)?.[0].length ?? 1
      const text = l.replace(/^#+\s*/, '')
      const id = text.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')
      return { id, text, level }
    })
}

function renderMarkdown(text: string): string {
  if (!text) return ''
  return text
    .replace(/^### (.+)$/gm, (_, t) => {
      const id = t.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')
      return `<h3 id="${id}" class="font-semibold text-xl text-white mt-8 mb-3 scroll-mt-24">${t}</h3>`
    })
    .replace(/^## (.+)$/gm, (_, t) => {
      const id = t.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')
      return `<h2 id="${id}" class="font-playfair text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">${t}</h2>`
    })
    .replace(/^# (.+)$/gm, (_, t) => {
      const id = t.toLowerCase().replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '').replace(/\s+/g, '-')
      return `<h1 id="${id}" class="font-playfair text-3xl font-bold text-white mt-12 mb-5 scroll-mt-24">${t}</h1>`
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-white/80 italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[#F5A623] text-sm font-mono">$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-[#F5A623]/50 pl-5 py-2 my-4 text-white/60 italic bg-[#F5A623]/3 rounded-r-xl">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2.5 text-white/60 my-1.5"><span class="text-[#F5A623] mt-1 flex-shrink-0 text-xs">▸</span><span>$1</span></li>')
    .replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul class="my-4 space-y-1">$&</ul>')
    .replace(/\n\n/g, '</p><p class="text-white/60 leading-relaxed my-4">')
}

function CopyLinkButton({ isTr }: { isTr: boolean }) {
  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
    }
  }
  return (
    <button onClick={handleCopy} className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/40 hover:text-[#F5A623] hover:border-[#F5A623]/30 transition-all" title={isTr ? 'Bağlantıyı Kopyala' : 'Copy Link'}>
      <Link2 className="w-4 h-4" />
    </button>
  )
}

export default function BlogPostClient({ locale, post, related }: { locale: string; post: Post; related: Post[] }) {
  const isTr = locale === 'tr'
  const title = isTr ? post.titleTr : post.titleEn
  const excerpt = isTr ? post.excerptTr : post.excerptEn
  const content = isTr ? post.contentTr : post.contentEn

  const headings = extractHeadings(content)

  const relatedRef = useRef<HTMLDivElement>(null)
  const isRelatedInView = useInView(relatedRef, { once: true, margin: '-80px' })

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`

  return (
    <main className="bg-[#0A0A0F] min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href={localizedPath(locale, '/blog')} className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#F5A623] transition-colors mb-10 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Blog
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            {/* Tags */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="flex flex-wrap items-center gap-3 mb-5">
              {(post.tags ?? []).map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full glass text-xs text-[#F5A623]">
                  <Tag className="w-3 h-3" />{tag}
                </span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
              className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
            >
              {title}
            </motion.h1>

            {/* Excerpt */}
            {excerpt && (
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/50 leading-relaxed mb-8 border-l-2 border-[#F5A623]/40 pl-4">
                {excerpt}
              </motion.p>
            )}

            {/* Meta + Share */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-white/8">
              <div className="flex items-center gap-5 text-xs text-white/30">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(post.publishedAt, isTr)}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{readTime(content, isTr)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30 mr-1">{isTr ? 'Paylaş:' : 'Share:'}</span>
                <a href={twitterHref} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/40 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all">
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a href={linkedinHref} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/40 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <CopyLinkButton isTr={isTr} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Cover Image ─────────────────────────────────────────────────────── */}
      {post.coverImage && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative aspect-[16/6] rounded-3xl overflow-hidden max-w-3xl"
            >
              <Image src={post.coverImage} alt={title} fill sizes="(max-width: 1024px) 100vw, 768px" className="object-cover" />
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── Content + TOC Sidebar ───────────────────────────────────────────── */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`grid gap-16 ${headings.length > 2 ? 'lg:grid-cols-[1fr_240px]' : ''}`}>
            {/* Article body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              {content ? (
                <div
                  className="prose-custom"
                  dangerouslySetInnerHTML={{
                    __html: `<p class="text-white/60 leading-relaxed my-4">${renderMarkdown(content)}</p>`,
                  }}
                />
              ) : (
                <div className="text-white/30 text-center py-16">
                  <div className="text-4xl mb-3 opacity-30">✦</div>
                  <p>{isTr ? 'İçerik yakında eklenecek.' : 'Content coming soon.'}</p>
                </div>
              )}

              {/* Bottom share strip */}
              <div className="mt-16 pt-8 border-t border-white/8 flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {(post.tags ?? []).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-xl glass text-xs text-white/50 border border-white/8">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/30">{isTr ? 'Paylaş:' : 'Share:'}</span>
                  <a href={twitterHref} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/40 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all">
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                  <a href={linkedinHref} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/40 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <CopyLinkButton isTr={isTr} />
                </div>
              </div>
            </motion.div>

            {/* TOC Sidebar */}
            {headings.length > 2 && (
              <aside className="hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="sticky top-28 glass rounded-2xl p-6"
                >
                  <div className="text-xs text-white/30 uppercase tracking-wide mb-4">{isTr ? 'İçindekiler' : 'Contents'}</div>
                  <nav className="space-y-2">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block text-sm leading-snug transition-colors hover:text-[#F5A623] text-white/40 ${h.level === 1 ? 'font-semibold' : h.level === 2 ? 'pl-2' : 'pl-4 text-xs'}`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </motion.div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* ─── Related Posts ───────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-20 border-t border-white/5" ref={relatedRef}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={isRelatedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-10"
            >
              <h2 className="font-playfair text-2xl font-bold text-white">{isTr ? 'İlgili Yazılar' : 'Related Posts'}</h2>
              <Link href={localizedPath(locale, '/blog')} className="text-sm text-[#F5A623] hover:text-[#FFD166] flex items-center gap-1.5 transition-colors">
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
                  <Link href={localizedPath(locale, `/blog/${rel.slug}`)} className="group block glass rounded-2xl overflow-hidden hover:border-[#F5A623]/30 transition-all h-full">
                    <div className={`aspect-video relative overflow-hidden bg-gradient-to-br ${GRADIENTS[i % 3]} flex items-center justify-center`}>
                      {rel.coverImage ? (
                        <Image src={rel.coverImage} alt={isTr ? rel.titleTr : rel.titleEn} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <span className="text-3xl opacity-20">✦</span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(rel.tags ?? []).slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 text-white/40">{tag}</span>
                        ))}
                      </div>
                      <h3 className="font-playfair text-base font-bold text-white group-hover:text-[#F5A623] transition-colors line-clamp-2 mb-2">
                        {isTr ? rel.titleTr : rel.titleEn}
                      </h3>
                      <div className="text-xs text-white/30 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />{formatDate(rel.publishedAt, isTr)}
                      </div>
                    </div>
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
            <h2 className="font-playfair text-2xl font-bold text-white mb-1">{isTr ? 'Projenizi tartışalım' : "Let's talk about your project"}</h2>
            <p className="text-white/40 text-sm">{isTr ? 'Bu yazı ilginizi çektiyse, sizin için neler yapabileceğimize bakalım.' : "If this post caught your eye, let's see what we can build together."}</p>
          </div>
          <Link href={localizedPath(locale, '/iletisim')} className="flex-shrink-0 flex items-center gap-2 px-8 py-3.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl hover:bg-[#FFD166] transition-all">
            {isTr ? 'Teklif Al' : 'Get Quote'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
