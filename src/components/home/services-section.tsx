import { getLocale } from 'next-intl/server'
import ServicesCarousel from './services-carousel'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { localizedPath } from '@/lib/locale-path'
import { mockServices } from '@/lib/mock-data'

export default async function ServicesSection() {
  const locale = await getLocale()
  const isTr = locale === 'tr'
  const cards = mockServices.map((service) => (
    <div
      key={service.id}
      className={`relative h-full rounded-3xl p-8 flex flex-col transition-all duration-500 group cursor-grab active:cursor-grabbing ${service.featured ? 'bg-gradient-to-br from-[#F5A623]/10 to-[#FFD166]/5 border border-[#F5A623]/30' : 'bg-[#111118] border border-white/5 hover:border-white/10'}`}
      style={service.featured ? { boxShadow: '0 0 40px rgba(245,166,35,0.15)' } : {}}
    >
      {service.featured && <div className="absolute top-6 right-6"><span className="px-3 py-1 rounded-full bg-[#F5A623] text-[#0A0A0F] text-xs font-bold uppercase tracking-wider">{isTr ? 'Öne Çıkan' : 'Featured'}</span></div>}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 rounded-b-full opacity-20 -translate-y-1/2" style={{ backgroundColor: service.color }} />
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 mt-4" style={{ backgroundColor: `${service.color}20`, border: `1px solid ${service.color}30` }}>{service.icon}</div>
      <h3 className="font-playfair text-xl font-bold text-white mb-3 group-hover:text-[#F5A623] transition-colors">{isTr ? service.titleTr : service.titleEn}</h3>
      <p className="text-sm text-white/50 leading-relaxed mb-6">{isTr ? service.descTr : service.descEn}</p>
      <div className="flex-1 space-y-2.5 mb-8">
        {service.features.map((feature) => <div key={feature} className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${service.color}20` }}><Check className="w-2.5 h-2.5" style={{ color: service.color }} /></div><span className="text-sm text-white/60">{feature}</span></div>)}
      </div>
      <Link href={localizedPath(locale, service.slug ? `/hizmetler/${service.slug}` : '/hizmetler')} className="flex items-center gap-2 text-sm font-semibold group/link" style={{ color: service.featured ? '#F5A623' : service.color }}>
        {isTr ? 'Detayları İncele' : 'Learn More'}<ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </div>
  ))
  return <ServicesCarousel locale={locale} cards={cards} />
}
