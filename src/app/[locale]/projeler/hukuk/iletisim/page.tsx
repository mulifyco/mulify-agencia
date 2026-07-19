import HukukContactForm from '@/components/themes/hukuk/hukuk-contact-form'
import PageHeader from '@/components/demos/hukuk/page-header'
import { getHukukSite } from '../_data'

export const dynamic = 'force-dynamic'

export default async function HukukContactPage() {
  const site = await getHukukSite()

  return (
    <>
      <PageHeader
        eyebrow="İletişim"
        title="Yeni işlem, dava veya regülasyon gündeminiz için doğrudan partner ekiple bağlantı"
        description="Kurumsal müvekkil temasını güçlendiren net iletişim ve görüşme talebi akışı."
      />

      <section className="bg-[#f7f2ec] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-[2rem] border border-[#e4d7cb] bg-white p-8">
            <div className="text-[11px] uppercase tracking-[0.34em] text-[#8c6a4a]">İletişim Bilgileri</div>
            <div className="mt-5 space-y-5 text-sm leading-7 text-[#3d352f]">
              <div>
                <div className="font-semibold text-[#16120f]">E-posta</div>
                <div>{site.contactEmail}</div>
              </div>
              <div>
                <div className="font-semibold text-[#16120f]">Telefon</div>
                <div>{site.contactPhone}</div>
              </div>
              <div>
                <div className="font-semibold text-[#16120f]">Adres</div>
                <div>{site.contactAddress}</div>
              </div>
            </div>
          </div>
          <HukukContactForm />
        </div>
      </section>
    </>
  )
}
