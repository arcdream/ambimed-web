'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '@/client-app/context/AuthContext'
import { config } from '@/data/config'
import { heroBannerSlides } from '@/data/heroBanner'

const SLIDE_INTERVAL_MS = 6000

function GooglePlayIcon() {
  return (
    <svg className="hero-banner-app-icon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M3.6 2.4A1.2 1.2 0 0 0 2.4 3.6v16.8a1.2 1.2 0 0 0 1.8 1.05l12.6-7.2a1.2 1.2 0 0 0 0-2.1L3.6 2.4Z"
      />
    </svg>
  )
}

function scrollToServices() {
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const first = user?.firstName?.trim()
  const personalized = isAuthenticated && !isLoading && !!user
  const slide = heroBannerSlides[activeIndex]

  const goTo = useCallback((index) => {
    setActiveIndex((index + heroBannerSlides.length) % heroBannerSlides.length)
  }, [])

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(next, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [next, paused])

  return (
    <section
      id="hero"
      className={`hero hero--banner${personalized ? ' hero--personalized' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container">
        <div className="hero-banner-frame">
        <div className="hero-banner-track" aria-hidden>
          <AnimatePresence mode="sync">
            <motion.div
              key={slide.id}
              className="hero-banner-slide"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: 'easeInOut' }}
            >
              <img src={slide.image} alt="" className="hero-banner-image" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-banner-overlay" aria-hidden />

        <div className="hero-banner-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="hero-banner-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
          >
            {personalized ? (
              <p className="hero-badge hero-badge--welcome hero-badge--on-banner">
                Welcome back{first ? `, ${first}` : ''}
              </p>
            ) : (
              <p className="hero-badge hero-badge--on-banner">{slide.badge}</p>
            )}
            <h1 className="hero-title hero-title--banner">
              {personalized ? (
                <>
                  Your care hub is <span className="hero-highlight">ready</span>
                </>
              ) : (
                <>
                  {slide.title} <span className="hero-highlight">{slide.highlight}</span>
                </>
              )}
            </h1>
            <p className="hero-desc hero-desc--banner">
              {personalized
                ? 'Book visits, track caregivers, and manage home care — on web or the Ambimed app.'
                : slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="hero-banner-actions">
          <Link href="/app/booking" className="btn btn-primary btn--banner">
            Book care
          </Link>
          <button type="button" className="btn btn-secondary btn--banner" onClick={scrollToServices}>
            Our services
          </button>
        </div>

        <a
          href={config.clientAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-banner-app-download"
          aria-label="Download Ambimed Healthcare on Google Play"
        >
          <span className="hero-banner-app-download-icon-wrap" aria-hidden>
            <GooglePlayIcon />
          </span>
          <span className="hero-banner-app-download-text">
            <span className="hero-banner-app-download-label">Get the Android app</span>
            <span className="hero-banner-app-download-sub">Track caregivers · Book faster · OTP login</span>
          </span>
          <img
            src="/assets/google-play-badge.svg"
            alt=""
            className="hero-banner-app-badge"
            width={140}
            height={42}
          />
        </a>
        </div>

        <div className="hero-banner-controls">
          <button type="button" className="hero-banner-arrow hero-banner-arrow--prev" onClick={prev} aria-label="Previous slide">
            ‹
          </button>
          <div className="hero-banner-dots" role="tablist" aria-label="Hero banner slides">
            {heroBannerSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={s.title.replace(/\s+/g, ' ')}
                className={`hero-banner-dot${i === activeIndex ? ' active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button type="button" className="hero-banner-arrow hero-banner-arrow--next" onClick={next} aria-label="Next slide">
            ›
          </button>
        </div>

        <div className="hero-banner-progress" aria-hidden>
          <motion.div
            key={`${slide.id}-${paused}`}
            className="hero-banner-progress-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? undefined : 1 }}
            transition={{ duration: SLIDE_INTERVAL_MS / 1000, ease: 'linear' }}
          />
        </div>
        </div>
      </div>
    </section>
  )
}
