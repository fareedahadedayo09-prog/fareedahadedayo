import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { PROJECT_CATEGORY_LABELS } from '../data/projects'
import { ArrowRight } from './Icons'
import { StatusBadge } from './StatusBadge'

/**
 * Project card for the project library.
 * Shows the business problem up front (in plain English) and a one-line
 * description of what the system does, rather than dense paragraphs.
 */
export function ProjectCard({ project }: { project: Project }) {
  const cover = project.screenshots[0]?.image

  return (
    <article className="project-card">
      <Link to={`/projects/${project.slug}`} className="project-card__media" aria-label={`${project.name} case study`}>
        {cover ? (
          <img
            src={cover}
            alt={project.screenshots[0]?.caption ?? project.name}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <span
            className="mono"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              padding: '1.4rem',
              textAlign: 'center',
              color: 'var(--text-faint)',
              letterSpacing: '0.08em',
              fontSize: '0.72rem',
              lineHeight: 1.7,
            }}
          >
            {project.tools.join(' · ')}
          </span>
        )}
      </Link>

      <div className="project-card__body">
        <div className="cluster" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
          <StatusBadge tone={project.status} label={project.statusLabel} />
          {project.categories.slice(0, 2).map((cat) => (
            <span key={cat} className="tag">
              {PROJECT_CATEGORY_LABELS[cat]}
            </span>
          ))}
        </div>

        <h3 className="project-card__title">
          <Link to={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>

        <div className="stack-sm" style={{ gap: '0.35rem' }}>
          <p className="project-card__desc" style={{ margin: 0 }}>
            <span className="faint" style={{ fontSize: '0.74rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.2rem' }}>
              Problem
            </span>
            {project.businessProblem}
          </p>
          <p className="project-card__desc" style={{ margin: 0 }}>
            <span className="faint" style={{ fontSize: '0.74rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.2rem' }}>
              What it does
            </span>
            {project.systemDoes}
          </p>
        </div>

        <div className="project-card__tags">
          {project.tools.map((tool) => (
            <span key={tool} className="tag">
              {tool}
            </span>
          ))}
        </div>

        <div className="project-card__foot">
          <span
            className="faint mono"
            style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            {project.timeline}
          </span>
          <Link to={`/projects/${project.slug}`} className="link-arrow">
            View case study
            <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  )
}
