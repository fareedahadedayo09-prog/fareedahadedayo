import type { Project } from '../data/projects'
import { statusTone } from '../data/projects'

const toneClass: Record<string, string> = {
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
  const cls = toneClass[tone] ?? 'badge'
  return (
    <span className={`badge ${withDot ? 'badge--dot ' : ''}${cls}`}>
      {label}
    </span>
  )
}

export function ProjectStatus({ project }: { project: Project }) {
  return (
    <div className="cluster" style={{ gap: '0.5rem' }}>
      <StatusBadge tone={project.status} label={project.statusLabel} />
      <StatusBadge tone="planned" label={project.statusDetail} withDot={false} />
    </div>
  )
}

export { statusTone }
