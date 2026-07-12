'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import '@/client-app/ClientApp.css'

/**
 * Shared site header + booking content — matches marketing site chrome.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const wideMain = pathname.startsWith('/app/doctor')

  return (
    <div className="client-app-shell">
      <Header />
      <div className="client-app-shell-bg" aria-hidden />
      <main className={`client-app-shell-main${wideMain ? ' client-app-shell-main--wide' : ''}`}>
        <div className="client-app client-app--in-shell">{children}</div>
      </main>
    </div>
  )
}
