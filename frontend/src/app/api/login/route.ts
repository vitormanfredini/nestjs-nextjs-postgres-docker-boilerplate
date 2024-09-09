import { NextRequest, NextResponse } from 'next/server'

import {
  loginUserService,
  LoginRemoteApiResponse,
} from '@/data/services/auth-service'

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json()

    const loginRemoteResponse: LoginRemoteApiResponse = await loginUserService({
      identifier,
      password,
    })

    if (!loginRemoteResponse.success) {
      return NextResponse.json(loginRemoteResponse, { status: 401 })
    }

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
    })

    response.cookies.set({
      name: 'accessToken',
      value: loginRemoteResponse.data.jwt,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour expiration
      path: '/',
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)

    return NextResponse.json(
      {
        success: false,
        errors: 'Something went wrong. Please try again later.',
      },
      { status: 500 },
    )
  }
}
