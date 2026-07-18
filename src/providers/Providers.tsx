'use client'

import { AuthProvider } from '@/client-app/context/AuthContext'
import { initSupabase, type SupabaseConfig } from '@/client-app/lib/supabase'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

type ProvidersProps = {
  children: React.ReactNode
  supabaseConfig: SupabaseConfig
}

export function Providers({ children, supabaseConfig }: ProvidersProps) {
  initSupabase(supabaseConfig)

  return (
    <AuthProvider>
      {children}
      <WhatsAppFloat />
    </AuthProvider>
  )
}
