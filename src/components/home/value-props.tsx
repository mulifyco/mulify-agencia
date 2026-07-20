'use client'

import { useLocale } from 'next-intl'
import { Rocket, Target, Shield, Sparkles } from 'lucide-react'
import { HomeReveal } from './home-reveal'

const bentoCards = [
  {
    id: 1,
    icon: Rocket,
    titleTr: 'Hız & Performans',
    titleEn: 'Speed & Performance',
    descTr: '100 Lighthouse skoru hedefliyor, kullanıcı deneyimini zirveye taşıyoruz.',
    descEn: 'Targeting 100 Lighthouse score, elevating user experience to the top.',
    bg: 'bg-[#F5A623]',
    textColor: 'text-[#0A0A0F]',
    iconBg: 'bg-black/10',
    span: 'col-span-2',
  },
  {
    id: 2,
    icon: Target,
    titleTr: 'Dönüşüm Odaklı',
    titleEn: 'Conversion Focused',
    descTr: 'Her piksel satış için optimize edilir.',
    descEn: 'Every pixel is optimized for sales.',
    bg: 'bg-[#111827]',
    textColor: 'text-white',
    iconBg: 'bg-white/5',
    span: 'col-span-1',
  },
  {
    id: 3,
    icon: Shield,
    titleTr: 'Güvenlik & Güvenilirlik',
    titleEn: 'Security & Reliability',
    descTr: '%99.9 uptime garantisi ve enterprise güvenlik.',
    descEn: '99.9% uptime guarantee and enterprise security.',
    bg: 'bg-[#0D1117]',
    textColor: 'text-white',
    iconBg: 'bg-[#6C63FF]/10',
    span: 'col-span-1',
  },
  {
    id: 4,
    icon: Sparkles,
    titleTr: 'Yaratıcı Tasarım',
    titleEn: 'Creative Design',
    descTr: 'Awwwards kalitesinde, ödüle layık tasarımlar oluşturuyoruz.',
    descEn: 'Creating Awwwards-quality, award-worthy designs.',
    bg: 'bg-gradient-to-br from-[#6C63FF]/20 to-[#A78BFA]/10',
    textColor: 'text-white',
    iconBg: 'bg-[#6C63FF]/20',
    border: 'border border-[#6C63FF]/20',
    span: 'col-span-2',
  },
]

const leftPoints = [
  { num: '01', titleTr: 'Strateji Önce', titleEn: 'Strategy First', descTr: 'Her projeye veri ve araştırmayla başlıyoruz.', descEn: 'We start every project with data and research.' },
  { num: '02', titleTr: 'İteratif Süreç', titleEn: 'Iterative Process', descTr: 'Haftalık demo ve geri bildirim döngüleriyle şeffaf çalışıyoruz.', descEn: 'Transparent work with weekly demos and feedback loops.' },
  { num: '03', titleTr: 'Uzun Vadeli Ortaklık', titleEn: 'Long-term Partnership', descTr: 'Teslimat sonrası da yanınızdayız, büyümenize destek oluyoruz.', descEn: 'We stay with you after delivery to support your growth.' },
]

export default function ValueProps() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0F] overflow-hidden">
      {/* Amber glow background */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <HomeReveal as="p"
              className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4"
            >
              {isTr ? '— Neden Mulify? —' : '— Why Mulify? —'}
            </HomeReveal>

            <HomeReveal as="h2" duration={700} delay={100}
              className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
            >
              {isTr ? (
                <>Sıradan ajansların<br /><span className="text-amber-gradient">ötesine geçiyoruz</span></>
              ) : (
                <>We go beyond<br /><span className="text-amber-gradient">ordinary agencies</span></>
              )}
            </HomeReveal>

            <HomeReveal as="p" delay={200}
              className="text-white/50 leading-relaxed mb-12"
            >
              {isTr
                ? 'Müşterilerimize sadece bir hizmet sunmuyoruz — onların dijital büyüme ortakları oluyoruz. Her kararı strateji, veriler ve derin sektör bilgisiyle alıyoruz.'
                : 'We don\'t just provide a service to our clients — we become their digital growth partners. We make every decision with strategy, data, and deep industry knowledge.'}
            </HomeReveal>

            <div className="space-y-8">
              {leftPoints.map((pt, i) => (
                <HomeReveal
                  key={pt.num}
                  direction="left"
                  delay={300 + i * 100}
                  className="flex gap-5"
                >
                  <span className="font-playfair text-3xl font-bold text-[#F5A623]/20 flex-shrink-0 w-10 pt-1">
                    {pt.num}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {isTr ? pt.titleTr : pt.titleEn}
                    </h4>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {isTr ? pt.descTr : pt.descEn}
                    </p>
                  </div>
                </HomeReveal>
              ))}
            </div>
          </div>

          {/* Right: Bento Grid */}
          <div className="grid grid-cols-2 gap-4">
            {bentoCards.map((card, i) => (
              <HomeReveal
                key={card.id}
                delay={200 + i * 100}
                className={`${card.span} ${card.bg} ${card.border ?? ''} rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-4`}>
                  <card.icon className={`w-5 h-5 ${card.textColor === 'text-[#0A0A0F]' ? 'text-[#0A0A0F]' : 'text-[#F5A623]'}`} />
                </div>
                <h4 className={`font-semibold text-base mb-2 ${card.textColor}`}>
                  {isTr ? card.titleTr : card.titleEn}
                </h4>
                <p className={`text-sm leading-relaxed ${card.textColor === 'text-[#0A0A0F]' ? 'text-[#0A0A0F]/70' : 'text-white/50'}`}>
                  {isTr ? card.descTr : card.descEn}
                </p>
              </HomeReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
