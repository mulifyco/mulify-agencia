import { getLocale } from 'next-intl/server'
import HeroStatic from './hero-static'

export default async function HeroSection() {
  const locale = await getLocale()
  return <HeroStatic locale={locale} />
}
