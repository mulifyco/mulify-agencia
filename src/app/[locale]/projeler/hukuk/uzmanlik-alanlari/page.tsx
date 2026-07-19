import PageHeader from '@/components/demos/hukuk/page-header'
import PracticeCard from '@/components/demos/hukuk/practice-card'
import { HUKUK_PRACTICES } from '@/data/demos/hukuk'

export default function HukukPracticesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Uzmanlık Alanları"
        title="İşlem yoğunluğu yüksek şirketler için tasarlanmış hukuk hizmetleri"
        description="M&A, tahkim, finansman, uyum ve gayrimenkul odaklı practice yapısı; büyük hukuk bürosu hissini taşıyan ana omurgayı kurar."
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3 lg:px-8">
          {HUKUK_PRACTICES.map((practice) => (
            <PracticeCard key={practice.slug} practice={practice} />
          ))}
        </div>
      </section>
    </>
  )
}

