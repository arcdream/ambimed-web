const LOGIN_FROM_KEY = 'ambimed_login_from'
const LOGIN_REASON_KEY = 'ambimed_login_reason'
const RESUME_BOOKING_KEY = 'ambimed_resume_booking'

export function setLoginRedirect(from: string, reason?: 'booking'): void {
  try {
    sessionStorage.setItem(LOGIN_FROM_KEY, from)
    if (reason) sessionStorage.setItem(LOGIN_REASON_KEY, reason)
    else sessionStorage.removeItem(LOGIN_REASON_KEY)
  } catch {
    /* ignore */
  }
}

export function getLoginRedirect(): { from: string | null; reason: string | null } {
  try {
    return {
      from: sessionStorage.getItem(LOGIN_FROM_KEY),
      reason: sessionStorage.getItem(LOGIN_REASON_KEY),
    }
  } catch {
    return { from: null, reason: null }
  }
}

export function clearLoginRedirect(): void {
  try {
    sessionStorage.removeItem(LOGIN_FROM_KEY)
    sessionStorage.removeItem(LOGIN_REASON_KEY)
  } catch {
    /* ignore */
  }
}

export function setResumeBookingFlag(): void {
  try {
    sessionStorage.setItem(RESUME_BOOKING_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function consumeResumeBookingFlag(): boolean {
  try {
    const v = sessionStorage.getItem(RESUME_BOOKING_KEY)
    sessionStorage.removeItem(RESUME_BOOKING_KEY)
    return v === '1'
  } catch {
    return false
  }
}
