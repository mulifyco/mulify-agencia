'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Save, ChevronRight, X, Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import { createPage, updatePage, deletePage } from '../actions'
import type { Page } from '@/lib/db-types'

const schema = z.object({
  slug: z.string().min(1),
  titleTr: z.string().min(2),
  titleEn: z.string().min(2),
  contentTr: z.string(),
  contentEn: z.string(),
  published: z.boolean(),
})

type PageForm = z.infer<typeof schema>

function PageEditor({ page, onClose, onSave }: { page: Page; onClose: () => void; onSave: (data: PageForm) => void }) {
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit } = useForm<PageForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      slug: page.slug, titleTr: page.titleTr, titleEn: page.titleEn,
      contentTr: page.contentTr, contentEn: page.contentEn, published: page.published,
    },
  })

  const onSubmit = async (data: PageForm) => {
    setSaving(true)
    await onSave(data)
    setSaving(false)
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div>
          <h3 className="font-semibold text-white">{page.titleTr}</h3>
          <p className="text-xs text-white/40">/{page.slug}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5"><X className="w-4 h-4" /></button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="admin-label">Başlık (TR)</label><input {...register('titleTr')} className="admin-input" /></div>
          <div><label className="admin-label">Title (EN)</label><input {...register('titleEn')} className="admin-input" /></div>
        </div>
        <div>
          <label className="admin-label">Slug</label>
          <input {...register('slug')} className="admin-input" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="admin-label">İçerik (TR) — Markdown</label>
            <textarea {...register('contentTr')} rows={12} className="admin-input resize-none font-mono text-xs" placeholder="# Başlık&#10;&#10;İçerik buraya..." />
          </div>
          <div>
            <label className="admin-label">Content (EN) — Markdown</label>
            <textarea {...register('contentEn')} rows={12} className="admin-input resize-none font-mono text-xs" placeholder="# Title&#10;&#10;Content here..." />
          </div>
        </div>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" {...register('published')} className="sr-only peer" />
          <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-green-500 transition-all relative">
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
          </div>
          <span className="text-sm text-white/60">Yayınla</span>
        </label>
        <div className="pt-2">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all disabled:opacity-60"
          >
            {saving ? <div className="w-4 h-4 border-2 border-[#0A0A0F]/30 border-t-[#0A0A0F] rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            Kaydet
          </button>
        </div>
      </form>
    </motion.div>
  )
}

function NewPageModal({ onClose, onCreate }: { onClose: () => void; onCreate: (data: PageForm) => void }) {
  const { register, handleSubmit } = useForm<PageForm>({
    resolver: zodResolver(schema),
    defaultValues: { slug: '', titleTr: '', titleEn: '', contentTr: '', contentEn: '', published: true },
  })

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl"
      >
        <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <h2 className="font-playfair text-xl font-bold text-white">Yeni Sayfa</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onCreate)} className="p-6 space-y-4">
          <div><label className="admin-label">Slug</label><input {...register('slug')} className="admin-input" placeholder="hakkimizda" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Başlık (TR)</label><input {...register('titleTr')} className="admin-input" /></div>
            <div><label className="admin-label">Title (EN)</label><input {...register('titleEn')} className="admin-input" /></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium">İptal</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold">Oluştur</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function PagesClient({ initialPages }: { initialPages: Page[] }) {
  const [pages, setPages] = useState(initialPages)
  const [activePage, setActivePage] = useState<Page | null>(null)
  const [newModal, setNewModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const handleSave = async (data: PageForm) => {
    if (!activePage) return
    setPages((prev) => prev.map((p) => p.id === activePage.id ? { ...p, ...data } : p))
    startTransition(async () => {
      try {
        await updatePage(activePage.id, data)
        toast.success('Sayfa güncellendi')
      } catch {
        toast.error('Güncelleme başarısız')
      }
    })
  }

  const handleCreate = (data: PageForm) => {
    setNewModal(false)
    startTransition(async () => {
      try {
        await createPage(data)
        toast.success('Sayfa oluşturuldu')
      } catch {
        toast.error('Oluşturma başarısız')
      }
    })
  }

  const handleDelete = () => {
    if (!deleteId) return
    const id = deleteId
    setPages((prev) => prev.filter((p) => p.id !== id))
    if (activePage?.id === id) setActivePage(null)
    setDeleteId(null)
    startTransition(async () => {
      await deletePage(id)
      toast.success('Sayfa silindi')
    })
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Sayfalar</h1>
          <p className="text-white/40 text-sm mt-1">Statik sayfa içeriklerini düzenleyin</p>
        </div>
        <button onClick={() => setNewModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all">
          <Plus className="w-4 h-4" /> Yeni Sayfa
        </button>
      </div>

      <div className={`grid gap-6 ${activePage ? 'lg:grid-cols-[280px_1fr]' : ''}`}>
        <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-xs font-medium text-white/40 uppercase tracking-wide">Sayfalar</p>
          </div>
          <div className="divide-y divide-white/5">
            {pages.length === 0 && <div className="px-4 py-8 text-center text-white/30 text-sm">Henüz sayfa yok</div>}
            {pages.map((page) => (
              <div key={page.id} className="flex items-center group">
                <button onClick={() => setActivePage(page === activePage ? null : page)}
                  className={`flex-1 flex items-center justify-between px-4 py-3.5 hover:bg-white/3 transition-colors text-left ${activePage?.id === page.id ? 'bg-[#F5A623]/5' : ''}`}
                >
                  <div>
                    <p className={`text-sm font-medium ${activePage?.id === page.id ? 'text-[#F5A623]' : 'text-white'}`}>{page.titleTr}</p>
                    <p className="text-xs text-white/30">/{page.slug}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-colors ${activePage?.id === page.id ? 'text-[#F5A623]' : 'text-white/20'}`} />
                </button>
                <button onClick={() => setDeleteId(page.id)} className="mr-2 p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/5 opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {activePage && (
            <div className="min-h-[600px]">
              <PageEditor page={activePage} onClose={() => setActivePage(null)} onSave={handleSave} />
            </div>
          )}
        </AnimatePresence>

        {!activePage && pages.length > 0 && (
          <div className="hidden lg:flex items-center justify-center bg-slate-900/40 border border-dashed border-white/10 rounded-2xl p-12">
            <p className="text-white/30 text-sm">Düzenlemek için bir sayfa seçin</p>
          </div>
        )}
      </div>

      {newModal && <NewPageModal onClose={() => setNewModal(false)} onCreate={handleCreate} />}
      <ConfirmDialog open={!!deleteId} title="Sayfayı sil" description="Bu sayfa kalıcı olarak silinecek." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
