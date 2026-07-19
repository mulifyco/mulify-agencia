'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/themes/theme-link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, MapPin, Phone } from 'lucide-react'
import type { ThemeSite } from '@/lib/db-types'

const NAV_LINKS = [
  { label: 'Hakkımızda', href: '/projeler/hukuk/hakkimizda' },
  { label: 'Uzmanlıklar', href: '/projeler/hukuk/uzmanlik-alanlari' },
  { label: 'Ekip', href: '/projeler/hukuk/ekip' },
  { label: 'Ofisler', href: '/projeler/hukuk/ofisler' },
  { label: 'Yayınlar', href: '/projeler/hukuk/yayinlar' },
  { label: 'Sonuçlar', href: '/projeler/hukuk/sonuclar' },
]

const MOBILE_LINKS = [
  { label: 'Ana Sayfa', href: '/projeler/hukuk' },
  ...NAV_LINKS,
  { label: 'Kariyer', href: '/projeler/hukuk/kariyer' },
  { label: 'İletişim', href: '/projeler/hukuk/iletisim' },
]

export default function HukukNavbar({ site }: { site: ThemeSite | null }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const accent = site?.primaryColor ?? '#8c6a4a'
  const name = site?.name ?? 'Aksoy, Erdem & Partners'
  const phone = site?.contactPhone ?? '+90 212 555 20 40'
  const address = site?.contactAddress ?? 'Levent / İstanbul'
  const isActive = (href: string) => (href === '/projeler/hukuk' ? pathname === href : pathname.startsWith(href))

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(247, 242, 236, 0.97)' : 'rgba(247, 242, 236, 0.88)',
          borderBottom: `1px solid ${scrolled ? '#e6d8cb' : 'transparent'}`,
          backdropFilter: 'blur(14px)',
        }}
      >
        <div className="border-b border-[#eadfd6]/80">
          <div className="mx-auto hidden max-w-7xl items-center justify-between px-6 py-3 text-xs text-[#625851] lg:flex lg:px-8">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" style={{ color: accent }} />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" style={{ color: accent }} />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="transition-opacity hover:opacity-70">{phone}</a>
              </div>
            </div>
            <div>English Desk • Cross-Border Matters • Board-Level Counsel</div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/projeler/hukuk" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-white font-playfair text-lg font-bold" style={{ borderColor: `${accent}70`, color: accent }}>
              AE
            </div>
            <div>
              <div className="font-playfair text-xl font-bold text-[#16120f] lg:text-[1.75rem]">{name}</div>
              <div className="text-[10px] uppercase tracking-[0.34em] text-[#7e7167]">Attorneys At Law</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium transition-all"
                style={{
                  color: isActive(link.href) ? '#16120f' : '#6e6258',
                  background: isActive(link.href) ? '#ede2d8' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/projeler/hukuk/iletisim"
              className="inline-flex items-center gap-2 rounded-full bg-[#16120f] px-5 py-2.5 text-sm font-semibold text-[#f7f2ec] transition-all hover:brightness-105"
            >
              Görüşme Talep Et
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 xl:hidden" aria-label="Menüyü aç">
            <Menu className="h-6 w-6 text-[#16120f]" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#f7f2ec] xl:hidden">
          <div className="flex items-center justify-between border-b border-[#eadfd6] px-6 py-4">
            <div className="font-playfair text-xl font-bold text-[#16120f]">{name}</div>
            <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2" aria-label="Menüyü kapat">
              <X className="h-6 w-6 text-[#16120f]" />
            </button>
          </div>
          <div className="border-b border-[#eadfd6] px-6 py-4 text-sm text-[#625851]">
            <div>{address}</div>
            <div className="mt-1">{phone}</div>
          </div>
          <nav className="flex flex-col px-6 py-8">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-[#eadfd6] py-4 font-playfair text-2xl text-[#16120f]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
