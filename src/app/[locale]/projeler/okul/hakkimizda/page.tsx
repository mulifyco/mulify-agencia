import { createServiceRoleClient } from '@/lib/supabase-server'
import type { Metadata } from 'next'
import type { ThemeSite, ThemeTeamMember } from '@/lib/db-types'
import { OKUL_FALLBACK_SITE, OKUL_FALLBACK_TEAM } from '@/components/themes/okul/okul-theme'

function db() {
  return createServiceRoleClient()
}

export const metadata: Metadata = { title: 'Hakkımızda' }

export default async function OkulHakkimizdaPage() {
  const { data: site } = await (await db())
.from('ThemeSite')
    .select('*')
    .eq('slug', 'okul')
    .eq('published', true)
    .single()

  const s = (site as ThemeSite | null) ?? OKUL_FALLBACK_SITE
  const color = s.primaryColor

  const { data: team } = await (await db())
.from('ThemeTeamMember')
    .select('*')
    .eq('siteId', s.id)
    .order('order')
  const teamMembers = ((team ?? []) as ThemeTeamMember[]).length > 0 ? (team as ThemeTeamMember[]) : OKUL_FALLBACK_TEAM

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
            Kurumumuz
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Hakkımızda</h1>
          <p className="text-gray-500 text-lg">
            {s.name} — eğitimde yarım asrı aşkın köklü bir geçmiş.
          </p>
        </div>
      </section>

      {/* Vizyon / Misyon */}
      {(s.aboutVizyon || s.aboutMisyon) && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            {s.aboutVizyon && (
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6"
                  style={{ backgroundColor: `${color}12` }}
                >
                  🎯
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h2>
                <p className="text-gray-500 leading-relaxed">{s.aboutVizyon}</p>
              </div>
            )}
            {s.aboutMisyon && (
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6"
                  style={{ backgroundColor: `${color}12` }}
                >
                  📚
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
                <p className="text-gray-500 leading-relaxed">{s.aboutMisyon}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Values */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Değerlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🤝', title: 'Güven', desc: 'Öğrenci, veli ve öğretmen arasında şeffaf ve güvenli bir ortam.' },
              { icon: '💡', title: 'Yenilik', desc: 'Çağdaş eğitim yöntemleri ve teknoloji destekli öğrenme.' },
              { icon: '🌱', title: 'Gelişim', desc: 'Her öğrencinin bireysel potansiyelini en üst düzeye çıkarmak.' },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 p-8 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {teamMembers.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Kadromuz</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center group">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4"
                    />
                  ) : (
                    <div
                      className="w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div className="font-semibold text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{member.role}</div>
                  {member.bio && (
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
