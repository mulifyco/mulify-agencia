import { Metadata } from 'next'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import LegalContent from '@/components/shared/legal-content'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Privacy Policy',
  description: 'Mulify gizlilik politikası — kişisel verilerinizi nasıl işlediğimizi öğrenin.',
}

const SECTIONS_TR = [
  { id: 'giris', title: 'Giriş' },
  { id: 'toplanan-veriler', title: 'Toplanan Veriler' },
  { id: 'kullanim-amaci', title: 'Kullanım Amacı' },
  { id: 'cerezler', title: 'Çerezler' },
  { id: 'ucuncu-taraflar', title: 'Üçüncü Taraflar' },
  { id: 'veri-guvenligi', title: 'Veri Güvenliği' },
  { id: 'haklariniz', title: 'Haklarınız' },
  { id: 'iletisim', title: 'İletişim' },
]

const SECTIONS_EN = [
  { id: 'giris', title: 'Introduction' },
  { id: 'toplanan-veriler', title: 'Data We Collect' },
  { id: 'kullanim-amaci', title: 'Purpose of Use' },
  { id: 'cerezler', title: 'Cookies' },
  { id: 'ucuncu-taraflar', title: 'Third Parties' },
  { id: 'veri-guvenligi', title: 'Data Security' },
  { id: 'haklariniz', title: 'Your Rights' },
  { id: 'iletisim', title: 'Contact' },
]

const CONTENT_TR = `
<section id="giris">
  <h2>Giriş</h2>
  <p>Mulify Dijital Ajans ("biz", "şirketimiz") olarak kişisel verilerinizin güvenliğine büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır.</p>
  <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz. Bu politikayı kabul ederek kişisel verilerinizin işlenmesine onay vermiş sayılırsınız.</p>
  <div class="info-box">Son güncelleme: 1 Ocak 2025</div>
</section>

<section id="toplanan-veriler">
  <h2>Toplanan Veriler</h2>
  <p>Sitemizi kullanmanız sırasında aşağıdaki kişisel veriler toplanabilir:</p>
  <h3>Doğrudan Sağladığınız Veriler</h3>
  <ul>
    <li><strong>Kimlik bilgileri:</strong> Ad, soyad</li>
    <li><strong>İletişim bilgileri:</strong> E-posta adresi, telefon numarası</li>
    <li><strong>Şirket bilgileri:</strong> Şirket adı, pozisyon</li>
    <li><strong>Proje bilgileri:</strong> Mesaj içeriği, bütçe aralığı, talep edilen hizmet</li>
  </ul>
  <h3>Otomatik Toplanan Veriler</h3>
  <ul>
    <li><strong>Teknik veriler:</strong> IP adresi, tarayıcı türü, işletim sistemi</li>
    <li><strong>Kullanım verileri:</strong> Ziyaret edilen sayfalar, sitede geçirilen süre, tıklama verileri</li>
    <li><strong>Çerez verileri:</strong> Oturum çerezleri, tercih çerezleri</li>
  </ul>
</section>

<section id="kullanim-amaci">
  <h2>Kullanım Amacı</h2>
  <p>Topladığımız kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:</p>
  <ul>
    <li>İletişim taleplerinize yanıt vermek ve proje teklifleri hazırlamak</li>
    <li>Sözleşme ilişkilerini yürütmek ve hizmet sunmak</li>
    <li>Kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek</li>
    <li>Yasal yükümlülükleri yerine getirmek</li>
    <li>Pazarlama ve tanıtım faaliyetleri (açık rızanız olması durumunda)</li>
    <li>Teknik destek ve müşteri hizmetleri sağlamak</li>
  </ul>
  <p>Kişisel verileriniz, bu politikada belirtilen amaçlar dışında kullanılmayacak ve üçüncü taraflarla paylaşılmayacaktır.</p>
</section>

<section id="cerezler">
  <h2>Çerezler</h2>
  <p>Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Çerezler, tarayıcınıza kaydedilen küçük metin dosyalarıdır.</p>
  <h3>Çerez Türleri</h3>
  <ul>
    <li><strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için gereklidir. Bu çerezler devre dışı bırakılamaz.</li>
    <li><strong>Analitik çerezler:</strong> Sitenin nasıl kullanıldığını anlamamıza yardımcı olur (Google Analytics).</li>
    <li><strong>Pazarlama çerezleri:</strong> Kişiselleştirilmiş reklamlar sunmak için kullanılır (açık rızanız dahilinde).</li>
    <li><strong>Tercih çerezleri:</strong> Dil ve tema tercihlerinizi hatırlamak için kullanılır.</li>
  </ul>
  <p>Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda bazı site özellikleri çalışmayabilir. Ayrıntılı bilgi için <a href="/cerez-politikasi">Çerez Politikamızı</a> inceleyiniz.</p>
</section>

<section id="ucuncu-taraflar">
  <h2>Üçüncü Taraflar</h2>
  <p>Hizmetlerimizi sağlamak için güvenilir üçüncü taraf hizmet sağlayıcılarıyla çalışmaktayız:</p>
  <ul>
    <li><strong>Google Analytics:</strong> Web sitesi trafiğini analiz etmek için kullanılır.</li>
    <li><strong>Supabase:</strong> Veritabanı ve kimlik doğrulama altyapısı sağlar.</li>
    <li><strong>Vercel:</strong> Web sitesi barındırma ve performans optimizasyonu.</li>
    <li><strong>Resend:</strong> E-posta iletişimi için kullanılır.</li>
  </ul>
  <p>Bu üçüncü tarafların kendi gizlilik politikaları bulunmaktadır ve verilerinizi kendi politikaları çerçevesinde işleyebilirler. Kişisel verilerinizi asla üçüncü taraflara satmıyor veya kiralamamaktayız.</p>
</section>

<section id="veri-guvenligi">
  <h2>Veri Güvenliği</h2>
  <p>Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri kullanmaktayız:</p>
  <ul>
    <li>SSL/TLS şifreleme ile güvenli veri iletimi</li>
    <li>Erişim kontrolü ve yetkilendirme sistemleri</li>
    <li>Düzenli güvenlik denetimleri</li>
    <li>Şifreli veritabanı depolama</li>
    <li>Veri yedekleme ve kurtarma prosedürleri</li>
  </ul>
  <p>Güvenlik ihlali durumunda KVKK'nın 12. maddesi gereğince yetkili kurumlara ve etkilenen kişilere bildirim yapılacaktır.</p>
</section>

<section id="haklariniz">
  <h2>Haklarınız</h2>
  <p>KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
  <ul>
    <li><strong>Bilgi edinme hakkı:</strong> Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
    <li><strong>Erişim hakkı:</strong> Kişisel verilerinize erişim talep etme</li>
    <li><strong>Düzeltme hakkı:</strong> Yanlış veya eksik verilerin düzeltilmesini talep etme</li>
    <li><strong>Silme hakkı:</strong> Kişisel verilerinizin silinmesini talep etme</li>
    <li><strong>İtiraz hakkı:</strong> Kişisel verilerinizin işlenmesine itiraz etme</li>
    <li><strong>Taşınabilirlik hakkı:</strong> Verilerinizin yapılandırılmış formatta teslimini talep etme</li>
  </ul>
  <p>Bu haklarınızı kullanmak için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz. Taleplerinize en geç 30 gün içinde yanıt verileceğiz.</p>
</section>

<section id="iletisim">
  <h2>İletişim</h2>
  <p>Gizlilik politikamız veya kişisel verilerinizle ilgili sorularınız için:</p>
  <div class="contact-card">
    <p><strong>Mulify Dijital Ajans</strong></p>
    <p>Levent, İstanbul, Türkiye</p>
    <p>E-posta: <a href="mailto:kvkk@mulify.co">kvkk@mulify.co</a></p>
    <p>Telefon: <a href="tel:+902120000000">+90 (212) 000 00 00</a></p>
  </div>
  <p>Kişisel Verileri Koruma Kurumu'na (KVKK) şikâyette bulunma hakkınız saklıdır.</p>
</section>
`

const CONTENT_EN = `
<section id="giris">
  <h2>Introduction</h2>
  <p>At Mulify Digital Agency ("we", "our company"), we take the security of your personal data very seriously. This Privacy Policy explains how we collect, use, and protect your personal data when you visit our website or use our services.</p>
  <p>We act as a data controller under the Personal Data Protection Law No. 6698 (KVKK) and GDPR. By accepting this policy, you consent to the processing of your personal data as described herein.</p>
  <div class="info-box">Last updated: January 1, 2025</div>
</section>

<section id="toplanan-veriler">
  <h2>Data We Collect</h2>
  <p>During your use of our website, the following personal data may be collected:</p>
  <h3>Data You Provide Directly</h3>
  <ul>
    <li><strong>Identity information:</strong> First and last name</li>
    <li><strong>Contact information:</strong> Email address, phone number</li>
    <li><strong>Company information:</strong> Company name, job title</li>
    <li><strong>Project information:</strong> Message content, budget range, requested service</li>
  </ul>
  <h3>Automatically Collected Data</h3>
  <ul>
    <li><strong>Technical data:</strong> IP address, browser type, operating system</li>
    <li><strong>Usage data:</strong> Pages visited, time spent on site, click data</li>
    <li><strong>Cookie data:</strong> Session cookies, preference cookies</li>
  </ul>
</section>

<section id="kullanim-amaci">
  <h2>Purpose of Use</h2>
  <p>The personal data we collect is used for the following purposes:</p>
  <ul>
    <li>Responding to contact requests and preparing project proposals</li>
    <li>Managing contractual relationships and delivering services</li>
    <li>Improving user experience and analyzing site performance</li>
    <li>Fulfilling legal obligations</li>
    <li>Marketing and promotional activities (with your explicit consent)</li>
    <li>Providing technical support and customer service</li>
  </ul>
  <p>Your personal data will not be used for purposes other than those stated in this policy, nor will it be shared with third parties beyond what is described here.</p>
</section>

<section id="cerezler">
  <h2>Cookies</h2>
  <p>Our website uses cookies to enhance user experience. Cookies are small text files saved to your browser.</p>
  <h3>Cookie Types</h3>
  <ul>
    <li><strong>Essential cookies:</strong> Required for basic site functionality. These cannot be disabled.</li>
    <li><strong>Analytics cookies:</strong> Help us understand how the site is used (Google Analytics).</li>
    <li><strong>Marketing cookies:</strong> Used to deliver personalized ads (with your explicit consent).</li>
    <li><strong>Preference cookies:</strong> Used to remember your language and theme preferences.</li>
  </ul>
  <p>You can disable cookies in your browser settings, though some site features may not function properly. For more detail, see our <a href="/cerez-politikasi">Cookie Policy</a>.</p>
</section>

<section id="ucuncu-taraflar">
  <h2>Third Parties</h2>
  <p>We work with trusted third-party service providers to deliver our services:</p>
  <ul>
    <li><strong>Google Analytics:</strong> Used to analyze website traffic.</li>
    <li><strong>Supabase:</strong> Provides database and authentication infrastructure.</li>
    <li><strong>Vercel:</strong> Website hosting and performance optimization.</li>
    <li><strong>Resend:</strong> Used for email communications.</li>
  </ul>
  <p>These third parties have their own privacy policies and may process your data under their own terms. We never sell or rent your personal data to third parties.</p>
</section>

<section id="veri-guvenligi">
  <h2>Data Security</h2>
  <p>We use industry-standard security measures to protect your personal data:</p>
  <ul>
    <li>SSL/TLS encryption for secure data transmission</li>
    <li>Access control and authorization systems</li>
    <li>Regular security audits</li>
    <li>Encrypted database storage</li>
    <li>Data backup and recovery procedures</li>
  </ul>
  <p>In the event of a security breach, notifications will be made to the relevant authorities and affected individuals as required by applicable law.</p>
</section>

<section id="haklariniz">
  <h2>Your Rights</h2>
  <p>Under KVKK Article 11 and GDPR, you have the following rights:</p>
  <ul>
    <li><strong>Right to information:</strong> Learn whether your personal data is being processed</li>
    <li><strong>Right of access:</strong> Request access to your personal data</li>
    <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data</li>
    <li><strong>Right to erasure:</strong> Request deletion of your personal data</li>
    <li><strong>Right to object:</strong> Object to the processing of your personal data</li>
    <li><strong>Right to portability:</strong> Request delivery of your data in a structured format</li>
  </ul>
  <p>To exercise these rights, contact us via the channels below. We will respond to requests within 30 days.</p>
</section>

<section id="iletisim">
  <h2>Contact</h2>
  <p>For questions about our privacy policy or your personal data:</p>
  <div class="contact-card">
    <p><strong>Mulify Digital Agency</strong></p>
    <p>Levent, Istanbul, Turkey</p>
    <p>Email: <a href="mailto:privacy@mulify.co">privacy@mulify.co</a></p>
    <p>Phone: <a href="tel:+902120000000">+90 (212) 000 00 00</a></p>
  </div>
  <p>You have the right to lodge a complaint with the Personal Data Protection Authority (KVKK) or your local data protection authority.</p>
</section>
`

export default async function PrivacyPage({
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
        titleTr="Gizlilik Politikası"
        titleEn="Privacy Policy"
        subtitleTr="Kişisel verilerinizi nasıl işlediğimizi öğrenin"
        subtitleEn="Learn how we handle your personal data"
        sections={isTr ? SECTIONS_TR : SECTIONS_EN}
        contentHtml={isTr ? CONTENT_TR : CONTENT_EN}
      />
      <Footer />
    </>
  )
}
