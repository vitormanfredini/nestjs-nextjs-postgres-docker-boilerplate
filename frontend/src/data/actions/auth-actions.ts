'use server'

import { z } from 'zod'

import { registerUserService } from '../services/auth-service'

const newUserSchema = z.object({
  name: z
    .string({
      errorMap: () => ({ message: 'Name must be between 3 and 64 characters' }),
    })
    .min(3)
    .max(64),
  username: z
    .string({
      errorMap: () => ({
        message: 'Username must be between 3 and 32 characters',
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
  email: z
    .string({
      errorMap: () => ({ message: 'Please enter a valid email address' }),
    })
    .email(),
})

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = newUserSchema.safeParse({
    name: formData.get('name'),
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
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

  const responseData = await registerUserService(validatedFields.data)

  if (!responseData) {
    return {
      ...prevState,
      success: false,
      validationErrors: null,
      backendErrors: ["Couldn't get response from server"],
      data: null,
    }
  }

  if (!responseData.success) {
    return {
      ...prevState,
      success: false,
      validationErrors: null,
      backendErrors: responseData.errors,
      data: null,
    }
  }

  return {
    ...prevState,
    success: true,
    data: responseData.data,
    validationErrors: null,
    backendErrors: null,
  }
}
