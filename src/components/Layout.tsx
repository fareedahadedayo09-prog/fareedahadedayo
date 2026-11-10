import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { site, CALENDLY_URL } from '../data/site'
import { HashLink } from './HashLink'
import { ArrowRight, CloseIcon, MenuIcon } from './Icons'

const DESKTOP_BREAKPOINT = 1100

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

  const cta = site.ctas.primary as { label: string; href: string; external?: boolean }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="shell site-header__inner">
        <Link to="/" className="wordmark" aria-label={`${site.wordmark}: home`}>
          <span className="wordmark__mark" aria-hidden="true">
            {site.wordmarkShort}
          </span>
          <span className="wordmark__name">{site.wordmark}</span>
        </Link>

        <nav
          id="primary-nav"
          className={`nav ${open ? 'is-open' : 'is-closed'}`}
          aria-label="Primary"
        >
          {site.nav.map((item) => {
            const isAnchor = item.href.startsWith('/#') || item.href.startsWith('#')
            if (isAnchor) {
              return (
                <HashLink
                  key={item.label}
                  to={item.href}
                  className="nav__link"
                  onClick={() => setOpen(false)}
                >
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
                onClick={() => setOpen(false)}
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
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
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
                <span className="wordmark__mark" aria-hidden="true">
                  {site.wordmarkShort}
                </span>
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
            className="grid-3"
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

            <div className="stack-sm">
              <span className="eyebrow">About this site</span>
              <p className="faint" style={{ fontSize: '0.78rem', lineHeight: 1.6, maxWidth: '36ch' }}>
                Built with React, TypeScript and Vite. Every project shows what is built, what is tested
                and what is still missing. No fabricated metrics.
              </p>
            </div>
          </div>

          <hr className="divider" />

          <p className="faint mono" style={{ fontSize: '0.72rem', paddingTop: '1.6rem', paddingBottom: '0.5rem' }}>
            {site.roleLabel} · {site.location} · Built with React, n8n and Vercel.
          </p>
        </div>
      </div>
    </footer>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0 })
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
