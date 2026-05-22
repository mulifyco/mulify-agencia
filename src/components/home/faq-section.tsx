'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Plus, Minus } from 'lucide-react'
import { mockFAQs } from '@/lib/mock-data'

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  isTr,
}: {
  faq: (typeof mockFAQs)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
  isTr: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-[#F5A623]/30 bg-[#F5A623]/3'
          : 'border-white/5 bg-[#16161F] hover:border-white/10'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-5 px-6 py-5 text-left"
      >
        <span
          className={`font-playfair text-2xl font-bold flex-shrink-0 w-10 transition-colors ${
            isOpen ? 'text-[#F5A623]' : 'text-white/15'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={`flex-1 font-medium text-base transition-colors ${isOpen ? 'text-white' : 'text-white/70'}`}>
          {isTr ? faq.questionTr : faq.questionEn}
        </span>
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'bg-[#F5A623] rotate-0' : 'bg-white/5 rotate-0'
          }`}
        >
          {isOpen
            ? <Minus className="w-3.5 h-3.5 text-[#0A0A0F]" />
            : <Plus className="w-3.5 h-3.5 text-white/50" />
          }
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6 pl-[4.5rem]">
              <p className="text-white/50 leading-relaxed text-sm">
                {isTr ? faq.answerTr : faq.answerEn}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const [openId, setOpenId] = useState<string | null>('1')
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4"
          >
            {isTr ? '— Sık Sorulanlar —' : '— FAQ —'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-white"
          >
            {isTr ? (
              <>Merak ettiklerinizin <span className="text-amber-gradient">cevapları</span></>
            ) : (
              <>Answers to your <span className="text-amber-gradient">questions</span></>
            )}
          </motion.h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {mockFAQs.map((faq, i) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={i}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              isTr={isTr}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
