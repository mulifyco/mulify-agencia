'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, Search, ChevronRight, Settings, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { mockAdminUser } from '@/lib/admin-mock-data'
import { AnimatePresence, motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'

const breadcrumbMap: Record<string, string> = {
  admin: 'Dashboard',
  services: 'Hizmetler',
  projects: 'Projeler',
  blog: 'Blog',
  leads: 'Leads / CRM',
  testimonials: 'Yorumlar',
  team: 'Ekip',
  pricing: 'Fiyatlandırma',
  faq: 'SSS',
  settings: 'Ayarlar',
  media: 'Medya',
  pages: 'Sayfalar',
}

const mockNotifications = [
  { id: '1', text: 'Yeni lead: Ahmet Yılmaz — TechStart', time: '5 dk önce', unread: true },
  { id: '2', text: 'Blog yazısı yayınlandı: 2026 Trendleri', time: '1 saat önce', unread: true },
  { id: '3', text: 'Yorum onayı bekliyor: Marcus Weber', time: '3 saat önce', unread: false },
]

export default function Topbar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.map((seg, i) => ({
    label: breadcrumbMap[seg] ?? seg,
    href: '/' + segments.slice(0, i + 1).join('/'),
    isLast: i === segments.length - 1,
  }))

  const unreadCount = mockNotifications.filter((n) => n.unread).length

  return (
    <header className="h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-4 sticky top-0 z-30 flex-shrink-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 flex-1 min-w-0">
        {crumbs.map((crumb) => (
          <div key={crumb.href} className="flex items-center gap-1.5">
            {!crumb.isLast ? (
              <>
                <Link href={crumb.href} className="text-sm text-white/30 hover:text-white/60 transition-colors">
                  {crumb.label}
                </Link>
                <ChevronRight className="w-3 h-3 text-white/20" />
              </>
            ) : (
              <span className="text-sm font-medium text-white">{crumb.label}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Right: Search + Notif + Profile */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-white/30 hover:text-white/60 transition-all text-sm">
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-xs">Ara...</span>
          <span className="hidden sm:inline text-xs text-white/20">⌘K</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false) }}
            className="relative w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F5A623] rounded-full" />
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Bildirimler</span>
                  <span className="text-xs text-[#F5A623]">{unreadCount} yeni</span>
                </div>
                <div className="divide-y divide-white/5">
                  {mockNotifications.map((n) => (
                    <div key={n.id} className={`px-4 py-3 hover:bg-white/3 transition-colors cursor-pointer ${n.unread ? 'bg-[#F5A623]/3' : ''}`}>
                      <div className="flex items-start gap-2">
                        {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-1.5 flex-shrink-0" />}
                        <div className={n.unread ? '' : 'pl-3.5'}>
                          <p className="text-xs text-white/80 leading-relaxed">{n.text}</p>
                          <p className="text-[11px] text-white/30 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-white/5">
                  <button className="text-xs text-[#F5A623] hover:text-[#FFD166] transition-colors">
                    Tümünü gör →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false) }}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-[#F5A623]/20 flex items-center justify-center overflow-hidden">
              <span className="text-[#F5A623] text-xs font-bold">
                {mockAdminUser.name.charAt(0)}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-medium text-white leading-none">{mockAdminUser.name.split(' ')[0]}</div>
              <div className="text-[10px] text-[#F5A623]/60 leading-none mt-0.5">{mockAdminUser.role}</div>
            </div>
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/5">
                  <div className="text-sm font-medium text-white">{mockAdminUser.name}</div>
                  <div className="text-xs text-white/40">{mockAdminUser.email}</div>
                </div>
                <div className="p-2">
                  <Link href="/admin/settings" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
                    <Settings className="w-3.5 h-3.5" /> Hesap Ayarları
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400/80 hover:text-red-400 hover:bg-red-400/5 transition-all w-full">
                    <LogOut className="w-3.5 h-3.5" /> Çıkış Yap
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
