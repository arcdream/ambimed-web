'use client'

import { useState } from 'react'
import { config } from '@/data/config'

export function ServiceLeadForm({ serviceTitle, defaultCity = '' }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const phoneDigits = config.contact.phone.replace(/\D/g, '')

  if (submitted) {
    return (
      <div className="svc-lead-form svc-lead-form--success">
        <p className="svc-lead-form-success-title">Request received!</p>
        <p>Our care team will call you within 30 minutes to confirm your booking.</p>
        <a href={`tel:${phoneDigits}`} className="svc-lead-form-call">
          Or call {config.contact.phone}
        </a>
      </div>
    )
  }

  return (
    <form className="svc-lead-form" onSubmit={handleSubmit}>
      <h3 className="svc-lead-form-title">Book {serviceTitle} Now</h3>
      <label className="svc-lead-form-label">
        Full Name
        <input type="text" name="name" required placeholder="Your full name" className="svc-lead-form-input" />
      </label>
      <label className="svc-lead-form-label">
        Phone Number
        <input type="tel" name="phone" required placeholder="10-digit mobile" className="svc-lead-form-input" />
      </label>
      <label className="svc-lead-form-label">
        City
        <input type="text" name="city" defaultValue={defaultCity} required placeholder="Your city" className="svc-lead-form-input" />
      </label>
      <label className="svc-lead-form-label">
        Service Required
        <input type="text" name="service" readOnly value={serviceTitle} className="svc-lead-form-input svc-lead-form-input--readonly" />
      </label>
      <button type="submit" className="svc-lead-form-submit">
        Submit Request
      </button>
    </form>
  )
}
