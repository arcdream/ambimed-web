'use client'

import { useEffect, useMemo, useState } from 'react'
import { metadataService } from '@/client-app/services/metadataService'
import { fetchDefaultDiscount } from '@/client-app/services/discountService'
import { isSupabaseConfigured } from '@/client-app/lib/supabase'
import type { Service } from '@/client-app/types/models'
import {
  buildPricingPlans,
  buildServiceNavLinks,
  type PricingPlan,
  type ServiceNavLink,
} from '@/lib/serviceCatalog'

type ServiceCatalogState = {
  services: Service[]
  discountPct: number
  loading: boolean
  error: string | null
  plans: PricingPlan[]
  navLinks: ServiceNavLink[]
}

let cachedPromise: Promise<{ services: Service[]; discountPct: number }> | null = null

async function fetchCatalogData(): Promise<{ services: Service[]; discountPct: number }> {
  if (!isSupabaseConfigured()) {
    return { services: [], discountPct: 0 }
  }

  const [services, discount] = await Promise.all([
    metadataService.fetchServicesMetadata(),
    fetchDefaultDiscount(),
  ])

  const pct = discount?.discountPct ?? 0
  return {
    services: services ?? [],
    discountPct: Number.isFinite(pct) ? pct : 0,
  }
}

function loadCatalog(): Promise<{ services: Service[]; discountPct: number }> {
  if (!cachedPromise) {
    cachedPromise = fetchCatalogData().catch((e) => {
      cachedPromise = null
      throw e
    })
  }
  return cachedPromise
}

/** Shared catalogue — service types, subtypes, prices, and discount from Supabase */
export function useServiceCatalog(): ServiceCatalogState {
  const [services, setServices] = useState<Service[]>([])
  const [discountPct, setDiscountPct] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadCatalog()
      .then((data) => {
        if (cancelled) return
        setServices(data.services)
        setDiscountPct(data.discountPct)
        setError(null)
      })
      .catch((e) => {
        console.error(e)
        if (!cancelled) {
          setServices([])
          setDiscountPct(0)
          setError('Unable to load services catalogue.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const plans = useMemo(() => buildPricingPlans(services, discountPct), [services, discountPct])
  const navLinks = useMemo(() => buildServiceNavLinks(services), [services])

  return { services, discountPct, loading, error, plans, navLinks }
}

/** Invalidate cached catalogue (e.g. after admin updates) */
export function invalidateServiceCatalogCache() {
  cachedPromise = null
}
