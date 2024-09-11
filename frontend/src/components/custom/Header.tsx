'use client'
import Link from 'next/link'

import { Logo } from '@/components/custom/Logo'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'

export type HeaderProps = {
  logo: {
    text: string
    url: string
  }
  button: {
    text: string
    url: string
  }
}

export function Header({ logo, button }: Readonly<HeaderProps>) {
  const { userData } = useUser()

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={logo.text} url={logo.url} />
      <div className="flex items-center gap-4">
        {userData ? (
          <b>hello, {userData.name}</b>
        ) : (
          <Link href={button.url}>
            <Button>{button.text}</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
