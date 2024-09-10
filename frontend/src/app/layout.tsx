import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { FooterProps, Footer } from '@/components/custom/Footer'
import { Header, HeaderProps } from '@/components/custom/Header'
import { Toaster } from '@/components/ui/toaster'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header {...headerProps} />
        <div>{children}</div>
        <Footer {...footerProps} />
        <Toaster />
      </body>
    </html>
  )
}
