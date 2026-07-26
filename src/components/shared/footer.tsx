import { unstable_noStore as noStore } from 'next/cache'
import { getPublicSetting } from '@/lib/public-content'
import FooterClient from './footer-client'

export default async function Footer() {
  noStore()
  const contactPhone = await getPublicSetting('contact_phone')

  return <FooterClient contactPhone={contactPhone} />
}
