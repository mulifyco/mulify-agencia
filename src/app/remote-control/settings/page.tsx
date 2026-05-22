'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  AlertTriangle, Play, Square, RotateCcw, Check, X, ChevronRight,
  Pencil, Phone, Mail, Globe, Cpu, Clock, CheckCircle, XCircle,
} from 'lucide-react'
import SwipeableItem from '@/components/remote/swipeable-item'
import { mockAgents, mockApprovalQueue, type AgentStatus } from '@/lib/admin-mock-data'

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(h / 24)
  if (m < 1) return 'Az önce'
  if (m < 60) return `${m} dk önce`
  if (h < 24) return `${h} sa önce`
  return `${d} gün önce`
}

const STATUS_STYLE: Record<AgentStatus, { dot: string; label: string; pulse: boolean }> = {
  active: { dot: 'bg-green-400', label: 'Aktif', pulse: false },
  running: { dot: 'bg-amber-400', label: 'Çalışıyor', pulse: true },
  idle: { dot: 'bg-white/20', label: 'Bekliyor', pulse: false },
  error: { dot: 'bg-red-400', label: 'Hata', pulse: true },
}

export default function SettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [maintenanceConfirm, setMaintenanceConfirm] = useState(false)
  const [agents, setAgents] = useState(mockAgents)
  const [approvals, setApprovals] = useState(mockApprovalQueue)
  const [siteInfo, setSiteInfo] = useState({ phone: '+90 (212) 000 00 00', email: 'hello@mulify.co' })
  const [editingField, setEditingField] = useState<'phone' | 'email' | null>(null)
  const [editValue, setEditValue] = useState('')
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)
  const [expandedApproval, setExpandedApproval] = useState<string | null>(null)

  const toggleAgent = (id: string) => {
    setAgents((prev) => prev.map((a) => {
      if (a.id !== id) return a
      const next = { ...a, enabled: !a.enabled, status: (!a.enabled ? 'active' : 'idle') as AgentStatus }
      toast.success(`${a.name} ${next.enabled ? 'başlatıldı' : 'durduruldu'}`)
      return next
    }))
  }

  const runAgent = (id: string) => {
    setAgents((prev) => prev.map((a) => a.id === id ? { ...a, status: 'running' as AgentStatus } : a))
    const name = agents.find((a) => a.id === id)?.name
    toast.success(`${name} çalıştırılıyor…`)
    setTimeout(() => {
      setAgents((prev) => prev.map((a) => a.id === id ? { ...a, status: 'active' as AgentStatus, lastRun: new Date().toISOString(), tasksCompleted: a.tasksCompleted + 1 } : a))
      toast.success(`${name} tamamlandı`)
    }, 3000)
  }

  const approveAction = (id: string) => {
    const ap = approvals.find((a) => a.id === id)
    setApprovals((prev) => prev.filter((a) => a.id !== id))
    toast.success(`Onaylandı: ${ap?.title}`)
  }

  const rejectAction = (id: string) => {
    const ap = approvals.find((a) => a.id === id)
    setApprovals((prev) => prev.filter((a) => a.id !== id))
    toast(`Reddedildi: ${ap?.title}`)
  }

  const saveEdit = () => {
    if (editingField) {
      setSiteInfo((prev) => ({ ...prev, [editingField]: editValue }))
      toast.success('Güncellendi')
      setEditingField(null)
    }
  }

  return (
    <div className="h-full overflow-y-auto overscroll-y-contain">
      <div className="px-4 pt-14 pb-8 space-y-6">
        <h1 className="text-2xl font-bold text-white">Ayarlar</h1>

        {/* Site Info */}
        <section>
          <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Site Bilgileri</h2>
          <div className="bg-slate-900 border border-white/5 rounded-2xl divide-y divide-white/5">
            {([
              { key: 'phone' as const, label: 'Telefon', icon: Phone, value: siteInfo.phone },
              { key: 'email' as const, label: 'E-posta', icon: Mail, value: siteInfo.email },
            ]).map(({ key, label, icon: Icon, value }) => (
              <button
                key={key}
                onClick={() => { setEditingField(key); setEditValue(value) }}
                className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-white/3 transition-colors text-left"
              >
                <Icon className="w-4 h-4 text-white/30 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/30 uppercase tracking-wide">{label}</p>
                  <p className="text-sm text-white truncate">{value}</p>
                </div>
                <Pencil className="w-3.5 h-3.5 text-white/20" />
              </button>
            ))}
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3.5 active:bg-white/3 transition-colors">
              <Globe className="w-4 h-4 text-white/30" />
              <div className="flex-1">
                <p className="text-[10px] text-white/30 uppercase tracking-wide">Website</p>
                <p className="text-sm text-white">mulify.co</p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20" />
            </a>
          </div>
        </section>

        {/* Maintenance Mode */}
        <section>
          <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Site Modu</h2>
          <div className={`bg-slate-900 border rounded-2xl p-4 transition-colors ${maintenanceMode ? 'border-amber-500/30' : 'border-white/5'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${maintenanceMode ? 'bg-amber-500/10' : 'bg-white/5'}`}>
                <AlertTriangle className={`w-5 h-5 ${maintenanceMode ? 'text-amber-400' : 'text-white/30'}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Bakım Modu</p>
                <p className="text-xs text-white/40 mt-0.5">{maintenanceMode ? 'Site ziyaretçilere kapalı' : 'Site aktif ve erişilebilir'}</p>
              </div>
              <button
                onClick={() => maintenanceMode ? (setMaintenanceMode(false), toast.success('Bakım modu kapatıldı')) : setMaintenanceConfirm(true)}
                className={`w-12 h-6 rounded-full relative transition-colors ${maintenanceMode ? 'bg-amber-500' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${maintenanceMode ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Approval Queue */}
        {approvals.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
              Onay Kuyruğu
              <span className="ml-2 px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-[10px]">{approvals.length}</span>
            </h2>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {approvals.map((ap) => (
                  <motion.div
                    key={ap.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <SwipeableItem
                      onSwipeRight={() => approveAction(ap.id)}
                      onSwipeLeft={() => rejectAction(ap.id)}
                      rightIcon={<Check className="w-5 h-5 text-white" />}
                      leftIcon={<X className="w-5 h-5 text-white" />}
                      rightBg="bg-green-500"
                      leftBg="bg-red-500"
                    >
                      <div className="bg-slate-900 border border-amber-500/15 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setExpandedApproval(expandedApproval === ap.id ? null : ap.id)}
                          className="w-full p-4 text-left active:bg-white/3 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                              <Cpu className="w-4 h-4 text-amber-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-white/40">{ap.agentName}</p>
                              <p className="text-sm font-semibold text-white leading-snug mt-0.5">{ap.title}</p>
                              <p className="text-xs text-white/40 mt-0.5 line-clamp-1">{ap.description}</p>
                            </div>
                            <ChevronRight className={`w-4 h-4 text-white/20 flex-shrink-0 mt-1 transition-transform ${expandedApproval === ap.id ? 'rotate-90' : ''}`} />
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedApproval === ap.id && (
                            <motion.div
                              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pt-0 border-t border-white/5">
                                <pre className="text-xs text-white/50 bg-white/3 rounded-xl p-3 font-mono whitespace-pre-wrap mt-3 leading-relaxed">{ap.preview}</pre>
                                {ap.lead && (
                                  <div className="mt-3 p-3 bg-white/3 rounded-xl">
                                    <p className="text-xs text-white/40">Lead: <span className="text-white">{ap.lead.name}</span> · {ap.lead.company}</p>
                                    <p className="text-xs text-white/30 mt-0.5">{ap.lead.email}</p>
                                  </div>
                                )}
                                <div className="flex gap-2 mt-3">
                                  <button onClick={() => rejectAction(ap.id)} className="flex-1 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
                                    <XCircle className="w-4 h-4" /> Reddet
                                  </button>
                                  <button onClick={() => approveAction(ap.id)} className="flex-1 py-2.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
                                    <CheckCircle className="w-4 h-4" /> Onayla
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </SwipeableItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* Agent Control Center */}
        <section>
          <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Agent Kontrol Merkezi</h2>
          <div className="space-y-2">
            {agents.map((agent) => {
              const st = STATUS_STYLE[agent.status]
              const isExpanded = expandedAgent === agent.id
              return (
                <div key={agent.id} className={`bg-slate-900 border rounded-2xl overflow-hidden transition-colors ${agent.status === 'error' ? 'border-red-500/20' : agent.status === 'running' ? 'border-amber-500/15' : 'border-white/5'}`}>
                  <button
                    onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                    className="w-full p-4 text-left active:bg-white/3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 relative">
                        <Cpu className="w-4 h-4 text-white/50" />
                        {agent.pendingApprovals > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">{agent.pendingApprovals}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">{agent.name}</p>
                          <div className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${st.pulse ? 'animate-pulse' : ''}`} />
                            <span className={`text-[10px] ${agent.status === 'error' ? 'text-red-400' : agent.status === 'running' ? 'text-amber-400' : agent.status === 'active' ? 'text-green-400' : 'text-white/30'}`}>{st.label}</span>
                          </div>
                        </div>
                        <p className="text-xs text-white/30 mt-0.5 truncate">{agent.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleAgent(agent.id) }}
                          className={`w-10 h-5 rounded-full relative transition-colors ${agent.enabled ? 'bg-green-500' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${agent.enabled ? 'left-[22px]' : 'left-0.5'}`} />
                        </button>
                        <ChevronRight className={`w-4 h-4 text-white/20 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-3">
                          {agent.status === 'error' && (agent as any).error && (
                            <div className="p-3 bg-red-500/5 border border-red-500/15 rounded-xl">
                              <p className="text-xs text-red-400 font-mono">{(agent as any).error}</p>
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-white/3 rounded-xl p-2.5">
                              <p className="text-white/30 flex items-center gap-1"><Clock className="w-3 h-3" /> Son Çalışma</p>
                              <p className="text-white mt-1">{formatRelative(agent.lastRun)}</p>
                            </div>
                            <div className="bg-white/3 rounded-xl p-2.5">
                              <p className="text-white/30">Tamamlanan</p>
                              <p className="text-white mt-1 font-semibold">{agent.tasksCompleted} görev</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setAgents((p) => p.map((a) => a.id === agent.id ? { ...a, enabled: false, status: 'idle' as AgentStatus } : a)); toast.success(`${agent.name} durduruldu`) }}
                              disabled={!agent.enabled}
                              className="flex-1 py-2.5 bg-white/5 border border-white/10 text-white/60 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform disabled:opacity-30"
                            >
                              <Square className="w-3.5 h-3.5" /> Durdur
                            </button>
                            <button
                              onClick={() => runAgent(agent.id)}
                              disabled={agent.status === 'running'}
                              className="flex-1 py-2.5 bg-[#F5A623]/10 border border-[#F5A623]/20 text-[#F5A623] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform disabled:opacity-30"
                            >
                              {agent.status === 'running'
                                ? <><div className="w-3.5 h-3.5 border-2 border-[#F5A623]/30 border-t-[#F5A623] rounded-full animate-spin" /> Çalışıyor</>
                                : <><RotateCcw className="w-3.5 h-3.5" /> Şimdi Çalıştır</>
                              }
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* Maintenance Confirm Dialog */}
      <AnimatePresence>
        {maintenanceConfirm && (
          <motion.div className="fixed inset-0 z-50 flex items-end justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMaintenanceConfirm(false)} />
            <motion.div
              className="relative bg-slate-900 border border-amber-500/20 rounded-3xl p-6 w-full max-w-sm"
              initial={{ y: 100, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 100, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white text-center">Bakım Modunu Aç</h3>
              <p className="text-sm text-white/40 text-center mt-2">Site ziyaretçilere kapalı olacak. Emin misin?</p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setMaintenanceConfirm(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-semibold active:scale-95 transition-transform">İptal</button>
                <button onClick={() => { setMaintenanceMode(true); setMaintenanceConfirm(false); toast.success('Bakım modu aktif') }} className="flex-1 py-3 bg-amber-500 text-[#0A0A0F] rounded-xl text-sm font-bold active:scale-95 transition-transform">Evet, Aç</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Field Sheet */}
      <AnimatePresence>
        {editingField && (
          <motion.div className="fixed inset-0 z-50 flex flex-col justify-end"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingField(null)} />
            <motion.div
              className="relative bg-slate-900 border-t border-white/10 rounded-t-3xl p-5 pb-10"
              initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" />
              <h3 className="text-base font-semibold text-white mb-3">{editingField === 'phone' ? 'Telefon' : 'E-posta'} Güncelle</h3>
              <input
                autoFocus
                type={editingField === 'email' ? 'email' : 'tel'}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="admin-input mb-3"
              />
              <button onClick={saveEdit} className="w-full py-3.5 bg-[#F5A623] text-[#0A0A0F] font-bold rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                <Check className="w-4 h-4" /> Kaydet
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
