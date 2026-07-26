export function normalizeWhatsAppNumber(value: string | null | undefined): string | null {
  if (!value) return null

  const digits = value.replace(/\D/g, '')
  const normalized = digits.startsWith('0') ? `90${digits.slice(1)}` : digits
  return normalized.length >= 8 && normalized.length <= 15 ? normalized : null
}

export function createWhatsAppUrl(
  phone: string | null | undefined,
  serviceName: string,
  locale: string
): string | null {
  const normalizedNumber = normalizeWhatsAppNumber(phone)
  if (!normalizedNumber) return null

  const message = locale === 'tr'
    ? `Merhaba, ${serviceName} hizmetiniz hakkında bilgi almak istiyorum.`
    : `Hello, I would like to learn more about your ${serviceName} service.`

  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`
}
