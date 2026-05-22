'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, Mail, Phone, Pencil, Trash2, Download, LayoutGrid, List } from 'lucide-react'
import DataTable from '@/components/admin/shared/data-table'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import { updateLeadStatus, deleteLead } from '../actions'
import type { Lead } from '@/lib/db-types'

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'

const statusConfig: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'Yeni', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  contacted: { label: 'İletişimde', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  qualified: { label: 'Nitelikli', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  proposal: { label: 'Teklif', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  won: { label: 'Kazanıldı', color: 'text-green-400', bg: 'bg-green-500/10' },
  lost: { label: 'Kaybedildi', color: 'text-red-400', bg: 'bg-red-500/10' },
}

const kanbanColumns: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status as LeadStatus] ?? { label: status, color: 'text-white/50', bg: 'bg-white/5' }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}>
      {cfg.label}
    </span>
  )
}

function LeadModal({ lead, onClose }: { lead: Lead | null; onClose: () => void }) {
  if (!lead) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-playfair text-xl font-bold text-white">{lead.name}</h2>
            <p className="text-sm text-white/40">{lead.company}</p>
          </div>
          <StatusBadge status={lead.status} />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: 'E-posta', value: lead.email },
            { label: 'Telefon', value: lead.phone ?? '—' },
            { label: 'Hizmet', value: lead.service ?? '—' },
            { label: 'Bütçe', value: lead.budget ?? '—' },
            { label: 'Kaynak', value: lead.source ?? '—' },
            { label: 'Tarih', value: new Date(lead.createdAt).toLocaleDateString('tr-TR') },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-white/30 uppercase tracking-wide mb-1">{label}</p>
              <p className="text-sm text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <p className="text-xs text-white/30 uppercase tracking-wide mb-2">Mesaj</p>
          <p className="text-sm text-white/70 bg-white/5 rounded-xl p-3 leading-relaxed">{lead.message}</p>
        </div>
        <div className="flex gap-3">
          <a href={`mailto:${lead.email}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all">
            <Mail className="w-4 h-4" /> E-posta Gönder
          </a>
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl text-sm hover:bg-white/10 transition-all">
              <Phone className="w-4 h-4" /> Ara
            </a>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads)
  const [view, setView] = useState<'table' | 'kanban'>('table')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const handleDeleteLead = () => {
    if (!deleteId) return
    const id = deleteId
    setLeads((prev) => prev.filter((l) => l.id !== id))
    setDeleteId(null)
    startTransition(async () => {
      try {
        await deleteLead(id)
        toast.success('Lead silindi')
      } catch {
        toast.error('Silme başarısız')
        setLeads(initialLeads)
      }
    })
  }

  const exportCSV = () => {
    const headers = ['Ad', 'E-posta', 'Telefon', 'Şirket', 'Hizmet', 'Bütçe', 'Durum', 'Tarih']
    const rows = leads.map((l) => [l.name, l.email, l.phone ?? '', l.company ?? '', l.service ?? '', l.budget ?? '', l.status, new Date(l.createdAt).toLocaleDateString('tr-TR')])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'leads.csv'; a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV dışa aktarıldı')
  }

  const handleStatusChange = (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l))
    startTransition(async () => {
      try {
        await updateLeadStatus(id, status)
        toast.success('Durum güncellendi')
      } catch {
        toast.error('Güncelleme başarısız')
      }
    })
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Leads / CRM</h1>
          <p className="text-white/40 text-sm mt-1">{leads.length} kayıt</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex p-1 bg-white/5 rounded-xl">
            <button onClick={() => setView('table')} className={`p-2 rounded-lg transition-all ${view === 'table' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}><List className="w-4 h-4" /></button>
            <button onClick={() => setView('kanban')} className={`p-2 rounded-lg transition-all ${view === 'kanban' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}><LayoutGrid className="w-4 h-4" /></button>
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" /> CSV
          </button>
        </div>
      </div>

      {view === 'table' && (
        <DataTable
          data={leads}
          searchKeys={['name', 'email', 'company', 'service']}
          searchPlaceholder="Ad, e-posta, şirket ara..."
          columns={[
            {
              key: 'name', label: 'Kişi', sortable: true,
              render: (row) => (
                <div className="cursor-pointer" onClick={() => setSelectedLead(row)}>
                  <div className="font-medium text-white hover:text-[#F5A623] transition-colors">{row.name}</div>
                  <div className="text-xs text-white/40">{row.email}</div>
                </div>
              )
            },
            { key: 'company', label: 'Şirket', sortable: true, render: (row) => <span className="text-white/60">{row.company ?? '—'}</span> },
            { key: 'service', label: 'Hizmet', render: (row) => <span className="text-white/60">{row.service ?? '—'}</span> },
            { key: 'budget', label: 'Bütçe', render: (row) => <span className="text-white/60">{row.budget ?? '—'}</span> },
            {
              key: 'status', label: 'Durum',
              render: (row) => (
                <select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value as LeadStatus)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border-none outline-none cursor-pointer ${(statusConfig[row.status as LeadStatus] ?? statusConfig.new).bg} ${(statusConfig[row.status as LeadStatus] ?? statusConfig.new).color}`}
                >
                  {Object.entries(statusConfig).map(([k, v]) => (
                    <option key={k} value={k} className="bg-slate-900 text-white">{v.label}</option>
                  ))}
                </select>
              )
            },
            {
              key: 'createdAt', label: 'Tarih', sortable: true,
              render: (row) => <span className="text-white/40 text-xs">{new Date(row.createdAt).toLocaleDateString('tr-TR')}</span>
            },
          ]}
          actions={(row) => (
            <div className="flex items-center justify-end gap-1">
              <button onClick={() => setSelectedLead(row)} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        />
      )}

      {view === 'kanban' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {kanbanColumns.map((status) => {
            const col = statusConfig[status]
            const colLeads = leads.filter((l) => l.status === status)
            return (
              <div key={status} className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden min-w-[180px]">
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${col.color}`}>{col.label}</span>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${col.bg} ${col.color}`}>{colLeads.length}</span>
                </div>
                <div className="p-2 space-y-2">
                  {colLeads.map((lead) => (
                    <button
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="w-full text-left p-3 bg-white/3 rounded-xl border border-white/5 hover:border-white/10 transition-all"
                    >
                      <p className="text-xs font-medium text-white mb-0.5 truncate">{lead.name}</p>
                      <p className="text-[10px] text-white/40 truncate">{lead.company ?? '—'}</p>
                      <p className="text-[10px] text-[#F5A623]/70 mt-1">{lead.budget ?? '—'}</p>
                    </button>
                  ))}
                  {colLeads.length === 0 && (
                    <p className="text-xs text-white/20 text-center py-4">Boş</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      <ConfirmDialog
        open={!!deleteId}
        title="Lead'i sil"
        description="Bu lead kaydı kalıcı olarak silinecek. Bu işlem geri alınamaz."
        onConfirm={handleDeleteLead}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
