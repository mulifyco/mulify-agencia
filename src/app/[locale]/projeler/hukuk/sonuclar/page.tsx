import PageHeader from '@/components/demos/hukuk/page-header'
import ResultCard from '@/components/demos/hukuk/result-card'
import { HUKUK_RESULTS } from '@/data/demos/hukuk'

export default function HukukResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Temsil Sonuçları"
        title="Yüksek baskı altındaki dosyalarda net sonuç dili"
        description="Gerçek büyük hukuk büroları gibi, matter anlatısını güven üretici fakat ölçülü bir dille sunan sonuç sayfası."
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3 lg:px-8">
          {HUKUK_RESULTS.map((result) => (
            <ResultCard key={result.title} result={result} />
          ))}
        </div>
      </section>
    </>
  )
}

