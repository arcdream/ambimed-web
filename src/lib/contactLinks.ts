import { config } from '@/data/config'

/** Digits-only string for tel: and wa.me links */
export function getPhoneDigits(phone = config.contact.phone): string {
  return String(phone).replace(/\D/g, '')
}

export function getTelHref(phone = config.contact.phone): string {
  return `tel:${getPhoneDigits(phone)}`
}

/**
 * QR payload for scan-to-call — must match getTelHref() (digits only, no "+").
 * A "+" in tel: URIs breaks many Android scanners (wrong area codes like "835:").
 */
export function getTelQrValue(phone = config.contact.phone): string {
  return getTelHref(phone)
}

export function getWhatsAppHref(message?: string): string {
  const digits = config.contact.whatsapp || getPhoneDigits()
  const base = `https://wa.me/${digits}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/** Human-readable phone for display (trimmed from config) */
export function getDisplayPhone(): string {
  return config.contact.phone.replace(/\s+/g, ' ').trim()
}

export const CUSTOMER_CARE_LABEL = 'Call customer care'
