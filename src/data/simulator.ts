/**
 * ──────────────────────────────────────────────────────────────────────────
 *  COD ORDER SIMULATOR — scenario data and rule engine
 * ──────────────────────────────────────────────────────────────────────────
 *  Pure client-side logic. Mirrors the implemented rules in the real workflow
 *  so the simulator is faithful to the build. Rules:
 *
 *   1. Required fields: customer_name, address, phone, and at least one
 *      line item with product name, quantity (>0) and unit_price (>=0).
 *   2. Delivery fee must be present and a non-negative number.
 *   3. Quantities must be numeric and positive.
 *   4. Order total = sum(quantity * unit_price) + delivery_fee.
 *   5. Eligibility / risk rule (illustrative configuration — matches the
 *      kind of check the real workflow applies):
 *        - Total must be at most MAX_ELIGIBLE_TOTAL (high-value COD orders
 *          are considered risky for courier delivery).
 *        - Address must contain at least MIN_ADDRESS_LENGTH characters
 *          (crude completeness check — the real workflow would do more).
 *        - Phone must contain only digits, spaces and +, and be at least
 *          MIN_PHONE_LENGTH digits long.
 *
 *  If all checks pass the order is CONFIRMED (confirmation link queued).
 *  If the total exceeds MAX_ELIGIBLE_TOTAL or address/phone fail the basic
 *  validation, the order is FLAGGED FOR REVIEW — a person decides.
 *  If a required field is structurally missing or a quantity is invalid
 *  the order is REJECTED (invalid input) — not a customer-facing outcome,
 *  an input problem that must be corrected.
 *
 *  These rules are illustrative configuration; the thresholds chosen are
 *  the kind of values a merchant would set. The simulator labels this.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type LineItem = {
  product: string
  quantity: number | string
  unit_price: number | string
}

export type OrderInput = {
  scenario_id: string
  label: string
  description: string
  customer_name: string
  address: string
  phone: string
  delivery_fee: number | string
  line_items: LineItem[]
  /** If true the scenario is a design scenario (rule proposed, not yet implemented). */
  illustrative?: boolean
  note?: string
}

export type CheckResult = {
  id: string
  label: string
  passed: boolean | 'warning'
  detail: string
}

export type SimulatorOutcome = 'confirmed' | 'flagged' | 'rejected'

export type SimulationResult = {
  order_total: number | null
  checks: CheckResult[]
  outcome: SimulatorOutcome
  actionLabel: string
  actionDetail: string
}

export const SIM_RULES = {
  MAX_ELIGIBLE_TOTAL: 80000, // in the configured currency; illustrative threshold
  MIN_ADDRESS_LENGTH: 12,
  MIN_PHONE_LENGTH: 8,
}

export const SIMULATOR_SCENARIOS: OrderInput[] = [
  {
    scenario_id: 'pass-clean',
    label: 'Clean order — passes all rules',
    description:
      'A complete order with a valid address, phone number, two line items, and a total within the risk threshold. Should be confirmed.',
    customer_name: 'Amaka Okafor',
    address: '14 Allen Avenue, Ikeja, Lagos',
    phone: '+234 803 123 4567',
    delivery_fee: 2500,
    line_items: [
      { product: 'Glow Vitamin C Serum', quantity: 1, unit_price: 14500 },
      { product: 'Hydrating Cleanser', quantity: 2, unit_price: 8500 },
    ],
    note:
      'Represents the happy path: complete information, valid phone, reasonable total. The workflow prices the order, passes all checks, and sends the customer a confirmation link.',
  },
  {
    scenario_id: 'risky-high-total',
    label: 'Order exceeds the risk threshold',
    description:
      'A large bulk order that totals more than the configured high-value COD threshold. Should be flagged for review rather than auto-confirmed.',
    customer_name: 'Musa Ibrahim',
    address: 'Plot 22, Wuse 2, Abuja, FCT',
    phone: '+234 701 987 6543',
    delivery_fee: 4000,
    line_items: [
      { product: 'Glow Vitamin C Serum (bulk x6)', quantity: 6, unit_price: 14500 },
      { product: 'Hydrating Cleanser (bulk x10)', quantity: 10, unit_price: 8500 },
    ],
    note:
      'High-value COD orders carry a higher failed-delivery risk. The real workflow applies a configurable threshold; in this illustrative configuration any order above the threshold is flagged and routed to a person rather than auto-confirmed.',
  },
  {
    scenario_id: 'invalid-missing-field',
    label: 'Missing or invalid information',
    description:
      'An order with a missing phone number and a non-numeric quantity. The input is structurally invalid and should be rejected before pricing.',
    customer_name: 'Chioma Eze',
    address: 'Lekki',
    phone: '',
    delivery_fee: 2500,
    line_items: [
      { product: 'Glow Vitamin C Serum', quantity: 'two', unit_price: 14500 },
    ],
    note:
      'Validation runs before pricing. A non-numeric quantity stops the run and records an input error; an empty phone number fails the completeness check. The customer is not sent a link — the order is held as an invalid submission to be corrected.',
  },
  {
    scenario_id: 'short-address',
    label: 'Incomplete delivery address',
    description:
      'An order where the address is too short to be a usable delivery location. Flagged for review — a real person needs to confirm where to deliver.',
    customer_name: 'David Okon',
    address: 'Abuja',
    phone: '+234 812 555 0199',
    delivery_fee: 2500,
    line_items: [
      { product: 'Hydrating Cleanser', quantity: 1, unit_price: 8500 },
    ],
    note:
      'Illustrative of the kind of completeness check the real workflow would do. The address fails the minimum-length heuristic, so the order is flagged for manual address confirmation rather than dispatched to a courier with an unusable location.',
    illustrative: true,
  },
]

function toNumber(v: number | string): number | null {
  if (typeof v === 'number') return Number.isFinite(v) ? v : null
  if (typeof v !== 'string') return null
  const trimmed = v.trim()
  if (trimmed === '') return null
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : null
}

function digitsIn(s: string): string {
  return s.replace(/[^0-9]/g, '')
}

export function simulateOrder(input: OrderInput): SimulationResult {
  const checks: CheckResult[] = []

  // --- Required field: name -------------------------------------------------
  const hasName = input.customer_name.trim().length > 0
  checks.push({
    id: 'name',
    label: 'Customer name provided',
    passed: hasName,
    detail: hasName ? `Name: ${input.customer_name}` : 'Missing customer name.',
  })

  // --- Required field: address ---------------------------------------------
  const addressOk = input.address.trim().length >= SIM_RULES.MIN_ADDRESS_LENGTH
  checks.push({
    id: 'address',
    label: 'Delivery address looks complete',
    passed: addressOk,
    detail: addressOk
      ? `Address (${input.address.length} chars): ${input.address}`
      : `Address is only ${input.address.trim().length} characters — too short to dispatch on.`,
  })

  // --- Phone --------------------------------------------------------------
  const phoneRaw = input.phone.trim()
  const phoneDigits = digitsIn(phoneRaw)
  const phoneValid =
    phoneDigits.length >= SIM_RULES.MIN_PHONE_LENGTH && /^[0-9+\s()-]+$/.test(phoneRaw)
  checks.push({
    id: 'phone',
    label: 'Phone number is usable',
    passed: phoneValid,
    detail: phoneValid
      ? `Phone: ${phoneRaw} (${phoneDigits.length} digits)`
      : phoneRaw === ''
        ? 'No phone number supplied.'
        : `Phone "${phoneRaw}" has too few digits or contains invalid characters.`,
  })

  // --- At least one line item ---------------------------------------------
  const hasItems = input.line_items.length > 0
  checks.push({
    id: 'items',
    label: 'At least one line item',
    passed: hasItems,
    detail: hasItems ? `${input.line_items.length} line item(s).` : 'No line items on the order.',
  })

  // --- Quantities / prices numeric ----------------------------------------
  let quantitiesValid = true
  let pricesValid = true
  const quantityDetails: string[] = []
  for (const item of input.line_items) {
    const q = toNumber(item.quantity)
    const p = toNumber(item.unit_price)
    if (q === null || q <= 0) {
      quantitiesValid = false
      quantityDetails.push(`"${item.product}" has invalid quantity: ${String(item.quantity)}`)
    }
    if (p === null || p < 0) {
      pricesValid = false
      quantityDetails.push(`"${item.product}" has invalid price: ${String(item.unit_price)}`)
    }
  }
  checks.push({
    id: 'quantities',
    label: 'Quantities are numeric and positive',
    passed: quantitiesValid,
    detail: quantitiesValid ? 'All quantities parsed as positive numbers.' : quantityDetails.join(' · '),
  })
  checks.push({
    id: 'prices',
    label: 'Unit prices are numeric',
    passed: pricesValid,
    detail: pricesValid ? 'All unit prices parsed as numbers.' : quantityDetails.join(' · '),
  })

  // --- Delivery fee -------------------------------------------------------
  const delivery = toNumber(input.delivery_fee)
  const deliveryValid = delivery !== null && delivery >= 0
  checks.push({
    id: 'delivery',
    label: 'Delivery fee is a valid number',
    passed: deliveryValid,
    detail: deliveryValid
      ? `Delivery fee: ${delivery.toLocaleString()}`
      : `Delivery fee "${String(input.delivery_fee)}" is not a valid number.`,
  })

  // Reject on structural invalidity before calculating total.
  const structurallyInvalid =
    !hasName || !hasItems || !quantitiesValid || !pricesValid || !deliveryValid || !phoneValid

  if (structurallyInvalid) {
    checks.push({
      id: 'total',
      label: 'Order total',
      passed: false,
      detail: 'Not calculated — input must be corrected first.',
    })
    checks.push({
      id: 'risk',
      label: 'Risk / eligibility check',
      passed: false,
      detail: 'Not run — input is invalid.',
    })
    return {
      order_total: null,
      checks,
      outcome: 'rejected',
      actionLabel: 'Input rejected — hold for correction',
      actionDetail:
        'Structural problems in the order input (missing field or non-numeric value). The submission is recorded as an error and does not trigger a customer message.',
    }
  }

  // --- Total --------------------------------------------------------------
  const subtotal = input.line_items.reduce((sum, item) => {
    const q = toNumber(item.quantity) ?? 0
    const p = toNumber(item.unit_price) ?? 0
    return sum + q * p
  }, 0)
  const total = subtotal + (delivery ?? 0)
  checks.push({
    id: 'total',
    label: 'Order total calculated',
    passed: true,
    detail: `Subtotal ${subtotal.toLocaleString()} + delivery ${(delivery ?? 0).toLocaleString()} = ${total.toLocaleString()}.`,
  })

  // --- Risk threshold -----------------------------------------------------
  const withinRisk = total <= SIM_RULES.MAX_ELIGIBLE_TOTAL
  checks.push({
    id: 'risk',
    label: `Total within COD risk threshold (${SIM_RULES.MAX_ELIGIBLE_TOTAL.toLocaleString()})`,
    passed: withinRisk,
    detail: withinRisk
      ? `Total ${total.toLocaleString()} is within the eligible range.`
      : `Total ${total.toLocaleString()} exceeds the ${SIM_RULES.MAX_ELIGIBLE_TOTAL.toLocaleString()} COD threshold.`,
  })

  // Address incompleteness flags for review rather than rejection.
  const needsReview = !withinRisk || !addressOk

  if (needsReview) {
    return {
      order_total: total,
      checks,
      outcome: 'flagged',
      actionLabel: 'Flagged for human review',
      actionDetail: !withinRisk
        ? 'The order is over the COD risk threshold. A person reviews it before any confirmation is sent.'
        : 'The delivery address is incomplete. A person contacts the customer to confirm the address before dispatch.',
    }
  }

  return {
    order_total: total,
    checks,
    outcome: 'confirmed',
    actionLabel: 'Confirmation link queued',
    actionDetail:
      'All checks passed. The workflow records the order as confirmed and queues the confirmation email to the customer.',
  }
}
