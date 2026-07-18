'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const MOTION_TAGS = {
  div: motion.div,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  article: motion.article,
  footer: motion.footer,
  section: motion.section,
}

/**
 * Scroll/reveal animation that always ends visible (avoids whileInView + Strict Mode stuck opacity).
 */
export function Reveal({ as = 'div', className, children, delay = 0, y = 14, x = 0, ...motionProps }) {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(!!reduceMotion)
  const MotionTag = MOTION_TAGS[as] ?? motion.div

  useEffect(() => {
    if (!reduceMotion) setVisible(true)
  }, [reduceMotion])

  const hidden = { opacity: 0, ...(y ? { y } : {}), ...(x ? { x } : {}) }
  const shown = { opacity: 1, y: 0, x: 0 }

  if (reduceMotion) {
    const Tag = as
    return (
      <Tag className={className} {...motionProps}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={hidden}
      animate={visible ? shown : hidden}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      {...motionProps}
    >
      {children}
    </MotionTag>
  )
}
