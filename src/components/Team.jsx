'use client'

import { Reveal } from '@/components/motion/Reveal'
import { team } from '../data/team'
import './Team.css'

export function Team() {
  return (
    <section id="team" className="section section-team">
      <div className="container">
        <Reveal as="p" className="section-subtitle">
          Who we are
        </Reveal>
        <Reveal as="h2" className="section-title">
          Our team
        </Reveal>
        <div className="team-grid">
          {team.map((member, i) => (
            <Reveal
              key={member.id}
              as="article"
              className="team-card"
              delay={i * 0.08}
              y={25}
              whileHover={{ y: -4 }}
            >
              <div className="team-photo-wrap">
                <img
                  src={member.photo}
                  alt=""
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling?.classList.remove('hide')
                  }}
                />
                <div className="team-photo-placeholder hide">Photo</div>
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
