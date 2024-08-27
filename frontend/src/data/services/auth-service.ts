import { getBackendURL } from '@/lib/utils'

interface RegisterUserProps {
  name: string
  username: string
  password: string
  email: string
}

interface LoginUserProps {
  identifier: string
  password: string
}

const baseUrl = getBackendURL()

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL('/users', baseUrl)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
      cache: 'no-cache',
    })

    if (!response.ok) {
      console.log(
        'Registration Service Error: response not ok response not ok response not ok response not ok response not ok response not ok response not ok response not ok',
      )
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Registration Service Error:', error)
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL('/api/auth/local', baseUrl)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
      cache: 'no-cache',
    })

    return response.json()
  } catch (error) {
    console.error('Login Service Error:', error)
    throw error
  }
}

export async function getUsersService() {
  const url = new URL('/users', baseUrl)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    return response.json()
  } catch (error) {
    console.error('Login Service Error:', error)
    throw error
  }
}
