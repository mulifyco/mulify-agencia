import { notFound } from 'next/navigation'
import PageHeader from '@/components/demos/hukuk/page-header'
import { HUKUK_PRACTICES } from '@/data/demos/hukuk'

export default async function HukukPracticeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const practice = HUKUK_PRACTICES.find((item) => item.slug === slug)

  if (!practice) notFound()

  return (
    <>
      <PageHeader
        eyebrow="Practice Detail"
        title={practice.title}
        description={practice.short}
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.34em] text-[#8c6a4a]">Genel Bakış</div>
            <p className="mt-5 text-lg leading-8 text-[#3d352f]">{practice.overview}</p>
          </div>
          <div className="rounded-[2rem] border border-[#e9ded5] bg-[#f7f2ec] p-8">
            <div className="text-[11px] uppercase tracking-[0.34em] text-[#8c6a4a]">Kabiliyetler</div>
            <div className="mt-5 flex flex-wrap gap-3">
              {practice.capabilities.map((item) => (
                <span key={item} className="rounded-full border border-[#decec0] bg-white px-4 py-2 text-sm text-[#3d352f]">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 text-[11px] uppercase tracking-[0.34em] text-[#8c6a4a]">Sektörler</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {practice.sectors.map((sector) => (
                <span key={sector} className="rounded-full bg-[#16120f] px-4 py-2 text-sm text-[#f7f2ec]">
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

