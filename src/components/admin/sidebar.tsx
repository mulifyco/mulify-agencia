'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Layers, FolderOpen, FileText, Users2, Star,
  UserCircle, DollarSign, HelpCircle, Settings, Image as ImageIcon,
  ChevronLeft, ChevronRight, File, LogOut, MessageSquare,
} from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { BRAND_LOGO_URL, BRAND_NAME } from '@/lib/brand'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { href: '/admin/mesajlar', icon: MessageSquare, label: 'Mesajlar', badge: true },
  { href: '/admin/services', icon: Layers, label: 'Hizmetler' },
  { href: '/admin/projects', icon: FolderOpen, label: 'Projeler' },
  { href: '/admin/blog', icon: FileText, label: 'Blog' },
  { href: '/admin/leads', icon: Users2, label: 'Leads / CRM' },
  { href: '/admin/testimonials', icon: Star, label: 'Yorumlar' },
  { href: '/admin/team', icon: UserCircle, label: 'Ekip' },
  { href: '/admin/pricing', icon: DollarSign, label: 'Fiyatlandırma' },
  { href: '/admin/faq', icon: HelpCircle, label: 'SSS' },
  { href: '/admin/pages', icon: File, label: 'Sayfalar' },
  { href: '/admin/media', icon: ImageIcon, label: 'Medya Kütüphanesi' },
  { href: '/admin/settings', icon: Settings, label: 'Ayarlar' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [newCount, setNewCount] = useState(0)

  useEffect(() => {
    fetch('/api/admin/leads/count')
      .then(r => r.json())
      .then(d => setNewCount(d.count ?? 0))
      .catch(() => {})

    const timer = setInterval(() => {
      fetch('/api/admin/leads/count')
        .then(r => r.json())
        .then(d => setNewCount(d.count ?? 0))
        .catch(() => {})
    }, 60_000)

    return () => clearInterval(timer)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex flex-col bg-slate-950 border-r border-white/5 h-screen sticky top-0 overflow-hidden flex-shrink-0 z-40"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/5 flex-shrink-0">
        <div className="relative w-8 h-8 flex-shrink-0">
          <div className="absolute inset-0 bg-[#F5A623] rounded-lg rotate-45" />
          <div className="absolute inset-[2px] bg-slate-950 rounded-md rotate-45" />
          <img
            src={BRAND_LOGO_URL}
            alt={`${BRAND_NAME} logo`}
            className="absolute inset-[6px] z-10 m-auto h-[calc(100%-12px)] w-[calc(100%-12px)] object-contain"
          />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="ml-3 font-playfair font-bold text-white text-lg whitespace-nowrap"
            >
              {BRAND_NAME}
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className="ml-auto w-6 h-6 rounded-md flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all flex-shrink-0"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact)
          const showBadge = item.badge && newCount > 0

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                active
                  ? 'bg-[#F5A623]/10 text-[#F5A623]'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-[#F5A623]/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <div className="relative flex-shrink-0 z-10">
                <item.icon style={{ width: 18, height: 18 }} className={active ? 'text-[#F5A623]' : ''} />
                {showBadge && collapsed && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                    {newCount > 9 ? '9+' : newCount}
                  </span>
                )}
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="text-sm font-medium whitespace-nowrap relative z-10 flex-1"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!collapsed && showBadge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative z-10 flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                >
                  {newCount > 9 ? '9+' : newCount}
                </motion.span>
              )}
              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {item.label}
                  {showBadge && ` (${newCount})`}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4 border-t border-white/5 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
          title={collapsed ? 'Çıkış' : undefined}
        >
          <LogOut style={{ width: 18, height: 18 }} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Çıkış Yap
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  )
}
