'use client'

import React, { createContext, useContext, ReactNode, useState } from 'react'

import { User } from '../types/User'

type UserContextType = {
  userData: User | null
  setUserData: React.Dispatch<User>
}

const UserContext = createContext<UserContextType>({} as UserContextType)

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode
  user: User | null
}) {
  const [userData, setUserData] = useState(user)
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
