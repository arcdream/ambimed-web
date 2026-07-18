'use client'

import { Reveal } from '@/components/motion/Reveal'
import { testimonials } from '../data/testimonials'
import './Testimonials.css'

function StarRating({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>★</span>
      ))}
    </span>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section section-testimonials">
      <div className="container">
        <Reveal as="p" className="section-subtitle">
          What families say
        </Reveal>
        <Reveal as="h2" className="section-title">
          Customer feedback
        </Reveal>
        <div className="testimonials-grid">
          {testimonials.map((item, i) => (
            <Reveal
              key={item.id}
              as="article"
              className="testimonial-card"
              delay={i * 0.08}
              y={25}
              whileHover={{ y: -4 }}
            >
              <StarRating rating={item.rating} />
              <blockquote className="testimonial-text">"{item.text}"</blockquote>
              <footer className="testimonial-author">
                <h3 className="testimonial-name">{item.name}</h3>
                <p className="testimonial-role">{item.role}</p>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
