import { toolStack } from '../data/tools'

/**
 * The tool stack: four categories, each with a short purpose line and the
 * tools actually used in the projects. No proficiency levels and no
 * decorative repetition.
 */
export function ToolsSection() {
  return (
    <div className="stack" style={{ gap: 0 }}>
      {toolStack.map((category) => (
        <div className="tool-group" key={category.title}>
          <div className="tool-group__head">
            <h3>{category.title}</h3>
            <p className="muted" style={{ fontSize: '0.88rem', maxWidth: '62ch' }}>{category.purpose}</p>
          </div>

          <div className="stack" style={{ gap: 0 }}>
            {category.tools.map((tool) => (
              <div className="tool-card" key={tool.name}>
                <div>
                  <span className="tool-card__name">{tool.name}</span>
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
