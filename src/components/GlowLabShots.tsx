import { useState } from 'react'
import { GLOWLAB_INTERFACE_SHOTS } from '../data/glowlab'

/**
 * Three supporting interface shots. On a phone the whole image is shown
 * (contain) rather than cropped, because these are evidence of what the
 * storefront looks like — cropping them would hide the thing being shown.
 * Anything that fails to load says so instead of leaving an empty frame.
 */
export function GlowLabShots() {
  return (
    <div className="gl-shots">
      {GLOWLAB_INTERFACE_SHOTS.map((shot) => (
        <Shot key={shot.src} shot={shot} />
      ))}
    </div>
  )
}

function Shot({ shot }: { shot: (typeof GLOWLAB_INTERFACE_SHOTS)[number] }) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className="gl-shots__item">
      {failed ? (
        <div className="gl-shots__fallback">
          <span className="mono">Preview unavailable</span>
          <span>{shot.title}</span>
        </div>
      ) : (
        <a href={shot.src} target="_blank" rel="noreferrer" aria-label={`Open the ${shot.title} screenshot at full size`}>
          <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        </a>
      )}
      <figcaption>
        <strong>{shot.title}</strong>
        <span>{shot.caption}</span>
      </figcaption>
    </figure>
  )
}
