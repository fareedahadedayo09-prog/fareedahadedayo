import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Project } from '../data/projects'
import { PROJECT_CATEGORY_LABELS, SECTION_STATUS_LABEL, getProject, relatedProjects } from '../data/projects'
import { StatusBadge } from '../components/StatusBadge'
import { ArrowRight, CheckIcon, AlertIcon } from '../components/Icons'
import { ProjectCard } from '../components/ProjectCard'

function TechnicalExpander({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const t = project.technical
  return (
    <div className={`expander ${open ? 'is-open' : ''}`}>
      <button type="button" className="expander__btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="expander__title">
          <span className="mono" style={{ color: 'var(--text-faint)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '0.8rem' }}>
            For technical visitors
          </span>
          <span style={{ fontWeight: 600 }}>Technical implementation, testing &amp; limitations</span>
        </span>
        <span className="expander__chevron" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div className="expander__body">
        <div style={{ paddingTop: '1.2rem' }}>
          <p className="muted" style={{ marginTop: 0 }}>{t.summary}</p>

          {t.dataFlow && t.dataFlow.length > 0 ? (
            <div style={{ marginTop: '1.1rem' }}>
              <h4 style={{ fontSize: '0.84rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontWeight: 500, margin: '0 0 0.6rem' }}>
                Data flow
              </h4>
              <ul className="bullets">
                {t.dataFlow.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          ) : null}

          {t.decisionLogic && t.decisionLogic.length > 0 ? (
            <div style={{ marginTop: '1.1rem' }}>
              <h4 style={{ fontSize: '0.84rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontWeight: 500, margin: '0 0 0.6rem' }}>
                Decision logic
              </h4>
              <ul className="bullets">
                {t.decisionLogic.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          ) : null}

          {t.validation && t.validation.length > 0 ? (
            <div style={{ marginTop: '1.1rem' }}>
              <h4 style={{ fontSize: '0.84rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontWeight: 500, margin: '0 0 0.6rem' }}>
                Validation
              </h4>
              <ul className="bullets">
                {t.validation.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          ) : null}

          {t.exceptions && t.exceptions.length > 0 ? (
            <div style={{ marginTop: '1.1rem' }}>
              <h4 style={{ fontSize: '0.84rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontWeight: 500, margin: '0 0 0.6rem' }}>
                Exceptions &amp; error handling
              </h4>
              <ul className="bullets">
                {t.exceptions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          ) : null}

          {t.testing && t.testing.length > 0 ? (
            <div style={{ marginTop: '1.1rem' }}>
              <h4 style={{ fontSize: '0.84rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontWeight: 500, margin: '0 0 0.6rem' }}>
                Testing
              </h4>
              <ul className="bullets">
                {t.testing.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          ) : null}

          {t.examplePayload ? (
            <div className="tech-block" style={{ marginTop: '1.2rem' }}>
              <div className="tech-block__title">Example inbound payload (illustrative)</div>
              <pre className="code-block">{t.examplePayload}</pre>
            </div>
          ) : null}

          {t.limitations && t.limitations.length > 0 ? (
            <div style={{ marginTop: '1.3rem' }}>
              <div className="cluster" style={{ gap: '0.4rem', marginBottom: '0.5rem' }}>
                <AlertIcon width={14} height={14} style={{ color: 'var(--status-progress)' }} />
                <h4 style={{ fontSize: '0.9rem', margin: 0 }}>Limitations &amp; next improvements</h4>
              </div>
              <ul className="bullets">
                {t.limitations.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function ProjectCaseStudy() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined

  if (!project) {
    return (
      <section className="section">
        <div className="shell-narrow">
          <span className="eyebrow">Not found</span>
          <h1 style={{ marginTop: '1rem' }}>That case study does not exist</h1>
          <p className="lede" style={{ marginTop: '1rem' }}>
            The project link is either out of date or the project has not been published yet.
          </p>
          <Link to="/projects" className="btn btn--secondary" style={{ marginTop: '1.6rem' }}>
            Back to all projects
            <ArrowRight width={14} height={14} />
          </Link>
        </div>
      </section>
    )
  }

  const related = relatedProjects(project)

  return (
    <article>
      {/* ─────── Intro / meta ─────── */}
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/projects" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              All projects
            </Link>

            <div className="cluster" style={{ gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <StatusBadge tone={project.status} label={project.statusLabel} />
              {project.categories.map((c) => (
                <span key={c} className="badge badge--illustrative">
                  {PROJECT_CATEGORY_LABELS[c]}
                </span>
              ))}
              <span className="badge badge--illustrative">{project.timeline}</span>
            </div>

            <h1 className="cs-hero__title">{project.name}</h1>
            <p className="lede" style={{ marginTop: '0.6rem' }}>{project.tagline}</p>

            <div className="chip-row" style={{ marginTop: '0.3rem' }}>
              {project.tools.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            {project.statusDetail ? (
              <div className="notice notice--warn" style={{ marginTop: '1rem' }}>
                <strong>Status.</strong> {project.statusDetail}
              </div>
            ) : null}
          </div>

          <nav className="cs-nav" aria-label="Case study sections" style={{ marginTop: '1.2rem' }}>
            <a href="#problem">The problem</a>
            <a href="#solution">The solution</a>
            <a href="#how">How it works</a>
            <a href="#result">Testing &amp; results</a>
            {project.evidence?.length ? <a href="#evidence">Evidence</a> : null}
            <a href="#technical">Technical detail</a>
          </nav>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 6rem)' }}>
        <div className="shell shell-narrow">
          {/* ─────── 2. Problem ─────── */}
          <section className="cs-section" id="problem">
            <div className="cs-section__head">
              <span className="cs-section__num">The problem</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>
                Why this system needed to exist
              </h2>
            </div>
            <p style={{ fontSize: '1.02rem' }}>{project.problem.summary}</p>
            <p className="muted" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)' }}>Why it matters to the business.</strong> {project.problem.whyItMatters}
            </p>
            <ul className="bullets" style={{ marginTop: '1rem' }}>
              {project.problem.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </section>

          {/* ─────── 3. Solution ─────── */}
          <section className="cs-section" id="solution">
            <div className="cs-section__head">
              <span className="cs-section__num">The solution</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>
                What I built
              </h2>
            </div>
            <p style={{ fontSize: '1rem' }}>{project.solution.summary}</p>
            <div className="grid-2" style={{ marginTop: '1.2rem', gap: '1.2rem' }}>
              <div className="card" style={{ padding: '1.2rem 1.3rem' }}>
                <div className="cluster" style={{ gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <CheckIcon width={15} height={15} style={{ color: 'var(--accent)', flex: 'none' }} />
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>What is automated</h4>
                </div>
                <ul className="bullets" style={{ fontSize: '0.88rem' }}>
                  {project.solution.automated.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
              <div className="card" style={{ padding: '1.2rem 1.3rem' }}>
                <div className="cluster" style={{ gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <AlertIcon width={15} height={15} style={{ color: 'var(--status-progress)', flex: 'none' }} />
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>What stays with a person</h4>
                </div>
                <ul className="bullets" style={{ fontSize: '0.88rem' }}>
                  {project.solution.humanControl.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* ─────── 4. How it works ─────── */}
          <section className="cs-section" id="how">
            <div className="cs-section__head">
              <span className="cs-section__num">How it works</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>
                The process, step by step
              </h2>
            </div>
            <ol className="bullets">
              {project.workflow.map((step) => (
                <li key={step.id}><strong>{step.title}.</strong> {step.detail}</li>
              ))}
            </ol>
            {project.heroVisual?.image ? (
              <figure style={{ margin: '2rem 0 0' }}>
                <a href={project.heroVisual.image} target="_blank" rel="noreferrer" aria-label={`Open the ${project.name} workflow overview in a new tab`}>
                  <img src={project.heroVisual.image} alt={project.heroVisual.caption ?? `${project.name} workflow overview`} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '12px', border: '1px solid var(--border)' }} />
                </a>
                <figcaption className="muted" style={{ fontSize: '0.85rem', marginTop: '0.7rem' }}>
                  {project.heroVisual.caption ?? `${project.name} workflow overview`}. Open the image to see it in full size.
                </figcaption>
              </figure>
            ) : null}
            {project.workflowScreenshot ? (
              <figure style={{ margin: '2rem 0 0' }}>
                <a href={project.workflowScreenshot} target="_blank" rel="noreferrer" aria-label={`Open the ${project.name} n8n workflow screenshot in a new tab`}>
                  <img src={project.workflowScreenshot} alt={project.workflowScreenshotAlt ?? `${project.name} n8n workflow canvas`} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '12px', border: '1px solid var(--border)' }} />
                </a>
                <figcaption className="muted" style={{ fontSize: '0.85rem', marginTop: '0.7rem' }}>
                  The n8n workflow canvas for {project.name}. Open the image to see it in full size. Nodes shown do not by themselves establish that every path was tested.
                </figcaption>
              </figure>
            ) : (
              <p className="muted" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
                The original n8n workflow screenshot is not available yet.
              </p>
            )}
          </section>

          {/* ─────── 5. Result ─────── */}
          <section className="cs-section" id="result">
            <div className="cs-section__head">
              <span className="cs-section__num">Testing &amp; results</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 1.05rem + 1.5vw, 2rem)' }}>
                What was tested
              </h2>
            </div>
            <p style={{ fontSize: '1rem' }}>{project.result.summary}</p>
            <ul className="results-list" style={{ marginTop: '1.1rem' }}>
              {project.result.points.map((p, i) => (
                <li key={i}>
                  <span className={`badge ${p.state === 'verified' ? 'badge--done' : p.state === 'partial' ? 'badge--progress' : 'badge--planned'}`}>
                    {p.state === 'planned' ? 'Planned' : SECTION_STATUS_LABEL[p.state]}
                  </span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
            {project.result.disclaimer ? (
              <div className="notice notice--warn" style={{ marginTop: '1.2rem' }}>
                <strong>Note on evidence.</strong> {project.result.disclaimer}
              </div>
            ) : null}
          </section>

          {project.evidence?.length ? (
            <section id="evidence" className="evidence-section">
              <details className="evidence-details">
                <summary className="evidence-summary">
                  <span><span className="mono evidence-label">Evidence</span><strong>View supporting screenshots</strong></span>
                  <span className="evidence-toggle" aria-hidden="true">+</span>
                </summary>
                <div className="evidence-body">
                  <p className="muted">{project.evidenceIntro ?? 'Select an image to view it at full size.'}</p>
                  {project.evidence.map((item) => (
                    <figure className="evidence-figure" key={item.image}>
                      <figcaption>
                        <h3>{item.title}</h3>
                        <p className="muted">{item.description}</p>
                      </figcaption>
                      <a href={item.image} target="_blank" rel="noreferrer" aria-label={`Open ${item.title} screenshot in a new tab`}>
                        <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                      </a>
                    </figure>
                  ))}
                </div>
              </details>
            </section>
          ) : null}

          {/* ─────── 6. Technical (expandable) ─────── */}
          <section id="technical">
            <TechnicalExpander project={project} />
          </section>

          {/* ─────── Related projects ─────── */}
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
