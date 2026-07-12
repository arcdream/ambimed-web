import { useState } from 'react'
import './FaqAccordion.css'

export function FaqAccordion({ faqs, className = '' }) {
  const [openIndex, setOpenIndex] = useState(0)

  if (!faqs?.length) return null

  return (
    <div className={`faq-accordion ${className}`.trim()}>
      {faqs.map((faq, i) => (
        <div key={faq.question} className={`faq-item${openIndex === i ? ' faq-item--open' : ''}`}>
          <button
            type="button"
            className="faq-question"
            aria-expanded={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            {faq.question}
            <span className="faq-chevron" aria-hidden>{openIndex === i ? '−' : '+'}</span>
          </button>
          {openIndex === i && <p className="faq-answer">{faq.answer}</p>}
        </div>
      ))}
    </div>
  )
}
