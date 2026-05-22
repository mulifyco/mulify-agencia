'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { BRAND_ADMIN_EMAIL, BRAND_LOGO_URL, BRAND_NAME } from '@/lib/brand'

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta giriniz'),
  password: z.string().min(6, 'En az 6 karakter'),
})

type LoginForm = z.infer<typeof loginSchema>

function translateError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'E-posta veya şifre hatalı'
  if (msg.includes('Email not confirmed')) return 'E-posta adresinizi doğrulayın'
  if (msg.includes('Too many requests')) return 'Çok fazla deneme. Lütfen bekleyin.'
  return msg
}

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [showPass, setShowPass] = useState(false)
  const [magicMode, setMagicMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [magicSent, setMagicSent] = useState(false)

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    if (error) {
      toast.error(translateError(error.message))
      setLoading(false)
      return
    }
    // Refresh server session then navigate — loading stays true intentionally
    router.refresh()
    router.push('/admin')
  }

  const sendMagicLink = async () => {
    const email = getValues('email')
    if (!email) {
      toast.error('Önce e-posta adresinizi girin')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    })
    if (error) {
      toast.error(translateError(error.message))
      setLoading(false)
      return
    }
    setMagicSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-[#F5A623] rounded-xl rotate-45" />
            <div className="absolute inset-[3px] bg-[#0A0A0F] rounded-lg rotate-45" />
            <img
              src={BRAND_LOGO_URL}
              alt={`${BRAND_NAME} logo`}
              className="absolute inset-[8px] z-10 m-auto h-[calc(100%-16px)] w-[calc(100%-16px)] object-contain"
            />
          </div>
          <div>
            <div className="font-playfair text-xl font-bold text-white">{BRAND_NAME}</div>
            <div className="text-xs text-white/30 -mt-0.5">Admin Panel</div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#111118] border border-white/8 rounded-3xl p-8">
          <h1 className="font-playfair text-2xl font-bold text-white mb-1">Hoş Geldiniz</h1>
          <p className="text-sm text-white/40 mb-8">Yönetim paneline giriş yapın</p>

          {magicSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#F5A623]/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#F5A623]" />
              </div>
              <h3 className="font-semibold text-white mb-2">Magic link gönderildi!</h3>
              <p className="text-sm text-white/50">
                E-posta kutunuzu kontrol edin ve linke tıklayın.
              </p>
              <button
                onClick={() => setMagicSent(false)}
                className="mt-6 text-sm text-[#F5A623] hover:underline"
              >
                Geri Dön
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2 block">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder={BRAND_ADMIN_EMAIL}
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#F5A623]/40 focus:bg-[#F5A623]/3 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                )}
              </div>

              {/* Password — hidden in magic link mode */}
              {!magicMode && (
                <div>
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2 block">
                    Şifre
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      {...register('password')}
                      type={showPass ? 'text' : 'password'}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#F5A623]/40 focus:bg-[#F5A623]/3 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>
                  )}
                </div>
              )}

              {/* Submit */}
              {magicMode ? (
                <button
                  type="button"
                  onClick={sendMagicLink}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl hover:bg-[#FFD166] transition-all disabled:opacity-60"
                >
                  {loading
                    ? <div className="w-4 h-4 border-2 border-[#0A0A0F]/30 border-t-[#0A0A0F] rounded-full animate-spin" />
                    : <><Zap className="w-4 h-4" /> Magic Link Gönder</>
                  }
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#F5A623] text-[#0A0A0F] font-semibold rounded-xl hover:bg-[#FFD166] transition-all disabled:opacity-60"
                >
                  {loading
                    ? <div className="w-4 h-4 border-2 border-[#0A0A0F]/30 border-t-[#0A0A0F] rounded-full animate-spin" />
                    : <>Giriş Yap <ArrowRight className="w-4 h-4" /></>
                  }
                </button>
              )}

              {/* Toggle mode */}
              <button
                type="button"
                onClick={() => setMagicMode((v) => !v)}
                className="w-full text-sm text-white/40 hover:text-white/70 transition-colors py-1"
              >
                {magicMode ? '← Şifreyle giriş yap' : 'Magic link ile giriş yap ✦'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
