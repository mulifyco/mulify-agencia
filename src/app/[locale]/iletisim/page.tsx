import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import ContactClient from './contact-client'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'tr' ? 'İletişim' : 'Contact',
    description: locale === 'tr'
      ? 'Projeniz için teklif alın veya sorularınızı iletin. 24 saat içinde dönüş yapıyoruz.'
      : 'Get a quote for your project or send us your questions. We respond within 24 hours.',
  }
}

export default async function IletisimPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const { data: settings } = await db()
    .from('SiteSetting')
    .select('key,value')
    .in('key', ['contact_email', 'contact_phone', 'contact_address', 'social_linkedin', 'social_twitter', 'social_instagram'])

  const setting = (settings ?? []).reduce<Record<string, string>>((acc, s) => {
    acc[s.key] = s.value
    return acc
  }, {})

  return (
    <>
      <Navbar />
      <ContactClient locale={locale} setting={setting} />
      <Footer />
    </>
  )
}
