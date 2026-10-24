import { Link } from 'react-router-dom'
import { CtaButton } from '../components/CtaButton'
import { ROICalculator } from '../components/ROICalculator'
import { MediaPlaceholder } from '../components/MediaPlaceholder'
import { ArrowRight, DownloadIcon } from '../components/Icons'
import { site } from '../data/site'
import { auditProcess, auditSupportingTools, velara } from '../data/audit'

function DocumentSlot({
  label,
  format,
  href,
}: {
  label: string
  format: string
  href: string
}) {
  if (href) {
    return (
      <a className="btn btn--secondary btn--block" href={href} target="_blank" rel="noreferrer">
        <DownloadIcon width={15} height={15} />
        {label} · {format}
      </a>
    )
  }
  return (
    <MediaPlaceholder
      kind="document"
      title={label}
      note={`A ${format} file will be linked here once it has been created and verified. The button is deliberately not shown as clickable before that.`}
      ratio="box"
    />
  )
}

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
              documented and the baseline was never measured. This is the review I run first: map what
              actually happens, test whether automation is appropriate, and state every assumption behind an
              estimate.
            </p>
          </div>
        </div>
      </section>

      {/* ── The seven steps ─────────────────────────────────────────── */}
      <section style={{ paddingBottom: 'clamp(3rem, 2rem + 2vw, 5rem)' }}>
        <div className="shell">
          <div className="stack" style={{ gap: '0' }}>
            {auditProcess.map((step) => (
              <div key={step.n} className="tool-card">
                <div>
                  <span className="tool-card__name">
                    <span className="mono faint" style={{ marginRight: '0.5rem' }}>
                      {String(step.n).padStart(2, '0')}
                    </span>
                    {step.title}
                  </span>
                  <span className="tool-card__meta">Output: {step.output}</span>
                </div>
                <p className="tool-card__desc">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="notice" style={{ marginTop: '1.8rem' }}>
            <strong>This is a method, not a deliverable.</strong> It is presented as the approach I follow,
            not as evidence of completed client engagements. Every step is something I can do; the section
            deliberately makes no claim about work that has not happened.
          </div>
        </div>
      </section>

      {/* ── Supporting tools ────────────────────────────────────────── */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Supporting Tools</span>
            <h2>What the audit produces and where it is written</h2>
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

      {/* ── Sample documents ────────────────────────────────────────── */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Sample Documents</span>
            <h2>Two reference documents</h2>
            <p className="lede">
              These exist as a format reference. The buttons below become real downloads only once the files
              have been created and checked; before that they show as labelled placeholders rather than
              broken links.
            </p>
          </div>

          <div className="grid-2">
            <DocumentSlot
              label={site.documents.auditReport.label}
              format={site.documents.auditReport.format}
              href={site.documents.auditReport.href}
            />
            <DocumentSlot
              label={site.documents.implementationProposal.label}
              format={site.documents.implementationProposal.format}
              href={site.documents.implementationProposal.href}
            />
          </div>

          <div className="card" style={{ marginTop: '1.6rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Adding these files later</h3>
            <p className="muted" style={{ fontSize: '0.86rem', marginTop: '0.6rem' }}>
              Drop the PDF into <span className="mono">/public</span>, then set <span className="mono">documents.auditReport.href</span>{' '}
              and <span className="mono">documents.implementationProposal.href</span> in{' '}
              <span className="mono">src/data/site.ts</span>. The download button appears automatically; the
              placeholder disappears.
            </p>
          </div>
        </div>
      </section>

      {/* ── ROI calculator ───────────────────────────────────────────── */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Step 5 · Estimate financial impact</span>
            <h2>The calculator used in the audit</h2>
            <p className="lede">
              Step five of the audit estimates impact with explicit assumptions rather than a headline
              number. The calculator below is the same model, exposed so assumptions can be challenged.
            </p>
          </div>

          <ROICalculator />
        </div>
      </section>

      {/* ── Practice audit ───────────────────────────────────────────── */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Worked Example</span>
            <h2>{velara.name}: {velara.tagline}</h2>
            <p className="lede">
              A fictional business used to show what the audit produces: a process map, an investigation
              checklist, prioritized recommendations and a clear list of what should not be automated.
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

      {/* ── CTA ──────────────────────────────────────────────────────── */}
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
              No booking link is configured yet, so both buttons show as coming soon rather than linking
              somewhere. Set <span className="mono">ctas.primary.href</span> and{' '}
              <span className="mono">ctas.secondary.href</span> in <span className="mono">src/data/site.ts</span>{' '}
              to activate them.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
