import { BookingForm } from '../marketing/BookingForm'
import './BookServiceSection.css'

export function BookServiceSection() {
  return (
    <section id="book" className="section book-section">
      <div className="container book-section-inner">
        <div className="book-section-copy">
          <p className="section-subtitle">Get Started</p>
          <h2 className="section-title">Book a Home Healthcare Service</h2>
          <p className="book-section-desc">
            Fill in your details and our care team will call you within 30 minutes to confirm
            your booking in Bangalore.
          </p>
        </div>
        <div className="book-section-form">
          <BookingForm title="Book a Service" defaultArea="Bangalore" />
        </div>
      </div>
    </section>
  )
}
