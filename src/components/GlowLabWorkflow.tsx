import { GLOWLAB_WORKFLOW } from '../data/glowlab'

const KIND_LABEL: Record<string, string> = {
  event: 'Event',
  check: 'Decision',
  record: 'Record',
  message: 'Outbound',
  stop: 'Exit check',
}

/**
 * Vertical workflow for the abandoned-cart prototype: checkout event through
 * consent checking, operational tracking and the Klaviyo handoff. Rendered as
 * an ordered list of steps rather than a decorative arrow diagram so the
 * sequence stays readable on a phone and legible to a screen reader.
 */
export function GlowLabWorkflow() {
  return (
    <ol className="gl-flow">
      {GLOWLAB_WORKFLOW.map((node) => (
        <li key={node.id} className={`gl-flow__step gl-flow__step--${node.kind}`}>
          <div className="gl-flow__marker" aria-hidden="true">
            <span className="gl-flow__num mono">{node.step}</span>
          </div>
          <div className="gl-flow__body">
            <div className="gl-flow__head">
              <h4 className="gl-flow__title">{node.title}</h4>
              <span className={`gl-flow__kind gl-flow__kind--${node.kind}`}>{KIND_LABEL[node.kind]}</span>
            </div>
            <p className="gl-flow__detail">{node.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
