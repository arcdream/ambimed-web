'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/client-app/context/AuthContext'
import { setLoginRedirect } from '@/client-app/lib/navigationState'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user) {
      if (isLoginAndBookingDisabled()) {
        router.replace('/')
        return
      }
      setLoginRedirect(pathname)
      router.replace('/app/login')
    }
  }, [isLoading, user, pathname, router])

  if (isLoading) {
    return (
      <div className="client-app-card">
        <p className="muted">Loading…</p>
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}
