'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { HomeReveal } from './home-reveal'

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
  isTr,
}: {
  item: { id: string; question: React.ReactNode; answer: React.ReactNode }
  index: number
  isOpen: boolean
  onToggle: () => void
  isTr: boolean
}) {
  return (
    <HomeReveal delay={index * 80} duration={500}>
      <div
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
          {item.question}
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
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </HomeReveal>
  )
}

export default function FAQAccordion({ locale, items }: { locale: string; items: { id: string; question: React.ReactNode; answer: React.ReactNode }[] }) {
  const isTr = locale === 'tr'
  const [openId, setOpenId] = useState<string | null>('1')

  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <HomeReveal as="p"
            className="text-xs uppercase tracking-[0.3em] text-[#F5A623] mb-4"
          >
            {isTr ? '— Sık Sorulanlar —' : '— FAQ —'}
          </HomeReveal>
          <HomeReveal as="h2" duration={700} delay={100}
            className="font-playfair text-4xl md:text-5xl font-bold text-white"
          >
            {isTr ? (
              <>Merak ettiklerinizin <span className="text-amber-gradient">cevapları</span></>
            ) : (
              <>Answers to your <span className="text-amber-gradient">questions</span></>
            )}
          </HomeReveal>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <FAQItem
              key={item.id}
              item={item}
              index={i}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              isTr={isTr}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
