'use client'

import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
import './TestimonialGrid.css'

export function TestimonialGrid({ testimonials, title = 'Trusted by Families', subtitle = 'Testimonials' }) {
  return (
    <section className="tm-section section">
      <div className="container">
        <p className="section-subtitle">{subtitle}</p>
        <h2 className="section-title">{title}</h2>
        <TestimonialsCarousel items={testimonials} />
      </div>
    </section>
  )
}

export const defaultTestimonials = [
  {
    name: 'Priya Sharma',
    city: 'Bangalore',
    text: 'Ambimed caregivers are professional and kind. My father looks forward to their visits. Transparent billing and easy booking.',
    rating: 5,
  },
  {
    name: 'Ramesh Kumar',
    city: 'Koramangala',
    text: 'Home physiotherapy made recovery so much easier. The therapist was punctual, well-trained, and very effective.',
    rating: 5,
  },
  {
    name: 'Anita Desai',
    city: 'Whitefield',
    text: 'The postnatal care and baby care support were excellent. The nurse was gentle, knowledgeable, and helped our family immensely.',
    rating: 5,
  },
]
