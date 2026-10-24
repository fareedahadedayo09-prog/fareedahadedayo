import { coreGroups, experienceLabel, opsGroups, supportingGroups } from '../data/tools'

/**
 * The tool stack, split into three deliberately unequal tiers so the primary
 * stack stays prominent and the supporting list cannot overpower it.
 */
export function ToolsSection() {
  return (
    <div className="stack" style={{ gap: '0' }}>
      {/* ── A. Core stack ─────────────────────────────────────────────── */}
      <div className="tool-group" id="core-stack">
        <div className="tool-group__head">
          <span className="eyebrow">A · Core implementation stack</span>
          <h3>Tools I use to build and orchestrate workflows</h3>
          <p className="lede">
            The platforms behind the systems on this site. Each entry says what it is used for and how
            well I know it, so nothing is presented as production experience where it is not.
          </p>
        </div>

        {coreGroups.map((group) => (
          <div key={group.category} className="stack" style={{ gap: 0 }}>
            <h4
              className="mono"
              style={{
                fontSize: '0.66rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                fontWeight: 500,
                marginBottom: '0.4rem',
              }}
            >
              {group.category}
            </h4>

            {group.items.map((tool) => (
              <div className="tool-card" key={tool.name}>
                <div>
                  <span className="tool-card__name">{tool.name}</span>
                  <span className="tool-card__meta">{experienceLabel[tool.experience]}</span>
                </div>
                <p className="tool-card__desc">{tool.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── B. Supporting tools ───────────────────────────────────────── */}
      <div className="tool-group">
        <div className="tool-group__head">
          <span className="eyebrow">B · Supporting tools</span>
          <h3>Available when a project needs them</h3>
          <p className="lede">
            Tools I have used on specific tasks or know well enough to use. Listed compactly because none
            of them is the primary stack, and none is described as a deployed integration.
          </p>
        </div>

        {supportingGroups.map((group) => (
          <div key={group.category} className="stack" style={{ gap: '0.7rem' }}>
            <h4
              className="mono"
              style={{
                fontSize: '0.66rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                fontWeight: 500,
              }}
            >
              {group.category}
            </h4>
            <div className="tool-cluster" style={{ marginBottom: 0 }}>
              {group.items.map((tool) => (
                <div className="tool-chip" key={tool.name}>
                  <span className="tool-chip__name">{tool.name}</span>
                  <span className="tool-chip__note">{tool.note}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── C. Infrastructure, reliability and operations ──────────────── */}
      <div className="tool-group">
        <div className="tool-group__head">
          <span className="eyebrow">C · Infrastructure, reliability and operations</span>
          <h3>What keeps a workflow honest once it is running</h3>
          <p className="lede">
            Hosting, monitoring, failure alerts and human handoff. These are design capabilities and
            implementation options. A workflow that lists these tools is not necessarily monitored
            continuously or running with production-grade reliability.
          </p>
        </div>

        {opsGroups.map((group) => (
          <div key={group.category} className="stack" style={{ gap: 0 }}>
            <h4
              className="mono"
              style={{
                fontSize: '0.66rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                fontWeight: 500,
                marginBottom: '0.4rem',
              }}
            >
              {group.category}
            </h4>

            {group.items.map((tool) => (
              <div className="tool-card" key={tool.name}>
                <div>
                  <span className="tool-card__name">{tool.name}</span>
                  <span className="tool-card__meta">{experienceLabel[tool.experience]}</span>
                </div>
                <p className="tool-card__desc">{tool.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
