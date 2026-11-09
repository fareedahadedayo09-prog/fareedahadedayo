import { toolStack } from '../data/tools'

/**
 * Tool stack organised by practical purpose. Each tool says what it is
 * used for; hands-on tools are distinguished from familiar/evaluated
 * tools through a small badge.
 */
export function ToolsSection() {
  return (
    <div className="stack" style={{ gap: 0 }}>
      {toolStack.map((category) => (
        <div className="tool-group" key={category.title}>
          <div className="tool-group__head">
            <h3>{category.title}</h3>
            <p className="muted" style={{ fontSize: '0.88rem', maxWidth: '70ch' }}>{category.purpose}</p>
          </div>

          <div className="stack" style={{ gap: 0 }}>
            {category.tools.map((tool) => (
              <div className="tool-card" key={tool.name}>
                <div>
                  <span className="tool-card__name">{tool.name}</span>
                  <span className="tool-card__meta">
                    {tool.experience === 'hands-on' ? 'Hands-on · used in builds on this site' : 'Familiar · evaluated and experimented with'}
                  </span>
                </div>
                <p className="tool-card__desc">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
