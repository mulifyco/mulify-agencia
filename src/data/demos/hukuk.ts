export const HUKUK_DEMO = {
  firmName: 'Aksoy, Erdem & Partners',
  badge: 'Business Law & Disputes',
  heroTitle: 'Sınır ötesi işlemler, kritik uyuşmazlıklar ve regülasyon baskısı altında güven veren hukuk stratejileri.',
  heroSummary:
    'Enerji, teknoloji, finans ve altyapı sektörlerinde faaliyet gösteren büyük ölçekli şirketlere; işlem güvenliği, uyuşmazlık yönetimi ve düzenleyici riskler konusunda entegre danışmanlık sunuyoruz.',
  accent: '#8c6a4a',
  established: '1998',
  stats: [
    { value: '42', label: 'Ortak ve Counsel' },
    { value: '120+', label: 'Avukat ve uzman' },
    { value: '6', label: 'Ofis / temsil noktası' },
    { value: '18', label: 'Sektör ve çalışma alanı' },
  ],
  sectors: [
    'Enerji ve Altyapı',
    'Teknoloji ve Veri',
    'Finansal Kurumlar',
    'Özel Sermaye',
    'Gayrimenkul ve İnşaat',
    'Sağlık ve Yaşam Bilimleri',
  ],
  differentiators: [
    {
      title: 'Çok disiplinli ekip yapısı',
      body: 'Uyuşmazlık, işlem ve regülasyon ekiplerini aynı masa etrafında toplayan tek çatı yaklaşımı.',
    },
    {
      title: 'Sektör odaklı hukuki çerçeve',
      body: 'Sadece mevzuat değil, sektörün ticari baskılarını ve yatırım dinamiklerini de merkeze alan danışmanlık.',
    },
    {
      title: 'Yönetici seviyesinde iletişim',
      body: 'Genel müdür, hukuk müşaviri ve yatırım komiteleri için net, karar destekleyen raporlama dili.',
    },
  ],
} as const

export const HUKUK_PRACTICES = [
  {
    slug: 'sirketler-ve-birlesmeler',
    title: 'Şirketler Hukuku ve M&A',
    short: 'Satın alma, birleşme, ortak girişim ve kurumsal yapılandırma süreçlerinde yönetim kurulu seviyesinde destek.',
    overview:
      'Büyük hacimli satın alma süreçleri, hisse devirleri, yatırım turları, ortaklık yapıları ve şirket yeniden organizasyonlarında işlem kapanışına kadar tam kapsamlı hukuki koordinasyon sağlanır.',
    capabilities: [
      'Birleşme ve devralmalar',
      'Ortak girişimler',
      'Hissedar sözleşmeleri',
      'Yatırım sözleşmeleri',
      'Kurumsal yönetişim',
    ],
    sectors: ['Özel Sermaye', 'Sanayi', 'Teknoloji'],
  },
  {
    slug: 'uyusmazlik-ve-tahkim',
    title: 'Uyuşmazlık Çözümü ve Tahkim',
    short: 'Yüksek riskli ticari davalar, sözleşme ihtilafları ve uluslararası tahkim dosyaları için sonuç odaklı temsil.',
    overview:
      'Şirketlerin itibar, nakit akışı ve sözleşmesel pozisyonlarını doğrudan etkileyen uyuşmazlıklarda dava stratejisi, delil yönetimi ve uzlaşma kurgusu birlikte ele alınır.',
    capabilities: [
      'Ticari dava takibi',
      'Uluslararası tahkim',
      'İhtiyati tedbir ve icra',
      'Yönetici sorumluluğu ihtilafları',
      'Uzlaşma ve müzakere',
    ],
    sectors: ['Enerji', 'İnşaat', 'Lojistik'],
  },
  {
    slug: 'bankacilik-ve-finans',
    title: 'Bankacılık ve Finans',
    short: 'Kredi, proje finansmanı, refinansman ve teminat paketlerinde borç veren ve sponsor taraf danışmanlığı.',
    overview:
      'Yerel ve sınır ötesi finansman işlemlerinde kredi sözleşmeleri, teminat yapıları, covenant kurguları ve düzenleyici beklentiler aynı çerçevede yönetilir.',
    capabilities: [
      'Proje finansmanı',
      'Refinansman',
      'Teminat ve garanti belgeleri',
      'Yapılandırma süreçleri',
      'Finansal regülasyon',
    ],
    sectors: ['Bankacılık', 'Enerji', 'Altyapı'],
  },
  {
    slug: 'regulasyon-ve-uyum',
    title: 'Regülasyon ve Uyum',
    short: 'KVKK, rekabet, yaptırımlar, iç soruşturmalar ve sektör regülasyonları için önleyici danışmanlık.',
    overview:
      'Yönetim kurullarının karşı karşıya kaldığı düzenleyici baskıları azaltmak için politika setleri, eğitim modülleri, iç denetim akışları ve kriz senaryoları tasarlanır.',
    capabilities: [
      'KVKK ve veri yönetişimi',
      'Rekabet hukuku',
      'Yaptırım ve ihracat kontrolleri',
      'İç soruşturmalar',
      'Uyum programları',
    ],
    sectors: ['Teknoloji', 'Finans', 'Sağlık'],
  },
  {
    slug: 'gayrimenkul-ve-insaat',
    title: 'Gayrimenkul ve İnşaat',
    short: 'Arsa geliştirme, yüklenici sözleşmeleri, proje teslim riskleri ve karma kullanım yatırımlarında yapılandırılmış destek.',
    overview:
      'Konut, ofis, lojistik ve karma kullanım projelerinde yatırım öncesi inceleme, sözleşme yönetimi, izin süreçleri ve proje uyuşmazlıkları birlikte ele alınır.',
    capabilities: [
      'Due diligence',
      'Yüklenici sözleşmeleri',
      'Satış ve kiralama yapıları',
      'İzin ve ruhsat süreçleri',
      'Teslim ve ayıp uyuşmazlıkları',
    ],
    sectors: ['Gayrimenkul', 'İnşaat', 'Altyapı'],
  },
  {
    slug: 'is-ve-yonetici-iliskileri',
    title: 'İş Hukuku ve Yönetici İlişkileri',
    short: 'Kritik işe giriş/çıkışlar, üst düzey yönetici sözleşmeleri ve çok lokasyonlu iş gücü risklerinde hassas danışmanlık.',
    overview:
      'İş gücü yeniden yapılanmaları, yönetici teşvik planları ve hassas fesih senaryolarında hem hukuki risk hem de kurumsal itibar birlikte değerlendirilir.',
    capabilities: [
      'Üst düzey yönetici sözleşmeleri',
      'Teşvik ve prim planları',
      'Toplu iş gücü süreçleri',
      'Uygulama politikaları',
      'Uyuşmazlık önleme',
    ],
    sectors: ['Kurumsal Hizmetler', 'Perakende', 'Teknoloji'],
  },
] as const

export const HUKUK_RESULTS = [
  {
    title: 'Enerji yatırımında işlem kapanışı',
    client: 'Bölgesel enerji platformu',
    summary:
      '480 milyon USD büyüklüğündeki satın alma işleminde çok ülkeli sözleşme koordinasyonu ve kapanış yönetimi yürütüldü.',
    outcome: 'Yatırım komitesi onayı sonrası işlem planlanan takvim içinde kapandı.',
  },
  {
    title: 'Uluslararası tedarik uyuşmazlığında tahkim',
    client: 'Sanayi üreticisi',
    summary:
      'Yüksek hacimli tedarik zinciri ihtilafında teknik uzman, delil ve uzlaşma stratejileri eş zamanlı yönetildi.',
    outcome: 'Mahkeme öncesi çözümle operasyonel kesinti ve itibar riski minimize edildi.',
  },
  {
    title: 'Finansman yeniden yapılandırması',
    client: 'Altyapı geliştiricisi',
    summary:
      'Borç veren konsorsiyum ile sponsor çıkarlarını dengeleyen yeni covenant ve teminat paketi hazırlandı.',
    outcome: 'Likidite baskısı azaltıldı ve proje takvimi korunarak finansal sürdürülebilirlik sağlandı.',
  },
] as const

export const HUKUK_OFFICES = [
  {
    city: 'İstanbul',
    label: 'Genel Merkez',
    address: 'Levent, İstanbul Finans Koridoru',
    description: 'Birleşme-devralma, finans ve yönetici danışmanlığı ekiplerinin merkez ofisi.',
  },
  {
    city: 'Ankara',
    label: 'Kamu ve Regülasyon',
    address: 'Çankaya, Ankara',
    description: 'Regülasyon, kamu ihale ve idare hukuku süreçlerini yöneten uzman ekip.',
  },
  {
    city: 'İzmir',
    label: 'Ege Bölge Ofisi',
    address: 'Bayraklı, İzmir',
    description: 'Sanayi, lojistik ve liman odaklı uyuşmazlıklarla sözleşme projelerine destek verir.',
  },
] as const

export const HUKUK_INSIGHTS = [
  {
    slug: 'yatirim-komitesi-icin-ma-kapanis-riskleri',
    title: 'Yatırım komiteleri için M&A kapanış riskleri',
    excerpt:
      'Due diligence bulgularının karar notuna çevrilmesi, SPA risk dağılımı ve kapanış koşullarının doğru yönetimi.',
    category: 'Kurumsal',
  },
  {
    slug: 'veri-ihlali-sonrasi-ilk-72-saat',
    title: 'Veri ihlali sonrası ilk 72 saat',
    excerpt:
      'Teknoloji şirketleri ve regüle kurumlar için kriz iletişimi, bildirim akışı ve iç soruşturma başlıkları.',
    category: 'Uyum',
  },
  {
    slug: 'tahkim-oncesi-ticari-uzlasma-tasarimi',
    title: 'Tahkim öncesi ticari uzlaşma tasarımı',
    excerpt:
      'Uyuşmazlığı büyütmeden çözmek isteyen şirketler için müzakere kurgusu ve dosya hazırlık çerçevesi.',
    category: 'Uyuşmazlık',
  },
] as const

export const HUKUK_TEAM_FALLBACK = [
  {
    name: 'Selin Aksoy',
    role: 'Managing Partner',
    bio: 'Sınır ötesi işlemler, yönetim kurulu danışmanlığı ve yatırımcı ilişkileri alanında 20+ yıllık deneyim.',
  },
  {
    name: 'Emre Erdem',
    role: 'Partner, Disputes & Arbitration',
    bio: 'Yüksek hacimli ticari uyuşmazlıklar ve çok taraflı tahkim dosyalarında stratejik temsil yürütür.',
  },
  {
    name: 'Deniz Kara',
    role: 'Partner, Banking & Finance',
    bio: 'Proje finansmanı, refinansman ve teminat yapılarında borç veren ve sponsor taraf danışmanlığı sunar.',
  },
  {
    name: 'Mina Yalçın',
    role: 'Counsel, Regulatory & Compliance',
    bio: 'KVKK, rekabet ve iç soruşturma projelerinde yönetim ekibine önleyici uyum çerçeveleri kurar.',
  },
] as const

export const HUKUK_GALLERY_FALLBACK = [
  {
    url: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=1400&q=80',
    caption: 'Yönetim Kurulu Toplantı Alanı',
  },
  {
    url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=80',
    caption: 'Kurumsal Danışmanlık Katı',
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
    caption: 'İstanbul Ofis Cephesi',
  },
  {
    url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1400&q=80',
    caption: 'Müvekkil Görüşme Alanı',
  },
] as const
