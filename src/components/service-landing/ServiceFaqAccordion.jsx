'use client'

import { useState } from 'react'
import './ServiceLandingPage.css'

export function ServiceFaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="svc-faq-list">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div key={item.q} className={`svc-faq-item${open ? ' open' : ''}`}>
            <button
              type="button"
              className="svc-faq-question"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : i)}
            >
              <span>{item.q}</span>
              <span className="svc-faq-icon" aria-hidden>
                {open ? '−' : '+'}
              </span>
            </button>
            {open && <div className="svc-faq-answer">{item.a}</div>}
          </div>
        )
      })}
    </div>
  )
}
