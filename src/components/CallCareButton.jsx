'use client'

import { Phone } from 'lucide-react'
import { CUSTOMER_CARE_LABEL, getDisplayPhone, getTelHref } from '@/lib/contactLinks'
import { useCallContact } from '@/components/CallContactProvider'
import { shouldUsePhoneDialer } from '@/lib/isMobileCallDevice'
import './CallCareButton.css'

export function CallCareButton({
  variant = 'primary',
  showPhone = false,
  className = '',
  label = CUSTOMER_CARE_LABEL,
}) {
  const { openCallContact } = useCallContact()
  const telHref = getTelHref()
  const phone = getDisplayPhone()

  const handleClick = (e) => {
    if (shouldUsePhoneDialer()) return
    e.preventDefault()
    openCallContact()
  }

  return (
    <a
      href={telHref}
      onClick={handleClick}
      className={`call-care-btn call-care-btn--${variant}${className ? ` ${className}` : ''}`}
      aria-label={`${label}${showPhone ? ` at ${phone}` : ''}`}
    >
      <Phone className="call-care-btn__icon" strokeWidth={2.25} aria-hidden />
      <span className="call-care-btn__copy">
        <span className="call-care-btn__label">{label}</span>
        {showPhone ? <span className="call-care-btn__phone">{phone}</span> : null}
      </span>
    </a>
  )
}
