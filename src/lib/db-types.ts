// Runtime types matching Supabase REST API responses (dates as ISO strings)

export type Lead = {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  message: string
  budget: string | null
  status: string
  source: string | null
  createdAt: string
  updatedAt: string
}

export type Service = {
  id: string
  slug: string
  titleTr: string
  titleEn: string
  descTr: string
  descEn: string
  icon: string | null
  image: string | null
  order: number
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

export type Project = {
  id: string
  slug: string
  titleTr: string
  titleEn: string
  descTr: string
  descEn: string
  client: string | null
  url: string | null
  image: string | null
  images: string[]
  tags: string[]
  featured: boolean
  published: boolean
  order: number
  serviceId: string | null
  createdAt: string
  updatedAt: string
}

export type Post = {
  id: string
  slug: string
  titleTr: string
  titleEn: string
  excerptTr: string | null
  excerptEn: string | null
  contentTr: string
  contentEn: string
  coverImage: string | null
  tags: string[]
  published: boolean
  publishedAt: string | null
  authorId: string | null
  createdAt: string
  updatedAt: string
}

export type Testimonial = {
  id: string
  nameTr: string
  nameEn: string
  roleTr: string | null
  roleEn: string | null
  company: string | null
  contentTr: string
  contentEn: string
  avatar: string | null
  rating: number
  featured: boolean
  order: number
  published: boolean
  createdAt: string
  updatedAt: string
}

export type TeamMember = {
  id: string
  nameTr: string
  nameEn: string
  roleTr: string
  roleEn: string
  bioTr: string | null
  bioEn: string | null
  avatar: string | null
  linkedin: string | null
  twitter: string | null
  github: string | null
  order: number
  published: boolean
  createdAt: string
  updatedAt: string
}

export type PricingPlan = {
  id: string
  slug: string
  nameTr: string
  nameEn: string
  descTr: string | null
  descEn: string | null
  price: number
  currency: string
  period: string
  features: string[]
  ctaText: string | null
  highlighted: boolean
  order: number
  published: boolean
  createdAt: string
  updatedAt: string
}

export type FAQ = {
  id: string
  questionTr: string
  questionEn: string
  answerTr: string
  answerEn: string
  category: string | null
  order: number
  published: boolean
  createdAt: string
  updatedAt: string
}

export type Page = {
  id: string
  slug: string
  titleTr: string
  titleEn: string
  contentTr: string
  contentEn: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export type SiteSetting = {
  id: string
  key: string
  value: string
  type: string
  group: string
  createdAt: string
  updatedAt: string
}

// Public theme-site records used by the restored portfolio demos.
export type ThemeSite = {
  id: string
  slug: string
  name: string
  theme: string
  heroTitle: string | null
  heroSubtitle: string | null
  heroCtaText: string | null
  heroImage: string | null
  primaryColor: string
  logo: string | null
  aboutVizyon: string | null
  aboutMisyon: string | null
  contactEmail: string | null
  contactPhone: string | null
  contactAddress: string | null
  contactMapUrl: string | null
  cuisineType: string | null
  openingHours: string | null
  reservationEmail: string | null
  workingHours: string | null
  appointmentEmail: string | null
  licenseNo: string | null
  metaTitle: string | null
  metaDesc: string | null
  published: boolean
  createdAt: string
  updatedAt: string
}

export type ThemeMenuItem = {
  id: string
  siteId: string
  category: string
  name: string
  description: string | null
  price: number
  currency: string
  image: string | null
  available: boolean
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export type ThemeGallery = {
  id: string
  siteId: string
  url: string
  caption: string | null
  order: number
  createdAt: string
}

export type ThemePost = {
  id: string
  siteId: string
  title: string
  excerpt: string | null
  content: string
  coverImage: string | null
  published: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export type ThemeTeamMember = {
  id: string
  siteId: string
  name: string
  role: string
  bio: string | null
  avatar: string | null
  order: number
  createdAt: string
  updatedAt: string
}

export type ThemeDoctor = {
  id: string
  siteId: string
  name: string
  specialty: string
  photo: string | null
  bio: string | null
  yearsExp: number
  order: number
  createdAt: string
  updatedAt: string
}
