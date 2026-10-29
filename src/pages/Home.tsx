import { Link } from 'react-router-dom'
import { HashLink } from '../components/HashLink'
import { ProjectCard } from '../components/ProjectCard'
import { ToolsSection } from '../components/ToolsSection'
import { ArrowRight, CheckIcon } from '../components/Icons'
import { site } from '../data/site'
import { projects } from '../data/projects'
import {
  about,
  capabilities,
  methodology,
  noAutomateHighlight,
  privacyFooter,
  privacyPrinciples,
  scope,
} from '../data/content'
import { velara } from '../data/audit'

export function Home() {
  return (
    <>
      {/* ─────────────────────────── Hero ───────────────────────────── */}
      <section className="hero">
        <div className="shell">
          <div className="hero__copy hero__copy--solo">
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
        </div>
      </section>

      {/* ───────────────────────── Projects ─────────────────────────── */}
      <section className="section" id="projects">
        <div className="shell">
          <div className="section-head section-head--row">
            <div className="section-head" style={{ marginBottom: 0, flex: '1 1 340px' }}>
              <span className="eyebrow">Selected Projects</span>
              <h2>Automation projects and workflow prototypes</h2>
              <p className="lede">
                Each case study covers the operational problem, how the workflow works, its decision logic,
                exceptions, evidence and limitations, with the current scope described plainly.
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

      {/* ─────────────────────────── Approach ───────────────────────── */}
      <section className="section" id="approach">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Approach</span>
            <h2>Consulting first, then implementation</h2>
            <p className="lede">
              Automation work starts with understanding the business, not with connecting tools. The same
              five steps apply whether the process is in sales, customer service, finance or administration.
            </p>
          </div>

          <div className="principles">
            {methodology.map((step) => (
              <div className="principle" key={step.n}>
                <span className="principle__num">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>

          <div className="grid-3" style={{ marginTop: '1.8rem' }}>
            {capabilities.map((capability) => (
              <div className="card" key={capability.title}>
                <h3 style={{ fontSize: '1rem' }}>{capability.title}</h3>
                <p className="muted" style={{ fontSize: '0.87rem', marginTop: '0.6rem' }}>{capability.body}</p>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '1.6rem' }}>
            <p className="lede" style={{ marginBottom: '1.1rem' }}>{scope.lead}</p>
            <div className="scenario-list" style={{ marginTop: 0 }}>
              {scope.areas.map((area) => (
                <span className="scenario" key={area}>{area}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── Tools ─────────────────────── */}
      <section className="section" id="tools">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Technical Skills</span>
            <h2>Tools and skills I can use</h2>
            <p className="lede">
              A practical toolkit across workflow automation, AI and LLM integration, data, APIs and web
              development. Each case study separately describes the tools and workflow paths demonstrated in that project.
            </p>
          </div>

          <ToolsSection />
        </div>
      </section>

      {/* ───────────────────── What I won't automate ────────────────── */}
      <section className="section" id="privacy">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Judgment</span>
            <h2>What I will not automate</h2>
            <p className="lede">
              Some decisions require a person, some inputs require permissions that should not be granted, and
              some failures should never be allowed to look like success. These are the principles applied to
              every engagement.
            </p>
          </div>

          <div className="principles">
            {privacyPrinciples.map((principle) => (
              <div className="principle" key={principle.title}>
                <span className="principle__num">•</span>
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
            <p className="faint" style={{ fontSize: '0.82rem', marginTop: '1.2rem' }}>{privacyFooter}</p>
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
                <h2 style={{ marginTop: '0.8rem' }}>Understanding the problem before building the system</h2>
              </div>

              {about.paragraphs.map((paragraph) => (
                <p className="lede" key={paragraph}>{paragraph}</p>
              ))}

              <dl className="stack" style={{ gap: 0, margin: 0, borderTop: '1px solid var(--border)' }}>
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
                <h3 style={{ fontSize: '1rem' }}>Documented the same way</h3>
                <ul className="stack-sm" style={{ marginTop: '0.7rem' }}>
                  {[
                    'What is built, stated as built.',
                    'What has been tested, stated with the test scenario.',
                    'What is only designed, labelled as designed.',
                    'Known limitations written next to the results.',
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
                  I am seeking remote internships and junior roles focused on AI workflow automation, process
                  improvement and business operations. I am especially interested in work involving n8n, APIs,
                  structured data and carefully scoped AI integrations.
                </p>
              </div>

              <div className="cluster" style={{ gap: '0.6rem', flexWrap: 'wrap' }}>
                {site.contact.email.href ? (
                  <a className="btn btn--primary" href={site.contact.email.href}>
                    Email
                    <ArrowRight width={14} height={14} />
                  </a>
                ) : null}
                {site.contact.linkedin.href ? (
                  <a className="btn btn--secondary" href={site.contact.linkedin.href} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </div>
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
                A review that maps the process, establishes a baseline, tests whether automation is even
                appropriate, and states every assumption behind a financial estimate.
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
