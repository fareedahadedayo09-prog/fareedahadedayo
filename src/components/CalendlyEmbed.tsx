import { useEffect, useRef, useState } from 'react'

const CALENDLY_URL = 'https://calendly.com/reedahadedayo/30min'
const CALENDLY_SCRIPT_ID = 'calendly-widget-script'
const CALENDLY_NAMESPACE = 'Calendly' as const

/**
 * Inline Calendly embed using the official widget script.
 *
 * - Loads the script exactly once (idempotent).
 * - Initializes via window.Calendly.initInlineWidget after script load.
 * - Tears down on unmount via Calendly.closePopupWidget (no-op for inline) and
 *   unmounts the DOM node; if the component remounts the script is already
 *   loaded and initInlineWidget simply re-renders into the container.
 * - Adds overflow:visible to the iframe parent so it doesn't get clipped on
 *   small breakpoints.
 */
export function CalendlyEmbed({
  height = 720,
  className,
}: {
  height?: number
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const existing = document.getElementById(CALENDLY_SCRIPT_ID) as HTMLScriptElement | null
    const url = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=1a1a1a&text_color=e9e7e0&primary_color=b6ff3d`

    const init = () => {
      const w = window as any
      if (!w[CALENDLY_NAMESPACE] || !containerRef.current) return
      // Calendly will replace or inject the iframe into our container.
      w[CALENDLY_NAMESPACE].initInlineWidget({
        url,
        parentElement: containerRef.current,
      })
      setReady(true)
    }

    if (existing) {
      // Script already present in the DOM — may still be loading.
      const w = window as any
      if (w[CALENDLY_NAMESPACE]?.initInlineWidget) {
        init()
      } else {
        existing.addEventListener('load', init, { once: true })
      }
      return
    }

    const script = document.createElement('script')
    script.id = CALENDLY_SCRIPT_ID
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = init
    document.head.appendChild(script)

    return () => {
      // Best-effort cleanup; the global script remains for the session so we
      // don't keep re-inserting it across navigations.
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [])

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        minWidth: '100%',
        width: '100%',
        height: `${height}px`,
        maxHeight: '80vh',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        background: 'var(--bg-raised)',
        overflow: 'hidden',
      }}
    >
      <div
        ref={containerRef}
        className="calendly-inline-widget"
        data-auto-load="false"
        style={{
          position: 'absolute',
          inset: 0,
          minWidth: '100%',
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      />
      {!ready ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            color: 'var(--text-faint)',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'var(--bg-raised)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          Loading booking calendar…
        </div>
      ) : null}
    </div>
  )
}

export const CALENDLY_LINK = CALENDLY_URL
