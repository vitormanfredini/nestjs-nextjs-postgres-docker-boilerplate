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
import { loginUserAction } from '@/data/actions/loginUserAction'
import { useToast } from '@/hooks/use-toast'
import { FormState } from '@/types/FormResponse'

type LoginUserValidationErrors = {
  identifier?: string
  password?: string
}

const initialState: FormState<LoginUserValidationErrors> = {
  prevState: null,
  success: null,
  data: null,
  validationErrors: null,
  backendErrors: null,
  message: '',
}

export function LoginForm() {
  const [formState, formAction] = useFormState(loginUserAction, initialState)
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
        title: 'Login was successful',
      })
      router.push('/dashboards')
    }
  }, [formState, toast])

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username or email"
              />
              <ZodErrors
                errors={formState.validationErrors?.fieldErrors?.identifier}
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
            <button className="w-full">Login</button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link className="underline ml-2" href="signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  )
}
