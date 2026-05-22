import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { createServerClient } from '@supabase/ssr'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/en' || pathname.startsWith('/en/') || pathname === '/tr' || pathname.startsWith('/tr/')) {
    const strippedPath = pathname.replace(/^\/(en|tr)(?=\/|$)/, '') || '/'
    const url = request.nextUrl.clone()
    url.pathname = strippedPath
    return NextResponse.redirect(url)
  }

  if (pathname.startsWith('/admin')) {
    // Login and auth callback are always public
    if (pathname === '/admin/login' || pathname.startsWith('/admin/auth/')) {
      return NextResponse.next()
    }

    // Build response first so we can mutate cookies
    let response = NextResponse.next({ request })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // getUser() validates with Supabase server — more secure than getSession()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return response
  }

  // next-intl rewrites public routes to the default locale internally
  return intlMiddleware(request)
}

export const config = {
  // admin is no longer excluded — middleware must run for auth checks
  matcher: ['/((?!_next|_vercel|api|remote-control|.*\\..*).*)'],
}
