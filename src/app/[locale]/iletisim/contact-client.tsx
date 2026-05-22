'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, AlertCircle, Clock } from 'lucide-react'

function TwitterIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
}
function LinkedinIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
function InstagramIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
}

const SERVICES = [
  { valueTr: 'Web Tasarım', valueEn: 'Web Design' },
  { valueTr: 'Web Geliştirme', valueEn: 'Web Development' },
  { valueTr: 'Dijital Pazarlama', valueEn: 'Digital Marketing' },
  { valueTr: 'E-Ticaret', valueEn: 'E-Commerce' },
  { valueTr: 'Marka Kimliği', valueEn: 'Brand Identity' },
  { valueTr: 'Diğer', valueEn: 'Other' },
]

const BUDGETS = [
  { valueTr: '5.000₺ - 15.000₺', valueEn: '$500 - $1,500' },
  { valueTr: '15.000₺ - 50.000₺', valueEn: '$1,500 - $5,000' },
  { valueTr: '50.000₺ - 150.000₺', valueEn: '$5,000 - $15,000' },
  { valueTr: '150.000₺+', valueEn: '$15,000+' },
]

const TRUST_ITEMS = [
  { icon: CheckCircle, labelTr: '150+ Tamamlanan Proje', labelEn: '150+ Completed Projects' },
  { icon: Clock, labelTr: '24 Saatte Yanıt', labelEn: '24h Response Time' },
  { icon: CheckCircle, labelTr: '98% Müşteri Memnuniyeti', labelEn: '98% Client Satisfaction' },
]

export default function ContactClient({
  locale,
  setting,
}: {
  locale: string
  setting: Record<string, string>
}) {
  const isTr = locale === 'tr'
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    service: '', budget: '', message: '',
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const email = setting['contact_email'] || 'hello@mulify.co'
  const phone = setting['contact_phone'] || '+90 (212) 000 00 00'
  const address = setting['contact_address'] || 'Levent, İstanbul, Türkiye'
  const linkedinUrl = setting['social_linkedin'] || null
  const twitterUrl = setting['social_twitter'] || null
  const instagramUrl = setting['social_instagram'] || null

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#F5A623]/50 focus:bg-[#F5A623]/3 transition-all'

  return (
    <main className="bg-[#0A0A0F] min-h-screen">
      {/* ─── Hero Background ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-1/4 w-[600px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="absolute bottom-40 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.07) 0%, transparent 70%)', filter: 'blur(70px)' }}
        />
      </div>

      <section className="relative pt-40 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">

            {/* ─── Left Column ──────────────────────────────────────────────── */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-[0.35em] text-[#F5A623] mb-5 flex items-center gap-3"
              >
                <span className="w-8 h-px bg-[#F5A623]/60" />
                {isTr ? 'İletişim' : 'Contact'}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as any }}
                className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              >
                {isTr ? (
                  <>Projenizi<br /><span className="text-amber-gradient">hayata geçirelim</span></>
                ) : (
                  <>Let's bring<br /><span className="text-amber-gradient">your project to life</span></>
                )}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-white/50 leading-relaxed mb-10"
              >
                {isTr
                  ? 'Fikrinizi paylaşın, size özel teklif hazırlayalım. 24 saat içinde dönüş yapıyoruz.'
                  : "Share your idea and we'll prepare a tailored quote. We respond within 24 hours."}
              </motion.p>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="space-y-4 mb-10"
              >
                {[
                  { icon: Mail, label: email, href: `mailto:${email}` },
                  { icon: Phone, label: phone, href: `tel:${phone.replace(/\s/g, '')}` },
                  { icon: MapPin, label: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}` },
                ].map((item) => (
                  <a key={item.href} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-4 text-white/50 hover:text-white transition-colors group">
                    <div className="w-11 h-11 rounded-2xl glass flex items-center justify-center flex-shrink-0 group-hover:border-[#F5A623]/30 group-hover:bg-[#F5A623]/5 transition-all">
                      <item.icon className="w-4 h-4 text-[#F5A623]" />
                    </div>
                    <span className="text-sm">{item.label}</span>
                  </a>
                ))}
              </motion.div>

              {/* Social Links */}
              {(linkedinUrl || twitterUrl || instagramUrl) && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-3 mb-10"
                >
                  <span className="text-xs text-white/30 uppercase tracking-wide">{isTr ? 'Takip Et:' : 'Follow:'}</span>
                  {linkedinUrl && (
                    <a href={linkedinUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all">
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {twitterUrl && (
                    <a href={twitterUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all">
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                  {instagramUrl && (
                    <a href={instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40 hover:text-[#E1306C] hover:border-[#E1306C]/30 transition-all">
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              )}

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="glass rounded-2xl p-6 space-y-3"
              >
                {TRUST_ITEMS.map((item) => (
                  <div key={item.labelEn} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                    <span className="text-sm text-white/60">{isTr ? item.labelTr : item.labelEn}</span>
                  </div>
                ))}
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6 rounded-2xl overflow-hidden border border-white/8"
              >
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=28.98,41.04,29.04,41.08&layer=mapnik&marker=41.06,29.01"
                  width="100%"
                  height="200"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
                  loading="lazy"
                  title="Location map"
                />
              </motion.div>
            </div>

            {/* ─── Right Column: Form ───────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as any }}
              className="glass rounded-2xl p-8 lg:p-10"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                      className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <h3 className="font-playfair text-2xl font-bold text-white mb-3">
                      {isTr ? 'Mesajınız İletildi!' : 'Message Sent!'}
                    </h3>
                    <p className="text-white/50 mb-6">
                      {isTr ? '24 saat içinde size dönüş yapacağız.' : "We'll get back to you within 24 hours."}
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-sm text-[#F5A623] hover:text-[#FFD166] transition-colors"
                    >
                      {isTr ? '← Yeni mesaj gönder' : '← Send another message'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="mb-6">
                      <h2 className="font-playfair text-xl font-bold text-white mb-1">
                        {isTr ? 'Bize Yazın' : 'Get In Touch'}
                      </h2>
                      <p className="text-sm text-white/40">
                        {isTr ? 'Aşağıdaki formu doldurun, en kısa sürede size dönelim.' : 'Fill out the form below and we\'ll get back to you shortly.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wide mb-1.5 block">{isTr ? 'Ad Soyad *' : 'Full Name *'}</label>
                        <input value={form.name} onChange={set('name')} required className={inputClass} placeholder={isTr ? 'Adınız Soyadınız' : 'Your Name'} />
                      </div>
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wide mb-1.5 block">{isTr ? 'E-posta *' : 'Email *'}</label>
                        <input type="email" value={form.email} onChange={set('email')} required className={inputClass} placeholder="hello@example.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wide mb-1.5 block">{isTr ? 'Telefon' : 'Phone'}</label>
                        <input type="tel" value={form.phone} onChange={set('phone')} className={inputClass} placeholder="+90 5xx xxx xx xx" />
                      </div>
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wide mb-1.5 block">{isTr ? 'Şirket' : 'Company'}</label>
                        <input value={form.company} onChange={set('company')} className={inputClass} placeholder={isTr ? 'Şirket Adı' : 'Company Name'} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wide mb-1.5 block">{isTr ? 'Hizmet' : 'Service'}</label>
                        <select value={form.service} onChange={set('service')} className={inputClass}>
                          <option value="">{isTr ? 'Seçiniz' : 'Select'}</option>
                          {SERVICES.map((s) => (
                            <option key={s.valueEn} value={isTr ? s.valueTr : s.valueEn}>{isTr ? s.valueTr : s.valueEn}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wide mb-1.5 block">{isTr ? 'Bütçe' : 'Budget'}</label>
                        <select value={form.budget} onChange={set('budget')} className={inputClass}>
                          <option value="">{isTr ? 'Seçiniz' : 'Select'}</option>
                          {BUDGETS.map((b) => (
                            <option key={b.valueEn} value={isTr ? b.valueTr : b.valueEn}>{isTr ? b.valueTr : b.valueEn}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wide mb-1.5 block">{isTr ? 'Mesaj *' : 'Message *'}</label>
                      <textarea
                        value={form.message} onChange={set('message')} required rows={5}
                        className={`${inputClass} resize-none`}
                        placeholder={isTr ? 'Projeniz hakkında bilgi verin...' : 'Tell us about your project...'}
                      />
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm p-3 rounded-xl bg-red-400/5 border border-red-400/20"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {isTr ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.'}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl hover:bg-[#FFD166] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                      {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-[#0A0A0F]/30 border-t-[#0A0A0F] rounded-full animate-spin" />
                      ) : (
                        <>
                          {isTr ? 'Mesaj Gönder' : 'Send Message'}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-white/25 mt-2">
                      {isTr ? 'Bilgileriniz güvende, spam göndermiyoruz.' : "Your info is safe — we don't spam."}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
