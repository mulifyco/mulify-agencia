import { createServiceRoleClient } from '@/lib/supabase-server'
import type { Metadata } from 'next'
import type { ThemeSite } from '@/lib/db-types'
import OkulContactForm from './contact-form'
import { OKUL_FALLBACK_SITE } from '@/components/themes/okul/okul-theme'

function db() {
  return createServiceRoleClient()
}

export const metadata: Metadata = { title: 'İletişim' }

export default async function OkulIletisimPage() {
  const { data: site } = await (await db())
.from('ThemeSite')
    .select('*')
    .eq('slug', 'okul')
    .eq('published', true)
    .single()

  const s = (site as ThemeSite | null) ?? OKUL_FALLBACK_SITE
  const color = s.primaryColor

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
            Ulaşın
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">İletişim</h1>
          <p className="text-gray-500 text-lg">Sorularınız için bize ulaşın.</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_400px] gap-12">

          {/* Contact info + map */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Bize Ulaşın</h2>
              <div className="space-y-4">
                {s.contactEmail && (
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <span style={{ color }}>✉</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">E-posta</div>
                      <a href={`mailto:${s.contactEmail}`} className="text-gray-900 font-medium hover:underline" style={{ color }}>
                        {s.contactEmail}
                      </a>
                    </div>
                  </div>
                )}
                {s.contactPhone && (
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <span style={{ color }}>📞</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Telefon</div>
                      <a href={`tel:${s.contactPhone.replace(/\s/g, '')}`} className="text-gray-900 font-medium">
                        {s.contactPhone}
                      </a>
                    </div>
                  </div>
                )}
                {s.contactAddress && (
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <span style={{ color }}>📍</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Adres</div>
                      <p className="text-gray-900 font-medium">{s.contactAddress}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            {s.contactMapUrl && (
              <div className="rounded-2xl overflow-hidden border border-gray-100 aspect-[4/3]">
                <iframe
                  src={s.contactMapUrl}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Okul Haritası"
                />
              </div>
            )}
          </div>

          {/* Form */}
          <OkulContactForm color={color} />
        </div>
      </section>
    </>
  )
}
