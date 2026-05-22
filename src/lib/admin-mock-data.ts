export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'
export type PostStatus = 'draft' | 'published' | 'scheduled'
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR'

export const mockLeads = [
  { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@techstart.com', phone: '+90 532 111 2233', company: 'TechStart', service: 'Web Tasarım', budget: '$5,000-$10,000', status: 'new' as LeadStatus, message: 'Web sitemizi yenilemek istiyoruz.', source: 'website', createdAt: '2026-05-08T10:30:00Z' },
  { id: '2', name: 'Zeynep Kaya', email: 'zeynep@bloom.com', phone: '+90 533 222 3344', company: 'Bloom Fashion', service: 'E-Ticaret', budget: '$10,000+', status: 'contacted' as LeadStatus, message: 'E-ticaret platformu kurmak istiyoruz.', source: 'referral', createdAt: '2026-05-07T14:00:00Z' },
  { id: '3', name: 'Marcus Weber', email: 'marcus@nova.io', phone: '+49 171 333 4455', company: 'Nova Tech', service: 'Web Geliştirme', budget: '$15,000+', status: 'qualified' as LeadStatus, message: 'SaaS platform development needed.', source: 'linkedin', createdAt: '2026-05-06T09:15:00Z' },
  { id: '4', name: 'Elif Şahin', email: 'elif@pulse.co', phone: '+90 534 444 5566', company: 'Pulse Media', service: 'Dijital Pazarlama', budget: '$2,000-$5,000', status: 'proposal' as LeadStatus, message: 'Sosyal medya yönetimi istiyoruz.', source: 'google', createdAt: '2026-05-05T16:45:00Z' },
  { id: '5', name: 'Can Özdemir', email: 'can@zenith.co', phone: '+90 535 555 6677', company: 'Zenith Software', service: 'Web Geliştirme', budget: '$20,000+', status: 'won' as LeadStatus, message: 'Kurumsal yazılım geliştirme projesi.', source: 'website', createdAt: '2026-05-04T11:00:00Z' },
  { id: '6', name: 'Sara Johnson', email: 'sara@global.com', phone: '+1 555 666 7788', company: 'Global Retail', service: 'Marka Kimliği', budget: '$5,000-$10,000', status: 'lost' as LeadStatus, message: 'Rebranding project for our chain.', source: 'referral', createdAt: '2026-05-03T13:30:00Z' },
]

export const mockAdminStats = {
  totalLeads: 47,
  newLeads: 12,
  totalProjects: 23,
  totalServices: 5,
  totalPosts: 18,
  publishedPosts: 12,
  totalTestimonials: 24,
  totalTeamMembers: 8,
  monthlyRevenue: 48500,
  conversionRate: 34,
}

export const mockWeeklyTraffic = [
  { day: 'Pzt', visitors: 1240, leads: 8 },
  { day: 'Sal', visitors: 980, leads: 5 },
  { day: 'Çar', visitors: 1560, leads: 12 },
  { day: 'Per', visitors: 1820, leads: 15 },
  { day: 'Cum', visitors: 2100, leads: 18 },
  { day: 'Cmt', visitors: 890, leads: 4 },
  { day: 'Paz', visitors: 720, leads: 3 },
]

export const mockAdminUser = {
  id: 'user-1',
  name: 'Admin Kullanıcı',
  email: 'admin@mulify.co',
  role: 'SUPER_ADMIN' as UserRole,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80',
}

export const mockAdminTestimonials = [
  { id: '1', name: 'Ahmet Yılmaz', role: 'CEO', company: 'TechStart', content: 'Organik trafiğimiz 3 ayda %340 arttı.', rating: 5, metric: '+340% Trafik', published: true, order: 1, avatar: null },
  { id: '2', name: 'Zeynep Kaya', role: 'Marketing Director', company: 'Bloom', content: 'Dönüşüm oranımız %6.8e yükseldi.', rating: 5, metric: '+224% Dönüşüm', published: true, order: 2, avatar: null },
  { id: '3', name: 'Marcus Weber', role: 'Founder', company: 'Nova Tech', content: 'Design quality is unmatched.', rating: 5, metric: '12 Country Market', published: false, order: 3, avatar: null },
]

export const mockAdminTeam = [
  { id: '1', name: 'Ali Yıldız', role: 'CEO & Kurucu', bio: 'Dijital pazarlama ve strateji uzmanı.', avatar: null, linkedin: 'https://linkedin.com', twitter: 'https://twitter.com', github: '', order: 1, published: true },
  { id: '2', name: 'Ayşe Demir', role: 'Creative Director', bio: 'UI/UX ve marka tasarımı uzmanı.', avatar: null, linkedin: 'https://linkedin.com', twitter: '', github: '', order: 2, published: true },
  { id: '3', name: 'Emre Çelik', role: 'Lead Developer', bio: 'Next.js ve sistem mimarisi uzmanı.', avatar: null, linkedin: 'https://linkedin.com', twitter: '', github: 'https://github.com', order: 3, published: true },
]

export const mockAdminFAQ = [
  { id: '1', questionTr: 'Bir proje ne kadar sürer?', questionEn: 'How long does a project take?', answerTr: '3-6 hafta standart projeler için.', answerEn: '3-6 weeks for standard projects.', category: 'Proje Süreci', order: 1, published: true },
  { id: '2', questionTr: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?', questionEn: 'What payment methods do you accept?', answerTr: 'Banka havalesi ve kredi kartı.', answerEn: 'Bank transfer and credit card.', category: 'Ödeme', order: 2, published: true },
  { id: '3', questionTr: 'Proje sonrası destek var mı?', questionEn: 'Do you provide post-project support?', answerTr: 'Evet, ücretsiz destek süresi sunuyoruz.', answerEn: 'Yes, we provide a free support period.', category: 'Destek', order: 3, published: true },
]

export const mockAdminPosts = [
  { id: '1', titleTr: 'Web Tasarımında 2026 Trendleri', titleEn: '2026 Web Design Trends', slug: '2026-web-tasarim-trendleri', status: 'published' as PostStatus, tags: ['Web', 'Tasarım', 'Trend'], coverImage: null, publishedAt: '2026-05-01T10:00:00Z', createdAt: '2026-04-28T09:00:00Z' },
  { id: '2', titleTr: 'SEO İpuçları ve Stratejileri', titleEn: 'SEO Tips and Strategies', slug: 'seo-ipuclari', status: 'draft' as PostStatus, tags: ['SEO', 'Pazarlama'], coverImage: null, publishedAt: null, createdAt: '2026-05-03T14:00:00Z' },
  { id: '3', titleTr: 'E-Ticaret Başarı Rehberi', titleEn: 'E-Commerce Success Guide', slug: 'e-ticaret-basari-rehberi', status: 'scheduled' as PostStatus, tags: ['E-Ticaret', 'Strateji'], coverImage: null, publishedAt: '2026-05-15T08:00:00Z', createdAt: '2026-05-05T11:00:00Z' },
]

export type AgentStatus = 'active' | 'idle' | 'running' | 'error'

export const mockAgents = [
  { id: 'a1', name: 'Lead Scraper', description: "Yeni lead'leri otomatik tarar ve kategorize eder", status: 'running' as AgentStatus, lastRun: new Date(Date.now() - 15 * 60 * 1000).toISOString(), nextRun: new Date(Date.now() + 45 * 60 * 1000).toISOString(), tasksCompleted: 142, pendingApprovals: 0, enabled: true },
  { id: 'a2', name: 'Response Bot', description: "Lead'lere otomatik ilk yanıt gönderir", status: 'active' as AgentStatus, lastRun: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), nextRun: null, tasksCompleted: 89, pendingApprovals: 2, enabled: true },
  { id: 'a3', name: 'Content Optimizer', description: 'SEO önerileri oluşturur ve içerik iyileştirir', status: 'idle' as AgentStatus, lastRun: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), nextRun: new Date(Date.now() + 24 * 3600 * 1000).toISOString(), tasksCompleted: 34, pendingApprovals: 0, enabled: true },
  { id: 'a4', name: 'Analytics Reporter', description: 'Haftalık performans raporu oluşturur ve gönderir', status: 'idle' as AgentStatus, lastRun: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(), nextRun: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(), tasksCompleted: 12, pendingApprovals: 0, enabled: true },
  { id: 'a5', name: 'Social Poster', description: 'Sosyal medya gönderilerini zamanlar ve yayınlar', status: 'error' as AgentStatus, lastRun: new Date(Date.now() - 3 * 3600 * 1000).toISOString(), nextRun: null, tasksCompleted: 56, pendingApprovals: 0, enabled: false, error: 'Instagram API: Rate limit aşıldı' },
]

export const mockApprovalQueue = [
  {
    id: 'ap1', agentId: 'a2', agentName: 'Response Bot', actionType: 'send_email',
    title: "E-posta gönder: Ahmet Yılmaz",
    description: 'Web tasarım talebine ilk yanıt maili gönderilecek.',
    preview: "Merhaba Ahmet Bey,\n\nWeb tasarım talebinizi aldık. Detaylarınızı inceledik ve bir görüşme planlamak istiyoruz.\n\nEn kısa sürede dönüş yapacağız.",
    lead: { name: 'Ahmet Yılmaz', email: 'ahmet@techstart.com', company: 'TechStart' },
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: 'ap2', agentId: 'a2', agentName: 'Response Bot', actionType: 'archive_leads',
    title: "3 eski lead'i arşivle",
    description: '30+ gündür güncellenmemiş lost statüsündeki leadler arşivlenecek.',
    preview: '• Marcus Weber (Lost · 45 gün)\n• Sara Johnson (Lost · 38 gün)\n• Ali Çetin (Lost · 31 gün)',
    lead: null,
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
]

export const mockRemoteNotifications = [
  { id: 'n1', type: 'lead', title: 'Yeni Lead: Ahmet Yılmaz', message: 'Web Tasarım · TechStart · $5K–$10K', time: new Date(Date.now() - 2 * 60 * 1000).toISOString(), read: false, color: 'green' },
  { id: 'n2', type: 'agent', title: 'Lead Scraper çalıştı', message: '5 yeni lead bulundu ve eklendi', time: new Date(Date.now() - 15 * 60 * 1000).toISOString(), read: false, color: 'amber' },
  { id: 'n3', type: 'project', title: 'Proje güncellendi: Nova Web', message: 'Milestone 2 tamamlandı — Tasarım onaylandı', time: new Date(Date.now() - 60 * 60 * 1000).toISOString(), read: true, color: 'blue' },
  { id: 'n4', type: 'approval', title: 'Onay bekliyor: Response Bot', message: "Ahmet Yılmaz'a e-posta göndermek istiyor", time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), read: false, color: 'orange' },
  { id: 'n5', type: 'report', title: 'Haftalık rapor hazır', message: '847 ziyaret · 12 lead · %1.4 dönüşüm', time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), read: true, color: 'purple' },
]

export const mockAdminMedia = [
  { id: '1', name: 'hero-bg.jpg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=60', size: 245000, type: 'image/jpeg', createdAt: '2026-05-01T10:00:00Z' },
  { id: '2', name: 'team-photo.jpg', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=60', size: 189000, type: 'image/jpeg', createdAt: '2026-05-02T11:00:00Z' },
  { id: '3', name: 'project-nova.jpg', url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&q=60', size: 312000, type: 'image/jpeg', createdAt: '2026-05-03T12:00:00Z' },
  { id: '4', name: 'project-bloom.jpg', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=60', size: 278000, type: 'image/jpeg', createdAt: '2026-05-04T09:00:00Z' },
  { id: '5', name: 'office-space.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=60', size: 421000, type: 'image/jpeg', createdAt: '2026-05-05T14:00:00Z' },
  { id: '6', name: 'branding-kit.png', url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=60', size: 156000, type: 'image/png', createdAt: '2026-05-06T10:00:00Z' },
]
