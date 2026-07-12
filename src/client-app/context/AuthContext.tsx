'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@/client-app/services/authService'
import type { User } from '@/client-app/types/models'

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  referralHubAccess: boolean
  isLoading: boolean
  login: (mobileNumber: string, otp: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const restored = await authService.restoreSession()
        if (!cancelled && restored) setUser(restored)
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const login = async (mobileNumber: string, otp: string) => {
    const response = await authService.verifyOtp(mobileNumber, otp)
    if (response.success && response.user) {
      setUser(response.user)
      return { success: true }
    }
    return { success: false, message: response.message }
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        referralHubAccess: !!user?.referralHubAccess,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
