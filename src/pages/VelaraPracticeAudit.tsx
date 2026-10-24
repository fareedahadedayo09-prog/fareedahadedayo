import { Link } from 'react-router-dom'
import { CtaButton } from '../components/CtaButton'
import { ProcessMap } from '../components/ProcessMap'
import { ArrowRight, AlertIcon } from '../components/Icons'
import { site } from '../data/site'
import { velara } from '../data/audit'

function IllustrativeBadge() {
  return (
    <span className="badge badge--illustrative badge--dot">
      Fictional business · illustrative data
    </span>
  )
}

export function VelaraPracticeAudit() {
  return (
    <>
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/audit" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              Operations Audit
            </Link>

            <div className="cluster" style={{ gap: '0.7rem', flexWrap: 'wrap' }}>
              <IllustrativeBadge />
              <span className="badge badge--dot badge--planned">{velara.tagline}</span>
            </div>

            <h1 className="cs-hero__title">{velara.name}</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>{velara.context}</p>

            <div className="notice notice--warn" style={{ marginTop: '0.6rem' }}>
              <strong>Read this first.</strong> {velara.disclaimer}
            </div>
          </div>
        </div>
      </section>

      {/* ── Business context ─────────────────────────────────────────── */}
      <section style={{ paddingBottom: 'clamp(3rem, 2rem + 2vw, 5rem)' }}>
        <div className="shell">
          <div className="cs-body">
            <aside className="cs-toc" aria-label="Practice audit contents">
              <p className="cs-toc__title">Contents</p>
              <ol>
                <li><a href="#context">Business context</a></li>
                <li><a href="#process">Current-process map</a></li>
                <li><a href="#findings">Audit findings</a></li>
                <li><a href="#recommendations">Recommendations</a></li>
                <li><a href="#not-automate">What not to automate</a></li>
                <li><a href="#deliverables">Deliverables</a></li>
                <li><a href="#limitations">Limitations</a></li>
              </ol>
            </aside>

            <div>
              <section className="cs-section" id="context">
                <div className="cs-section__head">
                  <span className="cs-section__num">01 / 07</span>
                  <h2>Business context</h2>
                </div>
                <p>{velara.context}</p>

                <h3 style={{ marginTop: '1.8rem' }}>Illustrative assumptions</h3>
                <p className="muted" style={{ marginTop: '0.5rem' }}>
                  These assumptions were written to make the demonstration concrete. They are not
                  observations, measurements or claims about any real business.
                </p>
                <ul className="bullets" style={{ marginTop: '1rem' }}>
                  {velara.assumptions.map((assumption) => (
                    <li key={assumption}>{assumption}</li>
                  ))}
                </ul>
              </section>

              {/* ── Process map ────────────────────────────────────────── */}
              <section className="cs-section" id="process">
                <div className="cs-section__head">
                  <span className="cs-section__num">02 / 07</span>
                  <h2>{velara.process.title}</h2>
                </div>
                <p>{velara.process.note}</p>

                <div style={{ marginTop: '1.4rem' }}>
                  <ProcessMap nodes={velara.process.nodes} />
                </div>

                <div className="notice notice--grey" style={{ marginTop: '1.2rem' }}>
                  <strong className="muted">How this map was produced.</strong> In a real audit the map is
                  drawn from observation and interview, then corrected by the people who do the work. The
                  numbered steps, the handoffs and the points where a customer waits are what make the later
                  findings defensible.
                </div>
              </section>

              {/* ── Findings ────────────────────────────────────────────── */}
              <section className="cs-section" id="findings">
                <div className="cs-section__head">
                  <span className="cs-section__num">03 / 07</span>
                  <h2>Audit findings</h2>
                  <span className="badge badge--illustrative badge--dot">Hypotheses, not observations</span>
                </div>
                <p>
                  Each item below is a <strong>hypothesis to investigate</strong>, not a finding. It is paired
                  with the evidence that would confirm or reject it, because a hypothesis without a way to
                  test it is just an opinion.
                </p>

                <div className="table-wrap" style={{ marginTop: '1.4rem' }}>
                  <table className="data">
                    <thead>
                      <tr>
                        <th scope="col">Investigation area</th>
                        <th scope="col">Hypothesis</th>
                        <th scope="col">Evidence needed to confirm or reject</th>
                      </tr>
                    </thead>
                    <tbody>
                      {velara.findings.map((finding) => (
                        <tr key={finding.area}>
                          <td>{finding.area}</td>
                          <td>{finding.hypothesis}</td>
                          <td>{finding.evidenceNeeded}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="notice" style={{ marginTop: '1.2rem' }}>
                  <strong>Why this matters.</strong> A hypothesis that is never tested becomes a
                  recommendation that looks evidenced. The evidence column is what stops that.
                </div>
              </section>

              {/* ── Recommendations ─────────────────────────────────────── */}
              <section className="cs-section" id="recommendations">
                <div className="cs-section__head">
                  <span className="cs-section__num">04 / 07</span>
                  <h2>Recommendations</h2>
                  <span className="badge badge--illustrative badge--dot">Sample prioritization</span>
                </div>
                <p>
                  The order is the recommendation. Doing these in a different order would waste effort or
                  build on unstable ground, so the rationale is stated for each.
                </p>

                <div className="stack" style={{ gap: 0, marginTop: '1.4rem' }}>
                  {velara.recommendations.map((rec) => (
                    <div className="tool-card" key={rec.intervention}>
                      <div>
                        <span className="tool-card__name">
                          <span className="mono faint" style={{ marginRight: '0.5rem' }}>
                            {String(rec.priority).padStart(2, '0')}
                          </span>
                          {rec.intervention}
                        </span>
                      </div>
                      <p className="tool-card__desc">{rec.rationale}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── What not to automate ───────────────────────────────── */}
              <section className="cs-section" id="not-automate">
                <div className="cs-section__head">
                  <span className="cs-section__num">05 / 07</span>
                  <h2>What not to automate</h2>
                </div>
                <p>
                  This subsection is the point of the audit. A recommendation list that recommends
                  automation everywhere is not evidence of judgement. These decisions should stay under
                  human control where appropriate.
                </p>

                <div className="principles" style={{ marginTop: '1.4rem' }}>
                  {velara.notAutomate.map((item) => (
                    <div className="principle" key={item.decision}>
                      <span className="principle__num">-</span>
                      <h3>{item.decision}</h3>
                      <p>{item.reason}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Deliverables ────────────────────────────────────────── */}
              <section className="cs-section" id="deliverables">
                <div className="cs-section__head">
                  <span className="cs-section__num">06 / 07</span>
                  <h2>Deliverables</h2>
                  <span className="badge badge--illustrative badge--dot">Illustrative outputs</span>
                </div>
                <p>What a completed audit would hand over. In this demonstration they are described, not attached.</p>

                <ul className="bullets" style={{ marginTop: '1rem' }}>
                  {velara.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </section>

              {/* ── Limitations ─────────────────────────────────────────── */}
              <section className="cs-section" id="limitations">
                <div className="cs-section__head">
                  <span className="cs-section__num">07 / 07</span>
                  <h2>Limitations</h2>
                </div>
                <ul className="bullets">
                  {velara.limitations.map((limitation) => (
                    <li key={limitation}>{limitation}</li>
                  ))}
                </ul>

                <div className="notice notice--warn" style={{ marginTop: '1.4rem' }}>
                  <AlertIcon width={15} height={15} style={{ display: 'inline', verticalAlign: '-3px', marginRight: '0.5rem' }} />
                  <strong>Bottom line.</strong> This page demonstrates how the audit is run and what it
                  produces. It is not a business assessment, not a proposal for a real company and not
                  evidence of achieved client results.
                </div>
              </section>

              <hr className="divider" style={{ marginTop: '2rem' }} />

              <div className="cluster cluster--between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <Link to="/audit" className="link-arrow">
                  Back to Operations Audit
                  <ArrowRight />
                </Link>
                <div className="cluster" style={{ gap: '0.5rem' }}>
                  <CtaButton cta={site.ctas.primary} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
