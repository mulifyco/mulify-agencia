type ProjectCoverSource = {
  slug: string
  image?: string | null
}

const PROJECT_COVER_OVERRIDES: Record<string, string> = {
  hukuk: '/images/projects/hukuk.webp',
  mimarlik: '/images/projects/mimarlik.webp',
  'saglik-klinigi-web-sitesi': '/images/projects/saglik-klinigi.webp',
}

export function getProjectCoverImage(project: ProjectCoverSource): string | null {
  return PROJECT_COVER_OVERRIDES[project.slug] ?? project.image ?? null
}
