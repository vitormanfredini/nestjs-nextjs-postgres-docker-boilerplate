import { getBackendURL } from '@/lib/utils'

const baseUrl = getBackendURL()

interface RegisterUserProps {
  name: string
  username: string
  password: string
  email: string
}

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL('/auth/new', baseUrl)

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
      console.log('Registration Service Error: response not ok')
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Registration Service Error:', error)
  }
}

interface LoginUserProps {
  identifier: string
  password: string
}

type LoginRemoteApiResponseSuccesful = {
  success: true
  data: {
    jwt: string
    username: string
    name: string
    email: string
  }
}

type LoginRemoteApiResponseUnsuccesful = {
  success: false
  errors: string[]
}

export type LoginRemoteApiResponse =
  | LoginRemoteApiResponseSuccesful
  | LoginRemoteApiResponseUnsuccesful

export async function loginUserService(
  userData: LoginUserProps,
): Promise<LoginRemoteApiResponse> {
  const url = new URL('/auth/login', baseUrl)

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
      return {
        success: false,
        errors: ["Couldn't get valid response from server."],
      }
    }

    return response.json()
  } catch (error) {
    return {
      success: false,
      errors: [`Error while making login request: ${(error as Error).message}`],
    }
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
