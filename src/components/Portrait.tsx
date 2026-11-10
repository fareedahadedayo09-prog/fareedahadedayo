import { useEffect, useState } from 'react'
import { site } from '../data/site'

/**
 * Portrait renders only if the configured image resolves (public/portrait.jpg).
 * If the file is missing, nothing renders (hero stays single-column copy).
 */
export function Portrait() {
  const [exists, setExists] = useState(false)
  const { src, alt } = site.portrait

  useEffect(() => {
    if (!src) return
    const img = new Image()
    img.onload = () => setExists(true)
    img.onerror = () => setExists(false)
    img.src = src
  }, [src])

  if (!exists) return null

  return (
    <div className="portrait-wrap">
      <div className="portrait">
        <img
          src={src}
          alt={alt}
          width={420}
          height={525}
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  )
}
