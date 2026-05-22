import { getFAQs } from '../actions'
import FAQClient from './faq-client'

export default async function FAQPage() {
  const faqs = await getFAQs()
  return <FAQClient initialFAQs={faqs} />
}
