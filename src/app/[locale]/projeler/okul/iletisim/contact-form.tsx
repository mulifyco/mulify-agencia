'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function OkulContactForm({ color }: { color: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'okul-tema' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all'

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center h-full">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Mesajınız Alındı!</h3>
        <p className="text-gray-500 text-sm">En kısa sürede size dönüş yapacağız.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Mesaj Gönderin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad Soyad *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Adınız ve soyadınız"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="ornek@email.com"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="+90 5xx xxx xx xx"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Mesajınız *</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="Sorunuz veya mesajınız..."
            className={`${inputCls} resize-none`}
          />
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
            Bir hata oluştu. Lütfen tekrar deneyin.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: color }}
        >
          {status === 'loading' ? 'Gönderiliyor...' : 'Mesaj Gönder'}
          {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
    </div>
  )
}
