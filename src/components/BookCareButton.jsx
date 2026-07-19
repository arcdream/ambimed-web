'use client'

import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { BOOK_CARE_HREF, BOOK_CARE_LABEL, getBookCareHref } from '@/lib/ctaLinks'
import './BookCareButton.css'

/**
 * @param {{
 *   variant?: 'primary' | 'nav' | 'compact',
 *   label?: string,
 *   href?: string,
 *   showArrow?: boolean,
 *   className?: string,
 * }} props
 */
export function BookCareButton({
  variant = 'primary',
  label = BOOK_CARE_LABEL,
  href,
  showArrow = false,
  className = '',
}) {
  const destination = href ?? getBookCareHref()
  const isExternal = destination.startsWith('http')

  const content = (
    <>
      <Calendar className="book-care-btn__icon" strokeWidth={2} aria-hidden />
      <span className="book-care-btn__label">{label}</span>
      {showArrow ? <ArrowRight className="book-care-btn__arrow" strokeWidth={2.25} aria-hidden /> : null}
    </>
  )

  const classes = `book-care-btn book-care-btn--${variant}${className ? ` ${className}` : ''}`

  if (isExternal) {
    return (
      <a href={destination} className={classes} aria-label={label} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return (
    <Link href={destination} className={classes} aria-label={label}>
      {content}
    </Link>
  )
}

export { BOOK_CARE_HREF }
