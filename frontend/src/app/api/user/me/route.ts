import { NextRequest, NextResponse } from 'next/server'

import { fetchWithAccessToken, getBackendURL } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const url = new URL('/auth/me', getBackendURL())

  try {
    const response = await fetchWithAccessToken(req, url.toString(), {
      method: 'GET',
      cache: 'no-cache',
    })

    const data = await response.json()
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          errors: data.errors,
        },
        { status: 401 },
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        errors: [
          `Error while making login request: ${(error as Error).message}`,
        ],
      },
      { status: 500 },
    )
  }
}
