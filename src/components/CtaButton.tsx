import type { Cta } from '../data/site'
import { ArrowRight } from './Icons'

/**
 * Renders a call to action only when a real destination exists.
 *
 * There are no "coming soon" buttons on this site. An unconfigured call to
 * action is omitted, so a visitor never clicks something that does nothing.
 */
export function CtaButton({
  cta,
  variant = 'primary',
}: {
  cta: Cta
  variant?: 'primary' | 'secondary'
}) {
  if (!cta.href) return null

  const className = `btn ${variant === 'primary' ? 'btn--primary' : 'btn--secondary'}`
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
