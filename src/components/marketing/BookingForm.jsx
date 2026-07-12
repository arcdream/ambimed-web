import { useState } from 'react'
import { config } from '../../data/config'
import { bookingServiceOptions } from '../../data/homepage'
import './BookingForm.css'

export function BookingForm({
  title = 'Book a Service',
  defaultService = '',
  defaultArea = 'Bangalore',
  variant = 'dark',
  compact = false,
}) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={`bk-form bk-form--success bk-form--${variant}`}>
        <p className="bk-form-success-title">Request received!</p>
        <p>Our care team will call you within 30 minutes to confirm your booking.</p>
        <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="bk-form-call">
          Or call {config.contact.phone}
        </a>
      </div>
    )
  }

  return (
    <form className={`bk-form bk-form--${variant}${compact ? ' bk-form--compact' : ''}`} onSubmit={handleSubmit}>
      <h3 className="bk-form-title">{title}</h3>
      <label className="bk-form-label">
        Name
        <input type="text" name="name" required placeholder="Your full name" className="bk-form-input" />
      </label>
      <label className="bk-form-label">
        Phone
        <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className="bk-form-input" />
      </label>
      <label className="bk-form-label">
        Service Required
        <select name="service" defaultValue={defaultService || bookingServiceOptions[0].value} className="bk-form-input">
          {bookingServiceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>
      <label className="bk-form-label">
        Area
        <input type="text" name="area" defaultValue={defaultArea} placeholder="Your area" className="bk-form-input" />
      </label>
      <label className="bk-form-label">
        Preferred Date
        <input type="date" name="date" className="bk-form-input" />
      </label>
      <button type="submit" className="bk-form-submit">Submit</button>
    </form>
  )
}
