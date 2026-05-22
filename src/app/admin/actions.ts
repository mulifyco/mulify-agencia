'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import type { Lead, Service, Project, Post, Testimonial, TeamMember, PricingPlan, FAQ, Page, SiteSetting } from '@/lib/db-types'

function admin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

// ─── Leads ────────────────────────────────────────────────────────────────────

export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await admin().from('Lead').select('*').order('createdAt', { ascending: false })
  if (error) throw error
  return (data ?? []) as Lead[]
}

export async function updateLeadStatus(id: string, status: string) {
  const { error } = await admin().from('Lead').update({ status, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/leads')
  revalidatePath('/admin')
}

export async function deleteLead(id: string) {
  console.log('[deleteLead action] called with id:', id)
  const { error, count } = await admin().from('Lead').delete({ count: 'exact' }).eq('id', id)
  console.log('[deleteLead action] result — error:', JSON.stringify(error), '  rows deleted:', count)
  if (error) throw error
  revalidatePath('/admin/leads')
  revalidatePath('/admin')
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  const { data, error } = await admin().from('Service').select('*').order('order', { ascending: true })
  if (error) throw error
  return (data ?? []) as Service[]
}

export async function createService(data: {
  slug: string; titleTr: string; titleEn: string
  descTr: string; descEn: string; icon?: string
  featured: boolean; published: boolean
}) {
  const { count } = await admin().from('Service').select('*', { count: 'exact', head: true })
  const now = new Date().toISOString()
  const { error } = await admin().from('Service').insert({
    id: crypto.randomUUID(), ...data, order: count ?? 0, createdAt: now, updatedAt: now,
  })
  if (error) throw error
  revalidatePath('/admin/services')
}

export async function updateService(id: string, data: {
  slug: string; titleTr: string; titleEn: string
  descTr: string; descEn: string; icon?: string
  featured: boolean; published: boolean
}) {
  const { error } = await admin().from('Service').update({ ...data, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/services')
}

export async function deleteService(id: string) {
  const { error } = await admin().from('Service').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/services')
}

export async function reorderServices(orderedIds: string[]) {
  await Promise.all(orderedIds.map((id, i) =>
    admin().from('Service').update({ order: i, updatedAt: new Date().toISOString() }).eq('id', id)
  ))
  revalidatePath('/admin/services')
}

export async function toggleServicePublished(id: string, published: boolean) {
  const { error } = await admin().from('Service').update({ published, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/services')
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await admin().from('Project').select('*').order('order', { ascending: true })
  if (error) throw error
  return (data ?? []) as Project[]
}

export async function createProject(data: {
  slug: string; titleTr: string; titleEn: string
  descTr: string; descEn: string; client?: string
  url?: string; tags: string[]; featured: boolean; published: boolean
}) {
  const { count } = await admin().from('Project').select('*', { count: 'exact', head: true })
  const now = new Date().toISOString()
  const { error } = await admin().from('Project').insert({
    id: crypto.randomUUID(), ...data, order: count ?? 0, images: [], createdAt: now, updatedAt: now,
  })
  if (error) throw error
  revalidatePath('/admin/projects')
}

export async function updateProject(id: string, data: {
  slug: string; titleTr: string; titleEn: string
  descTr: string; descEn: string; client?: string
  url?: string; tags: string[]; featured: boolean; published: boolean
}) {
  const { error } = await admin().from('Project').update({ ...data, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/projects')
}

export async function deleteProject(id: string) {
  const { error } = await admin().from('Project').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/projects')
}

export async function toggleProjectPublished(id: string, published: boolean) {
  const { error } = await admin().from('Project').update({ published, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/projects')
}

// ─── Posts (Blog) ──────────────────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await admin().from('Post').select('*').order('createdAt', { ascending: false })
  if (error) throw error
  return (data ?? []) as Post[]
}

export async function createPost(data: {
  slug: string; titleTr: string; titleEn: string
  excerptTr?: string; excerptEn?: string
  contentTr: string; contentEn: string
  tags: string[]; published: boolean
}) {
  const now = new Date().toISOString()
  const { error } = await admin().from('Post').insert({
    id: crypto.randomUUID(), ...data,
    publishedAt: data.published ? now : null,
    createdAt: now, updatedAt: now,
  })
  if (error) throw error
  revalidatePath('/admin/blog')
}

export async function updatePost(id: string, data: {
  slug: string; titleTr: string; titleEn: string
  excerptTr?: string; excerptEn?: string
  contentTr: string; contentEn: string
  tags: string[]; published: boolean
}) {
  const { error } = await admin().from('Post').update({
    ...data,
    publishedAt: data.published ? new Date().toISOString() : null,
    updatedAt: new Date().toISOString(),
  }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/blog')
}

export async function deletePost(id: string) {
  const { error } = await admin().from('Post').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/blog')
}

export async function togglePostPublished(id: string, published: boolean) {
  const { error } = await admin().from('Post').update({
    published,
    publishedAt: published ? new Date().toISOString() : null,
    updatedAt: new Date().toISOString(),
  }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/blog')
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await admin().from('Testimonial').select('*').order('order', { ascending: true })
  if (error) throw error
  return (data ?? []) as Testimonial[]
}

export async function createTestimonial(data: {
  nameTr: string; nameEn: string; roleTr?: string; roleEn?: string
  company?: string; contentTr: string; contentEn: string
  rating: number; featured: boolean; published: boolean
}) {
  const { count } = await admin().from('Testimonial').select('*', { count: 'exact', head: true })
  const now = new Date().toISOString()
  const { error } = await admin().from('Testimonial').insert({
    id: crypto.randomUUID(), ...data, order: count ?? 0, createdAt: now, updatedAt: now,
  })
  if (error) throw error
  revalidatePath('/admin/testimonials')
}

export async function updateTestimonial(id: string, data: {
  nameTr: string; nameEn: string; roleTr?: string; roleEn?: string
  company?: string; contentTr: string; contentEn: string
  rating: number; featured: boolean; published: boolean
}) {
  const { error } = await admin().from('Testimonial').update({ ...data, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/testimonials')
}

export async function deleteTestimonial(id: string) {
  const { error } = await admin().from('Testimonial').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/testimonials')
}

export async function toggleTestimonialPublished(id: string, published: boolean) {
  const { error } = await admin().from('Testimonial').update({ published, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/testimonials')
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await admin().from('TeamMember').select('*').order('order', { ascending: true })
  if (error) throw error
  return (data ?? []) as TeamMember[]
}

export async function createTeamMember(data: {
  nameTr: string; nameEn: string; roleTr: string; roleEn: string
  bioTr?: string; bioEn?: string; linkedin?: string; twitter?: string; github?: string
  published: boolean
}) {
  const { count } = await admin().from('TeamMember').select('*', { count: 'exact', head: true })
  const now = new Date().toISOString()
  const { error } = await admin().from('TeamMember').insert({
    id: crypto.randomUUID(), ...data, order: count ?? 0, createdAt: now, updatedAt: now,
  })
  if (error) throw error
  revalidatePath('/admin/team')
}

export async function updateTeamMember(id: string, data: {
  nameTr: string; nameEn: string; roleTr: string; roleEn: string
  bioTr?: string; bioEn?: string; linkedin?: string; twitter?: string; github?: string
  published: boolean
}) {
  const { error } = await admin().from('TeamMember').update({ ...data, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/team')
}

export async function deleteTeamMember(id: string) {
  const { error } = await admin().from('TeamMember').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/team')
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export async function getPricingPlans(): Promise<PricingPlan[]> {
  const { data, error } = await admin().from('PricingPlan').select('*').order('order', { ascending: true })
  if (error) throw error
  return (data ?? []) as PricingPlan[]
}

export async function createPricingPlan(data: {
  slug: string; nameTr: string; nameEn: string
  descTr?: string; descEn?: string
  price: number; currency: string; period: string
  features: string[]; ctaText?: string | null; highlighted: boolean; published: boolean; order?: number
}) {
  const { count } = await admin().from('PricingPlan').select('*', { count: 'exact', head: true })
  const now = new Date().toISOString()
  const { error } = await admin().from('PricingPlan').insert({
    id: crypto.randomUUID(), ...data,
    order: data.order ?? count ?? 0,
    createdAt: now, updatedAt: now,
  })
  if (error) throw error
  revalidatePath('/admin/pricing')
  revalidatePath('/', 'layout')
}

export async function updatePricingPlan(id: string, data: {
  slug: string; nameTr: string; nameEn: string
  descTr?: string; descEn?: string
  price: number; currency: string; period: string
  features: string[]; ctaText?: string | null; highlighted: boolean; published: boolean; order?: number
}) {
  const { error } = await admin().from('PricingPlan').update({ ...data, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/pricing')
  revalidatePath('/', 'layout')
}

export async function deletePricingPlan(id: string) {
  const { error } = await admin().from('PricingPlan').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/pricing')
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export async function getFAQs(): Promise<FAQ[]> {
  const { data, error } = await admin().from('FAQ').select('*').order('order', { ascending: true })
  if (error) throw error
  return (data ?? []) as FAQ[]
}

export async function createFAQ(data: {
  questionTr: string; questionEn: string
  answerTr: string; answerEn: string
  category?: string; published: boolean
}) {
  const { count } = await admin().from('FAQ').select('*', { count: 'exact', head: true })
  const now = new Date().toISOString()
  const { error } = await admin().from('FAQ').insert({
    id: crypto.randomUUID(), ...data, order: count ?? 0, createdAt: now, updatedAt: now,
  })
  if (error) throw error
  revalidatePath('/admin/faq')
}

export async function updateFAQ(id: string, data: {
  questionTr: string; questionEn: string
  answerTr: string; answerEn: string
  category?: string; published: boolean
}) {
  const { error } = await admin().from('FAQ').update({ ...data, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/faq')
}

export async function deleteFAQ(id: string) {
  const { error } = await admin().from('FAQ').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/faq')
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export async function getPages(): Promise<Page[]> {
  const { data, error } = await admin().from('Page').select('*').order('createdAt', { ascending: false })
  if (error) throw error
  return (data ?? []) as Page[]
}

export async function createPage(data: {
  slug: string; titleTr: string; titleEn: string
  contentTr: string; contentEn: string; published: boolean
}) {
  const now = new Date().toISOString()
  const { error } = await admin().from('Page').insert({ id: crypto.randomUUID(), ...data, createdAt: now, updatedAt: now })
  if (error) throw error
  revalidatePath('/admin/pages')
}

export async function updatePage(id: string, data: {
  slug: string; titleTr: string; titleEn: string
  contentTr: string; contentEn: string; published: boolean
}) {
  const { error } = await admin().from('Page').update({ ...data, updatedAt: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/pages')
}

export async function deletePage(id: string) {
  const { error } = await admin().from('Page').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/pages')
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSetting[]> {
  const { data, error } = await admin().from('SiteSetting').select('*').order('key', { ascending: true })
  if (error) throw error
  return (data ?? []) as SiteSetting[]
}

export async function upsertSettings(settings: { key: string; value: string; type?: string; group?: string }[]) {
  const now = new Date().toISOString()
  for (const { key, value, type = 'text', group = 'general' } of settings) {
    const { data: existing } = await admin().from('SiteSetting').select('id').eq('key', key).single()
    if (existing) {
      await admin().from('SiteSetting').update({ value, updatedAt: now }).eq('key', key)
    } else {
      await admin().from('SiteSetting').insert({ id: crypto.randomUUID(), key, value, type, group, createdAt: now, updatedAt: now })
    }
  }
  revalidatePath('/admin/settings')
}

// ─── Dashboard stats ───────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const db = admin()
  const [
    { count: totalLeads },
    { count: totalProjects },
    { count: totalPosts },
    { count: newLeads },
    { data: recentLeads },
  ] = await Promise.all([
    db.from('Lead').select('*', { count: 'exact', head: true }),
    db.from('Project').select('*', { count: 'exact', head: true }).eq('published', true),
    db.from('Post').select('*', { count: 'exact', head: true }).eq('published', true),
    db.from('Lead').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    db.from('Lead').select('*').order('createdAt', { ascending: false }).limit(5),
  ])

  return {
    totalLeads: totalLeads ?? 0,
    totalProjects: totalProjects ?? 0,
    totalPosts: totalPosts ?? 0,
    newLeads: newLeads ?? 0,
    recentLeads: (recentLeads ?? []) as Lead[],
  }
}
