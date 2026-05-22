'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Star, X, Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import DataTable from '@/components/admin/shared/data-table'
import { createProject, updateProject, deleteProject, toggleProjectPublished } from '../actions'
import type { Project } from '@/lib/db-types'

const projectSchema = z.object({
  titleTr: z.string().min(2),
  titleEn: z.string().min(2),
  slug: z.string().min(2),
  descTr: z.string().min(10),
  descEn: z.string().min(10),
  client: z.string().optional(),
  url: z.string().optional(),
  tags: z.string().optional(),
  featured: z.boolean(),
  published: z.boolean(),
})

type ProjectForm = z.infer<typeof projectSchema>

function ProjectModal({ project, onClose, onSave }: {
  project: Project | null
  onClose: () => void
  onSave: (data: ProjectForm) => void
}) {
  const isEdit = !!project?.id
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      titleTr: project?.titleTr ?? '',
      titleEn: project?.titleEn ?? '',
      slug: project?.slug ?? '',
      descTr: project?.descTr ?? '',
      descEn: project?.descEn ?? '',
      client: project?.client ?? '',
      url: project?.url ?? '',
      tags: project?.tags?.join(', ') ?? '',
      featured: project?.featured ?? false,
      published: project?.published ?? true,
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
          <h2 className="font-playfair text-xl font-bold text-white">{isEdit ? 'Proje Düzenle' : 'Yeni Proje'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Slug</label>
              <input {...register('slug')} className="admin-input" />
              {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug.message}</p>}
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Müşteri</label>
              <input {...register('client')} className="admin-input" placeholder="Şirket Adı" />
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">URL</label>
              <input {...register('url')} className="admin-input" placeholder="https://" />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Etiketler (virgülle)</label>
              <input {...register('tags')} className="admin-input" placeholder="React, TypeScript" />
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
            <button type="submit" className="flex-1 py-3 rounded-xl bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold hover:bg-[#FFD166] transition-all">{isEdit ? 'Güncelle' : 'Oluştur'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects)
  const [modalOpen, setModalOpen] = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const handleSave = (data: ProjectForm) => {
    const tags = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : []
    if (editProject) {
      setProjects((prev) => prev.map((p) => p.id === editProject.id ? { ...p, ...data, tags } : p))
      setModalOpen(false); setEditProject(null)
      startTransition(async () => {
        await updateProject(editProject.id, { ...data, tags, client: data.client ?? undefined, url: data.url ?? undefined })
        toast.success('Proje güncellendi')
      })
    } else {
      startTransition(async () => {
        await createProject({ ...data, tags, client: data.client ?? undefined, url: data.url ?? undefined })
        toast.success('Proje oluşturuldu')
      })
      setModalOpen(false)
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    const id = deleteId
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setDeleteId(null)
    startTransition(async () => {
      await deleteProject(id)
      toast.success('Proje silindi')
    })
  }

  const togglePublish = (id: string) => {
    const project = projects.find((p) => p.id === id)
    if (!project) return
    const newVal = !project.published
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, published: newVal } : p))
    startTransition(async () => {
      await toggleProjectPublished(id, newVal)
      toast.success('Durum güncellendi')
    })
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Projeler</h1>
          <p className="text-white/40 text-sm mt-1">{projects.length} proje</p>
        </div>
        <button
          onClick={() => { setEditProject(null); setModalOpen(true) }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all"
        >
          <Plus className="w-4 h-4" /> Yeni Proje
        </button>
      </div>

      <DataTable
        data={projects}
        searchKeys={['titleTr', 'client', 'slug']}
        searchPlaceholder="Proje, müşteri ara..."
        columns={[
          {
            key: 'titleTr', label: 'Proje', sortable: true,
            render: (row) => (
              <div>
                <div className="font-medium text-white">{row.titleTr}</div>
                <div className="text-xs text-white/40">{row.titleEn}</div>
              </div>
            )
          },
          { key: 'client', label: 'Müşteri', sortable: true, render: (row) => <span className="text-white/60">{row.client ?? '—'}</span> },
          {
            key: 'tags', label: 'Etiketler',
            render: (row) => (
              <div className="flex flex-wrap gap-1">
                {(row.tags ?? []).slice(0, 3).map((t: string) => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/40">{t}</span>
                ))}
              </div>
            )
          },
          {
            key: 'featured', label: 'Öne Çıkan',
            render: (row) => row.featured ? <Star className="w-4 h-4 text-[#F5A623]" /> : <span className="text-white/20">—</span>
          },
          {
            key: 'published', label: 'Durum',
            render: (row) => (
              <button onClick={() => togglePublish(row.id)} className={`flex items-center gap-1.5 text-xs ${row.published ? 'text-green-400' : 'text-white/30'}`}>
                {row.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {row.published ? 'Yayında' : 'Taslak'}
              </button>
            )
          },
          {
            key: 'createdAt', label: 'Tarih', sortable: true,
            render: (row) => <span className="text-white/40 text-xs">{new Date(row.createdAt).toLocaleDateString('tr-TR')}</span>
          },
        ]}
        actions={(row) => (
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => { setEditProject(row); setModalOpen(true) }} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      {modalOpen && (
        <ProjectModal project={editProject} onClose={() => { setModalOpen(false); setEditProject(null) }} onSave={handleSave} />
      )}
      <ConfirmDialog open={!!deleteId} title="Projeyi sil" description="Bu proje kalıcı olarak silinecek." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
