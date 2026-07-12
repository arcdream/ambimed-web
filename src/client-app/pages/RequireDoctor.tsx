'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/client-app/context/AuthContext'
import { setLoginRedirect } from '@/client-app/lib/navigationState'

export function RequireDoctor({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (!user) {
      setLoginRedirect('/app/doctor')
      router.replace('/app/login')
      return
    }
    if (!user.referralHubAccess) {
      router.replace('/app/booking')
    }
  }, [isLoading, user, router])

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
