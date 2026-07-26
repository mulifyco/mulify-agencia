export function normalizePhoneNumber(value: string | null | undefined): string | null {
  if (!value) return null

  const digits = value.replace(/\D/g, '')
  const normalized = digits.startsWith('0') ? `90${digits.slice(1)}` : digits

  return normalized.length >= 8 && normalized.length <= 15 ? normalized : null
}

export function createTelHref(value: string | null | undefined): string | null {
  const normalized = normalizePhoneNumber(value)
  return normalized ? `tel:+${normalized}` : null
}

export function formatPhoneNumber(value: string | null | undefined): string | null {
  const normalized = normalizePhoneNumber(value)
  if (!normalized) return null

  if (normalized.startsWith('90') && normalized.length === 12) {
    return `+90 (${normalized.slice(2, 5)}) ${normalized.slice(5, 8)} ${normalized.slice(8, 10)} ${normalized.slice(10)}`
  }

  return `+${normalized}`
}
