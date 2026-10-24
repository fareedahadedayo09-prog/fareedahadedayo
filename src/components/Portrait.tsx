import { useState } from 'react'
import { site } from '../data/site'
import { ImageIcon } from './Icons'

/**
 * Portrait frame with a clean labelled placeholder.
 *
 * If `site.portrait.src` does not resolve, the placeholder renders instead, so
 * the site never shows a broken image. Replace the value in
 * src/data/site.ts with a real photo and this component will show it.
 */
export function Portrait() {
  const [failed, setFailed] = useState(false)
  const { src, alt, caption } = site.portrait
  const showPlaceholder = failed || !src

  return (
    <div className="portrait-wrap">
      <div className="portrait">
        {showPlaceholder ? (
          <div className="portrait__ph">
            <ImageIcon width={34} height={34} />
            <span>Your portrait</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            width={420}
            height={525}
            loading="eager"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {caption ? (
        <p className="portrait__caption">
          <span>{caption}</span>
          <span>4:5</span>
        </p>
      ) : null}
    </div>
  )
}
