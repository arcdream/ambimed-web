import { motion } from 'framer-motion'
import { whyChooseItems } from '../../data/homepage'
import './WhyChooseAmbimed.css'

export function WhyChooseAmbimed() {
  return (
    <section id="why-choose" className="section why-choose">
      <div className="container">
        <p className="section-subtitle">Why Ambimed</p>
        <h2 className="section-title">Why Choose Ambimed</h2>
        <div className="why-choose-grid">
          {whyChooseItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="why-choose-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="why-choose-icon" aria-hidden>{item.icon}</span>
              <h3 className="why-choose-title">{item.title}</h3>
              <p className="why-choose-desc">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
