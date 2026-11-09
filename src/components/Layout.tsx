import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import { HashLink } from './HashLink'
import { ArrowRight, CloseIcon, MenuIcon } from './Icons'

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link to="/" className="wordmark" aria-label={`${site.wordmark}: home`}>
          <span className="wordmark__mark" aria-hidden="true">
            {site.wordmarkShort}
          </span>
          <span>{site.wordmark}</span>
        </Link>

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

        <nav
          id="primary-nav"
          className={`nav ${open ? 'is-open' : 'is-closed'}`}
          aria-label="Primary"
        >
          {site.nav.map((item) =>
            item.href.startsWith('/#') ? (
              <HashLink key={item.label} to={item.href} className="nav__link" onClick={() => setOpen(false)}>
                {item.label}
              </HashLink>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ),
          )}
          <div className="nav__cta">
            {site.ctas.primary.href ? (
              <Link className="btn btn--primary btn--small" to={site.ctas.primary.href}>
                {site.ctas.primary.label}
                <ArrowRight width={12} height={12} />
              </Link>
            ) : null}
          </div>
        </nav>
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
              <Link to="/projects" className="btn btn--primary">
                {site.ctas.primary.label}
                <ArrowRight width={14} height={14} />
              </Link>
              {site.ctas.secondary.href ? (
                <a
                  className="btn btn--secondary"
                  href={site.ctas.secondary.href}
                  target={/^https?:\/\//i.test(site.ctas.secondary.href) ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  {site.ctas.secondary.label}
                </a>
              ) : null}
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
                {site.nav.map((item) => (
                  <HashLink key={item.label} to={item.href} className="faint">
                    {item.label}
                  </HashLink>
                ))}
                <Link to="/audit" className="faint">Operations Audit</Link>
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
