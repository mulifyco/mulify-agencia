'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Palette, Code2, TrendingUp, ShoppingCart, Sparkles, Layers } from 'lucide-react'
import type { Service } from '@/lib/db-types'

const ICON_MAP: Record<string, React.ElementType> = {
  'web-tasarim': Palette,
  'web-gelistirme': Code2,
  'dijital-pazarlama': TrendingUp,
  'e-ticaret': ShoppingCart,
  'marka-kimligi': Sparkles,
}

const COLOR_MAP: Record<string, string> = {
  'web-tasarim': '#F5A623',
  'web-gelistirme': '#6C63FF',
  'dijital-pazarlama': '#10B981',
  'e-ticaret': '#06B6D4',
  'marka-kimligi': '#F472B6',
}

const FEATURES_MAP: Record<string, { tr: string[]; en: string[] }> = {
  'web-tasarim': {
    tr: ['UI/UX Tasarım & Prototipleme', 'Figma\'dan Koda Sorunsuz Geçiş', 'Mobil Öncelikli Duyarlı Tasarım', 'Marka Kimliğiyle Tam Uyum', 'Kullanıcı Testleri & Iterasyon'],
    en: ['UI/UX Design & Prototyping', 'Seamless Figma to Code Pipeline', 'Mobile-First Responsive Design', 'Full Brand Identity Alignment', 'User Testing & Iteration'],
  },
  'web-gelistirme': {
    tr: ['Next.js 14 App Router Mimarisi', 'TypeScript ile Tip Güvenli Kod', 'Supabase / PostgreSQL Backend', 'CI/CD & Otomatik Deployment', 'Core Web Vitals Optimizasyonu'],
    en: ['Next.js 14 App Router Architecture', 'Type-Safe Code with TypeScript', 'Supabase / PostgreSQL Backend', 'CI/CD & Automated Deployment', 'Core Web Vitals Optimization'],
  },
  'dijital-pazarlama': {
    tr: ['SEO Teknik & İçerik Stratejisi', 'Google Ads & Meta Kampanyaları', 'Sosyal Medya Yönetimi', 'Dönüşüm Oranı Optimizasyonu', 'Aylık Performans Raporları'],
    en: ['Technical & Content SEO Strategy', 'Google Ads & Meta Campaigns', 'Social Media Management', 'Conversion Rate Optimization', 'Monthly Performance Reports'],
  },
  'e-ticaret': {
    tr: ['Shopify & WooCommerce Uzmanı', 'Ödeme Entegrasyonları', 'Stok & Sipariş Yönetimi', 'Yüksek Dönüşümlü UX Tasarımı', 'Analitik & Büyüme Stratejisi'],
    en: ['Shopify & WooCommerce Expert', 'Payment Integrations', 'Inventory & Order Management', 'High-Converting UX Design', 'Analytics & Growth Strategy'],
  },
  'marka-kimligi': {
    tr: ['Logo & Görsel Kimlik Tasarımı', 'Renk Paleti & Tipografi Sistemi', 'Marka Rehberi & Kılavuzlar', 'Kurumsal Materyal Tasarımı', 'Sosyal Medya Şablon Kiti'],
    en: ['Logo & Visual Identity Design', 'Color Palette & Typography System', 'Brand Guide & Guidelines', 'Corporate Material Design', 'Social Media Template Kit'],
  },
}

const DEFAULT_FEATURES = {
  tr: ['Kapsamlı Strateji Geliştirme', 'Uzman Ekip Desteği', 'Ölçülebilir Sonuçlar', 'Zamanında Teslimat', 'Satış Sonrası Destek'],
  en: ['Comprehensive Strategy Development', 'Expert Team Support', 'Measurable Results', 'On-Time Delivery', 'Post-Launch Support'],
}

const PLACEHOLDER_SERVICES = [
  { id: '1', slug: 'web-tasarim', titleTr: 'Web Tasarım', titleEn: 'Web Design', descTr: 'Kullanıcı deneyimini ön plana alan, markanızı yansıtan özgün web tasarımları.', descEn: 'Unique web designs reflecting your brand, prioritizing user experience.', icon: '🎨', featured: true, published: true, order: 0, image: null, createdAt: '', updatedAt: '' },
  { id: '2', slug: 'web-gelistirme', titleTr: 'Web Geliştirme', titleEn: 'Web Development', descTr: 'Next.js ve React ile hızlı, ölçeklenebilir web uygulamaları.', descEn: 'Fast, scalable web applications with Next.js and React.', icon: '⚡', featured: false, published: true, order: 1, image: null, createdAt: '', updatedAt: '' },
  { id: '3', slug: 'dijital-pazarlama', titleTr: 'Dijital Pazarlama', titleEn: 'Digital Marketing', descTr: 'SEO, SEM ve sosyal medya ile markanızı organik olarak büyütüyoruz.', descEn: 'We grow your brand organically with SEO, SEM and social media.', icon: '📈', featured: true, published: true, order: 2, image: null, createdAt: '', updatedAt: '' },
  { id: '4', slug: 'marka-kimligi', titleTr: 'Marka Kimliği', titleEn: 'Brand Identity', descTr: 'Logo, renk paleti ve kurumsal kimlik tasarımı ile güçlü bir marka.', descEn: 'Build a strong brand with logo, color palette and corporate identity design.', icon: '✦', featured: false, published: true, order: 3, image: null, createdAt: '', updatedAt: '' },
  { id: '5', slug: 'e-ticaret', titleTr: 'E-Ticaret', titleEn: 'E-Commerce', descTr: 'Shopify ve WooCommerce ile yüksek dönüşümlü online mağazalar.', descEn: 'High-converting online stores with Shopify and WooCommerce.', icon: '🛒', featured: false, published: true, order: 4, image: null, createdAt: '', updatedAt: '' },
] as Service[]

function ServiceCard({ service, index, locale }: { service: Service; index: number; locale: string }) {
  const isTr = locale === 'tr'
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const IconComponent = ICON_MAP[service.slug] ?? Layers
  const color = COLOR_MAP[service.slug] ?? '#F5A623'
  const features = FEATURES_MAP[service.slug] ?? DEFAULT_FEATURES

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      {service.featured && (
        <div className="absolute -top-3 left-6 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ background: color, color: '#0A0A0F' }}>
          {isTr ? 'Popüler' : 'Popular'}
        </div>
      )}
      <div
        className="flex-1 relative rounded-2xl border border-white/8 overflow-hidden transition-all duration-500 group-hover:border-opacity-40"
        style={{ borderColor: `${color}15` }}
      >
        {/* Card glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(600px circle at 0px 0px, ${color}08, transparent 40%)` }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />

        <div className="relative p-8">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            <IconComponent className="w-6 h-6" style={{ color }} />
          </div>

          {/* Title */}
          <h3 className="font-playfair text-xl font-bold text-white mb-3 group-hover:text-opacity-90 transition-colors">
            {isTr ? service.titleTr : service.titleEn}
          </h3>

          {/* Desc */}
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            {isTr ? service.descTr : service.descEn}
          </p>

          {/* Features */}
          <ul className="space-y-2.5 mb-8">
            {(isTr ? features.tr : features.en).map((feat, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                  <Check className="w-2.5 h-2.5" style={{ color }} />
                </div>
                <span className="text-xs text-white/60">{feat}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={`/${locale}/hizmetler/${service.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
            style={{ color }}
          >
            {isTr ? 'Detayları Gör' : 'View Details'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesListClient({ locale, services }: { locale: string; services: Service[] }) {
  const isTr = locale === 'tr'
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })
  const displayServices = services.length > 0 ? services : PLACEHOLDER_SERVICES

  return (
    <main className="bg-[#0A0A0F] min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        {/* Aurora bg */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], x: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.09) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8" ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.35em] text-[#F5A623] mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#F5A623]/60" />
            {isTr ? 'Hizmetlerimiz' : 'Our Services'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
          >
            {isTr ? (
              <>Dijital başarı için<br /><span className="text-amber-gradient">eksiksiz çözümler</span></>
            ) : (
              <>Complete solutions<br /><span className="text-amber-gradient">for digital success</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-lg leading-relaxed max-w-2xl"
          >
            {isTr
              ? 'Web tasarımdan dijital pazarlamaya, marka kimliğinden e-ticarete — markanızın ihtiyaç duyduğu her şeyi tek çatı altında sunuyoruz.'
              : 'From web design to digital marketing, brand identity to e-commerce — everything your brand needs under one roof.'}
          </motion.p>

          {/* Count row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-8 mt-10"
          >
            {[
              { value: displayServices.length, labelTr: 'Hizmet', labelEn: 'Services' },
              { value: '150+', labelTr: 'Müşteri', labelEn: 'Clients' },
              { value: '98%', labelTr: 'Memnuniyet', labelEn: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.labelEn} className="flex items-baseline gap-2">
                <span className="font-playfair text-2xl font-bold text-[#F5A623]">{stat.value}</span>
                <span className="text-sm text-white/40">{isTr ? stat.labelTr : stat.labelEn}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Services Grid ─────────────────────────────────────────────────── */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} locale={locale} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 glass rounded-2xl px-12 py-10">
              <p className="text-white/60 text-sm">{isTr ? 'İhtiyacınıza özel çözüm mü arıyorsunuz?' : 'Looking for a custom solution?'}</p>
              <Link
                href={`/${locale}/iletisim`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl hover:bg-[#FFD166] transition-all hover:gap-3"
              >
                {isTr ? 'Ücretsiz Danışmanlık Al' : 'Get Free Consultation'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
