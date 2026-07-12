import { howItWorksSteps } from '../../data/homepage'
import './HowItWorks.css'

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section how-it-works">
      <div className="container">
        <p className="section-subtitle">Simple Process</p>
        <h2 className="section-title">How It Works</h2>
        <div className="how-steps">
          {howItWorksSteps.map((step, i) => (
            <div key={step.title} className="how-step-wrap">
              <div className="how-step">
                <span className="how-step-num">{i + 1}</span>
                <h3 className="how-step-title">{step.title}</h3>
                <p className="how-step-desc">{step.description}</p>
              </div>
              {i < howItWorksSteps.length - 1 && (
                <span className="how-step-arrow" aria-hidden>↓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
