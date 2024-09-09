import { NextRequest, NextResponse } from 'next/server'

export function fetchDefaultsMiddleware(req: NextRequest) {
  const response = NextResponse.next()

  response.headers.set('Cookie', req.headers.get('cookie') || '')
  // response.headers.set('Content-Type', 'application/json')

  return response
}
