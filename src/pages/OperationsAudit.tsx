import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import { site } from '../data/site'
import { auditProcess } from '../data/audit'

export function OperationsAudit() {
  return (
    <>
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              Home
            </Link>
            <span className="eyebrow">Operations Audit &amp; Implementation</span>
            <h1 className="cs-hero__title">Assess the process before proposing automation</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>
              Before proposing automation, document the process and measure a baseline. This review maps what
              actually happens, considers whether automation is appropriate, and states the assumptions behind
              estimates that would need validation.
            </p>
          </div>
        </div>
      </section>

      {/* ── The five steps ───────────────────────────────────────────── */}
      <section style={{ paddingBottom: 'clamp(3rem, 2rem + 2vw, 5rem)' }}>
        <div className="shell">
          <div className="stack" style={{ gap: 0 }}>
            {auditProcess.map((step) => (
              <div className="tool-card" key={step.n}>
                <div>
                  <span className="tool-card__name">
                    <span className="mono faint" style={{ marginRight: '0.5rem' }}>
                      {String(step.n).padStart(2, '0')}
                    </span>
                    {step.title}
                  </span>
                  <span className="tool-card__meta">Deliverable: {step.output}</span>
                </div>
                <p className="tool-card__desc">{step.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="surface" style={{ padding: 'clamp(1.8rem, 1.2rem + 2.5vw, 3rem)' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div className="stack" style={{ gap: '0.8rem' }}>
                <span className="eyebrow">Start Here</span>
                <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.5vw, 1.8rem)' }}>
                  Request an AI Operations Audit
                </h2>
                <p className="muted" style={{ fontSize: '0.9rem' }}>
                  Map the process, establish a baseline and get a documented answer on whether automation is
                  worth building before anything is implemented.
                </p>
              </div>
              <div className="cluster" style={{ gap: '0.7rem' }}>
                <a className="btn btn--primary" href={site.contact.email.href}>
                  Email about an operations audit
                  <ArrowRight width={15} height={15} />
                </a>
              </div>
            </div>


          </div>
        </div>
      </section>
    </>
  )
}
