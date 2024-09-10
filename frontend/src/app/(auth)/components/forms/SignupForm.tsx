'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import { ZodErrors } from '@/components/custom/ZodErrors'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerUserAction } from '@/data/actions/registerUserAction'
import { useToast } from '@/hooks/use-toast'
import { FormState } from '@/types/FormResponse'

type RegisterUserValidationErrors = {
  name?: string
  username?: string
  email?: string
  password?: string
}

const initialState: FormState<RegisterUserValidationErrors> = {
  prevState: null,
  success: null,
  data: null,
  validationErrors: null,
  backendErrors: null,
  message: '',
}

export function SignupForm() {
  const [formState, formAction] = useFormState(registerUserAction, initialState)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!formState.success && formState.backendErrors) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: formState.backendErrors.join('\n'),
      })
    }

    if (formState.success) {
      toast({
        title: 'Account created successfully',
        description: 'Use your credentials to login.',
      })
      router.push('/login')
    }
  }, [formState, toast])

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="full name"
              />
              <ZodErrors
                errors={formState.validationErrors?.fieldErrors?.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
              <ZodErrors
                errors={formState.validationErrors?.fieldErrors?.username}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <ZodErrors
                errors={formState.validationErrors?.fieldErrors?.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <ZodErrors
                errors={formState.validationErrors?.fieldErrors?.password}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button type="submit" className="w-full">
              Sign up
            </button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="login">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}
