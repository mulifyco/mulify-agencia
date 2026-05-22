'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Search, Plus, Phone, Mail, ChevronRight, Archive, Check, X, MessageCircle } from 'lucide-react'
import SwipeableItem from '@/components/remote/swipeable-item'
import PullToRefresh from '@/components/remote/pull-to-refresh'
import { mockLeads, type LeadStatus } from '@/lib/admin-mock-data'

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'Yeni', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  contacted: { label: 'İletişimde', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  qualified: { label: 'Nitelikli', color: 'text-green-400', bg: 'bg-green-400/10' },
  proposal: { label: 'Teklif', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  won: { label: 'Kazanıldı', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  lost: { label: 'Kaybedildi', color: 'text-red-400', bg: 'bg-red-400/10' },
}

const STATUS_ORDER: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']

const TABS: { key: LeadStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'new', label: 'Yeni' },
  { key: 'contacted', label: 'İletişimde' },
  { key: 'qualified', label: 'Nitelikli' },
  { key: 'won', label: 'Kazanıldı' },
]

function formatRelative(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (m < 60) return `${m} dk`
  if (h < 24) return `${h} sa`
  return `${d} gün`
}

export default function LeadsPage() {
  const [leads, setLeads] = useState(mockLeads)
  const [tab, setTab] = useState<LeadStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const filtered = leads.filter((l) => {
    const matchTab = tab === 'all' || l.status === tab
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const advanceStatus = (id: string) => {
    setLeads((prev) => prev.map((l) => {
      if (l.id !== id) return l
      const idx = STATUS_ORDER.indexOf(l.status)
      const next = STATUS_ORDER[Math.min(idx + 1, STATUS_ORDER.length - 1)]
      toast.success(`${l.name} → ${STATUS_CONFIG[next].label}`)
      return { ...l, status: next }
    }))
  }

  const archiveLead = (id: string) => {
    const lead = leads.find((l) => l.id === id)
    setLeads((prev) => prev.filter((l) => l.id !== id))
    toast(`${lead?.name} arşivlendi`, { action: { label: 'Geri Al', onClick: () => setLeads((prev) => [...prev, lead!]) } })
    if (selected === id) setSelected(null)
  }

  const refresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1200))
    toast.success('Leadler güncellendi')
  }, [])

  const lead = leads.find((l) => l.id === selected)

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="px-4 pt-14 pb-3 flex-shrink-0 bg-[#0A0A0F]">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Lead ara…"
              className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#F5A623]/40"
            />
          </div>
          <button onClick={() => setShowForm(true)} className="w-10 h-10 bg-[#F5A623] rounded-xl flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform">
            <Plus className="w-5 h-5 text-[#0A0A0F]" />
          </button>
        </div>

        {/* Status tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map((t) => {
            const count = t.key === 'all' ? leads.length : leads.filter((l) => l.status === t.key).length
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  tab === t.key ? 'bg-[#F5A623] text-[#0A0A0F]' : 'bg-white/5 text-white/50'
                }`}
              >
                {t.label}
                <span className={`text-[10px] ${tab === t.key ? 'text-[#0A0A0F]/60' : 'text-white/25'}`}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Lead list */}
      <PullToRefresh onRefresh={refresh}>
        <div className="px-4 pb-6 space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((l) => (
              <motion.div
                key={l.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 38 }}
              >
                <SwipeableItem
                  onSwipeLeft={() => archiveLead(l.id)}
                  onSwipeRight={() => advanceStatus(l.id)}
                  leftIcon={<Archive className="w-5 h-5 text-white" />}
                  rightIcon={<Check className="w-5 h-5 text-white" />}
                  leftBg="bg-red-500"
                  rightBg="bg-green-500"
                >
                  <button
                    onClick={() => setSelected(selected === l.id ? null : l.id)}
                    className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5A623]/20 to-[#6C63FF]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-[#F5A623]">{l.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white text-sm truncate">{l.name}</p>
                          <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_CONFIG[l.status].bg} ${STATUS_CONFIG[l.status].color}`}>
                            {STATUS_CONFIG[l.status].label}
                          </span>
                        </div>
                        <p className="text-xs text-white/40 mt-0.5 truncate">{l.company} · {l.service}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs text-white/50 font-medium">{l.budget}</span>
                          <span className="text-[10px] text-white/25">{formatRelative(l.createdAt)}</span>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform text-white/20 ${selected === l.id ? 'rotate-90' : ''}`} />
                    </div>

                    {/* Expanded actions */}
                    <AnimatePresence>
                      {selected === l.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-white/5 flex gap-2">
                            <a href={`tel:${l.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-xl text-[#6C63FF] text-xs font-semibold active:scale-95 transition-transform">
                              <Phone className="w-3.5 h-3.5" /> Ara
                            </a>
                            <a href={`mailto:${l.email}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-xl text-[#F5A623] text-xs font-semibold active:scale-95 transition-transform">
                              <Mail className="w-3.5 h-3.5" /> E-posta
                            </a>
                            <a href={`sms:${l.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-xs font-semibold active:scale-95 transition-transform">
                              <MessageCircle className="w-3.5 h-3.5" /> SMS
                            </a>
                          </div>
                          <div className="mt-2 flex gap-2">
                            {STATUS_ORDER.filter((s) => s !== l.status).slice(0, 3).map((s) => (
                              <button
                                key={s}
                                onClick={(e) => { e.stopPropagation(); setLeads((prev) => prev.map((x) => x.id === l.id ? { ...x, status: s } : x)); toast.success(`${l.name} → ${STATUS_CONFIG[s].label}`) }}
                                className={`flex-1 py-2 rounded-xl text-[10px] font-semibold ${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].color} active:scale-95 transition-transform`}
                              >
                                {STATUS_CONFIG[s].label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </SwipeableItem>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/20 text-sm">Lead bulunamadı</p>
            </div>
          )}

          <p className="text-center text-[10px] text-white/15 pt-2">← Arşivle &nbsp;·&nbsp; Sola/Sağa kaydır &nbsp;·&nbsp; İlerlet →</p>
        </div>
      </PullToRefresh>

      {/* Add Lead Sheet */}
      <AnimatePresence>
        {showForm && <AddLeadSheet onClose={() => setShowForm(false)} onAdd={(lead) => { setLeads((prev) => [lead, ...prev]); toast.success(`${lead.name} eklendi`) }} />}
      </AnimatePresence>
    </div>
  )
}

function AddLeadSheet({ onClose, onAdd }: { onClose: () => void; onAdd: (lead: any) => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: 'Web Tasarım', budget: '$5,000-$10,000', message: '' })
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    if (!form.name.trim() || !form.phone.trim()) return toast.error('Ad ve telefon zorunlu')
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    onAdd({ id: Date.now().toString(), ...form, company: '', status: 'new' as LeadStatus, source: 'remote', createdAt: new Date().toISOString() })
    onClose()
  }

  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col justify-end"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-slate-900 border-t border-white/10 rounded-t-3xl p-5 pb-10 max-h-[85dvh] overflow-y-auto"
        initial={{ y: 450 }} animate={{ y: 0 }} exit={{ y: 450 }}
        transition={{ type: 'spring', stiffness: 380, damping: 38 }}
      >
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Yeni Lead</h3>
          <button onClick={onClose} className="text-white/30"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          {[
            { key: 'name', placeholder: 'Ad Soyad *', type: 'text' },
            { key: 'phone', placeholder: 'Telefon *', type: 'tel' },
            { key: 'email', placeholder: 'E-posta', type: 'email' },
          ].map(({ key, placeholder, type }) => (
            <input key={key} type={type} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="admin-input" />
          ))}
          <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="admin-input bg-white/5">
            {['Web Tasarım', 'Web Geliştirme', 'E-Ticaret', 'Dijital Pazarlama', 'Marka Kimliği'].map((s) => (
              <option key={s} className="bg-slate-900">{s}</option>
            ))}
          </select>
          <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="admin-input bg-white/5">
            {['< $2,000', '$2,000-$5,000', '$5,000-$10,000', '$10,000+', 'Görüşülecek'].map((b) => (
              <option key={b} className="bg-slate-900">{b}</option>
            ))}
          </select>
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Not" rows={3} className="admin-input resize-none" />
          <button onClick={submit} disabled={saving} className="w-full py-4 bg-[#F5A623] text-[#0A0A0F] font-bold rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-60 text-base">
            {saving ? <div className="w-5 h-5 border-2 border-[#0A0A0F]/30 border-t-[#0A0A0F] rounded-full animate-spin" /> : <Plus className="w-5 h-5" />}
            Lead Ekle
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
