import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import BlogPostClient from './blog-post-client'
import type { Post } from '@/lib/db-types'

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
  const { data } = await db().from('Post').select('titleTr,titleEn,excerptTr,excerptEn,coverImage').eq('slug', slug).single()
  if (!data) return {}
  return {
    title: locale === 'tr' ? data.titleTr : data.titleEn,
    description: locale === 'tr' ? data.excerptTr : data.excerptEn,
    openGraph: { images: data.coverImage ? [data.coverImage] : [] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params

  const [{ data: post }, { data: allPosts }] = await Promise.all([
    db().from('Post').select('*').eq('slug', slug).eq('published', true).single(),
    db().from('Post').select('*').eq('published', true).order('publishedAt', { ascending: false }),
  ])

  if (!post) notFound()

  const related = ((allPosts ?? []) as Post[])
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <Navbar />
      <BlogPostClient locale={locale} post={post as Post} related={related} />
      <Footer />
    </>
  )
}
