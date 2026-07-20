'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from 'next-intl'
import { BRAND_LOGO_URL, BRAND_NAME } from '@/lib/brand'
import { localizedPath } from '@/lib/locale-path'
import { sortServicesByPriority } from '@/lib/service-order'
import {
  Palette,
  Code2,
  TrendingUp,
  ShoppingCart,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react'

const serviceItems = sortServicesByPriority([
  { slug: 'web-tasarim', icon: Palette, label: 'Web Tasarım / Web Design', desc: 'UI/UX & Marka', color: '#F5A623', href: '/hizmetler/web-tasarim' },
  { slug: 'web-gelistirme', icon: Code2, label: 'Web Geliştirme / Web Dev', desc: 'Next.js & React', color: '#6C63FF', href: '/hizmetler/web-gelistirme' },
  { slug: 'dijital-pazarlama', icon: TrendingUp, label: 'Dijital Pazarlama', desc: 'SEO & Growth', color: '#10B981', href: '/hizmetler/dijital-pazarlama' },
  { slug: 'e-ticaret', icon: ShoppingCart, label: 'E-Ticaret', desc: 'Shopify & WooCommerce', color: '#06B6D4', href: '/hizmetler/e-ticaret' },
  { slug: 'marka-kimligi', icon: Sparkles, label: 'Marka Kimliği', desc: 'Logo & Brand', color: '#F472B6', href: '/hizmetler/marka-kimligi' },
])

const navLinks = [
  { labelTr: 'Ana Sayfa', labelEn: 'Home', href: '/' },
  { labelTr: 'Hizmetler', labelEn: 'Services', href: '/hizmetler', hasDropdown: true },
  { labelTr: 'Projeler', labelEn: 'Work', href: '/projeler' },
  { labelTr: 'Hakkımızda', labelEn: 'About', href: '/hakkimizda' },
  { labelTr: 'Blog', labelEn: 'Blog', href: '/blog' },
]

const mobileMenuVariants = {
  closed: { opacity: 0, x: '100%' },
  open: { opacity: 1, x: 0 },
}

const staggerContainer = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  closed: {},
}

const staggerItem = {
  closed: { opacity: 0, x: 40 },
  open: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const locale = useLocale()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 20
      setScrolled((current) => current === nextScrolled ? current : nextScrolled)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0F]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={localizedPath(locale, '/')} className="flex items-center gap-3 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-[#F5A623] rounded-xl rotate-45 group-hover:rotate-[60deg] transition-transform duration-500" />
                <div className="absolute inset-[3px] bg-[#0A0A0F] rounded-lg rotate-45" />
                <img
                  src={BRAND_LOGO_URL}
                  alt={`${BRAND_NAME} logo`}
                  className="absolute inset-[7px] z-10 m-auto h-[calc(100%-14px)] w-[calc(100%-14px)] object-contain"
                />
              </div>
              <span className="font-playfair text-xl font-bold tracking-wide text-white">
                {BRAND_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.href} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setServicesOpen((v) => !v)}
                      className="flex items-center gap-1 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/5"
                    >
                      {locale === 'tr' ? link.labelTr : link.labelEn}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] glass rounded-2xl p-3 shadow-2xl"
                        >
                          <div className="grid grid-cols-1 gap-1">
                            {serviceItems.map((item) => (
                              <Link
                                key={item.href}
                                href={localizedPath(locale, item.href)}
                                onClick={() => setServicesOpen(false)}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group/item"
                              >
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}30` }}
                                >
                                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-white group-hover/item:text-[#F5A623] transition-colors">
                                    {item.label}
                                  </div>
                                  <div className="text-xs text-white/40">{item.desc}</div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover/item:text-[#F5A623] ml-auto transition-all group-hover/item:translate-x-1" />
                              </Link>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-white/5 px-3">
                            <Link
                              href={localizedPath(locale, '/hizmetler')}
                              className="text-xs text-[#F5A623] hover:text-[#FFD166] transition-colors flex items-center gap-1"
                              onClick={() => setServicesOpen(false)}
                            >
                              {locale === 'tr' ? 'Tüm hizmetleri gör' : 'View all services'}
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={localizedPath(locale, link.href)}
                    className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/5"
                  >
                    {locale === 'tr' ? link.labelTr : link.labelEn}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={localizedPath(locale, '/iletisim')}
                className="relative flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold rounded-xl hover:bg-[#FFD166] transition-all duration-300 animate-pulse-amber overflow-hidden group"
              >
                <span className="relative z-10">{locale === 'tr' ? 'Teklif Al' : 'Get Quote'}</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F5A623] to-[#FFD166] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0F] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
              <Link href={localizedPath(locale, '/')} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                <div className="relative w-9 h-9">
                  <div className="absolute inset-0 bg-[#F5A623] rounded-xl rotate-45" />
                  <div className="absolute inset-[3px] bg-[#0A0A0F] rounded-lg rotate-45" />
                  <img
                    src={BRAND_LOGO_URL}
                    alt={`${BRAND_NAME} logo`}
                    className="absolute inset-[7px] z-10 m-auto h-[calc(100%-14px)] w-[calc(100%-14px)] object-contain"
                  />
                </div>
                <span className="font-playfair text-xl font-bold tracking-wide text-white">{BRAND_NAME}</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Links */}
            <motion.nav
              variants={staggerContainer}
              className="flex-1 flex flex-col justify-center px-6 gap-2"
            >
              {navLinks.map((link, i) => (
                <motion.div key={link.href} variants={staggerItem}>
                  <Link
                    href={localizedPath(locale, link.href)}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-white/5 group"
                  >
                    <span className="text-2xl font-playfair font-bold text-white group-hover:text-[#F5A623] transition-colors">
                      {locale === 'tr' ? link.labelTr : link.labelEn}
                    </span>
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[#F5A623] group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Bottom */}
            <motion.div
              variants={staggerItem}
              className="px-6 py-8 flex items-center justify-end border-t border-white/5"
            >
              <Link
                href={localizedPath(locale, '/iletisim')}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-6 py-3 bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold rounded-xl"
              >
                {locale === 'tr' ? 'Teklif Al' : 'Get Quote'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
