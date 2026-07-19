import PageHeader from '@/components/demos/hukuk/page-header'
import OfficeCard from '@/components/demos/hukuk/office-card'
import { HUKUK_OFFICES } from '@/data/demos/hukuk'

export default function HukukOfficesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ofisler"
        title="Karar merkezlerine yakın, sektör ihtiyacına göre konumlanmış ofisler"
        description="Fiziksel erişim ve coğrafi görünürlük; büyük ölçekli hukuk markalarında güven üretiminin parçasıdır."
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3 lg:px-8">
          {HUKUK_OFFICES.map((office) => (
            <OfficeCard key={office.city} office={office} />
          ))}
        </div>
      </section>
    </>
  )
}

