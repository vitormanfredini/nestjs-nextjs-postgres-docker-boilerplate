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

export async function fetchWithAuth(
  req: NextRequest,
  endpoint: string,
  options: RequestInit = {},
) {
  const headers = {
    ...options.headers,
    Authorization: ``,
    'Content-Type': 'application/json',
  }

  const accessToken = req.cookies.get('accessToken')?.value

  if (accessToken) {
    console.log('ACHOU token no cookie')
    headers.Authorization = `Bearer ${accessToken}`
  } else {
    console.log('nao achou token no cookie')
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  })

  if (!response.ok && response.status === 401) {
    console.log('UNAUTHORIZED')
    return response.json()
  }

  if (!response.ok) {
    throw new Error(`Error fetching from ${endpoint}`)
  }

  return response.json()
}
