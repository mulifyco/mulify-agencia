'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Palette, Code2, TrendingUp, ShoppingCart, Sparkles, Layers, Search, BarChart, Zap, MessageSquare } from 'lucide-react'
import type { Service } from '@/lib/db-types'

const COLOR_MAP: Record<string, string> = {
  'web-tasarim': '#F5A623',
  'web-gelistirme': '#6C63FF',
  'dijital-pazarlama': '#10B981',
  'e-ticaret': '#06B6D4',
  'marka-kimligi': '#F472B6',
}
const ICON_MAP: Record<string, React.ElementType> = {
  'web-tasarim': Palette,
  'web-gelistirme': Code2,
  'dijital-pazarlama': TrendingUp,
  'e-ticaret': ShoppingCart,
  'marka-kimligi': Sparkles,
}

const FEATURES_MAP: Record<string, { tr: string[]; en: string[] }> = {
  'web-tasarim': {
    tr: ['UI/UX Tasarım & Prototipleme', 'Figma\'dan Koda Sorunsuz Geçiş', 'Mobil Öncelikli Duyarlı Tasarım', 'Marka Kimliğiyle Tam Uyum', 'Kullanıcı Testleri & A/B Optimizasyon', 'Erişilebilirlik (WCAG) Uyumu', 'Sayfa Yükleme Hızı Optimizasyonu'],
    en: ['UI/UX Design & Prototyping', 'Seamless Figma to Code Pipeline', 'Mobile-First Responsive Design', 'Full Brand Identity Alignment', 'User Testing & A/B Optimization', 'Accessibility (WCAG) Compliance', 'Page Load Speed Optimization'],
  },
  'web-gelistirme': {
    tr: ['Next.js 14 App Router Mimarisi', 'TypeScript ile Tip Güvenli Kod', 'Supabase / PostgreSQL Backend', 'REST & GraphQL API Entegrasyonları', 'CI/CD Pipeline & Otomatik Deployment', 'Core Web Vitals Optimizasyonu', 'Güvenlik & HTTPS / SSL Yönetimi'],
    en: ['Next.js 14 App Router Architecture', 'Type-Safe Code with TypeScript', 'Supabase / PostgreSQL Backend', 'REST & GraphQL API Integrations', 'CI/CD Pipeline & Automated Deployment', 'Core Web Vitals Optimization', 'Security & HTTPS / SSL Management'],
  },
  'dijital-pazarlama': {
    tr: ['Teknik & İçerik SEO Stratejisi', 'Google Ads & Meta Reklam Kampanyaları', 'Sosyal Medya Yönetimi & İçerik', 'Email Pazarlama & Otomasyon', 'Dönüşüm Oranı Optimizasyonu (CRO)', 'Rekabet Analizi & Raporlama', 'Influencer & Affiliate Pazarlama'],
    en: ['Technical & Content SEO Strategy', 'Google Ads & Meta Ad Campaigns', 'Social Media Management & Content', 'Email Marketing & Automation', 'Conversion Rate Optimization (CRO)', 'Competitive Analysis & Reporting', 'Influencer & Affiliate Marketing'],
  },
  'e-ticaret': {
    tr: ['Shopify & WooCommerce Kurulumu', 'Ürün Kataloğu & Stok Yönetimi', 'Ödeme Sistemi Entegrasyonları', 'Yüksek Dönüşümlü Ürün Sayfaları', 'Terk Edilen Sepet Kurtarma', 'Müşteri Sadakat Programları', 'Analitik Dashboard & Büyüme Stratejisi'],
    en: ['Shopify & WooCommerce Setup', 'Product Catalog & Inventory Management', 'Payment System Integrations', 'High-Converting Product Pages', 'Abandoned Cart Recovery', 'Customer Loyalty Programs', 'Analytics Dashboard & Growth Strategy'],
  },
  'marka-kimligi': {
    tr: ['Logo & Görsel Kimlik Tasarımı', 'Renk Paleti & Tipografi Sistemi', 'Marka Rehberi & Kullanım Kılavuzu', 'Kurumsal Materyal Tasarımı', 'Dijital & Baskı Varlıkları', 'Sosyal Medya Şablon Kiti', 'Ambalaj & Ürün Tasarımı'],
    en: ['Logo & Visual Identity Design', 'Color Palette & Typography System', 'Brand Guide & Usage Guidelines', 'Corporate Material Design', 'Digital & Print Assets', 'Social Media Template Kit', 'Packaging & Product Design'],
  },
}

const PROCESS_MAP: Record<string, { iconEl: React.ElementType; tr: { title: string; desc: string }; en: { title: string; desc: string } }[]> = {
  'web-tasarim': [
    { iconEl: Search, tr: { title: 'Keşif & Araştırma', desc: 'Markanızı, hedef kitlenizi ve rakiplerinizi derinlemesine analiz ediyoruz.' }, en: { title: 'Discovery & Research', desc: 'We deeply analyze your brand, target audience and competitors.' } },
    { iconEl: Layers, tr: { title: 'Wireframe & Strateji', desc: 'Kullanıcı akışlarını ve sayfa yapısını tasarlıyoruz.' }, en: { title: 'Wireframe & Strategy', desc: 'We design user flows and page structure.' } },
    { iconEl: Palette, tr: { title: 'UI Tasarım', desc: 'Yüksek kaliteli Figma tasarımları ile hayata geçiriyoruz.' }, en: { title: 'UI Design', desc: 'We bring it to life with high-quality Figma designs.' } },
    { iconEl: Zap, tr: { title: 'Teslimat & Revizyon', desc: 'Geri bildirimlerinizle tasarımı mükemmelleştiriyoruz.' }, en: { title: 'Delivery & Revision', desc: 'We perfect the design with your feedback.' } },
  ],
  'web-gelistirme': [
    { iconEl: Search, tr: { title: 'Teknik Analiz', desc: 'İhtiyaçlarınızı ve teknik gereksinimleri belirliyoruz.' }, en: { title: 'Technical Analysis', desc: 'We identify your needs and technical requirements.' } },
    { iconEl: Layers, tr: { title: 'Mimari Tasarım', desc: 'Ölçeklenebilir sistem mimarisi ve veritabanı yapısı.' }, en: { title: 'Architecture Design', desc: 'Scalable system architecture and database structure.' } },
    { iconEl: Code2, tr: { title: 'Geliştirme', desc: 'Sprint tabanlı agile süreçle hızlı ve kaliteli geliştirme.' }, en: { title: 'Development', desc: 'Fast and quality development with sprint-based agile process.' } },
    { iconEl: Zap, tr: { title: 'Test & Launch', desc: 'Kapsamlı testler sonrası canlıya alım ve destek.' }, en: { title: 'Test & Launch', desc: 'Go-live and support after comprehensive testing.' } },
  ],
}

const DEFAULT_PROCESS = [
  { iconEl: Search, tr: { title: 'Keşif & Analiz', desc: 'İhtiyaçlarınızı ve hedeflerinizi anlamak için kapsamlı analiz.' }, en: { title: 'Discovery & Analysis', desc: 'Comprehensive analysis to understand your needs and goals.' } },
  { iconEl: Layers, tr: { title: 'Strateji & Planlama', desc: 'Özelleştirilmiş strateji ve detaylı proje planı.' }, en: { title: 'Strategy & Planning', desc: 'Customized strategy and detailed project plan.' } },
  { iconEl: Zap, tr: { title: 'Uygulama', desc: 'Uzman ekibimizle hızlı ve kaliteli uygulama.' }, en: { title: 'Execution', desc: 'Fast and quality execution with our expert team.' } },
  { iconEl: BarChart, tr: { title: 'Ölçüm & Optimizasyon', desc: 'Sürekli ölçüm ve iyileştirme ile sonuçları maksimize.' }, en: { title: 'Measure & Optimize', desc: 'Maximize results with continuous measurement and improvement.' } },
]

function fi(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as any },
  }
}

export default function ServiceDetailClient({
  locale, service, related,
}: {
  locale: string
  service: Service
  related: Service[]
}) {
  const isTr = locale === 'tr'
  const title = isTr ? service.titleTr : service.titleEn
  const desc = isTr ? service.descTr : service.descEn
  const color = COLOR_MAP[service.slug] ?? '#F5A623'
  const IconComponent = ICON_MAP[service.slug] ?? Layers
  const features = FEATURES_MAP[service.slug]
  const process = PROCESS_MAP[service.slug] ?? DEFAULT_PROCESS

  const processRef = useRef<HTMLDivElement>(null)
  const isProcessInView = useInView(processRef, { once: true, margin: '-80px' })
  const relatedRef = useRef<HTMLDivElement>(null)
  const isRelatedInView = useInView(relatedRef, { once: true, margin: '-80px' })

  return (
    <main className="bg-[#0A0A0F] min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full" style={{ background: `radial-gradient(circle, ${color}0D 0%, transparent 70%)`, filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fi(0)}>
            <Link href={`/${locale}/hizmetler`} className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#F5A623] transition-colors mb-12 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {isTr ? 'Tüm Hizmetler' : 'All Services'}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">
            {/* Left */}
            <div>
              <motion.div {...fi(0.1)} className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  {service.icon ?? <IconComponent className="w-7 h-7" style={{ color }} />}
                </div>
                {service.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
                    {isTr ? 'Öne Çıkan Hizmet' : 'Featured Service'}
                  </span>
                )}
              </motion.div>

              <motion.h1 {...fi(0.15)} className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {title}
              </motion.h1>
              <motion.p {...fi(0.2)} className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl">
                {desc}
              </motion.p>

              <motion.div {...fi(0.25)} className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/iletisim`}
                  className="inline-flex items-center gap-2 px-8 py-4 text-[#0A0A0F] font-semibold rounded-xl transition-all hover:gap-3"
                  style={{ background: color }}
                >
                  {isTr ? 'Bu Hizmet İçin Teklif Al' : 'Get Quote for This Service'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={`/${locale}/iletisim`} className="inline-flex items-center gap-2 px-8 py-4 glass rounded-xl text-white text-sm font-medium hover:bg-white/8 transition-all">
                  <MessageSquare className="w-4 h-4" />
                  {isTr ? 'Soru Sor' : 'Ask a Question'}
                </Link>
              </motion.div>
            </div>

            {/* Features card */}
            {features && (
              <motion.div {...fi(0.3)} className="sticky top-28">
                <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${color}25`, background: `${color}06` }}>
                  <div className="px-6 py-4 border-b" style={{ borderColor: `${color}15` }}>
                    <h3 className="text-sm font-semibold text-white">
                      {isTr ? '✓ Bu Hizmette Neler Var?' : '✓ What\'s Included?'}
                    </h3>
                  </div>
                  <ul className="p-6 space-y-3.5">
                    {(isTr ? features.tr : features.en).map((feat, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                          <Check className="w-3 h-3" style={{ color }} />
                        </div>
                        <span className="text-sm text-white/65">{feat}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Process Steps ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={processRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs uppercase tracking-[0.3em] mb-3 flex items-center gap-3" style={{ color }}>
              <span className="w-8 h-px" style={{ background: color }} />
              {isTr ? 'Sürecimiz' : 'Our Process'}
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              {isTr ? 'Nasıl çalışıyoruz?' : 'How do we work?'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }} animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative"
              >
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(100%+4px)] w-[calc(100%-32px)] h-px" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
                )}
                <div className="glass rounded-2xl p-6 h-full" style={{ borderColor: `${color}15` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <step.iconEl className="w-5 h-5" style={{ color }} />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-50" style={{ color }}>
                    0{i + 1}
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-sm">
                    {isTr ? step.tr.title : step.en.title}
                  </h3>
                  <p className="text-xs text-white/45 leading-relaxed">
                    {isTr ? step.tr.desc : step.en.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Related Services ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={relatedRef}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isRelatedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-playfair text-3xl font-bold text-white mb-10"
            >
              {isTr ? 'Diğer Hizmetlerimiz' : 'Other Services'}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((rel, i) => {
                const relColor = COLOR_MAP[rel.slug] ?? '#F5A623'
                const RelIcon = ICON_MAP[rel.slug] ?? Layers
                return (
                  <motion.div
                    key={rel.id}
                    initial={{ opacity: 0, y: 30 }} animate={isRelatedInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <Link href={`/${locale}/hizmetler/${rel.slug}`} className="group block glass rounded-2xl p-6 hover:border-white/15 transition-all">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${relColor}15` }}>
                        <RelIcon className="w-5 h-5" style={{ color: relColor }} />
                      </div>
                      <h3 className="font-semibold text-white mb-2 group-hover:text-[#F5A623] transition-colors">
                        {isTr ? rel.titleTr : rel.titleEn}
                      </h3>
                      <p className="text-xs text-white/40 line-clamp-2">{isTr ? rel.descTr : rel.descEn}</p>
                      <div className="flex items-center gap-1.5 mt-4 text-xs font-medium" style={{ color: relColor }}>
                        {isTr ? 'İncele' : 'Explore'} <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-12"
            style={{ borderColor: `${color}20` }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
              <IconComponent className="w-7 h-7" style={{ color }} />
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              {isTr ? `${title} için teklif al` : `Get a quote for ${title}`}
            </h2>
            <p className="text-white/50 mb-8">
              {isTr ? 'Projenizi bizimle paylaşın, 24 saat içinde size özel teklif hazırlayalım.' : 'Share your project with us and we\'ll prepare a custom quote within 24 hours.'}
            </p>
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 px-10 py-4 text-[#0A0A0F] font-bold rounded-xl transition-all text-base hover:gap-3"
              style={{ background: color }}
            >
              {isTr ? 'Ücretsiz Teklif Al' : 'Get Free Quote'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
