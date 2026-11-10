import { type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
  to: string
  children: ReactNode
  className?: string
  'aria-label'?: string
  onClick?: () => void
}

/** A real anchor with client-side navigation and a native fallback. */
export function HashLink({ to, children, className, onClick, ...rest }: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.()
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const hashIndex = to.indexOf('#')
    if (hashIndex < 0) return
    const path = to.slice(0, hashIndex) || location.pathname
    const hash = to.slice(hashIndex)
    let id: string
    try { id = decodeURIComponent(hash.slice(1)) } catch { return }
    if (!id) return

    if (path !== location.pathname) {
      // Unknown destinations retain the browser's normal anchor navigation.
      if (path !== '/' || !['problems', 'services', 'projects', 'process', 'about', 'contact'].includes(id)) return
      // The layout scroll manager handles the hash after the destination renders.
      event.preventDefault()
      navigate(`${path}${hash}`)
      return
    }

    const target = document.getElementById(id)
    // If the element is missing, leave the anchor's normal browser behaviour intact.
    if (!target) return
    event.preventDefault()
    if (location.hash !== hash) {
      navigate(`${path}${hash}`)
    } else {
      // Repeated clicks on the same hash do not trigger the location effect.
      window.requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }

  return <a href={to} className={className} onClick={handleClick} {...rest}>{children}</a>
}
