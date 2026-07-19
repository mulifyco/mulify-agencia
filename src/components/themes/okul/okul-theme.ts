import type { ThemeGallery, ThemePost, ThemeSite, ThemeTeamMember } from '@/lib/db-types'

export const OKUL_BG     = '#FFFFFF'
export const OKUL_FG     = '#111827'
export const OKUL_ACCENT = '#1E40AF'

export const OKUL_FALLBACK_SITE: ThemeSite = {
  id: 'okul-fallback',
  slug: 'okul',
  name: 'Bilge Akademi',
  theme: 'okul',
  heroTitle: 'Geleceği Birlikte İnşa Edelim',
  heroSubtitle: 'Yenilikçi eğitim yaklaşımı ve güçlü öğretmen kadrosuyla her öğrencinin potansiyelini açığa çıkarıyoruz.',
  heroCtaText: 'Kayıt Ol',
  heroImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80',
  primaryColor: '#1E40AF',
  logo: null,
  aboutVizyon: 'Her öğrencinin öğrenme potansiyelini en üst düzeye çıkarmak.',
  aboutMisyon: 'Kaliteli eğitim, güçlü değerler ve topluma katkı odaklı nesiller yetiştirmek.',
  contactEmail: 'info@bilge-akademi.com.tr',
  contactPhone: '+90 212 555 77 88',
  contactAddress: 'Eğitim Mah. Okul Cd. No:1, Kadıköy / İstanbul',
  contactMapUrl: null,
  cuisineType: null,
  openingHours: null,
  reservationEmail: null,
  workingHours: null,
  appointmentEmail: null,
  licenseNo: null,
  metaTitle: 'Bilge Akademi | Eğitimde Güçlü Gelecek',
  metaDesc: 'Öğrenci gelişimini, güçlü öğretmen kadrosunu ve çağdaş eğitim yaklaşımını merkezine alan eğitim kurumu.',
  published: true,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
}

export const OKUL_FALLBACK_GALLERY: ThemeGallery[] = [
  {
    id: 'okul-gallery-1',
    siteId: OKUL_FALLBACK_SITE.id,
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    caption: 'Okul kampüsü',
    order: 1,
    createdAt: new Date(0).toISOString(),
  },
  {
    id: 'okul-gallery-2',
    siteId: OKUL_FALLBACK_SITE.id,
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
    caption: 'Sınıf içi öğrenme',
    order: 2,
    createdAt: new Date(0).toISOString(),
  },
  {
    id: 'okul-gallery-3',
    siteId: OKUL_FALLBACK_SITE.id,
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
    caption: 'Sosyal etkinlikler',
    order: 3,
    createdAt: new Date(0).toISOString(),
  },
]

export const OKUL_FALLBACK_POSTS: ThemePost[] = [
  {
    id: 'okul-post-1',
    siteId: OKUL_FALLBACK_SITE.id,
    title: 'Yeni dönem kayıtlarımız başladı',
    excerpt: 'Öğrencilerimizin akademik ve sosyal gelişimini destekleyen yeni dönem programımızı inceleyin.',
    content: 'Yeni dönem programımız ve kayıt sürecimiz hakkında ayrıntılı bilgi için okul yönetimiyle iletişime geçebilirsiniz.',
    coverImage: null,
    published: true,
    publishedAt: '2026-06-10T09:00:00.000Z',
    createdAt: '2026-06-10T09:00:00.000Z',
    updatedAt: '2026-06-10T09:00:00.000Z',
  },
  {
    id: 'okul-post-2',
    siteId: OKUL_FALLBACK_SITE.id,
    title: 'Bilim ve sanat haftası',
    excerpt: 'Öğrencilerimizin projeleri, atölyeleri ve sahne çalışmaları ailelerimizle buluşuyor.',
    content: 'Bilim ve sanat haftası boyunca öğrencilerimizin yıl içinde geliştirdiği çalışmalar sergilenecektir.',
    coverImage: null,
    published: true,
    publishedAt: '2026-05-22T09:00:00.000Z',
    createdAt: '2026-05-22T09:00:00.000Z',
    updatedAt: '2026-05-22T09:00:00.000Z',
  },
  {
    id: 'okul-post-3',
    siteId: OKUL_FALLBACK_SITE.id,
    title: 'Veli bilgilendirme buluşması',
    excerpt: 'Yeni dönem hedefleri ve öğrenci destek programları için velilerimizle bir araya geliyoruz.',
    content: 'Program, rehberlik yaklaşımı ve dönem hedeflerinin paylaşılacağı buluşmaya tüm velilerimiz davetlidir.',
    coverImage: null,
    published: true,
    publishedAt: '2026-05-05T09:00:00.000Z',
    createdAt: '2026-05-05T09:00:00.000Z',
    updatedAt: '2026-05-05T09:00:00.000Z',
  },
]

export const OKUL_FALLBACK_TEAM: ThemeTeamMember[] = [
  { id: 'okul-team-1', siteId: OKUL_FALLBACK_SITE.id, name: 'Selin Akın', role: 'Okul Müdürü', bio: 'Eğitim yönetimi ve öğrenci gelişimi alanında 18 yıllık deneyim.', avatar: null, order: 1, createdAt: new Date(0).toISOString(), updatedAt: new Date(0).toISOString() },
  { id: 'okul-team-2', siteId: OKUL_FALLBACK_SITE.id, name: 'Mert Yalçın', role: 'Akademik Koordinatör', bio: 'Program geliştirme ve öğretmen eğitiminden sorumlu akademik koordinatör.', avatar: null, order: 2, createdAt: new Date(0).toISOString(), updatedAt: new Date(0).toISOString() },
  { id: 'okul-team-3', siteId: OKUL_FALLBACK_SITE.id, name: 'Ece Demir', role: 'Rehberlik Uzmanı', bio: 'Öğrencilerin sosyal ve duygusal gelişimini destekleyen rehberlik uzmanı.', avatar: null, order: 3, createdAt: new Date(0).toISOString(), updatedAt: new Date(0).toISOString() },
  { id: 'okul-team-4', siteId: OKUL_FALLBACK_SITE.id, name: 'Can Ersoy', role: 'Sosyal Etkinlikler Koordinatörü', bio: 'Sanat, spor ve sosyal sorumluluk programlarını yönetir.', avatar: null, order: 4, createdAt: new Date(0).toISOString(), updatedAt: new Date(0).toISOString() },
]
