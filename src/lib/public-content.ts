import { cache } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { Post, PricingPlan, Project, Service } from '@/lib/db-types'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

export const PROJECT_CARD_COLUMNS = 'id,slug,titleTr,titleEn,descTr,descEn,client,url,image,tags,featured,serviceId'
export const PROJECT_DETAIL_COLUMNS = 'id,slug,titleTr,titleEn,descTr,descEn,client,url,image,images,tags,featured,serviceId,createdAt'
export const SERVICE_CARD_COLUMNS = 'id,slug,titleTr,titleEn,descTr,descEn,icon,featured'
export const SERVICE_DETAIL_COLUMNS = 'id,slug,titleTr,titleEn,descTr,descEn,icon,featured'
export const POST_CARD_COLUMNS = 'id,slug,titleTr,titleEn,excerptTr,excerptEn,contentTr,contentEn,coverImage,tags,publishedAt'
export const POST_DETAIL_COLUMNS = 'id,slug,titleTr,titleEn,excerptTr,excerptEn,contentTr,contentEn,coverImage,tags,publishedAt'
export const PRICING_COLUMNS = 'id,slug,nameTr,nameEn,descTr,descEn,price,currency,period,features,ctaText,highlighted,order,published,createdAt,updatedAt'

export const getProjectBySlug = cache(async (slug: string) => {
  const { data } = await db().from('Project').select(PROJECT_DETAIL_COLUMNS).eq('slug', slug).eq('published', true).single()
  return data as Project | null
})

export const getServiceBySlug = cache(async (slug: string) => {
  const { data } = await db().from('Service').select(SERVICE_DETAIL_COLUMNS).eq('slug', slug).eq('published', true).single()
  return data as Service | null
})

export const getPostBySlug = cache(async (slug: string) => {
  const { data } = await db().from('Post').select(POST_DETAIL_COLUMNS).eq('slug', slug).eq('published', true).single()
  return data as Post | null
})

export async function getRelatedProjects(slug: string) {
  const { data } = await db().from('Project').select(PROJECT_CARD_COLUMNS).eq('published', true).neq('slug', slug).order('order').limit(3)
  return (data ?? []) as Project[]
}

export async function getRelatedServices(slug: string) {
  const { data } = await db().from('Service').select(SERVICE_CARD_COLUMNS).eq('published', true).neq('slug', slug).order('order').limit(3)
  return (data ?? []) as Service[]
}

export async function getRelatedPosts(slug: string) {
  const { data } = await db().from('Post').select(POST_CARD_COLUMNS).eq('published', true).neq('slug', slug).order('publishedAt', { ascending: false }).limit(3)
  return (data ?? []) as Post[]
}

export async function getPricingPlans() {
  const { data, error } = await db().from('PricingPlan').select(PRICING_COLUMNS).eq('published', true).order('order', { ascending: true })
  return error ? [] : (data ?? []) as PricingPlan[]
}
