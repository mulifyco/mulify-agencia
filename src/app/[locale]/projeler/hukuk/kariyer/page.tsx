import PageHeader from '@/components/demos/hukuk/page-header'

export default function HukukCareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kariyer"
        title="Teknik derinlik, işbirliği ve uzun vadeli gelişim kültürü"
        description="Büyük hukuk bürosu algısını tamamlayan önemli bir katman da kariyer ve kurum kültürü anlatısıdır."
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              title: 'Associate gelişim hattı',
              body: 'Sektör bazlı dosya deneyimi, partner mentorluk yapısı ve çok disiplinli eğitim akışlarıyla desteklenir.',
            },
            {
              title: 'Cross-office işbirliği',
              body: 'İstanbul merkezli dosyalar, Ankara regülasyon ve bölgesel temsil ekipleriyle birlikte yürütülür.',
            },
            {
              title: 'Kurumsal kalite standardı',
              body: 'Yazılı iş üretim kalitesi, müvekkil iletişimi ve iç denetim süreçleri ortak metodolojiyle ilerler.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.8rem] border border-[#e9ded5] bg-[#f7f2ec] p-7">
              <h3 className="font-playfair text-2xl font-bold text-[#16120f]">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#625851]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

