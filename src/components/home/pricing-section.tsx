'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Check, ArrowRight, Zap, Loader2 } from 'lucide-react'
import type { PricingPlan } from '@/lib/db-types'

const CURRENCY_SYMBOL: Record<string, string> = { USD: '$', EUR: '€', TRY: '₺' }

function deriveCtaText(plan: PricingPlan, isTr: boolean): string {
  if (plan.ctaText) return plan.ctaText
  if (plan.price === 0) return isTr ? 'Bize Ulaşın' : 'Contact Us'
  return isTr ? 'Başlayın' : 'Get Started'
}

function EmptyState({ isTr }: { isTr: boolean }) {
  return (
    <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
        <Zap className="w-7 h-7 text-white/20" />
      </div>
      <p className="text-white/30 text-sm">
        {isTr ? 'Fiyatlandırma planları yakında eklenecek.' : 'Pricing plans coming soon.'}
      </p>
    </div>
  )
}

export default function PricingSection() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [annual, setAnnual] = useState(false)
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/pricing')
      .then((r) => r.json())
      .then((data) => setPlans(Array.isArray(data) ? data : []))
      .catch(() => setPlans([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[#111118] overflow-hidden">
      {/* Top border glow */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.3), transparent)' }}
      />
      <div
        className="absolute right-1/4 top-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4"
          >
            {isTr ? '— Fiyatlandırma —' : '— Pricing —'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {isTr ? (
              <>İhtiyacınıza uygun <span className="text-amber-gradient">paketler</span></>
            ) : (
              <>Packages <span className="text-amber-gradient">tailored to you</span></>
            )}
          </motion.h2>

          {/* Monthly / Annual toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 p-1 rounded-xl bg-white/5 border border-white/10"
          >
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                !annual ? 'bg-[#F5A623] text-[#0A0A0F]' : 'text-white/50 hover:text-white'
              }`}
            >
              {isTr ? 'Aylık' : 'Monthly'}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                annual ? 'bg-[#F5A623] text-[#0A0A0F]' : 'text-white/50 hover:text-white'
              }`}
            >
              {isTr ? 'Yıllık' : 'Annual'}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  annual ? 'bg-[#0A0A0F]/20 text-[#0A0A0F]' : 'bg-[#10B981]/20 text-[#10B981]'
                }`}
              >
                -20%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Plans grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 text-white/30 animate-spin" />
          </div>
        ) : (
          <div className={`grid gap-6 ${plans.length === 1 ? 'max-w-sm mx-auto' : plans.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'}`}>
            {plans.length === 0 ? (
              <EmptyState isTr={isTr} />
            ) : (
              plans.map((plan, i) => {
                const symbol = CURRENCY_SYMBOL[plan.currency] ?? plan.currency
                const basePrice = plan.period === 'year' ? plan.price : plan.price
                const displayPrice = annual
                  ? plan.period === 'year'
                    ? plan.price
                    : Math.round(plan.price * 0.8)
                  : plan.period === 'month'
                    ? plan.price
                    : Math.round(plan.price / 12)
                const isCustom = plan.price === 0
                const ctaText = deriveCtaText(plan, isTr)

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-gradient-to-b from-[#F5A623]/10 to-transparent border border-[#F5A623]/40'
                        : 'bg-[#16161F] border border-white/5 hover:border-white/10'
                    }`}
                    style={plan.highlighted ? { boxShadow: '0 0 60px rgba(245,166,35,0.15)' } : {}}
                  >
                    {/* Featured badge */}
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#F5A623] rounded-full">
                          <Zap className="w-3 h-3 text-[#0A0A0F]" />
                          <span className="text-xs font-bold text-[#0A0A0F] whitespace-nowrap">
                            {isTr ? 'En Popüler' : 'Most Popular'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Plan name + desc */}
                    <div className="mb-6 pt-2">
                      <h3 className="font-playfair text-xl font-bold text-white mb-2">
                        {isTr ? plan.nameTr : plan.nameEn}
                      </h3>
                      {(isTr ? plan.descTr : plan.descEn) && (
                        <p className="text-sm text-white/40">
                          {isTr ? plan.descTr : plan.descEn}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      {isCustom ? (
                        <div>
                          <div className="font-playfair text-4xl font-bold text-white">
                            {isTr ? 'Özel Teklif' : 'Custom'}
                          </div>
                          <div className="text-sm text-white/40 mt-1">
                            {isTr ? 'İhtiyacınıza özel fiyat' : 'Tailored to your needs'}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-end gap-2">
                          <span className="font-playfair text-5xl font-bold text-white">
                            {symbol}{displayPrice.toLocaleString('tr-TR')}
                          </span>
                          <span className="text-white/40 text-sm mb-2">
                            /{isTr ? 'ay' : 'mo'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex-1 space-y-3 mb-8">
                      {plan.features.map((feature, fi) => (
                        <div key={fi} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#F5A623]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#F5A623]" />
                          </div>
                          <span className="text-sm text-white/60 leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/${locale}/iletisim`}
                      className={`flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        plan.highlighted
                          ? 'bg-[#F5A623] text-[#0A0A0F] hover:bg-[#FFD166]'
                          : 'bg-white/5 text-white border border-white/10 hover:border-[#F5A623]/30 hover:bg-[#F5A623]/5'
                      }`}
                    >
                      {ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )
              })
            )}
          </div>
        )}

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-sm text-white/30 mt-10"
        >
          {isTr
            ? '* Tüm fiyatlar USD cinsindendir. Türk Lirası ödemelerde güncel kur uygulanır.'
            : '* All prices are in USD. Custom pricing available for long-term projects.'}
        </motion.p>
      </div>
    </section>
  )
}
