/**
 * ──────────────────────────────────────────────────────────────────────────
 *  CALCULATORS — improved and client-side
 * ──────────────────────────────────────────────────────────────────────────
 *  1. Manual process cost estimator — time and money spent today on a
 *     repetitive manual process.
 *  2. Automation opportunity estimator — rough savings from automating a
 *     share of that process, given realistic inputs.
 *
 *  All math is transparent. Nothing is presented as a forecast; results are
 *  estimates from the user's own inputs.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type ManualInputs = {
  volumePerMonth: number // how many times the process is run per month
  minutesPerRun: number // average minutes spent each time
  hourlyCost: number // loaded cost of the person doing it (per hour, in the chosen currency)
  errorRatePercent: number // estimated % of runs that have to be corrected / redone (0-100)
  reworkMinutesPerError: number // additional minutes spent fixing each error
  currency: string
}

export type ManualResults = {
  monthlyHours: number
  monthlyLabourCost: number
  monthlyErrors: number
  monthlyReworkHours: number
  monthlyReworkCost: number
  totalMonthlyCost: number
  annualCost: number
}

export type OpportunityInputs = ManualInputs & {
  automatablePercent: number // share (0-100) of the process that could realistically be automated
  timeReductionPercent: number // expected reduction in handling time for automated runs
  errorReductionPercent: number // expected reduction in error rate for automated runs
  monthlyOperatingCost: number // monthly tool / hosting cost of automation
  implementationCost: number // one-off implementation cost
}

export type OpportunityResults = ManualResults & {
  automatedVolume: number
  hoursSaved: number
  errorsAvoided: number
  reworkHoursSaved: number
  grossMonthlySavings: number
  netMonthlyBenefit: number
  firstYearNetBenefit: number
  paybackMonths: number | null
}

export const MANUAL_DEFAULTS: ManualInputs = {
  volumePerMonth: 300,
  minutesPerRun: 6,
  hourlyCost: 2500,
  errorRatePercent: 8,
  reworkMinutesPerError: 12,
  currency: '\u20a6',
}

export const OPPORTUNITY_DEFAULTS: OpportunityInputs = {
  ...MANUAL_DEFAULTS,
  automatablePercent: 65,
  timeReductionPercent: 70,
  errorReductionPercent: 60,
  monthlyOperatingCost: 5000,
  implementationCost: 250000,
}

function clampPct(v: number) {
  if (Number.isNaN(v)) return 0
  return Math.min(100, Math.max(0, v))
}

export function calcManualCost(i: ManualInputs): ManualResults {
  const volume = Math.max(0, Number.isFinite(i.volumePerMonth) ? i.volumePerMonth : 0)
  const mins = Math.max(0, Number.isFinite(i.minutesPerRun) ? i.minutesPerRun : 0)
  const hourly = Math.max(0, Number.isFinite(i.hourlyCost) ? i.hourlyCost : 0)
  const errRate = clampPct(i.errorRatePercent) / 100
  const reworkMins = Math.max(0, Number.isFinite(i.reworkMinutesPerError) ? i.reworkMinutesPerError : 0)

  const monthlyHours = (volume * mins) / 60
  const monthlyLabourCost = monthlyHours * hourly
  const monthlyErrors = volume * errRate
  const monthlyReworkHours = (monthlyErrors * reworkMins) / 60
  const monthlyReworkCost = monthlyReworkHours * hourly
  const totalMonthlyCost = monthlyLabourCost + monthlyReworkCost
  const annualCost = totalMonthlyCost * 12

  return {
    monthlyHours,
    monthlyLabourCost,
    monthlyErrors,
    monthlyReworkHours,
    monthlyReworkCost,
    totalMonthlyCost,
    annualCost,
  }
}

export function calcOpportunity(i: OpportunityInputs): OpportunityResults {
  const base = calcManualCost(i)
  const autoPct = clampPct(i.automatablePercent) / 100
  const timeRed = clampPct(i.timeReductionPercent) / 100
  const errRed = clampPct(i.errorReductionPercent) / 100
  const opCost = Math.max(0, Number.isFinite(i.monthlyOperatingCost) ? i.monthlyOperatingCost : 0)
  const implCost = Math.max(0, Number.isFinite(i.implementationCost) ? i.implementationCost : 0)

  const automatedVolume = base.monthlyHours * autoPct // hours in the automatable share
  const hoursSaved = automatedVolume * timeRed
  const errorsAvoided = base.monthlyErrors * autoPct * errRed
  const reworkHoursSaved = errorsAvoided * (Math.max(0, i.reworkMinutesPerError) / 60)
  const grossMonthlySavings = (hoursSaved + reworkHoursSaved) * Math.max(0, i.hourlyCost)
  const netMonthlyBenefit = grossMonthlySavings - opCost
  const firstYearNetBenefit = netMonthlyBenefit * 12 - implCost
  const paybackMonths = netMonthlyBenefit > 0 && implCost > 0 ? implCost / netMonthlyBenefit : null

  return {
    ...base,
    automatedVolume: autoPct * i.volumePerMonth,
    hoursSaved,
    errorsAvoided,
    reworkHoursSaved,
    grossMonthlySavings,
    netMonthlyBenefit,
    firstYearNetBenefit,
    paybackMonths,
  }
}

export function fmtCurrency(n: number, currency: string) {
  const rounded = Math.round(n)
  return `${currency}${rounded.toLocaleString('en-US')}`
}

export const MANUAL_FIELDS: Array<{ key: keyof ManualInputs; label: string; hint: string; unit: string; min: number; max: number; step: number }> = [
  { key: 'volumePerMonth', label: 'Volume per month', hint: 'How many times the process runs', unit: '/mo', min: 0, max: 1000000, step: 10 },
  { key: 'minutesPerRun', label: 'Average minutes per run', hint: 'Hands-on time per instance', unit: 'min', min: 0, max: 240, step: 1 },
  { key: 'hourlyCost', label: 'Loaded hourly cost of the person', hint: 'Salary + overhead', unit: '/hr', min: 0, max: 1000000, step: 10 },
  { key: 'errorRatePercent', label: 'Error / correction rate', hint: 'Share of runs that need rework', unit: '%', min: 0, max: 100, step: 1 },
  { key: 'reworkMinutesPerError', label: 'Extra minutes fixing each error', hint: 'Time spent correcting mistakes', unit: 'min', min: 0, max: 240, step: 1 },
]

export const OPPORTUNITY_FIELDS: Array<{ key: keyof OpportunityInputs; label: string; hint: string; unit: string; min: number; max: number; step: number }> = [
  { key: 'automatablePercent', label: 'Share realistically automatable', hint: 'Be conservative', unit: '%', min: 0, max: 100, step: 5 },
  { key: 'timeReductionPercent', label: 'Expected time reduction', hint: 'For the automated share of runs', unit: '%', min: 0, max: 100, step: 5 },
  { key: 'errorReductionPercent', label: 'Expected error reduction', hint: 'How much fewer corrections needed', unit: '%', min: 0, max: 100, step: 5 },
  { key: 'monthlyOperatingCost', label: 'Monthly tool / hosting cost', hint: 'n8n, APIs, model calls etc.', unit: '/mo', min: 0, max: 1000000, step: 100 },
  { key: 'implementationCost', label: 'One-time implementation cost', hint: 'Build and setup', unit: 'one-off', min: 0, max: 10000000, step: 1000 },
]
