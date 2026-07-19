import PageHeader from '@/components/demos/hukuk/page-header'
import SectionHeading from '@/components/demos/hukuk/section-heading'
import { HUKUK_DEMO } from '@/data/demos/hukuk'
import { getHukukSite } from '../_data'

export const dynamic = 'force-dynamic'

export default async function HukukAboutPage() {
  const site = await getHukukSite()

  return (
    <>
      <PageHeader
        eyebrow="Hakkımızda"
        title="Büyük karar anlarında, müvekkilin yanında duran kurumsal hukuk partneri"
        description="İşlem, uyuşmazlık ve uyum başlıklarını ayrı departmanlar olarak değil; tek bir stratejik çerçeve içinde ele alan premium hukuk bürosu kurgusu."
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Vizyon"
              title="Teknik doğruluğu, karar kalitesine dönüştürmek"
              description={site.aboutVizyon ?? ''}
            />
          </div>
          <div className="rounded-[2rem] border border-[#e9ded5] bg-[#f7f2ec] p-8">
            <div className="text-[11px] uppercase tracking-[0.34em] text-[#8c6a4a]">Misyon</div>
            <p className="mt-5 text-base leading-8 text-[#3d352f]">{site.aboutMisyon}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e9ded5] bg-[#f7f2ec] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Fark Yaratanlar"
            title="Kurumsal müvekkilin baktığı güven sinyalleri"
            description="Kurumsal hukuk bürosu sitesinin sadece şık değil, ikna edici de olması gerekir."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {HUKUK_DEMO.differentiators.map((item) => (
              <div key={item.title} className="rounded-[1.8rem] border border-[#e4d7cb] bg-white p-7">
                <h3 className="font-playfair text-2xl font-bold text-[#16120f]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#625851]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

