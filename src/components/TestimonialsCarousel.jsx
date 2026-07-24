'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import './TestimonialsCarousel.css'

const ROTATE_INTERVAL_MS = 5500

function getVisibleCount(width) {
  if (width >= 900) return 4
  if (width >= 600) return 2
  return 1
}

function StarRating({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </span>
  )
}

/** @param {Array<{ id?: string|number, name: string, text?: string, quote?: string, role?: string, rating?: number }>} items */
export function normalizeTestimonialItems(items) {
  return items.map((item, index) => ({
    id: item.id ?? `${item.name}-${index}`,
    name: item.name,
    text: item.text ?? item.quote ?? '',
    role: item.role ?? item.city ?? '',
    rating: item.rating ?? 5,
  }))
}

export function TestimonialsCarousel({ items, ariaLabel = 'Customer testimonials carousel' }) {
  const normalizedItems = useMemo(() => normalizeTestimonialItems(items), [items])
  const total = normalizedItems.length

  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const maxIndex = Math.max(0, total - visibleCount)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReducedMotion(media.matches)
    syncMotion()
    media.addEventListener('change', syncMotion)
    return () => media.removeEventListener('change', syncMotion)
  }, [])

  useEffect(() => {
    const syncVisibleCount = () => setVisibleCount(getVisibleCount(window.innerWidth))
    syncVisibleCount()
    window.addEventListener('resize', syncVisibleCount)
    return () => window.removeEventListener('resize', syncVisibleCount)
  }, [])

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  useEffect(() => {
    if (paused || reducedMotion || maxIndex === 0) return
    const timer = window.setInterval(next, ROTATE_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [next, paused, reducedMotion, maxIndex])

  if (total === 0) return null

  return (
    <div
      className="testimonials-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      <div
        className="testimonials-carousel__viewport"
        aria-live="polite"
        aria-atomic="true"
        aria-label={ariaLabel}
      >
        <ul
          className="testimonials-carousel__track"
          style={{
            '--active-index': activeIndex,
            '--total-count': total,
            '--visible-count': visibleCount,
          }}
        >
          {normalizedItems.map((item) => (
            <li key={item.id} className="testimonials-carousel__slide">
              <article className="testimonial-card">
                <StarRating rating={item.rating} />
                <blockquote className="testimonial-text">&ldquo;{item.text}&rdquo;</blockquote>
                <footer className="testimonial-author">
                  <h3 className="testimonial-name">{item.name}</h3>
                  {item.role ? <p className="testimonial-role">{item.role}</p> : null}
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {maxIndex > 0 ? (
        <div className="testimonials-carousel__dots" role="tablist" aria-label="Testimonial slides">
          {normalizedItems.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`testimonials-carousel__dot${i === activeIndex ? ' testimonials-carousel__dot--active' : ''}`}
              aria-selected={i === activeIndex}
              aria-label={`Show feedback from ${item.name}`}
              onClick={() => setActiveIndex(Math.min(i, maxIndex))}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
