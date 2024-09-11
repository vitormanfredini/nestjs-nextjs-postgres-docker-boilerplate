import { UserProvider } from '@/context/UserContext'

export default function authLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {children}
    </div>
  )
}
