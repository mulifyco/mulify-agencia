'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import { createTeamMember, updateTeamMember, deleteTeamMember } from '../actions'
import type { TeamMember } from '@/lib/db-types'

const schema = z.object({
  nameTr: z.string().min(2),
  nameEn: z.string().min(2),
  roleTr: z.string().min(2),
  roleEn: z.string().min(2),
  bioTr: z.string().optional(),
  bioEn: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  published: z.boolean(),
})

type MemberForm = z.infer<typeof schema>

function Modal({ item, onClose, onSave }: { item: TeamMember | null; onClose: () => void; onSave: (d: MemberForm) => void }) {
  const { register, handleSubmit } = useForm<MemberForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      nameTr: item?.nameTr ?? '', nameEn: item?.nameEn ?? '',
      roleTr: item?.roleTr ?? '', roleEn: item?.roleEn ?? '',
      bioTr: item?.bioTr ?? '', bioEn: item?.bioEn ?? '',
      linkedin: item?.linkedin ?? '', twitter: item?.twitter ?? '', github: item?.github ?? '',
      published: item?.published ?? true,
    },
  })

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-slate-900">
          <h2 className="font-playfair text-xl font-bold text-white">{item?.id ? 'Üye Düzenle' : 'Yeni Ekip Üyesi'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Ad (TR)</label><input {...register('nameTr')} className="admin-input" /></div>
            <div><label className="admin-label">Name (EN)</label><input {...register('nameEn')} className="admin-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Rol (TR)</label><input {...register('roleTr')} className="admin-input" /></div>
            <div><label className="admin-label">Role (EN)</label><input {...register('roleEn')} className="admin-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Biyografi (TR)</label><textarea {...register('bioTr')} rows={3} className="admin-input resize-none" /></div>
            <div><label className="admin-label">Bio (EN)</label><textarea {...register('bioEn')} rows={3} className="admin-input resize-none" /></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="admin-label">LinkedIn URL</label><input {...register('linkedin')} className="admin-input" placeholder="https://linkedin.com/in/..." /></div>
            <div><label className="admin-label">Twitter URL</label><input {...register('twitter')} className="admin-input" placeholder="https://twitter.com/..." /></div>
            <div><label className="admin-label">GitHub URL</label><input {...register('github')} className="admin-input" placeholder="https://github.com/..." /></div>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" {...register('published')} className="sr-only peer" />
            <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-green-500 transition-all relative">
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
            </div>
            <span className="text-sm text-white/60">Yayınla</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium">İptal</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold">{item?.id ? 'Güncelle' : 'Oluştur'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function TeamClient({ initialMembers }: { initialMembers: TeamMember[] }) {
  const [members, setMembers] = useState(initialMembers)
  const [modalOpen, setModalOpen] = useState(false)
  const [editMember, setEditMember] = useState<TeamMember | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const handleSave = (data: MemberForm) => {
    if (editMember) {
      setMembers((prev) => prev.map((m) => m.id === editMember.id ? { ...m, ...data } : m))
      setModalOpen(false); setEditMember(null)
      startTransition(async () => { await updateTeamMember(editMember.id, data); toast.success('Üye güncellendi') })
    } else {
      startTransition(async () => { await createTeamMember(data); toast.success('Üye eklendi') })
      setModalOpen(false)
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    const id = deleteId
    setMembers((prev) => prev.filter((m) => m.id !== id))
    setDeleteId(null)
    startTransition(async () => { await deleteTeamMember(id); toast.success('Üye silindi') })
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Ekip</h1>
          <p className="text-white/40 text-sm mt-1">{members.length} üye</p>
        </div>
        <button onClick={() => { setEditMember(null); setModalOpen(true) }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all">
          <Plus className="w-4 h-4" /> Yeni Üye
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.length === 0 && <div className="col-span-3 text-center py-12 text-white/30">Henüz ekip üyesi yok</div>}
        {members.map((member) => (
          <div key={member.id} className="bg-slate-900 border border-white/5 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623] font-playfair font-bold text-lg">
                {member.nameTr.charAt(0)}
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditMember(member); setModalOpen(true) }} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteId(member.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="font-semibold text-white">{member.nameTr}</div>
            <div className="text-sm text-[#F5A623]/80 mb-2">{member.roleTr}</div>
            {member.bioTr && <p className="text-xs text-white/40 line-clamp-2">{member.bioTr}</p>}
            <div className="flex gap-2 mt-3">
              {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-xs text-white/30 hover:text-white transition-colors">LinkedIn</a>}
              {member.twitter && <a href={member.twitter} target="_blank" rel="noreferrer" className="text-xs text-white/30 hover:text-white transition-colors">Twitter</a>}
              {member.github && <a href={member.github} target="_blank" rel="noreferrer" className="text-xs text-white/30 hover:text-white transition-colors">GitHub</a>}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && <Modal item={editMember} onClose={() => { setModalOpen(false); setEditMember(null) }} onSave={handleSave} />}
      <ConfirmDialog open={!!deleteId} title="Üyeyi sil" description="Bu ekip üyesi kalıcı olarak silinecek." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
