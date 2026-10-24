import { Link } from 'react-router-dom'
import { HashLink } from '../components/HashLink'
import { Portrait } from '../components/Portrait'
import { ProjectCard } from '../components/ProjectCard'
import { ROICalculator } from '../components/ROICalculator'
import { ToolsSection } from '../components/ToolsSection'
import { CtaButton } from '../components/CtaButton'
import { ArrowRight, CheckIcon, BoltIcon } from '../components/Icons'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { engineeringPrinciples, about, privacyPrinciples, privacyFooter, noAutomateHighlight } from '../data/content'
import { dashboardState } from '../data/demos'
import { velara } from '../data/audit'

function DemoSlots() {
  return (
    <div className="demo-grid">
      {projects.map((project) => (
        <div className="demo-card" key={project.slug}>
          <div className="cluster cluster--between" style={{ gap: '0.5rem' }}>
            <span className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
              {project.timeline}
            </span>
            <span className="badge badge--dot badge--planned">
              {project.status === 'done' ? 'Demo pending' : project.statusLabel}
            </span>
          </div>

          <h3 className="demo-card__title">
            <Link to={`/projects/${project.slug}`}>{project.name}</Link>
          </h3>
          <p className="demo-card__desc">{project.summary}</p>

          <div className="media-ph" style={{ aspectRatio: '16 / 9', padding: '0.9rem 1rem' }}>
            <div className="media-ph__row">
              <svg className="media-ph__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2.5" y="6" width="13" height="12" rx="2" />
                <path d="M15.5 10.5l6-3.5v10l-6-3.5" />
              </svg>
              <span className="media-ph__label">Demonstration coming soon</span>
            </div>
            <span className="media-ph__note">
              A Loom walkthrough will be linked here once recorded. The case-study page holds the same placeholder.
            </span>
          </div>

          {project.demo.scenarios.length > 0 ? (
            <div className="scenario-list">
              {project.demo.scenarios.map((s) => (
                <span className="scenario" key={s}>{s}</span>
              ))}
            </div>
          ) : (
            <p className="faint mono" style={{ fontSize: '0.72rem' }}>
              Demonstrated test scenarios: none recorded yet.
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function DashboardPreview() {
  return (
    <>
      <div className="notice notice--warn" style={{ marginBottom: '1.6rem' }}>
        <strong>Illustrative sample data.</strong> The figures below are placeholders chosen to show how
        dashboard evidence would be presented. They are not real business performance and are not connected
        to any live system. The section stays labelled until real recorded data replaces them.
      </div>

      <div className="stat-grid">
        {dashboardState.sampleData.map((metric) => (
          <div className="stat" key={metric.label}>
            <span className="stat__value">{metric.value}</span>
            <span className="stat__label">
              {metric.label}
              <br />
              <span className="faint mono" style={{ fontSize: '0.68em' }}>{metric.note}</span>
            </span>
          </div>
        ))}
      </div>

      <p className="faint" style={{ fontSize: '0.82rem', marginTop: '1.2rem' }}>
        Potential metrics, once implemented and supported by recorded data: enquiries handled, response
        time, leads classified or qualified, orders confirmed or cancelled, exception and escalation counts,
        and workflow failures.
      </p>
    </>
  )
}

export function Home() {
  return (
    <>
      {/* ─────────────────────────── Hero ───────────────────────────── */}
      <section className="hero">
        <div className="shell">
          <div className="hero__grid hero__image-first">
            <div className="hero__copy">
              <span className="eyebrow">{site.roleLabel}</span>
              <h1 className="hero__headline">{site.headline}</h1>
              <p className="hero__lead">{site.heroLead}</p>

              <div className="hero__actions">
                <HashLink to="/#projects" className="btn btn--primary">
                  Explore Projects
                  <ArrowRight width={15} height={15} />
                </HashLink>
                <HashLink to="/#contact" className="btn btn--secondary">
                  Contact Me
                </HashLink>
              </div>

              <div className="hero__availability">
                {site.availability.map((item, i) => (
                  <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    {i > 0 ? <span className="dot" aria-hidden="true" /> : null}
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <Portrait />
          </div>
        </div>
      </section>

      {/* ───────────────────────── Projects ─────────────────────────── */}
      <section className="section" id="projects">
        <div className="shell">
          <div className="section-head section-head--row">
            <div className="section-head" style={{ marginBottom: 0, flex: '1 1 340px' }}>
              <span className="eyebrow">Selected Projects</span>
              <h2>Four workflows, four different states of completion</h2>
              <p className="lede">
                Each one is documented the same way: what was built, what was tested, what is still only
                designed. Status is shown on the card and carried through to the case study.
              </p>
            </div>
            <Link to="/projects" className="btn btn--secondary">
              All projects
              <ArrowRight width={14} height={14} />
            </Link>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────── Engineering approach ───────────────── */}
      <section className="section" id="approach">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Engineering Approach</span>
            <h2>How I approach building a workflow</h2>
            <p className="lede">
              These are the working principles behind every project on this site, not a claim of
              production experience. They are the order in which I would work through a problem.
            </p>
          </div>

          <div className="principles">
            {engineeringPrinciples.map((principle) => (
              <div className="principle" key={principle.n}>
                <span className="principle__num">{principle.n}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── Tools ─────────────────────── */}
      <section className="section" id="tools">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Tools and Technologies</span>
            <h2>The stack, and how well I know each part of it</h2>
            <p className="lede">
              Tools are separated into three tiers so the primary implementation stack stays visible and
              nothing is implied that has not been used. Every entry states its purpose and its current
              experience level.
            </p>
          </div>

          <ToolsSection />
        </div>
      </section>

      {/* ────────────────────────── ROI calculator ──────────────────── */}
      <section className="section" id="roi">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Estimating Impact</span>
            <h2>Interactive ROI calculator for enquiry automation</h2>
            <p className="lede">
              A working model that runs entirely in your browser. Change any assumption and the estimate
              updates immediately. It is a planning tool, not a forecast.
            </p>
          </div>

          <ROICalculator />

          <div className="grid-2" style={{ marginTop: '1.6rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1rem' }}>What it separates</h3>
              <p className="muted" style={{ fontSize: '0.87rem', marginTop: '0.6rem' }}>
                Cost reduction, revenue impact and risk reduction are kept apart so they are not added
                together or counted twice. Risk reduction is described, never priced.
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1rem' }}>What it does not do</h3>
              <p className="muted" style={{ fontSize: '0.87rem', marginTop: '0.6rem' }}>
                It does not forecast, it does not call an API and it does not assume your numbers are
                right. The result is only as good as the assumptions typed into it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Demonstrations ──────────────────── */}
      <section className="section" id="demos">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Demonstrations</span>
            <h2>Where the walkthroughs will live</h2>
            <p className="lede">
              One slot per project, each holding a Loom recording, selected screenshots and the list of test
              scenarios demonstrated. Nothing is embedded yet because nothing has been recorded.
            </p>
          </div>

          <DemoSlots />

          <div className="notice" style={{ marginTop: '1.6rem' }}>
            <strong>A live chat demo is planned, not built.</strong> If a WhatsApp or Instagram demonstration
            is added later it would run on a test account with safe test data, restricted access, clear
            boundaries and no exposure of private customer information or credentials.
          </div>
        </div>
      </section>

      {/* ────────────────────── Dashboard evidence ─────────────────── */}
      <section className="section" id="evidence">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Metrics &amp; Dashboard Evidence</span>
            <h2>Operational metrics, once there is real data</h2>
            <p className="lede">
              A place to show recorded results from the projects: volumes, response times, classifications,
              outcomes, exceptions and failures. Until real data exists, the preview below is labelled as
              illustrative.
            </p>
          </div>

          <DashboardPreview />
        </div>
      </section>

      {/* ───────────────────── What I won't automate ────────────────── */}
      <section className="section" id="privacy">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Data Privacy &amp; Judgment</span>
            <h2>What I will not automate</h2>
            <p className="lede">
              Automation should not be implemented blindly. Some decisions require a person, some inputs
              require permissions I should not grant, and some failures should never be allowed to look like
              success.
            </p>
          </div>

          <div className="principles">
            {privacyPrinciples.map((principle) => (
              <div className="principle" key={principle.title}>
                <span className="principle__num">-</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '1.6rem' }}>
            <div className="cluster" style={{ gap: '0.6rem', marginBottom: '0.8rem' }}>
              <span className="eyebrow">Applied</span>
              <h3 style={{ margin: 0 }}>{noAutomateHighlight.title}</h3>
            </div>
            <div className="scenario-list" style={{ marginTop: 0 }}>
              {noAutomateHighlight.items.map((item) => (
                <span className="scenario" key={item}>{item}</span>
              ))}
            </div>
            <p className="faint" style={{ fontSize: '0.82rem', marginTop: '1.2rem' }}>
              {privacyFooter}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── About ─────────────────────── */}
      <section className="section" id="about">
        <div className="shell">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="stack" style={{ gap: '1.3rem' }}>
              <div>
                <span className="eyebrow">{about.eyebrow}</span>
                <h2 style={{ marginTop: '0.8rem' }}>A builder who works the operational problems</h2>
              </div>

              {about.paragraphs.map((paragraph) => (
                <p className="lede" key={paragraph}>
                  {paragraph}
                </p>
              ))}

              <dl className="stack" style={{ gap: '0', margin: 0, borderTop: '1px solid var(--border)' }}>
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(120px, 0.5fr) minmax(0, 1fr)',
                      gap: '1rem',
                      padding: '0.85rem 0',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <dt className="faint mono" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {fact.label}
                    </dt>
                    <dd style={{ margin: 0, fontSize: '0.9rem' }}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="stack" style={{ gap: '1rem' }}>
              <div className="card">
                <div className="cluster" style={{ gap: '0.6rem', marginBottom: '0.8rem' }}>
                  <BoltIcon width={18} height={18} style={{ color: 'var(--accent)' }} />
                  <h3 style={{ margin: 0, fontSize: '1rem' }}>Editable placeholders</h3>
                </div>
                <div className="stack-sm">
                  {about.placeholders.map((placeholder) => (
                    <div key={placeholder.label} style={{ borderLeft: '2px solid var(--border)', paddingLeft: '0.9rem' }}>
                      <span className="mono" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                        {placeholder.label}
                      </span>
                      <p className="muted" style={{ fontSize: '0.84rem', marginTop: '0.35rem' }}>
                        {placeholder.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1rem' }}>Documented the same way</h3>
                <ul className="stack-sm" style={{ marginTop: '0.7rem' }}>
                  {[
                    'What is built, stated as built.',
                    'What has been tested, stated with the test scenario.',
                    'What is only designed, labelled as planned.',
                    'Known limitations written down next to the results.',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <CheckIcon width={15} height={15} style={{ flex: 'none', marginTop: '0.28rem', color: 'var(--accent)' }} />
                      <span className="muted" style={{ fontSize: '0.86rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── Contact ────────────────────── */}
      <section className="section" id="contact">
        <div className="shell">
          <div className="surface" style={{ padding: 'clamp(2rem, 1.2rem + 3vw, 3.4rem)' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div className="stack" style={{ gap: '1rem' }}>
                <span className="eyebrow">Contact</span>
                <h2 style={{ fontSize: 'clamp(1.5rem, 1.1rem + 1.8vw, 2.1rem)' }}>
                  Relevant professional opportunities
                </h2>
                <p className="lede">
                  Remote internships, junior automation roles and implementation projects where workflow
                  engineering is the actual work. If you have a process that should be automated, start with
                  an audit rather than a build.
                </p>
              </div>

              <div className="stack" style={{ gap: '0.8rem' }}>
                <CtaButton cta={site.ctas.primary} />
                <CtaButton cta={site.ctas.secondary} variant="secondary" />

                <div className="cluster" style={{ gap: '0.5rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  {site.contact.email.href ? (
                    <a className="btn btn--ghost btn--small" href={site.contact.email.href}>
                      Email
                    </a>
                  ) : (
                    <span className="btn btn--pending btn--small" aria-disabled="true">
                      Email · {site.contact.email.detail}
                    </span>
                  )}
                  {site.contact.linkedin.href ? (
                    <a className="btn btn--ghost btn--small" href={site.contact.linkedin.href} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  ) : (
                    <span className="btn btn--pending btn--small" aria-disabled="true">
                      LinkedIn · {site.contact.linkedin.detail}
                    </span>
                  )}
                  {site.contact.github.href ? (
                    <a className="btn btn--ghost btn--small" href={site.contact.github.href} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  ) : (
                    <span className="btn btn--pending btn--small" aria-disabled="true">
                      GitHub · {site.contact.github.detail}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <hr className="divider" style={{ margin: '2rem 0' }} />

            <p className="faint" style={{ fontSize: '0.8rem' }}>
              Until a booking link and contact details are supplied, the buttons above show as coming soon
              rather than linking anywhere. No booking URL or form is invented.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────── Operations audit teaser ─────────────── */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.2rem' }}>
            <div className="stack" style={{ gap: '0.5rem', flex: '1 1 380px' }}>
              <span className="eyebrow">Consulting</span>
              <h3 style={{ margin: 0, fontSize: '1.15rem' }}>
                Before any automation is proposed, the process is audited
              </h3>
              <p className="muted" style={{ fontSize: '0.88rem' }}>
                A seven-step review that maps the process, establishes a baseline, tests whether automation
                is even appropriate, and states every assumption behind a financial estimate.
              </p>
            </div>
            <div className="cluster" style={{ gap: '0.5rem' }}>
              <Link to="/audit" className="btn btn--secondary">
                Operations Audit &amp; Implementation
                <ArrowRight width={14} height={14} />
              </Link>
              <Link to="/audit/velara-skin-co" className="btn btn--ghost">
                Read the sample practice audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── Practice audit strip ────────────────── */}
      <section className="section section--tight" style={{ paddingTop: 0, paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          <div className="section-head" style={{ marginBottom: '1.5rem' }}>
            <span className="eyebrow">Practice Audit</span>
            <h2>{velara.name}: {velara.tagline}</h2>
          </div>
          <div className="notice notice--warn">
            <strong>Fictional demonstration.</strong> {velara.disclaimer}
          </div>
          <Link to="/audit/velara-skin-co" className="link-arrow" style={{ marginTop: '1.2rem' }}>
            Open the practice audit
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  )
}
