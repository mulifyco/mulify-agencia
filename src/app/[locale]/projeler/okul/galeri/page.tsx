import { createServiceRoleClient } from '@/lib/supabase-server'
import type { Metadata } from 'next'
import type { ThemeSite, ThemeGallery } from '@/lib/db-types'
import { OKUL_FALLBACK_GALLERY, OKUL_FALLBACK_SITE } from '@/components/themes/okul/okul-theme'

function db() {
  return createServiceRoleClient()
}

export const metadata: Metadata = { title: 'Galeri' }

export default async function OkulGaleriPage() {
  const { data: site } = await (await db())
.from('ThemeSite')
    .select('id,name,primaryColor,published')
    .eq('slug', 'okul')
    .eq('published', true)
    .single()

  const s = (site as Pick<ThemeSite, 'id' | 'name' | 'primaryColor' | 'published'> | null) ?? OKUL_FALLBACK_SITE
  const color = s.primaryColor

  const { data: gallery } = await (await db())
.from('ThemeGallery')
    .select('*')
    .eq('siteId', s.id)
    .order('order')

  const galleryItems = (gallery ?? []) as ThemeGallery[]
  const items = galleryItems.length > 0 ? galleryItems : OKUL_FALLBACK_GALLERY

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
            Fotoğraflar
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Galeri</h1>
          <p className="text-gray-500 text-lg">Okul hayatımızdan kareler.</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-400 py-20">Henüz fotoğraf eklenmemiş.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100"
                >
                  <img
                    src={item.url}
                    alt={item.caption ?? ''}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium">{item.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
