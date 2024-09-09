import { NextRequest, NextResponse } from 'next/server'

import { fetchWithAuth, getBackendURL } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const url = new URL('/auth/me', getBackendURL())

  try {
    const response = await fetchWithAuth(req, url.toString(), {
      method: 'GET',
      cache: 'no-cache',
    })

    if (!response.success) {
      return NextResponse.json(
        {
          success: false,
          errors: response.errors,
        },
        { status: 401 },
      )
    }

    return NextResponse.json(response, { status: 200 })
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
