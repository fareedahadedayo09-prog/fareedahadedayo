import { toolStack } from '../data/tools'

/** Compact, categorized list of the tools and workflow skills Fareedah can use. */
export function ToolsSection() {
  return (
    <div className="stack" style={{ gap: 0 }}>
      {toolStack.map((category) => (
        <section className="tool-group" key={category.title}>
          <div className="tool-group__head">
            <h3>{category.title}</h3>
            <p className="muted" style={{ fontSize: '0.88rem', maxWidth: '62ch' }}>{category.purpose}</p>
          </div>

          <ul className="tool-skill-list" aria-label={`${category.title} skills`}>
            {category.tools.map((tool) => (
              <li className="tool-skill" key={tool.name}>{tool.name}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
