export type PublicServiceItem = {
  key: string
  slug: 'dijital-pazarlama' | 'e-ticaret' | 'marka-kimligi' | 'web-tasarim'
  icon: string
  titleTr: string
  titleEn: string
  descTr: string
  descEn: string
  featuresTr: readonly string[]
  featuresEn: readonly string[]
  color: string
  featured: boolean
}

export const publicServices: readonly PublicServiceItem[] = [
  {
    key: 'social-media-management',
    slug: 'dijital-pazarlama',
    icon: '📱',
    titleTr: 'Sosyal Medya Yönetimi',
    titleEn: 'Social Media Management',
    descTr: 'Markanız için düzenli, yaratıcı ve topluluk odaklı sosyal medya yönetimi.',
    descEn: 'Consistent, creative, and community-focused social media management for your brand.',
    featuresTr: ['İçerik Üretimi', 'Aylık Planlama', 'Reels Tasarımı', 'Topluluk Yönetimi'],
    featuresEn: ['Content Production', 'Monthly Planning', 'Reels Design', 'Community Management'],
    color: '#10B981',
    featured: false,
  },
  {
    key: 'meta-ads',
    slug: 'dijital-pazarlama',
    icon: '🎯',
    titleTr: 'Meta Reklamları',
    titleEn: 'Meta Ads',
    descTr: 'Veriye dayalı kampanyalarla doğru kitleye ulaşan ve ölçeklenen reklam yönetimi.',
    descEn: 'Data-driven campaign management that reaches the right audience and scales.',
    featuresTr: ['Facebook Ads', 'Remarketing', 'Instagram Ads', 'Ölçeklendirme'],
    featuresEn: ['Facebook Ads', 'Remarketing', 'Instagram Ads', 'Scaling'],
    color: '#6C63FF',
    featured: false,
  },
  {
    key: 'shopify-ecommerce',
    slug: 'e-ticaret',
    icon: '🛒',
    titleTr: 'Shopify & E-Ticaret',
    titleEn: 'Shopify & E-Commerce',
    descTr: 'Dönüşüm odaklı mağaza altyapısı, ölçümleme ve satış deneyimi.',
    descEn: 'Conversion-focused store infrastructure, measurement, and shopping experience.',
    featuresTr: ['Shopify Kurulumu', 'CRO', 'Landing Page', 'Pixel & CAPI'],
    featuresEn: ['Shopify Setup', 'CRO', 'Landing Page', 'Pixel & CAPI'],
    color: '#06B6D4',
    featured: false,
  },
  {
    key: 'brand-identity',
    slug: 'marka-kimligi',
    icon: '🎨',
    titleTr: 'Marka Kimliği',
    titleEn: 'Brand Identity',
    descTr: 'Markanızı tutarlı ve akılda kalıcı kılan bütüncül görsel kimlik sistemi.',
    descEn: 'A cohesive visual identity system that makes your brand consistent and memorable.',
    featuresTr: ['Logo', 'Görsel Dil', 'Kurumsal Kimlik', 'Marka Rehberi'],
    featuresEn: ['Logo', 'Visual Language', 'Corporate Identity', 'Brand Guidelines'],
    color: '#F472B6',
    featured: false,
  },
  {
    key: 'web-design',
    slug: 'web-tasarim',
    icon: '🌐',
    titleTr: 'Web Tasarım',
    titleEn: 'Web Design',
    descTr: 'Hızlı, erişilebilir ve markanıza özel dönüşüm odaklı web deneyimleri.',
    descEn: 'Fast, accessible, and conversion-focused web experiences tailored to your brand.',
    featuresTr: ['Landing Page', 'SEO Altyapısı', 'Kurumsal Site', 'Hız Optimizasyonu'],
    featuresEn: ['Landing Page', 'SEO Foundation', 'Corporate Website', 'Speed Optimization'],
    color: '#F5A623',
    featured: true,
  },
]
