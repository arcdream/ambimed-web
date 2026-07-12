import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { homepageCategories } from '../../data/homepage'
import './ServiceCategories.css'

export function ServiceCategories() {
  return (
    <section id="services" className="section svc-categories">
      <div className="container">
        <p className="section-subtitle">Our Services</p>
        <h2 className="section-title">Home Healthcare Services</h2>
        <p className="svc-categories-intro">
          Professional, verified care at home — choose a service to learn more and book.
        </p>
        <div className="svc-categories-grid">
          {homepageCategories.map((cat, i) => (
            <motion.article
              key={cat.slug}
              className="svc-category-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="svc-category-image-wrap">
                <img src={cat.image} alt={cat.imageAlt} loading="lazy" />
              </div>
              <div className="svc-category-body">
                <h3 className="svc-category-title">{cat.title}</h3>
                <p className="svc-category-desc">{cat.description}</p>
                <Link to={`/${cat.slug}`} className="svc-category-cta">Learn More →</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
