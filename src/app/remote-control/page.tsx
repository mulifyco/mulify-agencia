'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, FileText, ExternalLink, Bell, Wifi, Database, Cpu, Server, X, Check, ChevronRight } from 'lucide-react'
import { mockRemoteNotifications, mockAgents } from '@/lib/admin-mock-data'

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  if (m < 1) return 'Az önce'
  if (m < 60) return `${m} dk`
  if (h < 24) return `${h} sa`
  return `${Math.floor(h / 24)} gün`
}

const COLOR_MAP: Record<string, string> = {
  green: 'bg-green-400',
  amber: 'bg-amber-400',
  blue: 'bg-blue-400',
  orange: 'bg-orange-400',
  purple: 'bg-purple-400',
}

const TODAY_STATS = [
  { label: 'Yeni Lead', value: 3, delta: '+2', positive: true },
  { label: 'Sayfa Görüntüleme', value: 847, delta: '+12%', positive: true },
  { label: 'Aktif Proje', value: 5, delta: '—', positive: null },
]

export default function DashboardPage() {
  const [notifs, setNotifs] = useState(mockRemoteNotifications)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showNote, setShowNote] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [note, setNote] = useState('')
  const shakeRef = useRef({ x: 0, y: 0, z: 0, last: 0 })

  // PWA install prompt
  useEffect(() => {
    const handler = (e: Event) => { e.preventDefault(); setInstallPrompt(e) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  // Shake to refresh
  useEffect(() => {
    const handleMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity
      if (!a) return
      const now = Date.now()
      const { x, y, z, last } = shakeRef.current
      const delta = Math.abs((a.x ?? 0) - x) + Math.abs((a.y ?? 0) - y) + Math.abs((a.z ?? 0) - z)
      if (delta > 35 && now - last > 1500) {
        shakeRef.current.last = now
        toast.success('Veriler yenileniyor…')
      }
      shakeRef.current = { x: a.x ?? 0, y: a.y ?? 0, z: a.z ?? 0, last: shakeRef.current.last }
    }
    window.addEventListener('devicemotion', handleMotion)
    return () => window.removeEventListener('devicemotion', handleMotion)
  }, [])

  // Simulate live notification
  useEffect(() => {
    const t = setTimeout(() => {
      const live = { id: `live-${Date.now()}`, type: 'lead', title: 'Yeni Lead: Emma Müller', message: 'E-Ticaret · Hamburg GmbH · €8K+', time: new Date().toISOString(), read: false, color: 'green' }
      setNotifs((prev) => [live, ...prev.slice(0, 6)])
      toast('Yeni lead geldi! 🔔', { description: 'Emma Müller — E-Ticaret' })
    }, 18000)
    return () => clearTimeout(t)
  }, [])

  const activeAgents = mockAgents.filter((a) => a.enabled && a.status !== 'error').length

  return (
    <div className="h-full overflow-y-auto overscroll-y-contain">
      <div className="px-4 pt-14 pb-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-white/40 text-sm">Günaydın 👋</p>
            <h1 className="text-2xl font-bold text-white mt-0.5">
              {new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h1>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#F5A623]" />
            </div>
            {notifs.filter((n) => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                {notifs.filter((n) => !n.read).length}
              </span>
            )}
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {TODAY_STATS.map((s) => (
            <div key={s.label} className="bg-slate-900 border border-white/5 rounded-2xl p-3">
              <p className="text-[10px] text-white/40 uppercase tracking-wide mb-1">{s.label}</p>
              <p className="text-xl font-bold text-white">{s.value.toLocaleString('tr-TR')}</p>
              {s.delta !== '—' && (
                <p className={`text-[10px] mt-0.5 font-medium ${s.positive ? 'text-green-400' : 'text-red-400'}`}>{s.delta}</p>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => setShowLeadForm(true)}
            className="flex flex-col items-center gap-2 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-2xl py-4 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/20 flex items-center justify-center">
              <Plus className="w-5 h-5 text-[#6C63FF]" />
            </div>
            <span className="text-xs font-medium text-white">Lead Ekle</span>
          </button>
          <button
            onClick={() => setShowNote(true)}
            className="flex flex-col items-center gap-2 bg-slate-900 border border-white/5 rounded-2xl py-4 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white/60" />
            </div>
            <span className="text-xs font-medium text-white">Hızlı Not</span>
          </button>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-2 bg-[#F5A623]/5 border border-[#F5A623]/15 rounded-2xl py-4 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-[#F5A623]" />
            </div>
            <span className="text-xs font-medium text-white">Siteyi Gör</span>
          </a>
        </div>

        {/* Notification Feed */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Canlı Akış</h2>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {notifs.slice(0, 5).map((n) => (
                <motion.button
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  onClick={() => setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-2xl border text-left active:scale-[0.98] transition-transform ${n.read ? 'bg-slate-900/50 border-white/5' : 'bg-slate-900 border-white/8'}`}
                >
                  <div className="mt-1 flex-shrink-0">
                    <span className={`block w-2 h-2 rounded-full ${COLOR_MAP[n.color] ?? 'bg-white/20'} ${!n.read ? 'shadow-[0_0_6px_currentColor]' : ''}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${n.read ? 'text-white/50' : 'text-white'}`}>{n.title}</p>
                    <p className="text-xs text-white/30 mt-0.5 truncate">{n.message}</p>
                  </div>
                  <span className="text-[10px] text-white/25 flex-shrink-0 mt-0.5">{formatRelative(n.time)}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* System Status */}
        <div>
          <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Sistem Durumu</h2>
          <div className="bg-slate-900 border border-white/5 rounded-2xl divide-y divide-white/5">
            {[
              { label: 'Website', icon: Wifi, status: 'Online', ok: true },
              { label: 'Database', icon: Database, status: 'Connected', ok: true },
              { label: 'API', icon: Server, status: 'Operational', ok: true },
              { label: 'Agents', icon: Cpu, status: `${activeAgents}/5 Aktif`, ok: activeAgents >= 4 },
            ].map(({ label, icon: Icon, status, ok }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3">
                <Icon className="w-4 h-4 text-white/30" />
                <span className="flex-1 text-sm text-white">{label}</span>
                <span className={`text-xs font-medium ${ok ? 'text-green-400' : 'text-amber-400'}`}>{status}</span>
                <span className={`w-2 h-2 rounded-full ${ok ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* PWA Install Banner */}
        {installPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#F5A623]">Ana Ekrana Ekle</p>
              <p className="text-xs text-white/40 mt-0.5">Mulify Remote'u uygulama olarak yükle</p>
            </div>
            <button
              onClick={async () => {
                installPrompt.prompt()
                await installPrompt.userChoice
                setInstallPrompt(null)
              }}
              className="px-3 py-2 bg-[#F5A623] text-[#0A0A0F] text-xs font-bold rounded-xl"
            >
              Yükle
            </button>
            <button onClick={() => setInstallPrompt(null)} className="text-white/30">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Quick Lead Form — Bottom Sheet */}
      <AnimatePresence>
        {showLeadForm && <QuickLeadForm onClose={() => setShowLeadForm(false)} />}
      </AnimatePresence>

      {/* Quick Note Sheet */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col justify-end"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNote(false)} />
            <motion.div
              className="relative bg-slate-900 border-t border-white/10 rounded-t-3xl p-6 pb-10"
              initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" />
              <h3 className="text-lg font-semibold text-white mb-3">Hızlı Not</h3>
              <textarea
                autoFocus
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm resize-none focus:outline-none focus:border-[#F5A623]/40 placeholder:text-white/25"
                placeholder="Notu buraya yaz…"
              />
              <button
                onClick={() => { toast.success('Not kaydedildi'); setNote(''); setShowNote(false) }}
                className="mt-3 w-full py-3 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Kaydet
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function QuickLeadForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', service: 'Web Tasarım', budget: '$5,000-$10,000', note: '' })
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    if (!form.name || !form.phone) return toast.error('Ad ve telefon zorunlu')
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    setSaving(false)
    toast.success(`${form.name} eklendi`)
    onClose()
  }

  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col justify-end"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-slate-900 border-t border-white/10 rounded-t-3xl p-5 pb-10 max-h-[80dvh] overflow-y-auto"
        initial={{ y: 400 }} animate={{ y: 0 }} exit={{ y: 400 }}
        transition={{ type: 'spring', stiffness: 380, damping: 38 }}
      >
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Hızlı Lead</h3>
          <button onClick={onClose} className="text-white/30"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ad Soyad *" className="admin-input" />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Telefon *" type="tel" className="admin-input" />
          <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="admin-input bg-white/5">
            {['Web Tasarım', 'Web Geliştirme', 'E-Ticaret', 'Dijital Pazarlama', 'Marka Kimliği'].map((s) => (
              <option key={s} value={s} className="bg-slate-900">{s}</option>
            ))}
          </select>
          <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="admin-input bg-white/5">
            {['< $2,000', '$2,000-$5,000', '$5,000-$10,000', '$10,000+', 'Görüşülecek'].map((b) => (
              <option key={b} value={b} className="bg-slate-900">{b}</option>
            ))}
          </select>
          <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Not (isteğe bağlı)" rows={3} className="admin-input resize-none" />
          <button onClick={submit} disabled={saving} className="w-full py-3.5 bg-[#F5A623] text-[#0A0A0F] font-bold rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-60">
            {saving ? <div className="w-4 h-4 border-2 border-[#0A0A0F]/30 border-t-[#0A0A0F] rounded-full animate-spin" /> : <Plus className="w-4 h-4" />}
            Lead Kaydet
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
