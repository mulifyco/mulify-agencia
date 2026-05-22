import { Metadata } from 'next'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import LegalContent from '@/components/shared/legal-content'

export const metadata: Metadata = {
  title: 'Kullanım Koşulları | Terms of Service',
  description: "Mulify hizmet kullanım koşulları — haklarınız ve yükümlülükleriniz.",
}

const SECTIONS_TR = [
  { id: 'hizmet-tanimi', title: 'Hizmet Tanımı' },
  { id: 'kullanim-kosullari', title: 'Kullanım Koşulları' },
  { id: 'odeme', title: 'Ödeme & Fiyatlandırma' },
  { id: 'fikri-mulkiyet', title: 'Fikri Mülkiyet' },
  { id: 'gizlilik', title: 'Gizlilik' },
  { id: 'sorumluluk-reddi', title: 'Sorumluluk Reddi' },
  { id: 'fesih', title: 'Fesih' },
  { id: 'uyusmazlik', title: 'Uyuşmazlık Çözümü' },
]

const SECTIONS_EN = [
  { id: 'hizmet-tanimi', title: 'Service Definition' },
  { id: 'kullanim-kosullari', title: 'Terms of Use' },
  { id: 'odeme', title: 'Payment & Pricing' },
  { id: 'fikri-mulkiyet', title: 'Intellectual Property' },
  { id: 'gizlilik', title: 'Privacy' },
  { id: 'sorumluluk-reddi', title: 'Disclaimer' },
  { id: 'fesih', title: 'Termination' },
  { id: 'uyusmazlik', title: 'Dispute Resolution' },
]

const CONTENT_TR = `
<section id="hizmet-tanimi">
  <h2>Hizmet Tanımı</h2>
  <p>Mulify Dijital Ajans ("Mulify", "şirket") olarak web tasarım, web geliştirme, dijital pazarlama, marka kimliği ve e-ticaret çözümleri dahil olmak üzere kapsamlı dijital hizmetler sunmaktayız.</p>
  <p>Bu Kullanım Koşulları, web sitemizi (mulify.co) ziyaret ettiğinizde veya hizmetlerimizden yararlandığınızda geçerlidir. Hizmetlerimizi kullanarak bu koşulları kabul etmiş sayılırsınız.</p>
  <div class="info-box">Son güncelleme: 1 Ocak 2025 · Türkiye Cumhuriyeti hukuku uygulanır</div>
</section>

<section id="kullanim-kosullari">
  <h2>Kullanım Koşulları</h2>
  <p>Sitemizi ve hizmetlerimizi kullanırken aşağıdaki kurallara uymakla yükümlüsünüz:</p>
  <h3>İzin Verilenler</h3>
  <ul>
    <li>Sitemizi kişisel ve ticari amaçlarla bilgi edinmek için kullanmak</li>
    <li>İletişim formu aracılığıyla proje talebi iletmek</li>
    <li>Portföy çalışmalarımızı incelemek ve referans almak</li>
  </ul>
  <h3>Yasaklanan Kullanımlar</h3>
  <ul>
    <li>Sitemizin içeriklerini izin almaksızın kopyalamak veya dağıtmak</li>
    <li>Otomatik araçlarla site verilerini toplamak (scraping)</li>
    <li>Sistemlerimizi aşırı yüklemeye yönelik istekler göndermek</li>
    <li>Zararlı yazılım, spam veya sahte içerik iletmek</li>
    <li>Başkalarını temsil ederek form doldurmak</li>
    <li>Yasalara aykırı herhangi bir amaçla kullanmak</li>
  </ul>
</section>

<section id="odeme">
  <h2>Ödeme & Fiyatlandırma</h2>
  <p>Mulify hizmetlerine ilişkin ödeme koşulları proje sözleşmesinde ayrıca belirlenmektedir. Genel ilkelerimiz aşağıdaki gibidir:</p>
  <ul>
    <li><strong>Avans:</strong> Projeler genellikle %50 peşinat ile başlatılır.</li>
    <li><strong>Ara ödemeler:</strong> Büyük projelerde dönüm noktalarına göre ara ödemeler yapılır.</li>
    <li><strong>Teslim ödemesi:</strong> Kalan bakiye proje tesliminde ödenir.</li>
    <li><strong>Ödeme yöntemleri:</strong> Banka havalesi, EFT ve uluslararası havale kabul edilir.</li>
    <li><strong>Fatura:</strong> Ödemeler karşılığında yasal fatura düzenlenir.</li>
  </ul>
  <p>Ödeme gecikmesi durumunda, gecikilen süre için aylık %2 gecikme faizi uygulanabilir. Proje tamamlandıktan sonra yapılacak değişiklikler için ek ücret talep edilebilir.</p>
</section>

<section id="fikri-mulkiyet">
  <h2>Fikri Mülkiyet</h2>
  <p>Web sitemizin tüm içeriği — tasarımlar, kodlar, metinler, görseller, logolar — Mulify'ın fikri mülkiyetidir ve Türk Fikir ve Sanat Eserleri Kanunu ile uluslararası telif hukuku kapsamında korunmaktadır.</p>
  <h3>Proje Teslimatları</h3>
  <p>Proje tamamlandığında ve tüm ödemeler yapıldığında, teslimat kapsamındaki çalışmaların fikri mülkiyet hakları müşteriye devredilir. Aşağıdaki istisnalar geçerlidir:</p>
  <ul>
    <li>Üçüncü taraf yazılım lisansları (açık kaynak kütüphaneler vb.) kendi lisans koşullarına tabidir.</li>
    <li>Mulify, genel ticari portföyünde projeyi referans olarak gösterme hakkını saklı tutar.</li>
    <li>Geliştirme sürecinde kullanılan dahili araçlar ve metodolojiler Mulify mülkiyetinde kalır.</li>
  </ul>
</section>

<section id="gizlilik">
  <h2>Gizlilik</h2>
  <p>Kişisel verilerinizi Gizlilik Politikamız doğrultusunda işliyoruz. Proje sürecinde paylaşılan iş bilgileri gizli tutulur ve üçüncü taraflarla paylaşılmaz.</p>
  <p>Projenizle ilgili NDA (Gizlilik Sözleşmesi) talep etmeniz durumunda ayrı bir sözleşme düzenlenebilir. Ayrıntılı bilgi için <a href="/gizlilik">Gizlilik Politikamızı</a> inceleyiniz.</p>
</section>

<section id="sorumluluk-reddi">
  <h2>Sorumluluk Reddi</h2>
  <p>Hizmetlerimizi mümkün olan en yüksek kalitede sunmak için çaba göstermekle birlikte, aşağıdaki konularda sınırlı sorumluluğumuz bulunmaktadır:</p>
  <ul>
    <li>Üçüncü taraf platform veya hizmetlerden kaynaklanan kesintiler (hosting, domain, CDN vb.)</li>
    <li>Müşterinin sağladığı hatalı bilgi veya içerikten kaynaklanan sorunlar</li>
    <li>Sitenin kullanımından elde edilecek belirli bir gelir veya dönüşüm garantisi</li>
    <li>Mücbir sebep durumları (doğal afet, salgın, savaş vb.)</li>
  </ul>
  <p>Herhangi bir zararın oluşması durumunda azami sorumluluğumuz, söz konusu proje için ödenen toplam bedel ile sınırlıdır.</p>
</section>

<section id="fesih">
  <h2>Fesih</h2>
  <p>Her iki taraf da proje sözleşmesini belirli koşullar altında feshedebilir:</p>
  <h3>Müşteri Tarafından Fesih</h3>
  <ul>
    <li>Proje başlamadan önce: Ödenen avansın %50'si iade edilir.</li>
    <li>Proje devam ederken: Tamamlanan iş oranında ücret tahsil edilir, kalan avans iade edilir.</li>
    <li>Proje bitmek üzereyken (%80+): Tam proje ücreti tahsil edilir.</li>
  </ul>
  <h3>Mulify Tarafından Fesih</h3>
  <p>Ödeme yükümlülüklerinin yerine getirilmemesi veya sözleşme koşullarının ihlali halinde projeyi durdurma ve sözleşmeyi feshetme hakkımızı saklı tutarız.</p>
</section>

<section id="uyusmazlik">
  <h2>Uyuşmazlık Çözümü</h2>
  <p>Bu koşullardan kaynaklanan anlaşmazlıkların çözümünde öncelikle dostane müzakere yöntemi benimsenir. Tarafların 30 gün içinde anlaşamaması durumunda:</p>
  <ul>
    <li>Türk hukuku uygulanır.</li>
    <li>İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Müdürlükleri yetkilidir.</li>
    <li>Yargıya başvurmadan önce İstanbul Ticaret Odası tahkimi tercih edilebilir.</li>
  </ul>
  <p>Sorularınız için <a href="/iletisim">iletişim sayfamızı</a> ziyaret edebilirsiniz.</p>
</section>
`

const CONTENT_EN = `
<section id="hizmet-tanimi">
  <h2>Service Definition</h2>
  <p>Mulify Digital Agency ("Mulify", "the company") provides comprehensive digital services including web design, web development, digital marketing, brand identity, and e-commerce solutions.</p>
  <p>These Terms of Service apply when you visit our website (mulify.co) or use our services. By using our services, you agree to these terms.</p>
  <div class="info-box">Last updated: January 1, 2025 · Governed by Turkish law</div>
</section>

<section id="kullanim-kosullari">
  <h2>Terms of Use</h2>
  <p>When using our website and services, you agree to the following rules:</p>
  <h3>Permitted Uses</h3>
  <ul>
    <li>Using our website for personal and commercial information purposes</li>
    <li>Submitting project requests via the contact form</li>
    <li>Reviewing our portfolio work and using it as a reference</li>
  </ul>
  <h3>Prohibited Uses</h3>
  <ul>
    <li>Copying or distributing our site content without permission</li>
    <li>Automated data collection (scraping) from our site</li>
    <li>Sending requests intended to overload our systems</li>
    <li>Transmitting malware, spam, or false content</li>
    <li>Submitting forms while impersonating others</li>
    <li>Any use contrary to applicable laws</li>
  </ul>
</section>

<section id="odeme">
  <h2>Payment & Pricing</h2>
  <p>Payment terms for Mulify services are defined in individual project agreements. Our general principles are:</p>
  <ul>
    <li><strong>Deposit:</strong> Projects typically begin with a 50% upfront payment.</li>
    <li><strong>Milestone payments:</strong> Larger projects may have milestone-based interim payments.</li>
    <li><strong>Delivery payment:</strong> The remaining balance is due upon project delivery.</li>
    <li><strong>Payment methods:</strong> Bank transfer, EFT, and international wire accepted.</li>
    <li><strong>Invoicing:</strong> Legal invoices are issued for all payments.</li>
  </ul>
  <p>Late payments may incur a monthly 2% late fee. Additional charges may apply for changes requested after project completion.</p>
</section>

<section id="fikri-mulkiyet">
  <h2>Intellectual Property</h2>
  <p>All content on our website — designs, code, text, images, and logos — is the intellectual property of Mulify and is protected under Turkish Copyright Law and international copyright law.</p>
  <h3>Project Deliverables</h3>
  <p>Upon project completion and full payment, intellectual property rights for the deliverables are transferred to the client. The following exceptions apply:</p>
  <ul>
    <li>Third-party software licenses (open-source libraries, etc.) are subject to their own terms.</li>
    <li>Mulify retains the right to reference the project in its commercial portfolio.</li>
    <li>Internal tools and methodologies used during development remain Mulify property.</li>
  </ul>
</section>

<section id="gizlilik">
  <h2>Privacy</h2>
  <p>We process your personal data in accordance with our Privacy Policy. Business information shared during the project is kept confidential and not shared with third parties.</p>
  <p>If you require an NDA (Non-Disclosure Agreement) for your project, a separate agreement can be arranged. For details, see our <a href="/gizlilik">Privacy Policy</a>.</p>
</section>

<section id="sorumluluk-reddi">
  <h2>Disclaimer</h2>
  <p>While we strive to deliver the highest quality services, our liability is limited in the following areas:</p>
  <ul>
    <li>Outages originating from third-party platforms or services (hosting, domain, CDN, etc.)</li>
    <li>Issues arising from incorrect information or content provided by the client</li>
    <li>Guarantees of specific revenue or conversion outcomes from the website</li>
    <li>Force majeure events (natural disasters, pandemics, war, etc.)</li>
  </ul>
  <p>In the event of any claim, our maximum liability is limited to the total amount paid for the relevant project.</p>
</section>

<section id="fesih">
  <h2>Termination</h2>
  <p>Either party may terminate the project agreement under certain conditions:</p>
  <h3>Client-Initiated Termination</h3>
  <ul>
    <li>Before project begins: 50% of the paid deposit is refunded.</li>
    <li>During the project: Fees are charged proportionally to work completed; remaining deposit is refunded.</li>
    <li>Near project completion (80%+): Full project fee is charged.</li>
  </ul>
  <h3>Mulify-Initiated Termination</h3>
  <p>We reserve the right to suspend work and terminate the contract in case of non-payment or breach of contract terms.</p>
</section>

<section id="uyusmazlik">
  <h2>Dispute Resolution</h2>
  <p>Disputes arising from these terms shall first be resolved through good-faith negotiation. If parties fail to reach an agreement within 30 days:</p>
  <ul>
    <li>Turkish law shall apply.</li>
    <li>Istanbul Central (Çağlayan) Courts and Enforcement Offices have jurisdiction.</li>
    <li>Istanbul Chamber of Commerce arbitration may be preferred before judicial proceedings.</li>
  </ul>
  <p>For questions, visit our <a href="/iletisim">contact page</a>.</p>
</section>
`

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isTr = locale === 'tr'

  return (
    <>
      <Navbar />
      <LegalContent
        locale={locale}
        titleTr="Kullanım Koşulları"
        titleEn="Terms of Service"
        subtitleTr="Hizmetlerimizi kullanırken geçerli olan koşullar"
        subtitleEn="Terms that apply when using our services"
        sections={isTr ? SECTIONS_TR : SECTIONS_EN}
        contentHtml={isTr ? CONTENT_TR : CONTENT_EN}
      />
      <Footer />
    </>
  )
}
