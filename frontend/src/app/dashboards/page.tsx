'use client'
import { redirect } from 'next/navigation'

import { MeInfo } from '@/app/(auth)/components/MeInfo'
import { useUser } from '@/context/UserContext'

export default function MeRoute() {
  const { userData } = useUser()

  if (!userData) {
    redirect('/')
  }

  return (
    <MeInfo
      name={userData.name}
      username={userData.username}
      email={userData.email}
    />
  )
}
