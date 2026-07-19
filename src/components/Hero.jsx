'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useAuth } from '@/client-app/context/AuthContext'
import { heroContent } from '@/data/heroContent'
import './Hero.css'

const ease = [0.22, 1, 0.36, 1]

export function Hero() {
  const reduceMotion = useReducedMotion()
  const { user, isAuthenticated, isLoading } = useAuth()
  const first = user?.firstName?.trim()
  const showWelcome = isAuthenticated && !isLoading && !!user

  const fade = (delay, duration = 0.6) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease },
        }

  const imageMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1, delay: 0.15, ease },
      }

  return (
    <section className="hero-premium" aria-labelledby="hero-heading">
      <div className="hero-premium__ambient" aria-hidden>
        <div className="hero-premium__gradient" />
        <svg className="hero-premium__wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,64 C240,108 480,12 720,48 C960,84 1200,28 1440,56 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="hero-premium__container container">
        <div className="hero-premium__grid">
          <div className="hero-premium__copy">
            <div className="hero-premium__glass">
              <motion.p className="hero-premium__badge" {...fade(0, 0.5)}>
                {showWelcome ? `Welcome back${first ? `, ${first}` : ''}` : heroContent.badge}
              </motion.p>

              <motion.h1 id="hero-heading" className="hero-premium__headline" {...fade(0.08, 0.6)}>
                <span className="hero-premium__headline-line">Care that</span>
                <span className="hero-premium__headline-line">feels like</span>
                <span className="hero-premium__headline-line">
                  <span className="hero-premium__headline-accent">family</span>.
                </span>
              </motion.h1>

              <motion.p className="hero-premium__lead" {...fade(0.18, 0.8)}>
                {heroContent.description}
              </motion.p>

              <motion.div className="hero-premium__cta-wrap" {...fade(0.28, 1)}>
                <Link href={heroContent.ctaHref} className="hero-premium__cta">
                  {heroContent.ctaLabel}
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div className="hero-premium__visual" {...imageMotion}>
            <div className="hero-premium__image-frame">
              <Image
                src={heroContent.image.src}
                alt={heroContent.image.alt}
                fill
                priority
                sizes="(max-width: 899px) 92vw, 44vw"
                className="hero-premium__image"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
