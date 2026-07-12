'use client'

import { RequireAuth } from '@/client-app/pages/RequireAuth'
import { HistoryPage } from '@/client-app/pages/HistoryPage'

export default function HistoryRoutePage() {
  return (
    <RequireAuth>
      <HistoryPage />
    </RequireAuth>
  )
}
