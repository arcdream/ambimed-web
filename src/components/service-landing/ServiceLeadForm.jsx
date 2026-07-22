'use client'

import { useState } from 'react'
import { config } from '@/data/config'
import { submitLeadRequest } from '@/lib/submitLeadRequest'
import './ServiceLeadForm.css'

const MAX_DESCRIPTION_WORDS = 300

const REQUIRED_FIELD_ORDER = ['name', 'phone', 'city']

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

function getFieldErrors(formData) {
  const errors = {}

  if (!String(formData.get('name') ?? '').trim()) {
    errors.name = 'Please enter your full name.'
  }

  if (!String(formData.get('phone') ?? '').trim()) {
    errors.phone = 'Please enter your phone number.'
  }

  if (!String(formData.get('city') ?? '').trim()) {
    errors.city = 'Please enter your city.'
  }

  return errors
}

function RequiredMark() {
  return (
    <span className="svc-lead-form-required" aria-hidden="true">
      *
    </span>
  )
}

export function ServiceLeadForm({
  serviceTitle,
  defaultCity = '',
  serviceOptions = null,
  defaultService = '',
}) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [description, setDescription] = useState('')
  const [selectedService, setSelectedService] = useState(
    defaultService || serviceTitle || serviceOptions?.[0] || '',
  )

  const activeService = serviceOptions ? selectedService : serviceTitle

  const descriptionWordCount = countWords(description)

  const handleDescriptionChange = (e) => {
    setDescription(truncateToWordLimit(e.target.value, MAX_DESCRIPTION_WORDS))
  }

  const clearFieldError = (field) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const validationErrors = getFieldErrors(formData)

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      const firstInvalidField = REQUIRED_FIELD_ORDER.find((field) => validationErrors[field])
      if (firstInvalidField) {
        form.querySelector(`[name="${firstInvalidField}"]`)?.focus()
      }
      return
    }

    setFieldErrors({})
    setSubmitting(true)
    const trimmedDescription = description.trim()

    try {
      await submitLeadRequest({
        full_name: String(formData.get('name') ?? '').trim(),
        phone_number: String(formData.get('phone') ?? '').trim(),
        city: String(formData.get('city') ?? '').trim(),
        service_required: String(formData.get('service') ?? activeService).trim(),
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
      <h3 className="svc-lead-form-title">Book {activeService} Now</h3>
      <p className="svc-lead-form-hint">Fields marked with * are required.</p>
      <label className="svc-lead-form-label">
        Full Name <RequiredMark />
        <input
          type="text"
          name="name"
          required
          disabled={submitting}
          placeholder="Your full name"
          className={`svc-lead-form-input${fieldErrors.name ? ' svc-lead-form-input--invalid' : ''}`}
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? 'svc-lead-form-error-name' : undefined}
          onChange={() => clearFieldError('name')}
        />
        {fieldErrors.name ? (
          <span className="svc-lead-form-field-error" id="svc-lead-form-error-name" role="alert">
            {fieldErrors.name}
          </span>
        ) : null}
      </label>
      <label className="svc-lead-form-label">
        Phone Number <RequiredMark />
        <input
          type="tel"
          name="phone"
          required
          disabled={submitting}
          placeholder="10-digit mobile"
          className={`svc-lead-form-input${fieldErrors.phone ? ' svc-lead-form-input--invalid' : ''}`}
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={fieldErrors.phone ? 'svc-lead-form-error-phone' : undefined}
          onChange={() => clearFieldError('phone')}
        />
        {fieldErrors.phone ? (
          <span className="svc-lead-form-field-error" id="svc-lead-form-error-phone" role="alert">
            {fieldErrors.phone}
          </span>
        ) : null}
      </label>
      <label className="svc-lead-form-label">
        City <RequiredMark />
        <input
          type="text"
          name="city"
          defaultValue={defaultCity}
          required
          disabled={submitting}
          placeholder="Your city"
          className={`svc-lead-form-input${fieldErrors.city ? ' svc-lead-form-input--invalid' : ''}`}
          autoComplete="address-level2"
          aria-invalid={Boolean(fieldErrors.city)}
          aria-describedby={fieldErrors.city ? 'svc-lead-form-error-city' : undefined}
          onChange={() => clearFieldError('city')}
        />
        {fieldErrors.city ? (
          <span className="svc-lead-form-field-error" id="svc-lead-form-error-city" role="alert">
            {fieldErrors.city}
          </span>
        ) : null}
      </label>
      <label className="svc-lead-form-label">
        Service Required
        {serviceOptions ? (
          <select
            name="service"
            value={selectedService}
            disabled={submitting}
            className="svc-lead-form-input"
            onChange={(e) => setSelectedService(e.target.value)}
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            name="service"
            readOnly
            value={serviceTitle}
            className="svc-lead-form-input svc-lead-form-input--readonly"
          />
        )}
      </label>
      <label className="svc-lead-form-label">
        Description <span className="svc-lead-form-optional">(optional)</span>
        <textarea
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          disabled={submitting}
          placeholder="Tell us about your care needs"
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
