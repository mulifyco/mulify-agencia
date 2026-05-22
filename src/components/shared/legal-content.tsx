'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { localizedPath } from '@/lib/locale-path'

interface Section {
  id: string
  title: string
}

interface LegalContentProps {
  locale: string
  titleTr: string
  titleEn: string
  subtitleTr: string
  subtitleEn: string
  sections: Section[]
  contentHtml: string
}

export default function LegalContent({
  locale,
  titleTr,
  titleEn,
  subtitleTr,
  subtitleEn,
  sections,
  contentHtml,
}: LegalContentProps) {
  const isTr = locale === 'tr'
  const title = isTr ? titleTr : titleEn
  const subtitle = isTr ? subtitleTr : subtitleEn
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <main className="bg-[#0A0A0F] min-h-screen">
      {/* Aurora bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      {/* Hero */}
      <div className="relative pt-36 pb-14 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/30 mb-6">
            <Link href={localizedPath(locale, '/')} className="hover:text-white/60 transition-colors">
              {isTr ? 'Ana Sayfa' : 'Home'}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/50">{title}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#F5A623] mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[#F5A623]/60" />
              {isTr ? 'Yasal Bilgiler' : 'Legal Information'}
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {title}
            </h1>
            <p className="text-white/40 text-base max-w-xl">{subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* Body: sidebar + content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-[260px_1fr] gap-16">

          {/* Sticky TOC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">
                {isTr ? 'İçindekiler' : 'Contents'}
              </p>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                      activeSection === sec.id
                        ? 'text-[#F5A623] bg-[#F5A623]/8'
                        : 'text-white/35 hover:text-white/65 hover:bg-white/4'
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors ${
                        activeSection === sec.id ? 'bg-[#F5A623]' : 'bg-white/20 group-hover:bg-white/40'
                      }`}
                    />
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article
            className="legal-prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>

      <style>{`
        .legal-prose section {
          margin-bottom: 3rem;
          scroll-margin-top: 7rem;
        }
        .legal-prose h2 {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .legal-prose h2::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 1.2em;
          background: #F5A623;
          border-radius: 2px;
          margin-right: 0.6rem;
          vertical-align: middle;
        }
        .legal-prose h3 {
          font-size: 0.9rem;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 1.5rem 0 0.6rem;
        }
        .legal-prose p {
          color: rgba(255,255,255,0.55);
          font-size: 0.925rem;
          line-height: 1.85;
          margin-bottom: 0.9rem;
        }
        .legal-prose ul {
          margin: 0.75rem 0 1rem 0;
          padding-left: 0;
          list-style: none;
        }
        .legal-prose ul li {
          position: relative;
          padding-left: 1.4rem;
          color: rgba(255,255,255,0.5);
          font-size: 0.9rem;
          line-height: 1.75;
          margin-bottom: 0.45rem;
        }
        .legal-prose ul li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #F5A623;
          font-size: 0.75rem;
          top: 0.15em;
        }
        .legal-prose strong {
          color: rgba(255,255,255,0.8);
          font-weight: 600;
        }
        .legal-prose a {
          color: #F5A623;
          text-decoration: none;
          border-bottom: 1px solid rgba(245,166,35,0.3);
          transition: border-color 0.2s;
        }
        .legal-prose a:hover {
          border-color: #F5A623;
        }
        .legal-prose code {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.15em 0.45em;
          border-radius: 5px;
          font-size: 0.8em;
          color: rgba(255,255,255,0.75);
          font-family: 'Fira Code', 'Courier New', monospace;
        }
        .legal-prose .info-box {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(245,166,35,0.08);
          border: 1px solid rgba(245,166,35,0.2);
          border-radius: 8px;
          padding: 0.5rem 0.9rem;
          font-size: 0.8rem;
          color: #F5A623;
          margin: 0.5rem 0 1.5rem;
        }
        .legal-prose .contact-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          margin: 1rem 0;
        }
        .legal-prose .contact-card p {
          margin-bottom: 0.35rem;
          font-size: 0.875rem;
        }
        .legal-prose .cookie-table-wrapper {
          overflow-x: auto;
          margin: 1rem 0 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .legal-prose .cookie-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .legal-prose .cookie-table th {
          background: rgba(245,166,35,0.12);
          color: #F5A623;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 10px 14px;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .legal-prose .cookie-table td {
          padding: 10px 14px;
          color: rgba(255,255,255,0.55);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          vertical-align: top;
        }
        .legal-prose .cookie-table tr:last-child td {
          border-bottom: none;
        }
        .legal-prose .cookie-table tr:nth-child(odd) td {
          background: rgba(255,255,255,0.01);
        }
      `}</style>
    </main>
  )
}
