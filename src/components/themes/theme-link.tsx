'use client'

import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import type { AnchorHTMLAttributes } from 'react'
import { localizedPath } from '@/lib/locale-path'

type ThemeLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | 'href'>

export default function ThemeLink({ href, ...props }: ThemeLinkProps) {
  const pathname = usePathname()

  if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) {
    return <Link href={href} {...props} />
  }

  const locale = pathname.split('/').filter(Boolean)[0]
  const localizedHref =
    locale === 'tr'
      ? `/tr${href === '/' ? '' : href}`
      : localizedPath(locale === 'en' ? 'en' : 'tr', href)

  return <Link href={localizedHref} {...props} />
}
