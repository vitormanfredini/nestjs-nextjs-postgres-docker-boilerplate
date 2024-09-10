import { type ClassValue, clsx } from 'clsx'
import { NextRequest } from 'next/server'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBackendURL(): string {
  return process.env.BACKEND_URL || ''
}

export function getFrontendURL(): string {
  return process.env.FRONTEND_URL || ''
}

export async function fetchWithAccessToken(
  req: NextRequest,
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = {
    Authorization: '',
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const accessToken = req.cookies.get('accessToken')?.value

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return await fetch(endpoint, {
    ...options,
    headers,
  })
}

export async function fetchWithDefaults(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  return await fetch(endpoint, {
    ...options,
    headers,
  })
}
