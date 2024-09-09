import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { MeInfo } from '@/app/components/MeInfo'
import { getFrontendURL } from '@/lib/utils'

export default async function MeRoute() {
  const response = await fetch(getFrontendURL() + '/api/user/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: headers().get('cookie') || '',
    },
    cache: 'no-cache',
  })

  if (!response.ok) {
    redirect('/')
  }

  const meData = await response.json()

  if (!meData.success) {
    const error =
      meData?.errors[0] || 'An error ocurred loading data from the server.'
    return <div>{error}</div>
  }

  return (
    <MeInfo
      name={meData.data.name}
      username={meData.data.username}
      email={meData.data.email}
    />
  )
}
