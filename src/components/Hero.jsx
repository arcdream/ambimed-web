'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { heroBannerSlides, heroWelcomeCopy } from '@/data/heroBanner'
import { BookCareButton } from '@/components/BookCareButton'
import { PhoneTextLink } from '@/components/PhoneTextLink'
import { BOOK_HOME_CARE_LABEL, getServicesHref } from '@/lib/ctaLinks'
import { useAuth } from '@/client-app/context/AuthContext'
import './Hero.css'
import '@/components/BookCareButton.css'
import '@/components/PhoneTextLink.css'

const SLIDE_INTERVAL_MS = 6000
const SLIDE_COUNT = heroBannerSlides.length

export function Hero() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const first = user?.firstName?.trim()
  const showWelcome = isAuthenticated && !isLoading && !!user
  const slide = heroBannerSlides[activeIndex]

  const headline = showWelcome ? heroWelcomeCopy.headline : slide.headline
  const description = showWelcome ? heroWelcomeCopy.description : slide.description
  const copyKey = showWelcome ? 'welcome' : slide.id

  const goTo = useCallback((index) => {
    setActiveIndex((index + SLIDE_COUNT) % SLIDE_COUNT)
  }, [])

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(next, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [next, paused])

  return (
    <section id="hero" className="hero-simple" aria-labelledby="hero-heading">
      <div className="container hero-simple__container">
        <div className="hero-simple__grid">
          <div className="hero-simple__copy">
            {showWelcome && (
              <p className="hero-simple__welcome">Welcome back{first ? `, ${first}` : ''}</p>
            )}

            <div key={copyKey} className="hero-simple__copy-panel">
              <h1 id="hero-heading" className="hero-simple__headline">
                <span className="hero-simple__headline-line">{headline.line1}</span>
                {headline.line2 ? (
                  <span className="hero-simple__headline-line">{headline.line2}</span>
                ) : null}
                <span className="hero-simple__headline-line">
                  <span className="hero-simple__headline-accent">{headline.accent}</span>.
                </span>
              </h1>

              <div className="hero-simple__rule" aria-hidden />

              <p className="hero-simple__lead">{description}</p>
            </div>

            <div className="hero-simple__cta-group">
              <div className="hero-simple__cta-row">
                <BookCareButton variant="primary" label={BOOK_HOME_CARE_LABEL} showArrow />
                <Link href={getServicesHref()} className="hero-simple__secondary-cta">
                  View Services
                </Link>
              </div>
              <p className="hero-simple__call-hint">
                <PhoneTextLink />
              </p>
            </div>
          </div>

          <div
            className="hero-simple__visual"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="hero-simple__frame">
              {heroBannerSlides.map((s, i) => (
                <Image
                  key={s.id}
                  src={s.image}
                  alt={i === activeIndex ? s.alt : ''}
                  aria-hidden={i !== activeIndex}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 899px) 100vw, 46vw"
                  className={`hero-simple__slide${
                    s.imageFocus ? ` hero-simple__slide--${s.imageFocus}` : ''
                  }${i === activeIndex ? ' is-active' : ''}`}
                />
              ))}

              <svg
                className="hero-simple__wave"
                viewBox="0 0 1440 80"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,45 L1440,80 L0,80 Z"
                  fill="#ffffff"
                />
              </svg>

              <div className="hero-simple__progress" aria-hidden>
                <span
                  key={`${activeIndex}-${paused}`}
                  className={`hero-simple__progress-bar${paused ? ' is-paused' : ''}`}
                />
              </div>
            </div>

            <div className="hero-simple__nav" role="tablist" aria-label="Hero slides">
              {heroBannerSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={s.headline.line1}
                  className={`hero-simple__dot${i === activeIndex ? ' is-active' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
