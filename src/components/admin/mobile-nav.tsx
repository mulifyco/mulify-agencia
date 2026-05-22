'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, FolderOpen, FileText, Settings } from 'lucide-react'

const mobileNav = [
  { href: '/admin', icon: LayoutDashboard, label: 'Panel', exact: true, badge: false },
  { href: '/admin/mesajlar', icon: MessageSquare, label: 'Mesajlar', badge: true },
  { href: '/admin/projects', icon: FolderOpen, label: 'Projeler', badge: false },
  { href: '/admin/blog', icon: FileText, label: 'Blog', badge: false },
  { href: '/admin/settings', icon: Settings, label: 'Ayarlar', badge: false },
]

export default function MobileNav() {
  const pathname = usePathname()
  const [newCount, setNewCount] = useState(0)

  useEffect(() => {
    fetch('/api/admin/leads/count')
      .then(r => r.json())
      .then(d => setNewCount(d.count ?? 0))
      .catch(() => {})
  }, [])

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/5 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNav.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          const showBadge = item.badge && newCount > 0
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                active ? 'text-[#F5A623]' : 'text-white/30 hover:text-white/60'
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {showBadge && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                    {newCount > 9 ? '9+' : newCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#F5A623]" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
