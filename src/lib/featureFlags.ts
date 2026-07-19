import { config } from '@/data/config'

/** When true, web login and booking flows are hidden and blocked. Default: true */
export function isLoginAndBookingDisabled(): boolean {
  return config.disableLoginAndBooking !== false
}

export function isBookingOrLoginPath(pathname: string): boolean {
  return (
    pathname === '/app/login' ||
    pathname === '/app/booking' ||
    pathname.startsWith('/app/book/')
  )
}
