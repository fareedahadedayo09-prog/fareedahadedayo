import { Link } from 'react-router-dom'
import { CtaButton } from '../components/CtaButton'
import { ArrowRight } from '../components/Icons'
import { site } from '../data/site'
import { auditProcess, auditSupportingTools, velara } from '../data/audit'

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
              Most automation projects fail before a single workflow is built, because the process was never
              documented and the baseline was never measured. This is the review run first: map what actually
              happens, decide whether automation is appropriate, and state every assumption behind an estimate.
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

          <div className="notice" style={{ marginTop: '1.8rem' }}>
            <strong>This is a method, not a track record.</strong> It is the approach followed on every
            engagement. It makes no claim about completed client work, transformations or measured returns.
          </div>
        </div>
      </section>

      {/* ── Supporting tools ──────────────────────────────────────────── */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Supporting Tools</span>
            <h2>What the review produces and where it is written</h2>
          </div>
          <div className="tool-cluster">
            {auditSupportingTools.map((tool) => (
              <div className="tool-chip" key={tool.name}>
                <span className="tool-chip__name">{tool.name}</span>
                <span className="tool-chip__note">{tool.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Practice audit ─────────────────────────────────────────────── */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Worked Example</span>
            <h2>{velara.name}: {velara.tagline}</h2>
            <p className="lede">
              A fictional business used to show what the review produces: a process map, an investigation
              checklist, prioritised recommendations, and a clear list of what should not be automated.
            </p>
          </div>

          <div className="notice notice--warn">
            <strong>Fictional demonstration.</strong> {velara.disclaimer}
          </div>

          <div style={{ marginTop: '1.6rem' }}>
            <Link to="/audit/velara-skin-co" className="btn btn--primary">
              Open the practice audit
              <ArrowRight width={15} height={15} />
            </Link>
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
                <CtaButton cta={site.ctas.primary} />
                <CtaButton cta={site.ctas.secondary} variant="secondary" />
              </div>
            </div>

            <hr className="divider" style={{ margin: '1.8rem 0 1.2rem' }} />

            <p className="faint" style={{ fontSize: '0.8rem' }}>
              Booking links are not configured yet, so no buttons are shown. Set{' '}
              <span className="mono">ctas.primary.href</span> and <span className="mono">ctas.secondary.href</span>{' '}
              in <span className="mono">src/data/site.ts</span> to add them.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
