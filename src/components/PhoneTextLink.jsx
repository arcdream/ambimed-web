import { getDisplayPhone, getTelHref } from '@/lib/contactLinks'

import './PhoneTextLink.css'

export function PhoneTextLink({ prefix = 'or call ' }) {
  const phone = getDisplayPhone()
  const telHref = getTelHref()

  return (
    <span className="phone-text-link-wrap">
      {prefix}
      <a href={telHref} className="phone-text-link">
        {phone}
      </a>
    </span>
  )
}
