'use client'

import { AuthProvider } from '@/client-app/context/AuthContext'
import { initSupabase, type SupabaseConfig } from '@/client-app/lib/supabase'
import { CallContactProvider } from '@/components/CallContactProvider'
import '@/components/CallContactModal.css'
import { ContactFloat } from '@/components/ContactFloat'

type ProvidersProps = {
  children: React.ReactNode
  supabaseConfig: SupabaseConfig
}

export function Providers({ children, supabaseConfig }: ProvidersProps) {
  initSupabase(supabaseConfig)

  return (
    <AuthProvider>
      <CallContactProvider>
        {children}
        <ContactFloat />
      </CallContactProvider>
    </AuthProvider>
  )
}
