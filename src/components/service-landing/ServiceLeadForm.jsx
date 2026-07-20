'use client'

import { useState } from 'react'
import { config } from '@/data/config'
import { submitLeadRequest } from '@/lib/submitLeadRequest'

const MAX_DESCRIPTION_WORDS = 300

function countWords(text) {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

function truncateToWordLimit(text, maxWords) {
  const parts = text.match(/\S+\s*/g)
  if (!parts || parts.length <= maxWords) return text
  return parts.slice(0, maxWords).join('')
}

export function ServiceLeadForm({ serviceTitle, defaultCity = '' }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [description, setDescription] = useState('')

  const descriptionWordCount = countWords(description)

  const handleDescriptionChange = (e) => {
    setDescription(truncateToWordLimit(e.target.value, MAX_DESCRIPTION_WORDS))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const trimmedDescription = description.trim()

    try {
      await submitLeadRequest({
        full_name: String(formData.get('name') ?? '').trim(),
        phone_number: String(formData.get('phone') ?? '').trim(),
        city: String(formData.get('city') ?? '').trim(),
        service_required: String(formData.get('service') ?? serviceTitle).trim(),
        description: trimmedDescription,
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Lead form submission failed:', err)
      setError(
        err instanceof Error && err.message
          ? err.message
          : 'Could not send your request. Please try again or call customer care.',
      )
    } finally {
      setSubmitting(false)
    }
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
    <form className="svc-lead-form" onSubmit={handleSubmit} noValidate>
      <h3 className="svc-lead-form-title">Book {serviceTitle} Now</h3>
      <label className="svc-lead-form-label">
        Full Name
        <input
          type="text"
          name="name"
          required
          disabled={submitting}
          placeholder="Your full name"
          className="svc-lead-form-input"
          autoComplete="name"
        />
      </label>
      <label className="svc-lead-form-label">
        Phone Number
        <input
          type="tel"
          name="phone"
          required
          disabled={submitting}
          placeholder="10-digit mobile"
          className="svc-lead-form-input"
          autoComplete="tel"
          inputMode="tel"
        />
      </label>
      <label className="svc-lead-form-label">
        City
        <input
          type="text"
          name="city"
          defaultValue={defaultCity}
          required
          disabled={submitting}
          placeholder="Your city"
          className="svc-lead-form-input"
          autoComplete="address-level2"
        />
      </label>
      <label className="svc-lead-form-label">
        Service Required
        <input
          type="text"
          name="service"
          readOnly
          value={serviceTitle}
          className="svc-lead-form-input svc-lead-form-input--readonly"
        />
      </label>
      <label className="svc-lead-form-label">
        Description
        <textarea
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          disabled={submitting}
          placeholder="Tell us about your care needs (optional)"
          className="svc-lead-form-input svc-lead-form-textarea"
          rows={4}
        />
        <span
          className={`svc-lead-form-word-count${
            descriptionWordCount >= MAX_DESCRIPTION_WORDS ? ' svc-lead-form-word-count--limit' : ''
          }`}
          aria-live="polite"
        >
          {descriptionWordCount} / {MAX_DESCRIPTION_WORDS} words
        </span>
      </label>
      {error ? (
        <p className="svc-lead-form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="svc-lead-form-submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Submit Request'}
      </button>
    </form>
  )
}
