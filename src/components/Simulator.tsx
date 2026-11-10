import { useMemo, useState } from 'react'
import { SIMULATORS, type Check, type OutcomeTone, type Scenario, type SimulatorId, type SimulationResult } from '../data/simulators'

function ScenarioInputSummary({ input }: { input: Record<string, unknown> }) {
  const formatVal = (v: unknown): string => {
    if (Array.isArray(v)) {
      return v.map((row) => {
        if (row && typeof row === 'object') {
          const r = row as Record<string, unknown>
          const parts = Object.entries(r).map(([k, val]) => `${k}: ${String(val)}`)
          return `{ ${parts.join(', ')} }`
        }
        return String(row)
      }).join(' \n')
    }
    return String(v)
  }
  return (
    <div className="sim-order">
      <div className="sim-order__title">Incoming record</div>
      <dl>
        {Object.entries(input).map(([k, v]) => (
          <div className="sim-order__line" key={k}>
            <dt>{k.replace(/_/g, ' ')}</dt>
            <dd style={{ whiteSpace: 'pre-wrap' }}>
              {v === '' || v === null || v === undefined ? <span className="faint">·</span> : formatVal(v)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function toneClass(tone: Check['tone']) {
  return tone === 'pass' ? 'sim-check--pass' : tone === 'warn' ? 'sim-check--warn' : 'sim-check--fail'
}
function icon(tone: Check['tone']) {
  return tone === 'pass' ? '✓' : tone === 'warn' ? '!' : '✕'
}
function outcomeClass(tone: OutcomeTone) {
  return `sim-outcome--${tone === 'confirmed' || tone === 'approved' || tone === 'routed' || tone === 'staged' ? 'confirmed' : tone === 'flagged' ? 'flagged' : 'rejected'}`
}

export function Simulator({ simulatorId }: { simulatorId: SimulatorId }) {
  const def = SIMULATORS[simulatorId]
  const [scenarioId, setScenarioId] = useState<string>(def.scenarios[0].id)

  const scenario: Scenario = useMemo(
    () => def.scenarios.find((s) => s.id === scenarioId) ?? def.scenarios[0],
    [def, scenarioId],
  )
  const result: SimulationResult = useMemo(() => def.run(scenario.input), [def, scenario])

  return (
    <div className="simulator" aria-label={`Interactive simulator: ${def.title}`}>
      <div className="simulator__head">
        <div className="stack-sm" style={{ maxWidth: '760px' }}>
          <span className="eyebrow" style={{ position: 'static' }}>Interactive demonstration</span>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{def.title}</h3>
          <p className="muted" style={{ fontSize: '0.84rem', margin: 0 }}>{def.subtitle}</p>
        </div>
        <span className="badge badge--illustrative badge--dot">Simulation only · no live systems</span>
      </div>

      <div className="simulator__body">
        <div className="simulator__scenarios" role="tablist" aria-label="Sample scenarios">
          <span className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '0.35rem', paddingLeft: '0.3rem' }}>
            Scenarios
          </span>
          {def.scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={s.id === scenarioId}
              className={`scenario-btn ${s.id === scenarioId ? 'is-active' : ''}`}
              onClick={() => setScenarioId(s.id)}
            >
              <span className="scenario-btn__title">{s.title}</span>
              <span className="scenario-btn__desc">{s.description}</span>
              {s.illustrative ? <span className="scenario-btn__ill">Design scenario · not yet built</span> : null}
            </button>
          ))}
        </div>

        <div className="simulator__results">
          <ScenarioInputSummary input={scenario.input} />

          <div className="sim-checks" aria-label="Checks">
            {result.checks.map((c) => (
              <div key={c.id} className={`sim-check ${toneClass(c.tone)}`}>
                <span className="sim-check__icon">{icon(c.tone)}</span>
                <div>
                  <div className="sim-check__label">{c.label}</div>
                  <div className="sim-check__detail">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {result.computed && Object.keys(result.computed).length > 0 ? (
            <div className="cluster cluster--between" style={{ padding: '0 0.2rem', flexWrap: 'wrap', gap: '0.6rem' }}>
              {Object.entries(result.computed).map(([k, v]) => (
                <div key={k} className="stack-sm" style={{ gap: '0.1rem' }}>
                  <span className="faint mono" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k.replace(/_/g, ' ')}</span>
                  <span className="sim-total" style={{ fontSize: '1.05rem' }}>
                    {typeof v === 'number' ? v.toLocaleString() : v ?? <span className="faint">·</span>}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          <div className={`sim-outcome ${outcomeClass(result.outcome.tone)}`}>
            <div className="sim-outcome__label">Final action</div>
            <div className="sim-outcome__title">{result.outcome.label}</div>
            <div className="sim-outcome__detail">{result.outcome.detail}</div>
          </div>

          <p className="sim-notice">
            <strong className="muted">About this simulator.</strong> {def.disclaimer}
          </p>
        </div>
      </div>
    </div>
  )
}
