import PageHeader from '@/components/demos/hukuk/page-header'
import InsightCard from '@/components/demos/hukuk/insight-card'
import { getHukukPosts } from '../_data'

export const dynamic = 'force-dynamic'

export default async function HukukInsightsPage() {
  const posts = await getHukukPosts()

  return (
    <>
      <PageHeader
        eyebrow="Yayınlar"
        title="Piyasa gelişmeleri, regülasyon notları ve yönetici özetleri"
        description="Insight katmanı; büyük hukuk bürosu sitelerinin en ikna edici uzmanlık sinyallerinden biridir."
      />

      <section className="bg-[#16120f] py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3 lg:px-8">
          {posts.map((post, index) => (
            <InsightCard
              key={post.id}
              insight={{
                slug: `post-${index}`,
                title: post.title,
                excerpt: post.excerpt ?? '',
                category: index % 3 === 0 ? 'Kurumsal' : index % 3 === 1 ? 'Uyum' : 'Uyuşmazlık',
              }}
            />
          ))}
        </div>
      </section>
    </>
  )
}

