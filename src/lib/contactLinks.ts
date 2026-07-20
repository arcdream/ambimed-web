import { config } from '@/data/config'

/** Digits-only string for tel: and wa.me links */
export function getPhoneDigits(phone = config.contact.phone): string {
  return String(phone).replace(/\D/g, '')
}

export function getTelHref(phone = config.contact.phone): string {
  return `tel:${getPhoneDigits(phone)}`
}

/** tel: value for QR codes — E.164-style with + prefix */
export function getTelQrValue(phone = config.contact.phone): string {
  const digits = getPhoneDigits(phone)
  return digits.startsWith('+') ? `tel:${digits}` : `tel:+${digits}`
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
