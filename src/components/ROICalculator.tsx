import { useMemo, useState } from 'react'
import {
  CALC_DISCLAIMER,
  CALC_FIELDS,
  DEFAULT_INPUTS,
  calcResults,
  type CalcInputs,
} from '../data/calculator'

type MetricProps = {
  label: string
  value: string
  tone?: 'accent' | 'muted'
}

function Metric({ label, value, tone = 'muted' }: MetricProps) {
  return (
    <div className={`metric ${tone === 'accent' ? 'metric--accent' : 'metric--muted'}`}>
      <span className="metric__label">{label}</span>
      <span className="metric__value">{value}</span>
    </div>
  )
}

/** Formats a number with up to two decimals and no grouping surprises. */
function fmt(value: number, currency: string) {
  const fixed = Math.round(value * 100) / 100
  const text = Number.isInteger(fixed)
    ? fixed.toLocaleString('en-US')
    : fixed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `${currency}${text}`
}

function fmtHours(value: number) {
  const fixed = Math.round(value * 10) / 10
  return fixed.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 })
}

/**
 * Pure client-side ROI calculator. No API call, no external service.
 * Updates immediately on every input change.
 */
export function ROICalculator() {
  const [inputs, setInputs] = useState<CalcInputs>(DEFAULT_INPUTS)

  const results = useMemo(() => calcResults(inputs), [inputs])
  const currency = inputs.currency || ''

  const set = (key: keyof CalcInputs, raw: string) => {
    const value = raw === '' ? 0 : Number(raw)
    setInputs((prev) => ({ ...prev, [key]: Number.isFinite(value) ? value : 0 }))
  }

  return (
    <div className="roi">
      {/* ── Inputs ───────────────────────────────────────────────────── */}
      <div className="roi__inputs">
        <div className="cluster cluster--between" style={{ marginBottom: '0.5rem' }}>
          <span className="eyebrow">Work the numbers</span>
          <span className="badge badge--illustrative">Illustrative defaults</span>
        </div>

        <div className="stack">
          {CALC_FIELDS.map((field) => (
            <div className="field" key={field.key}>
              <label className="field__label" htmlFor={`roi-${field.key}`}>
                <span>
                  {field.label}
                  <span className="faint mono" style={{ marginLeft: '0.5rem', fontSize: '0.72em' }}>
                    {field.hint}
                  </span>
                </span>
                <span className="field__value">{field.unit}</span>
              </label>
              <input
                id={`roi-${field.key}`}
                type="number"
                min={field.min}
                max={field.max}
                step={field.step}
                inputMode="decimal"
                value={Number.isFinite(inputs[field.key]) ? (inputs[field.key] as number) : 0}
                onChange={(event) => set(field.key, event.target.value)}
                aria-describedby={`roi-${field.key}-desc`}
              />
              <span id={`roi-${field.key}-desc`} className="visually-hidden">
                {field.label}, {field.hint}
              </span>
            </div>
          ))}

          <div className="field">
            <label className="field__label" htmlFor="roi-currency">
              <span>Currency symbol</span>
            </label>
            <input
              id="roi-currency"
              type="text"
              maxLength={4}
              value={inputs.currency}
              onChange={(event) => setInputs((prev) => ({ ...prev, currency: event.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────────────── */}
      <div className="roi__results">
        <div className="stack" style={{ gap: '1.2rem' }}>
          <div className="stack-sm">
            <span className="eyebrow">Estimate</span>
            <h3 style={{ fontSize: '1.05rem' }}>What the inputs produce</h3>
          </div>

          <div className="roi__result-grid">
            <Metric label="Current monthly handling hours" value={`${fmtHours(results.currentHours)} hrs`} />
            <Metric
              label="Monthly hours saved"
              value={`${fmtHours(results.savedHours)} hrs`}
              tone="accent"
            />
            <Metric
              label="Gross monthly labour value"
              value={fmt(results.grossSavings, currency)}
              tone="accent"
            />
            <Metric
              label="Net monthly benefit"
              value={fmt(results.netMonthlyBenefit, currency)}
              tone={results.netMonthlyBenefit >= 0 ? 'accent' : 'muted'}
            />
            <Metric
              label="First-year net benefit"
              value={fmt(results.firstYearNetBenefit, currency)}
              tone={results.firstYearNetBenefit >= 0 ? 'accent' : 'muted'}
            />
            <Metric
              label="First-year ROI"
              value={results.firstYearROI === null ? 'n/a' : `${Math.round(results.firstYearROI)}%`}
            />
            <Metric
              label="Payback period"
              value={results.paybackMonths === null ? 'n/a' : `${fmtHours(results.paybackMonths)} months`}
            />
          </div>

          <div className="notice">
            <strong>How this is calculated.</strong>{' '}
            Current handling hours are enquiries per month multiplied by minutes per enquiry, divided by
            sixty. Hours saved multiply that by the eligible share and the expected reduction in handling
            time. Gross monthly value multiplies hours saved by the hourly cost. Net monthly benefit adds
            any optional contribution you entered and subtracts the monthly operating cost. First-year
            benefit is the net monthly benefit across twelve months minus the one-time implementation cost.
            Payback is the implementation cost divided by the net monthly benefit, shown only when the
            monthly benefit is positive.
          </div>

          {inputs.implementationCost === 0 ? (
            <p className="faint mono" style={{ fontSize: '0.76rem' }}>
              First-year ROI and payback are not shown because the implementation cost is zero.
            </p>
          ) : null}

          <div className="grid-3" style={{ gap: '1rem' }}>
            <div className="card" style={{ padding: '1.1rem 1.2rem' }}>
              <h4 style={{ fontSize: '0.88rem' }}>Cost reduction</h4>
              <p className="muted" style={{ fontSize: '0.82rem', marginTop: '0.45rem' }}>
                The staff time the workflow removes, valued at your hourly cost. Time saved is not a cash
                saving unless it reduces real expenditure or is used productively elsewhere.
              </p>
            </div>
            <div className="card" style={{ padding: '1.1rem 1.2rem' }}>
              <h4 style={{ fontSize: '0.88rem' }}>Revenue impact</h4>
              <p className="muted" style={{ fontSize: '0.82rem', marginTop: '0.45rem' }}>
                Any additional contribution from genuinely recovered or converted enquiries, entered above
                as an assumption. It is not added anywhere it is not evidenced.
              </p>
            </div>
            <div className="card" style={{ padding: '1.1rem 1.2rem' }}>
              <h4 style={{ fontSize: '0.88rem' }}>Risk reduction</h4>
              <p className="muted" style={{ fontSize: '0.82rem', marginTop: '0.45rem' }}>
                Validation, restricted permissions, audit trails and human escalation reduce the chance of a
                wrong decision reaching a customer. This category is qualitative and is not assigned a
                monetary value.
              </p>
            </div>
          </div>

          <p className="faint" style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
            <strong className="muted">Avoid double counting.</strong> The gross monthly labour value is not
            the same as the net monthly benefit. The net figure already subtracts the operating cost, and it
            should not also be added to a revenue figure that assumes the same hours are sold again.
          </p>

          <div className="notice notice--warn">
            <strong>Disclaimer.</strong> {CALC_DISCLAIMER}
          </div>
        </div>
      </div>
    </div>
  )
}
