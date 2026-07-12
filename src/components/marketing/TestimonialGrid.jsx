import './TestimonialGrid.css'

function StarRating({ count = 5 }) {
  return (
    <span className="tm-stars" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
    </span>
  )
}

export function TestimonialGrid({ testimonials, title = 'Trusted by Families' }) {
  return (
    <section className="tm-section section">
      <div className="container">
        <p className="section-subtitle">Testimonials</p>
        <h2 className="section-title">{title}</h2>
        <div className="tm-grid">
          {testimonials.map((t) => (
            <article key={t.name + t.city} className="tm-card">
              <StarRating count={t.rating ?? 5} />
              <blockquote className="tm-text">&ldquo;{t.text}&rdquo;</blockquote>
              <p className="tm-author">— {t.name}{t.city ? `, ${t.city}` : ''}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export const defaultTestimonials = [
  { name: 'Priya Sharma', city: 'Bangalore', text: 'Ambimed caregivers are professional and kind. My father looks forward to their visits. Transparent billing and easy booking.', rating: 5 },
  { name: 'Ramesh Kumar', city: 'Koramangala', text: 'Home physiotherapy made recovery so much easier. The therapist was punctual, well-trained, and very effective.', rating: 5 },
  { name: 'Anita Desai', city: 'Whitefield', text: 'The postnatal care and baby care support were excellent. The nurse was gentle, knowledgeable, and helped our family immensely.', rating: 5 },
]
