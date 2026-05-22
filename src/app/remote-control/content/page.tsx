'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Eye, EyeOff, Star, StarOff, Check, X, ThumbsUp, ThumbsDown } from 'lucide-react'
import SwipeableItem from '@/components/remote/swipeable-item'
import PullToRefresh from '@/components/remote/pull-to-refresh'
import { mockServices } from '@/lib/mock-data'
import { mockAdminPosts, mockAdminTestimonials } from '@/lib/admin-mock-data'
import { mockProjects } from '@/lib/mock-data'

type Tab = 'services' | 'projects' | 'blog' | 'testimonials'

const TABS: { key: Tab; label: string }[] = [
  { key: 'services', label: 'Hizmetler' },
  { key: 'projects', label: 'Projeler' },
  { key: 'blog', label: 'Blog' },
  { key: 'testimonials', label: 'Yorumlar' },
]

const POST_STATUS_CONFIG = {
  published: { label: 'Yayında', color: 'text-green-400', bg: 'bg-green-400/10' },
  draft: { label: 'Taslak', color: 'text-white/40', bg: 'bg-white/5' },
  scheduled: { label: 'Planlandı', color: 'text-amber-400', bg: 'bg-amber-400/10' },
}

export default function ContentPage() {
  const [tab, setTab] = useState<Tab>('services')
  const [services, setServices] = useState(mockServices)
  const [projects, setProjects] = useState(mockProjects)
  const [posts, setPosts] = useState(mockAdminPosts)
  const [testimonials, setTestimonials] = useState(mockAdminTestimonials)

  const refresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('İçerik güncellendi')
  }, [])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-14 pb-3 flex-shrink-0 bg-[#0A0A0F]">
        <h1 className="text-2xl font-bold text-white mb-4">İçerik</h1>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                tab === t.key ? 'bg-[#F5A623] text-[#0A0A0F]' : 'bg-white/5 text-white/50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <PullToRefresh onRefresh={refresh}>
        <div className="px-4 pb-6 space-y-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {/* SERVICES */}
              {tab === 'services' && (
                <div className="space-y-2">
                  <p className="text-xs text-white/30 mb-3">Kaydırarak sil · Tek tıkla yayın durumunu değiştir</p>
                  {services.map((s) => (
                    <SwipeableItem
                      key={s.id}
                      onSwipeLeft={() => { setServices((p) => p.filter((x) => x.id !== s.id)); toast.success(`${s.titleTr} silindi`) }}
                      leftIcon={<X className="w-5 h-5 text-white" />}
                      leftBg="bg-red-500"
                    >
                      <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: `${s.color}18` }}>
                          {s.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{s.titleTr}</p>
                          <p className="text-xs text-white/30 truncate">{s.titleEn}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.featured ? 'bg-[#F5A623]/15 text-[#F5A623]' : 'bg-white/5 text-white/30'}`}>
                            {s.featured ? 'Öne Çıkan' : '—'}
                          </span>
                          <button
                            onClick={() => { setServices((p) => p.map((x) => x.id === s.id ? { ...x, published: !x.published } : x)); toast.success(`${s.titleTr} ${s.published ? 'gizlendi' : 'yayınlandı'}`) }}
                            className={`w-9 h-5 rounded-full relative transition-colors ${s.published ? 'bg-green-500' : 'bg-white/10'}`}
                          >
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${s.published ? 'left-[18px]' : 'left-0.5'}`} />
                          </button>
                        </div>
                      </div>
                    </SwipeableItem>
                  ))}
                </div>
              )}

              {/* PROJECTS */}
              {tab === 'projects' && (
                <div className="space-y-2">
                  <p className="text-xs text-white/30 mb-3">Yıldıza tıkla: öne çıkar · Kaydır: sil</p>
                  {projects.map((p) => (
                    <SwipeableItem
                      key={p.id}
                      onSwipeLeft={() => { setProjects((pr) => pr.filter((x) => x.id !== p.id)); toast.success(`${p.titleTr} silindi`) }}
                      leftIcon={<X className="w-5 h-5 text-white" />}
                      leftBg="bg-red-500"
                    >
                      <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden flex-shrink-0">
                          <img src={`${p.image}&w=48`} alt={p.titleTr} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{p.titleTr}</p>
                          <p className="text-xs text-white/30">{p.client} · {p.category}</p>
                        </div>
                        <button
                          onClick={() => { setProjects((pr) => pr.map((x) => x.id === p.id ? { ...x, featured: !x.featured } : x)); toast.success(p.featured ? 'Öne çıkarma kaldırıldı' : 'Öne çıkarıldı') }}
                          className="flex-shrink-0 p-2 active:scale-90 transition-transform"
                        >
                          {p.featured
                            ? <Star className="w-5 h-5 text-[#F5A623] fill-[#F5A623]" />
                            : <Star className="w-5 h-5 text-white/20" />
                          }
                        </button>
                      </div>
                    </SwipeableItem>
                  ))}
                </div>
              )}

              {/* BLOG */}
              {tab === 'blog' && (
                <div className="space-y-2">
                  <p className="text-xs text-white/30 mb-3">Durumu değiştirmek için rozete tıkla</p>
                  {posts.map((p) => {
                    const cfg = POST_STATUS_CONFIG[p.status]
                    const nextStatus = p.status === 'published' ? 'draft' : 'published'
                    return (
                      <SwipeableItem
                        key={p.id}
                        onSwipeLeft={() => { setPosts((pr) => pr.filter((x) => x.id !== p.id)); toast.success('Yazı silindi') }}
                        leftIcon={<X className="w-5 h-5 text-white" />}
                        leftBg="bg-red-500"
                        onSwipeRight={() => { setPosts((pr) => pr.map((x) => x.id === p.id ? { ...x, status: nextStatus as any } : x)); toast.success(`Yayın durumu: ${nextStatus === 'published' ? 'Yayında' : 'Taslak'}`) }}
                        rightIcon={nextStatus === 'published' ? <Eye className="w-5 h-5 text-white" /> : <EyeOff className="w-5 h-5 text-white" />}
                        rightBg={nextStatus === 'published' ? 'bg-green-500' : 'bg-slate-600'}
                      >
                        <div className="bg-slate-900 border border-white/5 rounded-2xl p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white leading-snug">{p.titleTr}</p>
                              <p className="text-xs text-white/30 mt-0.5 truncate">{p.titleEn}</p>
                            </div>
                            <button
                              onClick={() => { setPosts((pr) => pr.map((x) => x.id === p.id ? { ...x, status: nextStatus as any } : x)); toast.success(`${nextStatus === 'published' ? 'Yayınlandı' : 'Taslağa alındı'}`) }}
                              className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.color} active:scale-95 transition-transform`}
                            >
                              {cfg.label}
                            </button>
                          </div>
                          <div className="flex gap-1.5 mt-2.5 flex-wrap">
                            {p.tags.map((tag) => (
                              <span key={tag} className="px-2 py-0.5 bg-white/5 rounded-full text-[10px] text-white/40">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </SwipeableItem>
                    )
                  })}
                </div>
              )}

              {/* TESTIMONIALS */}
              {tab === 'testimonials' && (
                <div className="space-y-2">
                  <p className="text-xs text-white/30 mb-3">→ Onayla &nbsp;·&nbsp; ← Reddet</p>
                  {testimonials.map((t) => (
                    <SwipeableItem
                      key={t.id}
                      onSwipeRight={() => { setTestimonials((p) => p.map((x) => x.id === t.id ? { ...x, published: true } : x)); toast.success(`${t.name} onaylandı`) }}
                      onSwipeLeft={() => { setTestimonials((p) => p.map((x) => x.id === t.id ? { ...x, published: false } : x)); toast.success(`${t.name} reddedildi`) }}
                      rightIcon={<ThumbsUp className="w-5 h-5 text-white" />}
                      leftIcon={<ThumbsDown className="w-5 h-5 text-white" />}
                      rightBg="bg-green-500"
                      leftBg="bg-red-500"
                    >
                      <div className={`bg-slate-900 border rounded-2xl p-4 transition-colors ${t.published ? 'border-green-500/20' : 'border-white/5'}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5A623]/20 to-[#6C63FF]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-[#F5A623]">{t.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                              <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${t.published ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'}`}>
                                {t.published ? 'Onaylı' : 'Bekliyor'}
                              </span>
                            </div>
                            <p className="text-xs text-white/40">{t.role} · {t.company}</p>
                          </div>
                        </div>
                        <p className="text-xs text-white/60 mt-2.5 leading-relaxed line-clamp-2">"{t.content}"</p>
                        <div className="flex items-center justify-between mt-2.5">
                          <span className="text-[10px] text-[#F5A623] font-semibold">{t.metric}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setTestimonials((p) => p.map((x) => x.id === t.id ? { ...x, published: false } : x)); toast.success('Reddedildi') }}
                              className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center active:scale-90 transition-transform"
                            >
                              <X className="w-3.5 h-3.5 text-red-400" />
                            </button>
                            <button
                              onClick={() => { setTestimonials((p) => p.map((x) => x.id === t.id ? { ...x, published: true } : x)); toast.success('Onaylandı') }}
                              className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center active:scale-90 transition-transform"
                            >
                              <Check className="w-3.5 h-3.5 text-green-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwipeableItem>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </PullToRefresh>
    </div>
  )
}
