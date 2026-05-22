'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import DataTable from '@/components/admin/shared/data-table'
import { createPost, updatePost, deletePost, togglePostPublished } from '../actions'
import type { Post } from '@/lib/db-types'

const postSchema = z.object({
  titleTr: z.string().min(3),
  titleEn: z.string().min(3),
  slug: z.string().min(3),
  excerptTr: z.string().optional(),
  excerptEn: z.string().optional(),
  contentTr: z.string().min(1),
  contentEn: z.string().min(1),
  tags: z.string().optional(),
  published: z.boolean(),
})

type PostForm = z.infer<typeof postSchema>

function PostModal({ post, onClose, onSave }: {
  post: Post | null
  onClose: () => void
  onSave: (data: PostForm) => void
}) {
  const isEdit = !!post?.id
  const [tab, setTab] = useState<'tr' | 'en'>('tr')

  const { register, handleSubmit, formState: { errors } } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      titleTr: post?.titleTr ?? '',
      titleEn: post?.titleEn ?? '',
      slug: post?.slug ?? '',
      excerptTr: post?.excerptTr ?? '',
      excerptEn: post?.excerptEn ?? '',
      contentTr: post?.contentTr ?? '',
      contentEn: post?.contentEn ?? '',
      tags: post?.tags?.join(', ') ?? '',
      published: post?.published ?? false,
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
          <h2 className="font-playfair text-xl font-bold text-white">{isEdit ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}</h2>
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
              <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Etiketler (virgülle)</label>
              <input {...register('tags')} className="admin-input" placeholder="Next.js, React" />
            </div>
          </div>

          <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
            {(['tr', 'en'] as const).map((lang) => (
              <button key={lang} type="button" onClick={() => setTab(lang)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === lang ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {tab === 'tr' ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Başlık (TR)</label>
                <input {...register('titleTr')} className="admin-input" />
                {errors.titleTr && <p className="text-red-400 text-xs mt-1">{errors.titleTr.message}</p>}
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Özet (TR)</label>
                <textarea {...register('excerptTr')} rows={2} className="admin-input resize-none" />
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">İçerik (TR)</label>
                <textarea {...register('contentTr')} rows={8} className="admin-input resize-none font-mono text-xs" />
                {errors.contentTr && <p className="text-red-400 text-xs mt-1">{errors.contentTr.message}</p>}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Title (EN)</label>
                <input {...register('titleEn')} className="admin-input" />
                {errors.titleEn && <p className="text-red-400 text-xs mt-1">{errors.titleEn.message}</p>}
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Excerpt (EN)</label>
                <textarea {...register('excerptEn')} rows={2} className="admin-input resize-none" />
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wide mb-1.5 block">Content (EN)</label>
                <textarea {...register('contentEn')} rows={8} className="admin-input resize-none font-mono text-xs" />
                {errors.contentEn && <p className="text-red-400 text-xs mt-1">{errors.contentEn.message}</p>}
              </div>
            </div>
          )}

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" {...register('published')} className="sr-only peer" />
            <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-green-500 transition-all relative">
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
            </div>
            <span className="text-sm text-white/60">Yayınla</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all">İptal</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold hover:bg-[#FFD166] transition-all">{isEdit ? 'Güncelle' : 'Oluştur'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function BlogClient({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [modalOpen, setModalOpen] = useState(false)
  const [editPost, setEditPost] = useState<Post | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const handleSave = (data: PostForm) => {
    const tags = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : []
    if (editPost) {
      setPosts((prev) => prev.map((p) => p.id === editPost.id ? { ...p, ...data, tags } : p))
      setModalOpen(false); setEditPost(null)
      startTransition(async () => {
        await updatePost(editPost.id, { ...data, tags })
        toast.success('Yazı güncellendi')
      })
    } else {
      startTransition(async () => {
        await createPost({ ...data, tags })
        toast.success('Yazı oluşturuldu')
      })
      setModalOpen(false)
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    const id = deleteId
    setPosts((prev) => prev.filter((p) => p.id !== id))
    setDeleteId(null)
    startTransition(async () => {
      await deletePost(id)
      toast.success('Yazı silindi')
    })
  }

  const togglePublish = (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return
    const newVal = !post.published
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, published: newVal } : p))
    startTransition(async () => {
      await togglePostPublished(id, newVal)
      toast.success('Durum güncellendi')
    })
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Blog</h1>
          <p className="text-white/40 text-sm mt-1">{posts.length} yazı</p>
        </div>
        <button
          onClick={() => { setEditPost(null); setModalOpen(true) }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all"
        >
          <Plus className="w-4 h-4" /> Yeni Yazı
        </button>
      </div>

      <DataTable
        data={posts}
        searchKeys={['titleTr', 'titleEn', 'slug']}
        searchPlaceholder="Yazı ara..."
        columns={[
          {
            key: 'titleTr', label: 'Başlık', sortable: true,
            render: (row) => (
              <div>
                <div className="font-medium text-white">{row.titleTr}</div>
                <div className="text-xs text-white/40">{row.titleEn}</div>
              </div>
            )
          },
          { key: 'slug', label: 'Slug', render: (row) => <span className="text-white/40 font-mono text-xs">{row.slug}</span> },
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
            <button onClick={() => { setEditPost(row); setModalOpen(true) }} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      {modalOpen && (
        <PostModal post={editPost} onClose={() => { setModalOpen(false); setEditPost(null) }} onSave={handleSave} />
      )}
      <ConfirmDialog open={!!deleteId} title="Yazıyı sil" description="Bu blog yazısı kalıcı olarak silinecek." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
