import type { Cta } from '../data/site'
import { ArrowRight } from './Icons'

/**
 * Renders a real link when a destination exists, or a clearly disabled
 * "Coming soon" control when it does not. There is never a button that looks
 * clickable and does nothing.
 */
export function CtaButton({
  cta,
  variant = 'primary',
}: {
  cta: Cta
  variant?: 'primary' | 'secondary'
}) {
  const className = `btn ${variant === 'primary' ? 'btn--primary' : 'btn--secondary'}`

  if (!cta.href) {
    return (
      <span className="btn btn--pending" aria-disabled="true">
        {cta.label} · Coming soon
      </span>
    )
  }

  const external = /^https?:\/\//i.test(cta.href)
  return (
    <a
      className={className}
      href={cta.href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {cta.label}
      <ArrowRight width={14} height={14} />
    </a>
  )
}
