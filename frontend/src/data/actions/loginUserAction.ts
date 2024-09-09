import { z } from 'zod'

import { getFrontendURL } from '@/lib/utils'

const loginUserSchema = z.object({
  identifier: z
    .string({
      errorMap: () => ({
        message: 'Identifier must be between 3 and 32 characters',
      }),
    })
    .min(3)
    .max(32),
  password: z
    .string({
      errorMap: () => ({
        message: 'Password must be between 3 and 32 characters',
      }),
    })
    .min(8)
    .max(32),
})

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = loginUserSchema.safeParse({
    identifier: formData.get('identifier'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      success: false,
      validationErrors: validatedFields.error.flatten(),
      backendErrors: null,
      data: null,
    }
  }

  const res = await fetch(getFrontendURL() + '/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validatedFields.data),
  })

  if (!res.ok) {
    const responseData = await res.json()

    return {
      ...prevState,
      success: false,
      validationErrors: null,
      backendErrors: [responseData.errors || 'Login failed'],
      data: null,
    }
  }

  const responseData = await res.json()

  return {
    ...prevState,
    success: true,
    data: responseData.data,
    validationErrors: null,
    backendErrors: null,
  }
}
