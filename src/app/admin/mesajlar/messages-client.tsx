'use client'

import { useState, useTransition, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  Mail, Phone, ChevronDown, ChevronUp, Trash2, Download,
  RefreshCw, Clock, CheckCircle2, MessageSquare, Filter,
} from 'lucide-react'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import { updateLeadStatus } from '../actions'
import type { Lead } from '@/lib/db-types'

type MsgStatus = 'new' | 'incelendi' | 'yanitlandi'

const STATUS: Record<MsgStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  new: { label: 'Yeni', color: 'text-red-400', bg: 'bg-red-500/10', icon: Clock },
  incelendi: { label: 'İncelendi', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: CheckCircle2 },
  yanitlandi: { label: 'Yanıtlandı', color: 'text-green-400', bg: 'bg-green-500/10', icon: MessageSquare },
}

function Badge({ status }: { status: string }) {
  const cfg = STATUS[status as MsgStatus] ?? STATUS.new
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  )
}

function ServiceTag({ service }: { service?: string | null }) {
  if (!service) return null
  return (
    <span className="px-2 py-0.5 bg-white/5 border border-white/8 text-white/40 text-[11px] rounded-full">
      {service}
    </span>
  )
}

export default function MessagesClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads)
  const [filter, setFilter] = useState<'all' | MsgStatus>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [, startTransition] = useTransition()
  const [refreshing, setRefreshing] = useState(false)

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)
  const counts = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    incelendi: leads.filter(l => l.status === 'incelendi').length,
    yanitlandi: leads.filter(l => l.status === 'yanitlandi').length,
  }

  const refresh = useCallback(async () => {
    setRefreshing(true)
    try {
      const res = await fetch('/api/admin/leads')
      if (res.ok) {
        const data = await res.json()
        setLeads(data)
      }
    } finally {
      setRefreshing(false)
    }
  }, [])

  // Poll for new messages every 30 seconds
  useEffect(() => {
    const id = setInterval(refresh, 30_000)
    return () => clearInterval(id)
  }, [refresh])

  const handleStatus = (id: string, status: MsgStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    startTransition(async () => {
      try {
        await updateLeadStatus(id, status)
        toast.success('Durum güncellendi')
      } catch {
        toast.error('Güncelleme başarısız')
      }
    })
  }

  const handleDelete = () => {
    if (!deleteId) return
    const id = deleteId
    setLeads(prev => prev.filter(l => l.id !== id))
    setDeleteId(null)
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error ?? `HTTP ${res.status}`)
        }
        toast.success('Mesaj silindi')
      } catch (err: any) {
        toast.error(`Silme başarısız: ${err.message}`)
        setLeads(prev => [...prev])
      }
    })
  }

  const exportCSV = () => {
    const headers = ['Ad Soyad', 'E-posta', 'Telefon', 'Şirket', 'Hizmet', 'Bütçe', 'Mesaj', 'Durum', 'Tarih']
    const rows = leads.map(l => [
      l.name, l.email, l.phone ?? '', l.company ?? '', l.service ?? '',
      l.budget ?? '', `"${l.message.replace(/"/g, '""')}"`,
      l.status, new Date(l.createdAt).toLocaleDateString('tr-TR'),
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `mesajlar-${new Date().toISOString().slice(0, 10)}.csv`; a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV dışa aktarıldı')
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Mesajlar</h1>
          <p className="text-white/40 text-sm mt-1">İletişim formu başvuruları</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm rounded-xl hover:bg-white/8 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Yenile
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm rounded-xl hover:bg-white/8 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            CSV
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {([
          ['all', 'Tümü'],
          ['new', 'Yeni'],
          ['incelendi', 'İncelendi'],
          ['yanitlandi', 'Yanıtlandı'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
              filter === key
                ? 'bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/25'
                : 'bg-white/5 text-white/40 border border-white/8 hover:text-white/70 hover:bg-white/8'
            }`}
          >
            <Filter className="w-3 h-3" />
            {label}
            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
              filter === key ? 'bg-[#F5A623]/20 text-[#F5A623]' : 'bg-white/8 text-white/30'
            }`}>
              {key === 'all' ? counts.all : counts[key as MsgStatus]}
            </span>
          </button>
        ))}
      </div>

      {/* Message list */}
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-16 text-white/25 text-sm"
            >
              Bu filtrede mesaj bulunmuyor.
            </motion.div>
          )}
          {filtered.map((lead, i) => {
            const isExpanded = expandedId === lead.id
            const isNew = lead.status === 'new'
            return (
              <motion.div
                key={lead.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isNew
                    ? 'border-red-500/20 shadow-[0_0_0_1px_rgba(239,68,68,0.1)]'
                    : 'border-white/6 hover:border-white/10'
                }`}
              >
                {/* Row header */}
                <button
                  onClick={() => {
                    setExpandedId(isExpanded ? null : lead.id)
                    if (isNew) handleStatus(lead.id, 'incelendi')
                  }}
                  className="w-full text-left px-5 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                        isNew ? 'bg-red-500/15 text-red-400' : 'bg-white/6 text-white/50'
                      }`}>
                        {lead.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="font-semibold text-white text-sm">{lead.name}</span>
                          {isNew && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse flex-shrink-0" />}
                          <ServiceTag service={lead.service} />
                        </div>
                        <div className="flex items-center gap-3 text-xs text-white/35">
                          <span>{lead.email}</span>
                          {lead.phone && <span>· {lead.phone}</span>}
                          {lead.company && <span>· {lead.company}</span>}
                        </div>
                        {!isExpanded && (
                          <p className="text-xs text-white/30 mt-1 truncate max-w-lg">{lead.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="hidden sm:flex flex-col items-end gap-1">
                        <Badge status={lead.status} />
                        <span className="text-[11px] text-white/25">
                          {new Date(lead.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/6 px-5 py-5 space-y-5">
                        {/* Details grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { label: 'E-posta', value: lead.email },
                            { label: 'Telefon', value: lead.phone ?? '—' },
                            { label: 'Hizmet', value: lead.service ?? '—' },
                            { label: 'Bütçe', value: lead.budget ?? '—' },
                          ].map(({ label, value }) => (
                            <div key={label} className="bg-white/3 rounded-xl p-3">
                              <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">{label}</p>
                              <p className="text-sm text-white/70 break-all">{value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Message */}
                        <div className="bg-white/3 rounded-xl p-4">
                          <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Mesaj</p>
                          <p className="text-sm text-white/65 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={`mailto:${lead.email}?subject=Re%3A%20İletişim%20Formu%20-%20${encodeURIComponent(lead.name)}&body=Merhaba%20${encodeURIComponent(lead.name.split(' ')[0])}%2C%0A%0A`}
                            onClick={() => handleStatus(lead.id, 'yanitlandi')}
                            className="flex items-center gap-2 px-4 py-2 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all"
                          >
                            <Mail className="w-4 h-4" /> Yanıtla
                          </a>
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-2 px-4 py-2 bg-white/6 border border-white/10 text-white rounded-xl text-sm hover:bg-white/10 transition-all"
                            >
                              <Phone className="w-4 h-4" /> Ara
                            </a>
                          )}

                          {/* Status change */}
                          <div className="flex items-center gap-1.5 ml-auto">
                            <span className="text-xs text-white/25 mr-1">Durum:</span>
                            {(Object.entries(STATUS) as [MsgStatus, typeof STATUS[MsgStatus]][]).map(([key, cfg]) => (
                              <button
                                key={key}
                                onClick={() => handleStatus(lead.id, key)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                  lead.status === key
                                    ? `${cfg.bg} ${cfg.color} border border-current/20`
                                    : 'bg-white/4 text-white/30 border border-white/6 hover:bg-white/8 hover:text-white/60'
                                }`}
                              >
                                {cfg.label}
                              </button>
                            ))}

                            <button
                              onClick={() => setDeleteId(lead.id)}
                              className="ml-2 p-2 rounded-xl text-white/25 hover:text-red-400 hover:bg-red-400/6 transition-all border border-transparent hover:border-red-400/15"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Mesajı sil"
        description="Bu mesaj kalıcı olarak silinecek. Bu işlem geri alınamaz."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
