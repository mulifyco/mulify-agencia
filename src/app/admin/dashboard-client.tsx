'use client'

import { Users2, FolderOpen, Layers, FileText, DollarSign, Star, ArrowRight, Plus } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import Link from 'next/link'
import { motion } from 'framer-motion'
import StatCard from '@/components/admin/shared/stat-card'
import { mockWeeklyTraffic } from '@/lib/admin-mock-data'
import type { getDashboardStats } from './actions'

type Stats = Awaited<ReturnType<typeof getDashboardStats>>

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/15 text-blue-400',
  contacted: 'bg-yellow-500/15 text-yellow-400',
  qualified: 'bg-purple-500/15 text-purple-400',
  proposal: 'bg-orange-500/15 text-orange-400',
  won: 'bg-green-500/15 text-green-400',
  lost: 'bg-red-500/15 text-red-400',
}

const statusLabels: Record<string, string> = {
  new: 'Yeni', contacted: 'İletişimde', qualified: 'Nitelikli',
  proposal: 'Teklif', won: 'Kazanıldı', lost: 'Kaybedildi',
}

const quickActions = [
  { label: 'Yeni Lead', href: '/admin/leads', icon: Users2, color: 'bg-blue-500/10 text-blue-400' },
  { label: 'Yeni Proje', href: '/admin/projects', icon: FolderOpen, color: 'bg-purple-500/10 text-purple-400' },
  { label: 'Yeni Yazı', href: '/admin/blog', icon: FileText, color: 'bg-green-500/10 text-green-400' },
  { label: 'Yeni Hizmet', href: '/admin/services', icon: Layers, color: 'bg-[#F5A623]/10 text-[#F5A623]' },
]

export default function DashboardClient({ stats }: { stats: Stats }) {
  return (
    <div className="space-y-8 max-w-[1400px]">
      <div>
        <h1 className="font-playfair text-2xl font-bold text-white">Merhaba, Admin 👋</h1>
        <p className="text-white/40 text-sm mt-1">İşte bugünkü özet — {new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <StatCard title="Toplam Lead" value={stats.totalLeads} change={stats.newLeads} icon={Users2} iconColor="text-blue-400" iconBg="bg-blue-500/10" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}>
          <StatCard title="Aktif Projeler" value={stats.totalProjects} change={0} icon={FolderOpen} iconColor="text-purple-400" iconBg="bg-purple-500/10" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
          <StatCard title="Blog Yazıları" value={stats.totalPosts} change={0} icon={FileText} iconColor="text-green-400" iconBg="bg-green-500/10" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }}>
          <StatCard title="Yeni Leadler" value={stats.newLeads} change={0} icon={DollarSign} iconColor="text-[#F5A623]" iconBg="bg-[#F5A623]/10" />
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-white">Haftalık Trafik</h3>
              <p className="text-xs text-white/40 mt-0.5">Bu haftanın ziyaretçi ve lead verileri</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#F5A623]" /><span className="text-white/50">Ziyaretçi</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#6C63FF]" /><span className="text-white/50">Lead</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockWeeklyTraffic} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A623" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1C1C28', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#F5A623" strokeWidth={2} fill="url(#colorVisitors)" dot={false} />
              <Area type="monotone" dataKey="leads" stroke="#6C63FF" strokeWidth={2} fill="url(#colorLeads)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          className="bg-slate-900 border border-white/5 rounded-2xl p-6"
        >
          <h3 className="font-semibold text-white mb-5">Hızlı Eylemler</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((qa) => (
              <Link
                key={qa.href}
                href={qa.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 hover:bg-white/6 transition-all group"
              >
                <div className={`w-9 h-9 rounded-xl ${qa.color} flex items-center justify-center`}>
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors text-center leading-tight">{qa.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/40">Lead → Proje Oranı</span>
              <span className="text-sm font-semibold text-[#F5A623]">
                {stats.totalLeads > 0 ? Math.round((stats.totalProjects / stats.totalLeads) * 100) : 0}%
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.totalLeads > 0 ? Math.min((stats.totalProjects / stats.totalLeads) * 100, 100) : 0}%` }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[#F5A623] to-[#FFD166]"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="font-semibold text-white">Son Leadler</h3>
          <Link href="/admin/leads" className="text-xs text-[#F5A623] hover:text-[#FFD166] transition-colors flex items-center gap-1">
            Tümünü Gör <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {stats.recentLeads.length === 0 ? (
          <div className="px-6 py-12 text-center text-white/30 text-sm">Henüz lead yok</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Ad', 'Şirket', 'Hizmet', 'Bütçe', 'Durum', 'Tarih'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{lead.name}</div>
                      <div className="text-xs text-white/40">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 text-white/60">{lead.company ?? '—'}</td>
                    <td className="px-4 py-3 text-white/60">{lead.service ?? '—'}</td>
                    <td className="px-4 py-3 text-white/60 whitespace-nowrap">{lead.budget ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[lead.status] ?? 'bg-white/5 text-white/40'}`}>
                        {statusLabels[lead.status] ?? lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}
