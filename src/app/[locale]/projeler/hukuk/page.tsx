import Link from '@/components/themes/theme-link'
import PracticeCard from '@/components/demos/hukuk/practice-card'
import LawyerCard from '@/components/demos/hukuk/lawyer-card'
import InsightCard from '@/components/demos/hukuk/insight-card'
import ResultCard from '@/components/demos/hukuk/result-card'
import SectionHeading from '@/components/demos/hukuk/section-heading'
import {
  HUKUK_DEMO,
  HUKUK_OFFICES,
  HUKUK_PRACTICES,
  HUKUK_RESULTS,
} from '@/data/demos/hukuk'
import { getHukukGallery, getHukukPosts, getHukukSite, getHukukTeam } from './_data'

export const dynamic = 'force-dynamic'

export default async function HukukHomePage() {
  const [site, gallery, team, posts] = await Promise.all([
    getHukukSite(),
    getHukukGallery(),
    getHukukTeam(),
    getHukukPosts(),
  ])

  const accent = site.primaryColor ?? HUKUK_DEMO.accent

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#e9ded5] bg-[#f7f2ec]">
        <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
          <img src={site.heroImage ?? gallery[0]?.url} alt={site.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f2ec] via-[#f7f2ec]/74 to-transparent" />
        </div>
        <div className="absolute left-[-8rem] top-16 h-80 w-80 rounded-full blur-3xl" style={{ background: `${accent}18` }} />

        <div className="relative mx-auto grid min-h-[calc(100vh-118px)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.34em]" style={{ color: accent }}>
              {HUKUK_DEMO.badge}
            </div>
            <h1 className="mt-8 font-playfair text-5xl font-bold leading-[1.02] text-[#16120f] md:text-6xl lg:text-7xl">
              {site.heroTitle ?? HUKUK_DEMO.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#625851]">
              {site.heroSubtitle ?? HUKUK_DEMO.heroSummary}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#16120f]">
              <div className="rounded-full bg-white px-4 py-2">Kuruluş: {HUKUK_DEMO.established}</div>
              <div className="rounded-full bg-white px-4 py-2">Odak: Cross-border, disputes, regulation</div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/projeler/hukuk/iletisim" className="inline-flex items-center justify-center rounded-full bg-[#16120f] px-7 py-3.5 text-sm font-semibold text-[#f7f2ec]">
                {site.heroCtaText ?? 'Partner Ekiple Görüşün'}
              </Link>
              <Link href="/projeler/hukuk/uzmanlik-alanlari" className="inline-flex items-center justify-center rounded-full border border-[#dfd2c7] bg-white px-7 py-3.5 text-sm font-semibold text-[#16120f]">
                Uzmanlık Alanlarını İncele
              </Link>
            </div>
          </div>

          <div className="grid gap-4 lg:pl-12">
            <div className="rounded-[2rem] border border-[#e4d7cb] bg-white p-6">
              <div className="text-[11px] uppercase tracking-[0.32em]" style={{ color: accent }}>Yaklaşım</div>
              <div className="mt-3 font-playfair text-3xl text-[#16120f]">Yönetim kuruluna konuşan hukuk dili</div>
              <p className="mt-4 text-sm leading-7 text-[#625851]">
                Teknik doğruluk, ticari sezgi ve itibar yönetimini aynı anlatı içinde birleştiren kurumsal hukuk sunumu.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-[#16120f] p-6 text-[#f7f2ec]">
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#d9c1ab]">Sektörler</div>
                <div className="mt-3 font-playfair text-2xl">İşlem ve uyuşmazlık dengesi</div>
              </div>
              <div className="rounded-[1.75rem] bg-white p-6">
                <div className="text-[11px] uppercase tracking-[0.28em]" style={{ color: accent }}>Kapsam</div>
                <div className="mt-3 font-playfair text-2xl text-[#16120f]">Türkiye ve bölgesel koordinasyon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e9ded5] bg-white py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4 lg:px-8">
          {HUKUK_DEMO.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-playfair text-3xl text-[#16120f] md:text-4xl">{stat.value}</div>
              <div className="mt-2 text-sm text-[#6f655d]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fcf8f4] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Uzmanlık Alanları"
            title="Büyük ölçekli hukuki ihtiyaçlar için yapılandırılmış hizmet omurgası"
            description="Gerçek büyük hukuk bürosu sitelerinde öne çıkan practice-led yapı burada da merkezde durur; her başlık detay sayfasına açılır."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {HUKUK_PRACTICES.map((practice) => (
              <PracticeCard key={practice.slug} practice={practice} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e9ded5] bg-[#f7f2ec] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Sektör Odağı"
            title="Sadece mevzuatı değil, sektör dinamiklerini de anlayan hukuk yaklaşımı"
            description="Enerji, teknoloji, finans ve gayrimenkul başlıklarında ticari bağlamı güçlü bir sunum dili kurar."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {HUKUK_DEMO.sectors.map((sector) => (
              <div key={sector} className="rounded-[1.6rem] border border-[#e4d7cb] bg-white p-6 font-playfair text-2xl text-[#16120f]">
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Temsil Sonuçları"
              title="Yüksek riskli dosyalarda güven veren temsil anlatısı"
              description="Büyük bürolar için en önemli güven unsurlarından biri; görünür biçimde yapılandırılmış matter ve outcome sunumudur."
            />
            <Link href="/projeler/hukuk/sonuclar" className="hidden text-sm font-semibold text-[#16120f] lg:block">
              Tüm sonuçları gör
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {HUKUK_RESULTS.map((result) => (
              <ResultCard key={result.title} result={result} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#16120f] py-20 text-[#f7f2ec]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.34em] text-[#c5a789]">Liderlik Ekibi</div>
            <h2 className="mt-4 font-playfair text-3xl font-bold leading-tight text-[#f7f2ec] md:text-4xl">
              Müvekkil ilişkisinde partner seviyesinde güven
            </h2>
            <p className="mt-4 text-base leading-8 text-[#d6cbc2]">
              Takım derinliği, büyük hukuk bürolarında karar vericilerin baktığı ilk başlıklardan biridir.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {team.slice(0, 4).map((member) => (
              <LawyerCard key={member.id} lawyer={{ name: member.name, role: member.role, bio: member.bio ?? '' }} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2ec] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ofisler"
            title="Karar merkezlerine yakın, sektörlere göre konumlanan ofis ağı"
            description="Lokasyon katmanı; büyük ölçekli hukuk bürolarının kurumsal güven hissini güçlendirir."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {HUKUK_OFFICES.map((office, index) => (
              <div key={office.city} className={index === 0 ? 'lg:col-span-2' : ''}>
                <div className="overflow-hidden rounded-[1.8rem] border border-[#e9ded5] bg-white">
                  {gallery[index] && <img src={gallery[index].url} alt={gallery[index].caption ?? office.city} className="h-64 w-full object-cover" />}
                  <div className="p-7">
                    <div className="text-[11px] uppercase tracking-[0.34em] text-[#8c6a4a]">{office.label}</div>
                    <h3 className="mt-4 font-playfair text-3xl font-bold text-[#16120f]">{office.city}</h3>
                    <div className="mt-3 text-sm font-medium text-[#3d352f]">{office.address}</div>
                    <p className="mt-4 text-sm leading-7 text-[#625851]">{office.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Yayınlar ve İçgörüler"
              title="Piyasa ve regülasyon gelişmelerini taşıyan içerik katmanı"
              description="White & Case, Linklaters ve benzeri büyük bürolarda olduğu gibi insight katmanı güven ve uzmanlık sinyali üretir."
            />
            <Link href="/projeler/hukuk/yayinlar" className="hidden text-sm font-semibold text-[#16120f] lg:block">
              Tüm yayınları gör
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {posts.slice(0, 3).map((post, index) => (
              <InsightCard
                key={post.id}
                insight={{
                  slug: `insight-${index}`,
                  title: post.title,
                  excerpt: post.excerpt ?? '',
                  category: index === 0 ? 'Kurumsal' : index === 1 ? 'Uyum' : 'Uyuşmazlık',
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
