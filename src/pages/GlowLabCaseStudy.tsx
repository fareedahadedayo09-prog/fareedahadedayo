import { Link } from 'react-router-dom'
import { ArrowRight, AlertIcon, CheckIcon } from '../components/Icons'
import { StatusBadge } from '../components/StatusBadge'
import { ProjectCard } from '../components/ProjectCard'
import { LiveDemoPreview } from '../components/GlowLabLiveDemo'
import { GlowLabArchitecture } from '../components/GlowLabArchitecture'
import { GlowLabWorkflow } from '../components/GlowLabWorkflow'
import { GlowLabProgress, ProgressIcon } from '../components/GlowLabProgress'
import { GlowLabShots } from '../components/GlowLabShots'
import { getProject, relatedProjects } from '../data/projects'
import {
  GLOWLAB_DECISIONS,
  GLOWLAB_DEMO_URL,
  GLOWLAB_NEXT_STEPS,
  GLOWLAB_ORDER_EVIDENCE,
  GLOWLAB_OVERVIEW,
  GLOWLAB_PROBLEM,
  GLOWLAB_SCOPE_NOTE,
  GLOWLAB_SOLUTION,
  GLOWLAB_STACK,
  GLOWLAB_STATUS_LABEL,
  GLOWLAB_TESTS,
  GLOWLAB_VERIFIED_ON,
} from '../data/glowlab'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'preview', label: 'Live demo' },
  { id: 'problem', label: 'The problem' },
  { id: 'solution', label: 'The solution' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'testing', label: 'Testing' },
  { id: 'progress', label: 'Progress' },
  { id: 'next', label: 'Next steps' },
]

const TEST_STATE_COPY: Record<string, { label: string; className: string }> = {
  verified: { label: 'Checked', className: 'badge--done' },
  observed: { label: 'Observed issue', className: 'badge--progress' },
  unverified: { label: 'Not reproduced here', className: 'badge--planned' },
  planned: { label: 'Not built yet', className: 'badge--planned' },
}

/**
 * GlowLab case study. Ongoing project: the status is "In Progress" everywhere
 * it appears, and implemented / tested / unfinished work are kept apart.
 */
export function GlowLabCaseStudy() {
  const project = getProject('glowlab-lifecycle')

  if (!project) {
    return (
      <section className="section">
        <div className="shell-narrow">
          <h1>GlowLab case study unavailable</h1>
          <Link to="/projects" className="btn btn--secondary" style={{ marginTop: '1.4rem' }}>
            Back to all projects
          </Link>
        </div>
      </section>
    )
  }

  const related = relatedProjects(project)

  return (
    <article>
      {/* ───── Intro ───── */}
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/projects" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              All projects
            </Link>

            <div className="cluster" style={{ gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <StatusBadge tone="progress" label={GLOWLAB_STATUS_LABEL} />
              <span className="badge badge--illustrative">E-commerce automation</span>
              <span className="badge badge--illustrative">AI-assisted</span>
            </div>

            <h1 className="cs-hero__title">GlowLab — AI-Assisted E-commerce Platform</h1>
            <p className="lede" style={{ marginTop: '0.6rem' }}>
              A fictional skincare storefront with an AI shopping assistant, connected to an abandoned-cart
              automation prototype. An ongoing project, documented while it is still being built.
            </p>

            <div className="chip-row" style={{ marginTop: '0.3rem' }}>
              {GLOWLAB_STACK.map((tool) => (
                <span key={tool.name} className="tag">{tool.name}</span>
              ))}
            </div>

            <div className="gl-status" style={{ marginTop: '1.1rem' }}>
              <div className="gl-status__head">
                <span className="gl-status__dot" aria-hidden="true" />
                <strong>Status: In Progress</strong>
                <span className="gl-status__meta mono">Portfolio update complete · project ongoing</span>
              </div>
              <p>
                GlowLab is not finished. The storefront and assistant are live as a demo; the automation is a
                prototype that is still being tested and reviewed. Nothing on this page reports recovered orders,
                conversion gains or real customer usage, because none of that has been measured.
              </p>
              <div className="gl-status__links">
                <a className="btn btn--primary btn--small" href={GLOWLAB_DEMO_URL} target="_blank" rel="noopener noreferrer">
                  Visit Live Demo
                  <ArrowRight width={14} height={14} />
                </a>
                <a className="link-arrow" href="#preview">
                  See the live preview
                  <ArrowRight width={13} height={13} />
                </a>
              </div>
            </div>
          </div>

          <nav className="cs-nav" aria-label="Case study sections" style={{ marginTop: '1.2rem' }}>
            {SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.label}</a>
            ))}
          </nav>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 6rem)' }}>
        <div className="shell shell-narrow">
          {/* ───── Overview ───── */}
          <section className="cs-section" id="overview">
            <div className="cs-section__head">
              <span className="cs-section__num">Overview</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>What GlowLab is for</h2>
            </div>
            <p style={{ fontSize: '1.06rem' }}>{GLOWLAB_OVERVIEW.summary}</p>
            {GLOWLAB_OVERVIEW.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="muted" style={{ fontSize: '0.96rem', lineHeight: 1.75 }}>
                {paragraph}
              </p>
            ))}

            <div className="gl-scope">
              <h4 className="gl-scope__title">
                <AlertIcon width={14} height={14} />
                What this project is not
              </h4>
              <ul className="bullets">
                {GLOWLAB_OVERVIEW.isNot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="gl-stack" style={{ marginTop: '1.6rem' }}>
              {GLOWLAB_STACK.map((item) => (
                <div key={item.name} className="gl-stack__row">
                  <span className="gl-stack__name">{item.name}</span>
                  <span className="gl-stack__role">{item.role}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ───── Live demo preview (early, after the intro) ───── */}
          <section className="cs-section" id="preview">
            <div className="cs-section__head">
              <span className="cs-section__num">Live demo</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>The storefront, as it stands today</h2>
            </div>
            <p>
              GlowLab is deployed and publicly viewable. Because it is still being built, the demo is a snapshot of
              current work rather than a finished shop.
            </p>
            <LiveDemoPreview />

            <GlowLabShots />
          </section>

          {/* ───── Problem ───── */}
          <section className="cs-section" id="problem">
            <div className="cs-section__head">
              <span className="cs-section__num">The problem</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>Follow-up that depends on memory</h2>
            </div>
            <p style={{ fontSize: '1.04rem' }}>{GLOWLAB_PROBLEM.summary}</p>
            <p className="muted" style={{ fontSize: '0.96rem', lineHeight: 1.75 }}>
              <strong style={{ color: 'var(--text)' }}>Why it matters.</strong> {GLOWLAB_PROBLEM.whyItMatters}
            </p>
            <ul className="bullets" style={{ marginTop: '1rem' }}>
              {GLOWLAB_PROBLEM.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="gl-goals">
              <span className="gl-goals__title mono">What the design had to achieve</span>
              <div className="grid-2" style={{ marginTop: '0.8rem' }}>
                {GLOWLAB_PROBLEM.designGoals.map((goal) => (
                  <div key={goal} className="gl-goals__item">
                    <CheckIcon width={13} height={13} style={{ color: 'var(--accent)', flex: 'none', marginTop: '0.45em' }} />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ───── Solution ───── */}
          <section className="cs-section" id="solution">
            <div className="cs-section__head">
              <span className="cs-section__num">The solution</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>Three parts that have to agree</h2>
            </div>
            <div className="stack" style={{ gap: '1rem' }}>
              {GLOWLAB_SOLUTION.map((part, index) => (
                <div key={part.title} className="card gl-solution">
                  <div className="gl-solution__head">
                    <span className="gl-solution__num mono">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="gl-solution__title">{part.title}</h3>
                      <span className="gl-solution__kicker mono">{part.kicker}</span>
                    </div>
                  </div>
                  <p className="gl-solution__detail">{part.detail}</p>
                  <ul className="bullets">
                    {part.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ───── Architecture ───── */}
          <section className="cs-section" id="architecture">
            <div className="cs-section__head">
              <span className="cs-section__num">System architecture</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>How the services fit together</h2>
            </div>
            <p>
              Four layers: what the customer touches, where the decisions are made, what the system remembers, and how
              the customer hears back. Each card notes whether that part is visible in the live demo, still being
              built, or waiting on review.
            </p>
            <GlowLabArchitecture />
          </section>

          {/* ───── Workflow ───── */}
          <section className="cs-section" id="workflow">
            <div className="cs-section__head">
              <span className="cs-section__num">Workflow</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>
                From checkout event to follow-up
              </h2>
            </div>
            <p>
              The abandoned-cart path in the order the prototype runs it. Consent and eligibility are checked before a
              message is prepared, and the run is written down so the operator can see where it stopped.
            </p>
            <GlowLabWorkflow />
            <div className="notice notice--warn" style={{ marginTop: '1.4rem' }}>
              <strong>Demo timings.</strong> Reminder intervals in this prototype are shortened so the sequence can be
              watched in one sitting. They are not production timings and should not be reused in a real campaign.
            </div>
          </section>

          {/* ───── Technical decisions ───── */}
          <section className="cs-section" id="decisions">
            <div className="cs-section__head">
              <span className="cs-section__num">Technical decisions</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>Why these services, and what each costs</h2>
            </div>
            <p>
              Each choice below is paired with the trade-off it introduces. That second column is the part that usually
              decides whether a system is maintainable.
            </p>
            <div className="stack" style={{ gap: '0.85rem', marginTop: '1.2rem' }}>
              {GLOWLAB_DECISIONS.map((decision) => (
                <div key={decision.service} className="gl-decision">
                  <div className="gl-decision__head">
                    <span className="gl-decision__service">{decision.service}</span>
                    <span className="gl-decision__choice">{decision.choice}</span>
                  </div>
                  <div className="gl-decision__grid">
                    <p>
                      <span className="gl-decision__label mono">Why</span>
                      {decision.why}
                    </p>
                    <p>
                      <span className="gl-decision__label gl-decision__label--warn mono">Trade-off</span>
                      {decision.tradeoff}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ───── Testing ───── */}
          <section className="cs-section" id="testing">
            <div className="cs-section__head">
              <span className="cs-section__num">Testing &amp; validation</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>What could actually be checked</h2>
            </div>
            <p>
              Only checks that were carried out against the deployed project are listed as checked. Anything that would
              need access to the scenario, a real recipient or production sending is marked as not reproduced here.
            </p>
            <div className="gl-tests">
              {GLOWLAB_TESTS.map((test) => {
                const state = TEST_STATE_COPY[test.state]
                return (
                  <div key={test.area} className="gl-tests__row">
                    <div className="gl-tests__head">
                      <h4>{test.area}</h4>
                      <span className={`badge ${state.className}`}>{state.label}</span>
                    </div>
                    <p className="gl-tests__method">
                      <span className="mono">How</span> {test.method}
                    </p>
                    <p className="gl-tests__result">
                      <span className="mono">Result</span> {test.result}
                    </p>
                  </div>
                )
              })}
            </div>
            <section id="evidence" className="evidence-section" style={{ marginTop: '1.5rem' }}>
              <details className="evidence-details">
                <summary className="evidence-summary">
                  <span>
                    <span className="mono evidence-label">Evidence</span>
                    <strong>View the order email design sample</strong>
                  </span>
                  <span className="evidence-toggle" aria-hidden="true">+</span>
                </summary>
                <div className="evidence-body">
                  <p className="muted">{GLOWLAB_ORDER_EVIDENCE.intro}</p>
                  <p className="gl-evidence-meta">
                    <span className="mono">Order</span> {GLOWLAB_ORDER_EVIDENCE.orderNumber}
                    <span className="mono">Total</span> {GLOWLAB_ORDER_EVIDENCE.total}
                  </p>
                  {GLOWLAB_ORDER_EVIDENCE.items.map((item) => (
                    <figure className="evidence-figure" key={item.src}>
                      <figcaption>
                        <h3>{item.title}</h3>
                        <p className="muted">{item.caption}</p>
                      </figcaption>
                      <a href={item.src} target="_blank" rel="noreferrer" aria-label={`Open ${item.title} at full size`}>
                        <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                      </a>
                    </figure>
                  ))}
                  <p className="faint" style={{ fontSize: '0.78rem', marginTop: '1rem' }}>
                    <strong style={{ color: 'var(--text)' }}>Read this carefully.</strong> This shows the email design I
                    want the system to send. It was produced by hand, not by the automation, so it is not evidence that
                    sending works. What is still unbuilt: an automated send, delivery reporting, and the abandoned-cart
                    reminder sequence.
                  </p>
                </div>
              </details>
            </section>

            <p className="faint" style={{ fontSize: '0.82rem', marginTop: '1rem' }}>
              Checks carried out on {GLOWLAB_VERIFIED_ON}. A build that loads is not the same as a system that has been
              proven under real load, and this page does not pretend otherwise.
            </p>
          </section>

          {/* ───── Current progress ───── */}
          <section className="cs-section" id="progress">
            <div className="cs-section__head">
              <span className="cs-section__num">Current progress</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>
                What is built, what is being tested, what is open
              </h2>
            </div>
            <p>
              The board below is the honest version of a status panel. Items move right to left only when there is
              evidence, and the project stays <strong style={{ color: 'var(--text)' }}>In Progress</strong> while
              anything remains in the last two columns.
            </p>
            <GlowLabProgress />
          </section>

          {/* ───── Next steps ───── */}
          <section className="cs-section" id="next">
            <div className="cs-section__head">
              <span className="cs-section__num">Next steps</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>What I am working on next</h2>
            </div>
            <p>Drawn from the current state of the build — not a roadmap with dates attached.</p>
            <ol className="gl-next">
              {GLOWLAB_NEXT_STEPS.map((step, index) => (
                <li key={step.title}>
                  <span className="gl-next__num mono">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="gl-footer">
              <div className="gl-footer__head">
                <ProgressIcon state="active" />
                <strong>Where this leaves the project</strong>
              </div>
              <p>{GLOWLAB_SCOPE_NOTE}</p>
              <div className="gl-footer__links">
                <a className="btn btn--primary btn--small" href={GLOWLAB_DEMO_URL} target="_blank" rel="noopener noreferrer">
                  Visit Live Demo
                  <ArrowRight width={14} height={14} />
                </a>
                <Link to="/projects" className="link-arrow">
                  All projects
                  <ArrowRight width={13} height={13} />
                </Link>
              </div>
            </div>
          </section>

          {/* ───── Related ───── */}
          {related.length > 0 ? (
            <section style={{ marginTop: '2.8rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <div className="section-head" style={{ marginBottom: '1.5rem' }}>
                <span className="eyebrow">Related projects</span>
                <h3 style={{ fontSize: '1.15rem', margin: 0 }}>You might also want to read</h3>
              </div>
              <div className="project-grid">
                {related.map((r) => (
                  <ProjectCard key={r.slug} project={r} />
                ))}
              </div>
            </section>
          ) : null}

        </div>
      </section>
    </article>
  )
}
