'use client'

import { Smartphone } from 'lucide-react'
import { config } from '@/data/config'
import './AppDownloadStrip.css'

export function AppDownloadStrip() {
  return (
    <section className="app-strip" aria-labelledby="app-strip-heading">
      <div className="container app-strip__container">
        <div className="app-strip__card">
          <div className="app-strip__copy">
            <span className="app-strip__icon-wrap" aria-hidden>
              <Smartphone strokeWidth={1.75} />
            </span>
            <div className="app-strip__text">
              <h2 id="app-strip-heading" className="app-strip__title">
                Get the Ambimed app
              </h2>
              <p className="app-strip__sub">
                Book care and track visits from your phone.
              </p>
            </div>
          </div>

          <div className="app-strip__actions">
            <a
              href={config.clientAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="app-strip__badge-link"
              aria-label="Download Ambimed on Google Play"
            >
              <img
                src="/assets/google-play-badge.svg"
                alt=""
                className="app-strip__badge"
                width={152}
                height={45}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
