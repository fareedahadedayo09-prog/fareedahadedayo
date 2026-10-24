import type { Project } from '../data/projects'

const toneClass: Record<Project['status'], string> = {
  done: 'badge--done',
  progress: 'badge--progress',
  planned: 'badge--planned',
}

export function StatusBadge({
  tone,
  label,
  withDot = true,
}: {
  tone: Project['status']
  label: string
  withDot?: boolean
}) {
  return (
    <span className={`badge ${withDot ? 'badge--dot ' : ''}${toneClass[tone]}`}>
      {label}
    </span>
  )
}

export function ProjectStatus({ project }: { project: Project }) {
  return (
    <div className="cluster" style={{ gap: '0.5rem' }}>
      <StatusBadge tone={project.status} label={project.statusLabel} />
    </div>
  )
}
