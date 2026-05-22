export function localizedPath(locale: string, path = '/') {
  const normalized = !path || path === '' ? '/' : path.startsWith('/') ? path : `/${path}`
  return locale === 'tr' ? normalized : `/${locale}${normalized === '/' ? '' : normalized}`
}
