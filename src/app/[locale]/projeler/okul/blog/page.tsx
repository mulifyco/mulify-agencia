import { createServiceRoleClient } from '@/lib/supabase-server'
import type { Metadata } from 'next'
import type { ThemeSite, ThemePost } from '@/lib/db-types'
import { OKUL_FALLBACK_POSTS, OKUL_FALLBACK_SITE } from '@/components/themes/okul/okul-theme'

function db() {
  return createServiceRoleClient()
}

export const metadata: Metadata = { title: 'Blog & Duyurular' }

export default async function OkulBlogPage() {
  const { data: site } = await (await db())
.from('ThemeSite')
    .select('id,name,primaryColor,published')
    .eq('slug', 'okul')
    .eq('published', true)
    .single()

  const s = (site as Pick<ThemeSite, 'id' | 'name' | 'primaryColor' | 'published'> | null) ?? OKUL_FALLBACK_SITE
  const color = s.primaryColor

  const { data: posts } = await (await db())
.from('ThemePost')
    .select('*')
    .eq('siteId', s.id)
    .eq('published', true)
    .order('publishedAt', { ascending: false })

  const postItems = (posts ?? []) as ThemePost[]
  const items = postItems.length > 0 ? postItems : OKUL_FALLBACK_POSTS

  return (
    <>
      {/* Page header */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: `linear-gradient(135deg, ${color}06 0%, ${color}14 100%)` }}
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ backgroundColor: `${color}15`, color }}
          >
            Haberler
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Blog & Duyurular</h1>
          <p className="text-gray-500 text-lg">Okul haberleri, etkinlikler ve duyurular.</p>
        </div>
      </section>

      {/* Posts list */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-400 py-20">Henüz duyuru eklenmemiş.</p>
          ) : (
            <div className="space-y-6">
              {items.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-md transition-shadow"
                >
                  {post.coverImage && (
                    <div className="aspect-[16/6] rounded-xl overflow-hidden mb-6">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <time className="text-sm text-gray-400">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : ''}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-gray-500 leading-relaxed">{post.excerpt}</p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
