import { NextRequest, NextResponse } from 'next/server'

export function authMiddleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')

  console.log('asdasdasdsadadasd', !!accessToken)

  if (!accessToken) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}
