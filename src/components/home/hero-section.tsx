import { getLocale } from 'next-intl/server'
import HeroCarousel from './hero-carousel'

export default async function HeroSection() {
  const locale = await getLocale()
  return <HeroCarousel locale={locale} />
}
