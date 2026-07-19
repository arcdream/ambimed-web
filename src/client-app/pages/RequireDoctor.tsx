'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/client-app/context/AuthContext'
import { setLoginRedirect } from '@/client-app/lib/navigationState'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'

export function RequireDoctor({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const loginBookingDisabled = isLoginAndBookingDisabled()

  useEffect(() => {
    if (isLoading) return
    if (!user) {
      if (loginBookingDisabled) {
        router.replace('/')
        return
      }
      setLoginRedirect('/app/doctor')
      router.replace('/app/login')
      return
    }
    if (!user.referralHubAccess) {
      router.replace(loginBookingDisabled ? '/' : '/app/booking')
    }
  }, [isLoading, user, router, loginBookingDisabled])

  if (isLoading) {
    return (
      <div className="client-app-card">
        <p className="muted">Loading…</p>
      </div>
    )
  }

  if (!user?.referralHubAccess) return null

  return <>{children}</>
}
