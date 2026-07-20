'use client'

import { getDisplayPhone, getTelHref } from '@/lib/contactLinks'
import { useCallContact } from '@/components/CallContactProvider'
import { shouldUsePhoneDialer } from '@/lib/isMobileCallDevice'
import './PhoneTextLink.css'

export function PhoneTextLink({ prefix = 'or call ' }) {
  const { openCallContact } = useCallContact()
  const phone = getDisplayPhone()
  const telHref = getTelHref()

  const handleClick = (e) => {
    if (shouldUsePhoneDialer()) return
    e.preventDefault()
    openCallContact()
  }

  return (
    <span className="phone-text-link-wrap">
      {prefix}
      <a href={telHref} className="phone-text-link" onClick={handleClick}>
        {phone}
      </a>
    </span>
  )
}
