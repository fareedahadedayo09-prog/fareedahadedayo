import { Link } from 'react-router-dom'
import { Portrait } from '../components/Portrait'
import { ProjectCard } from '../components/ProjectCard'
import { ToolLogo } from '../components/ToolLogo'
import { ArrowRight, CheckIcon } from '../components/Icons'
import { CalendlyEmbed, CALENDLY_LINK } from '../components/CalendlyEmbed'
import { Reveal } from '../components/Reveal'
import { FAQAccordion } from '../components/FAQAccordion'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { about, capabilities, faq, methodology, privacyFooter, privacyPrinciples } from '../data/content'
import { problemCategories } from '../data/problems'
import { services } from '../data/services'
import toolStack from '../data/tools'

const featured = projects.filter((p) => p.status !== 'planned').slice(0, 3)

const bookingChecks = [
  'Understand your current process',
  'Spot repetitive tasks and bottlenecks',
  'See whether automation or AI can help',
  'Agree practical next steps',
]

export function Home() {
  return (
    <>
      {/* ─────────────────────────── Hero ───────────────────────────── */}
      <section className="hero">
        <div className="shell">
          <div className="hero__grid hero__image-first">
            <div className="hero__copy">
              <Reveal>
                <span className="eyebrow">{site.roleLabel}</span>
                <h1 className="hero__headline" style={{ textWrap: 'balance' as any }}>{site.headline}</h1>
                <p className="hero__lead">{site.heroLead}</p>

                <div className="hero__actions">
                  <Link to="/projects" className="btn btn--primary">
                    Explore my work
                    <ArrowRight width={15} height={15} />
                  </Link>
                  <a href={CALENDLY_LINK} target="_blank" rel="noreferrer" className="btn btn--secondary">
                    Book a call
                  </a>
                </div>

                <div className="hero__availability" style={{ marginTop: '0.8rem' }}>
                  <span className="status-dot" aria-hidden="true" />
                  {site.availability}
                </div>
              </Reveal>
            </div>

            <Reveal delay={120} y={24}>
              <Portrait />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────── Problems ─────────────── */}
      <section className="section" id="problems">
        <div className="shell">
          <Reveal>
            <div className="section-head" style={{ maxWidth: '60ch' }}>
              <span className="eyebrow">Problems</span>
              <h2>Where manual work costs you time and money</h2>
              <p className="lede">
                These are the everyday tasks where automation removes errors and delays.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="problem-grid problem-grid--3-2">
              <div className="problem-grid__row">
                {problemCategories.slice(0, 3).map((cat) => (
                  <div className="problem-card problem-card--simple" key={cat.id}>
                    <h3 className="problem-card__title">{cat.title}</h3>
                    <p className="problem-card__summary">{cat.line}</p>
                  </div>
                ))}
              </div>
              <div className="problem-grid__row problem-grid__row--center">
                {problemCategories.slice(3).map((cat) => (
                  <div className="problem-card problem-card--simple" key={cat.id}>
                    <h3 className="problem-card__title">{cat.title}</h3>
                    <p className="problem-card__summary">{cat.line}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Services ──────────────── */}
      <section className="section" id="services">
        <div className="shell">
          <Reveal>
            <div className="section-head section-head--row">
              <div className="section-head" style={{ marginBottom: 0, flex: '1 1 360px' }}>
                <span className="eyebrow">Services</span>
                <h2>Types of systems I design and implement</h2>
                <p className="lede">
                  These are the kinds of workflows I build. Every offering here is grounded in at least one
                  project on this site.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="services-grid">
            {services.map((svc, i) => (
              <Reveal key={svc.id} delay={i * 80} y={16}>
                <div className={`service-card ${i === 0 ? 'card--featured' : ''}`}>
                  <h3 className="service-card__title">{svc.title}</h3>
                  <p className="service-card__summary">{svc.summary}</p>
                  <p className="service-card__detail">{svc.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── Projects ─────────────────────── */}
      <section className="section" id="projects">
        <div className="shell">
          <Reveal>
            <div className="section-head section-head--row">
              <div className="section-head" style={{ marginBottom: 0, flex: '1 1 340px' }}>
                <span className="eyebrow">Selected work</span>
                <h2>Projects you can inspect in detail</h2>
                <p className="lede">
                  Each case study explains the problem, what was automated vs kept human, shows the workflow
                  step-by-step, and labels every result as verified, partial or designed.
                </p>
              </div>
              <Link to="/projects" className="btn btn--secondary">
                All projects
                <ArrowRight width={14} height={14} />
              </Link>
            </div>
          </Reveal>

          <div className="project-grid">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80} y={16}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── Consultation CTA ─────── */}
      <Reveal>
        <section className="section" id="consultation-cta" style={{ paddingTop: 0 }}>
          <div className="shell">
            <div className="contact-surface card--featured" style={{ padding: 'clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem)' }}>
              <div className="grid-2" style={{ alignItems: 'center', gap: '1.6rem' }}>
                <div className="stack" style={{ gap: '0.7rem' }}>
                  <span className="eyebrow">Free 30-minute call</span>
                  <h2 style={{ fontSize: 'clamp(1.4rem, 1rem + 1.7vw, 2rem)', margin: 0 }}>
                    Have an operational problem worth solving?
                  </h2>
                  <p className="muted" style={{ fontSize: '0.94rem', lineHeight: 1.7, margin: 0, maxWidth: '58ch' }}>
                    Tell me about the repetitive tasks, disconnected tools, or process bottlenecks slowing
                    down your business.
                  </p>
                </div>
                <div className="cluster" style={{ gap: '0.6rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <a href={CALENDLY_LINK} target="_blank" rel="noreferrer" className="btn btn--primary">
                    Book a free call
                    <ArrowRight width={14} height={14} />
                  </a>
                  <Link to="/simulators" className="btn btn--ghost btn--small">
                    See the simulators
                    <ArrowRight width={12} height={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ───────────────── Process ────────────────── */}
      <section className="section" id="process">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Process</span>
              <h2>Diagnose before you build</h2>
              <p className="lede">
                Automation should solve a genuine business problem. Every engagement follows the same five steps.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="principles">
              {methodology.map((step) => (
                <div className="principle" key={step.n}>
                  <span className="principle__num">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid-3" style={{ marginTop: '1.8rem' }}>
            {capabilities.map((capability, i) => (
              <Reveal key={capability.title} delay={i * 80} y={16}>
                <div className={`card ${i === 1 ? 'card--featured' : ''}`}>
                  <h3 style={{ fontSize: '1rem' }}>{capability.title}</h3>
                  <p className="muted" style={{ fontSize: '0.87rem', marginTop: '0.6rem' }}>{capability.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── Tools ─────────────────────── */}
      <section className="section" id="tools">
        <div className="shell">
          <Reveal>
            <div className="section-head section-head--row">
              <div className="section-head" style={{ marginBottom: 0, flex: '1 1 360px' }}>
                <span className="eyebrow">Tools &amp; Technologies</span>
                <h2>The stack I build with</h2>
                <p className="lede">
                  The technologies I use to design, build and connect automation systems.
                </p>
              </div>
              <Link to="/tools" className="btn btn--secondary">
                All tools
                <ArrowRight width={14} height={14} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="stack" style={{ gap: 'clamp(1.4rem, 1rem + 1.2vw, 2rem)' }}>
              {toolStack.slice(0, 4).map((group) => (
                <div key={group.title} className="toolgroup">
                  <div className="toolgroup__head" style={{ marginBottom: '0.6rem' }}>
                    <h3 className="toolgroup__title" style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)' }} dangerouslySetInnerHTML={{ __html: group.title }} />
                    <span className="toolgroup__rule" />
                  </div>
                  <ul className="toollogogrid" role="list">
                    {group.tools.map((tool) => (
                      <li key={tool.name} className="toollogo">
                        <ToolLogo logo={tool.logo} name={tool.name} size={56} />
                        <span className="toollogo__name">{tool.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p style={{ marginTop: '0.4rem' }}>
                <Link to="/tools" className="link-arrow">
                  See every tool in the stack
                  <ArrowRight width={12} height={12} />
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── Judgement ─────────────── */}
      <section className="section" id="principles">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Judgement</span>
              <h2>Where automation stops and a person decides</h2>
              <p className="lede">
                Some decisions require a person. These principles apply to every workflow I build.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="principles">
              {privacyPrinciples.map((principle) => (
                <div className="principle" key={principle.title}>
                  <span className="principle__num">•</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="faint" style={{ fontSize: '0.82rem', marginTop: '1.6rem', maxWidth: '72ch' }}>{privacyFooter}</p>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── About ─────────────────────── */}
      <section className="section" id="about">
        <div className="shell">
          <Reveal>
            <div className="grid-2" style={{ alignItems: 'start' }}>
              <div className="stack" style={{ gap: '1.3rem' }}>
                <div>
                  <span className="eyebrow">{about.eyebrow}</span>
                  <h2 style={{ marginTop: '0.8rem' }}>Law student, self-taught builder</h2>
                </div>

                <p className="lede">{about.lead}</p>

                {about.paragraphs.map((paragraph) => (
                  <p className="muted" key={paragraph} style={{ fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '62ch' }}>
                    {paragraph}
                  </p>
                ))}

                <dl className="stack" style={{ gap: 0, margin: 0, borderTop: '1px solid var(--border)' }}>
                  {about.facts.map((fact) => (
                    <div
                      key={fact.label}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(140px, 0.5fr) minmax(0, 1fr)',
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
                <div className="card card--featured">
                  <div className="cluster" style={{ gap: '0.6rem', marginBottom: '0.8rem' }}>
                    <CheckIcon width={18} height={18} style={{ color: 'var(--accent)' }} />
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>How every project is documented</h3>
                  </div>
                  <ul className="stack-sm">
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

                <div className="card">
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No fake claims</h3>
                  <p className="muted" style={{ fontSize: '0.86rem', lineHeight: 1.65 }}>
                    Everything here is real. Prototypes and planned builds are labelled as such.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── FAQ ───────────────────── */}
      <section className="section" id="faq">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Questions</span>
              <h2>Answers for prospective clients</h2>
              <p className="lede">
                If you are a business owner trying to decide whether it is worth talking to me, these are the
                questions I get most often.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <FAQAccordion items={faq} />
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── Contact ────────────────────── */}
      <section className="section" id="contact">
        <div className="shell">
          <Reveal>
            <div className="contact-surface">
              <div className="grid-2" style={{ alignItems: 'start', position: 'relative', zIndex: 1, gap: '2rem' }}>
                <div className="stack" style={{ gap: '1rem' }}>
                  <span className="eyebrow">Book a call</span>
                  <h2 style={{ fontSize: 'clamp(1.55rem, 1.15rem + 1.9vw, 2.25rem)' }}>
                    Book a free 30-minute call
                  </h2>
                  <p className="lede" style={{ maxWidth: '58ch' }}>
                    Pick a time that works for you. We will talk through your process and whether automation
                    can help.
                  </p>

                  <ul className="check-list" role="list">
                    {bookingChecks.map((item) => (
                      <li key={item}>
                        <CheckIcon width={15} height={15} style={{ color: 'var(--accent)', flex: 'none', marginTop: '0.22rem' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="faint" style={{ fontSize: '0.84rem', margin: 0, lineHeight: 1.6 }}>
                    Online via Google Meet. No obligation.
                  </p>

                  <div className="contact-rows">
                    <a className="contact-row" href={site.contact.email.href}>
                      <span className="contact-row__label">Email</span>
                      <span className="contact-row__value">{site.contact.email.detail}</span>
                    </a>
                    <a className="contact-row" href={site.contact.linkedin.href} target="_blank" rel="noreferrer">
                      <span className="contact-row__label">LinkedIn</span>
                      <span className="contact-row__value">{site.contact.linkedin.detail}</span>
                    </a>
                    <div className="contact-row">
                      <span className="contact-row__label">Location</span>
                      <span className="contact-row__value">{site.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <CalendlyEmbed height={720} />
                  <p className="faint" style={{ fontSize: '0.78rem', marginTop: '0.7rem', lineHeight: 1.6 }}>
                    Calendar provided by Calendly. Select a time that works for you.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
