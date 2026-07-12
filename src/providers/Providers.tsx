'use client'

import { AuthProvider } from '@/client-app/context/AuthContext'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <WhatsAppFloat />
    </AuthProvider>
  )
}
