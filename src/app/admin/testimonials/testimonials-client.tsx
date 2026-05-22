'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import { createTestimonial, updateTestimonial, deleteTestimonial, toggleTestimonialPublished } from '../actions'
import type { Testimonial } from '@/lib/db-types'

const schema = z.object({
  nameTr: z.string().min(2),
  nameEn: z.string().min(2),
  roleTr: z.string().optional(),
  roleEn: z.string().optional(),
  company: z.string().optional(),
  contentTr: z.string().min(10),
  contentEn: z.string().min(10),
  rating: z.number().min(1).max(5),
  featured: z.boolean(),
  published: z.boolean(),
})

type TestimonialForm = z.infer<typeof schema>

function Modal({ item, onClose, onSave }: {
  item: Testimonial | null
  onClose: () => void
  onSave: (d: TestimonialForm) => void
}) {
  const { register, handleSubmit, setValue, watch } = useForm<TestimonialForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      nameTr: item?.nameTr ?? '', nameEn: item?.nameEn ?? '',
      roleTr: item?.roleTr ?? '', roleEn: item?.roleEn ?? '',
      company: item?.company ?? '',
      contentTr: item?.contentTr ?? '', contentEn: item?.contentEn ?? '',
      rating: item?.rating ?? 5, featured: item?.featured ?? false, published: item?.published ?? true,
    },
  })
  const rating = watch('rating')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-slate-900">
          <h2 className="font-playfair text-xl font-bold text-white">{item?.id ? 'Yorumu Düzenle' : 'Yeni Yorum'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Ad (TR)</label><input {...register('nameTr')} className="admin-input" /></div>
            <div><label className="admin-label">Name (EN)</label><input {...register('nameEn')} className="admin-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Rol (TR)</label><input {...register('roleTr')} className="admin-input" placeholder="CEO" /></div>
            <div><label className="admin-label">Role (EN)</label><input {...register('roleEn')} className="admin-input" placeholder="CEO" /></div>
          </div>
          <div><label className="admin-label">Şirket</label><input {...register('company')} className="admin-input" /></div>
          <div>
            <label className="admin-label">Yorum (TR)</label>
            <textarea {...register('contentTr')} rows={3} className="admin-input resize-none" />
          </div>
          <div>
            <label className="admin-label">Review (EN)</label>
            <textarea {...register('contentEn')} rows={3} className="admin-input resize-none" />
          </div>
          <div>
            <label className="admin-label">Puan</label>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" onClick={() => setValue('rating', s)}>
                  <Star className={`w-6 h-6 ${s <= rating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-white/20'}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" {...register('featured')} className="sr-only peer" />
              <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-[#F5A623] transition-all relative">
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
              </div>
              <span className="text-sm text-white/60">Öne Çıkan</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" {...register('published')} className="sr-only peer" />
              <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-green-500 transition-all relative">
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
              </div>
              <span className="text-sm text-white/60">Yayınla</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium">İptal</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold">{item?.id ? 'Güncelle' : 'Oluştur'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function TestimonialsClient({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [items, setItems] = useState(initialTestimonials)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Testimonial | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const handleSave = (data: TestimonialForm) => {
    if (editItem) {
      setItems((prev) => prev.map((t) => t.id === editItem.id ? { ...t, ...data } : t))
      setModalOpen(false); setEditItem(null)
      startTransition(async () => { await updateTestimonial(editItem.id, data); toast.success('Yorum güncellendi') })
    } else {
      startTransition(async () => { await createTestimonial(data); toast.success('Yorum eklendi') })
      setModalOpen(false)
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    const id = deleteId
    setItems((prev) => prev.filter((t) => t.id !== id))
    setDeleteId(null)
    startTransition(async () => { await deleteTestimonial(id); toast.success('Yorum silindi') })
  }

  const togglePublish = (id: string) => {
    const item = items.find((t) => t.id === id)
    if (!item) return
    const newVal = !item.published
    setItems((prev) => prev.map((t) => t.id === id ? { ...t, published: newVal } : t))
    startTransition(async () => { await toggleTestimonialPublished(id, newVal); toast.success('Durum güncellendi') })
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Yorumlar / Referanslar</h1>
          <p className="text-white/40 text-sm mt-1">{items.length} yorum</p>
        </div>
        <button onClick={() => { setEditItem(null); setModalOpen(true) }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all">
          <Plus className="w-4 h-4" /> Yeni Yorum
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 && (
          <div className="col-span-3 text-center py-12 text-white/30">Henüz yorum yok</div>
        )}
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-white">{item.nameTr}</div>
                <div className="text-xs text-white/40">{item.roleTr}{item.company ? ` · ${item.company}` : ''}</div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < item.rating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-white/15'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{item.contentTr}</p>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <button onClick={() => togglePublish(item.id)} className={`flex items-center gap-1.5 text-xs ${item.published ? 'text-green-400' : 'text-white/30'}`}>
                {item.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {item.published ? 'Yayında' : 'Taslak'}
              </button>
              <div className="flex gap-1">
                <button onClick={() => { setEditItem(item); setModalOpen(true) }} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteId(item.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && <Modal item={editItem} onClose={() => { setModalOpen(false); setEditItem(null) }} onSave={handleSave} />}
      <ConfirmDialog open={!!deleteId} title="Yorumu sil" description="Bu yorum kalıcı olarak silinecek." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
