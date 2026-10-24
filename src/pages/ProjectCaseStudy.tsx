import { Link, useParams } from 'react-router-dom'
import {
  CASE_STUDY_LABELS,
  CASE_STUDY_STATUS_LABEL,
  getProject,
} from '../data/projects'
import type { CaseStudySection, Project } from '../data/projects'
import { DemoEmbed } from '../components/DemoEmbed'
import { MediaPlaceholder } from '../components/MediaPlaceholder'
import { StatusBadge } from '../components/StatusBadge'
import { ArrowRight, DownloadIcon, ImageIcon, AlertIcon } from '../components/Icons'

function Note({ section }: { section: CaseStudySection }) {
  if (!section.note) return null
  const tone = section.note.tone === 'warn' ? 'notice--warn' : section.note.tone === 'grey' ? 'notice notice--grey' : 'notice'
  return (
    <div className={tone} style={{ marginTop: '1rem' }}>
      {section.note.text}
    </div>
  )
}

function Table({ section }: { section: CaseStudySection }) {
  if (!section.table) return null
  const { keys, values } = section.table
  return (
    <div className="table-wrap" style={{ marginTop: '1rem' }}>
      <table className="data">
        <thead>
          <tr>
            <th scope="col">Area</th>
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

function DemoSection({ project }: { project: Project }) {
  const hasVideo = project.demo.loomUrl.length > 0
  return (
    <>
      <DemoEmbed
        loomUrl={project.demo.loomUrl}
        title={`${project.name} walkthrough`}
        note={
          hasVideo
            ? 'The recording is embedded above.'
            : 'A Loom walkthrough is planned. It will cover the implemented paths and the validation failures before it is recorded.'
        }
      />

      <div className="cluster" style={{ gap: '0.6rem', marginTop: '1.2rem' }}>
        <span className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
          Test scenarios to be demonstrated
        </span>
        {project.demo.scenarios.length > 0 ? (
          <div className="scenario-list">
            {project.demo.scenarios.map((s) => (
              <span className="scenario" key={s}>{s}</span>
            ))}
          </div>
        ) : (
          <p className="faint" style={{ fontSize: '0.82rem' }}>
            None recorded yet. The list above will be filled in with the scenarios actually covered by the video.
          </p>
        )}
      </div>
    </>
  )
}

function VisualsSection({ project }: { project: Project }) {
  return (
    <div className="grid-2" style={{ gap: '1.2rem' }}>
      {project.screenshots.map((shot) => (
        <MediaPlaceholder
          key={shot.id}
          title={shot.title}
          note={shot.caption}
          image={shot.image}
          alt={shot.caption}
          ratio={shot.ratio ?? 'wide'}
        />
      ))}
    </div>
  )
}

function DocsSection({ project }: { project: Project }) {
  const links = project.links.filter((l) => l.href.length > 0)
  if (links.length === 0) {
    return (
      <div className="notice notice--grey">
        No documentation or code has been published for this project yet. Entries appear here once a
        document, repository or snippet exists to point at.
      </div>
    )
  }
  return (
    <div className="stack-sm">
      {links.map((link) => (
        <a key={link.label} className="btn btn--secondary btn--block" href={link.href} target="_blank" rel="noreferrer">
          <DownloadIcon width={15} height={15} />
          {link.label}
        </a>
      ))}
    </div>
  )
}

function Section({ section, project, index }: { section: CaseStudySection; project: Project; index: number }) {
  const isVisuals = section.id === 'visuals'
  const isDemo = section.id === 'demo'
  const isDocs = section.id === 'docs'

  return (
    <section className="cs-section" id={section.id} aria-labelledby={`${section.id}-title`}>
      <div className="cs-section__head">
        <div className="cluster" style={{ gap: '0.7rem' }}>
          <span className="cs-section__num">
            {String(index + 1).padStart(2, '0')} / {String(project.sections.length).padStart(2, '0')}
          </span>
          <span className="badge badge--illustrative">{CASE_STUDY_STATUS_LABEL[section.status]}</span>
        </div>
        <h2 id={`${section.id}-title`} style={{ fontSize: 'clamp(1.35rem, 1.05rem + 1.4vw, 1.85rem)' }}>
          {section.label}
        </h2>
      </div>

      {section.paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}

      {section.bullets && section.bullets.length > 0 ? (
        <ul className="bullets" style={{ marginTop: section.paragraphs.length ? '1rem' : 0 }}>
          {section.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      ) : null}

      {!isVisuals && !isDemo && <Table section={section} />}
      {!isVisuals && !isDemo && <Note section={section} />}

      {isDemo ? <DemoSection project={project} /> : null}
      {isVisuals ? (
        <>
          <VisualsSection project={project} />
          <div className="notice notice--grey" style={{ marginTop: '1.2rem' }}>
            <strong className="muted">Adding screenshots.</strong> Put image files in{' '}
            <span className="mono">/public/screenshots</span>, then set <span className="mono">image</span> on
            the matching entry in <span className="mono">screenshots</span> inside the project object in{' '}
            <span className="mono">src/data/projects.ts</span>. The caption is the <span className="mono">caption</span>{' '}
            field and becomes the image alternative text.
          </div>
        </>
      ) : null}
      {isDocs ? <DocsSection project={project} /> : null}
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
      {/* ── Header ──────────────────────────────────────────────────── */}
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
              <span>Status: {project.statusLabel}</span>
            </div>

            <div className="notice notice--warn" style={{ marginTop: '0.4rem' }}>
              <strong>Read the status labels.</strong> {project.statusDetail}
            </div>
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

      {/* ── Body ───────────────────────────────────────────────────── */}
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

              <hr className="divider" style={{ marginTop: '2rem' }} />

              <div className="cluster cluster--between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <p className="faint" style={{ fontSize: '0.8rem' }}>
                  <ImageIcon width={14} height={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '0.4rem' }} />
                  Case study template · {project.sections.length} sections
                </p>
                <AlertIcon width={14} height={14} style={{ color: 'var(--text-faint)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
