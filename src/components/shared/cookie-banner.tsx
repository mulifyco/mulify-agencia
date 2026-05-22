'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Cookie, X } from 'lucide-react'

const CONSENT_KEY = 'mulify_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const locale = useLocale()
  const isTr = locale === 'tr'

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
  }, [])

  const save = (accepted: boolean) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ accepted, date: new Date().toISOString() }))
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[200]"
        >
          <div className="bg-[#111118]/96 backdrop-blur-xl border-t border-white/8 px-4 py-4 md:px-8 md:py-5">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Cookie className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">
                    {isTr ? 'Çerezleri Kullanıyoruz' : 'We Use Cookies'}
                  </p>
                  <p className="text-xs text-white/45 leading-relaxed">
                    {isTr ? (
                      <>Deneyiminizi iyileştirmek için çerezler kullanıyoruz.{' '}
                        <Link href={`/${locale}/cerez-politikasi`} className="text-[#F5A623] hover:underline">Çerez politikamızı</Link> inceleyebilirsiniz.</>
                    ) : (
                      <>We use cookies to improve your experience. View our{' '}
                        <Link href={`/${locale}/cerez-politikasi`} className="text-[#F5A623] hover:underline">cookie policy</Link>.</>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => save(false)}
                  className="px-4 py-2 text-xs font-medium text-white/45 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
                >
                  {isTr ? 'Reddet' : 'Reject'}
                </button>
                <button
                  onClick={() => save(true)}
                  className="px-5 py-2 text-xs font-semibold bg-[#F5A623] text-[#0A0A0F] rounded-xl hover:bg-[#FFD166] transition-all"
                >
                  {isTr ? 'Kabul Et' : 'Accept All'}
                </button>
                <button
                  onClick={() => save(false)}
                  className="p-1.5 text-white/25 hover:text-white/60 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
