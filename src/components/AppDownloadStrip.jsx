'use client'

import Link from 'next/link'
import { Smartphone } from 'lucide-react'
import { config } from '@/data/config'
import './AppDownloadStrip.css'

export function AppDownloadStrip() {
  return (
    <section className="app-download-strip" aria-labelledby="app-download-strip-heading">
      <div className="container">
        <div className="app-download-strip__inner">
          <div className="app-download-strip__copy">
            <span className="app-download-strip__icon-wrap" aria-hidden>
              <Smartphone strokeWidth={1.75} />
            </span>
            <div>
              <h2 id="app-download-strip-heading" className="app-download-strip__title">
                Get the Ambimed app
              </h2>
              <p className="app-download-strip__sub">
                Book care, track visits, and manage appointments from your phone.
              </p>
            </div>
          </div>

          <div className="app-download-strip__actions">
            <a
              href={config.clientAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="app-download-strip__badge-link"
              aria-label="Download Ambimed on Google Play"
            >
              <img
                src="/assets/google-play-badge.svg"
                alt=""
                className="app-download-strip__badge"
                width={156}
                height={46}
              />
            </a>
            <Link href="#apps" className="app-download-strip__ios-link">
              iOS coming soon
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
