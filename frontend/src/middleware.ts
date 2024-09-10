import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)
  const isApiRoute = request.nextUrl.pathname.substring(0, 4) === '/api'

  if (!isApiRoute && !isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const response = NextResponse.next()

  // if (accessToken) {
  //   response.headers.set('Cookie', headers().get('cookie') || '')
  // }

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}

const publicRoutes = ['/login', '/signup', '/']
