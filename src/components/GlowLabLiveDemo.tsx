import { useState } from 'react'
import { ArrowRight } from './Icons'
import { GLOWLAB_DEMO_URL, GLOWLAB_PREVIEWS, GLOWLAB_VERIFIED_ON } from '../data/glowlab'

/**
 * Live preview of the GlowLab demo for the case study.
 *
 * An iframe was the first choice, but the storefront sends
 * `Content-Security-Policy: frame-ancestors 'self' https://*.e2b.app`,
 * which blocks framing from the production portfolio origin. Rather than
 * ship an empty frame or an invented mock-up, this shows real screenshots of
 * the live site with an explicit "Visit Live Demo" link that opens the real
 * storefront in a new tab.
 */
export function LiveDemoPreview() {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const active = GLOWLAB_PREVIEWS.find((p) => p.id === device) ?? GLOWLAB_PREVIEWS[0]

  return (
    <figure className="gl-demo">
      <div className="gl-demo__bar">
        <span className="gl-demo__live">
          <span className="gl-demo__pulse" aria-hidden="true" />
          Live Demo — Project in Progress
        </span>

        <span className="gl-demo__url mono" aria-hidden="true">
          glow-lab-puce.vercel.app
        </span>

        <div className="gl-demo__switch" role="group" aria-label="Preview viewport">
          {GLOWLAB_PREVIEWS.map((shot) => (
            <button
              key={shot.id}
              type="button"
              className={`gl-demo__switch-btn ${device === shot.id ? 'is-active' : ''}`}
              aria-pressed={device === shot.id}
              onClick={() => setDevice(shot.id)}
            >
              {shot.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`gl-demo__frame gl-demo__frame--${device}`}>
        <a
          className="gl-demo__shot-link"
          href={GLOWLAB_DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the live GlowLab demo storefront in a new tab"
        >
          <img src={active.src} alt={active.alt} loading="eager" decoding="async" />
          <span className="gl-demo__shot-hover" aria-hidden="true">
            Open the live demo
            <ArrowRight width={14} height={14} />
          </span>
        </a>
      </div>

      <div className="gl-demo__foot">
        <div>
          <p className="gl-demo__caption">{active.caption}</p>
          <p className="gl-demo__note">
            Captured from the live site on {GLOWLAB_VERIFIED_ON}. The storefront’s security policy blocks embedding on
            this domain, so the preview opens the real site in a new tab.
          </p>
        </div>
        <a className="btn btn--primary btn--small" href={GLOWLAB_DEMO_URL} target="_blank" rel="noopener noreferrer">
          Visit Live Demo
          <ArrowRight width={14} height={14} />
        </a>
      </div>
    </figure>
  )
}
