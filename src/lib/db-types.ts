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
