import { bangaloreAreas } from '../../data/homepage'
import './AreasWeServe.css'

export function AreasWeServe() {
  return (
    <section id="areas" className="section areas-serve">
      <div className="container">
        <p className="section-subtitle">Coverage</p>
        <h2 className="section-title">Areas We Serve in Bangalore</h2>
        <p className="areas-serve-intro">
          Ambimed provides home healthcare across Bangalore and surrounding neighbourhoods.
          Book a nurse, caregiver, or physiotherapist in your area.
        </p>
        <ul className="areas-serve-list">
          {bangaloreAreas.map((area) => (
            <li key={area} className="areas-serve-item">{area}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
