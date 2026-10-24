import { useCallback, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
  to: string
  children: ReactNode
  className?: string
  'aria-label'?: string
  onClick?: () => void
}

/**
 * Handles in-page anchors without a full reload.
 * Clicking a hash link on the current page scrolls to the element; clicking a
 * hash link on another page navigates first and scrolls after render.
 */
export function HashLink({ to, children, className, onClick, ...rest }: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const hashIndex = to.indexOf('#')
      const path = hashIndex === -1 ? to : to.slice(0, hashIndex)
      const hash = hashIndex === -1 ? '' : to.slice(hashIndex + 1)

      if (path && path !== location.pathname) {
        event.preventDefault()
        onClick?.()
        if (hash) {
          // Let the router render the new page, then scroll to the anchor.
          window.requestAnimationFrame(() => {
            window.setTimeout(() => {
              document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 60)
          })
        }
        navigate(path + (hash ? `#${hash}` : ''))
        return
      }

      if (hash) {
        event.preventDefault()
        onClick?.()
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [to, location.pathname, navigate, onClick],
  )

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
