import { useMemo, useState } from 'react'
import {
  MANUAL_DEFAULTS,
  MANUAL_FIELDS,
  OPPORTUNITY_DEFAULTS,
  OPPORTUNITY_FIELDS,
  calcManualCost,
  calcOpportunity,
  fmtCurrency,
  type ManualInputs,
  type OpportunityInputs,
} from '../data/calculators'

/**
 * Two-part calculator:
 *  1. Manual cost today (time, labour, errors, rework).
 *  2. Automation opportunity based on the manual baseline.
 * Client-side only. No network calls.
 */
export function ProcessCostCalculator() {
  const [manual, setManual] = useState<ManualInputs>(MANUAL_DEFAULTS)
  const [opp, setOpp] = useState<OpportunityInputs>(OPPORTUNITY_DEFAULTS)

  const manualResult = useMemo(() => calcManualCost(manual), [manual])
  const oppResult = useMemo(() => calcOpportunity({ ...manual, ...opp }), [manual, opp])

  function setManualField(key: keyof ManualInputs, raw: string) {
    const v = raw === '' ? 0 : Number(raw)
    setManual((m) => ({ ...m, [key]: Number.isFinite(v) ? v : 0 }))
  }
  function setOppField(key: keyof OpportunityInputs, raw: string) {
    const v = raw === '' ? 0 : Number(raw)
    setOpp((o) => ({ ...o, [key]: Number.isFinite(v) ? v : 0 }))
  }

  const currency = manual.currency || ''

  return (
    <div className="stack" style={{ gap: '1.4rem' }}>
      {/* ─── Part 1: cost today ─── */}
      <div className="roi">
        <div className="roi__inputs">
          <div className="cluster cluster--between" style={{ marginBottom: '0.5rem' }}>
            <span className="eyebrow">Step 1</span>
            <span className="badge badge--illustrative">Your numbers</span>
          </div>
          <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.5rem' }}>What this process costs you today</h3>
          <p className="muted" style={{ fontSize: '0.82rem', marginBottom: '0.9rem', lineHeight: 1.6 }}>
            Describe the process as it currently runs. All numbers are yours to edit.
          </p>
          <div className="stack">
            {MANUAL_FIELDS.map((f) => (
              <div className="field" key={f.key}>
                <label className="field__label" htmlFor={`man-${f.key}`}>
                  <span>
                    {f.label}
                    <span className="faint mono" style={{ marginLeft: '0.5rem', fontSize: '0.72em' }}>{f.hint}</span>
                  </span>
                  <span className="field__value">{f.unit}</span>
                </label>
                <input
                  id={`man-${f.key}`}
                  type="number"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  inputMode="decimal"
                  value={(manual[f.key] as number)}
                  onChange={(e) => setManualField(f.key, e.target.value)}
                />
              </div>
            ))}
            <div className="field">
              <label className="field__label" htmlFor="man-currency">
                <span>Currency symbol</span>
              </label>
              <input
                id="man-currency"
                type="text"
                maxLength={4}
                value={manual.currency}
                onChange={(e) => setManual((m) => ({ ...m, currency: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="roi__results">
          <div className="stack" style={{ gap: '1.2rem' }}>
            <div className="stack-sm">
              <span className="eyebrow">Today</span>
              <h3 style={{ fontSize: '1.05rem' }}>Current monthly cost of the manual process</h3>
            </div>
            <div className="roi__result-grid">
              <Metric label="Monthly hours" value={`${manualResult.monthlyHours.toFixed(1)} h`} />
              <Metric label="Monthly labour cost" value={fmtCurrency(manualResult.monthlyLabourCost, currency)} />
              <Metric label="Errors per month" value={manualResult.monthlyErrors.toFixed(1)} />
              <Metric label="Rework hours / month" value={`${manualResult.monthlyReworkHours.toFixed(1)} h`} />
              <Metric label="Rework cost / month" value={fmtCurrency(manualResult.monthlyReworkCost, currency)} tone="muted" />
              <Metric label="Total monthly cost" value={fmtCurrency(manualResult.totalMonthlyCost, currency)} tone="accent" />
              <Metric label="Annual cost" value={fmtCurrency(manualResult.annualCost, currency)} tone="accent" />
            </div>
            <div className="notice notice--grey">
              Error cost is the time spent correcting mistakes — often invisible until you count it. This is
              the baseline an automation would be measured against.
            </div>
          </div>
        </div>
      </div>

      {/* ─── Part 2: automation opportunity ─── */}
      <div className="roi">
        <div className="roi__inputs">
          <div className="cluster cluster--between" style={{ marginBottom: '0.5rem' }}>
            <span className="eyebrow">Step 2</span>
            <span className="badge badge--illustrative">Estimate</span>
          </div>
          <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.5rem' }}>What automation could realistically recover</h3>
          <p className="muted" style={{ fontSize: '0.82rem', marginBottom: '0.9rem', lineHeight: 1.6 }}>
            Be conservative. Most automations handle 50–80% of a process well; the remainder stays with a person.
          </p>
          <div className="stack">
            {OPPORTUNITY_FIELDS.map((f) => (
              <div className="field" key={f.key}>
                <label className="field__label" htmlFor={`opp-${f.key}`}>
                  <span>
                    {f.label}
                    <span className="faint mono" style={{ marginLeft: '0.5rem', fontSize: '0.72em' }}>{f.hint}</span>
                  </span>
                  <span className="field__value">{f.unit}</span>
                </label>
                <input
                  id={`opp-${f.key}`}
                  type="number"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  inputMode="decimal"
                  value={(opp[f.key] as number)}
                  onChange={(e) => setOppField(f.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="roi__results">
          <div className="stack" style={{ gap: '1.2rem' }}>
            <div className="stack-sm">
              <span className="eyebrow">Estimate</span>
              <h3 style={{ fontSize: '1.05rem' }}>Potential monthly and annual impact</h3>
            </div>
            <div className="roi__result-grid">
              <Metric label="Hours saved / month" value={`${oppResult.hoursSaved.toFixed(1)} h`} tone="accent" />
              <Metric label="Errors avoided / month" value={oppResult.errorsAvoided.toFixed(1)} tone="accent" />
              <Metric label="Gross monthly savings" value={fmtCurrency(oppResult.grossMonthlySavings, currency)} />
              <Metric label="Net monthly benefit" value={fmtCurrency(oppResult.netMonthlyBenefit, currency)} tone={oppResult.netMonthlyBenefit >= 0 ? 'accent' : 'muted'} />
              <Metric label="First-year net benefit" value={fmtCurrency(oppResult.firstYearNetBenefit, currency)} tone={oppResult.firstYearNetBenefit >= 0 ? 'accent' : 'muted'} />
              <Metric
                label="Payback period"
                value={oppResult.paybackMonths === null ? 'n/a' : `${oppResult.paybackMonths.toFixed(1)} months`}
              />
            </div>
            <div className="notice">
              <strong>How to read this.</strong> Hours saved is the reduction in hands-on time for the automatable
              share of runs, valued at your hourly cost. Errors avoided estimates the reduction in rework time.
              Net monthly benefit subtracts the monthly operating cost; first-year net also subtracts the
              one-time implementation cost. These are estimates from your own inputs, not guaranteed savings.
            </div>
            <div className="notice notice--warn">
              <strong>Avoid double counting.</strong> Time saved is not the same as cash in the bank unless the
              saved time is either cut from real expenditure or used productively elsewhere.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value, tone = 'muted' }: { label: string; value: string; tone?: 'accent' | 'muted' }) {
  return (
    <div className={`metric ${tone === 'accent' ? 'metric--accent' : 'metric--muted'}`}>
      <span className="metric__label">{label}</span>
      <span className="metric__value">{value}</span>
    </div>
  )
}
