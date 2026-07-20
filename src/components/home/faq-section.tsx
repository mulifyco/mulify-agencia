import { getLocale } from 'next-intl/server'
import FAQAccordion from './faq-accordion'
import { mockFAQs } from '@/lib/mock-data'

export default async function FAQSection() {
  const locale = await getLocale()
  const isTr = locale === 'tr'
  const items = mockFAQs.map((faq) => ({
    id: faq.id,
    question: <>{isTr ? faq.questionTr : faq.questionEn}</>,
    answer: <p className="text-white/50 leading-relaxed text-sm">{isTr ? faq.answerTr : faq.answerEn}</p>,
  }))
  return <FAQAccordion locale={locale} items={items} />
}
