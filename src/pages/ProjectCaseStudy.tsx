import { Link, useParams } from 'react-router-dom'
import {
  CASE_STUDY_LABELS,
  CASE_STUDY_STATUS_LABEL,
  getProject,
} from '../data/projects'
import type { CaseStudySection, Project } from '../data/projects'
import { StatusBadge } from '../components/StatusBadge'
import { ArrowRight } from '../components/Icons'
import { Tabs } from '../components/Tabs'
import { Simulator } from '../components/Simulator'
import { WorkflowDiagram } from '../components/WorkflowDiagram'

function Note({ section }: { section: CaseStudySection }) {
  if (!section.note) return null
  const tone =
    section.note.tone === 'warn'
      ? 'notice notice--warn'
      : section.note.tone === 'grey'
        ? 'notice notice--grey'
        : 'notice'
  return (
    <div className={tone} style={{ marginTop: '1.1rem' }}>
      {section.note.text}
    </div>
  )
}

function Table({ section }: { section: CaseStudySection }) {
  if (!section.table) return null
  const { keys, values } = section.table
  return (
    <div className="table-wrap" style={{ marginTop: '1.1rem' }}>
      <table className="data">
        <thead>
          <tr>
            <th scope="col">Step</th>
            <th scope="col">Detail</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key, i) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{values[i] ?? 'Not specified'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Screenshots({ project }: { project: Project }) {
  if (project.screenshots.length === 0) return null
  return (
    <div style={{ marginTop: '1.6rem' }}>
      <h3
        style={{
          fontSize: '0.82rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-faint)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
        }}
      >
        Recorded evidence
      </h3>
      <div className="grid-2" style={{ gap: '1.3rem', marginTop: '1rem' }}>
        {project.screenshots.map((shot) => (
          <figure key={shot.id} style={{ margin: 0 }}>
            <div
              style={{
                overflow: 'hidden',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                background: 'var(--bg-raised)',
              }}
            >
              <img
                src={shot.image}
                alt={shot.caption}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <figcaption style={{ marginTop: '0.7rem' }}>
              <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>{shot.title}</div>
              <div className="muted" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>
                {shot.caption}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/** Technical metadata block for Layer B. */
function TechBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="tech-block">
      <div className="tech-block__title">{title}</div>
      {children}
    </div>
  )
}

/** Architecture diagram for each project. */
function ProjectDiagram({ project }: { project: Project }) {
  // Diagrams are project-specific; fall back to a generic flow.
  if (project.slug === 'order-confirmation-risk-check') {
    return (
      <WorkflowDiagram
        caption="End-to-end architecture. Tally fires a webhook on submission; n8n handles normalisation, arithmetic, rule evaluation and branching; Gmail delivers the customer message; Airtable is the system of record."
        nodes={[
          { label: 'Trigger', title: 'Tally form', detail: 'Webhook on submit' },
          { label: 'Step', title: 'Normalise', detail: 'Coerce & validate' },
          { label: 'Step', title: 'Price order', detail: 'Sum line items + fee' },
          { label: 'Decision', title: 'Risk rule', detail: 'Pass / fail', tone: 'decision' },
          { label: 'Branch A', title: 'Confirmation email', detail: 'Gmail' },
          { label: 'Branch B', title: 'Cancellation email', detail: 'Gmail' },
          { label: 'Record', title: 'Airtable', detail: 'Status + timestamp' },
        ]}
      />
    )
  }
  if (project.slug === 'returns-refunds-handler') {
    return (
      <WorkflowDiagram
        caption="Staged pipeline: intake, validation, policy evaluation and escalation. Conflict detection is designed but not yet built."
        nodes={[
          { label: 'Intake', title: 'Tally / message', detail: 'Return request' },
          { label: 'Step', title: 'Validate', detail: 'Required fields' },
          { label: 'Decision', title: 'Policy rules', detail: 'Ordered match', tone: 'decision' },
          { label: 'Step', title: 'Conflict detection', detail: 'Designed, not built', tone: 'decision' },
          { label: 'Escalation', title: 'Human review', detail: 'Airtable queue', tone: 'escalation' },
          { label: 'Output', title: 'Decision record', detail: 'Rule applied + outcome' },
        ]}
      />
    )
  }
  if (project.slug === 'lead-qualification') {
    return (
      <WorkflowDiagram
        caption="Multi-channel intake funnels to a single normalisation step, then a deterministic classification rule writes a record and next action."
        nodes={[
          { label: 'Intake A', title: 'Tally form', detail: 'Webhook' },
          { label: 'Intake B', title: 'Direct message', detail: 'Structured extraction' },
          { label: 'Step', title: 'Normalise', detail: 'Name, contact, source, interest' },
          { label: 'Decision', title: 'Classify', detail: 'Rule-ordered buckets', tone: 'decision' },
          { label: 'Escalation', title: 'Hold for review', detail: 'Unclassified / incomplete', tone: 'escalation' },
          { label: 'Record', title: 'Airtable', detail: 'Owner + next action' },
        ]}
      />
    )
  }
  if (project.slug === 'glowlab-lifecycle') {
    return (
      <WorkflowDiagram
        caption="Prototype lifecycle engine. Events drive segmentation; wait nodes handle delays; exit conditions suppress sends; ambiguous cases queue for review. No live store is connected."
        nodes={[
          { label: 'Event', title: 'Cart / order event', detail: 'Simulated webhook' },
          { label: 'Step', title: 'Identify customer', detail: 'Merge into timeline' },
          { label: 'Decision', title: 'Segmentation', detail: 'Deterministic rules', tone: 'decision' },
          { label: 'Step', title: 'Schedule message', detail: 'Configured delay' },
          { label: 'Decision', title: 'Exit checks', detail: 'Opt-out, recent purchase', tone: 'decision' },
          { label: 'Escalation', title: 'Review queue', detail: 'VIP / conflicts', tone: 'escalation' },
          { label: 'Queue', title: 'Airtable message queue', detail: 'Staged (prototype)' },
        ]}
      />
    )
  }
  return (
    <WorkflowDiagram
      caption="High-level workflow view."
      nodes={[
        { label: 'Trigger', title: 'Intake' },
        { label: 'Step', title: 'Process' },
        { label: 'Decision', title: 'Decide', tone: 'decision' },
        { label: 'Output', title: 'Outcome' },
      ]}
    />
  )
}

/** Build Layer A (Business overview) content. */
function LayerABusiness({ project }: { project: Project }) {
  const problemSection = project.sections.find((s) => s.id === 'problem')
  const workflowSection = project.sections.find((s) => s.id === 'workflow')
  const safeguardsSection = project.sections.find((s) => s.id === 'safeguards')
  const evidenceSection = project.sections.find((s) => s.id === 'evidence')

  return (
    <div>
      <div className="layer-label layer-label--biz">Layer A · Business overview</div>

      {/* The operational problem */}
      <section className="cs-section" id="problem" style={{ borderTop: 0, paddingTop: 0 }}>
        <div className="cs-section__head">
          <span className="cs-section__num">The operational problem</span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>
            Why this system exists
          </h2>
        </div>
        <p className="lede">{project.businessProblem}</p>
        {problemSection?.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {problemSection?.bullets && problemSection.bullets.length > 0 ? (
          <ul className="bullets" style={{ marginTop: '1rem' }}>
            {problemSection.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        ) : null}
      </section>

      {/* What the system does + process change */}
      <section className="cs-section" id="what-it-does">
        <div className="cs-section__head">
          <span className="cs-section__num">What the system does</span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>
            How the process changes
          </h2>
        </div>
        <p>{project.systemDoes}</p>
        {workflowSection?.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <ProjectDiagram project={project} />
        <Table section={workflowSection ?? { id: '', label: '', status: 'partial', paragraphs: [] }} />
      </section>

      {/* Human control */}
      <section className="cs-section" id="human-control">
        <div className="cs-section__head">
          <span className="cs-section__num">What stays under human control</span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>
            Where a person still decides
          </h2>
        </div>
        <p>
          The system handles the routine, repetitive cases according to documented rules. The following
          cases are deliberately routed to a person rather than decided automatically:
        </p>
        <ul className="bullets" style={{ marginTop: '1rem' }}>
          {(safeguardsSection?.bullets ?? [])
            .filter((b) => /flag|review|escalat|person|human/i.test(b))
            .slice(0, 4)
            .map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          <li>Any case where the system does not have reliable information to decide.</li>
        </ul>
        <Note section={safeguardsSection ?? { id: '', label: '', status: 'partial', paragraphs: [] }} />
      </section>

      {/* What was demonstrated */}
      <section className="cs-section" id="demonstrated">
        <div className="cs-section__head">
          <span className="cs-section__num">What was demonstrated during testing</span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>
            What has been shown to work
          </h2>
        </div>
        {evidenceSection?.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {evidenceSection?.bullets && evidenceSection.bullets.length > 0 ? (
          <ul className="bullets" style={{ marginTop: '1rem' }}>
            {evidenceSection.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        ) : null}
        <Note section={evidenceSection ?? { id: '', label: '', status: 'partial', paragraphs: [] }} />
        <Screenshots project={project} />
      </section>
    </div>
  )
}

/** Build Layer B (Technical implementation) content. */
function LayerBTechnical({ project }: { project: Project }) {
  const trigger = project.sections.find((s) => s.id === 'workflow')
  const decisions = project.sections.find((s) => s.id === 'decisions')
  const safeguards = project.sections.find((s) => s.id === 'safeguards')
  const evidence = project.sections.find((s) => s.id === 'evidence')
  const limitations = project.sections.find((s) => s.id === 'limitations')

  // Compose a pseudo-JSON payload example based on the project type.
  const examplePayload =
    project.slug === 'order-confirmation-risk-check'
      ? `{
  "customer_name": "Amaka Okafor",
  "address": "14 Allen Avenue, Ikeja, Lagos",
  "phone": "+234 803 123 4567",
  "delivery_fee": 2500,
  "line_items": [
    { "product": "Vitamin C Serum", "quantity": 1, "unit_price": 14500 },
    { "product": "Cleanser",       "quantity": 2, "unit_price":  8500 }
  ],
  "submitted_at": "2026-11-09T10:24:00Z",
  "source": "tally"
}`
      : project.slug === 'lead-qualification'
        ? `{
  "name": "Prospect name",
  "contact": "email or phone",
  "product_interest": "identified service / product",
  "source": "tally | dm",
  "message": "free text",
  "received_at": "ISO timestamp"
}`
        : project.slug === 'returns-refunds-handler'
          ? `{
  "order_number": "ORD-12345",
  "customer": "name + contact",
  "reason": "reason code or text",
  "items_requested": ["..."],
  "submitted_at": "ISO timestamp"
}`
          : `{
  "event_type": "cart_abandoned | order_placed | delivered",
  "customer_id": "...",
  "event_timestamp": "ISO timestamp",
  "order_total": 0,
  "tags": ["vip", "repeat", "..."]
}`

  return (
    <div>
      <div className="layer-label">Layer B · Technical implementation</div>

      {/* Architecture */}
      <section className="cs-section" id="tech-architecture" style={{ borderTop: 0, paddingTop: 0 }}>
        <div className="cs-section__head">
          <span className="cs-section__num">01 / 06</span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>Architecture</h2>
        </div>
        <ProjectDiagram project={project} />
        <div className="grid-2" style={{ marginTop: '1.2rem' }}>
          <TechBlock title="Stack">
            <div className="chip-row">
              {project.tools.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </TechBlock>
          <TechBlock title="System of record">
            <p className="muted" style={{ fontSize: '0.84rem', margin: 0, lineHeight: 1.6 }}>
              Airtable holds the structured record for every run (status, rule applied, timestamp,
              downstream message id where applicable). Status writes are atomic per branch so a run cannot
              half-succeed without being marked.
            </p>
          </TechBlock>
        </div>
      </section>

      {/* Trigger & input */}
      <section className="cs-section" id="tech-trigger">
        <div className="cs-section__head">
          <span className="cs-section__num">02 / 06</span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>Trigger and input</h2>
        </div>
        <p>
          Every workflow fires from a defined trigger. The first node normalises the payload into a fixed
          shape; downstream nodes never read raw webhook fields directly.
        </p>
        {trigger?.table ? <Table section={trigger} /> : null}
        <TechBlock title="Example inbound payload (illustrative)">
          <pre className="code-block">{examplePayload}</pre>
        </TechBlock>
      </section>

      {/* Data transformation / validation / decisions */}
      <section className="cs-section" id="tech-decisions">
        <div className="cs-section__head">
          <span className="cs-section__num">03 / 06</span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>
            Data transformation and decision rules
          </h2>
        </div>
        {decisions?.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {decisions?.bullets && decisions.bullets.length > 0 ? (
          <ul className="bullets" style={{ marginTop: '1rem' }}>
            {decisions.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        ) : null}
        <Note section={decisions ?? { id: '', label: '', status: 'partial', paragraphs: [] }} />

        {/* Validation cards */}
        <div className="grid-2" style={{ marginTop: '1.2rem' }}>
          {(safeguards?.bullets ?? []).slice(0, 4).map((b, i) => (
            <div className="card" key={i} style={{ padding: '1rem 1.15rem' }}>
              <span className="mono" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                Check {String(i + 1).padStart(2, '0')}
              </span>
              <p className="muted" style={{ fontSize: '0.84rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
                {b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations & downstream */}
      <section className="cs-section" id="tech-integrations">
        <div className="cs-section__head">
          <span className="cs-section__num">04 / 06</span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>
            Integrations and downstream actions
          </h2>
        </div>
        <div className="tech-block">
          <div className="tech-block__title">Downstream actions per branch</div>
          <ul className="bullets">
            {(trigger?.table?.values ?? []).slice(0, 6).map((v, i) => (
              <li key={i}>{v}</li>
            ))}
            <li>Every branch writes to the record before exiting — there is no "happy path only" write.</li>
          </ul>
        </div>
        <Note section={safeguards ?? { id: '', label: '', status: 'partial', paragraphs: [] }} />
      </section>

      {/* Error handling and idempotency */}
      <section className="cs-section" id="tech-errors">
        <div className="cs-section__head">
          <span className="cs-section__num">05 / 06</span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>
            Error handling, duplicate prevention and escalation
          </h2>
        </div>
        {safeguards?.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <ul className="bullets" style={{ marginTop: '1rem' }}>
          {(safeguards?.bullets ?? []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="notice notice--warn" style={{ marginTop: '1.1rem' }}>
          <strong>Idempotency and duplicate prevention.</strong> See the limitations section below —
          duplicate detection is not implemented in every project. Where it is missing, two identical
          submissions can produce two workflow runs, and this is called out as a known gap rather than
          papered over.
        </div>
      </section>

      {/* Test cases and evidence */}
      <section className="cs-section" id="tech-evidence">
        <div className="cs-section__head">
          <span className="cs-section__num">06 / 06</span>
          <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>
            Test cases, evidence and limitations
          </h2>
        </div>
        {evidence?.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {evidence?.bullets && evidence.bullets.length > 0 ? (
          <div className="table-wrap" style={{ marginTop: '1.1rem' }}>
            <table className="data">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {evidence.bullets.map((b, i) => {
                  const state = /not started/i.test(b)
                    ? 'Not started'
                    : /not yet verified/i.test(b)
                      ? 'Implemented · not yet verified'
                      : 'Implemented and verified'
                  return (
                    <tr key={i}>
                      <td>{b}</td>
                      <td>
                        <span
                          className={`badge ${
                            state === 'Implemented and verified'
                              ? 'badge--done'
                              : state === 'Implemented · not yet verified'
                                ? 'badge--progress'
                                : 'badge--planned'
                          }`}
                        >
                          {state}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : null}
        <Screenshots project={project} />

        {limitations && limitations.bullets && limitations.bullets.length > 0 ? (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.8rem' }}>Known limitations and future improvements</h3>
            <ul className="bullets">
              {limitations.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  )
}

/** Render all sections in legacy flat order for backwards compatibility with TOC. */
function FlatSections({ project }: { project: Project }) {
  return (
    <div>
      {project.sections.map((section, i) => {
        const bullets = section.bullets ?? []
        const isEvidence = section.id === 'evidence'
        return (
          <section className="cs-section" id={`flat-${section.id}`} key={section.id}>
            <div className="cs-section__head">
              <div className="cluster" style={{ gap: '0.7rem' }}>
                <span className="cs-section__num">
                  {String(i + 1).padStart(2, '0')} / {String(project.sections.length).padStart(2, '0')}
                </span>
                <span className="badge badge--illustrative">{CASE_STUDY_STATUS_LABEL[section.status]}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>{section.label}</h2>
            </div>
            {section.paragraphs.map((paragraph, pi) => (
              <p key={pi}>{paragraph}</p>
            ))}
            {bullets.length > 0 ? (
              <ul className="bullets" style={{ marginTop: section.paragraphs.length ? '1rem' : 0 }}>
                {bullets.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            ) : null}
            {!isEvidence && <Table section={section} />}
            {!isEvidence && <Note section={section} />}
            {isEvidence ? <Screenshots project={project} /> : null}
          </section>
        )
      })}
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

  return (
    <article>
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/projects" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              All projects
            </Link>

            <div className="cluster" style={{ gap: '0.7rem', flexWrap: 'wrap' }}>
              <StatusBadge tone={project.status} label={project.statusLabel} />
              {project.categories.map((c) => (
                <span key={c} className="badge badge--illustrative">
                  {CASE_STUDY_LABELS[c] ?? c}
                </span>
              ))}
            </div>

            <h1 className="cs-hero__title">{project.name}</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>
              <strong style={{ color: 'var(--text)' }}>The problem:</strong> {project.businessProblem}
            </p>
            <p className="lede" style={{ marginTop: '0.2rem' }}>
              <strong style={{ color: 'var(--text)' }}>What it does:</strong> {project.systemDoes}
            </p>

            <div className="cs-hero__meta">
              <span>{project.timeline}</span>
              <span>Tools: {project.tools.join(' · ')}</span>
            </div>

            {project.statusDetail ? (
              <div className="notice notice--warn" style={{ marginTop: '0.4rem' }}>
                <strong>Status.</strong> {project.statusDetail}
              </div>
            ) : null}
          </div>

          {/* Interactive simulator for COD order confirmation project. */}
          {project.hasSimulator ? <Simulator /> : null}

          {/* Two-layer tab switch */}
          <div style={{ marginTop: '1.4rem' }}>
            <span className="eyebrow" style={{ marginBottom: '0.8rem', display: 'inline-flex' }}>
              Read this case study
            </span>
            <Tabs
              ariaLabel="Case study layers"
              initialId="business"
              tabs={[
                { id: 'business', label: 'For business visitors', content: <LayerABusiness project={project} /> },
                { id: 'technical', label: 'For technical visitors', content: <LayerBTechnical project={project} /> },
              ]}
            />
          </div>

          <nav className="cs-nav" aria-label="Case study sections" style={{ marginTop: '2rem' }}>
            <a href="#problem">Business overview</a>
            <a href="#tech-architecture">Technical implementation</a>
          </nav>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          <div className="cs-body">
            <aside className="cs-toc" aria-label="Case study contents">
              <p className="cs-toc__title">Contents</p>
              <ol>
                <li>
                  <a href="#problem">
                    <span className="mono faint" style={{ marginRight: '0.4rem' }}>A</span>
                    The operational problem
                  </a>
                </li>
                <li>
                  <a href="#what-it-does">
                    <span className="mono faint" style={{ marginRight: '0.4rem' }}>A</span>
                    How the process changes
                  </a>
                </li>
                <li>
                  <a href="#human-control">
                    <span className="mono faint" style={{ marginRight: '0.4rem' }}>A</span>
                    What stays with a person
                  </a>
                </li>
                <li>
                  <a href="#demonstrated">
                    <span className="mono faint" style={{ marginRight: '0.4rem' }}>A</span>
                    What was demonstrated
                  </a>
                </li>
                <li>
                  <a href="#tech-architecture">
                    <span className="mono faint" style={{ marginRight: '0.4rem' }}>B</span>
                    Architecture
                  </a>
                </li>
                <li>
                  <a href="#tech-trigger">
                    <span className="mono faint" style={{ marginRight: '0.4rem' }}>B</span>
                    Trigger and input
                  </a>
                </li>
                <li>
                  <a href="#tech-decisions">
                    <span className="mono faint" style={{ marginRight: '0.4rem' }}>B</span>
                    Data and decisions
                  </a>
                </li>
                <li>
                  <a href="#tech-integrations">
                    <span className="mono faint" style={{ marginRight: '0.4rem' }}>B</span>
                    Integrations and downstream actions
                  </a>
                </li>
                <li>
                  <a href="#tech-errors">
                    <span className="mono faint" style={{ marginRight: '0.4rem' }}>B</span>
                    Error handling and escalation
                  </a>
                </li>
                <li>
                  <a href="#tech-evidence">
                    <span className="mono faint" style={{ marginRight: '0.4rem' }}>B</span>
                    Test cases and limitations
                  </a>
                </li>
              </ol>

              <div className="notice notice--grey" style={{ marginTop: '1.3rem', fontSize: '0.78rem' }}>
                Layer A is written for a business reader. Layer B contains architecture, payloads, decision
                rules, validation and test evidence.
              </div>
            </aside>

            <div>
              <LayerABusiness project={project} />
              <LayerBTechnical project={project} />

              {/* Divider before the legacy flat section list */}
              <hr className="divider" style={{ margin: '2.4rem 0' }} />
              <div className="layer-label">Flat reference · all sections in order</div>
              <FlatSections project={project} />
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
