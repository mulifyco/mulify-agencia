export type Locale = 'tr' | 'en'

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface ServiceItem {
  id: string
  slug: string
  title: string
  description: string
  icon?: string
  image?: string
  featured: boolean
}

export interface ProjectItem {
  id: string
  slug: string
  title: string
  description: string
  client?: string
  url?: string
  image?: string
  images: string[]
  tags: string[]
  featured: boolean
  service?: ServiceItem
}

export interface TestimonialItem {
  id: string
  name: string
  role?: string
  company?: string
  content: string
  avatar?: string
  rating: number
}

export interface TeamMemberItem {
  id: string
  name: string
  role: string
  bio?: string
  avatar?: string
  linkedin?: string
  twitter?: string
  github?: string
}

export interface PricingPlanItem {
  id: string
  slug: string
  name: string
  description?: string
  price: number
  currency: string
  period: string
  features: string[]
  highlighted: boolean
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

export interface PostItem {
  id: string
  slug: string
  title: string
  excerpt?: string
  content: string
  coverImage?: string
  tags: string[]
  publishedAt?: Date
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  budget?: string
  message: string
}

export interface SiteStats {
  projects: number
  clients: number
  years: number
  awards: number
}
