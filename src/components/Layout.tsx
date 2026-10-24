import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import { HashLink } from './HashLink'
import { ArrowRight, CloseIcon, MenuIcon } from './Icons'

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

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

        <nav id="primary-nav" className={`nav ${open ? 'is-open' : 'is-closed'}`} aria-label="Primary">
          {site.nav.map((item) =>
            item.href.startsWith('/#') ? (
              <HashLink key={item.label} to={item.href} className="nav__link">
                {item.label}
              </HashLink>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
              >
                {item.label}
              </NavLink>
            ),
          )}
          <div className="nav__cta">
            {site.resume.href ? (
              <a className="btn btn--secondary btn--small" href={site.resume.href} target="_blank" rel="noreferrer">
                {site.resume.label}
                <ArrowRight />
              </a>
            ) : (
              <span className="btn btn--pending btn--small" aria-disabled="true">
                {site.resume.label} · {site.resume.detail}
              </span>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  const { contact, ctas, social } = site

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
              <p className="lede" style={{ maxWidth: '52ch' }}>
                {site.heroLead}
              </p>
            </div>

            <div className="cluster" style={{ gap: '0.6rem' }}>
              {ctas.primary.href ? (
                <a className="btn btn--primary" href={ctas.primary.href} target="_blank" rel="noreferrer">
                  {ctas.primary.label}
                  <ArrowRight />
                </a>
              ) : (
                <span className="btn btn--pending" aria-disabled="true">
                  {ctas.primary.label} · Coming soon
                </span>
              )}
              {ctas.secondary.href ? (
                <a className="btn btn--secondary" href={ctas.secondary.href} target="_blank" rel="noreferrer">
                  {ctas.secondary.label}
                </a>
              ) : (
                <span className="btn btn--pending" aria-disabled="true">
                  {ctas.secondary.label} · Coming soon
                </span>
              )}
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
                    {contact.email.label}
                  </a>
                ) : (
                  <span className="faint">{contact.email.label}: {contact.email.detail}</span>
                )}
                {contact.linkedin.href ? (
                  <a className="link-arrow" href={contact.linkedin.href} target="_blank" rel="noreferrer">
                    {contact.linkedin.label}
                  </a>
                ) : (
                  <span className="faint">{contact.linkedin.label}: {contact.linkedin.detail}</span>
                )}
                {contact.github.href ? (
                  <a className="link-arrow" href={contact.github.href} target="_blank" rel="noreferrer">
                    {contact.github.label}
                  </a>
                ) : (
                  <span className="faint">{contact.github.label}: {contact.github.detail}</span>
                )}
              </div>
            </div>

            <div className="stack-sm">
              <span className="eyebrow">Site</span>
              <div className="stack-sm">
                {site.nav.map((item) => (
                  <HashLink key={item.label} to={item.href} className="faint">
                    {item.label}
                  </HashLink>
                ))}
              </div>
            </div>

            <div className="stack-sm">
              <span className="eyebrow">Build in public</span>
              <div className="stack-sm">
                {social.linkedin ? (
                  <a className="link-arrow" href={social.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                ) : (
                  <span className="faint">LinkedIn: not linked yet</span>
                )}
                {social.x ? (
                  <a className="link-arrow" href={social.x} target="_blank" rel="noreferrer">
                    X
                  </a>
                ) : (
                  <span className="faint">X: not linked yet</span>
                )}
                {social.posts.length > 0 ? (
                  <a className="link-arrow" href={social.posts[0]} target="_blank" rel="noreferrer">
                    Latest technical note
                  </a>
                ) : (
                  <span className="faint">Technical notes: none yet</span>
                )}
              </div>
            </div>
          </div>

          <hr className="divider" />

          <p className="faint mono" style={{ fontSize: '0.72rem', paddingTop: '1.6rem', paddingBottom: '0.5rem' }}>
            {site.roleLabel} · {site.location} · Built with n8n, React and Vercel.
            No client data, no fabricated metrics.
          </p>
        </div>
      </div>
    </footer>
  )
}

/** Scrolls to top on route change, except when a hash target is present. */
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
