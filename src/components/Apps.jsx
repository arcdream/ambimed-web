'use client'

import { Reveal } from '@/components/motion/Reveal'
import { config } from '../data/config'
import './Apps.css'

export function Apps() {
  return (
    <section id="apps" className="section section-apps">
      <div className="container">
        <Reveal as="p" className="section-subtitle">
          Mobile App
        </Reveal>

        <Reveal as="h2" className="section-title apps-section-title">
          Download Ambimed
        </Reveal>

        <Reveal className="apps-card" y={16}>
          <h3 className="apps-card__name">AmbiMed Healthcare</h3>
          <p className="apps-card__lead">Book and track home care from your phone.</p>

          <ul className="apps-card__features" aria-label="App highlights">
            <li>Book visits</li>
            <li>Track caregivers</li>
            <li>Manage appointments</li>
          </ul>

          <a
            href={config.clientAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="apps-card__badge-link"
            aria-label="Get Ambimed on Google Play"
          >
            <img
              src="/assets/google-play-badge.svg"
              alt=""
              className="apps-card__badge"
              width={156}
              height={46}
            />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
