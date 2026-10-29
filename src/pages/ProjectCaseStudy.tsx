import { Link, useParams } from 'react-router-dom'
import {
  CASE_STUDY_LABELS,
  CASE_STUDY_STATUS_LABEL,
  getProject,
} from '../data/projects'
import type { CaseStudySection, Project } from '../data/projects'
import { StatusBadge } from '../components/StatusBadge'
import { ArrowRight } from '../components/Icons'

function Note({ section }: { section: CaseStudySection }) {
  if (!section.note) return null
  const tone =
    section.note.tone === 'warn' ? 'notice notice--warn' : section.note.tone === 'grey' ? 'notice notice--grey' : 'notice'
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

function LoomVideo({ project }: { project: Project }) {
  if (!project.loomUrl) return null

  const shareId = project.loomUrl.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/)?.[1]

  return (
    <div style={{ marginTop: '1.6rem' }}>
      <h3 style={{ fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
        Video walkthrough
      </h3>
      {shareId ? (
        <div style={{ overflow: 'hidden', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginTop: '1rem', aspectRatio: '16 / 9', background: 'var(--bg-raised)' }}>
          <iframe
            src={`https://www.loom.com/embed/${shareId}`}
            title={`${project.name} Loom walkthrough`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          />
        </div>
      ) : (
        <a className="link-arrow" href={project.loomUrl} target="_blank" rel="noreferrer">
          Open the Loom walkthrough
        </a>
      )}
    </div>
  )
}

function Screenshots({ project }: { project: Project }) {
  if (project.screenshots.length === 0) return null
  return (
    <div style={{ marginTop: '1.6rem' }}>
      <h3 style={{ fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
        Recorded evidence
      </h3>
      <div className="grid-2" style={{ gap: '1.3rem', marginTop: '1rem' }}>
        {project.screenshots.map((shot) => (
          <figure key={shot.id} style={{ margin: 0 }}>
            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-raised)' }}>
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
              <div className="muted" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>{shot.caption}</div>
              {shot.note ? <div className="muted" style={{ fontSize: '0.8rem', marginTop: '0.55rem' }}>{shot.note}</div> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

function Section({ section, project, index }: { section: CaseStudySection; project: Project; index: number }) {
  const isEvidence = section.id === 'evidence'
  const bullets = section.bullets ?? []

  return (
    <section className="cs-section" id={section.id} aria-labelledby={`${section.id}-title`}>
      <div className="cs-section__head">
        <div className="cluster" style={{ gap: '0.7rem' }}>
          <span className="cs-section__num">
            {String(index + 1).padStart(2, '0')} / {String(project.sections.length).padStart(2, '0')}
          </span>
          {!['order-confirmation-risk-check', 'lead-qualification'].includes(project.slug) ? (
            <span className="badge badge--illustrative">{CASE_STUDY_STATUS_LABEL[section.status]}</span>
          ) : null}
        </div>
        <h2 id={`${section.id}-title`} style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>
          {section.label}
        </h2>
      </div>

      {section.paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}

      {bullets.length > 0 ? (
        <ul className="bullets" style={{ marginTop: section.paragraphs.length ? '1rem' : 0 }}>
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      ) : null}

      {!isEvidence && <Table section={section} />}
      {!isEvidence && <Note section={section} />}

      {isEvidence ? <LoomVideo project={project} /> : null}
      {isEvidence ? <Screenshots project={project} /> : null}
    </section>
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
            <ArrowRight width={14} height={14} />
            Back to all projects
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
            </div>

            <h1 className="cs-hero__title">{project.name}</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>{project.overview}</p>

            <div className="cs-hero__meta">
              <span>{project.timeline}</span>
              <span>Tools: {project.tools.join(' · ')}</span>
            </div>

            {project.statusDetail ? (
              <div className="notice notice--warn" style={{ marginTop: '0.4rem' }}>
                <strong>Read the status labels.</strong> {project.statusDetail}
              </div>
            ) : null}
          </div>

          <nav className="cs-nav" aria-label="Case study sections">
            {project.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {CASE_STUDY_LABELS[section.id] ?? section.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          <div className="cs-body">
            <aside className="cs-toc" aria-label="Case study contents">
              <p className="cs-toc__title">Contents</p>
              <ol>
                {project.sections.map((section, i) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span className="mono faint" style={{ marginRight: '0.4rem' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {CASE_STUDY_LABELS[section.id] ?? section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <div>
              {project.sections.map((section, i) => (
                <Section key={section.id} section={section} project={project} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
