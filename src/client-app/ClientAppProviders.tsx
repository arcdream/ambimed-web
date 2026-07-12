'use client'

import { MetadataProvider } from '@/client-app/context/MetadataContext'

/** Auth is provided at app root so marketing + booking share session */
export function ClientAppProviders({ children }: { children: React.ReactNode }) {
  return <MetadataProvider>{children}</MetadataProvider>
}
