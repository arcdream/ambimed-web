/** Matches ContactFloat breakpoint — mobile uses native tel: dialer */
const MOBILE_CALL_MQ = '(max-width: 767px)'

export function shouldUsePhoneDialer(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(MOBILE_CALL_MQ).matches
}

export function getMobileCallMediaQuery(): string {
  return MOBILE_CALL_MQ
}
