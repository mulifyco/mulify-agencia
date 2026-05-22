'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useLocale } from 'next-intl'
import { X, ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { BRAND_EMAIL, BRAND_LOGO_URL, BRAND_NAME } from '@/lib/brand'

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const footerLinks = {
  company: {
    titleTr: 'Şirket',
    titleEn: 'Company',
    links: [
      { labelTr: 'Hakkımızda', labelEn: 'About', href: '/hakkimizda' },
      { labelTr: 'Ekibimiz', labelEn: 'Team', href: '/ekip' },
      { labelTr: 'Kariyer', labelEn: 'Careers', href: '/kariyer' },
      { labelTr: 'Blog', labelEn: 'Blog', href: '/blog' },
      { labelTr: 'İletişim', labelEn: 'Contact', href: '/iletisim' },
    ],
  },
  services: {
    titleTr: 'Hizmetler',
    titleEn: 'Services',
    links: [
      { labelTr: 'Web Tasarım', labelEn: 'Web Design', href: '/hizmetler/web-tasarim' },
      { labelTr: 'Web Geliştirme', labelEn: 'Web Dev', href: '/hizmetler/web-gelistirme' },
      { labelTr: 'Dijital Pazarlama', labelEn: 'Digital Marketing', href: '/hizmetler/dijital-pazarlama' },
      { labelTr: 'Marka Kimliği', labelEn: 'Brand Identity', href: '/hizmetler/marka-kimligi' },
      { labelTr: 'E-Ticaret', labelEn: 'E-Commerce', href: '/hizmetler/e-ticaret' },
    ],
  },
  legal: {
    titleTr: 'Yasal',
    titleEn: 'Legal',
    links: [
      { labelTr: 'Gizlilik Politikası', labelEn: 'Privacy Policy', href: '/gizlilik' },
      { labelTr: 'Kullanım Koşulları', labelEn: 'Terms of Service', href: '/kosullar' },
      { labelTr: 'KVKK', labelEn: 'GDPR', href: '/kvkk' },
      { labelTr: 'Çerez Politikası', labelEn: 'Cookie Policy', href: '/cerezler' },
    ],
  },
}

const socials = [
  { Icon: X, href: '#', label: 'X (Twitter)' },
  { Icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
  { Icon: InstagramIcon, href: '#', label: 'Instagram' },
  { Icon: GithubIcon, href: '#', label: 'GitHub' },
]

export default function Footer() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: '-60px' })

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <footer className="relative bg-[#0A0A0F] overflow-hidden">
      {/* Amber top gradient border */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #F5A623 30%, #6C63FF 70%, transparent)',
        }}
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(245,166,35,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Newsletter Strip */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <motion.div
            ref={footerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="font-playfair text-xl font-bold text-white mb-1">
                {isTr ? 'Dijital trendleri kaçırmayın' : "Don't miss digital trends"}
              </h3>
              <p className="text-sm text-white/40">
                {isTr
                  ? 'Haftada bir, en önemli dijital pazarlama ve tasarım içgörüleri.'
                  : 'Once a week, the most important digital marketing and design insights.'}
              </p>
            </div>
            {submitted ? (
              <div className="flex items-center gap-2 px-6 py-3 glass-amber rounded-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                <span className="text-sm text-[#F5A623] font-medium">
                  {isTr ? 'Teşekkürler! Listeye eklendiniz.' : 'Thanks! You\'re on the list.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isTr ? 'E-posta adresiniz' : 'Your email address'}
                  className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#F5A623]/40 focus:bg-[#F5A623]/3 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-3 bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold rounded-xl hover:bg-[#FFD166] transition-colors whitespace-nowrap"
                >
                  {isTr ? 'Abone Ol' : 'Subscribe'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6">
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

            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-8">
              {isTr
                ? 'Markaları dijital dünyada büyüten, stratejik ve yaratıcı dijital ajans. İstanbul merkezli, küresel bakışlı.'
                : 'A strategic and creative digital agency that grows brands in the digital world. Istanbul-based, globally minded.'}
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Mail className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>{BRAND_EMAIL}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Phone className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>+90 (212) 000 00 00</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <MapPin className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>Levent, İstanbul, Türkiye</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#F5A623] hover:border-[#F5A623]/30 hover:bg-[#F5A623]/5 transition-all duration-200"
                >
                  <s.Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([key, col], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
                {isTr ? col.titleTr : col.titleEn}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-sm text-white/50 hover:text-[#F5A623] transition-colors duration-200"
                    >
                      {isTr ? link.labelTr : link.labelEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} {BRAND_NAME}.{' '}
            {isTr ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
          </p>
          <p className="text-xs text-white/25 flex items-center gap-1">
            {isTr ? 'İstanbul\'dan' : 'Made with'}{' '}
            <span className="text-[#F5A623]">♥</span>{' '}
            {isTr ? 'sevgiyle yapıldı' : 'from Istanbul'}
          </p>
        </div>
      </div>
    </footer>
  )
}
