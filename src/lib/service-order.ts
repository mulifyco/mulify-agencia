const SERVICE_PRIORITY = [
  'dijital-pazarlama',
  'e-ticaret',
  'marka-kimligi',
] as const

const SERVICE_PRIORITY_INDEX = new Map<string, number>(
  SERVICE_PRIORITY.map((slug, index) => [slug, index])
)

export function sortServicesByPriority<T extends { slug: string }>(services: readonly T[]): T[] {
  return services
    .map((service, index) => ({ service, index }))
    .sort((a, b) => {
      const aPriority = SERVICE_PRIORITY_INDEX.get(a.service.slug)
      const bPriority = SERVICE_PRIORITY_INDEX.get(b.service.slug)

      if (aPriority !== undefined && bPriority !== undefined) return aPriority - bPriority
      if (aPriority !== undefined) return -1
      if (bPriority !== undefined) return 1
      return a.index - b.index
    })
    .map(({ service }) => service)
}
