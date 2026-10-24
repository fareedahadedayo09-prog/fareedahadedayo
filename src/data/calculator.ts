/**
 * ──────────────────────────────────────────────────────────────────────────
 *  ROI CALCULATOR
 * ──────────────────────────────────────────────────────────────────────────
 *  Pure client-side math. No API, no network, no backend.
 *
 *  All defaults are illustrative and are labelled as such in the UI. Visitors
 *  are told the results are estimates from their own inputs, not guaranteed
 *  savings and not actual client results.
 *
 *  To change the example assumptions, edit `DEFAULT_INPUTS` below.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type CalcInputs = {
  /** Enquiries handled per month. */
  enquiriesPerMonth: number
  /** Average minutes spent handling each enquiry. */
  minutesPerEnquiry: number
  /** Percentage of enquiries potentially eligible for automation (0–100). */
  automatablePercent: number
  /** Current hourly staff cost. */
  hourlyCost: number
  /** Expected percentage reduction in manual handling time for eligible enquiries (0–100). */
  timeReductionPercent: number
  /** Estimated monthly automation operating cost. */
  monthlyOperatingCost: number
  /** One-time implementation cost. */
  implementationCost: number
  /** Optional estimated additional monthly contribution from recovered or converted enquiries. */
  additionalContribution: number
  /** Currency symbol used in the display. */
  currency: string
}

export const DEFAULT_INPUTS: CalcInputs = {
  enquiriesPerMonth: 600,
  minutesPerEnquiry: 6,
  automatablePercent: 60,
  hourlyCost: 15,
  timeReductionPercent: 65,
  monthlyOperatingCost: 12,
  implementationCost: 300,
  additionalContribution: 0,
  currency: '₦',
}

export type CalcResults = {
  /** Current monthly handling hours. */
  currentHours: number
  /** Estimated monthly labour hours saved. */
  savedHours: number
  /** Estimated gross labour savings per month. */
  grossSavings: number
  /** Gross savings + optional contribution − operating cost. */
  netMonthlyBenefit: number
  /** (netMonthlyBenefit × 12) − implementation cost. */
  firstYearNetBenefit: number
  /** First-year ROI in percent, or null when implementation cost is zero. */
  firstYearROI: number | null
  /** Months to recover the implementation cost, or null when it cannot be computed. */
  paybackMonths: number | null
}

export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0
  return Math.min(100, Math.max(0, value))
}

export function calcResults(input: CalcInputs): CalcResults {
  const enquiries = Number.isFinite(input.enquiriesPerMonth) && input.enquiriesPerMonth > 0
    ? input.enquiriesPerMonth
    : 0

  const minutes = Number.isFinite(input.minutesPerEnquiry) && input.minutesPerEnquiry > 0
    ? input.minutesPerEnquiry
    : 0

  const currentHours = (enquiries * minutes) / 60

  const automatable = clampPercent(input.automatablePercent) / 100
  const reduction = clampPercent(input.timeReductionPercent) / 100
  const savedHours = currentHours * automatable * reduction

  const hourly = Number.isFinite(input.hourlyCost) && input.hourlyCost >= 0 ? input.hourlyCost : 0
  const grossSavings = savedHours * hourly

  const operating = Number.isFinite(input.monthlyOperatingCost) ? input.monthlyOperatingCost : 0
  const contribution = Number.isFinite(input.additionalContribution)
    ? Math.max(0, input.additionalContribution)
    : 0

  const netMonthlyBenefit = grossSavings + contribution - operating

  const implementation = Number.isFinite(input.implementationCost) && input.implementationCost > 0
    ? input.implementationCost
    : 0

  const firstYearNetBenefit = netMonthlyBenefit * 12 - implementation

  // Guard against division by zero: no implementation cost means no ROI to compute.
  const firstYearROI =
    implementation > 0 ? (firstYearNetBenefit / implementation) * 100 : null

  // Payback is only meaningful when the monthly benefit is positive and there is a cost to recover.
  const paybackMonths =
    netMonthlyBenefit > 0 && implementation > 0
      ? implementation / netMonthlyBenefit
      : null

  return {
    currentHours,
    savedHours,
    grossSavings,
    netMonthlyBenefit,
    firstYearNetBenefit,
    firstYearROI,
    paybackMonths,
  }
}

export type CalcField = {
  key: keyof CalcInputs
  label: string
  hint: string
  unit: string
  min: number
  max: number
  step: number
}

export const CALC_FIELDS: CalcField[] = [
  {
    key: 'enquiriesPerMonth',
    label: 'Enquiries handled per month',
    hint: 'Total inbound enquiries across all channels.',
    unit: '/month',
    min: 0,
    max: 100000,
    step: 10,
  },
  {
    key: 'minutesPerEnquiry',
    label: 'Average minutes per enquiry',
    hint: 'Handling time including lookups and typing.',
    unit: 'min',
    min: 0,
    max: 240,
    step: 1,
  },
  {
    key: 'automatablePercent',
    label: 'Enquiries potentially eligible',
    hint: 'Share of volume that could realistically be handled by the workflow.',
    unit: '%',
    min: 0,
    max: 100,
    step: 5,
  },
  {
    key: 'hourlyCost',
    label: 'Hourly staff cost',
    hint: 'Loaded cost per hour of the person handling the enquiry.',
    unit: '/hr',
    min: 0,
    max: 100000,
    step: 1,
  },
  {
    key: 'timeReductionPercent',
    label: 'Reduction in manual handling time',
    hint: 'How much time the automation removes for eligible enquiries.',
    unit: '%',
    min: 0,
    max: 100,
    step: 5,
  },
  {
    key: 'monthlyOperatingCost',
    label: 'Monthly automation operating cost',
    hint: 'Model calls, hosting and tooling per month.',
    unit: '/month',
    min: 0,
    max: 100000,
    step: 1,
  },
  {
    key: 'implementationCost',
    label: 'One-time implementation cost',
    hint: 'Your time plus any setup cost. Zero is allowed.',
    unit: 'one-off',
    min: 0,
    max: 1000000,
    step: 50,
  },
  {
    key: 'additionalContribution',
    label: 'Additional monthly contribution',
    hint: 'Only genuine recovered or converted enquiries. Leave zero if unknown.',
    unit: '/month',
    min: 0,
    max: 100000,
    step: 100,
  },
]

export const CALC_DISCLAIMER =
  'These are estimates based on your inputs, not guaranteed savings or actual client results. Validate the assumptions against your own operational data before making an investment decision.'
