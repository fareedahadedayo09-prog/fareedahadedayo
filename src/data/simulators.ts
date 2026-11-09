/**
 * ──────────────────────────────────────────────────────────────────────────
 *  CLIENT-SIDE SIMULATORS
 * ──────────────────────────────────────────────────────────────────────────
 *  Pure client-side rule engines for three projects:
 *    1. COD Order Confirmation & Risk Assessment
 *    2. Returns & Refunds Eligibility
 *    3. Lead Qualification & Routing
 *
 *  Each simulator reflects the actual implemented logic of the
 *  corresponding workflow. Illustative thresholds are clearly labelled.
 *  Nothing here is connected to a live system and no real emails are sent.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type CheckTone = 'pass' | 'fail' | 'warn'
export type OutcomeTone = 'confirmed' | 'approved' | 'routed' | 'flagged' | 'rejected' | 'staged'

export type Check = {
  id: string
  label: string
  tone: CheckTone
  detail: string
}

export type Scenario = {
  id: string
  title: string
  description: string
  illustrative?: boolean // marks rules that are designed, not yet built
  // Arbitrary scenario input — each simulator interprets its own shape.
  input: Record<string, unknown>
}

export type SimulationResult = {
  outcome: {
    tone: OutcomeTone
    label: string
    detail: string
  }
  checks: Check[]
  computed?: Record<string, string | number | null>
}

/* ──────────────────────────────── 1. COD ──────────────────────────────── */

const COD_RULES = {
  MAX_ELIGIBLE_TOTAL: 80000,
  MIN_ADDRESS_LENGTH: 12,
  MIN_PHONE_DIGITS: 8,
}

export const COD_SCENARIOS: Scenario[] = [
  {
    id: 'cod-pass',
    title: 'Clean order within threshold',
    description: 'Complete order, valid phone/address, total under the risk limit. Confirmation path.',
    input: {
      customer_name: 'Amaka Okafor',
      address: '14 Allen Avenue, Ikeja, Lagos',
      phone: '+234 803 123 4567',
      delivery_fee: 2500,
      line_items: [
        { product: 'Vitamin C Serum', quantity: 1, unit_price: 14500 },
        { product: 'Cleanser', quantity: 2, unit_price: 8500 },
      ],
    },
  },
  {
    id: 'cod-risk',
    title: 'Order exceeds risk threshold',
    description: 'Large bulk order totals above the COD risk limit. Flagged for review.',
    input: {
      customer_name: 'Musa Ibrahim',
      address: 'Plot 22, Wuse 2, Abuja, FCT',
      phone: '+234 701 987 6543',
      delivery_fee: 4000,
      line_items: [
        { product: 'Vitamin C Serum (bulk x6)', quantity: 6, unit_price: 14500 },
        { product: 'Cleanser (bulk x10)', quantity: 10, unit_price: 8500 },
      ],
    },
  },
  {
    id: 'cod-invalid',
    title: 'Missing or invalid information',
    description: 'Non-numeric quantity and empty phone. Rejected before pricing.',
    input: {
      customer_name: 'Chioma Eze',
      address: 'Lekki',
      phone: '',
      delivery_fee: 2500,
      line_items: [{ product: 'Vitamin C Serum', quantity: 'two', unit_price: 14500 }],
    },
  },
  {
    id: 'cod-short-addr',
    title: 'Incomplete delivery address',
    description: 'Illustrative: address too short to dispatch on. Flagged for confirmation.',
    illustrative: true,
    input: {
      customer_name: 'David Okon',
      address: 'Abuja',
      phone: '+234 812 555 0199',
      delivery_fee: 2500,
      line_items: [{ product: 'Cleanser', quantity: 1, unit_price: 8500 }],
    },
  },
]

function toNum(v: unknown): number | null {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v.trim())
    return Number.isFinite(n) ? n : null
  }
  return null
}
const digits = (s: string) => s.replace(/[^0-9]/g, '')

export function simulateCOD(input: Record<string, unknown>): SimulationResult {
  const checks: Check[] = []
  const name = String(input.customer_name ?? '').trim()
  const address = String(input.address ?? '').trim()
  const phone = String(input.phone ?? '').trim()
  const deliveryFee = toNum(input.delivery_fee)
  const items = Array.isArray(input.line_items) ? input.line_items as Array<Record<string, unknown>> : []

  const nameOk = name.length > 0
  checks.push({
    id: 'name', label: 'Customer name provided', tone: nameOk ? 'pass' : 'fail',
    detail: nameOk ? `Name: ${name}` : 'Missing customer name.',
  })
  const addrOk = address.length >= COD_RULES.MIN_ADDRESS_LENGTH
  checks.push({
    id: 'address', label: 'Delivery address is complete', tone: addrOk ? 'pass' : 'warn',
    detail: addrOk ? `Address (${address.length} chars).` : `Address is only ${address.length} characters — likely incomplete.`,
  })
  const phoneDigits = digits(phone)
  const phoneOk = phoneDigits.length >= COD_RULES.MIN_PHONE_DIGITS && /^[0-9+\s()-]*$/.test(phone) && phone.length > 0
  checks.push({
    id: 'phone', label: 'Phone number is usable', tone: phoneOk ? 'pass' : 'fail',
    detail: phoneOk ? `Phone: ${phone} (${phoneDigits.length} digits).` : phone ? `Phone "${phone}" has too few digits or invalid characters.` : 'No phone number supplied.',
  })
  const hasItems = items.length > 0
  checks.push({
    id: 'items', label: 'At least one line item', tone: hasItems ? 'pass' : 'fail',
    detail: hasItems ? `${items.length} line item(s).` : 'No line items on the order.',
  })

  const qtyDetails: string[] = []
  const priceDetails: string[] = []
  let qtyOk = true, priceOk = true
  for (const it of items) {
    const q = toNum(it.quantity)
    const p = toNum(it.unit_price)
    if (q === null || q <= 0) { qtyOk = false; qtyDetails.push(`"${String(it.product)}" has invalid quantity: ${String(it.quantity)}`) }
    if (p === null || p < 0) { priceOk = false; priceDetails.push(`"${String(it.product)}" has invalid price: ${String(it.unit_price)}`) }
  }
  checks.push({
    id: 'qty', label: 'Quantities are numeric and positive', tone: qtyOk ? 'pass' : 'fail',
    detail: qtyOk ? 'All quantities parsed as positive numbers.' : qtyDetails.join(' · '),
  })
  checks.push({
    id: 'price', label: 'Unit prices are numeric', tone: priceOk ? 'pass' : 'fail',
    detail: priceOk ? 'All unit prices parsed as numbers.' : priceDetails.join(' · '),
  })
  const delivOk = deliveryFee !== null && deliveryFee >= 0
  checks.push({
    id: 'deliv', label: 'Delivery fee is a valid number', tone: delivOk ? 'pass' : 'fail',
    detail: delivOk ? `Delivery fee: ${deliveryFee!.toLocaleString()}.` : `Delivery fee "${String(input.delivery_fee)}" is not valid.`,
  })

  const structurallyInvalid = !nameOk || !hasItems || !qtyOk || !priceOk || !delivOk || !phoneOk
  if (structurallyInvalid) {
    checks.push({ id: 'total', label: 'Order total', tone: 'fail', detail: 'Not calculated — input must be corrected first.' })
    checks.push({ id: 'risk', label: 'Risk check', tone: 'fail', detail: 'Not run — input is invalid.' })
    return {
      outcome: { tone: 'rejected', label: 'Input rejected — hold for correction', detail: 'Structural problems in the order (missing field or non-numeric value). Submission recorded as an error; no customer message is sent.' },
      checks,
      computed: { total: null },
    }
  }

  const subtotal = items.reduce((s, it) => s + (toNum(it.quantity) ?? 0) * (toNum(it.unit_price) ?? 0), 0)
  const total = subtotal + (deliveryFee ?? 0)
  checks.push({ id: 'total', label: 'Order total calculated', tone: 'pass', detail: `Subtotal ${subtotal.toLocaleString()} + delivery ${(deliveryFee ?? 0).toLocaleString()} = ${total.toLocaleString()}.` })
  const withinRisk = total <= COD_RULES.MAX_ELIGIBLE_TOTAL
  checks.push({
    id: 'risk', label: `Total within COD threshold (${COD_RULES.MAX_ELIGIBLE_TOTAL.toLocaleString()})`,
    tone: withinRisk ? 'pass' : 'fail',
    detail: withinRisk ? `Total ${total.toLocaleString()} is within the eligible range.` : `Total ${total.toLocaleString()} exceeds the ${COD_RULES.MAX_ELIGIBLE_TOTAL.toLocaleString()} COD threshold.`,
  })

  if (!withinRisk || !addrOk) {
    return {
      outcome: { tone: 'flagged', label: 'Flagged for human review', detail: !withinRisk ? 'The order exceeds the COD risk threshold. A person reviews it before any confirmation is sent.' : 'The delivery address appears incomplete. A person contacts the customer to confirm the address before dispatch.' },
      checks,
      computed: { total },
    }
  }

  return {
    outcome: { tone: 'confirmed', label: 'Confirmation link queued', detail: 'All checks passed. Workflow records the order as confirmed and queues the confirmation email to the customer.' },
    checks,
    computed: { total },
  }
}

/* ──────────────────────── 2. RETURNS ELIGIBILITY ─────────────────────── */

const RETURNS_RULES = {
  RETURN_WINDOW_DAYS: 14,
  FINAL_SALE_KEYWORDS: ['final sale', 'final-sale', 'final_sale', 'custom'],
}

type ReturnItem = { product: string; condition?: string; is_final_sale?: boolean }
type ReturnInput = {
  order_number: string
  days_since_delivery: number | string
  items: ReturnItem[]
  reason: string
  has_original_packaging?: boolean
  is_exchange?: boolean
  conflicting_instructions?: string
}

export const RETURNS_SCENARIOS: Scenario[] = [
  {
    id: 'ret-pass',
    title: 'Standard return within policy',
    description: 'Item returned within window, non-final-sale, resellable condition. Approved.',
    input: {
      order_number: 'ORD-1042',
      days_since_delivery: 6,
      items: [{ product: 'Hydrating Cleanser', condition: 'unopened', is_final_sale: false }],
      reason: 'changed_mind',
      has_original_packaging: true,
      is_exchange: false,
    } as ReturnInput,
  },
  {
    id: 'ret-outside-window',
    title: 'Outside the return window',
    description: 'Return requested 22 days after delivery. Escalated.',
    input: {
      order_number: 'ORD-0987',
      days_since_delivery: 22,
      items: [{ product: 'Vitamin C Serum', condition: 'unopened', is_final_sale: false }],
      reason: 'changed_mind',
    } as ReturnInput,
  },
  {
    id: 'ret-final-sale',
    title: 'Final-sale item',
    description: 'Item marked final sale. Policy denies return; escalated if customer asks for exception.',
    input: {
      order_number: 'ORD-1120',
      days_since_delivery: 3,
      items: [{ product: 'Holiday Gift Set', condition: 'sealed', is_final_sale: true }],
      reason: 'changed_mind',
    } as ReturnInput,
  },
  {
    id: 'ret-missing-order',
    title: 'Missing order reference',
    description: 'Order number not provided. Rejected for correction.',
    input: {
      order_number: '',
      days_since_delivery: 4,
      items: [{ product: 'Cleanser' }],
      reason: 'damaged',
    } as ReturnInput,
  },
  {
    id: 'ret-conflict',
    title: 'Conflicting instructions (illustrative)',
    description: 'Customer requests exchange AND refund for the same item. Designed to flag for review (rule not yet built in the workflow).',
    illustrative: true,
    input: {
      order_number: 'ORD-1201',
      days_since_delivery: 5,
      items: [{ product: 'Serum', condition: 'opened', is_final_sale: false }],
      reason: 'wrong_item',
      conflicting_instructions: 'Please exchange AND refund this item.',
    } as ReturnInput,
  },
]

export function simulateReturns(raw: Record<string, unknown>): SimulationResult {
  const input = raw as ReturnInput
  const checks: Check[] = []
  const days = toNum(input.days_since_delivery)
  const items = Array.isArray(input.items) ? input.items as ReturnItem[] : []
  const hasOrder = (input.order_number ?? '').toString().trim().length > 0
  checks.push({ id: 'order', label: 'Order reference provided', tone: hasOrder ? 'pass' : 'fail', detail: hasOrder ? `Order: ${input.order_number}` : 'Missing order number.' })
  const hasItems = items.length > 0
  checks.push({ id: 'items', label: 'At least one item listed', tone: hasItems ? 'pass' : 'fail', detail: hasItems ? `${items.length} item(s) to return.` : 'No items listed.' })
  const daysValid = days !== null && days >= 0
  checks.push({ id: 'window', label: 'Within return window', tone: daysValid && days !== null && days <= RETURNS_RULES.RETURN_WINDOW_DAYS ? 'pass' : daysValid ? 'fail' : 'fail', detail: days !== null ? `${days} day(s) since delivery (window: ${RETURNS_RULES.RETURN_WINDOW_DAYS} days).` : 'Days since delivery is not a number.' })
  const hasFinalSale = items.some((i) => i.is_final_sale)
  checks.push({ id: 'final', label: 'No final-sale items', tone: hasFinalSale ? 'fail' : 'pass', detail: hasFinalSale ? 'One or more items are marked final sale.' : 'No final-sale items in the request.' })
  const hasReason = (input.reason ?? '').toString().trim().length > 0
  checks.push({ id: 'reason', label: 'Return reason provided', tone: hasReason ? 'pass' : 'warn', detail: hasReason ? `Reason: ${input.reason}.` : 'No reason supplied — a team member will ask.' })
  const hasConflict = !!input.conflicting_instructions && String(input.conflicting_instructions).trim().length > 0
  checks.push({ id: 'conflict', label: 'No conflicting instructions', tone: hasConflict ? 'warn' : 'pass', detail: hasConflict ? `Conflicting request: "${String(input.conflicting_instructions)}".` : 'No conflicting instructions detected.' })

  if (!hasOrder || !hasItems || !daysValid) {
    return { outcome: { tone: 'rejected', label: 'Request incomplete — hold for correction', detail: 'Required information is missing. The request is recorded and a team member will follow up to correct it; no decision is issued.' }, checks }
  }

  // Eligibility logic.
  if (hasConflict) {
    return { outcome: { tone: 'flagged', label: 'Flagged for human review — conflicting instructions', detail: 'The customer has made conflicting requests (e.g. exchange AND refund). A person resolves this before any action is taken.' }, checks }
  }
  if (days !== null && days > RETURNS_RULES.RETURN_WINDOW_DAYS) {
    return { outcome: { tone: 'flagged', label: 'Flagged for human review — outside window', detail: `Return is outside the ${RETURNS_RULES.RETURN_WINDOW_DAYS}-day window. Standard policy does not approve; a person decides whether to make an exception.` }, checks }
  }
  if (hasFinalSale) {
    return { outcome: { tone: 'flagged', label: 'Flagged for human review — final-sale item', detail: 'One or more items are final sale. Standard policy denies; a person reviews if an exception is warranted.' }, checks }
  }

  return {
    outcome: { tone: 'approved', label: 'Return approved — return instructions queued', detail: 'Request meets policy. The workflow records the approval and queues return instructions to the customer. Exchange/refund is executed according to the customer\u2019s selection.' },
    checks,
  }
}

/* ───────────────────── 3. LEAD QUALIFICATION ───────────────────── */

type LeadInput = {
  name: string
  contact: string
  company?: string
  message: string
  source: string
  interest?: string // optional structured field
  budget_mentioned?: boolean
}

// Deterministic keyword buckets (mirrors the rule-ordered classification in the workflow).
const BUCKETS: Array<{ id: string; label: string; keywords: string[] }> = [
  { id: 'wholesale', label: 'Wholesale / Bulk', keywords: ['wholesale', 'bulk', 'resell', 'distributor', 'stockist'] },
  { id: 'corporate', label: 'Corporate / B2B', keywords: ['company', 'corporate', 'organization', 'organisation', 'staff', 'office', 'team'] },
  { id: 'automation', label: 'Automation project', keywords: ['automation', 'workflow', 'integration', 'api', 'n8n', 'zapier', 'bot', 'system'] },
  { id: 'press', label: 'Press / Collaboration', keywords: ['press', 'feature', 'interview', 'collaboration', 'partnership'] },
  { id: 'customer', label: 'Customer enquiry', keywords: ['order', 'delivery', 'product', 'price', 'buy', 'purchase', 'serum', 'cleanser'] },
]

export const LEAD_SCENARIOS: Scenario[] = [
  {
    id: 'lead-qualified',
    title: 'Qualified wholesale / bulk enquiry',
    description: 'Structured enquiry with wholesale intent and contact details. Classified and routed to partnerships.',
    input: {
      name: 'Grace Nwosu',
      contact: 'grace@beautyhub.ng',
      company: 'Beauty Hub Ltd',
      message: 'Hello, I run a beauty store in PH and would like to discuss wholesale / bulk pricing for your cleansers and serums for resell.',
      source: 'website-form',
    } as LeadInput,
  },
  {
    id: 'lead-customer',
    title: 'Customer product question',
    description: 'Customer asking about a product. Classified as customer support rather than a sales lead.',
    input: {
      name: 'Tunde',
      contact: '+234 805 555 0143',
      message: 'Hi, do you sell the cleanser in a 250ml size and what is the price?',
      source: 'dm',
    } as LeadInput,
  },
  {
    id: 'lead-missing',
    title: 'Missing contact details',
    description: 'Message has no email or phone. Held for review; nothing to action.',
    input: {
      name: '',
      contact: '',
      message: 'I want to talk about automation for my store.',
      source: 'dm',
    } as LeadInput,
  },
  {
    id: 'lead-automation',
    title: 'Automation project enquiry',
    description: 'Prospect describing a workflow/integration need. Routed to consulting pipeline.',
    input: {
      name: 'Ibrahim Sani',
      contact: 'ibrahim@logistics.ng',
      company: 'Logistics NG',
      message: 'We currently run COD orders manually and need an n8n / zapier automation workflow with Airtable integration for risk checks and email confirmations.',
      source: 'linkedin',
    } as LeadInput,
  },
  {
    id: 'lead-unclear',
    title: 'Unclear enquiry (illustrative)',
    description: 'Very short message that cannot be classified reliably. Held for manual review.',
    illustrative: true,
    input: {
      name: 'Ada',
      contact: 'ada@example.com',
      message: 'Hi',
      source: 'dm',
    } as LeadInput,
  },
]

function classifyLead(msg: string): { bucketId: string | null; label: string | null } {
  const lower = msg.toLowerCase()
  for (const b of BUCKETS) {
    if (b.keywords.some((k) => lower.includes(k))) return { bucketId: b.id, label: b.label }
  }
  return { bucketId: null, label: null }
}

export function simulateLead(raw: Record<string, unknown>): SimulationResult {
  const input = raw as LeadInput
  const checks: Check[] = []
  const name = (input.name ?? '').toString().trim()
  const contact = (input.contact ?? '').toString().trim()
  const message = (input.message ?? '').toString().trim()
  const source = (input.source ?? '').toString().trim()
  const checks_name = name.length > 0
  checks.push({ id: 'name', label: 'Name provided', tone: checks_name ? 'pass' : 'fail', detail: checks_name ? name : 'No name supplied.' })
  const contactOk = contact.length > 3
  checks.push({ id: 'contact', label: 'Contact detail usable', tone: contactOk ? 'pass' : 'fail', detail: contactOk ? contact : 'No usable contact detail (email or phone).' })
  const msgOk = message.length > 3
  checks.push({ id: 'message', label: 'Message contains content', tone: msgOk ? 'pass' : 'warn', detail: msgOk ? `${message.length} characters.` : 'Message is empty or too short to classify.' })
  const hasSource = source.length > 0
  checks.push({ id: 'source', label: 'Source recorded', tone: hasSource ? 'pass' : 'warn', detail: hasSource ? `Source: ${source}.` : 'Source not recorded.' })

  if (!checks_name || !contactOk) {
    checks.push({ id: 'classify', label: 'Classification', tone: 'fail', detail: 'Not run — record is incomplete.' })
    checks.push({ id: 'route', label: 'Routing', tone: 'fail', detail: 'Not run.' })
    return { outcome: { tone: 'rejected', label: 'Record held — incomplete', detail: 'Missing contact or name. Record retained in the incomplete-leads queue; no outreach is attempted until a person fills in the missing data.' }, checks }
  }

  const cls = classifyLead(message)
  checks.push({ id: 'classify', label: 'Classification', tone: cls.bucketId ? 'pass' : 'warn', detail: cls.bucketId ? `Matched bucket: ${cls.label}.` : 'No bucket matched — held for manual review.' })

  if (!cls.bucketId) {
    checks.push({ id: 'route', label: 'Routing', tone: 'warn', detail: 'No deterministic match; record placed in review queue with raw message attached.' })
    return { outcome: { tone: 'flagged', label: 'Unclassified — held for human review', detail: 'The message does not match any existing bucket cleanly. A person reviews and either classifies it or replies for clarification.' }, checks }
  }

  checks.push({ id: 'route', label: 'Routing', tone: 'pass', detail: `Routed to ${cls.label} queue; next action assigned in Airtable.` })
  return {
    outcome: { tone: 'routed', label: `Classified as ${cls.label} — routed`, detail: `The lead has been structured, classified as "${cls.label}", assigned an owner and a next action in Airtable.` },
    checks,
    computed: { bucket: cls.label ?? 'unclassified' },
  }
}

/* ─────────────── Sim registry (used by the UI to dispatch) ───────────── */

export type SimulatorId = 'cod' | 'returns' | 'lead'

export type SimulatorDef = {
  id: SimulatorId
  projectSlug: string
  title: string
  subtitle: string
  scenarios: Scenario[]
  run: (input: Record<string, unknown>) => SimulationResult
  /** Field schema used to render the input panel (optional — we show summaries instead of raw JSON for clarity). */
  disclaimer: string
}

export const SIMULATORS: Record<SimulatorId, SimulatorDef> = {
  cod: {
    id: 'cod',
    projectSlug: 'order-confirmation-risk-check',
    title: 'COD Order Confirmation & Risk Assessment',
    subtitle: 'Walk an order through validation, pricing, risk check and branching.',
    scenarios: COD_SCENARIOS,
    run: simulateCOD,
    disclaimer:
      'This simulation reflects the implemented logic of the built workflow. The risk threshold is illustrative configuration (a merchant would set the real number). Nothing here sends email or writes records.',
  },
  returns: {
    id: 'returns',
    projectSlug: 'returns-refunds-handler',
    title: 'Returns & Refunds Eligibility',
    subtitle: 'Walk a return request through validation, policy evaluation and escalation.',
    scenarios: RETURNS_SCENARIOS,
    run: simulateReturns,
    disclaimer:
      'Return-window and final-sale rules are illustrative of the kind of policy the workflow applies. Conflicting-instruction detection is marked as designed, not yet built.',
  },
  lead: {
    id: 'lead',
    projectSlug: 'lead-qualification',
    title: 'Lead Qualification & Routing',
    subtitle: 'Walk an incoming enquiry through extraction, validation, classification and routing.',
    scenarios: LEAD_SCENARIOS,
    run: simulateLead,
    disclaimer:
      'Classification buckets are deterministic keyword rules, mirroring the built workflow. Claude extraction is simulated here; the simulator shows only the validation/classification logic.',
  },
}
