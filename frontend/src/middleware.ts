import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('MIDDLEWARE TODO')
  // forward cookies automatically for api routes
  // check if authenticated on authenticated only routes
  // return NextResponse.redirect(new URL('/', request.url))

  const accessToken = request.cookies.get('accessToken')

  const response = NextResponse.next()

  if (accessToken) {
    response.headers.set('x-authenticated', 'true')
  } else {
    response.headers.set('x-authenticated', 'false')
  }

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
