import { GLOWLAB_ARCHITECTURE, BUILD_STATE_LABEL, type ArchitectureLayer } from '../data/glowlab'

/**
 * Architecture map for the GlowLab system: four horizontal layers, one card
 * per service, and the flows between them listed underneath. It reflects the
 * actual stack (React, Make.com, Supabase, Airtable, Klaviyo, LLM, APIs and
 * webhooks) and avoids inventing services that are not part of the build.
 */
export function GlowLabArchitecture() {
  return (
    <div className="gl-arch">
      <div className="gl-arch__layers">
        {GLOWLAB_ARCHITECTURE.layers.map((layer) => (
          <Layer key={layer.id} layer={layer} />
        ))}
      </div>

      <div className="gl-arch__flows">
        <h4 className="gl-arch__flows-title">What moves between them</h4>
        <ul>
          {GLOWLAB_ARCHITECTURE.flows.map((flow) => (
            <li key={`${flow.from}-${flow.to}`}>
              <span className="gl-arch__flow-from">{flow.from}</span>
              <span className="gl-arch__flow-arrow" aria-hidden="true">
                →
              </span>
              <span className="gl-arch__flow-to">{flow.to}</span>
              <span className="gl-arch__flow-label">{flow.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="gl-arch__note">{GLOWLAB_ARCHITECTURE.note}</p>
    </div>
  )
}

function Layer({ layer }: { layer: ArchitectureLayer }) {
  return (
    <div className="gl-arch__layer">
      <div className="gl-arch__layer-head">
        <span className="gl-arch__layer-title">{layer.title}</span>
        <span className="gl-arch__layer-caption">{layer.caption}</span>
      </div>

      <div className={`gl-arch__nodes gl-arch__nodes--${layer.nodes.length}`}>
        {layer.nodes.map((node) => (
          <article key={node.id} className={`gl-node gl-node--${node.state}`}>
            <div className="gl-node__head">
              <h4 className="gl-node__title">{node.title}</h4>
              <span className="gl-node__meta mono">{node.meta}</span>
            </div>
            <p className="gl-node__detail">{node.detail}</p>
            <span className={`gl-node__state gl-node__state--${node.state}`}>{BUILD_STATE_LABEL[node.state]}</span>
          </article>
        ))}
      </div>
    </div>
  )
}
