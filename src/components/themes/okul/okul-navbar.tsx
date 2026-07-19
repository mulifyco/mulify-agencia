'use client'

import { useState, useEffect } from 'react'
import Link from '@/components/themes/theme-link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react'
import type { ThemeSite } from '@/lib/db-types'

const NAV_LINKS = [
  { label: 'Ana Sayfa',   href: '/projeler/okul' },
  { label: 'Hakkımızda', href: '/projeler/okul/hakkimizda' },
  { label: 'Galeri',     href: '/projeler/okul/galeri' },
  { label: 'Blog',       href: '/projeler/okul/blog' },
  { label: 'İletişim',   href: '/projeler/okul/iletisim' },
]

export default function OkulNavbar({ site }: { site: ThemeSite | null }) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const name    = site?.name        ?? 'Okul'
  const ctaText = site?.heroCtaText ?? 'Kayıt Ol'
  const color   = site?.primaryColor ?? '#1E40AF'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/projeler/okul' ? pathname === href : pathname.startsWith(href)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/projeler/okul" className="flex items-center gap-3 group">
              {site?.logo ? (
                <img src={site.logo} alt={name} className="h-9 w-auto object-contain" />
              ) : (
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${color}18`, border: `2px solid ${color}` }}
                >
                  <GraduationCap className="w-5 h-5" style={{ color }} />
                </div>
              )}
              <span className="font-bold text-gray-900 text-base leading-tight">{name}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={isActive(link.href) ? { color, backgroundColor: `${color}12` } : {}}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                href="/projeler/okul/iletisim"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                {ctaText}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Menüyü aç"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
              <Link
                href="/projeler/okul"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${color}18`, border: `2px solid ${color}` }}
                >
                  <GraduationCap className="w-4.5 h-4.5" style={{ color }} />
                </div>
                <span className="font-bold text-gray-900">{name}</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Menüyü kapat"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-6 gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-gray-100 group"
                >
                  <span
                    className="text-xl font-semibold text-gray-800 transition-colors"
                    style={isActive(link.href) ? { color } : {}}
                  >
                    {link.label}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </nav>

            <div className="px-6 py-8 border-t border-gray-100">
              <Link
                href="/projeler/okul/iletisim"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold"
                style={{ backgroundColor: color }}
              >
                {ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
