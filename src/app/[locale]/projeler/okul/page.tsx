import { createServiceRoleClient } from '@/lib/supabase-server'
import type { Metadata } from 'next'
import Link from '@/components/themes/theme-link'
import type { ThemeSite, ThemePost, ThemeTeamMember } from '@/lib/db-types'
import { OKUL_FALLBACK_POSTS, OKUL_FALLBACK_SITE, OKUL_FALLBACK_TEAM } from '@/components/themes/okul/okul-theme'

function db() {
  return createServiceRoleClient()
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await (await db())
.from('ThemeSite')
    .select('metaTitle,name')
    .eq('slug', 'okul')
    .single()
  return { title: data?.metaTitle ?? data?.name ?? 'Ana Sayfa' }
}

export default async function OkulHomePage() {
  const { data: site } = await (await db())
.from('ThemeSite')
    .select('*')
    .eq('slug', 'okul')
    .eq('published', true)
    .single()

  const s = (site as ThemeSite | null) ?? OKUL_FALLBACK_SITE
  const color = s.primaryColor

  const [{ data: posts }, { data: team }] = await Promise.all([
    (await db()).from('ThemePost').select('*').eq('siteId', s.id).eq('published', true).order('publishedAt', { ascending: false }).limit(3),
    (await db()).from('ThemeTeamMember').select('*').eq('siteId', s.id).order('order').limit(4),
  ])
  const resolvedPosts = ((posts ?? []) as ThemePost[]).length > 0 ? (posts as ThemePost[]) : OKUL_FALLBACK_POSTS
  const resolvedTeam = ((team ?? []) as ThemeTeamMember[]).length > 0 ? (team as ThemeTeamMember[]) : OKUL_FALLBACK_TEAM

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-28 px-6 text-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}08 0%, ${color}18 100%)` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 60% 40%, ${color}20 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: `${color}15`, color }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            Kayıt Dönemi Açık
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            {s.heroTitle ?? s.name}
          </h1>
          {s.heroSubtitle && (
            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
              {s.heroSubtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projeler/okul/iletisim"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-base shadow-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              {s.heroCtaText ?? 'Kayıt Ol'}
            </Link>
            <Link
              href="/projeler/okul/hakkimizda"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base border-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: color, color }}
            >
              Daha Fazla Bilgi
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-gray-100 py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '50+', label: 'Yıllık Deneyim' },
            { value: '1.200+', label: 'Mezun Öğrenci' },
            { value: '48', label: 'Uzman Öğretmen' },
            { value: '%98', label: 'Veli Memnuniyeti' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold mb-1" style={{ color }}>{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About preview */}
      {(s.aboutVizyon || s.aboutMisyon) && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {s.aboutVizyon && (
              <div className="rounded-2xl border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-xl"
                  style={{ backgroundColor: `${color}12` }}
                >
                  🎯
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Vizyonumuz</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.aboutVizyon}</p>
              </div>
            )}
            {s.aboutMisyon && (
              <div className="rounded-2xl border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-xl"
                  style={{ backgroundColor: `${color}12` }}
                >
                  📚
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Misyonumuz</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.aboutMisyon}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Latest posts */}
      {resolvedPosts.length > 0 && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Son Duyurular</h2>
              <Link href="/projeler/okul/blog" className="text-sm font-medium" style={{ color }}>
                Tümünü gör →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {resolvedPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <time className="text-xs text-gray-400 mb-3 block">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                  </time>
                  <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{post.title}</h3>
                  {post.excerpt && <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team preview */}
      {resolvedTeam.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Kadromuz</h2>
              <Link href="/projeler/okul/hakkimizda" className="text-sm font-medium" style={{ color }}>
                Tümünü gör →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {resolvedTeam.map((member) => (
                <div key={member.id} className="text-center">
                  <div
                    className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">{member.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section
        className="py-16 px-6 text-center"
        style={{ backgroundColor: color }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Çocuğunuzu geleceğe hazırlayın
        </h2>
        <p className="text-blue-100 mb-8 max-w-xl mx-auto">
          Kayıt ve bilgi için bizimle iletişime geçin.
        </p>
        <Link
          href="/projeler/okul/iletisim"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ color }}
        >
          İletişime Geç
        </Link>
      </section>
    </>
  )
}
