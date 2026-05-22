'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Save, Globe, Phone, Share2, Search, Palette } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { upsertSettings } from '../actions'

const tabs = [
  { key: 'general', label: 'Genel', icon: Globe },
  { key: 'contact', label: 'İletişim', icon: Phone },
  { key: 'social', label: 'Sosyal', icon: Share2 },
  { key: 'seo', label: 'SEO', icon: Search },
  { key: 'theme', label: 'Tema', icon: Palette },
]

type SettingsForm = {
  siteName: string; taglineTr: string; taglineEn: string
  phone: string; email: string; address: string
  instagram: string; linkedin: string; twitter: string; youtube: string; tiktok: string
  metaTitle: string; metaDesc: string
  primaryColor: string; secondaryColor: string
}

const KEY_MAP: Record<keyof SettingsForm, { key: string; group: string }> = {
  siteName: { key: 'site_name', group: 'general' },
  taglineTr: { key: 'tagline_tr', group: 'general' },
  taglineEn: { key: 'tagline_en', group: 'general' },
  phone: { key: 'contact_phone', group: 'contact' },
  email: { key: 'contact_email', group: 'contact' },
  address: { key: 'contact_address', group: 'contact' },
  instagram: { key: 'social_instagram', group: 'social' },
  linkedin: { key: 'social_linkedin', group: 'social' },
  twitter: { key: 'social_twitter', group: 'social' },
  youtube: { key: 'social_youtube', group: 'social' },
  tiktok: { key: 'social_tiktok', group: 'social' },
  metaTitle: { key: 'seo_meta_title', group: 'seo' },
  metaDesc: { key: 'seo_meta_desc', group: 'seo' },
  primaryColor: { key: 'theme_primary_color', group: 'theme' },
  secondaryColor: { key: 'theme_secondary_color', group: 'theme' },
}

function fromDb(db: Record<string, string>): SettingsForm {
  return {
    siteName: db['site_name'] ?? 'Mulify',
    taglineTr: db['tagline_tr'] ?? 'Dijital dünyada markanızı güçlendiriyoruz.',
    taglineEn: db['tagline_en'] ?? 'Empowering your brand in the digital world.',
    phone: db['contact_phone'] ?? '+90 (212) 000 00 00',
    email: db['contact_email'] ?? 'hello@mulify.co',
    address: db['contact_address'] ?? 'Levent, İstanbul, Türkiye',
    instagram: db['social_instagram'] ?? '',
    linkedin: db['social_linkedin'] ?? '',
    twitter: db['social_twitter'] ?? '',
    youtube: db['social_youtube'] ?? '',
    tiktok: db['social_tiktok'] ?? '',
    metaTitle: db['seo_meta_title'] ?? 'Mulify — Dijital Ajans',
    metaDesc: db['seo_meta_desc'] ?? 'Strateji, tasarım ve teknoloji.',
    primaryColor: db['theme_primary_color'] ?? '#F5A623',
    secondaryColor: db['theme_secondary_color'] ?? '#6C63FF',
  }
}

export default function SettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [activeTab, setActiveTab] = useState('general')
  const [, startTransition] = useTransition()
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit } = useForm<SettingsForm>({
    defaultValues: fromDb(initialSettings),
  })

  const onSubmit = (data: SettingsForm) => {
    setSaving(true)
    const entries = (Object.entries(data) as [keyof SettingsForm, string][]).map(([field, value]) => ({
      key: KEY_MAP[field].key,
      value,
      group: KEY_MAP[field].group,
    }))
    startTransition(async () => {
      try {
        await upsertSettings(entries)
        toast.success('Ayarlar kaydedildi')
      } catch {
        toast.error('Kaydetme başarısız')
      } finally {
        setSaving(false)
      }
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-playfair text-2xl font-bold text-white">Site Ayarları</h1>
        <p className="text-white/40 text-sm mt-1">Sitenin genel yapılandırması</p>
      </div>

      <div className="flex gap-1 p-1 bg-slate-900 border border-white/5 rounded-2xl overflow-x-auto">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-[#F5A623]/10 text-[#F5A623]' : 'text-white/40 hover:text-white'}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-900 border border-white/5 rounded-2xl p-6 space-y-5">
        {activeTab === 'general' && (
          <>
            <h3 className="font-semibold text-white">Genel Bilgiler</h3>
            <div>
              <label className="admin-label">Site Adı</label>
              <input {...register('siteName')} className="admin-input max-w-xs" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="admin-label">Slogan (TR)</label><textarea {...register('taglineTr')} rows={3} className="admin-input resize-none" /></div>
              <div><label className="admin-label">Tagline (EN)</label><textarea {...register('taglineEn')} rows={3} className="admin-input resize-none" /></div>
            </div>
            <div className="p-4 bg-[#F5A623]/5 border border-[#F5A623]/10 rounded-xl">
              <p className="text-sm text-[#F5A623]/80">Logo ve favicon yükleme için Medya Kütüphanesi'ni kullanın.</p>
            </div>
          </>
        )}
        {activeTab === 'contact' && (
          <>
            <h3 className="font-semibold text-white">İletişim Bilgileri</h3>
            <div><label className="admin-label">Telefon</label><input {...register('phone')} className="admin-input" /></div>
            <div><label className="admin-label">E-posta</label><input {...register('email')} className="admin-input" /></div>
            <div><label className="admin-label">Adres</label><textarea {...register('address')} rows={3} className="admin-input resize-none" /></div>
          </>
        )}
        {activeTab === 'social' && (
          <>
            <h3 className="font-semibold text-white">Sosyal Medya</h3>
            {[
              { key: 'instagram' as const, label: 'Instagram URL' },
              { key: 'linkedin' as const, label: 'LinkedIn URL' },
              { key: 'twitter' as const, label: 'X (Twitter) URL' },
              { key: 'youtube' as const, label: 'YouTube URL' },
              { key: 'tiktok' as const, label: 'TikTok URL' },
            ].map(({ key, label }) => (
              <div key={key}><label className="admin-label">{label}</label><input {...register(key)} className="admin-input" placeholder="https://" /></div>
            ))}
          </>
        )}
        {activeTab === 'seo' && (
          <>
            <h3 className="font-semibold text-white">SEO Ayarları</h3>
            <div><label className="admin-label">Default Meta Başlık</label><input {...register('metaTitle')} className="admin-input" /></div>
            <div><label className="admin-label">Default Meta Açıklama</label><textarea {...register('metaDesc')} rows={3} className="admin-input resize-none" placeholder="Max 160 karakter" /></div>
          </>
        )}
        {activeTab === 'theme' && (
          <>
            <h3 className="font-semibold text-white">Tema Renkleri</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Birincil Renk (Amber)</label>
                <div className="flex items-center gap-3 mt-1">
                  <input {...register('primaryColor')} type="color" className="w-10 h-10 rounded-xl border border-white/10 bg-transparent cursor-pointer" />
                  <input {...register('primaryColor')} className="admin-input flex-1" placeholder="#F5A623" />
                </div>
              </div>
              <div>
                <label className="admin-label">İkincil Renk (Mor)</label>
                <div className="flex items-center gap-3 mt-1">
                  <input {...register('secondaryColor')} type="color" className="w-10 h-10 rounded-xl border border-white/10 bg-transparent cursor-pointer" />
                  <input {...register('secondaryColor')} className="admin-input flex-1" placeholder="#6C63FF" />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="pt-4 border-t border-white/5">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl text-sm hover:bg-[#FFD166] transition-all disabled:opacity-60"
          >
            {saving ? <div className="w-4 h-4 border-2 border-[#0A0A0F]/30 border-t-[#0A0A0F] rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            Kaydet
          </button>
        </div>
      </form>
    </div>
  )
}
