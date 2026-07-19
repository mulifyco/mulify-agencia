import type { Metadata } from 'next'
import type { ThemeSite } from '@/lib/db-types'
import HukukNavbar from '@/components/themes/hukuk/hukuk-navbar'
import HukukFooter from '@/components/themes/hukuk/hukuk-footer'
import { HUKUK_DEMO } from '@/data/demos/hukuk'
import { db, HUKUK_FALLBACK_SITE } from './_data'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await (await db()).from('ThemeSite').select('metaTitle,metaDesc,name').eq('slug', 'hukuk').single()
  const name = data?.name ?? HUKUK_FALLBACK_SITE.name ?? HUKUK_DEMO.firmName

  return {
    title: {
      default: data?.metaTitle ?? HUKUK_FALLBACK_SITE.metaTitle ?? name,
      template: `%s | ${name}`,
    },
    description: data?.metaDesc ?? HUKUK_FALLBACK_SITE.metaDesc ?? undefined,
  }
}

export default async function HukukLayout({ children }: { children: React.ReactNode }) {
  const { data: site } = await (await db()).from('ThemeSite').select('*').eq('slug', 'hukuk').single()

  return (
    <div className="min-h-screen bg-[#f7f2ec] text-[#16120f]">
      <HukukNavbar site={site as ThemeSite | null} />
      <main className="pt-[76px] lg:pt-[118px]">{children}</main>
      <HukukFooter site={site as ThemeSite | null} />
    </div>
  )
}

