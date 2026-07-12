'use client'

import { RequireAuth } from '@/client-app/pages/RequireAuth'
import { ReviewPage } from '@/client-app/pages/ReviewPage'

export default function ReviewRoutePage() {
  return (
    <RequireAuth>
      <ReviewPage />
    </RequireAuth>
  )
}
