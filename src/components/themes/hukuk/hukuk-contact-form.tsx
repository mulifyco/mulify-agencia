'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
}

export default function HukukContactForm() {
  const [status, setStatus] = useState<FormState>('idle')
  const [form, setForm] = useState(initialForm)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: 'Kurumsal hukuk danışmanlığı' }),
      })

      if (!response.ok) throw new Error('Contact request failed')

      setForm(initialForm)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-[#eadfd6] bg-[#fbf8f4] px-4 py-3 text-sm text-[#16120f] outline-none transition-colors placeholder:text-[#94867b] focus:border-[#8c6a4a]'

  if (status === 'success') {
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-[2rem] border border-[#e9ded5] bg-white p-8 text-center">
        <div className="text-4xl" aria-hidden="true">✓</div>
        <h2 className="mt-5 font-playfair text-3xl text-[#16120f]">Talebiniz alındı</h2>
        <p className="mt-3 max-w-md text-sm leading-7 text-[#625851]">
          İlgili partner ekip en kısa sürede sizinle iletişime geçecektir.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-7 rounded-full bg-[#16120f] px-6 py-3 text-sm font-semibold text-[#f7f2ec]"
        >
          Yeni talep oluştur
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[#e9ded5] bg-white p-6 shadow-[0_28px_80px_rgba(22,18,15,0.08)] md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-xs uppercase tracking-[0.24em] text-[#8c6a4a]">
          Ad Soyad
          <input
            required
            minLength={2}
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className={`${inputClass} mt-2`}
            placeholder="Adınız ve soyadınız"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.24em] text-[#8c6a4a]">
          Şirket
          <input
            value={form.company}
            onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
            className={`${inputClass} mt-2`}
            placeholder="Şirket unvanı"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.24em] text-[#8c6a4a]">
          E-posta
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className={`${inputClass} mt-2`}
            placeholder="kurumsal@firma.com"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.24em] text-[#8c6a4a]">
          Telefon
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            className={`${inputClass} mt-2`}
            placeholder="+90 5xx xxx xx xx"
          />
        </label>
      </div>

      <label className="mt-4 block text-xs uppercase tracking-[0.24em] text-[#8c6a4a]">
        Hukuki ihtiyaç
        <textarea
          required
          minLength={10}
          rows={5}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          className={`${inputClass} mt-2 resize-none`}
          placeholder="İşlem, uyuşmazlık veya regülasyon gündeminizi kısaca paylaşın."
        />
      </label>

      {status === 'error' && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Talebiniz gönderilemedi. Lütfen tekrar deneyin.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-7 text-[#625851]">
          Paylaştığınız bilgiler gizlilik çerçevesinde ilgili partner ekip tarafından değerlendirilir.
        </p>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center rounded-full bg-[#16120f] px-6 py-3 text-sm font-semibold text-[#f7f2ec] disabled:opacity-60"
        >
          {status === 'loading' ? 'Gönderiliyor...' : 'Görüşme talep et'}
        </button>
      </div>
    </form>
  )
}
