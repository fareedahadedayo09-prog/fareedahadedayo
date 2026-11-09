/**
 * A small inline workflow diagram. Renders a horizontal flow of labelled
 * nodes with arrows between them. Used in case studies to show the
 * high-level architecture without pulling in a diagram library.
 */

export type DiagramNode = {
  label: string
  title: string
  detail?: string
  tone?: 'default' | 'decision' | 'escalation'
}

function Arrow() {
  return (
    <span className="arch-arrow" aria-hidden="true">
      <svg viewBox="0 0 22 12" fill="none">
        <path d="M0 6 L18 6 M13 1 L19 6 L13 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export function WorkflowDiagram({ nodes, caption }: { nodes: DiagramNode[]; caption?: string }) {
  return (
    <div className="arch-diagram">
      <div className="arch-flow" role="img" aria-label={caption ?? 'Workflow architecture diagram'}>
        {nodes.map((node, i) => {
          const toneClass =
            node.tone === 'decision'
              ? 'arch-node--decision'
              : node.tone === 'escalation'
                ? 'arch-node--escalation'
                : ''
          return (
            <div key={`${node.title}-${i}`} style={{ display: 'flex', alignItems: 'stretch' }}>
              <div className={`arch-node ${toneClass}`}>
                <span className="arch-node__label">{node.label}</span>
                <span className="arch-node__title">{node.title}</span>
                {node.detail ? <span className="arch-node__detail">{node.detail}</span> : null}
              </div>
              {i < nodes.length - 1 ? <Arrow /> : null}
            </div>
          )
        })}
      </div>
      {caption ? (
        <p className="faint" style={{ fontSize: '0.76rem', marginTop: '0.9rem', maxWidth: '72ch' }}>
          {caption}
        </p>
      ) : null}
    </div>
  )
}
