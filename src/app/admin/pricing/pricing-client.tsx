'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Star, X } from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ConfirmDialog from '@/components/admin/shared/confirm-dialog'
import { createPricingPlan, updatePricingPlan, deletePricingPlan } from '../actions'
import type { PricingPlan } from '@/lib/db-types'

const schema = z.object({
  slug: z.string().min(2),
  nameTr: z.string().min(2),
  nameEn: z.string().min(2),
  descTr: z.string().optional(),
  descEn: z.string().optional(),
  price: z.number().min(0),
  currency: z.string().min(1),
  period: z.string().min(1),
  features: z.array(z.object({ value: z.string() })),
  ctaText: z.string().optional(),
  highlighted: z.boolean(),
  published: z.boolean(),
  order: z.number().int().min(0),
})

type PlanForm = z.infer<typeof schema>

const CURRENCY_SYMBOLS: Record<string, string> = { USD: '$', EUR: '€', TRY: '₺' }

function Modal({
  plan,
  totalPlans,
  onClose,
  onSave,
}: {
  plan: PricingPlan | null
  totalPlans: number
  onClose: () => void
  onSave: (d: PlanForm) => void
}) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<PlanForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      slug: plan?.slug ?? '',
      nameTr: plan?.nameTr ?? '',
      nameEn: plan?.nameEn ?? '',
      descTr: plan?.descTr ?? '',
      descEn: plan?.descEn ?? '',
      price: plan?.price ?? 0,
      currency: plan?.currency ?? 'USD',
      period: plan?.period ?? 'month',
      features: (plan?.features ?? []).map((v) => ({ value: v })),
      ctaText: plan?.ctaText ?? '',
      highlighted: plan?.highlighted ?? false,
      published: plan?.published ?? true,
      order: plan?.order ?? totalPlans,
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'features' })

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
          <h2 className="font-playfair text-xl font-bold text-white">
            {plan?.id ? 'Planı Düzenle' : 'Yeni Plan'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-5">
          {/* Slug + Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Slug</label>
              <input {...register('slug')} className="admin-input" placeholder="starter" />
              {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug.message}</p>}
            </div>
            <div>
              <label className="admin-label">Sıra</label>
              <input {...register('order', { valueAsNumber: true })} type="number" min={0} className="admin-input" />
            </div>
          </div>

          {/* Names */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Plan Adı (TR)</label>
              <input {...register('nameTr')} className="admin-input" placeholder="Başlangıç" />
              {errors.nameTr && <p className="text-red-400 text-xs mt-1">{errors.nameTr.message}</p>}
            </div>
            <div>
              <label className="admin-label">Plan Name (EN)</label>
              <input {...register('nameEn')} className="admin-input" placeholder="Starter" />
              {errors.nameEn && <p className="text-red-400 text-xs mt-1">{errors.nameEn.message}</p>}
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Açıklama (TR)</label>
              <textarea {...register('descTr')} rows={2} className="admin-input resize-none" />
            </div>
            <div>
              <label className="admin-label">Description (EN)</label>
              <textarea {...register('descEn')} rows={2} className="admin-input resize-none" />
            </div>
          </div>

          {/* Price + Currency + Period */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="admin-label">Fiyat</label>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                step="0.01"
                min={0}
                className="admin-input"
                placeholder="0 = özel fiyat"
              />
            </div>
            <div>
              <label className="admin-label">Fiyat Birimi</label>
              <select {...register('currency')} className="admin-input">
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="TRY">₺ TRY</option>
              </select>
            </div>
            <div>
              <label className="admin-label">Periyot</label>
              <select {...register('period')} className="admin-input">
                <option value="month">/ay</option>
                <option value="year">/yıl</option>
              </select>
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="admin-label mb-0">Özellikler</label>
              <button
                type="button"
                onClick={() => append({ value: '' })}
                className="text-xs text-[#F5A623] hover:text-[#FFD166] font-medium"
              >
                + Özellik Ekle
              </button>
            </div>
            <div className="space-y-2">
              {fields.length === 0 && (
                <p className="text-xs text-white/25 italic">Henüz özellik eklenmedi.</p>
              )}
              {fields.map((field, i) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    {...register(`features.${i}.value`)}
                    className="admin-input flex-1"
                    placeholder={`Özellik ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="p-2 text-white/30 hover:text-red-400 transition-colors"
                    title="Kaldır"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button text */}
          <div>
            <label className="admin-label">CTA Butonu Metni</label>
            <input
              {...register('ctaText')}
              className="admin-input"
              placeholder="Başlayın / Bize Ulaşın / Ücretsiz Deneyin"
            />
            <p className="text-xs text-white/25 mt-1">Boş bırakılırsa fiyata göre otomatik seçilir.</p>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input type="checkbox" {...register('highlighted')} className="sr-only peer" />
              <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-[#F5A623] transition-all relative after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" />
              <span className="text-sm text-white/60">Öne Çıkan</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input type="checkbox" {...register('published')} className="sr-only peer" />
              <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-green-500 transition-all relative after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" />
              <span className="text-sm text-white/60">Yayınla</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/8 transition-all"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#F5A623] text-[#0A0A0F] text-sm font-semibold hover:bg-[#FFD166] transition-all"
            >
              {plan?.id ? 'Güncelle' : 'Oluştur'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function PricingClient({ initialPlans }: { initialPlans: PricingPlan[] }) {
  const [plans, setPlans] = useState(initialPlans)
  const [modalOpen, setModalOpen] = useState(false)
  const [editPlan, setEditPlan] = useState<PricingPlan | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const openNew = () => { setEditPlan(null); setModalOpen(true) }
  const openEdit = (plan: PricingPlan) => { setEditPlan(plan); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditPlan(null) }

  const handleSave = (data: PlanForm) => {
    const features = data.features.map((f) => f.value).filter(Boolean)
    const payload = { ...data, features, ctaText: data.ctaText || null }

    if (editPlan) {
      setPlans((prev) => prev.map((p) => p.id === editPlan.id ? { ...p, ...payload } : p))
      closeModal()
      startTransition(async () => {
        try {
          await updatePricingPlan(editPlan.id, payload)
          toast.success('Plan güncellendi')
        } catch {
          toast.error('Güncelleme başarısız')
        }
      })
    } else {
      closeModal()
      startTransition(async () => {
        try {
          await createPricingPlan(payload)
          toast.success('Plan oluşturuldu')
          // Refresh list from server
          const res = await fetch('/api/admin/pricing')
          if (res.ok) setPlans(await res.json())
        } catch {
          toast.error('Oluşturma başarısız')
        }
      })
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    const id = deleteId
    setPlans((prev) => prev.filter((p) => p.id !== id))
    setDeleteId(null)
    startTransition(async () => {
      try {
        await deletePricingPlan(id)
        toast.success('Plan silindi')
      } catch {
        toast.error('Silme başarısız')
      }
    })
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">Fiyatlandırma</h1>
          <p className="text-white/40 text-sm mt-1">{plans.length} plan</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all"
        >
          <Plus className="w-4 h-4" /> Yeni Plan
        </button>
      </div>

      {/* Plan cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.length === 0 && (
          <div className="col-span-3 text-center py-16 text-white/30 text-sm">
            Henüz plan yok — &quot;Yeni Plan&quot; ile başlayın.
          </div>
        )}
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-slate-900 border rounded-2xl p-6 ${plan.highlighted ? 'border-[#F5A623]/40' : 'border-white/5'}`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#F5A623] rounded-full text-[10px] font-bold text-[#0A0A0F] uppercase tracking-wide flex items-center gap-1 whitespace-nowrap">
                <Star className="w-3 h-3" /> Önerilen
              </div>
            )}

            <div className="mb-3">
              <div className="font-semibold text-white text-lg">{plan.nameTr}</div>
              <div className="text-[11px] text-white/30 font-mono">{plan.slug} · sıra {plan.order}</div>
              {plan.descTr && <div className="text-xs text-white/40 mt-1">{plan.descTr}</div>}
            </div>

            <div className="mb-4">
              <span className="text-3xl font-bold text-white">
                {CURRENCY_SYMBOLS[plan.currency] ?? plan.currency}
                {plan.price === 0 ? '—' : plan.price.toLocaleString('tr-TR')}
              </span>
              <span className="text-white/40 text-sm">
                /{plan.period === 'month' ? 'ay' : 'yıl'}
              </span>
            </div>

            <ul className="space-y-1.5 mb-5">
              {plan.features.slice(0, 5).map((f, i) => (
                <li key={i} className="text-xs text-white/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]/60 flex-shrink-0" />
                  {f}
                </li>
              ))}
              {plan.features.length > 5 && (
                <li className="text-xs text-white/30">+{plan.features.length - 5} özellik daha</li>
              )}
              {plan.features.length === 0 && (
                <li className="text-xs text-white/20 italic">Özellik yok</li>
              )}
            </ul>

            {plan.ctaText && (
              <div className="mb-3 text-xs text-white/40">
                CTA: <span className="text-white/60">&quot;{plan.ctaText}&quot;</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-0.5 rounded-full ${plan.published ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'}`}>
                {plan.published ? 'Yayında' : 'Taslak'}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => openEdit(plan)}
                  className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(plan.id)}
                  className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal
          plan={editPlan}
          totalPlans={plans.length}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
      <ConfirmDialog
        open={!!deleteId}
        title="Planı sil"
        description="Bu fiyatlandırma planı kalıcı olarak silinecek."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
