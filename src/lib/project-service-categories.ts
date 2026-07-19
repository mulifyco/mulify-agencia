import type { Project } from '@/lib/db-types'

export const PROJECT_SERVICE_CATEGORIES = [
  { key: 'digital-marketing', label: 'Dijital Pazarlama' },
  { key: 'web-design', label: 'Web Tasarım' },
  { key: 'brand-identity', label: 'Marka Kimliği' },
] as const

export type ProjectServiceCategory = (typeof PROJECT_SERVICE_CATEGORIES)[number]['key']

const PROJECT_SLUGS_BY_SERVICE_CATEGORY: Record<ProjectServiceCategory, readonly string[]> = {
  'digital-marketing': [
    'meta-ads-kampanya-yonetimi',
    'google-ads-arama-alisveris',
    'moda-markasi-instagram-yonetimi',
  ],
  'web-design': [
    'hukuk',
    'mimarlik',
    'saglik-klinigi-web-sitesi',
    'moda',
    'el-dokuma-hali-e-ticaret',
    'restoran-zinciri-online-siparis',
    'saas-yonetim-paneli',
    'crm-lead-yonetim-sistemi',
    'urun-lansmanı-landing-page',
    'okul',
    'restoran',
    'klinik',
    'gayrimenkul',
    'barber-shop',
    'muli-agency',
    'saas-dashboard',
  ],
  'brand-identity': [],
}

export function getProjectServiceCategory(project: Pick<Project, 'slug'>) {
  return PROJECT_SERVICE_CATEGORIES.find((category) =>
    PROJECT_SLUGS_BY_SERVICE_CATEGORY[category.key].includes(project.slug)
  )?.key ?? null
}
