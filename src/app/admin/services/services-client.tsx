'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff, X } from 'lucide-react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import { createService, updateService, deleteService, reorderServices, toggleServicePublished } from '../actions'
import type { Service } from '@/lib/db-types'

const serviceSchema = z.object({
  slug: z.string().min(2),
  titleTr: z.string().min(2),
  titleEn: z.string().min(2),
  descTr: z.string().min(10),
  descEn: z.string().min(10),
  icon: z.string().optional(),
  featured: z.boolean(),
  published: z.boolean(),
})

type ServiceForm = z.infer<typeof serviceSchema>

function SortableRow({ service, onEdit, onDelete, onToggle }: {
  service: Service
  onEdit: () => void
  onDelete: () => void
  onToggle: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: service.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <tr ref={setNodeRef} style={style} className="border-b border-white/5 hover:bg-white/2 transition-colors">
      <td className="px-3 py-3 w-8">
        <button {...attributes} {...listeners} className="text-white/20 hover:text-white/60 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </button>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base bg-[#F5A623]/10">
            {service.icon ?? '✦'}
          </div>
          <div>
            <div className="text-sm font-medium text-white">{service.titleTr}</div>
            <div className="text-xs text-white/40">{service.titleEn}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-sm text-white/50">{service.slug}</td>
      <td className="px-3 py-3">
        <span className={`px-2 py-0.5 rounded-full text-xs ${service.featured ? 'bg-[#F5A623]/15 text-[#F5A623]' : 'bg-white/5 text-white/30'}`}>
          {service.featured ? 'Öne Çıkan' : '—'}
        </span>
      </td>
      <td className="px-3 py-3">
        <button onClick={onToggle} className={`flex items-center gap-1.5 text-xs ${service.published ? 'text-green-400' : 'text-white/30'}`}>
          {service.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          {service.published ? 'Yayında' : 'Taslak'}
        </button>
      </td>
      <td className="px-3 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <button onClick={onEdit} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
          <button onClick={onDelete} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </td>
    </tr>
  )
}

function ServiceModal({ service, onClose, onSave }: {
  service: Service | null
  onClose: () => void
  onSave: (data: ServiceForm) => void
}) {
  const isEdit = !!service?.id
  const { register, handleSubmit, formState: { errors } } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      slug: service?.slug ?? '',
      titleTr: service?.titleTr ?? '',
      titleEn: service?.titleEn ?? '',
      descTr: service?.descTr ?? '',
      descEn: service?.descEn ?? '',
      icon: service?.icon ?? '✦',
      featured: service?.featured ?? false,
      published: service?.published ?? true,
    },
  })

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-slate-900 border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <h2 className="font-playfair text-xl font-bold text-white">{isEdit ? 'Hizmet Düzenle' : 'Yeni Hizmet'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Slug</label>
              <input {...register('slug')} className="admin-input" placeholder="web-tasarim" />
              {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug.message}</p>}
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">İkon (emoji)</label>
              <input {...register('icon')} className="admin-input" placeholder="🎨" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Başlık (TR)</label>
              <input {...register('titleTr')} className="admin-input" />
              {errors.titleTr && <p className="text-red-400 text-xs mt-1">{errors.titleTr.message}</p>}
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Title (EN)</label>
              <input {...register('titleEn')} className="admin-input" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Açıklama (TR)</label>
              <textarea {...register('descTr')} rows={4} className="admin-input resize-none" />
              {errors.descTr && <p className="text-red-400 text-xs mt-1">{errors.descTr.message}</p>}
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Description (EN)</label>
              <textarea {...register('descEn')} rows={4} className="admin-input resize-none" />
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
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all">İptal</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold hover:bg-[#FFD166] transition-all">
              {isEdit ? 'Güncelle' : 'Oluştur'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function ServicesClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices)
  const [modalOpen, setModalOpen] = useState(false)
  const [editService, setEditService] = useState<Service | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIdx = services.findIndex((i) => i.id === active.id)
      const newIdx = services.findIndex((i) => i.id === over.id)
      const reordered = arrayMove(services, oldIdx, newIdx)
      setServices(reordered)
      startTransition(async () => {
        await reorderServices(reordered.map((s) => s.id))
        toast.success('Sıralama güncellendi')
      })
    }
  }

  const handleSave = (data: ServiceForm) => {
    if (editService) {
      setServices((prev) => prev.map((s) => s.id === editService.id ? { ...s, ...data, icon: data.icon ?? '✦' } : s))
      setModalOpen(false); setEditService(null)
      startTransition(async () => {
        await updateService(editService.id, { ...data, icon: data.icon ?? '✦' })
        toast.success('Hizmet güncellendi')
      })
    } else {
      startTransition(async () => {
        await createService({ ...data, icon: data.icon ?? '✦' })
        toast.success('Hizmet oluşturuldu')
      })
      setModalOpen(false)
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    const id = deleteId
    setServices((prev) => prev.filter((s) => s.id !== id))
    setDeleteId(null)
    startTransition(async () => {
      await deleteService(id)
      toast.success('Hizmet silindi')
    })
  }

  const togglePublish = (id: string) => {
    const service = services.find((s) => s.id === id)
    if (!service) return
    const newVal = !service.published
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, published: newVal } : s))
    startTransition(async () => {
      await toggleServicePublished(id, newVal)
      toast.success('Durum güncellendi')
    })
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Hizmetler</h1>
          <p className="text-white/40 text-sm mt-1">{services.length} hizmet · Sürükle-bırak ile sırala</p>
        </div>
        <button
          onClick={() => { setEditService(null); setModalOpen(true) }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all"
        >
          <Plus className="w-4 h-4" /> Yeni Hizmet
        </button>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={services.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="w-8 px-3" />
                  {['Hizmet', 'Slug', 'Öne Çıkan', 'Durum', ''].map((h) => (
                    <th key={h} className="text-left px-3 py-3 text-xs font-medium text-white/30 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-white/30 text-sm">Henüz hizmet yok</td></tr>
                ) : services.map((service) => (
                  <SortableRow
                    key={service.id}
                    service={service}
                    onEdit={() => { setEditService(service); setModalOpen(true) }}
                    onDelete={() => setDeleteId(service.id)}
                    onToggle={() => togglePublish(service.id)}
                  />
                ))}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>

      {modalOpen && (
        <ServiceModal
          service={editService}
          onClose={() => { setModalOpen(false); setEditService(null) }}
          onSave={handleSave}
        />
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Hizmeti sil"
        description="Bu hizmet kalıcı olarak silinecek."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
