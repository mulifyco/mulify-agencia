import Link from '@/components/themes/theme-link'
import { Mail, MapPin, Phone } from 'lucide-react'
import type { ThemeSite } from '@/lib/db-types'

const LINKS = [
  { label: 'Uzmanlık Alanları', href: '/projeler/hukuk/uzmanlik-alanlari' },
  { label: 'Ekip', href: '/projeler/hukuk/ekip' },
  { label: 'Ofisler', href: '/projeler/hukuk/ofisler' },
  { label: 'Yayınlar', href: '/projeler/hukuk/yayinlar' },
  { label: 'Kariyer', href: '/projeler/hukuk/kariyer' },
  { label: 'İletişim', href: '/projeler/hukuk/iletisim' },
]

export default function HukukFooter({ site }: { site: ThemeSite | null }) {
  const accent = site?.primaryColor ?? '#8c6a4a'
  const name = site?.name ?? 'Aksoy, Erdem & Partners'

  return (
    <footer className="border-t border-[#e6d8cb] bg-[#16120f] text-[#f7f2ec]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="font-playfair text-3xl font-bold">{name}</div>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#d6cbc2]">
            Büyük ölçekli şirketler, yatırımcılar ve yönetim kurulları için işlem, uyuşmazlık ve regülasyon ekseninde güven veren hukuki danışmanlık.
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-[#2a241f] bg-[#1d1815] px-5 py-4">
            <div className="text-xs uppercase tracking-[0.28em]" style={{ color: '#c5a789' }}>Kurumsal Yaklaşım</div>
            <div className="mt-2 font-playfair text-2xl">Karar süreçlerine eşlik eden hukuk stratejileri</div>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.28em]" style={{ color: accent }}>Hızlı Geçiş</div>
          <div className="mt-5 space-y-3">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="block text-sm text-[#f7f2ec] transition-opacity hover:opacity-70">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.28em]" style={{ color: accent }}>İletişim</div>
          <div className="mt-5 space-y-4 text-sm text-[#d6cbc2]">
            {site?.contactEmail && (
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: accent }} />
                <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              </div>
            )}
            {site?.contactPhone && (
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: accent }} />
                <a href={`tel:${site.contactPhone.replace(/\s/g, '')}`}>{site.contactPhone}</a>
              </div>
            )}
            {site?.contactAddress && (
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: accent }} />
                <span>{site.contactAddress}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#2a241f]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-[#b8aca2] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} {name}. Tüm hakları saklıdır.</span>
          <span>İstanbul, Ankara ve İzmir&apos;de kurumsal hukuk hizmetleri.</span>
        </div>
      </div>
    </footer>
  )
}
