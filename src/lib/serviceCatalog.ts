import type { Service, ServiceSubtype } from '@/client-app/types/models'

/** Card accent classes — visual only, not business data */
const PRICING_ACCENTS = ['teal', 'blue', 'rose', 'violet', 'teal', 'blue'] as const

/** Stable URL slugs for existing service landing pages */
const LEGACY_SLUG_BY_SERVICE_ID: Record<string, string> = {
  '1': 'home-nurse',
  '2': 'physiotherapy',
  '3': 'mother-baby',
  '5': 'caregiver-assistant',
  '6': 'geriatric-care',
}

export type PricingAccent = (typeof PRICING_ACCENTS)[number]

export type PricingTier = {
  id: string
  name: string
  shiftLabel: string
  listPrice: number
  dealPrice: number
  savings: number
}

export type PricingPlan = {
  id: string
  bookingServiceTypeId: string
  title: string
  shortTitle: string
  description: string
  icon: string
  accent: PricingAccent
  tiers: PricingTier[]
  daily: number
  discountedDaily: number
  monthly: number
  discountedMonthly: number
  maxSavings: number
  bookHref: string
  serviceHref: string
}

export type ServiceNavLink = {
  id: string
  name: string
  slug: string
  href: string
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getServiceSlug(service: Pick<Service, 'id' | 'name'>): string {
  return LEGACY_SLUG_BY_SERVICE_ID[service.id] ?? slugify(service.name)
}

/** Map Supabase `service_types.icon` to ServiceIcon keys */
export function mapDbIconToUi(dbIcon: string): string {
  const key = dbIcon?.trim().toLowerCase()
  const map: Record<string, string> = {
    medical: 'nurse',
    fitness: 'physio',
    'baby-carriage': 'baby',
    elderly: 'elder',
    accessibility: 'accessibility',
    bandage: 'nurse',
  }
  return map[key] ?? 'elder'
}

function shiftLabelFromSubtype(sub: ServiceSubtype): string {
  const name = sub.shiftTypeName?.trim()
  const hours = sub.shiftDurationHours
  if (name && hours) return `${name} · ${hours}H`
  if (name) return name
  if (hours) return `${hours}H session`
  return 'Per visit'
}

function applyDiscount(price: number, discountPct: number): number {
  if (!discountPct || discountPct <= 0) return price
  return Math.round((price * (100 - discountPct)) / 100)
}

function monthlyFromDaily(daily: number): number {
  return Math.round(daily * 30)
}

function buildTiers(subtypes: ServiceSubtype[], discountPct: number): PricingTier[] {
  return subtypes.map((sub) => {
    const listPrice = Number(sub.price)
    const dealPrice = applyDiscount(listPrice, discountPct)
    return {
      id: sub.id,
      name: sub.userFriendlyName || sub.subtypeName,
      shiftLabel: shiftLabelFromSubtype(sub),
      listPrice,
      dealPrice,
      savings: listPrice - dealPrice,
    }
  })
}

export function buildPricingPlans(services: Service[], discountPct: number): PricingPlan[] {
  return services
    .filter((s) => s.subtypes?.length)
    .map((service, index) => {
      const tiers = buildTiers(service.subtypes ?? [], discountPct)
      const lowestDeal = tiers.reduce((min, t) => (t.dealPrice < min ? t.dealPrice : min), tiers[0].dealPrice)
      const lowestList = tiers.reduce((min, t) => (t.listPrice < min ? t.listPrice : min), tiers[0].listPrice)
      const maxSavings = tiers.reduce((max, t) => (t.savings > max ? t.savings : max), 0)
      const slug = getServiceSlug(service)

      return {
        id: slug,
        bookingServiceTypeId: service.id,
        title: service.name,
        shortTitle: service.name,
        description: service.description,
        icon: mapDbIconToUi(service.icon),
        accent: PRICING_ACCENTS[index % PRICING_ACCENTS.length],
        tiers,
        daily: lowestList,
        discountedDaily: lowestDeal,
        monthly: monthlyFromDaily(lowestList),
        discountedMonthly: monthlyFromDaily(lowestDeal),
        maxSavings,
        bookHref: `/app/book/${service.id}`,
        serviceHref: `/services/${slug}`,
      }
    })
}

export function buildServiceNavLinks(services: Service[]): ServiceNavLink[] {
  return services.map((service) => {
    const slug = getServiceSlug(service)
    return {
      id: service.id,
      name: service.name,
      slug,
      href: `/services/${slug}`,
    }
  })
}
