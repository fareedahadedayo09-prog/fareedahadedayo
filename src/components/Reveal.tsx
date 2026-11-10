import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/**
 * Reveal, fades and slides content up slightly when it enters the viewport.
 *
 * - Uses IntersectionObserver only; transform/opacity animations stay on the GPU.
 * - Respects prefers-reduced-motion: content is immediately visible.
 * - Supports a staggered delay via the `delay` prop (ms) so card groups can
 *   cascade in.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  y = 20,
  className = '',
  style,
}: {
  children: ReactNode
  delay?: number
  as?: keyof JSX.IntrinsicElements
  y?: number
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setShown(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            obs.disconnect()
            return
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const initialStyle: CSSProperties = {
    opacity: 0,
    transform: `translate3d(0, ${y}px, 0)`,
    transition: `opacity 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms, transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
    willChange: 'opacity, transform',
  }
  const shownStyle: CSSProperties = {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  }

  const Component = Tag as any
  return (
    <Component
      ref={ref}
      className={className}
      style={{ ...initialStyle, ...(shown ? shownStyle : {}), ...style }}
    >
      {children}
    </Component>
  )
}
