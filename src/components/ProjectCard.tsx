import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { ArrowRight, ImageIcon } from './Icons'
import { StatusBadge } from './StatusBadge'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link
        to={`/projects/${project.slug}`}
        className="project-card__media"
        aria-label={`${project.name} case study`}
        style={{ display: 'block' }}
      >
        <span
          className="mono"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            gap: '0.6rem',
            color: 'var(--text-faint)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontSize: '0.68rem',
          }}
        >
          <ImageIcon width={26} height={26} style={{ opacity: 0.75 }} />
          Visual coming soon
        </span>
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
          <span className="faint mono" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
