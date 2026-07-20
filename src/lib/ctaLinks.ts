import { config } from '@/data/config'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'

export const BOOK_CARE_HREF = '/app/booking'
export const BOOK_CARE_LABEL = 'Book Care'
export const BOOK_HOME_CARE_LABEL = 'Book Home Care'

/** Primary conversion destination — booking when enabled, contact fallback otherwise */
export function getBookCareHref(): string {
  return isLoginAndBookingDisabled() ? '/contact' : BOOK_CARE_HREF
}

export function getServicesHref(): string {
  return '/#services'
}

export const heroSecondaryLinks = {
  services: { label: 'View Services', href: getServicesHref() },
}
