'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { metadataService } from '@/client-app/services/metadataService'
import type { AppointmentStatus, Service } from '@/client-app/types/models'

type MetadataContextValue = {
  services: Service[]
  appointmentStatuses: AppointmentStatus[]
  loading: boolean
  refreshMetadata: () => Promise<void>
}

const MetadataContext = createContext<MetadataContextValue | undefined>(undefined)

export function MetadataProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([])
  const [appointmentStatuses, setAppointmentStatuses] = useState<AppointmentStatus[]>([])
  const [loading, setLoading] = useState(true)

  const loadMetadata = async () => {
    try {
      setLoading(true)
      const [servicesData, statusesData] = await Promise.all([
        metadataService.fetchServicesMetadata(),
        metadataService.fetchAppointmentStatuses(),
      ])
      setServices(servicesData)
      setAppointmentStatuses(statusesData)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMetadata()
  }, [])

  return (
    <MetadataContext.Provider
      value={{ services, appointmentStatuses, loading, refreshMetadata: loadMetadata }}
    >
      {children}
    </MetadataContext.Provider>
  )
}

export function useMetadata() {
  const ctx = useContext(MetadataContext)
  if (!ctx) throw new Error('useMetadata must be used within MetadataProvider')
  return ctx
}
