import { useMemo, useState } from 'react'
import { SIMULATOR_SCENARIOS, SIM_RULES, simulateOrder, type OrderInput } from '../data/simulator'

/**
 * Interactive COD order simulator. Pure client-side, no network calls.
 * Scenarios are defined in src/data/simulator.ts; the rule engine mirrors
 * the logic of the real n8n workflow at a high level.
 */
export function Simulator() {
  const [scenarioId, setScenarioId] = useState<string>(SIMULATOR_SCENARIOS[0].scenario_id)

  const scenario = useMemo<OrderInput>(
    () => SIMULATOR_SCENARIOS.find((s) => s.scenario_id === scenarioId) ?? SIMULATOR_SCENARIOS[0],
    [scenarioId],
  )

  const result = useMemo(() => simulateOrder(scenario), [scenario])

  return (
    <div className="simulator" aria-label="Interactive COD order workflow simulator">
      <div className="simulator__head">
        <div className="stack-sm">
          <span className="eyebrow" style={{ position: 'static' }}>
            Interactive demonstration
          </span>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>
            COD Order Confirmation &amp; Risk Assessment — walk through a decision
          </h3>
          <p className="muted" style={{ fontSize: '0.84rem', maxWidth: '62ch' }}>
            Select a sample order below to see which checks the workflow runs, which pass or fail, and what
            the system does next. This reflects the implemented rules; thresholds are illustrative
            configuration.
          </p>
        </div>
        <span className="badge badge--illustrative badge--dot">No real emails sent</span>
      </div>

      <div className="simulator__body">
        {/* ── Scenario list ──────────────────────────────────────── */}
        <div className="simulator__scenarios" role="tablist" aria-label="Sample order scenarios">
          <span
            className="mono"
            style={{ fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '0.35rem', paddingLeft: '0.3rem' }}
          >
            Sample scenarios
          </span>
          {SIMULATOR_SCENARIOS.map((s) => (
            <button
              key={s.scenario_id}
              type="button"
              role="tab"
              aria-selected={s.scenario_id === scenarioId}
              className={`scenario-btn ${s.scenario_id === scenarioId ? 'is-active' : ''}`}
              onClick={() => setScenarioId(s.scenario_id)}
            >
              <span className="scenario-btn__title">{s.label}</span>
              <span className="scenario-btn__desc">{s.description}</span>
              {s.illustrative ? <span className="scenario-btn__ill">Design scenario · not yet built</span> : null}
            </button>
          ))}
        </div>

        {/* ── Result panel ───────────────────────────────────────── */}
        <div className="simulator__results">
          {/* Order details */}
          <div className="sim-order">
            <div className="sim-order__title">Incoming order</div>
            <dl>
              <div className="sim-order__line">
                <dt>Customer</dt>
                <dd>{scenario.customer_name || <span className="faint">— missing —</span>}</dd>
              </div>
              <div className="sim-order__line">
                <dt>Address</dt>
                <dd>{scenario.address || <span className="faint">— missing —</span>}</dd>
              </div>
              <div className="sim-order__line">
                <dt>Phone</dt>
                <dd>{scenario.phone || <span className="faint">— missing —</span>}</dd>
              </div>
              <div className="sim-order__line">
                <dt>Items</dt>
                <dd>
                  {scenario.line_items.length === 0 ? (
                    <span className="faint">— none —</span>
                  ) : (
                    <div className="stack-sm" style={{ gap: '0.2rem' }}>
                      {scenario.line_items.map((item, i) => (
                        <span key={i} className="mono" style={{ fontSize: '0.78rem' }}>
                          {String(item.quantity)} × {item.product} @ {String(item.unit_price)}
                        </span>
                      ))}
                    </div>
                  )}
                </dd>
              </div>
              <div className="sim-order__line">
                <dt>Delivery</dt>
                <dd>{String(scenario.delivery_fee)}</dd>
              </div>
            </dl>
          </div>

          {/* Checks */}
          <div className="sim-checks" aria-label="Checks run by the workflow">
            {result.checks.map((check) => {
              const toneClass =
                check.passed === true
                  ? 'sim-check--pass'
                  : check.passed === 'warning'
                    ? 'sim-check--warn'
                    : 'sim-check--fail'
              const icon =
                check.passed === true ? '✓' : check.passed === 'warning' ? '!' : '✕'
              return (
                <div key={check.id} className={`sim-check ${toneClass}`}>
                  <span className="sim-check__icon">{icon}</span>
                  <div>
                    <div className="sim-check__label">{check.label}</div>
                    <div className="sim-check__detail">{check.detail}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Total line */}
          {result.order_total !== null ? (
            <div className="cluster cluster--between" style={{ padding: '0 0.2rem' }}>
              <span className="faint mono" style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Calculated total
              </span>
              <span className="sim-total">
                {result.order_total.toLocaleString()}
                <span>currency unit</span>
              </span>
            </div>
          ) : null}

          {/* Outcome */}
          <div className={`sim-outcome sim-outcome--${result.outcome}`}>
            <div className="sim-outcome__label">
              {result.outcome === 'confirmed'
                ? 'Final action — Confirmed'
                : result.outcome === 'flagged'
                  ? 'Final action — Flagged'
                  : 'Final action — Rejected input'}
            </div>
            <div className="sim-outcome__title">{result.actionLabel}</div>
            <div className="sim-outcome__detail">{result.actionDetail}</div>
          </div>

          {/* Scenario-specific note */}
          {scenario.note ? (
            <p className="sim-notice">
              <strong className="muted">About this scenario.</strong> {scenario.note}
            </p>
          ) : null}

          <p className="sim-notice">
            <strong className="muted">How this relates to the real build.</strong> The checks above mirror
            the implemented workflow: input validation runs before pricing, pricing is arithmetic, and the
            risk check applies an eligibility threshold before sending a link. The specific threshold (
            {SIM_RULES.MAX_ELIGIBLE_TOTAL.toLocaleString()}) is illustrative configuration — in a real
            deployment a merchant sets the number. This simulator runs entirely in your browser and does
            not send emails or write records.
          </p>
        </div>
      </div>
    </div>
  )
}
