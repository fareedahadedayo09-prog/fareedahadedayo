import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { site, CALENDLY_URL } from '../data/site'
import { HashLink } from './HashLink'
import { ArrowRight, CloseIcon, MenuIcon } from './Icons'

const DESKTOP_BREAKPOINT = 1101

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= DESKTOP_BREAKPOINT : true,
  )
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isDesktop
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const scrolled = useScrolled()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // Close mobile menu when crossing back above the desktop breakpoint.
  useEffect(() => {
    if (isDesktop) setOpen(false)
  }, [isDesktop])

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const cta = site.ctas.primary as { label: string; href: string; external?: boolean }
  const closeMenu = () => setOpen(false)

  // Always show the six section links. On non-home pages, prepend a "Home" link.
  const isHome = location.pathname === '/'
  const mobileLinks = isHome
    ? site.nav
    : [{ label: 'Home', href: '/' }, ...site.nav]

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="shell site-header__inner">
          <Link to="/" className="wordmark" aria-label={`${site.wordmark}: home`}>
            <span className="wordmark__name">{site.wordmark}</span>
          </Link>

          <nav
            id="primary-nav"
            className="nav"
            aria-label="Primary"
          >
            {site.nav.map((item) => {
              const isAnchor = item.href.startsWith('/#') || item.href.startsWith('#')
              if (isAnchor) {
                return (
                  <HashLink key={item.label} to={item.href} className="nav__link">
                    {item.label}
                  </HashLink>
                )
              }
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  end={item.href === '/projects' ? false : true}
                  className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                >
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="nav__cta">
            {cta.external ? (
              <a
                className="btn btn--primary btn--small nav-cta-btn"
                href={cta.href}
                target="_blank"
                rel="noreferrer"
              >
                {cta.label}
                <ArrowRight width={12} height={12} />
              </a>
            ) : (
              <Link className="btn btn--primary btn--small nav-cta-btn" to={cta.href}>
                {cta.label}
                <ArrowRight width={12} height={12} />
              </Link>
            )}
          </div>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={(e) => { e.stopPropagation(); setOpen((v) => !v) }}
          >
            {open ? <CloseIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
          </button>
        </div>

        {/* Compact dropdown aligned under the hamburger. */}
        <div
          id="mobile-nav-panel"
          className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`}
          role="dialog"
          aria-modal={false}
          aria-label="Site navigation"
          hidden={!open}
          onClick={(e) => e.stopPropagation()}
        >
          <nav aria-label="Mobile">
            <ul className="mobile-nav__list">
              {mobileLinks.map((item, i) => {
                const isAnchor = item.href.startsWith('/#') || item.href.startsWith('#')
                const isHomeLink = item.href === '/'
                const style = { '--i': i } as React.CSSProperties
                const num = String(i + (isHome ? 1 : 0)).padStart(2, '0')
                if (isAnchor) {
                  return (
                    <li key={item.label} style={style}>
                      <HashLink to={item.href} className="mobile-nav__link" onClick={closeMenu}>
                        <span className="mobile-nav__num">{num}</span>
                        <span>{item.label}</span>
                      </HashLink>
                    </li>
                  )
                }
                return (
                  <li key={item.label} style={style}>
                    <NavLink
                      to={item.href}
                      end={isHomeLink}
                      className="mobile-nav__link"
                      onClick={closeMenu}
                    >
                      <span className="mobile-nav__num">{isHomeLink ? '00' : num}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
            <div className="mobile-nav__cta">
              {cta.external ? (
                <a
                  className="btn btn--primary btn--block"
                  href={cta.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                >
                  {cta.label}
                  <ArrowRight width={14} height={14} />
                </a>
              ) : (
                <Link className="btn btn--primary btn--block" to={cta.href} onClick={closeMenu}>
                  {cta.label}
                  <ArrowRight width={14} height={14} />
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Backdrop to catch outside clicks. */}
      {open ? <div className="mobile-nav-backdrop" onClick={closeMenu} aria-hidden="true" /> : null}
    </>
  )
}

function Footer() {
  const { contact } = site

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="section--tight" style={{ padding: 0 }}>
          <div className="section-head section-head--row">
            <div className="stack" style={{ gap: '1.1rem' }}>
              <div className="cluster" style={{ gap: '0.65rem' }}>
                <strong style={{ fontWeight: 600 }}>{site.wordmark}</strong>
              </div>
              <p className="lede" style={{ maxWidth: '56ch' }}>
                {site.heroLead}
              </p>
            </div>

            <div className="cluster" style={{ gap: '0.6rem', flexWrap: 'wrap' }}>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
                Book a call
                <ArrowRight width={14} height={14} />
              </a>
              <a href={contact.email.href} className="btn btn--secondary">
                Send an email
              </a>
            </div>
          </div>

          <hr className="divider" />

          <div
            className="grid-2"
            style={{ paddingTop: '2.2rem', paddingBottom: '2.4rem' }}
          >
            <div className="stack-sm">
              <span className="eyebrow">Contact</span>
              <div className="stack-sm">
                {contact.email.href ? (
                  <a className="link-arrow" href={contact.email.href}>
                    {contact.email.detail ?? contact.email.label}
                  </a>
                ) : null}
                {contact.linkedin.href ? (
                  <a className="link-arrow" href={contact.linkedin.href} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </div>

            <div className="stack-sm">
              <span className="eyebrow">Explore</span>
              <div className="stack-sm">
                <HashLink to="/#problems" className="faint">Problems</HashLink>
                <HashLink to="/#services" className="faint">Services</HashLink>
                <Link to="/projects" className="faint">Projects</Link>
                <HashLink to="/#process" className="faint">Process</HashLink>
                <HashLink to="/#about" className="faint">About</HashLink>
                <HashLink to="/#contact" className="faint">Contact</HashLink>
                <Link to="/tools" className="faint">Tools</Link>
                <Link to="/simulators" className="faint">Lab</Link>
              </div>
            </div>
          </div>

          <hr className="divider" />

          <p className="faint mono" style={{ fontSize: '0.72rem', paddingTop: '1.6rem', paddingBottom: '0.5rem' }}>
            {site.roleLabel} · {site.location}
          </p>
        </div>
      </div>
    </footer>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) return
      let id: string
      try { id = decodeURIComponent(window.location.hash.slice(1)) } catch { return }
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }

    if (hash) scrollToHash()
    else window.scrollTo({ top: 0 })

    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [pathname, hash])
  return null
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
