'use client'

import { ClientAppProviders } from '@/client-app/ClientAppProviders'
import { AppShell } from '@/client-app/pages/AppShell'

export default function ClientAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientAppProviders>
      <AppShell>{children}</AppShell>
    </ClientAppProviders>
  )
}
