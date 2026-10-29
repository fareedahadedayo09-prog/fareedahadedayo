import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { ArrowRight } from './Icons'
import { StatusBadge } from './StatusBadge'

/**
 * Project card. The media area shows the first real screenshot when one
 * exists, otherwise a neutral panel carrying the tool stack. It never shows
 * a "coming soon" notice.
 */
export function ProjectCard({ project }: { project: Project }) {
  const cover = project.screenshots[0]?.image

  return (
    <article className="project-card">
      <Link to={`/projects/${project.slug}`} className="project-card__media" aria-label={`${project.name} case study`}>
        {cover ? (
          <img
            src={cover}
            alt={project.screenshots[0]?.alt ?? project.screenshots[0]?.caption ?? project.name}
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
        <div className="cluster" style={{ gap: '0.6rem', flexWrap: 'wrap' }}>
          <StatusBadge tone={project.status} label={project.statusLabel} />
        </div>

        <h3 className="project-card__title">
          <Link to={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>

        <p className="project-card__desc">{project.summary}</p>

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
            View Case Study
            <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  )
}
