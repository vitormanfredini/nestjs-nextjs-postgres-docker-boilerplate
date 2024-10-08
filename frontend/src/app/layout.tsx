import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { headers } from 'next/headers'

import { FooterProps, Footer } from '@/components/custom/Footer'
import { Header, HeaderProps } from '@/components/custom/Header'
import { Toaster } from '@/components/ui/toaster'
import { UserProvider } from '@/context/UserContext'
import { fetchWithDefaults, getFrontendURL } from '@/lib/utils'
import { User } from '@/types/User'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coolest Dashboards',
  description: 'Such numbers, many amazings.',
}

const headerProps: HeaderProps = {
  button: {
    text: 'Login',
    url: '/login',
  },
  logo: {
    text: 'Coolest Dashboards',
    url: '/login',
  },
}

const footerProps: FooterProps = {
  logo: {
    text: 'Coolest Dashboards',
    url: '/',
  },
  text: 'The right data where you need it',
  socialLinks: [
    {
      text: 'instagram',
      url: 'https://twitter.com/asd123',
    },
    {
      text: 'youtube',
      url: 'https://youtube.com/asd123',
    },
    {
      text: 'github',
      url: 'https://github.com/asd123',
    },
  ],
}

const getUserData = async (): Promise<User | null> => {
  const response = await fetchWithDefaults(getFrontendURL() + '/api/user/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: headers().get('cookie') || '',
    },
    cache: 'no-cache',
  })

  if (!response.ok) {
    return null
  }

  const { data } = await response.json()
  return data
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserData()

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider user={user}>
          <Header {...headerProps} />
          <div>{children}</div>
          <Footer {...footerProps} />
        </UserProvider>
        <Toaster />
      </body>
    </html>
  )
}
