import { createServiceRoleClient } from '@/lib/supabase-server'
import type { ThemeGallery, ThemePost, ThemeSite, ThemeTeamMember } from '@/lib/db-types'
import {
  HUKUK_DEMO,
  HUKUK_GALLERY_FALLBACK,
  HUKUK_INSIGHTS,
  HUKUK_TEAM_FALLBACK,
} from '@/data/demos/hukuk'

export const dynamic = 'force-dynamic'

export function db() {
  return createServiceRoleClient()
}

export const HUKUK_FALLBACK_SITE: Partial<ThemeSite> = {
  name: HUKUK_DEMO.firmName,
  heroTitle: HUKUK_DEMO.heroTitle,
  heroSubtitle: HUKUK_DEMO.heroSummary,
  heroCtaText: 'Partner Ekiple Görüşün',
  heroImage: HUKUK_GALLERY_FALLBACK[2].url,
  primaryColor: HUKUK_DEMO.accent,
  aboutVizyon:
    'Büyük ölçekli müvekkillerin kritik karar anlarında, teknik derinlik ile ticari sezgiyi birleştiren güvenilir bir danışmanlık standardı oluşturmak.',
  aboutMisyon:
    'İşlem, uyuşmazlık ve uyum başlıklarında yönetim ekiplerine daha net karar aldıran, hızlı ve disiplinler arası hukuki destek sunmak.',
  contactEmail: 'contact@aksoyerdem.com',
  contactPhone: '+90 212 555 20 40',
  contactAddress: 'Levent Plaza, Büyükdere Caddesi, İstanbul',
  metaTitle: 'Aksoy, Erdem & Partners | Büyük Ölçekli Hukuk Bürosu Teması',
  metaDesc: 'Kurumsal işlemler, uyuşmazlıklar ve regülasyon projeleri için kapsamlı hukuk danışmanlığı.',
  published: true,
}

export async function getHukukSite() {
  const { data } = await (await db()).from('ThemeSite').select('*').eq('slug', 'hukuk').single()
  return (data as ThemeSite | null) ?? (HUKUK_FALLBACK_SITE as ThemeSite)
}

export async function getHukukRawSite() {
  const { data } = await (await db()).from('ThemeSite').select('*').eq('slug', 'hukuk').single()
  return data as ThemeSite | null
}

export async function getHukukGallery() {
  const site = await getHukukRawSite()
  if (!site?.id) {
    return HUKUK_GALLERY_FALLBACK.map((item, index) => ({
      id: `fallback-${index}`,
      siteId: 'fallback',
      url: item.url,
      caption: item.caption,
      order: index,
      createdAt: new Date(0).toISOString(),
    })) as ThemeGallery[]
  }

  const { data } = await (await db()).from('ThemeGallery').select('*').eq('siteId', site.id).order('order')
  const gallery = (data ?? []) as ThemeGallery[]

  if (gallery.length > 0) return gallery

  return HUKUK_GALLERY_FALLBACK.map((item, index) => ({
    id: `fallback-${index}`,
    siteId: site.id,
    url: item.url,
    caption: item.caption,
    order: index,
    createdAt: new Date(0).toISOString(),
  })) as ThemeGallery[]
}

export async function getHukukTeam() {
  const site = await getHukukRawSite()
  if (!site?.id) {
    return HUKUK_TEAM_FALLBACK.map((item, index) => ({
      id: `fallback-${index}`,
      siteId: 'fallback',
      name: item.name,
      role: item.role,
      bio: item.bio,
      avatar: null,
      order: index + 1,
      createdAt: new Date(0).toISOString(),
      updatedAt: new Date(0).toISOString(),
    })) as ThemeTeamMember[]
  }

  const { data } = await (await db()).from('ThemeTeamMember').select('*').eq('siteId', site.id).order('order')
  const members = (data ?? []) as ThemeTeamMember[]

  if (members.length > 0) return members

  return HUKUK_TEAM_FALLBACK.map((item, index) => ({
    id: `fallback-${index}`,
    siteId: site.id,
    name: item.name,
    role: item.role,
    bio: item.bio,
    avatar: null,
    order: index + 1,
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  })) as ThemeTeamMember[]
}

export async function getHukukPosts() {
  const site = await getHukukRawSite()
  if (!site?.id) {
    return HUKUK_INSIGHTS.map((item, index) => ({
      id: `fallback-${index}`,
      siteId: 'fallback',
      title: item.title,
      excerpt: item.excerpt,
      content: `${item.title}\n\n${item.excerpt}`,
      coverImage: null,
      published: true,
      publishedAt: new Date('2026-01-01').toISOString(),
      createdAt: new Date(0).toISOString(),
      updatedAt: new Date(0).toISOString(),
    })) as ThemePost[]
  }

  const { data } = await (await db()).from('ThemePost').select('*').eq('siteId', site.id).eq('published', true).order('publishedAt', { ascending: false })
  const posts = (data ?? []) as ThemePost[]

  if (posts.length > 0) return posts

  return HUKUK_INSIGHTS.map((item, index) => ({
    id: `fallback-${index}`,
    siteId: site.id,
    title: item.title,
    excerpt: item.excerpt,
    content: `${item.title}\n\n${item.excerpt}`,
    coverImage: null,
    published: true,
    publishedAt: new Date('2026-01-01').toISOString(),
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  })) as ThemePost[]
}
