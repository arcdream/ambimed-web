import { Activity, Baby, HeartHandshake, Stethoscope, Accessibility } from 'lucide-react'

const ICONS = {
  elder: HeartHandshake,
  physio: Activity,
  nurse: Stethoscope,
  baby: Baby,
  accessibility: Accessibility,
}

export function ServiceIcon({ name, className = '', svgClassName = '' }) {
  const Icon = ICONS[name] ?? HeartHandshake
  return (
    <span className={`service-icon-wrap ${className}`.trim()} aria-hidden>
      <Icon className={`service-icon-svg ${svgClassName}`.trim()} strokeWidth={1.75} />
    </span>
  )
}
