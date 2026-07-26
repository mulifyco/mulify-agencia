'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useLocale } from 'next-intl'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { BRAND_EMAIL, BRAND_LOGO_URL, BRAND_NAME } from '@/lib/brand'
import { localizedPath } from '@/lib/locale-path'
import { createTelHref, formatPhoneNumber } from '@/lib/phone'
import { publicServices } from '@/lib/services-data'

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
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
    links: publicServices.map((service) => ({
      labelTr: service.titleTr,
      labelEn: service.titleEn,
      href: `/hizmetler/${service.slug}`,
    })),
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
  { Icon: YoutubeIcon, href: 'https://www.youtube.com/@mulifyco', label: 'Mulify YouTube' },
  { Icon: InstagramIcon, href: 'https://www.instagram.com/mulifyco', label: 'Mulify Instagram' },
]

export default function FooterClient({ contactPhone }: { contactPhone: string | null }) {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const telHref = createTelHref(contactPhone)
  const displayPhone = formatPhoneNumber(contactPhone)
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
            <Link href={localizedPath(locale, '/')} className="flex items-center gap-3 mb-6">
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
              {telHref && displayPhone && (
                <a href={telHref} className="flex items-center gap-3 text-sm text-white/40 hover:text-[#F5A623] transition-colors">
                  <Phone className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                  <span>{displayPhone}</span>
                </a>
              )}
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
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#F5A623] hover:border-[#F5A623]/30 hover:bg-[#F5A623]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F] transition-all duration-200"
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
                  <li key={`${link.href}-${link.labelTr}`}>
                    <Link
                      href={localizedPath(locale, link.href)}
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
