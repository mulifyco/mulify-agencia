import { createServiceRoleClient } from '@/lib/supabase-server'
import type { Metadata } from 'next'
import type { ThemeSite } from '@/lib/db-types'
import OkulNavbar from '@/components/themes/okul/okul-navbar'
import OkulFooter from '@/components/themes/okul/okul-footer'
import { OKUL_FALLBACK_SITE } from '@/components/themes/okul/okul-theme'

function db() {
  return createServiceRoleClient()
}

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await (await db())
.from('ThemeSite')
    .select('metaTitle,metaDesc,name')
    .eq('slug', 'okul')
    .single()

  return {
    title: {
      default: data?.metaTitle ?? data?.name ?? 'Okul',
      template: `%s | ${data?.name ?? 'Okul'}`,
    },
    description: data?.metaDesc ?? undefined,
  }
}

export default async function OkulLayout({ children }: { children: React.ReactNode }) {
  const { data: site } = await (await db())
.from('ThemeSite')
    .select('*')
    .eq('slug', 'okul')
    .single()

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <OkulNavbar site={(site as ThemeSite | null) ?? OKUL_FALLBACK_SITE} />
      <main className="flex-1">{children}</main>
      <OkulFooter site={(site as ThemeSite | null) ?? OKUL_FALLBACK_SITE} />
    </div>
  )
}
