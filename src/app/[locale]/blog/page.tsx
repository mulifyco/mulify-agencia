import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import BlogListClient from './blog-list-client'
import type { Post } from '@/lib/db-types'
import { POST_CARD_COLUMNS } from '@/lib/public-content'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: 'Blog',
    description: locale === 'tr' ? 'Dijital dünyadan içgörüler, trendler ve ipuçları.' : 'Insights, trends and tips from the digital world.',
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { data: posts } = await db()
    .from('Post')
    .select(POST_CARD_COLUMNS)
    .eq('published', true)
    .order('publishedAt', { ascending: false })

  return (
    <>
      <Navbar />
      <BlogListClient locale={locale} posts={(posts ?? []) as Post[]} />
      <Footer />
    </>
  )
}
