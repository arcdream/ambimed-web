'use client'

import { RequireAuth } from '@/client-app/pages/RequireAuth'
import { RequireDoctor } from '@/client-app/pages/RequireDoctor'
import { DoctorWorkspacePage } from '@/client-app/pages/DoctorWorkspacePage'

export default function DoctorRoutePage() {
  return (
    <RequireAuth>
      <RequireDoctor>
        <DoctorWorkspacePage />
      </RequireDoctor>
    </RequireAuth>
  )
}
