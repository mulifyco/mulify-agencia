'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, ChevronDown, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import { createFAQ, updateFAQ, deleteFAQ } from '../actions'
import type { FAQ } from '@/lib/db-types'

const schema = z.object({
  questionTr: z.string().min(5),
  questionEn: z.string().min(5),
  answerTr: z.string().min(10),
  answerEn: z.string().min(10),
  category: z.string().optional(),
  published: z.boolean(),
})

type FAQForm = z.infer<typeof schema>

function Modal({ item, onClose, onSave }: { item: FAQ | null; onClose: () => void; onSave: (d: FAQForm) => void }) {
  const [tab, setTab] = useState<'tr' | 'en'>('tr')
  const { register, handleSubmit } = useForm<FAQForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      questionTr: item?.questionTr ?? '', questionEn: item?.questionEn ?? '',
      answerTr: item?.answerTr ?? '', answerEn: item?.answerEn ?? '',
      category: item?.category ?? '', published: item?.published ?? true,
    },
  })

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-slate-900">
          <h2 className="font-playfair text-xl font-bold text-white">{item?.id ? 'SSS Düzenle' : 'Yeni SSS'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-4">
          <div><label className="admin-label">Kategori</label><input {...register('category')} className="admin-input" placeholder="Genel, Fiyatlandırma..." /></div>
          <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
            {(['tr', 'en'] as const).map((l) => (
              <button key={l} type="button" onClick={() => setTab(l)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === l ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {tab === 'tr' ? (
            <>
              <div><label className="admin-label">Soru (TR)</label><input {...register('questionTr')} className="admin-input" /></div>
              <div><label className="admin-label">Cevap (TR)</label><textarea {...register('answerTr')} rows={4} className="admin-input resize-none" /></div>
            </>
          ) : (
            <>
              <div><label className="admin-label">Question (EN)</label><input {...register('questionEn')} className="admin-input" /></div>
              <div><label className="admin-label">Answer (EN)</label><textarea {...register('answerEn')} rows={4} className="admin-input resize-none" /></div>
            </>
          )}
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

export default function FAQClient({ initialFAQs }: { initialFAQs: FAQ[] }) {
  const [faqs, setFAQs] = useState(initialFAQs)
  const [modalOpen, setModalOpen] = useState(false)
  const [editFAQ, setEditFAQ] = useState<FAQ | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const handleSave = (data: FAQForm) => {
    if (editFAQ) {
      setFAQs((prev) => prev.map((f) => f.id === editFAQ.id ? { ...f, ...data } : f))
      setModalOpen(false); setEditFAQ(null)
      startTransition(async () => { await updateFAQ(editFAQ.id, data); toast.success('SSS güncellendi') })
    } else {
      startTransition(async () => { await createFAQ(data); toast.success('SSS eklendi') })
      setModalOpen(false)
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    const id = deleteId
    setFAQs((prev) => prev.filter((f) => f.id !== id))
    setDeleteId(null)
    startTransition(async () => { await deleteFAQ(id); toast.success('SSS silindi') })
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Sıkça Sorulan Sorular</h1>
          <p className="text-white/40 text-sm mt-1">{faqs.length} soru</p>
        </div>
        <button onClick={() => { setEditFAQ(null); setModalOpen(true) }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all">
          <Plus className="w-4 h-4" /> Yeni SSS
        </button>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
        {faqs.length === 0 && <div className="text-center py-12 text-white/30">Henüz SSS yok</div>}
        {faqs.map((faq) => (
          <div key={faq.id}>
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/2 transition-colors"
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            >
              <div className="flex-1 min-w-0 pr-4">
                <span className="text-sm font-medium text-white">{faq.questionTr}</span>
                {faq.category && <span className="ml-2 text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{faq.category}</span>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={(e) => { e.stopPropagation(); setEditFAQ(faq); setModalOpen(true) }}
                  className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={(e) => { e.stopPropagation(); setDeleteId(faq.id) }}
                  className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5"><Trash2 className="w-3.5 h-3.5" /></button>
                <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${openId === faq.id ? 'rotate-180' : ''}`} />
              </div>
            </button>
            <AnimatePresence>
              {openId === faq.id && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="px-6 pb-4 text-sm text-white/60 leading-relaxed">{faq.answerTr}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {modalOpen && <Modal item={editFAQ} onClose={() => { setModalOpen(false); setEditFAQ(null) }} onSave={handleSave} />}
      <ConfirmDialog open={!!deleteId} title="SSS'yi sil" description="Bu soru kalıcı olarak silinecek." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
