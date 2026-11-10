import { Link } from 'react-router-dom'
import { Portrait } from '../components/Portrait'
import { ProjectCard } from '../components/ProjectCard'
import { ArrowRight, CheckIcon } from '../components/Icons'
import { CalendlyEmbed, CALENDLY_LINK } from '../components/CalendlyEmbed'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { about, capabilities, faq, methodology, privacyFooter, privacyPrinciples } from '../data/content'
import { problemCategories } from '../data/problems'
import { services } from '../data/services'
import { getProject } from '../data/projects'
import { toolCategories, tools } from '../data/tools'
import { EXPERIENCE_META } from '../data/tools'

const featured = projects.filter((p) => p.status !== 'planned').slice(0, 3)

export function Home() {
  const previewTools = tools.filter((t) => t.experience === 'projects').slice(0, 6)

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
                <Link to="/projects" className="btn btn--primary">
                  Explore my work
                  <ArrowRight width={15} height={15} />
                </Link>
                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--secondary"
                >
                  Book a consultation
                </a>
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

      {/* ─────────── Business problems ─────────────── */}
      <section className="section" id="problems">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Where the work lives</span>
            <h2>The operational problems I help address</h2>
            <p className="lede">
              If any of these sound like a normal afternoon in your business, that is the kind of friction
              well-designed automation is good at removing. These are not generic AI promises — they are the
              places where repetitive manual work creates mistakes, delays and extra cost.
            </p>
          </div>

          <div className="problem-grid">
            {problemCategories.map((cat) => (
              <div className="problem-card" key={cat.id}>
                <span className="problem-card__num">{cat.eyebrow} / {cat.title}</span>
                <h3 className="problem-card__title">{cat.title}</h3>
                <p className="problem-card__summary">{cat.summary}</p>
                <ul>
                  {cat.problems.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Services / Capabilities ──────────────── */}
      <section className="section" id="services">
        <div className="shell">
          <div className="section-head section-head--row">
            <div className="section-head" style={{ marginBottom: 0, flex: '1 1 360px' }}>
              <span className="eyebrow">What I can build</span>
              <h2>Types of systems I design and implement</h2>
              <p className="lede">
                These are the kinds of workflows I build. Every offering here is grounded in at least one
                project on this site, but I do not claim to have delivered every one for a paying client.
                Bring me your specific process and we will work out whether — and what — to automate.
              </p>
            </div>
          </div>

          <div className="services-grid">
            {services.map((svc) => (
              <div className="service-card" key={svc.id}>
                <h3 className="service-card__title">{svc.title}</h3>
                <p className="service-card__summary">{svc.summary}</p>
                <p className="service-card__detail">{svc.detail}</p>
                {svc.projectRef && getProject(svc.projectRef) ? (
                  <Link to={`/projects/${svc.projectRef}`} className="service-card__ref">
                    See related case study →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>

          <div className="notice" style={{ marginTop: '1.6rem' }}>
            <strong>Not sure where your problem fits?</strong> That is normal — many operational problems sit
            across two of these categories. Start by describing the process to me and I will tell you
            frankly what makes sense to build, if anything.
          </div>
        </div>
      </section>

      {/* ─────────────────── Featured projects ─────────────────────── */}
      <section className="section" id="projects">
        <div className="shell">
          <div className="section-head section-head--row">
            <div className="section-head" style={{ marginBottom: 0, flex: '1 1 340px' }}>
              <span className="eyebrow">Selected work</span>
              <h2>Projects you can inspect in detail</h2>
              <p className="lede">
                Each case study explains the problem, what was automated vs kept human, shows the workflow
                step-by-step (you can click through the diagram), and labels every result as verified,
                partial or designed.
              </p>
            </div>
            <Link to="/projects" className="btn btn--secondary">
              All projects
              <ArrowRight width={14} height={14} />
            </Link>
          </div>

          <div className="project-grid">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────── Consultation invitation after case studies ─────── */}
      <section className="section" id="consultation-cta" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="contact-surface" style={{ padding: 'clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem)' }}>
            <div className="grid-2" style={{ alignItems: 'center', gap: '1.6rem' }}>
              <div className="stack" style={{ gap: '0.7rem' }}>
                <span className="eyebrow">Free 30-minute consultation</span>
                <h2 style={{ fontSize: 'clamp(1.4rem, 1rem + 1.7vw, 2rem)', margin: 0 }}>
                  Have an operational problem worth solving?
                </h2>
                <p className="muted" style={{ fontSize: '0.94rem', lineHeight: 1.7, margin: 0 }}>
                  Tell me about the repetitive tasks, disconnected tools, or process bottlenecks slowing
                  down your business. Let's explore whether AI or workflow automation could make a
                  practical difference.
                </p>
              </div>
              <div className="cluster" style={{ gap: '0.6rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                >
                  Let's discuss your workflow
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

      {/* ───────────────── How I work (process) ────────────────── */}
      <section className="section" id="process">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">How I work</span>
            <h2>Diagnose before you build</h2>
            <p className="lede">
              Automation should solve a genuine business problem, not be introduced just because a tool
              makes it possible. Every engagement follows the same five steps.
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
        </div>
      </section>

      {/* ─────────────────────── Tools (preview) ─────────────────────── */}
      <section className="section" id="tools">
        <div className="shell">
          <div className="section-head section-head--row">
            <div className="section-head" style={{ marginBottom: 0, flex: '1 1 360px' }}>
              <span className="eyebrow">Tools</span>
              <h2>Tools organised by what they are used for</h2>
              <p className="lede">
                I do not use tool logos as a substitute for explaining what I can do with them. Each tool
                is grouped by practical purpose and carries an honest experience label. The full ecosystem
                is searchable and filterable.
              </p>
            </div>
            <Link to="/tools" className="btn btn--secondary">
              Full tool ecosystem
              <ArrowRight width={14} height={14} />
            </Link>
          </div>

          <div className="tools-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {previewTools.map((t) => (
              <div key={t.id} className="tool-ecosystem-card" style={{ cursor: 'default' }}>
                <div className="tool-ecosystem-card__head">
                  <span className="tool-monogram">{t.monogram}</span>
                  <span className="tool-ecosystem-card__name">{t.name}</span>
                </div>
                <div className="tool-ecosystem-card__meta">
                  <span className={`badge ${EXPERIENCE_META[t.experience].tone === 'done' ? 'badge--done' : EXPERIENCE_META[t.experience].tone === 'progress' ? 'badge--progress' : 'badge--planned'}`}>
                    {EXPERIENCE_META[t.experience].label}
                  </span>
                  <span className="badge badge--illustrative">
                    {toolCategories.find((c) => c.id === t.category)?.title}
                  </span>
                </div>
                <p className="tool-ecosystem-card__used">{t.usedFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── What I will not automate ─────────────── */}
      <section className="section" id="principles">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Judgement</span>
            <h2>Where automation stops and a person decides</h2>
            <p className="lede">
              Some decisions require a person. These principles apply to every workflow I build, so the
              system knows when to stop and hand over instead of producing a confident wrong answer.
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

          <p className="faint" style={{ fontSize: '0.82rem', marginTop: '1.6rem', maxWidth: '72ch' }}>{privacyFooter}</p>
        </div>
      </section>

      {/* ───────────────────── About ─────────────────────── */}
      <section className="section" id="about">
        <div className="shell">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="stack" style={{ gap: '1.3rem' }}>
              <div>
                <span className="eyebrow">{about.eyebrow}</span>
                <h2 style={{ marginTop: '0.8rem' }}>Law student, self-taught builder</h2>
              </div>

              <p className="lede">{about.lead}</p>

              {about.paragraphs.map((paragraph) => (
                <p className="muted" key={paragraph} style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
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
              <div className="card">
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
                  No fabricated client results. No invented testimonials. No vanity node counters. No
                  performance statistics I cannot point at a test run to support. Where something is a
                  prototype or a planned build, it is labelled as one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── FAQ ───────────────────── */}
      <section className="section" id="faq">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">Questions people usually ask</span>
            <h2>Answers for prospective clients</h2>
            <p className="lede">
              If you are a business owner trying to decide whether it is worth talking to me, these are the
              questions I get most often.
            </p>
          </div>

          <div className="faq-list">
            {faq.map((item) => (
              <div className="faq-item" key={item.q}>
                <h3 className="faq-item__q">{item.q}</h3>
                <p className="faq-item__a">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── Contact — inline Calendly booking ────────────────────── */}
      <section className="section" id="contact">
        <div className="shell">
          <div className="contact-surface">
            <div className="grid-2" style={{ alignItems: 'start', position: 'relative', zIndex: 1, gap: '2rem' }}>
              <div className="stack" style={{ gap: '1rem' }}>
                <span className="eyebrow">Book a consultation</span>
                <h2 style={{ fontSize: 'clamp(1.55rem, 1.15rem + 1.9vw, 2.25rem)' }}>
                  Free 30-minute AI automation consultation
                </h2>
                <p className="lede" style={{ maxWidth: '58ch' }}>
                  Pick a time that works for you. The call is held online via Google Meet and there is no
                  obligation to proceed with a project afterwards.
                </p>

                <div className="card" style={{ marginTop: '0.4rem' }}>
                  <h3 style={{ fontSize: '0.96rem', margin: '0 0 0.6rem' }}>During our conversation, we'll:</h3>
                  <ul className="bullets" style={{ fontSize: '0.88rem', marginBottom: '0.8rem' }}>
                    <li>Understand your business and current operational process.</li>
                    <li>Identify repetitive tasks, bottlenecks, or workflow inefficiencies.</li>
                    <li>Explore whether automation or AI could help.</li>
                    <li>Discuss potential solutions and practical next steps.</li>
                  </ul>
                  <p className="faint" style={{ fontSize: '0.82rem', margin: 0, lineHeight: 1.6 }}>
                    Meeting format: Online via Google Meet. No obligation to proceed with a project after
                    the call.
                  </p>
                </div>

                <div className="contact-channels" style={{ marginTop: '0.4rem' }}>
                  <div className="contact-channel">
                    <span className="contact-channel__label">Prefer email?</span>
                    <span className="contact-channel__value">
                      <a href={site.contact.email.href}>{site.contact.email.detail}</a>
                    </span>
                  </div>
                  <div className="contact-channel">
                    <span className="contact-channel__label">LinkedIn</span>
                    <span className="contact-channel__value">
                      <a href={site.contact.linkedin.href} target="_blank" rel="noreferrer">
                        {site.contact.linkedin.detail}
                      </a>
                    </span>
                  </div>
                  <div className="contact-channel">
                    <span className="contact-channel__label">Location</span>
                    <span className="contact-channel__value">{site.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <CalendlyEmbed height={720} />
                <p className="faint" style={{ fontSize: '0.78rem', marginTop: '0.7rem', lineHeight: 1.6 }}>
                  Calendar provided by Calendly. Select a time that works for you — you'll receive a
                  confirmation email with a Google Meet link immediately after booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
