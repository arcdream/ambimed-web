'use client'

import { useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { config } from '../data/config'
import './Apps.css'

export function Apps() {
  const [iosEmail, setIosEmail] = useState('')
  const [iosSubmitted, setIosSubmitted] = useState(false)

  function handleIosNotify(e) {
    e.preventDefault()
    const trimmed = iosEmail.trim()
    if (!trimmed) return
    const subject = encodeURIComponent('Notify me when Ambimed iOS app launches')
    const body = encodeURIComponent(`Please notify me at ${trimmed} when the Ambimed iOS app is available.`)
    window.location.href = `mailto:${config.contact.email}?subject=${subject}&body=${body}`
    setIosSubmitted(true)
  }

  return (
    <section id="apps" className="section section-apps">
      <div className="container">
        <Reveal as="p" className="section-subtitle">
          Mobile Apps
        </Reveal>

        <Reveal as="h2" className="section-title">
          Our Apps
        </Reveal>

        <Reveal as="h3" className="section-subheading" delay={0.05} y={12}>
          Book healthcare services from your phone
        </Reveal>

        <Reveal className="apps-grid" y={20}>
          <div className="app-card featured">
            <span className="app-badge">TO BOOK SERVICES</span>

            <h4 className="app-card-title">AmbiMed Healthcare</h4>

            <p className="app-card-desc">
              Book nurses, attendants, caregivers, physiotherapy and home healthcare services directly from your mobile
              phone.
            </p>

            <ul className="app-features">
              <li>Book healthcare services instantly</li>
              <li>Track and manage appointments</li>
              <li>Secure booking experience</li>
              <li>Fast support and updates</li>
            </ul>

            <div className="app-store-badges">
              <a
                href={config.clientAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="play-badge-link"
              >
                <img
                  src="/assets/google-play-badge.svg"
                  alt="Get it on Google Play"
                  className="google-play-badge"
                />
              </a>
            </div>

            <div className="ios-coming-soon">
              <p className="ios-coming-soon__label">iOS app coming soon</p>
              {iosSubmitted ? (
                <p className="ios-coming-soon__success">Thanks — we&apos;ll reach out when the iOS app launches.</p>
              ) : (
                <form className="ios-coming-soon__form" onSubmit={handleIosNotify}>
                  <label htmlFor="ios-notify-email" className="visually-hidden">
                    Email for iOS app launch notification
                  </label>
                  <input
                    id="ios-notify-email"
                    type="email"
                    name="email"
                    placeholder="Your email — notify me"
                    className="ios-coming-soon__input"
                    value={iosEmail}
                    onChange={(e) => setIosEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <button type="submit" className="btn btn-secondary ios-coming-soon__btn">
                    Notify me
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
