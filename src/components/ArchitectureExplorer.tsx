import { useState } from 'react'
import type { WorkflowStep } from '../data/projects'

const TONE_COLORS: Record<string, { accent: string; label: string }> = {
  trigger: { accent: 'var(--accent)', label: 'Trigger' },
  default: { accent: 'var(--text-faint)', label: 'Step' },
  decision: { accent: 'var(--status-progress)', label: 'Decision' },
  escalation: { accent: '#e88a6a', label: 'Human escalation' },
  output: { accent: 'var(--accent)', label: 'Output' },
  record: { accent: 'var(--text-muted)', label: 'Record' },
}

/**
 * Interactive architecture explorer.
 * Renders a row of connected workflow nodes. Clicking a node reveals
 * a detail panel to the right describing that step. Accessible via
 * keyboard (Enter / Space activates a node).
 */
export function ArchitectureExplorer({
  steps,
  caption,
}: {
  steps: WorkflowStep[]
  caption?: string
}) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? '')
  const active = steps.find((s) => s.id === activeId) ?? steps[0]

  return (
    <div className="arch-explorer">
      <div className="arch-explorer__flow" role="tablist" aria-label="Workflow steps">
        {steps.map((s, i) => {
          const tone = TONE_COLORS[s.tone ?? 'default']
          const isActive = s.id === activeId
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'stretch' }}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`arch-panel-${s.id}`}
                className={`arch-ex-node ${isActive ? 'is-active' : ''}`}
                style={{ ['--node-accent' as string]: tone.accent } as React.CSSProperties}
                onClick={() => setActiveId(s.id)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') {
                    e.preventDefault()
                    const next = steps[(i + 1) % steps.length]
                    setActiveId(next.id)
                  } else if (e.key === 'ArrowLeft') {
                    e.preventDefault()
                    const prev = steps[(i - 1 + steps.length) % steps.length]
                    setActiveId(prev.id)
                  }
                }}
              >
                <span className="arch-ex-node__step">{s.label}</span>
                <span className="arch-ex-node__title">{s.title}</span>
              </button>
              {i < steps.length - 1 ? (
                <span className="arch-arrow" aria-hidden="true">
                  <svg viewBox="0 0 22 12" fill="none">
                    <path d="M0 6 L18 6 M13 1 L19 6 L13 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              ) : null}
            </div>
          )
        })}
      </div>

      <div
        className="arch-ex-panel"
        id={`arch-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`arch-tab-${active.id}`}
      >
        <div className="cluster" style={{ gap: '0.55rem', marginBottom: '0.55rem' }}>
          <span
            className="arch-ex-panel__pill"
            style={{ ['--pill-accent' as string]: TONE_COLORS[active.tone ?? 'default'].accent } as React.CSSProperties}
          >
            {TONE_COLORS[active.tone ?? 'default'].label}
          </span>
          <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-faint)', letterSpacing: '0.06em' }}>
            {active.label}
          </span>
        </div>
        <h3 className="arch-ex-panel__title">{active.title}</h3>
        <p className="arch-ex-panel__detail">{active.detail}</p>
      </div>

      {caption ? (
        <p className="faint" style={{ fontSize: '0.78rem', marginTop: '0.9rem' }}>{caption}</p>
      ) : null}
    </div>
  )
}
