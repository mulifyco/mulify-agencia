'use client'

import Link from '@/components/themes/theme-link'
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'
import type { ThemeSite } from '@/lib/db-types'

const QUICK_LINKS = [
  { label: 'Ana Sayfa',   href: '/projeler/okul' },
  { label: 'Hakkımızda', href: '/projeler/okul/hakkimizda' },
  { label: 'Galeri',     href: '/projeler/okul/galeri' },
  { label: 'Blog',       href: '/projeler/okul/blog' },
  { label: 'İletişim',   href: '/projeler/okul/iletisim' },
]

export default function OkulFooter({ site }: { site: ThemeSite | null }) {
  const name    = site?.name           ?? 'Okul'
  const color   = site?.primaryColor   ?? '#1E40AF'
  const email   = site?.contactEmail   ?? null
  const phone   = site?.contactPhone   ?? null
  const address = site?.contactAddress ?? null

  return (
    <footer className="bg-gray-900 text-white">
      {/* Blue top border */}
      <div className="h-1 w-full" style={{ backgroundColor: color }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}25`, border: `2px solid ${color}60` }}
              >
                <GraduationCap className="w-5 h-5" style={{ color }} />
              </div>
              <span className="font-bold text-white text-base">{name}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Bilim, sanat ve sporda öncü nesiller yetiştiren köklü eğitim kurumuyuz.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              İletişim
            </h4>
            <ul className="space-y-3">
              {email && (
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
                </li>
              )}
              {phone && (
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
                  <span>{address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} {name}. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-gray-700">
            Web sitesi{' '}
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              Mulify
            </Link>{' '}
            tarafından yapılmıştır.
          </p>
        </div>
      </div>
    </footer>
  )
}
