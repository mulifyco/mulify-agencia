import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import ServiceDetailClient from './service-detail-client'
import type { Service } from '@/lib/db-types'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const { data } = await db().from('Service').select('titleTr,titleEn,descTr,descEn').eq('slug', slug).single()
  if (!data) return {}
  return {
    title: locale === 'tr' ? data.titleTr : data.titleEn,
    description: locale === 'tr' ? data.descTr : data.descEn,
  }
}

const KNOWN_SLUGS: Record<string, Service> = {
  'web-tasarim': { id: 'web-tasarim', slug: 'web-tasarim', titleTr: 'Web Tasarım', titleEn: 'Web Design', descTr: 'Kullanıcı deneyimini ön plana alan, markanızı yansıtan özgün web tasarımları. Figma\'dan geliştirmeye kesintisiz süreç.', descEn: 'Unique web designs that reflect your brand, prioritizing user experience. Seamless process from Figma to development.', icon: '🎨', image: null, order: 0, featured: true, published: true, createdAt: '', updatedAt: '' },
  'web-gelistirme': { id: 'web-gelistirme', slug: 'web-gelistirme', titleTr: 'Web Geliştirme', titleEn: 'Web Development', descTr: 'Next.js 14 ve React ile hızlı, ölçeklenebilir ve SEO dostu web uygulamaları.', descEn: 'Fast, scalable and SEO-friendly web applications with Next.js 14 and React.', icon: '⚡', image: null, order: 1, featured: false, published: true, createdAt: '', updatedAt: '' },
  'dijital-pazarlama': { id: 'dijital-pazarlama', slug: 'dijital-pazarlama', titleTr: 'Dijital Pazarlama', titleEn: 'Digital Marketing', descTr: 'SEO, SEM ve sosyal medya stratejileri ile markanızı organik olarak büyütüyoruz.', descEn: 'We grow your brand organically with SEO, SEM and social media strategies.', icon: '📈', image: null, order: 2, featured: true, published: true, createdAt: '', updatedAt: '' },
  'marka-kimligi': { id: 'marka-kimligi', slug: 'marka-kimligi', titleTr: 'Marka Kimliği', titleEn: 'Brand Identity', descTr: 'Logo, renk paleti, tipografi ve kurumsal kimlik tasarımı.', descEn: 'Logo, color palette, typography and corporate identity design.', icon: '✦', image: null, order: 3, featured: false, published: true, createdAt: '', updatedAt: '' },
  'e-ticaret': { id: 'e-ticaret', slug: 'e-ticaret', titleTr: 'E-Ticaret', titleEn: 'E-Commerce', descTr: 'Shopify, WooCommerce ve özel çözümlerle yüksek dönüşümlü online mağazalar.', descEn: 'High-converting online stores with Shopify, WooCommerce and custom solutions.', icon: '🛒', image: null, order: 4, featured: false, published: true, createdAt: '', updatedAt: '' },
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params

  const [{ data: service }, { data: allServices }] = await Promise.all([
    db().from('Service').select('*').eq('slug', slug).eq('published', true).single(),
    db().from('Service').select('*').eq('published', true).order('order'),
  ])

  const resolvedService = (service as Service | null) ?? KNOWN_SLUGS[slug] ?? null
  if (!resolvedService) notFound()

  const related = ((allServices ?? []) as Service[]).filter((s) => s.slug !== slug).slice(0, 3)
  const relatedFallback = Object.values(KNOWN_SLUGS).filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      <Navbar />
      <ServiceDetailClient
        locale={locale}
        service={resolvedService}
        related={related.length > 0 ? related : relatedFallback}
      />
      <Footer />
    </>
  )
}
