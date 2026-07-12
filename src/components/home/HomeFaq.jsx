import { FaqAccordion } from '../marketing/FaqAccordion'
import { homepageFaqs } from '../../data/homepage'

export function HomeFaq() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <p className="section-subtitle">FAQ</p>
        <h2 className="section-title">Common Questions</h2>
        <div style={{ maxWidth: '48rem' }}>
          <FaqAccordion faqs={homepageFaqs} />
        </div>
      </div>
    </section>
  )
}
