'use client'

import { Reveal } from '@/components/motion/Reveal'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
import { testimonials } from '../data/testimonials'
import './Testimonials.css'

export function Testimonials() {
  return (
    <section id="testimonials" className="section section-testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <Reveal as="p" className="section-subtitle">
          What families say
        </Reveal>
        <Reveal as="h2" id="testimonials-heading" className="section-title">
          Customer feedback
        </Reveal>
        <TestimonialsCarousel items={testimonials} />
      </div>
    </section>
  )
}
