'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Users, LayoutGrid, Settings } from 'lucide-react'

const tabs = [
  { href: '/remote-control', label: 'Panel', icon: Home },
  { href: '/remote-control/leads', label: 'Leads', icon: Users },
  { href: '/remote-control/content', label: 'İçerik', icon: LayoutGrid },
  { href: '/remote-control/settings', label: 'Ayarlar', icon: Settings },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-slate-950/95 backdrop-blur border-t border-white/5 pb-[env(safe-area-inset-bottom)] flex-shrink-0">
      <div className="flex">
        {tabs.map((tab) => {
          const active = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center gap-1 pt-3 pb-2.5 relative min-h-[56px] select-none"
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#F5A623] rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <motion.div animate={{ scale: active ? 1.1 : 1 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <tab.icon
                  className={`w-[22px] h-[22px] transition-colors duration-150 ${active ? 'text-[#F5A623]' : 'text-white/30'}`}
                  strokeWidth={active ? 2.2 : 1.8}
                />
              </motion.div>
              <span className={`text-[10px] font-medium transition-colors duration-150 ${active ? 'text-[#F5A623]' : 'text-white/30'}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
