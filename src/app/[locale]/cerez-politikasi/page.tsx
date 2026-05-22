import { Metadata } from 'next'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import LegalContent from '@/components/shared/legal-content'

export const metadata: Metadata = {
  title: 'Çerez Politikası | Cookie Policy',
  description: 'Mulify çerez politikası — hangi çerezleri kullandığımızı ve nasıl yönetebileceğinizi öğrenin.',
}

const SECTIONS_TR = [
  { id: 'cerez-nedir', title: 'Çerez Nedir?' },
  { id: 'cerez-turleri', title: 'Çerez Türleri' },
  { id: 'kullandigimiz-cerezler', title: 'Kullandığımız Çerezler' },
  { id: 'ucuncu-taraf-cerezler', title: 'Üçüncü Taraf Çerezleri' },
  { id: 'cerez-yonetimi', title: 'Çerez Yönetimi' },
  { id: 'iletisim', title: 'İletişim' },
]

const SECTIONS_EN = [
  { id: 'cerez-nedir', title: 'What Are Cookies?' },
  { id: 'cerez-turleri', title: 'Cookie Types' },
  { id: 'kullandigimiz-cerezler', title: 'Cookies We Use' },
  { id: 'ucuncu-taraf-cerezler', title: 'Third-Party Cookies' },
  { id: 'cerez-yonetimi', title: 'Cookie Management' },
  { id: 'iletisim', title: 'Contact' },
]

const CONTENT_TR = `
<section id="cerez-nedir">
  <h2>Çerez Nedir?</h2>
  <p>Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Web siteleri bu dosyaları kullanıcıları tanımak, tercihlerini hatırlamak ve deneyimlerini kişiselleştirmek amacıyla kullanır.</p>
  <p>Çerezler zararlı değildir; program veya virüs içermezler. Temel işlevleri, kullanıcıları ve tercihlerini bir ziyaretten diğerine tanımaktır.</p>
  <div class="info-box">Son güncelleme: 1 Ocak 2025</div>
</section>

<section id="cerez-turleri">
  <h2>Çerez Türleri</h2>
  <h3>Zorunlu Çerezler</h3>
  <p>Web sitesinin temel işlevleri için gerekli olan çerezlerdir. Bu çerezler olmadan site düzgün çalışamaz. Oturum yönetimi, güvenlik doğrulaması gibi temel işlevleri yerine getirirler. <strong>Devre dışı bırakılamazlar.</strong></p>

  <h3>Analitik Çerezler</h3>
  <p>Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olan çerezlerdir. Hangi sayfaların ne kadar ziyaret edildiği, kullanıcıların nereden geldiği gibi istatistiksel bilgiler toplarlar. Bu veriler anonim tutulur.</p>

  <h3>Pazarlama Çerezleri</h3>
  <p>Reklam ve pazarlama faaliyetleri için kullanılan çerezlerdir. Kullanıcıların ilgi alanlarına göre kişiselleştirilmiş içerik göstermek amacıyla kullanılır. Bu çerezlerin kullanımı için açık rızanız gereklidir.</p>

  <h3>Tercih Çerezleri</h3>
  <p>Dil seçimi, tema tercihi gibi kullanıcı ayarlarını hatırlayan çerezlerdir. Bir sonraki ziyaretinizde tercihlerinizin hatırlanmasını sağlar.</p>
</section>

<section id="kullandigimiz-cerezler">
  <h2>Kullandığımız Çerezler</h2>
  <div class="cookie-table-wrapper">
    <table class="cookie-table">
      <thead>
        <tr>
          <th>Çerez Adı</th>
          <th>Tür</th>
          <th>Amaç</th>
          <th>Süre</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>mulify_cookie_consent</code></td>
          <td>Zorunlu</td>
          <td>Çerez tercihlerinizi saklar</td>
          <td>1 yıl</td>
        </tr>
        <tr>
          <td><code>sb-access-token</code></td>
          <td>Zorunlu</td>
          <td>Admin oturum yönetimi (Supabase)</td>
          <td>Oturum süresi</td>
        </tr>
        <tr>
          <td><code>sb-refresh-token</code></td>
          <td>Zorunlu</td>
          <td>Admin oturum yenileme (Supabase)</td>
          <td>7 gün</td>
        </tr>
        <tr>
          <td><code>_ga</code></td>
          <td>Analitik</td>
          <td>Google Analytics kullanıcı tanımlama</td>
          <td>2 yıl</td>
        </tr>
        <tr>
          <td><code>_ga_*</code></td>
          <td>Analitik</td>
          <td>Google Analytics oturum durumu</td>
          <td>2 yıl</td>
        </tr>
        <tr>
          <td><code>_gid</code></td>
          <td>Analitik</td>
          <td>Google Analytics günlük kullanıcı verisi</td>
          <td>24 saat</td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>Tercih</td>
          <td>Dil tercihinizi hatırlar (tr/en)</td>
          <td>1 yıl</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section id="ucuncu-taraf-cerezler">
  <h2>Üçüncü Taraf Çerezleri</h2>
  <p>Web sitemizde aşağıdaki üçüncü taraf hizmetleri çerez kullanabilir:</p>
  <ul>
    <li>
      <strong>Google Analytics</strong> — Kullanım istatistikleri toplama amacıyla kullanılır.
      Devre dışı bırakmak için <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out</a> eklentisini kullanabilirsiniz.
    </li>
    <li>
      <strong>Google Maps / OpenStreetMap</strong> — İletişim sayfasındaki harita için kullanılır.
    </li>
  </ul>
  <p>Bu üçüncü tarafların çerez politikaları için kendi web sitelerini ziyaret edebilirsiniz. Mulify, üçüncü taraf çerezlerinin içerikleri üzerinde kontrol sahibi değildir.</p>
</section>

<section id="cerez-yonetimi">
  <h2>Çerez Yönetimi</h2>
  <h3>Tarayıcı Ayarları</h3>
  <p>Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz. Popüler tarayıcılar için ayar sayfaları:</p>
  <ul>
    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
    <li><a href="https://support.mozilla.org/tr/kb/cerezleri-silme-web-sitelerinin-bilgilerini-kaldirma" target="_blank" rel="noopener">Mozilla Firefox</a></li>
    <li><a href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Apple Safari</a></li>
    <li><a href="https://support.microsoft.com/tr-tr/microsoft-edge/microsoft-edge-te-tanımlama-bilgilerini-silme" target="_blank" rel="noopener">Microsoft Edge</a></li>
  </ul>
  <p><strong>Not:</strong> Zorunlu çerezleri devre dışı bırakmanız durumunda bazı site özellikleri çalışmayabilir.</p>
  <h3>Rızanızı Geri Çekmek</h3>
  <p>Çerez onayınızı geri çekmek için tarayıcınızdan <code>mulify_cookie_consent</code> anahtarını silmeniz yeterlidir. Bir sonraki ziyaretinizde onay ekranı yeniden gösterilecektir.</p>
</section>

<section id="iletisim">
  <h2>İletişim</h2>
  <p>Çerez politikamız hakkında sorularınız için:</p>
  <div class="contact-card">
    <p><strong>Mulify Dijital Ajans</strong></p>
    <p>E-posta: <a href="mailto:kvkk@mulify.co">kvkk@mulify.co</a></p>
    <p>Telefon: <a href="tel:+902120000000">+90 (212) 000 00 00</a></p>
  </div>
</section>
`

const CONTENT_EN = `
<section id="cerez-nedir">
  <h2>What Are Cookies?</h2>
  <p>Cookies are small text files saved to your browser when you visit a website. Websites use these files to recognize users, remember their preferences, and personalize their experience.</p>
  <p>Cookies are not harmful — they do not contain programs or viruses. Their primary function is to recognize users and their preferences from one visit to the next.</p>
  <div class="info-box">Last updated: January 1, 2025</div>
</section>

<section id="cerez-turleri">
  <h2>Cookie Types</h2>
  <h3>Essential Cookies</h3>
  <p>These cookies are required for core website functionality and cannot be disabled. They handle session management, security verification, and other fundamental operations.</p>

  <h3>Analytics Cookies</h3>
  <p>These cookies help us understand how visitors use our site — which pages are most visited, where visitors come from, and similar statistical information. This data is kept anonymous.</p>

  <h3>Marketing Cookies</h3>
  <p>Used for advertising and marketing activities, these cookies enable personalized content based on user interests. Your explicit consent is required for these cookies.</p>

  <h3>Preference Cookies</h3>
  <p>These cookies remember user settings such as language selection and theme preference, so your choices persist across visits.</p>
</section>

<section id="kullandigimiz-cerezler">
  <h2>Cookies We Use</h2>
  <div class="cookie-table-wrapper">
    <table class="cookie-table">
      <thead>
        <tr>
          <th>Cookie Name</th>
          <th>Type</th>
          <th>Purpose</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>mulify_cookie_consent</code></td>
          <td>Essential</td>
          <td>Stores your cookie preferences</td>
          <td>1 year</td>
        </tr>
        <tr>
          <td><code>sb-access-token</code></td>
          <td>Essential</td>
          <td>Admin session management (Supabase)</td>
          <td>Session</td>
        </tr>
        <tr>
          <td><code>sb-refresh-token</code></td>
          <td>Essential</td>
          <td>Admin session renewal (Supabase)</td>
          <td>7 days</td>
        </tr>
        <tr>
          <td><code>_ga</code></td>
          <td>Analytics</td>
          <td>Google Analytics user identification</td>
          <td>2 years</td>
        </tr>
        <tr>
          <td><code>_ga_*</code></td>
          <td>Analytics</td>
          <td>Google Analytics session state</td>
          <td>2 years</td>
        </tr>
        <tr>
          <td><code>_gid</code></td>
          <td>Analytics</td>
          <td>Google Analytics daily user data</td>
          <td>24 hours</td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>Preference</td>
          <td>Remembers your language preference (tr/en)</td>
          <td>1 year</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<section id="ucuncu-taraf-cerezler">
  <h2>Third-Party Cookies</h2>
  <p>The following third-party services on our website may use cookies:</p>
  <ul>
    <li>
      <strong>Google Analytics</strong> — Used to collect usage statistics.
      To opt out, use the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out</a> browser add-on.
    </li>
    <li>
      <strong>Google Maps / OpenStreetMap</strong> — Used for the map on the contact page.
    </li>
  </ul>
  <p>Visit the respective websites for their cookie policies. Mulify does not control the content of third-party cookies.</p>
</section>

<section id="cerez-yonetimi">
  <h2>Cookie Management</h2>
  <h3>Browser Settings</h3>
  <p>You can manage cookies through your browser settings. Links for popular browsers:</p>
  <ul>
    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
    <li><a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener">Mozilla Firefox</a></li>
    <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener">Apple Safari</a></li>
    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge" target="_blank" rel="noopener">Microsoft Edge</a></li>
  </ul>
  <p><strong>Note:</strong> Disabling essential cookies may cause some site features to stop working correctly.</p>
  <h3>Withdrawing Consent</h3>
  <p>To withdraw your cookie consent, delete the <code>mulify_cookie_consent</code> key from your browser's local storage. The consent banner will reappear on your next visit.</p>
</section>

<section id="iletisim">
  <h2>Contact</h2>
  <p>For questions about our cookie policy:</p>
  <div class="contact-card">
    <p><strong>Mulify Digital Agency</strong></p>
    <p>Email: <a href="mailto:privacy@mulify.co">privacy@mulify.co</a></p>
    <p>Phone: <a href="tel:+902120000000">+90 (212) 000 00 00</a></p>
  </div>
</section>
`

export default async function CookiePolicyPage({
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
        titleTr="Çerez Politikası"
        titleEn="Cookie Policy"
        subtitleTr="Hangi çerezleri kullandığımızı ve nasıl yönetebileceğinizi öğrenin"
        subtitleEn="Learn which cookies we use and how to manage them"
        sections={isTr ? SECTIONS_TR : SECTIONS_EN}
        contentHtml={isTr ? CONTENT_TR : CONTENT_EN}
      />
      <Footer />
    </>
  )
}
