/**
 * N8nDiagram renders an n8n-style workflow diagram on a dark canvas.
 *
 * It uses the same WorkflowStep shape used by ArchitectureExplorer so projects
 * can show both an n8n-like visual and the interactive detail panel.
 */
import type { WorkflowStep } from '../data/projects'

const TONE_STYLES: Record<string, { glow: string; labelColor: string; badge: string; icon: string }> = {
  trigger:    { glow: 'rgba(255,115,73,0.35)', labelColor: '#ff7349', badge: '#ff7349', icon: '⚡' },
  decision:   { glow: 'rgba(232,192,106,0.3)', labelColor: '#e8c06a', badge: '#e8c06a', icon: '◆' },
  escalation: { glow: 'rgba(232,138,106,0.3)', labelColor: '#e88a6a', badge: '#e88a6a', icon: '!' },
  output:     { glow: 'rgba(196,240,61,0.3)', labelColor: 'var(--accent)', badge: 'var(--accent)', icon: '→' },
  record:     { glow: 'rgba(160,170,180,0.18)', labelColor: 'var(--text-muted)', badge: '#8d9499', icon: '▤' },
  default:    { glow: 'rgba(180,190,200,0.15)', labelColor: 'var(--text-muted)', badge: '#6b7378', icon: '●' },
}

export function N8nDiagram({ steps, caption }: { steps: WorkflowStep[]; caption?: string }) {
  return (
    <div className="n8n-diagram">
      <div className="n8n-canvas" role="img" aria-label={caption ?? 'n8n workflow diagram'}>
        <svg className="n8n-canvas__wires" aria-hidden="true" preserveAspectRatio="none">
          {/* connector lines are drawn by CSS grid between nodes; wires sit behind. */}
        </svg>
        <ol className="n8n-flow">
          {steps.map((s, i) => {
            const tone = TONE_STYLES[s.tone ?? 'default']
            return (
              <li key={s.id} className="n8n-node" style={{ ['--node-accent' as string]: tone.badge, ['--node-glow' as string]: tone.glow } as React.CSSProperties}>
                <span className="n8n-node__icon" aria-hidden="true">{tone.icon}</span>
                <span className="n8n-node__body">
                  <span className="n8n-node__label" style={{ color: tone.labelColor }}>{s.label}</span>
                  <span className="n8n-node__title">{s.title}</span>
                </span>
                {i < steps.length - 1 ? <span className="n8n-wire" aria-hidden="true" /> : null}
              </li>
            )
          })}
        </ol>
      </div>
      {caption ? (
        <p className="faint" style={{ fontSize: '0.76rem', marginTop: '0.9rem', maxWidth: '72ch' }}>
          {caption}
        </p>
      ) : null}
    </div>
  )
}
