'use client'

import { Reveal } from '@/components/motion/Reveal'
import { config } from '../data/config'
import './Apps.css'

export function Apps() {
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

            <h4 className="app-card-title">
              AmbiMed Healthcare
            </h4>

            <p className="app-card-desc">
              Book nurses, attendants, caregivers, physiotherapy and home
              healthcare services directly from your mobile phone.
            </p>

            <ul className="app-features">
              <li>Book healthcare services instantly</li>
              <li>Track and manage appointments</li>
              <li>Secure booking experience</li>
              <li>Fast support and updates</li>
            </ul>

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
        </Reveal>
      </div>
    </section>
  )
}
