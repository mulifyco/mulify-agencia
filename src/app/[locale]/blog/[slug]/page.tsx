import { notFound } from 'next/navigation'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import BlogPostClient from './blog-post-client'
import type { Post } from '@/lib/db-types'
import { getPostBySlug, getRelatedPosts } from '@/lib/public-content'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const data = await getPostBySlug(slug)
  if (!data) return {}
  return {
    title: locale === 'tr' ? data.titleTr : data.titleEn,
    description: locale === 'tr' ? data.excerptTr : data.excerptEn,
    openGraph: { images: data.coverImage ? [data.coverImage] : [] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params

  const [post, related] = await Promise.all([
    getPostBySlug(slug),
    getRelatedPosts(slug),
  ])

  if (!post) notFound()

  return (
    <>
      <Navbar />
      <BlogPostClient locale={locale} post={post as Post} related={related} />
      <Footer />
    </>
  )
}
